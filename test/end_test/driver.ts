import { ElementHandle } from "puppeteer";
import { ChildAsserter } from "./ChildAsserter";

export class Driver {

    mainContainer!: ElementHandle<Element>;

    async goto(url: string) {
        await page.goto(url, { waitUntil: 'domcontentloaded' });
        this.mainContainer = await this.getMainContainer();
    }

    async isStartingPage() {
        await ChildAsserter.assertChildCount(this.mainContainer, 1);

        await this.pageShouldHavePlayButton();
    }

    private async pageShouldHavePlayButton() {
        await ChildAsserter.assertElement(this.mainContainer, 0, 'BUTTON', "Play");
    }

    async clickOnPlayButton() {
        const playButton = await this.getChild(0);
        await playButton.click();
    }

    async isQuizPage() {
        await ChildAsserter.assertChildCount(this.mainContainer, 7);

        await this.pageShouldHaveAQuestion();
        await this.pageShouldHaveOptions();
        await this.pageShouldHaveEndAndSkip();
    }

    private async pageShouldHaveAQuestion() {
        await ChildAsserter.assertElement(this.mainContainer, 0, 'P', "question");
    }

    private async pageShouldHaveOptions() {
        await ChildAsserter.assertElement(this.mainContainer, 1, 'BUTTON', "Option1");
        await ChildAsserter.assertElement(this.mainContainer, 2, 'BUTTON', "Option2");
        await ChildAsserter.assertElement(this.mainContainer, 3, 'BUTTON', "Option3");
        await ChildAsserter.assertElement(this.mainContainer, 4, 'BUTTON', "Option4");
    }

    private async pageShouldHaveEndAndSkip() {
        await ChildAsserter.assertElement(this.mainContainer, 5, 'BUTTON', "End");
        await ChildAsserter.assertElement(this.mainContainer, 6, 'BUTTON', "Skip");
    }

    async clickOnSkipButton() {
        const skipButton = await this.getChild(6);
        await skipButton.click();
    }

    async clickOnEndButton() {
        const endButton = await this.getChild(5);
        await endButton.click();
    }

    async isScorePageWithScore(score: number) {
        await ChildAsserter.assertChildCount(this.mainContainer, 1);

        await this.pageHaveScore(score);
    }

    private async pageHaveScore(score: number) {
        await ChildAsserter.assertElement(this.mainContainer, 0, 'P', `Score ${score}`);
    }

    private async getMainContainer() {
        return await page.$('#main') as ElementHandle;
    }

    private async getChild(position: number) {
        return await this.mainContainer.evaluateHandle(function (node: HTMLElement, pos: number) {
            return node.children[pos];
        }, position) as ElementHandle;
    }
}
