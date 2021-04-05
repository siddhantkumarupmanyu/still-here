import { BarsDatabase } from "./BarsDatabase";
import { Quiz } from "./Quiz";

export class QuizGenerator {

    private database: BarsDatabase
    private numberGenerator: (upperBound: number) => number

    constructor(barsDatabase: BarsDatabase, numberGenerator: (upperBound: number) => number) {
        this.database = barsDatabase;
        this.numberGenerator = numberGenerator;
    }

    generate(): Quiz {
        return this.newQuiz();
    }

    // Todo clean this up
    private newQuiz() {
        const indexes = this.getKeyAndValueIndex();
        const answerKeyIndex = indexes[0];
        const questionIndex = indexes[1];

        const question = this.database.popValueAt(answerKeyIndex, questionIndex);

        const answerKey = this.database.getKeyAt(answerKeyIndex);

        let options = [answerKey];

        let i = 0;
        while (i < 3) {
            const optionIndex = this.numberGenerator(this.database.getKeyCount());
            const option = this.database.getKeyAt(optionIndex);

            if (!options.includes(option)) {
                options.push(option);
                i++;
            }
        }

        this.shuffle(options);

        return new Quiz(question, options, options.indexOf(answerKey));
    }

    // this function can be broken down into smaller functions
    private getKeyAndValueIndex() {
        let answerKeyIndex = this.numberGenerator(this.database.getKeyCount());

        let valueCount = this.database.getValueCount(answerKeyIndex);

        while (valueCount === 0) {
            answerKeyIndex = this.numberGenerator(this.database.getKeyCount());
            valueCount = this.database.getValueCount(answerKeyIndex);
        }

        const valueIndex = this.numberGenerator(valueCount);

        return [answerKeyIndex, valueIndex];
    }

    // https://stackoverflow.com/a/6274381
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
}
