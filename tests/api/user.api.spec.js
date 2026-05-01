const { test, expect, request: playwrightRequest } = require('@playwright/test');
const { UserApi } = require('../../api/user.api');

test.describe('Api Automation', () => {
  let apiContext;
  let userApi;
  let userId;

  test.beforeAll(async () => {
    apiContext = await playwrightRequest.newContext();
    userApi = new UserApi(apiContext);
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });

  test('TC-01  Create and validate', async () => {
    const body = await userApi.createUser('Raksh Shetty', 'QA Engineer');

    expect(body.name).toBe('Raksh Shetty');
    expect(body.job).toBe('QA Engineer');
    expect(body.id).toBeTruthy();
    expect(body.createdAt).toBeTruthy();
    
    userId = body.id;
    console.log(`created user ID: ${userId}`);  
  });


  test('TC-02 get user and validate', async () => {
    const body = await userApi.getUserById(2);
    const user = body.data;
    expect(user.id).toBe(2);
    expect(user.email).toBeTruthy();
    expect(user.first_name).toBeTruthy();
    expect(user.last_name).toBeTruthy();
    expect(user.avatar).toBeTruthy();

    console.log(`fetched: ${user.first_name} ${user.last_name} <${user.email}>`);
    console.log(`Stored userId from TC-01: ${userId}`);
  });



  test('TC-03 update and validate', async () => {
    const body = await userApi.updateUser(2, 'Raksh Updated', 'Automation QA');

    expect(body.name).toBe('Raksh Updated');
    expect(body.job).toBe('Automation QA');
    expect(body.updatedAt).toBeTruthy();

    console.log(`Updated name: ${body.name}, updatedAt: ${body.updatedAt}`);
  });
});