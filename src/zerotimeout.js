
// source: https://s8a.jp/do-not-cause-stack-overflow-at-js#settimeout%E9%96%A2%E6%95%B0%E9%81%85%E5%BB%B6%E3%82%BC%E3%83%AD%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96

(function () {
    var timeouts = [],
        messageName = 'zero-timeout-message';

    function setZeroTimeoutPostMessage(fn) {
        timeouts.push(fn);
        window.postMessage(messageName, '*');
    }

    function setZeroTimeout(fn) {
        setTimeout(fn, 0);
    }

    function handleMessage(event) {
        if (event.source == window && event.data == messageName) {
            if (event.stopPropagation) {
                event.stopPropagation();
            }
            if (timeouts.length) {
                timeouts.shift()();
            }
        }
    }

    if (window.postMessage) {
        if (window.addEventListener) {
            window.addEventListener('message', handleMessage, true);
        } else if (window.attachEvent) {
            window.attachEvent('onmessage', handleMessage);
        }
        window.setZeroTimeout = setZeroTimeoutPostMessage;
    } else {
        window.setZeroTimeout = setZeroTimeout;
    }
}());