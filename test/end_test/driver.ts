import { ElementHandle } from "puppeteer";

export class Driver {
    async goto(url: string) {
        await page.goto(url, { waitUntil: 'domcontentloaded' });
    }

    async isStartingPage() {
        await this.pageShouldHavePlayButton();
    }

    private async pageShouldHavePlayButton() {
        let mainElement = await this.getMainContainer();
        await this.assertChildCount(mainElement, 1);

        await this.assertElement(mainElement, 0, 'BUTTON', "Play");
    }

    async clickOnPlayButton() {
        let mainElement = await this.getMainContainer();

        let playButton = await mainElement.evaluateHandle((node: HTMLElement) => node.children[0]) as ElementHandle;
        await playButton.click();
    }

    async isQuestionsPage() {
        await this.pageShouldHaveEndButton();
    }

    private async pageShouldHaveEndButton() {
        let mainElement = await this.getMainContainer();
        await this.assertChildCount(mainElement, 1);

        await this.assertElement(mainElement, 0, 'BUTTON', "End");
    }

    async clickOnEndButton() {
        let mainElement = await this.getMainContainer();

        let endButton = await mainElement.evaluateHandle((node: HTMLElement) => node.children[0]) as ElementHandle;
        await endButton.click();
    }

    async isScorePageWithScore(score: number) {
        await this.pageHaveScore(score);
    }

    private async pageHaveScore(score: number) {
        let mainElement = await this.getMainContainer();
        await this.assertChildCount(mainElement, 1);

        await this.assertElement(mainElement, 0, 'P', `Score ${score}`);
    }

    private async getMainContainer() {
        return await page.$('#main') as ElementHandle;
    }

    private async assertChildCount(parent: ElementHandle, expectedCount: number) {
        const actualCount = await parent.evaluate((node: HTMLElement) => node.children.length);
        expect(actualCount).toBe(expectedCount);
    }

    private async assertElement(parent: ElementHandle, position: number, expectedTag: string, expectedText: string) {
        const actualTag = await parent.evaluate(function (node: HTMLElement, pos: number) {
            return node.children[pos].tagName
        }, position);

        const actualText = await parent.evaluate(function (node: HTMLElement, pos: number) {
            return node.children[pos].textContent
        }, position);

        expect(actualTag).toBe(expectedTag);
        expect(actualText).toBe(expectedText);
    }
}