var e=require("react"),t=require("react/jsx-runtime");exports.HydrateState=function(n){var r=n.children,o=e.useState(!1),i=o[0],c=o[1];return e.useEffect(function(){c(!0)},[]),/*#__PURE__*/t.jsx(t.Fragment,{children:i?/*#__PURE__*/t.jsx("div",{children:r}):null})},exports.broadcast=function(e){var t=null;return function(n){(t=new BroadcastChannel(e)).onmessage=function(e){var t=e.data,r=t.payload;"STATE_UPDATE"===t.type&&r&&"object"==typeof r&&n.setState(r)};var r=n.subscribe(function(e){!function(e){var n=Object.fromEntries(Object.entries(e).filter(function(e){return"function"!=typeof e[1]}));t&&t.postMessage({type:"STATE_UPDATE",payload:n})}(e)});return function(){t&&t.close(),r()}}},exports.logging=function(){return function(e){var t=e.getState(),n=e.subscribe(function(e){console.log("Previous State:",t),console.log("New State:",e)});return function(){n()}}},exports.preserve=function(e,t,n){return function(r){var o=function(){try{if("undefined"!=typeof window){var n=window[e].getItem(t);if(n)return JSON.parse(n)}}catch(e){console.error("Error while loading persisted state:",e)}}();if(r.setState(o||r.getState()),"undefined"!=typeof window)try{return r.subscribe(function(r){!function(r){try{if("undefined"!=typeof window&&window[e]){var o={};n.forEach(function(e){o[e]=r[e]});var i=JSON.stringify(o);window[e].setItem(t,i)}}catch(e){console.error("Error while persisting state:",e)}}(r)})}catch(e){}}};
var t=require("react"),e=require("react/jsx-runtime");function n(){return n=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},n.apply(this,arguments)}var r=function t(e,r){var o=n({},e);for(var i in r)o[i]="object"==typeof r[i]&&null!==r[i]?t(e[i]||{},r[i]):r[i];return o};exports.HydrateState=function(n){var r=n.children,o=t.useState(!1),i=o[0],u=o[1];return t.useEffect(function(){u(!0)},[]),/*#__PURE__*/e.jsx(e.Fragment,{children:i?/*#__PURE__*/e.jsx("div",{children:r}):null})},exports.broadcast=function(t){var e=null;return function(n){(e=new BroadcastChannel(t)).onmessage=function(t){var e=t.data,r=e.payload;"STATE_UPDATE"===e.type&&r&&"object"==typeof r&&n.setState(r)};var r=n.subscribe(function(t){!function(t){var n=Object.fromEntries(Object.entries(t).filter(function(t){return"function"!=typeof t[1]}));e&&e.postMessage({type:"STATE_UPDATE",payload:n})}(t)});return function(){e&&e.close(),r()}}},exports.createStore=function(e,o){void 0===o&&(o=[]);for(var i=e({}),u=new Set,c=e,a=function(){return void 0===i&&(i=c(null),c=null),i},f=function(t){var e=r(i,t);(function(t,e){if(t===e)return!0;if("object"!=typeof t||null===t||"object"!=typeof e||null===e)return!1;for(var n in t)if(t.hasOwnProperty(n)&&(!e.hasOwnProperty(n)||t[n]!==e[n]))return!1;for(var r in e)if(e.hasOwnProperty(r)&&!t.hasOwnProperty(r))return!1;return!0})(i,e)||(i=e,u.forEach(function(t){return t(i)}))},s=function(t){return u.add(t),function(){u.delete(t)}},l={},p=function(){var t=v[d],e=t[1];"function"==typeof e&&(l[t[0]]=function(){var t=e.apply(void 0,[].slice.call(arguments))(i);f(t)})},d=0,v=Object.entries(e(i));d<v.length;d++)p();return o.forEach(function(t){return t({getState:a,setState:f,subscribe:s})}),function(e){void 0===e&&(e=a);var r=t.useRef(e(i)),o=t.useReducer(function(t){return t+1},0)[1];return t.useEffect(function(){var t=s(function(t){var n=e(t);r.current!==n&&(r.current=n,o())});return function(){t()}},[e]),n({},r.current,l,{getState:a,setState:f,subscribe:s})}},exports.logging=function(){return function(t){var e=t.getState(),n=t.subscribe(function(t){console.log("Previous State:",e),console.log("New State:",t)});return function(){n()}}},exports.preserve=function(t,e,n){return function(r){var o=function(){try{if("undefined"!=typeof window){var n=window[t].getItem(e);if(n)return JSON.parse(n)}}catch(t){console.error("Error while loading persisted state:",t)}}();if(r.setState(o||r.getState()),"undefined"!=typeof window)try{return r.subscribe(function(r){!function(r){try{if("undefined"!=typeof window&&window[t]){var o={};n.forEach(function(t){o[t]=r[t]});var i=JSON.stringify(o);window[t].setItem(e,i)}}catch(t){console.error("Error while persisting state:",t)}}(r)})}catch(t){}}};
//# sourceMappingURL=index.cjs.map
