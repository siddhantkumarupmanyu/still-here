export class Templates {
    private constructor() {
    }

    static startingPage(): string {
        return `<button onclick="buttonClick('play')">Play</button>`;
    }

    static quizPage(): string {
        const template: string = `<button onclick="buttonClick('end')">End</button>`;
        return template;
    }

    static scorePage(): string {
        return `<p>Score 0</p>`;
    }

}