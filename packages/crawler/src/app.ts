import { consumer, producer } from './lib/kafka';
import { crawler } from './lib/crawler';

const run = async () => {
    // Producing
    await producer.connect();
    await producer.send({
        topic: 'test-topic',
        messages: [{ value: 'Hello KafkaJS user!' }],
    });

    // Consuming
    await consumer.connect();
    await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            // Add first URL to the queue and start the crawl.
            const link = message.value?.toString();
            if (!link) return;
            await crawler.run([link]);
            console.log({
                partition,
                offset: message.offset,
                value: message?.value?.toString(),
            });
        },
    });
};

run().catch(console.error);
