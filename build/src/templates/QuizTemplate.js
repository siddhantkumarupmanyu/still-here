"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.templateString = void 0;
const ButtonClickEvent_1 = require("../ButtonClickEvent");
const quizString = `
    <div class="container-items ">
        <div class="inner-item heading-item">
            <span>Still Here</span>
        </div>
    </div>
    <div class="container-items ">
        <div class="inner-item bars">
            {bars}
        </div>
    </div>
    <div class="container-items">
        <div class="inner-item">
            <button class="btn option-btn fourth" onclick="myBundle.buttonClick(${ButtonClickEvent_1.ButtonClickEvent.OPTION_0})">{option0}</button>
        </div>
    </div>
    <div class="container-items">
        <div class="inner-item">
            <button class="btn option-btn fourth" onclick="myBundle.buttonClick(${ButtonClickEvent_1.ButtonClickEvent.OPTION_1})">{option1}</button>
        </div>
    </div>
    <div class="container-items">
        <div class="inner-item">
            <button class="btn option-btn fourth" onclick="myBundle.buttonClick(${ButtonClickEvent_1.ButtonClickEvent.OPTION_2})">{option2}</button>
        </div>
    </div>
    <div class="container-items">
        <div class="inner-item">
            <button class="btn option-btn fourth" onclick="myBundle.buttonClick(${ButtonClickEvent_1.ButtonClickEvent.OPTION_3})">{option3}</button>
        </div>
    </div>
    <div class="container-items">
        <div class="inner-item last-item">
            <button class="btn fourth" onclick="myBundle.buttonClick(${ButtonClickEvent_1.ButtonClickEvent.END})">End</button>
            <button class="btn fourth" onclick="myBundle.buttonClick(${ButtonClickEvent_1.ButtonClickEvent.SKIP})">Skip</button>
        </div>
    </div>
`;
function templateString(quiz) {
    let generatedString = quizString;
    generatedString = insertOptions(generatedString, quiz.options);
    generatedString = insertBars(generatedString, quiz.question);
    return generatedString;
}
exports.templateString = templateString;
function insertOptions(quizString, options) {
    let generatedString = quizString;
    generatedString = generatedString.replace("{option0}", options[0]);
    generatedString = generatedString.replace("{option1}", options[1]);
    generatedString = generatedString.replace("{option2}", options[2]);
    generatedString = generatedString.replace("{option3}", options[3]);
    return generatedString;
}
function insertBars(quizString, question) {
    let bars = question.split(/\n\s+/g);
    let barsHTML = "";
    for (let bar of bars) {
        barsHTML += `<span>${bar}</span>`;
    }
    let generateString = quizString;
    generateString = generateString.replace("{bars}", barsHTML);
    return generateString;
}
