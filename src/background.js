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

    try {
        const url_info = new URL(tab.url)
        base_url = url_info.hostname.replace("www.", "");

        const news_urls_response = await fetch('news_sites.csv');
        const news_urls_text = await news_urls_response.text();
        const all_news_urls = new Set(news_urls_text.split('\n'));

        is_news_site = all_news_urls.has(base_url);
    } catch (error) {
        // Err on the side of analyzing the text
        console.debug("There was an error parsing the tab url", error);
        is_news_site = true;
    }
    if(is_news_site) {
        console.debug(base_url, "is a news website");
        files_to_execute = ["./scrape.js"];
    } else {
        console.debug(base_url, "is not a news website");
        files_to_execute = ["./not_news_event.js"];
    }
    try {
        await chrome.scripting.executeScript({
            target: { tabId: tab_id },
            files: files_to_execute,
        });
    } catch(error) {
        console.log(error)
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
