
//chrome.storage.sync.get(['counter'], function(count) {
//    var newCounter = 1;
//    if (count.counter) {
//        newCounter += parseInt(count.counter);
//    }
//    chrome.storage.sync.set({'counter': newCounter})
//    alert(window.location.toString())
//});


chrome.storage.local.get({url_history: []}, function (result) {
    var history = result.url_history;
    history.push(window.location.toString());
    chrome.storage.local.set({url_history: history});
    console.log(history);
});