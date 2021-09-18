/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./config.js":
/*!*******************!*\
  !*** ./config.js ***!
  \*******************/
/***/ ((module) => {

eval("module.exports = {\n  environment: \"dev\",\n  api_url: \"<your-api-url-endpoint-here>\",\n  api_key: \"<your-api-key-here>\",\n}\n\n\n//# sourceURL=webpack://bias-monitor/./config.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _services_post_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/post_service */ \"./src/services/post_service.js\");\n/* harmony import */ var _services_url_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/url_service */ \"./src/services/url_service.js\");\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../config */ \"./config.js\");\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_config__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\n\nconst handleButtonClick = async event => {\n    event.preventDefault();\n    const text = document.getElementById('text');\n\n    const text_to_analyze = `The Liberal leader first raised the prospect of electoral reform in 2015 by promising that the federal election held that year would be the last to use the first-past-the-post method a pledge he would ultimately`;\n    const bias_url_service = new _services_url_service__WEBPACK_IMPORTED_MODULE_1__[\"default\"].BiasUrlService();\n    const url_endpoint = bias_url_service.build_url((_config__WEBPACK_IMPORTED_MODULE_2___default().api_url));\n    const body = bias_url_service.build_body((_config__WEBPACK_IMPORTED_MODULE_2___default().api_key), text_to_analyze);\n    const headers = bias_url_service.get_headers();\n\n    const response = await _services_post_service__WEBPACK_IMPORTED_MODULE_0__[\"default\"].post_to_api(url_endpoint, body, headers);\n    text.innerHTML = `Text rating: ${response}`;\n}\n\n\nfunction main() {\n    const button = document.getElementById('button');\n    button.addEventListener('click', e => handleButtonClick(e));\n}\n\n\nmain();\n\n\n//# sourceURL=webpack://bias-monitor/./src/index.js?");

/***/ }),

/***/ "./src/services/post_service.js":
/*!**************************************!*\
  !*** ./src/services/post_service.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ PostService)\n/* harmony export */ });\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../config */ \"./config.js\");\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_config__WEBPACK_IMPORTED_MODULE_0__);\n\n\n\nclass PostService {\n  /**\n   * Given the url endpoint, the response is returned\n   * if successful.\n   * On failure, an error message is returned.\n   * \n   * @param {string} url_endpoint \n   * @param {JSON} body \n   * @param {JSON} headers \n   * @returns response string of api request status\n   */\n  static async post_to_api(url_endpoint, body, headers=null) {\n    if((_config__WEBPACK_IMPORTED_MODULE_0___default().environment) != \"prod\")  // TODO: instantiate mock class if not prod\n      return \"Mock response\";\n\n    let get_result;\n    try {\n      const response = await this._post(url_endpoint, body, headers);\n      get_result = response;\n    } catch(error) {\n      get_result = \"Error posting data\";\n      console.error(`${get_result}: ${error}`);\n    }\n    return get_result;\n  }\n\n\n  /**\n   * Issue a post request.\n   * \n   * @param {the url to hit} url_endpoint \n   * @param {the post request body} body \n   * @param {a 2d array of headers} headers \n   * @returns the request status\n   */\n  static async _post(url_endpoint, body, headers) {\n    return new Promise(function (resolve, reject) {\n      const xhr = new XMLHttpRequest();\n      xhr.open(\"POST\", url_endpoint);\n\n      headers.forEach(header => {\n        xhr.setRequestHeader(... header);\n      });\n\n      xhr.onload = function () {\n        if (this.status >= 200 && this.status < 300) {\n          resolve(xhr.response);\n        } else {\n          reject({\n            status: this.status,\n            statusText: xhr.statusText\n          });\n        }\n      };\n\n      xhr.onerror = function () {\n        reject({\n          status: this.status,\n          statusText: xhr.statusText\n        });\n      };\n\n      xhr.send(body);\n    });\n  }\n}\n\n\n//# sourceURL=webpack://bias-monitor/./src/services/post_service.js?");

/***/ }),

/***/ "./src/services/service_errors/errors.js":
/*!***********************************************!*\
  !*** ./src/services/service_errors/errors.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ NotImplementedError)\n/* harmony export */ });\nclass NotImplementedError {\n  constructor(message = \"\") {\n    this.name = \"NotImplementedError\";\n    this.message = message;\n  }\n}\n\n\n//# sourceURL=webpack://bias-monitor/./src/services/service_errors/errors.js?");

/***/ }),

/***/ "./src/services/url_service.js":
/*!*************************************!*\
  !*** ./src/services/url_service.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _service_errors_errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./service_errors/errors */ \"./src/services/service_errors/errors.js\");\n\n\n\nclass UrlServiceABC {\n  /**\n   * Get the url given a string of the endpoint url\n   * and any parameters.\n   * \n   * @param {string} api_url \n   * @param  {...any} params \n   * \n   * @return string representing the endpoint url\n   */\n  build_url(api_url, ... params) {\n    throw new _service_errors_errors__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n  }\n\n  /**\n   * Build the body for a POST request.\n   * \n   * @param  {...any} args \n   * @return Json object\n   */\n  build_body(... args) {\n    throw new _service_errors_errors__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n  }\n\n  /**\n   * Get the headers for a request.\n   * \n   * @return 2d array of headers\n   */\n  get_headers() {\n    throw new _service_errors_errors__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n  }\n}\n\n\nclass BiasUrlService extends UrlServiceABC {\n  build_url(api_url) {\n    return api_url;  // useful function :)\n  }\n\n  build_body(api_key, text_to_analyze) {\n    return `API=${api_key}&Text=${text_to_analyze}`;\n  }\n\n  get_headers() {\n    return [\n      ['Content-type', 'application/x-www-form-urlencoded; charset=utf-8']\n    ]\n  }\n}\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  UrlServiceABC: UrlServiceABC,\n  BiasUrlService: BiasUrlService\n});\n\n\n//# sourceURL=webpack://bias-monitor/./src/services/url_service.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;