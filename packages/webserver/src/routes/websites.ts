import { Router } from 'express';
import { WebsiteModel } from 'config/src/schema/Website';
import { producer } from '../lib/kafka';
import { v4 as uuidv4 } from 'uuid';
import { kafka_topic } from 'config/src/kafka';
const SpellCorrector = require('spelling-corrector');
const pluralize = require('pluralize');

const router = Router();

router.post('/', async (req, res) => {
    const websites = req.body;
    if (!(websites instanceof Array)) {
        return res.status(400).json({ error: 'bad request' });
    }

    const kafkaValues = websites.map((website) => ({ key: uuidv4(), value: website }));

    await producer.send({
        topic: kafka_topic.crawler,
        messages: kafkaValues,
    });

    return res.json({ ok: 1 });
});

router.get('/', async (req, res) => {
    const search = req.query?.search?.toString();

    if (!search) {
        res.status(400).json({ error: 'bad request' });
        return;
    }

    const words = search.split(' ').filter((word) => {
        return word.length > 2;
    });

    const searchWords = [];
    words.forEach((word) => {
        word = word.toLowerCase();
        const spellCorrector = new SpellCorrector();

        spellCorrector.loadDictionary();

        const correct = spellCorrector.correct(word);
        const singular = pluralize.singular(word);
        const plural = pluralize.plural(word);

        searchWords.push(...[correct, singular, plural]);
    });

    const results = await WebsiteModel.find({ $text: { $search: words.join(' ').trim() } }).exec();
    res.json(results);
});

export default router;
