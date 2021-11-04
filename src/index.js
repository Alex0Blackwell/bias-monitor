import UiService from "./services/ui_service";
import BiasRunner from "./bias_runner";


const abs_max_score = 42;
const max_diversiry_score = 100;

async function on_start() {
    const active_tab = await new Promise(function(resolve, reject) {
        chrome.tabs.query({active: true, currentWindow: true}, async function(tabs) {
            const current_tab = tabs[0]
            resolve(current_tab);
        });
    });
    
    await BiasRunner.run(active_tab);
    await chrome.storage.local.get(
        ['activeScore', 'averageScore'],
        async function (result) {
            const normalized_number = UiService.normalize_number(result.activeScore);
            const political_lean = UiService.get_political_lean(normalized_number);

            const page_score = result.activeScore;
            const avg_score = result.averageScore;
            const abs_change = Math.abs((abs_max_score + page_score) - (abs_max_score + avg_score));

            let diversity_score = max_diversiry_score * (abs_change/(abs_max_score*2));
            diversity_score = _sigmoid_transformation(diversity_score)
            diversity_score = Math.ceil(diversity_score/5)*5;

            UiService.update_ui(normalized_number, political_lean, diversity_score);
        }
    );
}

function _sigmoid_transformation(diversity_score) {
    return 100/(1+Math.exp(4 - 0.16*diversity_score))
}

window.onload = function() {
    on_start();
}
