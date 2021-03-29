import { ElementHandle } from "puppeteer";

export class Driver {
    url: string;

    constructor(url: string) {
        this.url = url;
    }

    async connect() {
        await page.goto(this.url, { waitUntil: 'domcontentloaded' });
    }

    async isStartingPage() {
        let mainElement = await this.getMainContainer();
        expect(mainElement).not.toBeNull();
    }

    async pageHasPlayButton() {
        let mainElement = await this.getMainContainer();
        expect(await mainElement.evaluate((node: HTMLElement) => node.children.length)).toBe(1);

        expect(await mainElement.evaluate((node: HTMLElement) => node.children[0].tagName)).toBe('BUTTON');
        expect(await mainElement.evaluate((node: HTMLElement) => node.children[0].textContent)).toBe("Play");
    }

    async clickOnPlayButton() {
        let mainElement = await this.getMainContainer();

        let playButton = await mainElement.evaluateHandle((node: HTMLElement) => node.children[0]) as ElementHandle;
        await playButton.click();
    }

    async isQuestionsPage() {
        let mainElement = await this.getMainContainer();
        expect(mainElement).not.toBeNull();
    }

    async pageHasEndButton() {
        let mainElement = await this.getMainContainer();
        expect(await mainElement.evaluate((node: HTMLElement) => node.children.length)).toBe(1);

        expect(await mainElement.evaluate((node: HTMLElement) => node.children[0].tagName)).toBe('BUTTON');
        expect(await mainElement.evaluate((node: HTMLElement) => node.children[0].textContent)).toBe("End");
    }

    async clickOnEndButton() {
        let mainElement = await this.getMainContainer();

        let endButton = await mainElement.evaluateHandle((node: HTMLElement) => node.children[0]) as ElementHandle;
        await endButton.click();
    }

    async isScorePage() {
        let mainElement = await this.getMainContainer();
        expect(mainElement).not.toBeNull();
    }

    async containsScore(score: number) {
        let mainElement = await this.getMainContainer();
        expect(await mainElement.evaluate((node: HTMLElement) => node.children.length)).toBe(1);

        expect(await mainElement.evaluate((node: HTMLElement) => node.children[0].tagName)).toBe('P');
        expect(await mainElement.evaluate((node: HTMLElement) => node.children[0].textContent)).toBe(`Score ${0}`);
    }

    private async getMainContainer() {
        return await page.$('#main') as ElementHandle;
    }
}