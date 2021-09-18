import FetchService from "./services/fetch_service";
import PostService from "./services/post_service";
import UrlServices from "./services/url_service";
import config from "../config";

const button = document.getElementById('button');
const text = document.getElementById('text');

const handleButtonClick = async event => {
    event.preventDefault();

    const text_to_analyze = ` The Liberal leader first raised the prospect of electoral reform in 2015 by promising that the federal election held that year would be the last to use the first-past-the-post method, a pledge he would ultimately renege on.

Trudeau added that electoral reform was "not a priority" since there was still no consensus on the issue.

"If ever there is more of a consensus, it could be interesting to follow up on and I'd be open to that, because I've never flinched in my desire for ranked ballots," he said.

Trudeau was asked about the issue shortly after his party announced it was cutting ties with a Toronto candidate who previously faced a sexual assault charge that was later dropped.`;
    const bias_url_service = new UrlServices.BiasUrlService();
    const url_endpoint = bias_url_service.build_url(config.api_url);
    const body = bias_url_service.build_body(config.api_key, text_to_analyze);
    const options = {  // TODO: abstract out
        headers: {
            crossorigin: true,
            "Access-Control-Allow-Origin": true
        }
    }

    console.log(url_endpoint);
    console.log(body);

    const response = await PostService.post_to_api(url_endpoint, body, options);
    console.log("response is:", response);
}

button.addEventListener('click', e => handleButtonClick(e));
