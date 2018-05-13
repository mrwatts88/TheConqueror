/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/mapCreator.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var g;\r\n\r\n// This works in non-strict mode\r\ng = (function() {\r\n\treturn this;\r\n})();\r\n\r\ntry {\r\n\t// This works if eval is allowed (see CSP)\r\n\tg = g || Function(\"return this\")() || (1, eval)(\"this\");\r\n} catch (e) {\r\n\t// This works if the window reference is available\r\n\tif (typeof window === \"object\") g = window;\r\n}\r\n\r\n// g can still be undefined, but nothing to do about it...\r\n// We return undefined, instead of nothing here, so it's\r\n// easier to handle this case. if(!global) { ...}\r\n\r\nmodule.exports = g;\r\n\n\n//# sourceURL=webpack:///(webpack)/buildin/global.js?");

/***/ }),

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/*! exports provided: SPEED, BS, WIDTH_UNITS, HEIGHT_UNITS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SPEED\", function() { return SPEED; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BS\", function() { return BS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"WIDTH_UNITS\", function() { return WIDTH_UNITS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"HEIGHT_UNITS\", function() { return HEIGHT_UNITS; });\nconst SPEED = 1;\nconst BS = 16;\nconst WIDTH_UNITS = 60;\nconst HEIGHT_UNITS = 40;\n\n//# sourceURL=webpack:///./src/constants.js?");

/***/ }),

/***/ "./src/mapCreator.js":
/*!***************************!*\
  !*** ./src/mapCreator.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _p5__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./p5 */ \"./src/p5.js\");\n/* harmony import */ var _p5__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_p5__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ \"./src/constants.js\");\n\n\nconst bs = _constants__WEBPACK_IMPORTED_MODULE_1__[\"BS\"] + 4;\nconst beginBtn = document.querySelector('#begin-btn');\nconst mapHeight = document.querySelector('#map-height');\nconst mapWidth = document.querySelector('#map-width');\nconst w = document.querySelector('#w');\nconst i = document.querySelector('#i');\nconst m = document.querySelector('#m');\nconst p = document.querySelector('#p');\nconst o = document.querySelector('#o');\nconst playBtn = document.querySelector('#play-btn');\n\nlet height, width, P5, startRow, startCol, endRow, endCol;\nlet gridArray = [];\nlet currentBlockType = 'w';\n\nbeginBtn.addEventListener('click', e => {\n    if (P5 !== undefined) P5.remove();\n    P5 = new _p5__WEBPACK_IMPORTED_MODULE_0__(sketch, 'grid');\n})\n\nw.addEventListener('click', e => {\n    currentBlockType = 'w';\n})\n\ni.addEventListener('click', e => {\n    currentBlockType = 'i';\n})\n\nm.addEventListener('click', e => {\n    currentBlockType = 'm';\n})\n\np.addEventListener('click', e => {\n    currentBlockType = 'p';\n})\n\no.addEventListener('click', e => {\n    currentBlockType = '0';\n})\n\nplayBtn.addEventListener('click', e => {\n    playGame();\n})\n\nconst playGame = () => {\n    localStorage.setItem(\"map\", JSON.stringify(gridArray));\n    window.location.href = 'index.html';\n}\n\nconst sketch = p5 => {\n    p5.setup = () => {\n        height = mapHeight.value;\n        width = mapWidth.value;\n        const can = p5.createCanvas(bs * width + 1, bs * height + 1);\n        can.mousePressed(() => {\n            startRow = Math.floor(p5.mouseY / bs);\n            startCol = Math.floor(p5.mouseX / bs);\n        })\n\n        can.mouseReleased(() => {\n            endRow = Math.floor(p5.mouseY / bs);\n            endCol = Math.floor(p5.mouseX / bs);\n            for (let j = Math.min(startRow, endRow); j <= Math.max(startRow, endRow); ++j)\n                for (let i = Math.min(startCol, endCol); i <= Math.max(startCol, endCol); ++i)\n                    gridArray[j][i] = currentBlockType;\n        })\n\n        for (let j = 0; j < height; ++j) {\n            let oneRow = [];\n            for (let i = 0; i < width; ++i) {\n                if (i === 0 || i === 1 || i === width - 1 || i === width - 2\n                    || j === 0 || j === 1 || j === height - 1 || j === height - 2)\n                    oneRow[i] = 'w';\n                else oneRow[i] = '0';\n            }\n\n            gridArray[j] = oneRow.slice();\n        }\n    }\n\n    p5.draw = () => {\n        for (let j = 0; j < height; ++j) {\n            for (let i = 0; i < width; ++i) {\n                if (gridArray[j][i] === 'w') p5.fill('green');\n                if (gridArray[j][i] === 'i') p5.fill('yellow');\n                if (gridArray[j][i] === 'm') p5.fill('purple');\n                if (gridArray[j][i] === 'p') p5.fill('pink');\n                if (gridArray[j][i] === '0') p5.fill('white');\n                p5.rect(i * bs, j * bs, bs, bs);\n                p5.fill('white');\n            }\n        }\n    }\n}\n\n\n//# sourceURL=webpack:///./src/mapCreator.js?");

/***/ }),

/***/ "./src/p5.js":
/*!*******************!*\
  !*** ./src/p5.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/***/ })

/******/ });