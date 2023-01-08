import { consumer, producer } from './lib/kafka';
import { crawler } from './lib/crawler';
import { z } from 'zod';
import main from './lib/mongo';

main().catch(console.log);

const run = async () => {
    await consumer.connect();
    await consumer.subscribe({ topic: 'crawler', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            // Add first URL to the queue and start the crawl.
            const link = message.value?.toString();
            const schema = z.string().url();
            try {
                const res = schema.parse(link);
                const cralwerRes = await crawler.run([res]);
                console.log(cralwerRes);
            } catch (err) {
                console.log(err);
            }

            if (!link) return;
            // console.log({
            //     partition,
            //     offset: message.offset,
            //     value: message?.value?.toString(),
            // });
        },
    });
};

run().catch(console.error);
