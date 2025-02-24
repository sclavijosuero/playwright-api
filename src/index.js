import hljs from 'highlight.js/lib/common'
import packageJSON from '../package.json'

// Get highlight version dinamically from the package.json to chose the right css file
const hljsVersion = packageJSON['dependencies']['highlight.js'].replace(/[\^~]/g, '')


const apiFetch = async ({ request, page }, urlOrRequest, options) => {
    const response = await request.fetch(urlOrRequest, options);
    await addApiCardToUI({ request, page, response }, options)

    return response
};

const addApiCardToUI = async ({ request, page, response }, options) => {
    const emptyPageHtml = '<html><head></head><body></body></html>'
    let html

    const apiCallHtml = await createApiCallHtml({ request, page, response }, options)

    const currentHtml = await page.content()
    if (currentHtml === emptyPageHtml) {
        html = await createPageHtml(apiCallHtml)
    } else {
        html = await addApiCallHtml(currentHtml, apiCallHtml)
    }

    await page.setContent(html);
}

const addApiCallHtml = async (currentHtml, apiCallHtml) => {
    return currentHtml.replace(/<\/div>\s*<\/body>\s*<\/html>/, `${apiCallHtml}</div></body></html>`)
}

const createApiCallHtml = async ({ request, page, response }, options) => {
    // Request Method
    const requestMethod = options?.method || 'GET';
    // Request Headers
    const requestHeadersJson = (options && options.headers) ? formatJson(options.headers) : undefined;
    // Request Body
    const requestBodyJson = (options && options.body) ? formatJson(options.body) : undefined;

    // Response Status
    const responseStatus = response.status()
    const statusClass = responseStatus.toString().charAt(0) + 'xx'
    // Response Headers
    const responseHeaders = response.headers()
    const responseHeadersJson = responseHeaders ? formatJson(responseHeaders) : undefined;
    // Response Body
    const responseBody = await response.json();
    const responseBodyJson = responseBody ? formatJson(responseBody) : undefined;

    // URL actually from the response
    const url = response.url()

    return `<div class="pw-api-call pw-card">
        <div class="pw-api-request">
            <label class="title">REQUEST - </label>
            <label class="title-property">(METHOD: ${requestMethod})</label>
            </br>
            <label class="property">URL:</label>
            <pre class="hljs pw-api-hljs">${url}</b></pre>
            ${requestHeadersJson ? `<label class="property">HEADERS:</label>
            <pre class="hljs">${requestHeadersJson}</pre>` : ''}
            ${requestBodyJson ? `<label class="property">BODY:</label>
            <pre class="hljs">${requestBodyJson}</pre>` : ''}
        </div>
        <hr>
        <div class="pw-api-response">
            <label class="title">RESPONSE - </label>
            <label class="title-property pw-api-${statusClass}">(STATUS: ${responseStatus})</label>
            <br>
            ${responseBodyJson ? `<label class="property">BODY:</label>
            <pre class="hljs">${responseBodyJson}</pre>` : ''}
        </div>
    </div>`
}

const createPageHtml = async (apiCallHtml) => {

    return `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Simple HTML Page</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/${hljsVersion}/styles/vs.min.css"/>
            ${inLineStyles}
        </head>
        <body>
            <div class="pw-api-container">${apiCallHtml}</div>
        </body>
    </html>`
}

const formatJson = (jsonObject) => {
    return hljs.highlight(JSON.stringify(jsonObject, null, 4), {
        language: 'json',
    }).value
}

const inLineStyles = `<style>
    .pw-card { box-shadow: 0 4px 8px 0 rgba(0,0,0,0.3); transition: 0.3s; }
    .pw-card:hover { box-shadow: 0 8px 16px 0 rgba(0,0,0,0.5); background-color: rgb(173, 216, 230);}
    .pw-api-container { color: rgb(40, 40, 40); }
    .pw-api-call { background-color: rgb(200, 230, 240); border-radius: 8px; margin: 35px 12px; padding: 10px 15px; text-align: left; font-family: monospace; }
    .pw-api-request { text-align: left; padding-bottom: 1em; }
    .pw-api-response { text-align: left; margin-top: 1em; }
    .pw-api-request .title, .pw-api-response .title { font-weight: 800; font-size: 1.8em; line-height: 2em; padding-bottom: 18px; }
    .pw-api-request .title-property, .pw-api-response .title-property { color: rgb(60, 60, 60); font-weight: 800; font-size: 1.3em; }
    .pw-api-request .property, .pw-api-response .property { color: rgb(70, 70, 70); font-weight: 800; font-size: 1.2em;}
    .pw-api-hljs { font-size: 1.1em;}
    .pw-api-1xx { color: rgb(3, 152, 158)!important; }
    .pw-api-2xx { color: rgb(0, 128, 54)!important; }
    .pw-api-3xx { color: rgb(217, 98, 32)!important; }
    .pw-api-4xx { color: rgb(200, 0, 0)!important; }
    .pw-api-5xx { color: rgb(160, 20, 28)!important; }
    .hljs { background: rgb(238, 251, 255); text-wrap: wrap; padding: 6px; margin: 8px 0 15px 10px; border-radius: 6px; line-height: 1.5em; }
</style>`

export { apiFetch }
