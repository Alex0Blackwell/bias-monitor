import config from "../../config";


export default class PostService {
  /**
   * Given the url endpoint, the response is returned
   * if successful.
   * On failure, an error message is returned.
   * 
   * @param {string} url_endpoint 
   * @param {JSON} body 
   * @param {JSON} headers 
   * @returns response string of api request status
   */
  static async post_to_api(url_endpoint, body, headers=null) {
    if(config.environment != "prod")  // TODO: instantiate mock class if not prod
      return -40 + Math.random() * 80;

    let get_result;
    try {
      const response = await this._post(url_endpoint, body, headers);
      get_result = this._apply_cusp_transformation(response);
    } catch(error) {
      console.error("Error posting data", error);
    }
    return get_result;
  }


  /**
   * Issue a post request.
   * 
   * @param {the url to hit} url_endpoint 
   * @param {the post request body} body 
   * @param {a 2d array of headers} headers 
   * @returns the request status
   */
  static async _post(url_endpoint, body, headers) {
    return new Promise(function (resolve, reject) {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", url_endpoint);

      headers.forEach(header => {
        xhr.setRequestHeader(... header);
      });

      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          resolve(xhr.response);
        } else {
          reject({
            status: this.status,
            statusText: xhr.statusText
          });
        }
      };

      xhr.onerror = function () {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      };

      xhr.send(body);
    });
  }


  /**
   * The responses we get back are mostly in the [-2, 2]
   * range because we don't send over large requests
   * with lots of text data. This applies a cusp
   * transformation to amplify some of the small numbers.
   * 
   * @param {*} result 
   * @returns a float after a cusp transformation
   */
  static _apply_cusp_transformation(result) {
    const result_float = parseFloat(result);
    const is_negative = result < 0 ? true : false;
    const abs_result_float = Math.abs(result_float);

    const squash = 5.7;
    const vertical_shift = 3;
    const transformed_val = squash*Math.pow(abs_result_float, 1/2) + vertical_shift;

    return is_negative ? -1*transformed_val : transformed_val; 
  }
}
