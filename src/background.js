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
                    
                    // Adding to chrome local storage
                    var hello = 5;
                    chrome.storage.local.set({foo: hello}, function() {
                        console.log('Why is it not working?');
                        
                        chrome.storage.local.get(['foo'], function(result) {
                            console.log('Value currently is ' + result.key);
                        });
                    });
                    
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

