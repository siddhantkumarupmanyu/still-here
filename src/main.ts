import { BarsDatabase } from "./BarsDatabase";
import { Quiz } from "./Quiz";
import { QuizGenerator } from "./QuizGenerator";
import { randomNumberGenerator } from "./randomNumberGenerator";
import { stillHereBarsObj } from "./stillHereBars";
import { Templates } from "./Templates";

const barsDatabase = new BarsDatabase(stillHereBarsObj);
const quizGenerator = new QuizGenerator(barsDatabase, randomNumberGenerator);

let currentQuiz: Quiz;
let score = 0;

// TODO: remove duplicates
export function buttonClick(type: string) {
    let mainContainer = document.getElementById("main") as HTMLElement;

    if (type === "play") {
        currentQuiz = quizGenerator.generate();
        mainContainer.innerHTML = Templates.quizPage(currentQuiz);
    }
    else if (isOption(type)) {
        if (type === currentQuiz.answer.toString()) {
            score++;
        }
        currentQuiz = quizGenerator.generate();
        mainContainer.innerHTML = Templates.quizPage(currentQuiz);
    }
    else if (type === "skip") {
        currentQuiz = quizGenerator.generate();
        mainContainer.innerHTML = Templates.quizPage(currentQuiz);
    }

    else if (type === "end") {
        mainContainer.innerHTML = Templates.scorePage(score);
    }
}

function isOption(type: string) {
    console.log("Option: " + type);
    return type === "1" || type === "2" || type === "3" || type === "4";
}