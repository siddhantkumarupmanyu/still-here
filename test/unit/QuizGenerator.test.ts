import * as BarsDatabaseModel from "../../src/BarsDatabase";
import { QuizGenerator } from "../../src/QuizGenerator";

const mockGetKeyAt = jest.fn();
const mockGetValueAt = jest.fn();
const mockNumberGenerator = jest.fn();
const mockGetKeyCount = jest.fn();
const mockGetValueCount = jest.fn();

const emptyObj = {}

jest.mock('../../src/BarsDatabase', () => {
    return {
        BarsDatabase: jest.fn(() => {
            return {
                getKeyAt: mockGetKeyAt,
                getValueAt: mockGetValueAt,
                getKeyCount: mockGetKeyCount,
                getValueCount: mockGetValueCount
            };
        })
    };
});

let quizGenerator: QuizGenerator

const mockedModel = BarsDatabaseModel as jest.Mocked<typeof BarsDatabaseModel>;
const barsDatabaseMock = mockedModel.BarsDatabase;

beforeEach(() => {
    const barsDatabase = new BarsDatabaseModel.BarsDatabase(emptyObj);
    quizGenerator = new QuizGenerator(barsDatabase, mockNumberGenerator);
});

afterEach(() => {
    jest.resetAllMocks();
});

test("calls numberGenerator", () => {
    mockGetKeyCount.mockReturnValue(4);
    mockGetValueCount.mockReturnValue(3);

    quizGenerator.generate();

    expect(mockNumberGenerator).toHaveBeenCalledTimes(5);
    expect(mockNumberGenerator).toHaveBeenNthCalledWith(1, 0, 4);
    expect(mockNumberGenerator).toHaveBeenNthCalledWith(2, 0, 3);
});

// test("options should be unique", () => {
//     mockNumberGenerator.mockReturnValueOnce(5).mockReturnValueOnce(2);

//     // mockNumberGenerator
//     //     .mockReturnValueOnce(3)
//     //     .mockReturnValueOnce(4)
//     //     .mockReturnValueOnce(3)
//     //     .mockReturnValueOnce(2)
//     //     .mockReturnValueOnce(1);

//     // const quiz = quizGenerator.generate();

//     expect(mockNumberGenerator).toHaveBeenCalledTimes(7);
// });

test("generates question", () => {
    mockNumberGenerator.mockReturnValueOnce(2).mockReturnValueOnce(2);
    mockGetValueAt.mockReturnValueOnce("key2-value2");

    const quiz = quizGenerator.generate();

    expect(quiz.question).toBe("key2-value2");
    expect(mockGetValueAt).toHaveBeenCalledTimes(1);
    expect(mockGetValueAt).toHaveBeenCalledWith(2, 2);
});

test("generate answer", () => {
    mockNumberGenerator.mockReturnValueOnce(2).mockReturnValueOnce(2);
    mockGetKeyCount.mockReturnValue(4);

    mockGetValueAt.mockReturnValueOnce("key2-value2");
    mockGetKeyAt
        .mockReturnValueOnce("key2")
        .mockReturnValueOnce("2")
        .mockReturnValueOnce("3")
        .mockReturnValueOnce("4");

    const quiz = quizGenerator.generate();

    expect(quiz.question).toBe("key2-value2");
    expect(quiz.options).toContain("key2");
    expect(quiz.answer).toBe(quiz.options.indexOf("key2"));
});

// https://stackoverflow.com/questions/53502054/mock-imported-class-in-typescript-with-jest
// https://stackoverflow.com/a/58034052

// additional note: https://jestjs.io/docs/mock-functions#custom-matchers
// https://jestjs.io/docs/es6-class-mocks

// https://jestjs.io/docs/es6-class-mocks#spying-on-methods-of-our-class
// https://jestjs.io/docs/es6-class-mocks#mocking-non-default-class-exports

// May be there is a better way to write mocks; i.e using some syntactic sugar;