// This module will turn on / turn off console.log
let logger = (function () {
  var oldConsoleLog = null;
  var pub = {};

  pub.enableLogger = function enableLogger() {
    if (oldConsoleLog == null) return;
    window["console"]["log"] = oldConsoleLog;
  };

  pub.disableLogger = function disableLogger() {
    oldConsoleLog = console.log;
    window["console"]["log"] = function () {};
  };

  return pub;
})();

export default logger;
