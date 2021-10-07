const noRunSites = ['google.com'];

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {

    if (changeInfo.status === 'complete') {
        try {
            let is_news_site = false;

            const response = await fetch('newsites.txt');
            const text = await response.text();
            
            const siteURLs = text.split('\n');

            for (const siteURL of siteURLs) {
                if (siteURL.length < 3) continue;

                if (tab.url.includes(siteURL.trim()) && noRunSites.indexOf(siteURL.trim()) < 0) {  
                    is_news_site = true;
                    break;
                }
            }

            if (is_news_site) {
                console.log("is news")
                await chrome.scripting.executeScript({
                    target: { tabId: tabId },
                    files: ["./scrape.js"]
                });
            } 
            else {
                console.log("is not news")
                await chrome.scripting.executeScript({
                    target: { tabId: tabId },
                    files: ["./not_news_event.js"]
                });
            }
            console.log("done")
        } catch (e) {
            console.log(e)
        }
    }
});

