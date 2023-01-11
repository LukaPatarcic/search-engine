import { PlaywrightCrawler } from 'crawlee';
import { WebsiteModel } from 'config/src/schema/Website';

export const crawler = new PlaywrightCrawler({
    async requestHandler({ page, enqueueLinks }) {
        const title = await page.title();
        const url = page.url();
        const description = await page.$eval('meta[name="description"]', (meta) => {
            return meta.getAttribute('content') ?? '';
        });
        await WebsiteModel.create({
            url,
            title,
            description,
            titleNormalized: title.toLowerCase(),
            descriptionNormalized: description.toLowerCase(),
        });
        await enqueueLinks();
    },
});
