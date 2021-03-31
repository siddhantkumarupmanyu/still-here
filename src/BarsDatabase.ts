
export class BarsDatabase {

    private static map = new Map([
        ["key0", ["key0-value0", "key0-value1", "key0-value2", "key0-value3", "key0-value4"]],
        ["key1", ["key1-value0", "key1-value1", "key1-value2", "key1-value3", "key1-value4"]],
        ["key2", ["key2-value0", "key2-value1", "key2-value2", "key2-value3", "key2-value4"]],
        ["key3", ["key3-value0", "key3-value1", "key3-value2", "key3-value3", "key3-value4"]],
        ["key4", ["key4-value0", "key4-value1", "key4-value2", "key4-value3", "key4-value4"]]
    ]);

    private constructor() { }

    static getKeyAt(position: number) {
        const key = Array.from(this.map.keys())[position];
        if (key === undefined) {
            throw new RangeError("Key Index out of Bound");
        }
        return key;
    }

    static getValueAt(keyPosition: number, valuePosition: number) {
        const key = this.getKeyAt(keyPosition);
        const valueArray = this.map.get(key) as Array<string>;
        const value = valueArray[valuePosition];
        if (value === undefined) {
            throw new RangeError("Value Index out of Bound");
        }
        return value;
    }
}