(()=>{async function e(e,t){let s,a,n=!1;try{a=new URL(t.url).hostname.replace("www.","");const e=await fetch("news_sites.csv"),s=await e.text();n=new Set(s.split("\n")).has(a)}catch(e){console.debug("There was an error parsing the tab url",e),n=!0}n?(console.debug(a,"is a news website"),s=["./scrape.js"]):(console.debug(a,"is not a news website"),s=["./not_news_event.js"]);try{await chrome.scripting.executeScript({target:{tabId:e},files:s})}catch(e){console.log(e)}}chrome.tabs.onActivated.addListener((async t=>{chrome.tabs.query({active:!0,lastFocusedWindow:!0},(async function(s){const a=t.tabId,n=s[0];await e(a,n)}))})),chrome.tabs.onUpdated.addListener((async(t,s,a)=>{"complete"==s.status&&await e(t,a)}))})();