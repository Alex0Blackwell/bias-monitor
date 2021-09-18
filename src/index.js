import PostService from "./services/post_service";
import UrlServices from "./services/url_service";
import config from "../config";


const handleButtonClick = async event => {
    console.log(123);
    // Checking if the user has alredy been on this site
    if (true) {
    // if (null == localStorage.getItem(window.location.href)) {
        event.preventDefault();
        const text = document.getElementById('text');

        const text_to_analyze = `The Liberal leader first raised the prospect of electoral reform in 2015 by promising that the federal election held that year would be the last to use the first-past-the-post method a pledge he would ultimately`;
        const bias_url_service = new UrlServices.BiasUrlService();
        const url_endpoint = bias_url_service.build_url(config.api_url);
        const body = bias_url_service.build_body(config.api_key, text_to_analyze);
        const headers = bias_url_service.get_headers();

        const response = await PostService.post_to_api(url_endpoint, body, headers);
        text.innerHTML = `Text rating: ${response}`;

        console.log(123);

        // Adding the website url and bias score to the web browser local storage
        localStorage.setItem(window.location.href, response);
    }
}


function main() {
    const button = document.getElementById('button');
    button.addEventListener('click', e => handleButtonClick(e));
}


main();
