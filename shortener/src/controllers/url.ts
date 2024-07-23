import shortid from "shortid";
import URL from "../models/url";
import { Request, Response } from "express";

const handleGeneratNewShoetURL = async (req: Request, res: Response) => {
    const body = req.body;
    console.log("Body ==>", body);

    if (!body.url) {
        return res.status(400).json({ error: 'url is required' })
    }
    const shortID = shortid.generate();
    await URL.create({
        shortId: shortID,
        redirectUrl: body.url,
        visitHistory: []
    })
    return res.json({ id: shortID })
}

const handleGetShoetURL = async (req: Request, res: Response) => {
    const shortId = req.params.shortId;
    console.log("ShortId => ", req);

    const entry = await URL.findOneAndUpdate(
        { shortId },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now()
                }
            }
        },
        { new: true }
    );
    console.log("Entry => ", entry);

    if (!entry) {
        return res.status(404).json({ error: 'Short URL not found' });
    }
    res.redirect(entry.redirectUrl || 'https://www.google.com/')
}
const handleGetAnalytics = async (req: Request, res: Response) => {
    const shortId = req.params.shortId;
    // console.log("ShortId => " , req);

    const result = await URL.findOne({ shortId });
    return res.json({
        totalClicks:result?.visitHistory.length,
        analytics:result?.visitHistory
    })
}

export { handleGeneratNewShoetURL, handleGetShoetURL, handleGetAnalytics };