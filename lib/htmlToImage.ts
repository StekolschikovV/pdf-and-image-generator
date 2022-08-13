import puppeteer from "puppeteer";

const htmlToImageAndPdf = async (
    html = "",
    pdfConfig: {},
    imageConfig: {}
): Promise<{
    imageBuffer: string | Buffer | undefined,
    pdfBuffer: string | Buffer | undefined
}> => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox'],
    });
    const page = await browser.newPage();
    await page.setContent(html);
    const pdfBuffer = await page?.pdf({
        printBackground: true,
        width: 800,
        height: 800,
        ...pdfConfig,
    });
    const imageBuffer = await page?.screenshot({
        clip: {
            x: 0,
            y: 0,
            width: 800,
            height: 800,
        },
        ...imageConfig
    });
    await page.close();
    await browser.close();
    return {
        imageBuffer,
        pdfBuffer
    };
};

export default htmlToImageAndPdf