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
            const abs_current_score = Math.abs(result.activeScore);
            console.log("a", abs_current_score)
            const abs_average_score = Math.abs(result.averageScore);
            console.log("avg", abs_average_score)
            const this_website_difference = Math.abs(abs_current_score - abs_average_score);
            console.log("this diff", this_website_difference)
            const difference = Math.abs(absoluteMaxScore - this_website_difference);
            console.log("diff", difference)
            let diversityScore = maxDiversityScore * (1 - (difference/absoluteMaxScore));
            diversityScore = Math.ceil(diversityScore/5)*5;


            UiService.update_ui(normalized_number, political_lean, diversityScore);
        }
    });
}

window.onload = function() {
    on_start();
}