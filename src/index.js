import UiService from "./services/ui_service";

const abs_max_score = 42;
const max_diversiry_score = 100;

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
            const normalized_number = UiService.normalize_number(result.activeScore);
            const political_lean = UiService.get_political_lean(normalized_number);

            const page_score = result.activeScore;
            const avg_score = result.averageScore;
            const abs_change = Math.abs((abs_max_score + page_score) - (abs_max_score + avg_score));

            let diversity_score = max_diversiry_score * (abs_change/(abs_max_score*2));
            diversity_score = Math.ceil(diversity_score/5)*5;

            UiService.update_ui(normalized_number, political_lean, diversity_score);
        }
    });
}

window.onload = function() {
    on_start();
}