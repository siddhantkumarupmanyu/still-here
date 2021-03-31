export class Quiz {
    readonly question: string
    readonly options: Array<string>
    readonly answerKey: number

    constructor(question: string, options: Array<string>, answerKey: number) {
        this.question = question;
        this.options = options;
        this.answerKey = answerKey;
    }

    equals(obj: Quiz): boolean {
        return this.question === obj.question;
    }
}