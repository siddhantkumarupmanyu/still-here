export class Templates {
    private constructor() {
    }

    static startingPage(): string {
        return this.createButton("play", "Play");
    }

    static quizPage(): string {
        const template: string = this.createButton("end", "End") + this.createButton("skip", "Skip");
        return template;
    }

    static scorePage(): string {
        return `<p>Score 0</p>`;
    }

    // https://stackoverflow.com/questions/23296094
    // myBundle: browserify bundle name
    // to change; see bundle command in package.json

    private static createButton(type: string, text: string): string {
        return `<button onclick="myBundle.buttonClick('${type}')">${text}</button>`;
    }

}