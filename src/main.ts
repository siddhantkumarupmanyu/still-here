import { Templates } from "./Templates";

function buttonClick(type: string) {
    let mainContainer = document.getElementById("main") as HTMLElement;

    if (type === "play") {
        mainContainer.innerHTML = Templates.quizPage();
    }
    else if (type === "end") {
        mainContainer.innerHTML = Templates.scorePage();
    }

}

export function clickMain2(name: string) {
    console.log(name);
}