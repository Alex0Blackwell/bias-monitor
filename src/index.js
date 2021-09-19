import UiService from "./services/ui_service";

async function on_start() {

    await chrome.storage.sync.get(['activeScore'], async function (result) {
        if (result.activeScore) {
            const normalized_number = UiService.normalize_number(result.activeScore);
            const political_lean = UiService.get_political_lean(normalized_number);
            
            UiService.update_ui(normalized_number, political_lean);
        }
    });
}

on_start();
