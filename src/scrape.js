import PostService from "./services/post_service";
import UrlServices from "./services/url_service";
import config from "../config";


async function main() {
    const page_content = get_page_content();
    await update_and_display(page_content);
}


function get_page_content() {
    const considered_tags = ["h1", "h2", "h3"];
    let content = "";

    for (const tag of considered_tags) {
        const element_arr = document.getElementsByTagName(tag);
        for (const element of element_arr) {
            content += element.textContent
            content += " " 
        }
    }

    return content;
}


async function update_and_display(page_content) {
    const content_len_threshold = 5;
    const website_url = window.location.toString();

    if(page_content.length < content_len_threshold) 
        current_bias_score = 0;
    
    const has_cached_rating = await _has_cached_rating(website_url);
    if(!has_cached_rating) {
        const current_bias_score = await _get_rating_from_api(page_content);
        await _update_local_storage(website_url, current_bias_score);
    }
}


function _has_cached_rating(website_url) {
    return new Promise(function(resolve, reject) {
        chrome.storage.sync.get({url_history: {}}, function(result) {
            const history = result.url_history;
            // const has_cached_rating = website_url in history;
            const has_cached_rating  = history.hasOwnProperty(window.location.toString())
            resolve(has_cached_rating);
        });
    });
}


async function _get_rating_from_api(page_content) {
    const bias_url_service = new UrlServices.BiasUrlService();
    const url_endpoint = bias_url_service.build_url(config.api_url);
    const body = bias_url_service.build_body(config.api_key, page_content);
    const headers = bias_url_service.get_headers();
    const response = await PostService.post_to_api(url_endpoint, body, headers);

    return response;
}


function _update_local_storage(website_url, current_bias_score) {
    return new Promise(function(resolve, reject) {
        chrome.storage.sync.get({url_history: {}}, function(result) {
            let history = result.url_history;
            history[website_url] = current_bias_score;

            let total = 0;
                for (const [_, value] of Object.entries(history)) {
                    total += value;
                }
            let average = total / Object.keys(history).length;

            chrome.storage.sync.set({url_history: history});
            chrome.storage.sync.set({activeScore: current_bias_score});
            chrome.storage.sync.set({averageScore: average});
            resolve();
        });
    });
}


main();

// src: https://stackoverflow.com/questions/31812937/how-to-clear-chrome-storage-local-and-chrome-storage-sync
// Uncomment this to clear the chrome local storage
// chrome.storage.sync.clear(function() {
// });

// if (content.split(" ").length > 5) {
//     (async function(){
//         const bias_url_service = new UrlServices.BiasUrlService();
//         const url_endpoint = bias_url_service.build_url(config.api_url);
//         const body = bias_url_service.build_body(config.api_key, content);
//         const headers = bias_url_service.get_headers();
//         const response = await PostService.post_to_api(url_endpoint, body, headers);
//         chrome.storage.sync.get({url_history: {}}, function (result) {
//             // An object being used as a hash
//             var history = result.url_history;
       
//             // Checking if the hash does not contain the url
//             if (!history.hasOwnProperty(window.location.toString())) {
//                 // Add url and bias result to hash
//                 // Should change value to "response" variable
//                 history[window.location.toString()] = Math.floor((Math.random() * 84) - 42);
//             }
           
//             // Iterating through all hash keys and totaling the bias results
//             var total = 0;
//             for (const [key, value] of Object.entries(history)) {
//                 total += value;
//             }
            
//             // Average of all bias results
//             var average = total / Object.keys(history).length;

//             console.log(history);
//             console.log(response);
//             console.log(average);
//             console.log("=========================");

//             chrome.storage.sync.set({url_history: history});
//             // Should change value to history[window.location.toString()]
//             chrome.storage.sync.set({activeScore: response});
//             chrome.storage.sync.set({averageScore: average});
//         });
//     })()
// }
