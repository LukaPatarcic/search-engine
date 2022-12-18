import { PlaywrightCrawler } from 'crawlee';
import { producer } from './kafka';
import { v4 as uuidv4 } from 'uuid';

export const crawler = new PlaywrightCrawler({
    async requestHandler({ request, page, enqueueLinks, log }) {
        const title = await page.title();
        const url = page.url();
        log.info(`Title of ${request.loadedUrl} is '${title}'`);
        await producer.send({
            topic: 'crawler',
            messages: [{ key: uuidv4(), value: JSON.stringify({ title, url }) }],
        });
        await enqueueLinks();
    },
});
