!async function(){const n=function(){const n=["h1"];let t="";for(const o of n){const n=document.getElementsByTagName(o);for(const o of n)t+=o.textContent,t+=" "}const o=document.body.innerText,e=parseInt(o.length/10);return t+=o.slice(e,e+800),t}();await async function(n){return new Promise((function(t,o){let e={};e[window.location.toString()]=n,chrome.storage.local.set({page_content:e},(function(){t()}))}))}(n)}();