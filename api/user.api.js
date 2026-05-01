const { expect } = require('@playwright/test');

class UserApi {
  constructor(request) {
    this.request = request;
    // Read at construction time — dotenv is already loaded by playwright.config.js
    this.baseUrl = process.env.API_BASE_URL;
    this.headers = {
      'Content-Type': 'application/json',
      'x-api-key': process.env.REQRES_API_KEY,
    };
  }

  async createUser(name, job) {
    const response = await this.request.post(`${this.baseUrl}/api/users`, {
      data: { name, job },
      headers: this.headers,
    });
    expect(response.status()).toBe(201);
    return await response.json();
  }

  async getUserById(userId) {
    const response = await this.request.get(`${this.baseUrl}/api/users/${userId}`, {
      headers: this.headers,
    });
    expect(response.status()).toBe(200);
    return await response.json();
  }

  async updateUser(userId, name, job) {
    const response = await this.request.put(`${this.baseUrl}/api/users/${userId}`, {
      data: { name, job },
      headers: this.headers,
    });
    expect(response.status()).toBe(200);
    return await response.json();
  }
}

module.exports = { UserApi };