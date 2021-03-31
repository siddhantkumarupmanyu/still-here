import { ElementHandle } from "puppeteer";


export class ChildAsserter {

    static async assertElement(parent: ElementHandle, position: number, expectedTag: string, expectedText: string) {
        const actualTag = await parent.evaluate(function (node: HTMLElement, pos: number) {
            return node.children[pos].tagName
        }, position);

        const actualText = await parent.evaluate(function (node: HTMLElement, pos: number) {
            return node.children[pos].textContent
        }, position);

        expect(actualTag).toBe(expectedTag);
        expect(actualText).toBe(expectedText);
    }

    static async assertChildCount(parent: ElementHandle, expectedCount: number) {
        const actualCount = await parent.evaluate((node: HTMLElement) => node.children.length);
        expect(actualCount).toBe(expectedCount);
    }
}