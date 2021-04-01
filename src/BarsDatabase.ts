
export class BarsDatabase {

    private barsObject: Object;

    constructor(barsObj: Object) {
        this.barsObject = barsObj
    }

    getKeyAt(index: number) {
        const key = Object.keys(this.barsObject)[index];
        if (key === undefined) {
            throw new RangeError("Key Index out of Bound");
        }
        return key;
    }

    // https://stackoverflow.com/questions/62438346/how-to-dynamically-access-object-property-in-typescript

    getValueAt(keyIndex: number, valueIndex: number) {
        const key = this.getKeyAt(keyIndex) as keyof Object;
        const valueArray = this.barsObject[key] as unknown as Array<string>;
        const value = valueArray[valueIndex];
        if (value === undefined) {
            throw new RangeError("Value Index out of Bound");
        }
        return value;
    }
}

// additional notes:
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html#keyof-and-lookup-types 