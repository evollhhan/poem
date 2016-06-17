webpackJsonp([0,1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * APP: POEM
	 *
	 * @version: 0.0.2(dev)
	 * @last update: 2016-06-17
	 * @By Pathen
	 * @:)
	 **/
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(1), __webpack_require__(11), __webpack_require__(5), __webpack_require__(9)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, router_1, test1_1) {
	    "use strict";
	    /**
	     * Page Router
	     *
	     * define page url width related template and function
	     */
	    var router = new router_1.Router();
	    router.config({
	        errorPageURL: '/404',
	        errorPagePATH: '404.html'
	    })
	        .when({
	        url: '/',
	        tpl: 'app.html'
	    })
	        .when({
	        url: '/test1',
	        tpl: 'test1.html',
	        ctrl: test1_1.test1
	    })
	        .when({
	        url: '/test2',
	        tpl: 'test2.html',
	    })
	        .on();
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(2), __webpack_require__(3), __webpack_require__(4)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, httpServer_1, compile_1, customSetting_1) {
	    "use strict";
	    var Router = (function () {
	        function Router() {
	            if (window.location.hash === '')
	                window.location.hash = '#/';
	            this.origin = window.location.origin;
	            var viewer = document.getElementsByTagName('po-view');
	            if (viewer.length > 1) {
	                console.error('Router Error: Two or more <po-view> in this document.');
	                return;
	            }
	            else {
	                this.viewer = viewer[0];
	            }
	            this.urlBase = {};
	            this.ctrlBase = {};
	            this.errorPageURL = '/';
	            this.errorPagePATH = '';
	            this.cs = new customSetting_1.CustomSetting();
	            this.cp = new compile_1.Compile();
	        }
	        Router.prototype.HashChange = function (e) {
	            var url = e.newURL.replace(this.origin + '/#', '').match(/[^\?]*/g)[0];
	            var process = (function (that) {
	                if (!that.urlBase || !that.urlBase['/']) {
	                    return function (url) {
	                        console.error('Router Error: no "/" page is defined.');
	                    };
	                }
	                else {
	                    return function (url) {
	                        if (!that.urlBase.hasOwnProperty(url)) {
	                            window.location.hash = that.errorPageURL;
	                            return;
	                        }
	                        var http = new httpServer_1.HttpServer();
	                        http.Get({
	                            url: './templates/' + that.urlBase[url],
	                            progress: function (evt) {
	                                that.cs.pageLoadProgress && that.cs.pageLoadProgress(evt);
	                            },
	                            success: function (data) {
	                                that.cp.update(that.viewer, data, that.ctrlBase[url]);
	                            }
	                        });
	                    };
	                }
	            })(this);
	            process(url);
	        };
	        Router.prototype.config = function (opt) {
	            this.errorPageURL = opt.errorPageURL || this.errorPageURL;
	            this.errorPagePATH = opt.errorPagePATH || this.errorPagePATH;
	            if (this.errorPageURL !== '/')
	                this.urlBase[this.errorPageURL] = this.errorPagePATH;
	            return this;
	        };
	        Router.prototype.when = function (router) {
	            this.urlBase[router.url] = router.tpl;
	            router.ctrl && (this.ctrlBase[router.url] = router.ctrl);
	            return this;
	        };
	        Router.prototype.on = function () {
	            var that = this;
	            window.onhashchange = (function (that) {
	                return function (e) {
	                    that.HashChange(e);
	                };
	            })(that);
	            var currentURL = {};
	            currentURL.newURL = window.location.href;
	            this.HashChange(currentURL);
	        };
	        Router.prototype.off = function () {
	            window.onhashchange = null;
	        };
	        return Router;
	    }());
	    exports.Router = Router;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
	    "use strict";
	    var HttpServer = (function () {
	        function HttpServer() {
	            this.xhr = new XMLHttpRequest();
	        }
	        HttpServer.prototype.Get = function (opt) {
	            this.AsyncRequest(opt.success);
	            this.Progress(opt.progress);
	            if (typeof (opt.data) === 'object') {
	                for (var i in opt.data) {
	                    opt.url += (opt.url.indexOf('?') === -1) ? '?' : '&';
	                    opt.url += encodeURIComponent(i) + '=' + encodeURIComponent(opt.data[i]);
	                }
	            }
	            this.xhr.open('get', opt.url, true);
	            this.xhr.send();
	        };
	        HttpServer.prototype.Post = function (opt) {
	            this.AsyncRequest(opt.success);
	            this.xhr.open('post', opt.url, true);
	            this.xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
	            this.xhr.send(JSON.stringify(opt.data));
	        };
	        HttpServer.prototype.Abort = function () {
	            this.xhr.abort();
	        };
	        HttpServer.prototype.AsyncRequest = function (success) {
	            var that = this;
	            var stateChange = (function (xhr, success) {
	                return function () {
	                    if (this.readyState === 4) {
	                        xhr.Response(success);
	                    }
	                };
	            })(that, success);
	            this.xhr.onreadystatechange = stateChange;
	        };
	        HttpServer.prototype.Response = function (success) {
	            if (this.xhr.status >= 200 && this.xhr.status < 300 || this.xhr.status == 304) {
	                success && success(this.xhr.responseText);
	            }
	            else {
	                console.error('HttpServer Error: ' + this.xhr.status);
	            }
	        };
	        HttpServer.prototype.Progress = function (progress) {
	            var updateProgress = (function (progress) {
	                return function (evt) {
	                    progress && progress(evt);
	                };
	            })(progress);
	            this.xhr.onprogress = updateProgress;
	        };
	        HttpServer.prototype.SetRequestHeader = function () {
	            // Todo    
	        };
	        return HttpServer;
	    }());
	    exports.HttpServer = HttpServer;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Compile
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
	    "use strict";
	    var Compile = (function () {
	        function Compile() {
	        }
	        Compile.prototype.update = function (viewer, html, controller) {
	            if (controller) {
	                var param = controller.$extend;
	                controller.$run(param[0]);
	            }
	            else {
	                viewer.innerHTML = html;
	            }
	        };
	        return Compile;
	    }());
	    exports.Compile = Compile;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Custom System Setting
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
	    "use strict";
	    var CustomSetting = (function () {
	        function CustomSetting() {
	        }
	        CustomSetting.prototype.pageLoadProgress = function (evt) {
	            var dom = document.querySelector('.pageProgress'), progress = Math.round(evt.loaded / evt.total * 100);
	            dom.style.width = progress + '%';
	            if (progress === 100) {
	                setTimeout(function () {
	                    dom.style.display = 'none';
	                    setTimeout(function () {
	                        dom.style.width = '0';
	                        dom.style.display = 'block';
	                    }, 100);
	                }, 200);
	            }
	        };
	        return CustomSetting;
	    }());
	    exports.CustomSetting = CustomSetting;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(6);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/autoprefixer-loader/index.js!./../../node_modules/stylus-loader/index.js!./main.styl", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/autoprefixer-loader/index.js!./../../node_modules/stylus-loader/index.js!./main.styl");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports


	// module
	exports.push([module.id, "body {\n  font-family: 'Arial';\n  margin: 0;\n  padding: 0;\n}\ncanvas {\n  margin: 20px;\n  border: 1px solid #000;\n}\n", ""]);

	// exports


/***/ },
/* 7 */
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
/* 8 */
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(10);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/autoprefixer-loader/index.js!./../../node_modules/stylus-loader/index.js!./components.styl", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/autoprefixer-loader/index.js!./../../node_modules/stylus-loader/index.js!./components.styl");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports


	// module
	exports.push([module.id, ".pageProgress {\n  position: absolute;\n  top: 0;\n  z-index: 9999;\n  width: 0;\n  height: 3px;\n  background: #09f;\n  box-shadow: 0 1px 8px #069;\n  -webkit-transition: 0.2s all ease;\n  transition: 0.2s all ease;\n}\n", ""]);

	// exports


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * test1
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(12)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, poem_1) {
	    "use strict";
	    var test1 = poem_1.poem({
	        $id: 'test1',
	        welcome: 'Hello World',
	        $extend: ['Blur'],
	        $run: function (blur) {
	            console.log(blur);
	        }
	    });
	    exports.test1 = test1;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Poem View Module Maker
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
	    "use strict";
	    var maker = function (prop) {
	        return prop;
	    };
	    exports.poem = maker;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }
]);