import PostService from "./services/post_service";
import UrlServices from "./services/url_service";
import config from "../config";
import { updatePageStatus } from "./dom-helpers";

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
        alert(response);
    })()
}

