import { BarsDatabase } from "./BarsDatabase";
import { QuizGenerator } from "./QuizGenerator";
import { randomNumberGenerator } from "./randomNumberGenerator";
import { stillHereBarsObj } from "./stillHereBars";
import { Templates } from "./Templates";

const barsDatabase = new BarsDatabase(stillHereBarsObj);
const quizGenerator = new QuizGenerator(barsDatabase, randomNumberGenerator);

export function buttonClick(type: string) {
    let mainContainer = document.getElementById("main") as HTMLElement;

    if (type === "play") {
        mainContainer.innerHTML = Templates.quizPage(quizGenerator.generate());
    }
    else if (type === "skip") {
        mainContainer.innerHTML = Templates.quizPage(quizGenerator.generate());
    }
    else if (type === "end") {
        mainContainer.innerHTML = Templates.scorePage();
    }

}