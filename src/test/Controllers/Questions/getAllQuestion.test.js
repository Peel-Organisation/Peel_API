import { getAllQuestion } from "../../../controllers/question.controller";
import Question from "../../../models/question";
import { RandomQuestionsTab } from "./question.js"

jest.mock("../../../models/question", () => ({
    Question: {
        findAll: jest.fn(),
    },
}));

class CustomError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
    }
}

describe("Controller: getAllQuestion", () => {
    it("It should return a list of questions", async () => {
        const mockup = {
            success: true,
            message: "questions successfully retrieved",
            questions: RandomQuestionsTab
        }
        // On simule la methode findAll du model Question
        Question.find = jest.fn().mockResolvedValue(mockup.questions);
        // On simule les methodes json et status de l'objet response
        const mockJson = jest.fn();
        const mockStatus = jest.fn(() => ({ json: mockJson }));
        // On simule l'objet response
        const res = { status: mockStatus };
        // On simule l'ojet request
        const req = {};
        const next = jest.fn()

        // On appelle la fonction getALLQuestion
        await getAllQuestion(req, res, next)
        // On vérifie que la fonction json a bien été appelée avec le mockup
        expect(mockJson).toHaveBeenCalledWith(mockup);
        // On vérifie que la fonction status a bien été appelée avec le code 200
        expect(mockStatus).toHaveBeenCalledWith(200);

    });
    it("It should return return 404 not found with an empty list", async () => {
        const mockup = new CustomError("questions not found", 404)
        // On simule les méthodes
        Question.find = jest.fn().mockResolvedValue([]);
        const mockJson = jest.fn();
        const mockStatus = jest.fn(() => ({ json: mockJson }));
        const res = { status: mockStatus };
        const req = {};
        const next = jest.fn().mockName('next');

        await getAllQuestion(req, res, next)
        await next
        expect(next).toHaveBeenCalledWith(mockup)
    });
    it("It should return 500 internal server error", async () => {
        const mockup = new CustomError("Internal server error", 500)
        // On simule les méthodes
        Question.find = jest.fn().mockRejectedValue(new CustomError("Internal server error", 500));
        const mockJson = jest.fn();
        const mockStatus = jest.fn(() => ({ json: mockJson }));
        const res = { status: mockStatus };
        const req = {};
        const next = jest.fn().mockName('next');


        await getAllQuestion(req, res, next)
        await next
        expect(next).toHaveBeenCalledWith(mockup)
    });
});

