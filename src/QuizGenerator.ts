import { BarsDatabase } from "./BarsDatabase";
import { Quiz } from "./Quiz";

const ZERO = 0;

export class QuizGenerator {

    private database: BarsDatabase
    private numberGenerator: (lowerBound: number, upperBound: number) => number

    constructor(barsDatabase: BarsDatabase, numberGenerator: (lowerBound: number, upperBound: number) => number) {
        this.database = barsDatabase;
        this.numberGenerator = numberGenerator;
    }

    // Todo clean this up
    generate() {
        const answerKeyIndex = this.numberGenerator(ZERO, this.database.getKeyCount());
        const questionIndex = this.numberGenerator(ZERO, this.database.getValueCount(answerKeyIndex));

        const question = this.database.getValueAt(answerKeyIndex, questionIndex);

        // const key = this.database.getKeyAt(keyIndex);

        const option1Index = this.numberGenerator(ZERO, this.database.getKeyCount());
        const option2Index = this.numberGenerator(ZERO, this.database.getKeyCount());
        const option3Index = this.numberGenerator(ZERO, this.database.getKeyCount());

        const answerKey = this.database.getKeyAt(answerKeyIndex);
        const option1 = this.database.getKeyAt(option1Index);
        const option2 = this.database.getKeyAt(option2Index);
        const option3 = this.database.getKeyAt(option3Index);

        let options = [option1, option2, option3, answerKey];

        this.shuffle(options);

        return new Quiz(question, options, options.indexOf(answerKey));
    }

    /**
     * Shuffles array in place.
     * @param {Array} a items An array containing the items.
     */
    private shuffle(a: Array<string>) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }

    // https://stackoverflow.com/a/6274381
}