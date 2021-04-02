import { Quiz } from "./Quiz";

export class Templates {
    private constructor() {
    }

    static startingPage(): string {
        return this.createButton("play", "Play");
    }

    static quizPage(quiz: Quiz): string {
        const template =
            `<p>${quiz.question}</p>` +
            this.createButton("1", `${quiz.options[0]}`) + this.createButton("1", `${quiz.options[1]}`) +
            this.createButton("1", `${quiz.options[2]}`) + this.createButton("1", `${quiz.options[3]}`) +
            this.createButton("end", "End") + this.createButton("skip", "Skip");
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