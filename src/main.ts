

function buttonClick(type: string) {
    let mainContainer = document.getElementById("main") as HTMLElement;

    if (type === "play") {
        mainContainer.innerHTML = `<button onclick="buttonClick('end')">End</button>`;
    }
    else if (type === "end") {
        mainContainer.innerHTML = `<p>Score 0</p>`;
    }

}