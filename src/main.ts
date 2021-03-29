import { Templates } from "./Templates.js";

function buttonClick(type: string) {
    let mainContainer = document.getElementById("main") as HTMLElement;

    if (type === "play") {
        mainContainer.innerHTML = Templates.quizPage();
    }
    else if (type === "end") {
        mainContainer.innerHTML = Templates.scorePage();
    }

}

const main = document.querySelector("#main") as HTMLElement;
const button = main.children[0];
button.addEventListener('click', function () {
    buttonClick("play");
});