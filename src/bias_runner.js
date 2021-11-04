import PostService from "./services/post_service";
import UrlServices from "./services/url_service";
import config from "../config";


export default class BiasRunner {
    static page_content;
    static website_url;

    static async run(active_tab) {
        BiasRunner.page_content = active_tab.title;
        BiasRunner.website_url = active_tab.url;
        await this.update_and_display();
    }

    static async update_and_display() {
        let current_bias_score;
        const has_cached_rating = await this._has_cached_rating();
        if(!has_cached_rating) {
            current_bias_score = await this._get_rating_from_api();
        }
        await this._update_local_storage(current_bias_score);
    }

    static _has_cached_rating() {
        return new Promise(function(resolve, reject) {
            chrome.storage.local.get({url_history: {}}, function(result) {
                const history = result.url_history;
                const has_cached_rating  = history.hasOwnProperty(BiasRunner.website_url)
                resolve(has_cached_rating);
            });
        });
    }

    static async _get_rating_from_api() {
        const content_len_threshold = 5;
        let current_bias_score;

        if(BiasRunner.page_content.length < content_len_threshold) 
            current_bias_score = 0;
        else {
            const bias_url_service = new UrlServices.BiasUrlService();
            const url_endpoint = bias_url_service.build_url(config.api_url);
            const body = bias_url_service.build_body(config.api_key, BiasRunner.page_content);
            const headers = bias_url_service.get_headers();
            current_bias_score = await PostService.post_to_api(url_endpoint, body, headers);
        }

        return current_bias_score;
    }

    static async _update_local_storage(current_bias_score=undefined) {
        return new Promise(function(resolve, reject) {
            chrome.storage.local.get({url_history: {}}, function(result) {
                let history = result.url_history;

                if(current_bias_score == undefined)
                    current_bias_score = history[BiasRunner.website_url];
                else {
                    history[BiasRunner.website_url] = current_bias_score;
                    chrome.storage.local.set({url_history: history});

                    let total = 0;
                        for(const [_, value] of Object.entries(history)) {
                            total += value;
                        }
                    const average = total / Object.keys(history).length;

                    chrome.storage.local.set({averageScore: average});
                }

                chrome.storage.local.set({activeScore: current_bias_score});
                resolve();
            });
        });
    }
}
