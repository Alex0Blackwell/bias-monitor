chrome.tabs.onActivated.addListener(async (activeInfo) => {
    chrome.tabs.query({
    active: true,
    lastFocusedWindow: true
    }, async function(tabs) {
        const tab_id = activeInfo.tabId;
        const tab = tabs[0];
        let is_news_site = false;

        const response = await fetch('newsites.txt');
        const text = await response.text();
        const siteURLs = text.split('\n');

        const num_of_sites = siteURLs.length;
        let i = 0;
        while(!is_news_site && i < num_of_sites) {
            if (tab.url.includes(siteURLs[i++].trim())) {  
                is_news_site = true;
            }
        }

        try {
            if (is_news_site) {
                console.log("is news")
                await chrome.scripting.executeScript({
                    target: { tabId: tab_id },
                    files: ["./scrape.js"]
                });
            } 
            else {
                console.log("is not news")
                await chrome.scripting.executeScript({
                    target: { tabId: tab_id },
                    files: ["./not_news_event.js"]
                });
            }
        } catch (error) {
            console.log(error)
        }
    });
});
