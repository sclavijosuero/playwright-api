# pw-api (Beta)

Playwright plugin for comprehensive API testing, presenting results in a user-friendly manner.

## Main Features


## Installation

```sh
npm install -D pw-api
```

## Compatibility


## Configuration

- Add the following line to your test file:

  ```js
  import 'pw-api';
  ```


## API Reference

### ✔️ apiFetch

**Description:**  
Fetches data from the API and adds the API response to the UI.

- **Parameters:**
  - `params` *(Object)*: The parameters for the function.
    - `request` *(APIRequestContext)*: The APIRequestContext fixture.
    - `page` *(Page)*: The Page fixture.
  - `urlOrRequest` *(string | Request)*: The URL or Request object to fetch.
  - `options` *(object, optional)*: Optional parameters for the FETCH request.

- **Returns:**  
  - A `Promise<APIResponse>` that resolves to the APIResponse.

### ✔️ apiGet

**Description:**  
Makes a GET request to the specified URL and adds the API response to the UI.

- **Parameters:**
  - `params` *(Object)*: The parameters for the function.
    - `request` *(APIRequestContext)*: The APIRequestContext fixture.
    - `page` *(Page)*: The Page fixture.
  - `url` *(string)*: The URL to send the GET request to.
  - `options` *(object, optional)*: Optional parameters for the GET request.

- **Returns:**  
  - A `Promise<APIResponse>` that resolves to the APIResponse.

### ✔️ apiPost

**Description:**  
Sends a POST request to the specified URL and adds the API response to the UI.

- **Parameters:**
  - `params` *(Object)*: The parameters for the function.
    - `request` *(APIRequestContext)*: The APIRequestContext fixture.
    - `page` *(Page)*: The Page fixture.
  - `url` *(string)*: The URL to send the POST request to.
  - `options` *(object, optional)*: Optional settings for the POST request.

- **Returns:**  
  - A `Promise<APIResponse>` that resolves to the APIResponse.

### ✔️ apiPut

**Description:**  
Sends a PUT request to the specified URL and adds the API response to the UI.

- **Parameters:**
  - `params` *(Object)*: The parameters for the function.
    - `request` *(APIRequestContext)*: The APIRequestContext fixture.
    - `page` *(Page)*: The Page fixture.
  - `url` *(string)*: The URL to send the PUT request to.
  - `options` *(object, optional)*: Optional settings for the PUT request.

- **Returns:**  
  - A `Promise<APIResponse>` that resolves to the APIResponse.

### ✔️ apiDelete

**Description:**  
Sends a DELETE request to the specified URL and adds the API response to the UI.

- **Parameters:**
  - `params` *(Object)*: The parameters for the function.
    - `request` *(APIRequestContext)*: The APIRequestContext fixture.
    - `page` *(Page)*: The Page fixture.
  - `url` *(string)*: The URL to send the DELETE request to.
  - `options` *(object, optional)*: Optional settings for the DELETE request.

- **Returns:**  
  - A `Promise<APIResponse>` that resolves to the APIResponse.

### ✔️ apiPatch

**Description:**  
Sends a PATCH request to the specified URL and updates the UI with the response.

- **Parameters:**
  - `params` *(Object)*: The parameters for the function.
    - `request` *(APIRequestContext)*: The APIRequestContext fixture.
    - `page` *(Page)*: The Page fixture.
  - `url` *(string)*: The URL to send the PATCH request to.
  - `options` *(object, optional)*: Optional settings for the PATCH request.

- **Returns:**  
  - A `Promise<APIResponse>` that resolves to the API response.

### ✔️ apiHead

**Description:**  
Sends a HEAD request to the specified URL and adds the API response to the UI.

- **Parameters:**
  - `params` *(Object)*: The parameters for the function.
    - `request` *(APIRequestContext)*: The APIRequestContext fixture.
    - `page` *(Page)*: The Page fixture.
  - `url` *(string)*: The URL to send the HEAD request to.
  - `options` *(object, optional)*: Optional parameters for the HEAD request.

- **Returns:**  
  - A `Promise<APIResponse>` that resolves to the API response.


## Usage

```js
// tests/example.spec.ts

import { test, expect } from '@playwright/test';
import { apiFetch, apiGet, apiPost, apiPut, apiDelete, apiPatch, apiHead } from '../src/index';


test.describe('API Tests for https://jsonplaceholder.typicode.com', () => {

    const baseUrl = 'https://jsonplaceholder.typicode.com';


    test('Test for apiFetch (default GET)', async ({ request, page }) => {

        // Example of apiFetch (default GET)
        const responseFetch = await apiFetch({ request, page }, `${baseUrl}/posts`);
        expect(responseFetch.status()).toBe(200);

    })


    test('Test for apiGet, apiPost, apiPut, apiPatch, and apiDelete', async ({ request, page }) => {

        // Example of apiGet
        const responseGet = await apiGet({ request, page }, `${baseUrl}/posts/1`);
        expect(responseGet.status()).toBe(200);
        const responseBodyGet = await responseGet.json();
        expect(responseBodyGet).toHaveProperty('id', 1);


        // Example of apiPost with request body and request headers
        const responsePost = await apiPost({ request, page }, `${baseUrl}/posts`, {
            body: {
                title: 'foo',
                body: 'bar',
                userId: 1,
            },
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        });
        expect(responsePost.status()).toBe(201);


        // Example of apiPut
        const responsePut = await apiPut({ request, page }, 'https://jsonplaceholder.typicode.com/posts/1', {
            body: {
                id: 1,
                title: 'foo',
                body: 'bar',
                userId: 1,
            },
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        expect(responsePut.ok()).toBeTruthy();


        // Example of apiPatch
        const responsePatch = await apiPatch({ request, page }, 'https://jsonplaceholder.typicode.com/posts/1', {
            body: {
                title: 'foo',
            },
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        expect(responsePatch.ok()).toBeTruthy();


        // Test for apiDelete
        const responseDelete = await apiDelete({ request, page }, 'https://jsonplaceholder.typicode.com/posts/1');
        expect(responseDelete.ok()).toBeTruthy();

    })

})
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.


## Changelog

### [0.0.1] (Beta)

