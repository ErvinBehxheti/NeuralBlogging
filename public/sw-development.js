/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./service-worker/index.js":
/*!*********************************!*\
  !*** ./service-worker/index.js ***!
  \*********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval(__webpack_require__.ts("self.addEventListener(\"push\", (event)=>{\n    const data = event.data.json();\n    self.registration.showNotification(data.title, {\n        body: data.body,\n        icon: data.icon,\n        vibrate: data.vibrate,\n        data: data.data\n    });\n});\nself.addEventListener(\"notificationclick\", (event)=>{\n    event.notification.close();\n    const urlToOpen = event.notification.data.url;\n    event.waitUntil(clients.matchAll({\n        type: \"window\"\n    }).then((clientList)=>{\n        for(let i = 0; i < clientList.length; i++){\n            const client = clientList[i];\n            if (client.url === urlToOpen && \"focus\" in client) {\n                return client.focus();\n            }\n        }\n        if (clients.openWindow) {\n            return clients.openWindow(urlToOpen);\n        }\n    }));\n});\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                /* unsupported import.meta.webpackHot */ undefined.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zZXJ2aWNlLXdvcmtlci9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBQUEsS0FBS0MsZ0JBQWdCLENBQUMsUUFBUSxDQUFDQztJQUM3QixNQUFNQyxPQUFPRCxNQUFNQyxJQUFJLENBQUNDLElBQUk7SUFDNUJKLEtBQUtLLFlBQVksQ0FBQ0MsZ0JBQWdCLENBQUNILEtBQUtJLEtBQUssRUFBRTtRQUM3Q0MsTUFBTUwsS0FBS0ssSUFBSTtRQUNmQyxNQUFNTixLQUFLTSxJQUFJO1FBQ2ZDLFNBQVNQLEtBQUtPLE9BQU87UUFDckJQLE1BQU1BLEtBQUtBLElBQUk7SUFDakI7QUFDRjtBQUVBSCxLQUFLQyxnQkFBZ0IsQ0FBQyxxQkFBcUIsQ0FBQ0M7SUFDMUNBLE1BQU1TLFlBQVksQ0FBQ0MsS0FBSztJQUN4QixNQUFNQyxZQUFZWCxNQUFNUyxZQUFZLENBQUNSLElBQUksQ0FBQ1csR0FBRztJQUU3Q1osTUFBTWEsU0FBUyxDQUNiQyxRQUFRQyxRQUFRLENBQUM7UUFBRUMsTUFBTTtJQUFTLEdBQUdDLElBQUksQ0FBQyxDQUFDQztRQUN6QyxJQUFLLElBQUlDLElBQUksR0FBR0EsSUFBSUQsV0FBV0UsTUFBTSxFQUFFRCxJQUFLO1lBQzFDLE1BQU1FLFNBQVNILFVBQVUsQ0FBQ0MsRUFBRTtZQUM1QixJQUFJRSxPQUFPVCxHQUFHLEtBQUtELGFBQWEsV0FBV1UsUUFBUTtnQkFDakQsT0FBT0EsT0FBT0MsS0FBSztZQUNyQjtRQUNGO1FBQ0EsSUFBSVIsUUFBUVMsVUFBVSxFQUFFO1lBQ3RCLE9BQU9ULFFBQVFTLFVBQVUsQ0FBQ1o7UUFDNUI7SUFDRjtBQUVKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NlcnZpY2Utd29ya2VyL2luZGV4LmpzPzEzMDMiXSwic291cmNlc0NvbnRlbnQiOlsic2VsZi5hZGRFdmVudExpc3RlbmVyKFwicHVzaFwiLCAoZXZlbnQpID0+IHtcbiAgY29uc3QgZGF0YSA9IGV2ZW50LmRhdGEuanNvbigpO1xuICBzZWxmLnJlZ2lzdHJhdGlvbi5zaG93Tm90aWZpY2F0aW9uKGRhdGEudGl0bGUsIHtcbiAgICBib2R5OiBkYXRhLmJvZHksXG4gICAgaWNvbjogZGF0YS5pY29uLFxuICAgIHZpYnJhdGU6IGRhdGEudmlicmF0ZSxcbiAgICBkYXRhOiBkYXRhLmRhdGEsXG4gIH0pO1xufSk7XG5cbnNlbGYuYWRkRXZlbnRMaXN0ZW5lcihcIm5vdGlmaWNhdGlvbmNsaWNrXCIsIChldmVudCkgPT4ge1xuICBldmVudC5ub3RpZmljYXRpb24uY2xvc2UoKTtcbiAgY29uc3QgdXJsVG9PcGVuID0gZXZlbnQubm90aWZpY2F0aW9uLmRhdGEudXJsO1xuXG4gIGV2ZW50LndhaXRVbnRpbChcbiAgICBjbGllbnRzLm1hdGNoQWxsKHsgdHlwZTogXCJ3aW5kb3dcIiB9KS50aGVuKChjbGllbnRMaXN0KSA9PiB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNsaWVudExpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgY2xpZW50ID0gY2xpZW50TGlzdFtpXTtcbiAgICAgICAgaWYgKGNsaWVudC51cmwgPT09IHVybFRvT3BlbiAmJiBcImZvY3VzXCIgaW4gY2xpZW50KSB7XG4gICAgICAgICAgcmV0dXJuIGNsaWVudC5mb2N1cygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoY2xpZW50cy5vcGVuV2luZG93KSB7XG4gICAgICAgIHJldHVybiBjbGllbnRzLm9wZW5XaW5kb3codXJsVG9PcGVuKTtcbiAgICAgIH1cbiAgICB9KVxuICApO1xufSk7XG4iXSwibmFtZXMiOlsic2VsZiIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsImRhdGEiLCJqc29uIiwicmVnaXN0cmF0aW9uIiwic2hvd05vdGlmaWNhdGlvbiIsInRpdGxlIiwiYm9keSIsImljb24iLCJ2aWJyYXRlIiwibm90aWZpY2F0aW9uIiwiY2xvc2UiLCJ1cmxUb09wZW4iLCJ1cmwiLCJ3YWl0VW50aWwiLCJjbGllbnRzIiwibWF0Y2hBbGwiLCJ0eXBlIiwidGhlbiIsImNsaWVudExpc3QiLCJpIiwibGVuZ3RoIiwiY2xpZW50IiwiZm9jdXMiLCJvcGVuV2luZG93Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./service-worker/index.js\n"));

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			if (cachedModule.error !== undefined) throw cachedModule.error;
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/trusted types policy */
/******/ 	!function() {
/******/ 		var policy;
/******/ 		__webpack_require__.tt = function() {
/******/ 			// Create Trusted Type policy if Trusted Types are available and the policy doesn't exist yet.
/******/ 			if (policy === undefined) {
/******/ 				policy = {
/******/ 					createScript: function(script) { return script; }
/******/ 				};
/******/ 				if (typeof trustedTypes !== "undefined" && trustedTypes.createPolicy) {
/******/ 					policy = trustedTypes.createPolicy("nextjs#bundler", policy);
/******/ 				}
/******/ 			}
/******/ 			return policy;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/trusted types script */
/******/ 	!function() {
/******/ 		__webpack_require__.ts = function(script) { return __webpack_require__.tt().createScript(script); };
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/react refresh */
/******/ 	!function() {
/******/ 		if (__webpack_require__.i) {
/******/ 		__webpack_require__.i.push(function(options) {
/******/ 			var originalFactory = options.factory;
/******/ 			options.factory = function(moduleObject, moduleExports, webpackRequire) {
/******/ 				var hasRefresh = typeof self !== "undefined" && !!self.$RefreshInterceptModuleExecution$;
/******/ 				var cleanup = hasRefresh ? self.$RefreshInterceptModuleExecution$(moduleObject.id) : function() {};
/******/ 				try {
/******/ 					originalFactory.call(this, moduleObject, moduleExports, webpackRequire);
/******/ 				} finally {
/******/ 					cleanup();
/******/ 				}
/******/ 			}
/******/ 		})
/******/ 		}
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	
/******/ 	// noop fns to prevent runtime errors during initialization
/******/ 	if (typeof self !== "undefined") {
/******/ 		self.$RefreshReg$ = function () {};
/******/ 		self.$RefreshSig$ = function () {
/******/ 			return function (type) {
/******/ 				return type;
/******/ 			};
/******/ 		};
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./service-worker/index.js");
/******/ 	
/******/ })()
;