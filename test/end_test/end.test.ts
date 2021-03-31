import { Driver } from "./driver";

test("Zero score without Playing", async () => {
    let driver = new Driver();
    await driver.goto("http://localhost:3030/index.html");
    await driver.isStartingPage();
    await driver.clickOnPlayButton();
    await driver.isQuizPage();
    await driver.clickOnEndButton();
    await driver.isScorePageWithScore(0);
});

test("Zero Score with skipping", async () => {
    let driver = new Driver();
    await driver.goto("http://localhost:3030/index.html");
    await driver.isStartingPage();
    await driver.clickOnPlayButton();
    await driver.isQuizPage();
    await driver.clickOnSkipButton();
    await driver.isQuizPage();
    await driver.clickOnEndButton();
    await driver.isScorePageWithScore(0);
});

// test("One score in two rounds", async () => {
//     let driver = new Driver();
//     await driver.goto("http://localhost:3030/index.html");
//     await driver.isStartingPage();
//     await driver.clickOnPlayButton();
//     await driver.isQuizPage();
//     await driver.clickOnWrongOption();
//     await driver.clickOnRightOption();
//     await driver.clickOnEndButton();
//     await driver.isScorePageWithScore(1);
// });