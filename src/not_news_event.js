async function main() {
    await _set_local_storage();
}

function _set_local_storage() {
    return new Promise(function(resolve, reject) {
        chrome.storage.sync.get({}, function(result) {
            chrome.storage.sync.set({is_news_site: false});
            resolve();
        });
    });
}


main();
