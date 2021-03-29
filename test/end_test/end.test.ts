import { Driver } from "./driver";

test("Zero score without Playing", async () => {
    let driver = new Driver();
    await driver.goto("http://localhost:3030/index.html");
    await driver.isStartingPage();
    await driver.clickOnPlayButton();
    await driver.isQuestionsPage();
    await driver.clickOnEndButton();
    await driver.isScorePageWithScore(0);
});