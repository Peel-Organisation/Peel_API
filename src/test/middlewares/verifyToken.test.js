

describe("Middleware: verifyToken", () => {
    it("It should return 403 if no token is provided", async () => {
        const mockup = {
            auth: false,
            token: null,
            message: "No token provided !"
        }
        const mockJson = jest.fn();
        const mockStatus = jest.fn(() => ({ json: mockJson }));
        const res = { status: mockStatus, send: mockJson };
        const req = { headers: {} };
        const next = jest.fn();

        await verifyToken(req, res, next)
        expect(mockJson).toHaveBeenCalledWith(mockup);
        expect(mockStatus).toHaveBeenCalledWith(403);
    });

    it("It should return 401 if the token is invalid", async () => {
        const mockup = {
            auth: false,
            token: null,
            message: "Unauthorized !"
        }
        const mockJson = jest.fn();
        const mockStatus = jest.fn(() => ({ json: mockJson }));
        const res = { status: mockStatus, send: mockJson };
        const req = { headers: { authorization: "Bearer invalidToken" } };
        const next = jest.fn();

        await verifyToken(req, res, next)
        expect(mockJson).toHaveBeenCalledWith(mockup);
        expect(mockStatus).toHaveBeenCalledWith(401);
    });

    it("It should call next if the token is valid", async () => {
        const mockJson = jest.fn();
        const mockStatus = jest.fn(() => ({ json: mockJson }));
        const res = { status: mockStatus, send: mockJson };
        const req = { headers: { authorization: "Bearer validToken" } };
        const next = jest.fn();

        await verifyToken(req, res, next)
        expect(next).toHaveBeenCalled();
    });
});