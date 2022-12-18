import { Router } from 'express';
import Website from '../schema/Website';

const router = Router();

router.get('/', (req, res) => {
    // const websites = new Website();
    // console.log(Website.find({}));
    return res.json();
});

export default router;
