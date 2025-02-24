import { test, expect } from '@playwright/test';
import { apiFetch } from '../src';

const baseUrl = 'https://jsonplaceholder.typicode.com';

test('GET /posts/1', async ({ request, page }) => {
  const response = await request.get(`${baseUrl}/posts/1`);
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  expect(responseBody).toHaveProperty('id', 1);

});

test('FETCH /posts/1', async ({ request, page }) => {
  const response = await request.fetch(`${baseUrl}/posts/1`);
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  expect(responseBody).toHaveProperty('id', 1);


});

test('APIFETCH /posts/1', async ({ request, page }) => {
  // API Call1
  const response = await apiFetch({ request, page }, `${baseUrl}/posts/1`);
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  expect(responseBody).toHaveProperty('id', 1);

  // API Call2
  const response2 = await apiFetch({ request, page }, `${baseUrl}/posts`, {
    method: 'POST',
    body: {
      title: 'foo',
      body: 'bar',
      userId: 1,
    },
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    }
  });
  expect(response2.status()).toBe(201);

  //API Call3
  const response3 = await apiFetch({ request, page }, `${baseUrl}/posts`);
  expect(response3.status()).toBe(200);
  const responseBody3 = await response3.json();

});