import { Driver } from "./driver";

test("Zero score without Playing", async () => {    
    let driver = new Driver("http://localhost:3030/index.html");
    await driver.connect();
    await driver.isStartingPage();
    await driver.pageHasPlayButton();
    await driver.clickOnPlayButton();
    await driver.isQuestionsPage();
    await driver.pageHasEndButton();
    await driver.clickOnEndButton();
    await driver.isScorePage();
    await driver.containsScore(0);
});