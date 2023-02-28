const request = require('supertest');
const baseURL = "http://localhost:3333";

describe('POST /calculate', () => {
    it('should respond with the correct total and discount', async () => {
        const requestBody = {
            userId: 1,
            productList: [1]
        };
        
        const response = await request(baseURL)
            .post('/users/calculate')
            .send(requestBody)
            .set('Accept', 'text/plain');

        expect(response.statusCode).toBe(200);
        expect(response.text).toContain('0.79');
        expect(response.text).toContain('2435');
        expect(response.text).toContain('2415.76');
    });

    it('return error for userId empty', async () => {
        const requestBody = {
            userId: "",
            productList: [1]
        };

        const response = await request(baseURL)
            .post('/users/calculate')
            .send(requestBody)
            .set('Accept', 'text/plain');

        expect(response.statusCode).toBe(400);
    });

    it('return error for productList empty', async () => {
        const requestBody = {
            userId: 1,
            productList: ""
        };

        const response = await request(baseURL)
            .post('/users/calculate')
            .send(requestBody)
            .set('Accept', 'text/plain');

        expect(response.statusCode).toBe(400);
    });

    it("return error for userId > user.length", async () => {
        const requestBody = {
            userId: 101,
            productList: [1]
        };

        const response = await request(baseURL)
            .post('/users/calculate')
            .send(requestBody)
            .set('Accept', 'text/plain');
        
        expect(response.statusCode).toBe(400);
    });

    it("return error for userId < user.length", async () => {
        const requestBody = {
            userId: -1,
            productList: [1]
        };

        const response = await request(baseURL)
            .post('/users/calculate')
            .send(requestBody)
            .set('Accept', 'text/plain');
        
        expect(response.statusCode).toBe(400);
    })
});