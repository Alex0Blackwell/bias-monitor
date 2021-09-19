import UiService from "./services/ui_service";

async function on_start() {

    await chrome.storage.sync.get(['activeScore', 'averageScore'], async function (result) {
        if (result.activeScore) {
            console.log("bias score: " + result.activeScore);
            const normalized_number = UiService.normalize_number(result.activeScore);
            const political_lean = UiService.get_political_lean(normalized_number);
            
            UiService.update_ui(normalized_number, political_lean);
        }

        if (result.averageScore) {
            console.log("average score: " + result.averageScore);
        }
    });
}

on_start();
