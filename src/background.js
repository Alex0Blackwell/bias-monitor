/**
 * Kick off the scripts conditional to if the base url
 * is a news site or not.
 * 
 * @param {*} tab_id 
 * @param {*} tab 
 */
async function kick_off_script(tab_id, tab) {
    try {
        await chrome.scripting.executeScript({
            target: { tabId: tab_id },
            files: ["./content.js"],
        });
    } catch(error) {
        console.debug(error)
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
        await kick_off_script(tab_id, tab);
    });
});


/**
 * Fires on tabs updating, such as reloads.
 */
chrome.tabs.onUpdated.addListener(async (tabID, changeInfo, tab) => {
    if(changeInfo.status == "complete")
        await kick_off_script(tabID, tab);
});
