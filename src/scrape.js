
//chrome.storage.sync.get(['counter'], function(count) {
//    var newCounter = 1;
//    if (count.counter) {
//        newCounter += parseInt(count.counter);
//    }
//    chrome.storage.sync.set({'counter': newCounter})
//    alert(window.location.toString())
//});


// chrome.storage.local.get({url_history: []}, function (result) {
//     var history = result.url_history;
//     history.push(window.location.toString());
//     chrome.storage.local.set({url_history: history});
//     console.log(history);
// });

// https://stackoverflow.com/questions/31812937/how-to-clear-chrome-storage-local-and-chrome-storage-sync
// chrome.storage.local.clear(function() {
// });

chrome.storage.local.get({url_history: {}}, function (result) {
    var history = result.url_history;
    
    if (!history.hasOwnProperty(window.location.toString())) {
        history[window.location.toString()] = Math.floor(Math.random() * 10);
    }

    chrome.storage.local.set({url_history: history});

    var total = 0;
    for (const [key, value] of Object.entries(history)) {
        total += value;
    }
    
    console.log(history);
    var average = total / Object.keys(history).length;
    console.log(average);
});