import htmlToImageAndPdf from "./lib/htmlToImage";

const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded())
app.use(express.json({limit: '50mb'}));

app.post('/generate', async (req: any, res: any) => {

    const html = req.body?.html;
    const pdfConfig = req.body?.pdfConfig || {};
    const imgConfig = req.body?.imgConfig || {};

    if( html === undefined ) {
        res.status(422).json({
            status: 0,
            error: 'No html, pdfConfig or imgConfig data'
        })
    } else {

        console.log("html", html)
        console.log("pdfConfig", pdfConfig)
        console.log("imgConfig", imgConfig)

        const result = await htmlToImageAndPdf(
            html,
            pdfConfig,
            imgConfig,
        ) || "";


        res.status(200).json({
            status: "1",
            data: result
        });
    }


});

app.listen(port, () => {
    console.log(`[server]: Server is running at localhost:${port}`);
});