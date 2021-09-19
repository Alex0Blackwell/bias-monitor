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

if (content.split(" ").length > 5) {
    (async function(){
        const bias_url_service = new UrlServices.BiasUrlService();
        const url_endpoint = bias_url_service.build_url(config.api_url);
        const body = bias_url_service.build_body(config.api_key, content);
        const headers = bias_url_service.get_headers();
        const response = await PostService.post_to_api(url_endpoint, body, headers);
        chrome.storage.sync.get({url_history: {}}, function (result) {
            var history = result.url_history;
        
            if (!history.hasOwnProperty(window.location.toString())) {
                history[window.location.toString()] = Math.floor(Math.random() * 10);
            }
        
            chrome.storage.sync.set({url_history: history});
            chrome.storage.sync.set({activeScore: response});
        });
    })()
}