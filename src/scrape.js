import PostService from "./services/post_service";
import UrlServices from "./services/url_service";
import config from "../config";

const tags = ['h1'];

let content = "";

for (const tag of tags) {
    const elementArr = document.getElementsByTagName(tag);

    for (const element of elementArr) {
        content += element.textContent
        content += " " 
    }
}

// src: https://stackoverflow.com/questions/31812937/how-to-clear-chrome-storage-local-and-chrome-storage-sync
// Uncomment this to clear the chrome local storage
// chrome.storage.sync.clear(function() {
// });

if (content.split(" ").length > 5) {
    (async function(){
        const bias_url_service = new UrlServices.BiasUrlService();
        const url_endpoint = bias_url_service.build_url(config.api_url);
        const body = bias_url_service.build_body(config.api_key, content);
        const headers = bias_url_service.get_headers();
        const response = await PostService.post_to_api(url_endpoint, body, headers);
        chrome.storage.sync.get({url_history: {}}, function (result) {
            // An object being used as a hash
            var history = result.url_history;
            
            console.log(response);

            // Checking if the hash does not contain the url
            if (!history.hasOwnProperty(window.location.toString())) {
                // Add url and bias result to hash
                // history[window.location.toString()] = Math.floor((Math.random() * 84) - 42);
                history[window.location.toString()] = response;
            }
           
            // Iterating through all hash keys and totaling the bias results
            var total = 0;
            for (const [key, value] of Object.entries(history)) {
                total += value;
            }
            
            // Average of all bias results
            var average = total / Object.keys(history).length;

            chrome.storage.sync.set({url_history: history});
            // chrome.storage.sync.set({activeScore: response});
            chrome.storage.sync.set({activeScore: history[window.location.toString()]});
            chrome.storage.sync.set({averageScore: average});
        });
    })()
}