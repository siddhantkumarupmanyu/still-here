import { ElementHandle } from "puppeteer";
import { BarsDatabase } from "../../src/BarsDatabase";
import { stillHereBarsObj } from "../../src/stillHereBars";
import { ChildAsserter } from "./ChildAsserter";

export class Driver {

    private mainContainer!: ElementHandle<Element>;

    async goto(url: string) {
        await page.goto(url, { waitUntil: 'domcontentloaded' });
        this.mainContainer = await this.getMainContainer();
    }

    async isStartingPage() {
        await ChildAsserter.assertChildCount(this.mainContainer, 1);

        await this.pageShouldHavePlayButton();
    }

    private async pageShouldHavePlayButton() {
        await ChildAsserter.assertElementWithText(this.mainContainer, 0, 'BUTTON', "Play");
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
        await ChildAsserter.assertElement(this.mainContainer, 0, 'P');
    }

    private async pageShouldHaveOptions() {
        await ChildAsserter.assertElement(this.mainContainer, 1, 'BUTTON');
        await ChildAsserter.assertElement(this.mainContainer, 2, 'BUTTON');
        await ChildAsserter.assertElement(this.mainContainer, 3, 'BUTTON');
        await ChildAsserter.assertElement(this.mainContainer, 4, 'BUTTON');
    }

    private async pageShouldHaveEndAndSkip() {
        await ChildAsserter.assertElementWithText(this.mainContainer, 5, 'BUTTON', "End");
        await ChildAsserter.assertElementWithText(this.mainContainer, 6, 'BUTTON', "Skip");
    }

    async clickOnRightOption() {
        const question = await this.getInnerText(await this.getChild(0));
        const answer = this.getAnswerKey(question);
        let rightOption = -1;
        for (let i = 1; i <= 4; i++) {
            const optionText = await this.getInnerText(await this.getChild(i));
            if (optionText === answer) {
                rightOption = i;
            }
        }

        const rightOptionElement = await this.getChild(rightOption);
        rightOptionElement.click();
    }

    private getAnswerKey(question: string) {
        const barsDatabase = new BarsDatabase(stillHereBarsObj);
        for (let i = 0; i < barsDatabase.getKeyCount(); i++) {
            for (let j = 0; j < barsDatabase.getValueCount(i); j++) {
                const currentValue = barsDatabase.getValueAt(i, j).replace(/\n\s+/g, " ");
                if (question === currentValue) {
                    return barsDatabase.getKeyAt(i);
                }
            }
        }

        throw new Error("Answer Not found");
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
        await ChildAsserter.assertElementWithText(this.mainContainer, 0, 'P', `Score ${score}`);
    }

    private async getMainContainer() {
        return await page.$('#main') as ElementHandle;
    }

    private async getChild(position: number) {
        return await this.mainContainer.evaluateHandle(function (node: HTMLElement, pos: number) {
            return node.children[pos];
        }, position) as ElementHandle;
    }

    private async getInnerText(elementHandel: ElementHandle) {
        return await elementHandel.evaluate((node: HTMLElement) => node.innerText);
    }
}
