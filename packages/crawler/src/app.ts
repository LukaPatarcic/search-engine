import { consumer } from './lib/kafka';
import { crawler } from './lib/crawler';
import { z } from 'zod';
import main from './lib/mongo';
import { kafka_topic } from 'config/src/kafka';

main().catch(console.log);

const run = async () => {
    await consumer.connect();
    await consumer.subscribe({ topic: kafka_topic.crawler, fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ message }) => {
            const link = message.value?.toString();
            const schema = z.string().url();
            try {
                const res = schema.parse(link);
                await crawler.run([res]);
            } catch (err) {
                console.log(err);
            }
        },
    });
};

run().catch(console.error);
