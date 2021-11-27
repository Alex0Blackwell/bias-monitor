async function main() {
    const page_content = get_page_content();
    await set_local_storage(page_content);
}


function get_page_content() {
    const considered_tags = ["h1"];
    let content = "";

    for (const tag of considered_tags) {
        const element_arr = document.getElementsByTagName(tag);
        for (const element of element_arr) {
            content += element.textContent
            content += " " 
        }
    }
    const sample_size = 800;
    const body_text = document.body.innerText;
    const start_sample = parseInt(body_text.length/10);
    let body_text_sample = body_text.slice(start_sample, start_sample+sample_size);
    content += body_text_sample;

    return content;
}


async function set_local_storage(page_content) {
    return new Promise(function(resolve, reject) {
        const website_url = window.location.toString();
        let url_to_content_map = {}
        url_to_content_map[website_url] = page_content;

        chrome.storage.local.set(
            {page_content: url_to_content_map},
            function() {
                resolve();
            }
        );
    });
}


main();
