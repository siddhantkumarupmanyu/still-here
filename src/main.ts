import { Templates } from "./Templates";

export function buttonClick(type: string) {
    let mainContainer = document.getElementById("main") as HTMLElement;

    if (type === "play") {
        mainContainer.innerHTML = Templates.quizPage();
    }
    else if (type === "skip") {
        mainContainer.innerHTML = Templates.quizPage();
    }
    else if (type === "end") {
        mainContainer.innerHTML = Templates.scorePage();
    }

}