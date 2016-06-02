webpackJsonp([0,1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(1), __webpack_require__(5)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
	    "use strict";
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/autoprefixer-loader/index.js!./../node_modules/stylus-loader/index.js!./main.styl", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/autoprefixer-loader/index.js!./../node_modules/stylus-loader/index.js!./main.styl");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "body {\n  color: #f8f8f8;\n  font-family: 'Arial';\n}\ncanvas {\n  margin: 20px;\n  border: 1px solid #000;\n}\n", ""]);

	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(6), __webpack_require__(8), __webpack_require__(9)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, sys_1, blur_1, _blendMode_1) {
	    "use strict";
	    var IMAGE_WIDTH = 400, IMAGE_HEIGHT = 400;
	    var cvsO = document.getElementById('origin'), cvsG = document.getElementById('guass'), cvsA = document.getElementById('add'), ctxO = cvsO.getContext('2d'), ctxG = cvsG.getContext('2d'), ctxA = cvsA.getContext('2d');
	    var SYS = new sys_1.systemFunction();
	    window.draw = function () {
	        var img = new Image();
	        img.src = 'images/test.jpeg';
	        img.onload = function () {
	            ctxO.drawImage(img, 0, 0, IMAGE_WIDTH, IMAGE_HEIGHT);
	        };
	    };
	    window.processGuass = function () {
	        var gauss = new blur_1.Blur();
	        SYS.timeConsume('Gaussian Blur', function () {
	            gauss.Gaussian(ctxO, ctxG, IMAGE_WIDTH, IMAGE_WIDTH, 2);
	        });
	    };
	    window.processAdd = function () {
	        var blend = new _blendMode_1.blendMode(ctxO, ctxG, ctxA, IMAGE_WIDTH, IMAGE_HEIGHT);
	        SYS.timeConsume('Overlay', function () {
	            blend.Overlay();
	        });
	    };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Global Function
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(7)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, timeConsume_1) {
	    "use strict";
	    var systemFunction = (function () {
	        function systemFunction() {
	        }
	        systemFunction.prototype.timeConsume = function (name, func) {
	            var tsr = new timeConsume_1.timeConsumptionRecoder(name);
	            tsr.run(func);
	        };
	        return systemFunction;
	    }());
	    exports.systemFunction = systemFunction;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
	    "use strict";
	    /**
	     * Time Consumption Recoder
	     */
	    var timeConsumptionRecoder = (function () {
	        function timeConsumptionRecoder(name) {
	            this.operationName = name;
	        }
	        timeConsumptionRecoder.prototype.run = function (func) {
	            // Time Consuming: start
	            var _start = new Date().getTime();
	            func();
	            // Time Consuming: end
	            var _end = new Date().getTime();
	            // Output time consumption
	            console.info('Operation: ' + this.operationName);
	            console.log(this.operationName + ' ->[Time-Consuming]: ' + (_end - _start) + 'ms');
	        };
	        return timeConsumptionRecoder;
	    }());
	    exports.timeConsumptionRecoder = timeConsumptionRecoder;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
	    "use strict";
	    /**
	     * Blur
	     * --------------
	     * 1. Gaussian
	     * --------------
	     */
	    var Blur = (function () {
	        function Blur() {
	        }
	        // sigma = 2 -> 3*3
	        Blur.prototype.Gaussian = function (ctxSrc, ctxDst, w, h, sigma) {
	            var mathC = -1 / (2 * sigma * sigma);
	            var mathM = 1 / Math.sqrt(Math.PI * 2);
	            var r = 0;
	            var g = 0;
	            var b = 0;
	            var a = 0;
	            var dataLen = w * h;
	            var tempR = [];
	            var tempG = [];
	            var tempB = [];
	            var imageData = ctxSrc.getImageData(0, 0, w, h);
	            var newData = ctxDst.createImageData(w, h);
	            // Get weight coefficient matrix
	            var weightCoefficient = (function () {
	                var dist0 = mathM / sigma;
	                var dist1 = mathM * Math.exp(mathC * 1) / sigma;
	                var we00 = dist0 * dist0;
	                var we01 = dist0 * dist1;
	                var we11 = dist1 * dist1;
	                var sum = 4 * we11 + 4 * we01 + we00;
	                we00 = we00 / sum;
	                we01 = we01 / sum;
	                we11 = we11 / sum;
	                return [we11, we01, we11, we01, we00, we01, we11, we01, we11];
	            })();
	            // Calculate the value according to the weight coefficient
	            function calculateMatrix(a) {
	                // @a {Array} 3*3 Matrix
	                var sum = 0;
	                for (var i = 0; i < 9; i++) {
	                    sum += a[i] * weightCoefficient[i];
	                }
	                return sum;
	            }
	            // Read image data and do the gaussian blur
	            for (var j = 0; j < h; j++) {
	                for (var i = 0; i < w; i++) {
	                    // 中心点位置
	                    // r = imageData.data[(j*400+i)*4],
	                    // g = imageData.data[(j*400+i)*4 + 1],
	                    // b = imageData.data[(j*400+i)*4 + 2],
	                    // a = imageData.data[(j*400+i)*4 + 3];
	                    if (i === 0 || j == 0 || i === 399 || j == 399) {
	                        r = g = b = 0;
	                    }
	                    else {
	                        tempR = [];
	                        tempG = [];
	                        tempB = [];
	                        for (var k = -1; k <= 1; k++) {
	                            tempR.push(imageData.data[((j + k) * 400 + i - 1) * 4]);
	                            tempR.push(imageData.data[((j + k) * 400 + i) * 4]);
	                            tempR.push(imageData.data[((j + k) * 400 + i + 1) * 4]);
	                            tempG.push(imageData.data[((j + k) * 400 + i - 1) * 4 + 1]);
	                            tempG.push(imageData.data[((j + k) * 400 + i) * 4 + 1]);
	                            tempG.push(imageData.data[((j + k) * 400 + i + 1) * 4 + 1]);
	                            tempB.push(imageData.data[((j + k) * 400 + i - 1) * 4 + 2]);
	                            tempB.push(imageData.data[((j + k) * 400 + i) * 4 + 2]);
	                            tempB.push(imageData.data[((j + k) * 400 + i + 1) * 4 + 2]);
	                        }
	                        r = calculateMatrix(tempR);
	                        g = calculateMatrix(tempG);
	                        b = calculateMatrix(tempB);
	                    }
	                    newData.data[(j * 400 + i) * 4] = Math.round(r);
	                    newData.data[(j * 400 + i) * 4 + 1] = Math.round(g);
	                    newData.data[(j * 400 + i) * 4 + 2] = Math.round(b);
	                    newData.data[(j * 400 + i) * 4 + 3] = 255;
	                }
	            }
	            // Draw the image on the destination canvas
	            ctxDst.putImageData(newData, 0, 0);
	        };
	        return Blur;
	    }());
	    exports.Blur = Blur;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * blendMode
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(13), __webpack_require__(14), __webpack_require__(15), __webpack_require__(16), __webpack_require__(17), __webpack_require__(12), __webpack_require__(18), __webpack_require__(19), __webpack_require__(20), __webpack_require__(21), __webpack_require__(22), __webpack_require__(10), __webpack_require__(11), __webpack_require__(23), __webpack_require__(24), __webpack_require__(25), __webpack_require__(26)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, colorBurn_1, colorDodge_1, darken_1, difference_1, exclusion_1, hardLight_1, hardMix_1, lighten_1, linearBurn_1, linearDodge_1, linearLight_1, multiply_1, overlay_1, pinLight_1, screen_1, softLight_1, vividLight_1) {
	    "use strict";
	    // Main
	    var blendMode = (function () {
	        function blendMode(ctxA, ctxB, ctxDst, w, h) {
	            this.ctxA = ctxA;
	            this.ctxB = ctxB;
	            this.ctxDst = ctxDst;
	            this.imageDataA = ctxA.getImageData(0, 0, w, h);
	            this.imageDataB = ctxB.getImageData(0, 0, w, h);
	            this.w = w;
	            this.h = h;
	            this.dataLen = w * h;
	        }
	        blendMode.prototype.traverseImageData = function (func) {
	            var newData = this.ctxDst.createImageData(this.w, this.h);
	            for (var i = 0; i < this.dataLen; i++) {
	                for (var j = 0; j < 3; j++) {
	                    newData.data[i * 4 + j] = func(this.imageDataA.data[i * 4 + j], this.imageDataB.data[i * 4 + j]);
	                }
	                newData.data[i * 4 + 3] = 255;
	            }
	            this.ctxDst.putImageData(newData, 0, 0);
	        };
	        blendMode.prototype.ColorBurn = function () {
	            var colorBurn = new colorBurn_1.ColorBurn();
	            this.traverseImageData(colorBurn.run);
	        };
	        blendMode.prototype.ColorDodge = function () {
	            var colorDodge = new colorDodge_1.ColorDodge();
	            this.traverseImageData(colorDodge.run);
	        };
	        blendMode.prototype.Darken = function () {
	            var darken = new darken_1.Darken();
	            this.traverseImageData(darken.run);
	        };
	        blendMode.prototype.Difference = function () {
	            var difference = new difference_1.Difference();
	            this.traverseImageData(difference.run);
	        };
	        blendMode.prototype.Exclusion = function () {
	            var exclusion = new exclusion_1.Exclusion();
	            this.traverseImageData(exclusion.run);
	        };
	        blendMode.prototype.HardLight = function () {
	            var hardLight = new hardLight_1.HardLight();
	            this.traverseImageData(hardLight.run);
	        };
	        blendMode.prototype.HardMix = function () {
	            var hardMix = new hardMix_1.HardMix();
	            this.traverseImageData(hardMix.run);
	        };
	        blendMode.prototype.Lighten = function () {
	            var lighten = new lighten_1.Lighten();
	            this.traverseImageData(lighten.run);
	        };
	        blendMode.prototype.LinearBurn = function () {
	            var linearBurn = new linearBurn_1.LinearBurn();
	            this.traverseImageData(linearBurn.run);
	        };
	        blendMode.prototype.LinearDodge = function () {
	            var linearDodge = new linearDodge_1.LinearDodge();
	            this.traverseImageData(linearDodge.run);
	        };
	        blendMode.prototype.LinearLight = function () {
	            var linearLight = new linearLight_1.LinearLight();
	            this.traverseImageData(linearLight.run);
	        };
	        blendMode.prototype.Multiply = function () {
	            var multiply = new multiply_1.Multiply();
	            this.traverseImageData(multiply.run);
	        };
	        blendMode.prototype.Overlay = function () {
	            var overlay = new overlay_1.Overlay();
	            this.traverseImageData(overlay.run);
	        };
	        blendMode.prototype.PinLight = function () {
	            var pinLight = new pinLight_1.PinLight();
	            this.traverseImageData(pinLight.run);
	        };
	        blendMode.prototype.Screen = function () {
	            var screen = new screen_1.Screen();
	            this.traverseImageData(screen.run);
	        };
	        blendMode.prototype.SoftLight = function () {
	            var softLight = new softLight_1.SoftLight();
	            this.traverseImageData(softLight.run);
	        };
	        blendMode.prototype.VividLight = function () {
	            var vividLight = new vividLight_1.VividLight();
	            this.traverseImageData(vividLight.run);
	        };
	        return blendMode;
	    }());
	    exports.blendMode = blendMode;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
	    "use strict";
	    /**
	     * Multiply
	     */
	    var Multiply = (function () {
	        function Multiply() {
	        }
	        Multiply.prototype.run = function (A, B) {
	            var result = 0;
	            result = A * B / 255;
	            return Math.round(result);
	        };
	        return Multiply;
	    }());
	    exports.Multiply = Multiply;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
	    "use strict";
	    /**
	     * Overlay
	     */
	    var Overlay = (function () {
	        function Overlay() {
	        }
	        Overlay.prototype.run = function (A, B) {
	            var result = 0;
	            if (A <= 128) {
	                result = A * B / 128;
	            }
	            else {
	                result = 255 - (255 - A) * (255 - B) / 128;
	            }
	            return Math.round(result);
	        };
	        return Overlay;
	    }());
	    exports.Overlay = Overlay;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
	    "use strict";
	    /**
	     * Hard Light
	     */
	    var HardLight = (function () {
	        function HardLight() {
	        }
	        HardLight.prototype.run = function (A, B) {
	            var result = 0;
	            if (B <= 128) {
	                result = A * B / 128;
	            }
	            else {
	                result = 255 - (255 - A) * (255 - B) / 128;
	            }
	            return Math.round(result);
	        };
	        return HardLight;
	    }());
	    exports.HardLight = HardLight;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
	    "use strict";
	    /**
	     * Color Burn
	     */
	    var ColorBurn = (function () {
	        function ColorBurn() {
	        }
	        ColorBurn.prototype.run = function (A, B) {
	            var result = 0;
	            result = A - (255 - A) * (255 - B) / B;
	            return Math.round(result);
	        };
	        return ColorBurn;
	    }());
	    exports.ColorBurn = ColorBurn;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
	    "use strict";
	    /**
	     * Color Dodge
	     */
	    var ColorDodge = (function () {
	        function ColorDodge() {
	        }
	        ColorDodge.prototype.run = function (A, B) {
	            var result = 0;
	            result = A + A * B / (255 - B);
	            return Math.round(result);
	        };
	        return ColorDodge;
	    }());
	    exports.ColorDodge = ColorDodge;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
	    "use strict";
	    /**
	     * Darken
	     */
	    var Darken = (function () {
	        function Darken() {
	        }
	        Darken.prototype.run = function (A, B) {
	            return Math.min(A, B);
	        };
	        return Darken;
	    }());
	    exports.Darken = Darken;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
	    "use strict";
	    /**
	     * Difference
	     */
	    var Difference = (function () {
	        function Difference() {
	        }
	        Difference.prototype.run = function (A, B) {
	            return Math.abs(A - B);
	        };
	        return Difference;
	    }());
	    exports.Difference = Difference;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
	    "use strict";
	    /**
	     * Exclusion
	     */
	    var Exclusion = (function () {
	        function Exclusion() {
	        }
	        Exclusion.prototype.run = function (A, B) {
	            var result = 0;
	            result = A + B - A * B / 128;
	            return Math.round(result);
	        };
	        return Exclusion;
	    }());
	    exports.Exclusion = Exclusion;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
	    "use strict";
	    /**
	     * Hard Mix
	     */
	    var HardMix = (function () {
	        function HardMix() {
	        }
	        HardMix.prototype.run = function (A, B) {
	            if ((A + B) >= 255) {
	                return 255;
	            }
	            else {
	                return 0;
	            }
	        };
	        return HardMix;
	    }());
	    exports.HardMix = HardMix;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
	    "use strict";
	    /**
	     * Lighten
	     */
	    var Lighten = (function () {
	        function Lighten() {
	        }
	        Lighten.prototype.run = function (A, B) {
	            return Math.max(A, B);
	        };
	        return Lighten;
	    }());
	    exports.Lighten = Lighten;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
	    "use strict";
	    /**
	     * Linear Burn
	     */
	    var LinearBurn = (function () {
	        function LinearBurn() {
	        }
	        LinearBurn.prototype.run = function (A, B) {
	            return (A + B) < 255 ? 0 : (A + B - 255);
	        };
	        return LinearBurn;
	    }());
	    exports.LinearBurn = LinearBurn;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
	    "use strict";
	    /**
	     * Linear Dodge
	     */
	    var LinearDodge = (function () {
	        function LinearDodge() {
	        }
	        LinearDodge.prototype.run = function (A, B) {
	            return (A + B) > 255 ? 255 : (A + B);
	        };
	        return LinearDodge;
	    }());
	    exports.LinearDodge = LinearDodge;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
	    "use strict";
	    /**
	     * Linear Light
	     */
	    var LinearLight = (function () {
	        function LinearLight() {
	        }
	        LinearLight.prototype.run = function (A, B) {
	            return (A + B * 2 - 255);
	        };
	        return LinearLight;
	    }());
	    exports.LinearLight = LinearLight;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
	    "use strict";
	    /**
	     * Pin Light
	     */
	    var PinLight = (function () {
	        function PinLight() {
	        }
	        PinLight.prototype.run = function (A, B) {
	            if (B <= 128) {
	                return Math.min(A, 2 * B);
	            }
	            else {
	                return Math.min(A, 2 * B - 255);
	            }
	        };
	        return PinLight;
	    }());
	    exports.PinLight = PinLight;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
	    "use strict";
	    /**
	     * Screen
	     */
	    var Screen = (function () {
	        function Screen() {
	        }
	        Screen.prototype.run = function (A, B) {
	            var result = 0;
	            result = 255 - (255 - A) * (255 - B) / 255;
	            return Math.round(result);
	        };
	        return Screen;
	    }());
	    exports.Screen = Screen;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
	    "use strict";
	    /**
	     * Soft Light
	     */
	    var SoftLight = (function () {
	        function SoftLight() {
	        }
	        SoftLight.prototype.run = function (A, B) {
	            var result = 0;
	            if (B <= 128) {
	                result = A * B / 128 + Math.pow(A / 255, 2) * (255 - 2 * B);
	            }
	            else {
	                result = A * (255 - B) / 128 + Math.sqrt(A / 255) * (2 * B - 255);
	            }
	            return Math.round(result);
	        };
	        return SoftLight;
	    }());
	    exports.SoftLight = SoftLight;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
	    "use strict";
	    /**
	     * Vivid Light
	     */
	    var VividLight = (function () {
	        function VividLight() {
	        }
	        VividLight.prototype.run = function (A, B) {
	            var result = 0;
	            if (B <= 128) {
	                result = A - (255 - A) * (255 - 2 * B) / (2 * B);
	            }
	            else {
	                result = A + A * (2 * B - 255) / (2 * (255 - B));
	            }
	            return Math.round(result);
	        };
	        return VividLight;
	    }());
	    exports.VividLight = VividLight;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }
]);