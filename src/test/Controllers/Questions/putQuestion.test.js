import { getQuestion } from "../../../controllers/question.controller";
import Question from "../../../models/question";
import { RandomQuestion } from "./question.js"

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

describe("Controller: putQuestion", () => {
    it("It should update a specific question with an ID", async () => {
        const mockup = {
            success: true,
            message: "question successfully updated",
            question: RandomQuestion
        }
        Question.update = jest.fn().mockResolvedValue(mockup.question);
        // On simule les methodes json et status de l'objet response
        const mockJson = jest.fn();
        const mockStatus = jest.fn(() => ({ json: mockJson }));
        // On simule l'objet response
        const res = { status: mockStatus };
        // On simule l'ojet request
        const req = { params: { id: mockup.question.id } };
        const next = jest.fn()

        // On appelle la fonction getALLQuestion
        await getQuestion(req, res, next)
        // On vérifie que la fonction json a bien été appelée avec le mockup
        expect(mockJson).toHaveBeenCalledWith(mockup);
        // On vérifie que la fonction status a bien été appelée avec le code 200
        expect(mockStatus).toHaveBeenCalledWith(200);

    })

    it("It should return 404 code if the question is not found", async () => {
        const mockup = new CustomError("question not found", "404")
        // On simule les méthodes
        Question.find = jest.fn().mockResolvedValue([]);
        const mockJson = jest.fn();
        const mockStatus = jest.fn(() => ({ json: mockJson }));
        const res = { status: mockStatus };
        const req = { params: { id: RandomQuestion.id } };
        const next = jest.fn().mockName('next');

        await getQuestion(req, res, next)
        await next
        expect(next).toHaveBeenCalledWith(mockup)
    });

    it("It should return 500 internal server error", async () => {
        const mockup = new CustomError("Internal server error", 500)
        // On simule les méthodes
        Question.find = jest.fn().mockRejectedValue(mockup);
        const mockJson = jest.fn();
        const mockStatus = jest.fn(() => ({ json: mockJson }));
        const res = { status: mockStatus };
        const req = { params: { id: RandomQuestion.id } };
        const next = jest.fn().mockName('next');

        await getQuestion(req, res, next)
        await next
        expect(next).toHaveBeenCalledWith(mockup)
    });

    it("It should return 400 code if the ID is not valid", async () => {
        const mockup = new CustomError("Bad request", 400)
        // On simule les méthodes
        Question.find = jest.fn().mockRejectedValue(mockup);
        const mockJson = jest.fn();
        const mockStatus = jest.fn(() => ({ json: mockJson }));
        const res = { status: mockStatus };
        const req = { params: { id: "invalidID" } };
        const next = jest.fn().mockName('next');

        await getQuestion(req, res, next)
        await next
        expect(next).toHaveBeenCalledWith(mockup)
    });
    it("It should return 400 code if fields are missing", async () => {
        const mockup = new CustomError("Bad request", 400)
        // On simule les méthodes
        Question.find = jest.fn().mockRejectedValue(mockup);
        const mockJson = jest.fn();
        const mockStatus = jest.fn(() => ({ json: mockJson }));
        const res = { status: mockStatus };
        const req = { params: { id: RandomQuestion.id } };
        const next = jest.fn().mockName('next');

        await getQuestion(req, res, next)
        await next
        expect(next).toHaveBeenCalledWith(mockup)
    });
});
