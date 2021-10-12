export default class UiService {
  /**
   * Normalize number from between -42 and +42
   * to between -5 and +5.
   * 
   * @param {number} raw_num 
   * @returns a number between -5 and +5
   */
  static normalize_number(raw_num) {
    const MAX_RANGE = 42;
    const NEW_RANGE = 5;
    return Math.round(raw_num/MAX_RANGE*NEW_RANGE);
  }

  /**
   * Return either "center", "right", or "left" given the
   * normalized political lean number.
   * 
   * @param {number} normalized_num 
   * @returns string indicating lean
   */
  static get_political_lean(normalized_num) {
    let political_lean = "";
    if(Math.abs(normalized_num) == 0)
      political_lean = "center";
    else
      political_lean = Math.sign(normalized_num) == 1 ? "right" : "left";
    return political_lean;
  }

  static update_ui_no_data() {
    const news_site_data = document.getElementById("news-site-data");
    const not_news_site_data = document.getElementById("not-news-site-data");
    news_site_data.style.display = "none";
    not_news_site_data.style.display = "block";
  }
  
  static update_ui(normalized_number, political_lean, diversity_score) {
    const lean_status = document.getElementById("lean-status");
    const main_text = document.getElementById("main-text");
    const bias_num = document.getElementById("bias-num");
    const diverse_num = document.getElementById("diverse-score");
    const not_news_site_data = document.getElementById("not-news-site-data");
    const news_site_data = document.getElementById("news-site-data");

    news_site_data.style.display = "block";
    not_news_site_data.style.display = "none";

    const num_to_ui_dict = {
      0: "",
      1: "Slightly",
      2: "Mild",
      3: "Moderate",
      4: "Very",
      5: "Extreme",
    }
    const diversity_response_dict = {
      0: "This is very similar to what you usually read, try to visit a conflicting view next time!",
      1: "This is kind of what you're used to reading, try browsing other websites to hear something new!",
      2: "This is a little different from what you normally read, nice work and keep searching!",
      3: "This is quite different from your typical reading material, good job finding a new perspective!",
      4: "This is drastically different from your typical news articles, excellent work finding new views!"
    }

    const abs_normalized_num = Math.abs(normalized_number);
    const normalized_diversity_score = Math.round(diversity_score/20);
    const diversity_response = diversity_response_dict[normalized_diversity_score];
    const adjective = num_to_ui_dict[abs_normalized_num];
    const text = `We have analyzed this text to be ${adjective.toLowerCase()} ${political_lean}. ${diversity_response}`;

    lean_status.innerHTML = `${adjective} ${political_lean}`;
    main_text.innerHTML = text;
    bias_num.innerHTML = abs_normalized_num;
    diverse_num.innerHTML = diversity_score;

    this._update_image(political_lean);
    this._update_dot(political_lean);
  }

  static _update_image(political_lean) {
    const left_image = document.getElementById("left-person-image");
    const center_image = document.getElementById("center-person-image");
    const right_image = document.getElementById("right-person-image");

    const lean_to_image_dict = {
      "left": left_image,
      "center": center_image,
      "right": right_image
    }

    left_image.classList.remove("viewable");
    center_image.classList.remove("viewable");
    right_image.classList.remove("viewable");

    const visable_image = lean_to_image_dict[political_lean]

    visable_image.classList.add("viewable");
  }

  static _update_dot(political_lean) {
    const dot_element = document.getElementById("status-dot");

    dot_element.classList.remove("left-dot");
    dot_element.classList.remove("right-dot");
    dot_element.classList.remove("center-dot");

    dot_element.classList.add(`${political_lean}-dot`);
  }
}
