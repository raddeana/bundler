(function (dependenceGraph) {
  function require (module) {
    function localRequire (relativePath) {
      return require(dependenceGraph[module].dependencies[relativePath]);
    };

    var exports = {};

    (function(require, exports, code) {
      eval(code);
    })(localRequire, exports, dependenceGraph[module].code);
    return exports;
  }
  require('./src/index.js');
})({"./src/index.js":{"dependencies":{"./test-1":"./src/test-1.js","./test-2":"./src/test-2.js"},"code":"\"use strict\";\n\nvar _test = require(\"./test-1\");\n\nvar _test2 = require(\"./test-2\");\n\n(0, _test.t1)();\n(0, _test2.t2)();"},"./src/test-1.js":{"dependencies":{"./test-3":"./src/test-3.js","./test-4":"./src/test-4.js"},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.t1 = t1;\n\nvar _test = require(\"./test-3\");\n\nvar _test2 = require(\"./test-4\");\n\nfunction t1() {\n  (0, _test.t3)();\n  (0, _test2.t4)();\n}"},"./src/test-2.js":{"dependencies":{"./test-5":"./src/test-5.js"},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.t2 = t2;\n\nvar _test = require(\"./test-5\");\n\nfunction t2() {\n  (0, _test.t5)();\n}"},"./src/test-3.js":{"dependencies":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.t3 = t3;\n\nfunction t3() {\n  console.log('t3');\n}"},"./src/test-4.js":{"dependencies":{"./test-6":"./src/test-6.js"},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.t4 = t4;\n\nvar _test = require(\"./test-6\");\n\nfunction t4() {\n  (0, _test.t6)();\n}"},"./src/test-5.js":{"dependencies":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.t5 = t5;\n\nfunction t5() {\n  console.log('t5');\n}"},"./src/test-6.js":{"dependencies":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.t6 = t6;\n\nfunction t6() {\n  console.log('t6');\n}"}});
