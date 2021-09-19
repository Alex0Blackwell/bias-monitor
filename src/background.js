const noRunSites = ['google.com'];

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {

    if (changeInfo.status === 'complete') {
        try {
            let shouldExecuteScript = false;

            const response = await fetch('newsites.txt');
            const text = await response.text();
            
            const siteURLs = text.split('\n');

            for (const siteURL of siteURLs) {
                if (siteURL.length < 3) continue;

                if (tab.url.includes(siteURL.trim()) && noRunSites.indexOf(siteURL.trim()) < 0) {
                    console.log(tab.url, siteURL)
                    
                    shouldExecuteScript = true;
                    break;
                }
            }

            if (shouldExecuteScript) {
                await chrome.scripting.executeScript({
                    target: { tabId: tabId },
                    files: ["./scrape.js"]
                });
            }
        } catch (e) {
            console.log(e)
        }
    }
});

chrome.action.onClicked.addListener(async (tab) => {
    await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["./scrape.js"]
    });
});