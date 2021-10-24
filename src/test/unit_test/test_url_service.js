import {expect} from "chai";
import UrlService from "../../services/url_service";


describe("test_url_services", function() {
    const bias_url_service = new UrlService.BiasUrlService();
    it("builds the URL for https://google.com", async function () {
        const url = bias_url_service.build_url("https://google.com");
        expect(url).to.equal("https://google.com");
    });

    it("builds the body of a Bias URL call", async function () {
        const api_key = "random-mock";
        const text_to_analyze = "Mock text to analyze";
        const body = bias_url_service.build_body(api_key, text_to_analyze);
        expect(body).to.equal("API=random-mock&Text=Mock text to analyze");
    });

    it("gets the headers of a Bias URL call", async function () {
        const headers = bias_url_service.get_headers();
        expect(headers[0]).to.include.members(
            ['Content-type', 'application/x-www-form-urlencoded; charset=utf-8']
        );
    });
});
