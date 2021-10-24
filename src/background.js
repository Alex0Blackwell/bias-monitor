/**
 * Kick off the scripts conditional to if the base url
 * is a news site or not.
 * 
 * @param {*} tab_id 
 * @param {*} tab 
 */
async function kick_off_scripts(tab_id, tab) {
    let files_to_execute, base_url;
    let is_news_site = false;
    let t0, t1;

    t0 = new Date().getTime();
    try {
        is_news_site = _is_news_site(tab);
    } catch (error) {
        // Err on the side of analyzing the text
        console.debug("There was an error parsing the tab url", error);
        is_news_site = true;
    }
    if(is_news_site) {
        console.debug(tab.url, "is a news website.");
        files_to_execute = ["./scrape.js"];
    } else {
        console.debug(base_url, "is not a news website.");
        files_to_execute = ["./not_news_event.js"];
    }
    try {
        await chrome.scripting.executeScript({
            target: { tabId: tab_id },
            files: files_to_execute,
        });
    } catch(error) {
        console.error(error)
    }
    t1 = new Date().getTime();
    const time_to_analyze = (t1 - t0)/1000;
    console.debug("Done analyzing, took ", time_to_analyze, "seconds.");
}


async function _is_news_site(tab) {
    let is_news_site = false;

    const url_info = new URL(tab.url)
    base_url = url_info.hostname.replace("www.", "");

    let news_words = await fetch("news_words.csv");
    news_words = await news_words.text();
    const all_news_words = news_words.split('\n');

    const news_words_len = all_news_words.length;
    const base_url_lowercase = base_url.toLowerCase();
    let i = 0;
    while(i < news_words_len && !is_news_site) {
        if(base_url_lowercase.includes(all_news_words[i++]))
            is_news_site = true;
    }

    if(!is_news_site) {
        const news_urls_response = await fetch("news_sites.csv");
        const news_urls_text = await news_urls_response.text();
        const all_news_urls = new Set(news_urls_text.split('\n'));

        is_news_site = all_news_urls.has(base_url);
    }
}


/**
 * Fires on selecting new tabs.
 */
chrome.tabs.onActivated.addListener(async (activeInfo) => {
    chrome.tabs.query({
    active: true,
    lastFocusedWindow: true
    }, async function(tabs) {
        const tab_id = activeInfo.tabId;
        const tab = tabs[0]
        await kick_off_scripts(tab_id, tab);
    });
});


/**
 * Fires on tabs updating, such as reloads.
 */
chrome.tabs.onUpdated.addListener(async (tabID, changeInfo, tab) => {
    if(changeInfo.status == "complete")
        await kick_off_scripts(tabID, tab);
});
