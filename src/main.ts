import { BarsDatabase } from "./BarsDatabase";
import { ButtonClickEvent } from "./ButtonClickEvent";
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
export function buttonClick(type: ButtonClickEvent) {
    let mainContainer = document.getElementById("main") as HTMLElement;

    if (type === ButtonClickEvent.PLAY) {
        currentQuiz = quizGenerator.generate();
        mainContainer.innerHTML = Templates.quizPage(currentQuiz);
    }
    else if (isOption(type)) {
        if (type === currentQuiz.answer) {
            score++;
        }
        currentQuiz = quizGenerator.generate();
        mainContainer.innerHTML = Templates.quizPage(currentQuiz);
    }
    else if (type === ButtonClickEvent.SKIP) {
        currentQuiz = quizGenerator.generate();
        mainContainer.innerHTML = Templates.quizPage(currentQuiz);
    }

    else if (type === ButtonClickEvent.END) {
        mainContainer.innerHTML = Templates.scorePage(score);
    }
}

function isOption(type: ButtonClickEvent) {
    return type === ButtonClickEvent.OPTION_0
        || type === ButtonClickEvent.OPTION_1
        || type === ButtonClickEvent.OPTION_2
        || type === ButtonClickEvent.OPTION_3;
}