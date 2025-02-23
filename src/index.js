
import hljs from 'highlight.js/lib/common'
import packageJSON from '../package.json'



// const hljs = require('highlight.js/lib/common');

const apiFetch = async ({ request, page }, urlOrRequest, options) => {
    const response = await request.fetch(urlOrRequest, options);

    // console.log(request)

    const html = await createHtml(response, options)

    // console.log(page)
    // console.log(responseBody)
    //  console.log(html)

    await page.setContent(html);

    return response
};


const createHtml = async (response, requestOptions) => {

    // Request
    const requestMethod = requestOptions?.method || 'GET';
    const requestJson = (requestOptions && requestOptions.data) ? formatJson(requestOptions.data) : undefined;

    // Response
    const responseStatusText = response.statusText()
    const responseBody = await response.json();
    const responseJson = responseBody ? formatJson(responseBody) : undefined;

    const url = response.url()

    // Get highlight version dinamically from the package.json to chose the right css file
    const hljsVersion = packageJSON['dependencies']['highlight.js'].replace(/[\^~]/g, '')

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
                <div class="container">
                    <div class="pw-api-request">
                        <label class="title">REQUEST</br></label>

                        <label class="property"><i>URL:</i></label>
                        <pre class="hljs">${url}</pre>

                        <label class="property"><i>METHOD:</i></label>
                        <pre class="hljs">${requestMethod}</></pre>

                        ${requestJson ? `<label class="property"><i>BODY:</i></label>
                        <pre class="hljs">${requestJson}</pre>` : ''}
                    </div>
                    <hr>
                    <div class="pw-api-response">
                        <label class="title">RESPONSE</br></label>

                        <label class="property"><i>STATUS TEXT:</i></label>
                        <pre class="hljs">${responseStatusText}</pre>

                        ${responseJson ? `<label class="property"><i>BODY:</i></label>
                        <pre class="hljs">${responseJson}</pre>` : ''}
                    </div>
                </div>

            </body>
            </html>
            `
}

{/* <hr>
<div class="container">
    <div class="pw-api-request">
        <label>REQUESTTTTTT:</label>
        <pre class="hljs">${formatJson(responseStatusText)}</pre>
    </div>
    <div class="pw-api-response">
        <label>RESPONSEeeeeeee: (status = ${responseStatusText})</label>
        <pre class="hljs">${responseJson}</pre>
    </div>
</div> */}


const formatJson = (jsonObject) => {
    return hljs.highlight(JSON.stringify(jsonObject, null, 4), {
        language: 'json',
    }).value
}

const inLineStyles = `
    <style>
        .container { background-color: rgb(173, 216, 230); border-radius: 8px; margin: 30px 0; padding: 10px 15px; text-align: center; font-family: monospace; }
        .pw-api { text-align: left; }
        .pw-api-request { text-align: left; padding-bottom: 1em;}
        .pw-api-response { text-align: left; margin-top: 1em; }
        .pw-api-request>label.title, .pw-api-response>label.title { font-weight: 800; font-size: 1.8em; line-height: 2em; padding-bottom: 10px; }
        .pw-api-request>label.property,.pw-api-response>label.property { font-weight: 800; font-size: 1.1em; }
        .hljs { background: rgb(238, 251, 255); text-wrap: wrap; padding: 6px; margin: 4px 0 12px 10px; border-radius: 6px; line-height: 1.5em;}}
    </style>
`

export { apiFetch }
