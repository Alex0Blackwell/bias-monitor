import NotImplementedError from "./service_errors/errors"


class UrlServiceABC {
  /**
   * Get the url given a string of the endpoint url
   * and any parameters.
   * 
   * @param {string} api_url 
   * @param  {...any} params 
   * 
   * @return string representing the endpoint url
   */
  build_url(api_url, ... params) {
    throw new NotImplementedError();
  }

  /**
   * Build the body for a POST request.
   * 
   * @param  {...any} args 
   * @return Json object
   */
  build_body(... args) {
    throw new NotImplementedError();
  }

  /**
   * Get the headers for a request.
   * 
   * @return 2d array of headers
   */
  get_headers() {
    throw new NotImplementedError();
  }
}


class BiasUrlService extends UrlServiceABC {
  build_url(api_url) {
    return api_url;  // useful function :)
  }

  build_body(api_key, text_to_analyze) {
    return `API=${api_key}&Text=${text_to_analyze}`;
  }

  get_headers() {
    return [
      ['Content-type', 'application/x-www-form-urlencoded; charset=utf-8']
    ]
  }
}


export default {
  UrlServiceABC: UrlServiceABC,
  BiasUrlService: BiasUrlService
}
