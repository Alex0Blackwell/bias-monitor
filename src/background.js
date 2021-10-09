chrome.tabs.onActivated.addListener(async (activeInfo) => {
    chrome.tabs.query({
    active: true,
    lastFocusedWindow: true
    }, async function(tabs) {
        const tab_id = activeInfo.tabId;
        const url_info = new URL(tabs[0].url)
        const base_url = url_info.hostname.replace("www.", "");
        let is_news_site = false;
        let files_to_execute;

        const news_urls_response = await fetch('news_sites.csv');
        const news_urls_text = await news_urls_response.text();
        const all_news_urls = new Set(news_urls_text.split('\n'));

        is_news_site = all_news_urls.has(base_url);

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
    });
});
