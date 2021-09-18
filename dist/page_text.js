chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {
        if(request.method == "page_text"){
            sendResponse({data: document.all[0].innerText, method: "getText"});
        }
    }
);
