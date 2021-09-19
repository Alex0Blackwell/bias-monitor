import PostService from "./services/post_service";
import UrlServices from "./services/url_service";
import UiService from "./services/ui_service";
import config from "../config";


async function on_start() {

    await chrome.storage.sync.get(['activeScore'], async function (result) {
        if (result.activeScore) {
            console.log(result.activeScore)
            const text_to_analyze = `The Liberal leader first raised the prospect of electoral reform in 2015 by promising that the federal election held that year would be the last to use the first-past-the-post method a pledge he would ultimately`;
            const bias_url_service = new UrlServices.BiasUrlService();
            const url_endpoint = bias_url_service.build_url(config.api_url);
            const body = bias_url_service.build_body(config.api_key, text_to_analyze);
            const headers = bias_url_service.get_headers();

            const bias_number = await PostService.post_to_api(url_endpoint, body, headers);
            const normalized_number = UiService.normalize_number(result.activeScore);
            const political_lean = UiService.get_political_lean(normalized_number);

            UiService.update_ui(normalized_number, political_lean);
        }
    });
}

on_start();
