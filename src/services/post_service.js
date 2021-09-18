import axios from "axios";


export default class PostService {
  /**
   * Given the url endpoint, the response is returned
   * if successful.
   * On failure, an error message is returned.
   * 
   * @param {string} url_endpoint 
   * @param {JSON} body 
   * @param {JSON} options 
   * @returns response string of api request status
   */
  static async post_to_api(url_endpoint, body, options=null) {
    let get_result;
    try {
      const response = await axios.post(url_endpoint, body, options);
      get_result = response.data;
    } catch(error) {
      get_result = "Error posting data";
      console.error(`${get_result}: ${error}`);
    }
    return get_result
  }
}
