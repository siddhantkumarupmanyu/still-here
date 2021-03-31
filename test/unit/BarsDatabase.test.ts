import { BarsDatabase } from "../../src/BarsDatabase";


test("return a key and value at valid position", () => {
    const keyName = BarsDatabase.getKeyAt(4);
    expect(keyName).toBe("key4");

    const value = BarsDatabase.getValueAt(1, 4);
    expect(value).toBe("key1-value4");
});

// https://stackoverflow.com/questions/46042613/how-to-test-the-type-of-a-thrown-exception-in-jest

test("exception at invalid position", () => {
    expect(() => { BarsDatabase.getKeyAt(-1) }).toThrow(RangeError);
    expect(() => { BarsDatabase.getKeyAt(-1) }).toThrow("Key Index out of Bound");

    expect(() => { BarsDatabase.getValueAt(2, 5) }).toThrow(RangeError);
    expect(() => { BarsDatabase.getValueAt(2, 5) }).toThrow("Value Index out of Bound");
});

