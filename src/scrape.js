import PostService from "./services/post_service";
import UrlServices from "./services/url_service";
import config from "../config";


async function main() {
    const page_content = get_page_content();
    await update_and_display(page_content);
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
    const sample_size = 400;
    const body_text = document.body.innerText;
    const start_sample = parseInt(body_text.length/10);
    let body_text_sample = body_text.slice(start_sample, start_sample+sample_size);
    content += body_text_sample;

    return content;
}


async function update_and_display(page_content) {
    const website_url = window.location.toString();
    let current_bias_score;

    const has_cached_rating = await _has_cached_rating(website_url);
    if(!has_cached_rating) {
        current_bias_score = await _get_rating_from_api(page_content);
    }
    await _update_local_storage(website_url, current_bias_score);
}


function _has_cached_rating(website_url) {
    return new Promise(function(resolve, reject) {
        chrome.storage.sync.get({url_history: {}}, function(result) {
            const history = result.url_history;
            const has_cached_rating  = history.hasOwnProperty(website_url)
            resolve(has_cached_rating);
        });
    });
}


async function _get_rating_from_api(page_content) {
    const content_len_threshold = 5;
    let current_bias_score;

    if(page_content.length < content_len_threshold) 
        current_bias_score = 0;
    else {
        const bias_url_service = new UrlServices.BiasUrlService();
        const url_endpoint = bias_url_service.build_url(config.api_url);
        const body = bias_url_service.build_body(config.api_key, page_content);
        const headers = bias_url_service.get_headers();
        current_bias_score = await PostService.post_to_api(url_endpoint, body, headers);
    }

    return current_bias_score;
}


function _update_local_storage(website_url, current_bias_score=undefined) {
    return new Promise(function(resolve, reject) {
        chrome.storage.sync.get({url_history: {}}, function(result) {
            let history = result.url_history;

            if(current_bias_score == undefined)
                current_bias_score = history[website_url];
            else {
                history[website_url] = current_bias_score;
                chrome.storage.sync.set({url_history: history});

                let total = 0;
                    for(const [_, value] of Object.entries(history)) {
                        total += value;
                    }
                const average = total / Object.keys(history).length;

                chrome.storage.sync.set({averageScore: average});
            }

            chrome.storage.sync.set({activeScore: current_bias_score});
            chrome.storage.sync.set({is_news_site: true});
            resolve();
        });
    });
}


main();
