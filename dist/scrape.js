chrome.storage.local.get({url_history:[]},(function(o){var r=o.url_history;r.push(window.location.toString()),chrome.storage.local.set({url_history:r}),console.log(r)}));