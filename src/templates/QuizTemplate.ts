import { Quiz } from "../Quiz";

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
            <button class="btn option-btn fourth">{option0}</button>
        </div>
    </div>
    <div class="container-items">
        <div class="inner-item">
            <button class="btn option-btn fourth">{option1}</button>
        </div>
    </div>
    <div class="container-items">
        <div class="inner-item">
            <button class="btn option-btn fourth">{option2}</button>
        </div>
    </div>
    <div class="container-items">
        <div class="inner-item">
            <button class="btn option-btn fourth">{option3}</button>
        </div>
    </div>
    <div class="container-items">
        <div class="inner-item last-item">
            <button class="btn fourth">End</button>
            <button class="btn fourth">Skip</button>
        </div>
    </div>
`;

export function templateString(quiz: Quiz) {
    let generatedString = quizString;
    generatedString = insertOptions(generatedString, quiz.options);
    generatedString = insertBars(generatedString, quiz.question);
    return generatedString;
}


function insertOptions(quizString: string, options: string[]) {
    let generatedString = quizString;
    generatedString.replace("{option0}", options[0]);
    generatedString.replace("{option1}", options[1]);
    generatedString.replace("{option2}", options[2]);
    generatedString.replace("{option3}", options[3]);
    return generatedString;
}

function insertBars(quizString: string, question: string) {
    let bars = question.split(/\n\s+/g);
    let barsHTML = "";
    for (let bar of bars) {
        barsHTML += `<span>${bar}</span>`;
    }
    let generateString = quizString;
    generateString = generateString.replace("{bars}", barsHTML);
    return generateString;
}
// <span>Dekhe mene aate jaate bohot se (yahan),</span>
// <span>Iss duniya se jaana anjaan, ye mera khauf hai</span>