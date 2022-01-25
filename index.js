const puppeteer = require('puppeteer');
const colisList = require('./colis');

async function main() {
	const browser = await puppeteer.launch({
		ignoreHTTPSErrors: true
		, headless: true
	});
	let page = await browser.newPage();
	for (let colis in colisList) {
		try {
			console.log("Checking " + colisList[colis].name);
			await page.goto(colisList[colis].url);
			await page.waitForSelector('tbody > tr:nth-child(2) > td.tabmen', {timeout: 8000})
			await page.screenshot({
				fullPage: true,
				path: './result/' + colisList[colis].name.replace(' ', '-') + '.png'
			});
			console.log("Checking " + colisList[colis].name + ' => OK');
		} catch (e) {
			console.log("Checking " + colisList[colis].name + ' => KO');
		}
	}
	await browser.close();
}

const waitTill = new Date(new Date().getTime() + 120 * 1000);
while (waitTill > new Date()) {
}

main()
	.then(d => console.log("\n Finished \n"))
	.catch(e => console.log(e));
