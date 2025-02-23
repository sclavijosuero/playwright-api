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
  const response = await apiFetch({ request, page }, `${baseUrl}/posts/1`);
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  expect(responseBody).toHaveProperty('id', 1);

  const response2 = await apiFetch({ request, page }, `${baseUrl}/posts`);
  expect(response2.status()).toBe(200);
  const responseBody2 = await response2.json();
  expect(responseBody2).toBeInstanceOf(Array);
  expect(responseBody2.length).toBeGreaterThan(0);

});