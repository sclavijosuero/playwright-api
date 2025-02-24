import hljs from 'highlight.js/lib/common'
import packageJSON from '../package.json'

// Get highlight version dinamically from the package.json to chose the right css file
const hljsVersion = packageJSON['dependencies']['highlight.js'].replace(/[\^~]/g, '')


const apiFetch = async ({ request, page }, urlOrRequest, options) => {
    const response = await request.fetch(urlOrRequest, options);

    // console.log(request)

    const html = await addApiCardToUI({ request, page, response }, options)

    // console.log(page)
    // console.log(responseBody)
    //  console.log(html)

    return response
};

const addApiCardToUI = async ({ request, page, response }, options) => {
    const emptyPageHtml = '<html><head></head><body></body></html>'
    let html

    console.log('---------------------------------')
    const apiCallHtml = await createApiCallHtml({ request, page, response }, options)

    const currentHtml = await page.content()
    if (currentHtml === emptyPageHtml) {
        console.log(apiCallHtml)
        html = await createPageHtml(apiCallHtml)
    } else {
        console.log(currentHtml)
        // html = await createPageHtml(apiCallHtml)

        html = currentHtml.replace(/<\/div>\s*<\/body>\s*<\/html>/, `${apiCallHtml}</div></body></html>`)
    }

    // console.log(html)

    await page.setContent(html);
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
    // Response Headers
    const responseHeaders = response.headers()
    const responseHeadersJson = responseHeaders ? formatJson(responseHeaders) : undefined;
    // Response Body
    const responseBody = await response.json();
    const responseBodyJson = responseBody ? formatJson(responseBody) : undefined;


    // URL actually from the response
    const url = response.url()

    return `<div class="pw-api-call card">
        <div class="pw-api-request">
            <label class="title">REQUEST</label>
            <label class="title-property"> - (METHOD: ${requestMethod})</label>
            </br>
            <label class="property"><i>URL:</i></label>
            <pre class="hljs pw-api-hljs">${url}</b></pre>
            ${requestHeadersJson ? `<label class="property"><i>HEADERS:</i></label>
            <pre class="hljs">${requestHeadersJson}</pre>` : ''}
            ${requestBodyJson ? `<label class="property"><i>BODY:</i></label>
            <pre class="hljs">${requestBodyJson}</pre>` : ''}
        </div>
        <hr>
        <div class="pw-api-response">
            <label class="title">RESPONSE</label>
            <label class="title-property"> - (STATUS: ${responseStatus})</label>
            <br>
            ${responseBodyJson ? `<label class="property"><i>BODY:</i></label>
            <pre class="hljs">${responseBodyJson}</pre>` : ''}
        </div>
    </div>`
    
    // <label class="property"><i>HEADERS:</i></label>
    // <pre class="hljs pw-api-hljs">${responseHeadersJson}</pre>
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

// .card { border-style: outset; }
const inLineStyles = `<style>
    .card { box-shadow: 0 4px 8px 0 rgba(0,0,0,0.3); transition: 0.3s; }
    .card:hover { box-shadow: 0 8px 16px 0 rgba(0,0,0,0.5); }

    .pw-api-call { background-color: rgb(173, 216, 230); border-radius: 8px; margin: 35px 5px; padding: 10px 15px; text-align: center; font-family: monospace; }
    .pw-api-request { text-align: left; padding-bottom: 1em; }
    .pw-api-response { text-align: left; margin-top: 1em; }
    .pw-api-request .title, .pw-api-response .title { font-weight: 800; font-size: 1.8em; line-height: 2em; padding-bottom: 18px; }
    .pw-api-request .title-property, .pw-api-response .title-property { font-weight: 800; font-size: 1.3em; }
    .pw-api-request .property, .pw-api-response .property { font-weight: 800; font-size: 1.2em; }
    .pw-api-hljs { font-size: 1.1em;}
    .hljs { background: rgb(238, 251, 255); text-wrap: wrap; padding: 6px; margin: 4px 0 12px 10px; border-radius: 6px; line-height: 1.5em; }
</style>`

export { apiFetch }
