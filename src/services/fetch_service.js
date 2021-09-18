import axios from "axios";


export default class FetchService {
  /**
   * Given the url endpoint, the response is returned
   * if successful.
   * On failure, an error message is returned.
   * 
   * @param {string} url_endpoint
   * @returns response string of api request status
   */
  static async get_from_api(url_endpoint) {
    let get_result;
    try {
      const response = await axios.get(url_endpoint);
      get_result = response.data;
    } catch(error) {
      get_result = "Error retrieving data";
      console.error(`${get_result}: ${error}`);
    }
    return get_result
  }
}
