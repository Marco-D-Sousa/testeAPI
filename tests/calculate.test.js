const request = require('supertest');
const baseURL = "http://localhost:3333";

describe('POST /calculate', () => {
    it('should respond with the correct total and discount', async () => {
        const requestBody = {
            userId: 1,
            productList: [1]
        };
        
        const response = await request(baseURL)
            .post('/calculate')
            .send(requestBody)
            .set('Accept', 'text/plain');

        expect(response.statusCode).toBe(200);
        expect(response.text).toContain('A taxa de desconto do usuário é de 1.21');
        expect(response.text).toContain('O total do valor dos produtos é: 2435');
        expect(response.text).toContain('O valor a ser pago é: 2405.54');
    });

    it('return error for userId empty', async () => {
        const requestBody = {
            userId: "",
            productList: [1]
        };

        const response = await request(baseURL)
            .post('/calculate')
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
            .post('/calculate')
            .send(requestBody)
            .set('Accept', 'text/plain');

        expect(response.statusCode).toBe(400);
    });
});