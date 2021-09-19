import UiService from "./services/ui_service";

const absoluteMaxScore = 42;
const maxDiversityScore = 100;

async function on_start() {

    await chrome.storage.sync.get(['activeScore', 'averageScore'], async function (result) {

        await chrome.tabs.query({active: true, currentWindow: true}, async function(tabs) {

            var activeTab = tabs[0];
            var activeTabId = activeTab.id;
       
            await chrome.scripting.executeScript({
                target: { tabId: activeTabId },
                files: ["./scrape.js"]
            });
        });

        if (result.activeScore) {
            console.log("bias score: " + result.activeScore);
            const normalized_number = UiService.normalize_number(result.activeScore);
            const political_lean = UiService.get_political_lean(normalized_number);
            
            // Calculating the diversity score
            var average = result.averageScore;
            var difference = absoluteMaxScore - Math.abs(average);
            var diversityScore = maxDiversityScore * (1 - (difference/absoluteMaxScore));

            console.log("diversity score: " + diversityScore);
            
            UiService.update_ui(normalized_number, political_lean, diversityScore);
        }
    });
}

// on_start();

window.onload = function() {
    on_start();
}