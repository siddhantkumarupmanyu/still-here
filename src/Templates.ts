export class Templates {
    private constructor() {
    }

    // https://stackoverflow.com/questions/23296094
    // myBundle: browserify bundle name
    // to change see bundle command in package.json

    static startingPage(): string {
        return `<button onclick="myBundle.buttonClick('play')">Play</button>`;
    }

    static quizPage(): string {
        const template: string = `<button onclick="myBundle.buttonClick('end')">End</button>`;
        return template;
    }

    static scorePage(): string {
        return `<p>Score 0</p>`;
    }

}