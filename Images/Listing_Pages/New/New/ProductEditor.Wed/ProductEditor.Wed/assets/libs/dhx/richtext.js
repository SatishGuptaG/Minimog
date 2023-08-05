/*
@license

dhtmlxRichtext  Professional

This software is covered by DHTMLX Enterprise License.
Usage without proper license is prohibited.

(c) Dinamenta, UAB.

*/
if (window.dhx){ window.dhx_legacy = dhx; delete window.dhx; }(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["dhx"] = factory();
	else
		root["dhx"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "/codebase/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 36);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom = __webpack_require__(39);
exports.el = dom.defineElement;
exports.sv = dom.defineSvgElement;
exports.view = dom.defineView;
exports.create = dom.createView;
exports.inject = dom.injectView;
function disableHelp() {
    dom.DEVMODE.mutations = false;
    dom.DEVMODE.warnings = false;
    dom.DEVMODE.verbose = false;
    dom.DEVMODE.UNKEYED_INPUT = false;
}
exports.disableHelp = disableHelp;
function resizer(handler) {
    var resize = window.ResizeObserver;
    var activeHandler = function (node) {
        var height = node.el.offsetHeight;
        var width = node.el.offsetWidth;
        handler(width, height);
    };
    if (resize) {
        return exports.el("div.dhx-resize-observer", {
            _hooks: {
                didInsert: function (node) {
                    new resize(function () { return activeHandler(node); }).observe(node.el);
                }
            }
        });
    }
    return exports.el("iframe.dhx-resize-observer", {
        _hooks: {
            didInsert: function (node) {
                node.el.contentWindow.onresize = function () { return activeHandler(node); };
                activeHandler(node);
            }
        }
    });
}
exports.resizer = resizer;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(40);
function toNode(node) {
    if (typeof node === "string") {
        node = (document.getElementById(node) || document.querySelector(node));
    }
    return node || document.body;
}
exports.toNode = toNode;
function eventHandler(prepare, hash) {
    var keys = Object.keys(hash);
    return function (ev) {
        var data = prepare(ev);
        var node = ev.target;
        while (node) {
            var cssstring = node.getAttribute ? (node.getAttribute("class") || "") : "";
            if (cssstring.length) {
                var css = cssstring.split(" ");
                for (var j = 0; j < keys.length; j++) {
                    if (css.indexOf(keys[j]) > -1) {
                        return hash[keys[j]](ev, data);
                    }
                }
            }
            node = node.parentNode;
        }
        return true;
    };
}
exports.eventHandler = eventHandler;
function locate(target, attr) {
    if (attr === void 0) { attr = "dhx_id"; }
    var node = locateNode(target, attr);
    return node ? node.getAttribute(attr) : "";
}
exports.locate = locate;
function locateNode(target, attr) {
    if (attr === void 0) { attr = "dhx_id"; }
    if (target instanceof Event) {
        target = target.target;
    }
    while (target) {
        if (target.getAttribute && target.getAttribute(attr)) {
            return target;
        }
        target = target.parentNode;
    }
}
exports.locateNode = locateNode;
function getBox(elem) {
    var box = elem.getBoundingClientRect();
    var body = document.body;
    var scrollTop = window.pageYOffset || body.scrollTop;
    var scrollLeft = window.pageXOffset || body.scrollLeft;
    var top = box.top + scrollTop;
    var left = box.left + scrollLeft;
    var right = body.offsetWidth - box.right;
    var bottom = body.offsetHeight - box.bottom;
    var width = box.right - box.left;
    var height = box.bottom - box.top;
    return { top: top, left: left, right: right, bottom: bottom, width: width, height: height };
}
exports.getBox = getBox;
var scrollWidth = -1;
function getScrollbarWidth() {
    if (scrollWidth > -1) {
        return scrollWidth;
    }
    var scrollDiv = document.createElement("div");
    document.body.appendChild(scrollDiv);
    scrollDiv.style.cssText = "position: absolute;left: -99999px;overflow:scroll;width: 100px;height: 100px;";
    scrollWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    return scrollWidth;
}
exports.getScrollbarWidth = getScrollbarWidth;
function fitPosition(node, config) {
    return calculatePosition(getRealPosition(node), config);
}
exports.fitPosition = fitPosition;
function isIE() {
    var ua = window.navigator.userAgent;
    return ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
}
exports.isIE = isIE;
function getRealPosition(node) {
    var rects = node.getBoundingClientRect();
    return {
        left: rects.left + window.pageXOffset,
        right: rects.right + window.pageXOffset,
        top: rects.top + window.pageYOffset,
        bottom: rects.bottom + window.pageYOffset
    };
}
exports.getRealPosition = getRealPosition;
var Position;
(function (Position) {
    Position["left"] = "left";
    Position["right"] = "right";
    Position["bottom"] = "bottom";
    Position["top"] = "top";
})(Position = exports.Position || (exports.Position = {}));
function calculatePosition(pos, config) {
    var _a = config.mode === Position.bottom || config.mode === Position.top ?
        placeBottomOrTop(pos, config) :
        placeRightOrLeft(pos, config), left = _a.left, top = _a.top;
    return {
        left: left + "px",
        top: top + "px",
        minWidth: config.width + "px",
        position: "absolute"
    };
}
exports.calculatePosition = calculatePosition;
function getWindowBorders() {
    return {
        rightBorder: window.pageXOffset + window.innerWidth,
        bottomBorder: window.pageYOffset + window.innerHeight
    };
}
function horizontalCentering(pos, width, rightBorder) {
    var nodeWidth = pos.right - pos.left;
    var diff = (width - nodeWidth) / 2;
    var left = pos.left - diff;
    var right = pos.right + diff;
    if (left >= 0 && right <= rightBorder) {
        return left;
    }
    if (left < 0) {
        return 0;
    }
    return rightBorder - width;
}
function verticalCentering(pos, height, bottomBorder) {
    var nodeHeight = pos.bottom - pos.top;
    var diff = (height - nodeHeight) / 2;
    var top = pos.top - diff;
    var bottom = pos.bottom + diff;
    if (top >= 0 && bottom <= bottomBorder) {
        return top;
    }
    if (top < 0) {
        return 0;
    }
    return bottomBorder - height;
}
function placeBottomOrTop(pos, config) {
    var _a = getWindowBorders(), rightBorder = _a.rightBorder, bottomBorder = _a.bottomBorder;
    var left;
    var top;
    var bottomDiff = bottomBorder - pos.bottom - config.height;
    var topDiff = pos.top - config.height;
    if (config.mode === Position.bottom) {
        if (bottomDiff >= 0) {
            top = pos.bottom;
        }
        else if (topDiff >= 0) {
            top = topDiff;
        }
    }
    else {
        if (topDiff >= 0) {
            top = topDiff;
        }
        else if (bottomDiff >= 0) {
            top = pos.bottom;
        }
    }
    if (bottomDiff < 0 && topDiff < 0) {
        if (config.auto) {
            return placeRightOrLeft(pos, __assign({}, config, { mode: Position.right, auto: false }));
        }
        top = bottomDiff > topDiff ? pos.bottom : topDiff;
    }
    if (config.centering) {
        left = horizontalCentering(pos, config.width, rightBorder);
    }
    else {
        var leftDiff = rightBorder - pos.left - config.width;
        var rightDiff = pos.right - config.width;
        if (leftDiff >= 0) {
            left = pos.left;
        }
        else if (rightDiff >= 0) {
            left = rightDiff;
        }
        else {
            left = rightDiff > leftDiff ? pos.left : rightDiff;
        }
    }
    return { left: left, top: top };
}
function placeRightOrLeft(pos, config) {
    var _a = getWindowBorders(), rightBorder = _a.rightBorder, bottomBorder = _a.bottomBorder;
    var left;
    var top;
    var rightDiff = rightBorder - pos.right - config.width;
    var leftDiff = pos.left - config.width;
    if (config.mode === Position.right) {
        if (rightDiff >= 0) {
            left = pos.right;
        }
        else if (leftDiff >= 0) {
            left = leftDiff;
        }
    }
    else {
        if (leftDiff >= 0) {
            left = leftDiff;
        }
        else if (rightDiff >= 0) {
            left = pos.right;
        }
    }
    if (leftDiff < 0 && rightDiff < 0) {
        if (config.auto) {
            return placeRightOrLeft(pos, __assign({}, config, { mode: Position.bottom, auto: false }));
        }
        left = leftDiff > rightDiff ? leftDiff : pos.right;
    }
    if (config.centering) {
        top = verticalCentering(pos, config.width, rightBorder);
    }
    else {
        var bottomDiff = pos.bottom - config.height;
        var topDiff = bottomBorder - pos.top - config.height;
        if (topDiff >= 0) {
            top = pos.top;
        }
        else if (bottomDiff > 0) {
            top = bottomDiff;
        }
        else {
            top = bottomDiff > topDiff ? bottomDiff : pos.top;
        }
    }
    return { left: left, top: top };
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Modifier;
(function (Modifier) {
    Modifier[Modifier["none"] = 0] = "none";
    // block mods
    Modifier["style"] = "style";
    Modifier["align"] = "align";
    Modifier["blockquote"] = "blockquote";
    // text mods
    Modifier["bold"] = "bold";
    Modifier["italic"] = "italic";
    Modifier["strike"] = "strike";
    Modifier["fontSize"] = "font-size";
    Modifier["fontFamily"] = "font-family";
    Modifier["underline"] = "underline";
    Modifier["color"] = "color";
    Modifier["background"] = "background";
    Modifier["link"] = "link";
})(Modifier = exports.Modifier || (exports.Modifier = {}));
var Action;
(function (Action) {
    Action["add"] = "add";
    Action["innerAdd"] = "innerAdd";
    Action["remove"] = "remove";
    Action["update"] = "update";
    Action["undo"] = "undo";
    Action["paste"] = "paste";
    Action["copy"] = "copy";
    Action["cut"] = "cut";
    Action["redo"] = "redo";
    Action["clear"] = "clear";
    Action["parse"] = "parse";
    Action["selectAll"] = "selectAll";
})(Action = exports.Action || (exports.Action = {}));
var RTEToolbarBlock;
(function (RTEToolbarBlock) {
    RTEToolbarBlock["default"] = "default";
    RTEToolbarBlock["undo"] = "undo";
    RTEToolbarBlock["style"] = "style";
    RTEToolbarBlock["decoration"] = "decoration";
    RTEToolbarBlock["color"] = "colors";
    RTEToolbarBlock["align"] = "align";
    RTEToolbarBlock["link"] = "link";
    RTEToolbarBlock["clear"] = "clear";
    RTEToolbarBlock["fullscreen"] = "fullscreen";
    RTEToolbarBlock["stats"] = "stats";
})(RTEToolbarBlock = exports.RTEToolbarBlock || (exports.RTEToolbarBlock = {}));
var RichTextEvents;
(function (RichTextEvents) {
    RichTextEvents["change"] = "change";
    RichTextEvents["action"] = "action";
    RichTextEvents["selectionChange"] = "selectionchange";
    RichTextEvents["selectionRefresh"] = "selectionrefresh";
    RichTextEvents["showLinkEditor"] = "showlinkeditor";
    RichTextEvents["compositionStart"] = "compositionstart";
    RichTextEvents["compositionUpdate"] = "compositionupdate";
    RichTextEvents["compositionEnd"] = "compositionend";
})(RichTextEvents = exports.RichTextEvents || (exports.RichTextEvents = {}));


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var counter = (new Date()).valueOf();
function uid() {
    return "u" + (counter++);
}
exports.uid = uid;
function extend(target, source, deep) {
    if (deep === void 0) { deep = true; }
    if (source) {
        for (var key in source) {
            var sobj = source[key];
            var tobj = target[key];
            if (deep && typeof tobj === "object" && !(tobj instanceof Date) && !(tobj instanceof Array)) {
                extend(tobj, sobj);
            }
            else {
                target[key] = sobj;
            }
        }
    }
    return target;
}
exports.extend = extend;
function copy(source) {
    var result = {};
    for (var key in source) {
        result[key] = source[key];
    }
    return result;
}
exports.copy = copy;
function naturalSort(arr) {
    return arr.sort(function (a, b) {
        var nn = typeof a === "string" ? a.localeCompare(b) : a - b;
        return nn;
    });
}
exports.naturalSort = naturalSort;
function findIndex(arr, predicate) {
    var len = arr.length;
    for (var i = 0; i < len; i++) {
        if (predicate(arr[i])) {
            return i;
        }
    }
    return -1;
}
exports.findIndex = findIndex;
function isEqualString(from, to) {
    if (from.length > to.length) {
        return false;
    }
    for (var i = 0; i < from.length; i++) {
        if (from[i].toLowerCase() !== to[i].toLowerCase()) {
            return false;
        }
    }
    return true;
}
exports.isEqualString = isEqualString;
function singleOuterClick(fn) {
    var click = function (e) {
        if (fn(e)) {
            document.removeEventListener("click", click);
        }
    };
    document.addEventListener("click", click);
}
exports.singleOuterClick = singleOuterClick;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function getTextHash(blockIndex, textIndex) {
    return blockIndex + "_" + textIndex;
}
exports.getTextHash = getTextHash;
function getLinkRefer() {
    var index = 0;
    return function () { return "link_ref_" + index++; };
}
exports.getLinkRefer = getLinkRefer;
function hashToInfo(hash) {
    if (hash === void 0) { hash = ""; }
    if (!hash) {
        return [];
    }
    return hash.split("_").map(function (val) { return parseInt(val, 10); });
}
exports.hashToInfo = hashToInfo;
function actionIdToModifierValue(id) {
    return id.split("-").pop();
}
exports.actionIdToModifierValue = actionIdToModifierValue;
function textColor(color) {
    return "<span class=\"dxi dhx_button__icon dxi-format-color-text dhx_richtext__text-color\" style=\"border-color: " + color + ";\"></span>";
}
exports.textColor = textColor;
function textSelectColor(color) {
    return "<span class=\"dxi dhx_button__icon dxi-format-color-fill dhx_richtext__background-color\" style=\"border-color: " + color + ";\"></span>";
}
exports.textSelectColor = textSelectColor;
function isObject(target) {
    return target !== null && typeof target === "object" && !(target instanceof Date);
}
function isEqual(source, target, deep) {
    if (deep === void 0) { deep = false; }
    var sourceKeys = Object.keys(source);
    var targetKeys = Object.keys(target);
    if (sourceKeys.length !== targetKeys.length) {
        return false;
    }
    for (var _i = 0, sourceKeys_1 = sourceKeys; _i < sourceKeys_1.length; _i++) {
        var prop = sourceKeys_1[_i];
        if (deep && isObject(source[prop]) && isObject(target[prop])) {
            if (!isEqual(source[prop], target[prop], deep)) {
                return false;
            }
        }
        else if (source[prop] !== target[prop]) {
            return false;
        }
    }
    return true;
}
exports.isEqual = isEqual;
function copyWithout(obj, forbidden) {
    var target = {};
    for (var key in obj) {
        if (!forbidden.hasOwnProperty(key)) {
            target[key] = obj[key];
        }
    }
    return target;
}
exports.copyWithout = copyWithout;
function startsWith(str, pattern) {
    if (str.length < pattern.length) {
        return false;
    }
    for (var i = 0; i < pattern.length; i++) {
        if (str[i] !== pattern[i]) {
            return false;
        }
    }
    return true;
}
exports.startsWith = startsWith;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _a;
var ts_toolbar_1 = __webpack_require__(21);
var other_1 = __webpack_require__(4);
var en_1 = __webpack_require__(11);
var types_1 = __webpack_require__(2);
function getToolbarData(toolbarBlocks, defaultStyle) {
    var _a;
    var blocks = (_a = {},
        _a[types_1.RTEToolbarBlock.undo] = [
            {
                id: "undo",
                tooltip: en_1.default.undo,
                type: ts_toolbar_1.ItemType.button,
                icon: "dxi-undo",
                multiClick: true,
                $disabled: true
            },
            {
                id: "redo",
                tooltip: en_1.default.redo,
                type: ts_toolbar_1.ItemType.button,
                icon: "dxi-redo",
                multiClick: true,
                $disabled: true
            }
        ],
        _a[types_1.RTEToolbarBlock.style] = [
            {
                id: types_1.Modifier.fontFamily,
                value: defaultStyle[types_1.Modifier.fontFamily],
                tooltip: en_1.default.selectFontFamily,
                css: "dhx_richtext__dropdown dhx_richtext__dropdown--force_max-width dhx_richtext__dropdown--mw_50",
                type: ts_toolbar_1.ItemType.button,
                items: createToolbarFonts()
            },
            {
                id: types_1.Modifier.fontSize,
                value: defaultStyle[types_1.Modifier.fontSize],
                tooltip: en_1.default.selectFontSize,
                css: "dhx_richtext__dropdown dhx_richtext__dropdown--force_max-width dhx_richtext__dropdown--mw_35",
                type: ts_toolbar_1.ItemType.button,
                items: createToolbarFontSizes()
            },
            {
                id: types_1.Modifier.style,
                tooltip: en_1.default.selectFormat,
                value: en_1.default[defaultStyle[types_1.Modifier.style]],
                css: "dhx_richtext__dropdown dhx_richtext__dropdown--force_max-width dhx_richtext__dropdown--mw_75",
                type: ts_toolbar_1.ItemType.button,
                items: [
                    {
                        id: "style-p",
                        value: en_1.default.p
                    },
                    {
                        id: "style-h1",
                        css: "dhx_richtext__menu-text--h1",
                        value: en_1.default.h1
                    },
                    {
                        id: "style-h2",
                        css: "dhx_richtext__menu-text--h2",
                        value: en_1.default.h2
                    },
                    {
                        id: "style-h3",
                        css: "dhx_richtext__menu-text--h3",
                        value: en_1.default.h3
                    },
                    {
                        id: "style-h4",
                        css: "dhx_richtext__menu-text--h4",
                        value: en_1.default.h4
                    },
                    {
                        id: "style-h5",
                        css: "dhx_richtext__menu-text--h5",
                        value: en_1.default.h5
                    },
                    {
                        id: "style-h6",
                        css: "dhx_richtext__menu-text--h6",
                        value: en_1.default.h6
                    }
                ]
            },
            {
                id: types_1.Modifier.blockquote,
                tooltip: en_1.default.blockquote,
                active: defaultStyle[types_1.Modifier.blockquote],
                type: ts_toolbar_1.ItemType.button,
                icon: "dxi-format-quote-open"
            }
        ],
        _a[types_1.RTEToolbarBlock.color] = [
            {
                id: types_1.Modifier.color,
                tooltip: en_1.default.selectTextColor,
                type: ts_toolbar_1.ItemType.customHTMLButton,
                css: "dhx_toolbar__button dhx_toolbar-button dhx_toolbar-button--icon ",
                html: other_1.textColor(defaultStyle[types_1.Modifier.color])
            },
            {
                id: types_1.Modifier.background,
                tooltip: en_1.default.selectTextBackground,
                type: ts_toolbar_1.ItemType.customHTMLButton,
                css: "dhx_toolbar__button dhx_toolbar-button dhx_toolbar-button--icon ",
                html: other_1.textSelectColor(defaultStyle[types_1.Modifier.background]),
            }
        ],
        _a[types_1.RTEToolbarBlock.decoration] = [
            {
                id: types_1.Modifier.bold,
                tooltip: en_1.default.markBold,
                icon: "dxi-format-bold",
                type: ts_toolbar_1.ItemType.button,
                hotkey: "ctrl+b",
                active: defaultStyle[types_1.Modifier.bold]
            },
            {
                id: types_1.Modifier.italic,
                tooltip: en_1.default.markItalic,
                icon: "dxi-format-italic",
                type: ts_toolbar_1.ItemType.button,
                hotkey: "ctrl+i",
                active: defaultStyle[types_1.Modifier.italic]
            },
            {
                id: types_1.Modifier.strike,
                tooltip: en_1.default.markStrike,
                icon: "dxi-format-strikethrough",
                type: ts_toolbar_1.ItemType.button,
                active: defaultStyle[types_1.Modifier.strike]
            },
            {
                id: types_1.Modifier.underline,
                tooltip: en_1.default.markUnderline,
                icon: "dxi-format-underline",
                type: ts_toolbar_1.ItemType.button,
                hotkey: "ctrl+u",
                active: defaultStyle[types_1.Modifier.underline]
            }
        ],
        _a[types_1.RTEToolbarBlock.align] = [
            {
                id: "align-left",
                tooltip: en_1.default.alignLeft,
                type: ts_toolbar_1.ItemType.button,
                icon: "dxi-format-align-left",
                active: defaultStyle[types_1.Modifier.align] === "left"
            },
            {
                id: "align-center",
                tooltip: en_1.default.alignCenter,
                type: ts_toolbar_1.ItemType.button,
                icon: "dxi-format-align-center",
                active: defaultStyle[types_1.Modifier.align] === "center"
            },
            {
                id: "align-right",
                tooltip: en_1.default.alignRight,
                type: ts_toolbar_1.ItemType.button,
                icon: "dxi-format-align-right",
                active: defaultStyle[types_1.Modifier.align] === "right"
            }
        ],
        _a[types_1.RTEToolbarBlock.link] = [
            {
                id: types_1.Modifier.link,
                tooltip: en_1.default.addLink,
                type: ts_toolbar_1.ItemType.button,
                icon: "dxi-link-variant"
            }
        ],
        _a[types_1.RTEToolbarBlock.clear] = [
            {
                id: "clear-style",
                tooltip: en_1.default.clearFormat,
                type: ts_toolbar_1.ItemType.button,
                icon: "dxi-eraser"
            }
        ],
        _a[types_1.RTEToolbarBlock.stats] = [
            {
                id: "stats",
                tooltip: en_1.default.stats,
                type: ts_toolbar_1.ItemType.button,
                icon: "dxi-information-outline"
            }
        ],
        _a[types_1.RTEToolbarBlock.fullscreen] = [
            {
                id: "fullscreen",
                $fullscreen: false,
                tooltip: en_1.default.fullscreen,
                type: ts_toolbar_1.ItemType.button,
                icon: "dxi-arrow-expand"
            }
        ],
        _a);
    var result = toolbarBlocks.reduce(function (config, block, i) {
        config.push.apply(config, blocks[block]);
        if (i !== toolbarBlocks.length - 1) {
            config.push({ type: ts_toolbar_1.ItemType.separator });
        }
        return config;
    }, []);
    return result;
}
exports.getToolbarData = getToolbarData;
function createToolbarFontSizes() {
    var res = [];
    for (var fontSize in exports.fontSizes) {
        var value = parseInt(fontSize, 10);
        res.push({
            id: "font-size-" + value,
            value: fontSize
        });
    }
    return res;
}
function createToolbarFonts() {
    var res = [];
    for (var font in exports.fonts) {
        res.push({
            id: "font-" + font,
            value: font
        });
    }
    return res;
}
exports.fonts = {
    "Roboto": true,
    "Arial": true,
    "Georgia": true,
    "Tahoma": true,
    "Times New Roman": true,
    "Verdana": true
};
exports.fontSizes = {
    "12px": true,
    "14px": true,
    "16px": true,
    "18px": true,
    "20px": true,
    "24px": true,
    "28px": true,
    "32px": true,
    "36px": true
};
exports.emptyStyle = {};
exports.defaultBlocks = [
    types_1.RTEToolbarBlock.undo,
    types_1.RTEToolbarBlock.style,
    types_1.RTEToolbarBlock.decoration,
    types_1.RTEToolbarBlock.color,
    types_1.RTEToolbarBlock.align,
    types_1.RTEToolbarBlock.link
];
exports.defaultFontSizeByBlock = {
    p: "14px",
    h1: "36px",
    h2: "32px",
    h3: "28px",
    h4: "24px",
    h5: "20px",
    h6: "16px"
};
exports.defaultDiffrentStyle = (_a = {},
    _a[types_1.Modifier.fontSize] = "",
    _a[types_1.Modifier.fontFamily] = "",
    _a[types_1.Modifier.style] = "",
    _a[types_1.Modifier.bold] = false,
    _a[types_1.Modifier.underline] = false,
    _a[types_1.Modifier.bold] = false,
    _a[types_1.Modifier.italic] = false,
    _a[types_1.Modifier.strike] = false,
    _a[types_1.Modifier.color] = "#4c4c4c",
    _a[types_1.Modifier.background] = "#FFFFFF",
    _a[types_1.Modifier.align] = false,
    _a);


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(0);
function getCss(item) {
    var className = "";
    if (item.active) {
        className += " dhx_toolbar-button--active";
    }
    if (item.css) {
        if (Array.isArray(item.css)) {
            className += item.css.join(" ");
        }
        else {
            className += " " + item.css;
        }
    }
    return className;
}
exports.getCss = getCss;
function getIconButtonClass(item) {
    var className = !item.value && item.icon && "dhx_toolbar-button--icon " || "";
    return className;
}
exports.getIconButtonClass = getIconButtonClass;
function counter(item) {
    if (item.count) {
        return dom_1.el(".dhx_toolbar-counter", parseInt(item.count, 10) > 99 ? "99+" : item.count);
    }
}
exports.counter = counter;
function icon(iconName, type) {
    if (iconName === void 0) { iconName = ""; }
    if (iconName.slice(0, 3) === "dxi") {
        iconName = "dxi " + iconName;
    }
    return dom_1.el("span", {
        class: "dhx_" + type + "__icon " + iconName
    });
}
exports.icon = icon;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EventSystem = /** @class */ (function () {
    function EventSystem(context) {
        this.events = {};
        this.context = context || this;
    }
    EventSystem.prototype.on = function (name, callback, context) {
        var event = name.toLowerCase();
        this.events[event] = this.events[event] || [];
        this.events[event].push({ callback: callback, context: context || this.context });
    };
    EventSystem.prototype.detach = function (name, context) {
        var event = name.toLowerCase();
        var eStack = this.events[event];
        if (context) {
            for (var i = eStack.length - 1; i >= 0; i--) {
                if (eStack[i].context === context) {
                    eStack.splice(i, 1);
                }
            }
        }
        else {
            this.events[event] = [];
        }
    };
    EventSystem.prototype.fire = function (name, args) {
        if (typeof args === "undefined") {
            args = [];
        }
        var event = name.toLowerCase();
        if (this.events[event]) {
            var res = this.events[event].map(function (e) { return e.callback.apply(e.context, args); });
            return res.indexOf(false) < 0;
        }
        return true;
    };
    return EventSystem;
}());
exports.EventSystem = EventSystem;
function EventsMixin(obj) {
    obj = obj || {};
    var eventSystem = new EventSystem(obj);
    obj.detachEvent = eventSystem.detach.bind(eventSystem);
    obj.attachEvent = eventSystem.on.bind(eventSystem);
    obj.callEvent = eventSystem.fire.bind(eventSystem);
}
exports.EventsMixin = EventsMixin;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(3);
var html_1 = __webpack_require__(1);
var View = /** @class */ (function () {
    function View(_container, config) {
        this._uid = core_1.uid();
        this.config = config || {};
    }
    View.prototype.mount = function (container, vnode) {
        if (vnode) {
            this._view = vnode;
        }
        if (container && this._view && this._view.mount) {
            // init view inside of HTML container
            this._container = html_1.toNode(container);
            if (this._container.tagName) {
                this._view.mount(this._container);
            }
            else if (this._container.attach) {
                this._container.attach(this);
            }
        }
    };
    View.prototype.getRootView = function () {
        return this._view;
    };
    View.prototype.paint = function () {
        if (this._view && ( // was mounted
        this._view.node || // already rendered node
            this._container)) { // not rendered, but has container
            this._doNotRepaint = false;
            this._view.redraw();
        }
    };
    return View;
}());
exports.View = View;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = __webpack_require__(12);
exports.DataEvents = types_1.DataEvents;
exports.DragBehaviour = types_1.DragBehaviour;
exports.DragMode = types_1.DragMode;
var TreeFilterType;
(function (TreeFilterType) {
    TreeFilterType[TreeFilterType["all"] = 1] = "all";
    TreeFilterType[TreeFilterType["specific"] = 2] = "specific";
    TreeFilterType[TreeFilterType["leafs"] = 3] = "leafs";
})(TreeFilterType = exports.TreeFilterType || (exports.TreeFilterType = {}));


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dataproxy_1 = __webpack_require__(15);
var CsvDriver_1 = __webpack_require__(24);
var JsonDriver_1 = __webpack_require__(25);
function isEqualObj(a, b) {
    for (var key in a) {
        if (a[key] !== b[key]) {
            return false;
        }
    }
    return true;
}
exports.isEqualObj = isEqualObj;
function naturalCompare(a, b) {
    var ax = [];
    var bx = [];
    a.replace(/(\d+)|(\D+)/g, function (_, $1, $2) { ax.push([$1 || Infinity, $2 || ""]); });
    b.replace(/(\d+)|(\D+)/g, function (_, $1, $2) { bx.push([$1 || Infinity, $2 || ""]); });
    while (ax.length && bx.length) {
        var an = ax.shift();
        var bn = bx.shift();
        var nn = (an[0] - bn[0]) || an[1].localeCompare(bn[1]);
        if (nn) {
            return nn;
        }
    }
    return ax.length - bx.length;
}
exports.naturalCompare = naturalCompare;
function findByConf(item, conf) {
    if (typeof conf === "function") {
        if (conf.call(this, item)) {
            return item;
        }
    }
    else if (conf.by && conf.match) {
        if (item[conf.by] === conf.match) {
            return item;
        }
    }
}
exports.findByConf = findByConf;
function isDebug() {
    var dhx = window.dhx;
    if (typeof dhx !== "undefined") {
        return typeof (dhx.debug) !== "undefined" && dhx.debug;
    }
    // return typeof DHX_DEBUG_MODE !== "undefined" && DHX_DEBUG_MODE;
}
exports.isDebug = isDebug;
function dhxWarning(msg) {
    // tslint:disable-next-line:no-console
    console.warn(msg);
}
exports.dhxWarning = dhxWarning;
function dhxError(msg) {
    throw new Error(msg);
}
exports.dhxError = dhxError;
function toProxy(proxy) {
    var type = typeof proxy;
    if (type === "string") {
        return new dataproxy_1.DataProxy(proxy);
    }
    else if (type === "object") {
        return proxy;
    }
}
exports.toProxy = toProxy;
function toDataDriver(driver) {
    var type = typeof driver;
    if (type === "string") {
        switch (driver) {
            case "csv":
                return new CsvDriver_1.CsvDriver();
            case "json":
                return new JsonDriver_1.JsonDriver();
            default:
                // tslint:disable-next-line:no-console
                console.warn("incorrect driver type", driver);
                break;
        }
    }
    else if (typeof driver === "object") {
        return driver;
    }
}
exports.toDataDriver = toDataDriver;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var locale = {
    apply: "Apply",
    undo: "Undo",
    redo: "Redo",
    selectFontFamily: "Font",
    selectFontSize: "Font size",
    selectFormat: "Style",
    selectTextColor: "Text color",
    selectTextBackground: "Background color",
    markBold: "Bold",
    markItalic: "Italic",
    markStrike: "Strike",
    markUnderline: "Underline",
    alignLeft: "Align left",
    alignCenter: "Align center",
    alignRight: "Align right",
    addLink: "Add link",
    clearFormat: "Clear formatting",
    fullscreen: "Fullscreen",
    stats: "Statistics",
    removeLink: "Remove link",
    edit: "Edit",
    h1: "Heading 1",
    h2: "Heading 2",
    h3: "Heading 3",
    h4: "Heading 4",
    h5: "Heading 5",
    h6: "Heading 6",
    p: "Normal text",
    blockquote: "Block quote",
    chars: "chars",
    charsExlSpace: "Characters without spaces",
    words: "words",
};
exports.default = locale;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DataEvents;
(function (DataEvents) {
    DataEvents["afterAdd"] = "afteradd";
    DataEvents["beforeAdd"] = "beforeadd";
    DataEvents["removeAll"] = "removeall";
    DataEvents["beforeRemove"] = "beforeremove";
    DataEvents["afterRemove"] = "afterremove";
    DataEvents["change"] = "change";
    DataEvents["load"] = "load";
})(DataEvents = exports.DataEvents || (exports.DataEvents = {}));
var DragEvents;
(function (DragEvents) {
    DragEvents["beforeDrag"] = "beforedrag";
    DragEvents["beforeDrop"] = "beforeDrop";
    DragEvents["dragStart"] = "dragstart";
    DragEvents["dragEnd"] = "dragend";
    DragEvents["canDrop"] = "candrop";
    DragEvents["cancelDrop"] = "canceldrop";
    DragEvents["dropComplete"] = "dropcomplete";
    DragEvents["dragOut"] = "dragOut";
    DragEvents["dragIn"] = "dragIn";
})(DragEvents = exports.DragEvents || (exports.DragEvents = {}));
var DragMode;
(function (DragMode) {
    DragMode["target"] = "target";
    DragMode["both"] = "both";
    DragMode["source"] = "source";
})(DragMode = exports.DragMode || (exports.DragMode = {}));
var DragBehaviour;
(function (DragBehaviour) {
    DragBehaviour["child"] = "child";
    DragBehaviour["sibling"] = "sibling";
    DragBehaviour["complex"] = "complex";
})(DragBehaviour = exports.DragBehaviour || (exports.DragBehaviour = {}));
var SelectionEvents;
(function (SelectionEvents) {
    SelectionEvents["beforeUnSelect"] = "beforeunselect";
    SelectionEvents["afterUnSelect"] = "afterunselect";
    SelectionEvents["beforeSelect"] = "beforeselect";
    SelectionEvents["afterSelect"] = "afterselect";
})(SelectionEvents = exports.SelectionEvents || (exports.SelectionEvents = {}));


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, setImmediate) {(function () {
  global = this

  var queueId = 1
  var queue = {}
  var isRunningTask = false

  if (!global.setImmediate)
    global.addEventListener('message', function (e) {
      if (e.source == global){
        if (isRunningTask)
          nextTick(queue[e.data])
        else {
          isRunningTask = true
          try {
            queue[e.data]()
          } catch (e) {}

          delete queue[e.data]
          isRunningTask = false
        }
      }
    })

  function nextTick(fn) {
    if (global.setImmediate) setImmediate(fn)
    // if inside of web worker
    else if (global.importScripts) setTimeout(fn)
    else {
      queueId++
      queue[queueId] = fn
      global.postMessage(queueId, '*')
    }
  }

  Deferred.resolve = function (value) {
    if (!(this._d == 1))
      throw TypeError()

    if (value instanceof Deferred)
      return value

    return new Deferred(function (resolve) {
        resolve(value)
    })
  }

  Deferred.reject = function (value) {
    if (!(this._d == 1))
      throw TypeError()

    return new Deferred(function (resolve, reject) {
        reject(value)
    })
  }

  Deferred.all = function (arr) {
    if (!(this._d == 1))
      throw TypeError()

    if (!(arr instanceof Array))
      return Deferred.reject(TypeError())

    var d = new Deferred()

    function done(e, v) {
      if (v)
        return d.resolve(v)

      if (e)
        return d.reject(e)

      var unresolved = arr.reduce(function (cnt, v) {
        if (v && v.then)
          return cnt + 1
        return cnt
      }, 0)

      if(unresolved == 0)
        d.resolve(arr)

      arr.map(function (v, i) {
        if (v && v.then)
          v.then(function (r) {
            arr[i] = r
            done()
            return r
          }, done)
      })
    }

    done()

    return d
  }

  Deferred.race = function (arr) {
    if (!(this._d == 1))
      throw TypeError()

    if (!(arr instanceof Array))
      return Deferred.reject(TypeError())

    if (arr.length == 0)
      return new Deferred()

    var d = new Deferred()

    function done(e, v) {
      if (v)
        return d.resolve(v)

      if (e)
        return d.reject(e)

      var unresolved = arr.reduce(function (cnt, v) {
        if (v && v.then)
          return cnt + 1
        return cnt
      }, 0)

      if(unresolved == 0)
        d.resolve(arr)

      arr.map(function (v, i) {
        if (v && v.then)
          v.then(function (r) {
            done(null, r)
          }, done)
      })
    }

    done()

    return d
  }

  Deferred._d = 1


  /**
   * @constructor
   */
  function Deferred(resolver) {
    'use strict'
    if (typeof resolver != 'function' && resolver != undefined)
      throw TypeError()

    if (typeof this != 'object' || (this && this.then))
      throw TypeError()

    // states
    // 0: pending
    // 1: resolving
    // 2: rejecting
    // 3: resolved
    // 4: rejected
    var self = this,
      state = 0,
      val = 0,
      next = [],
      fn, er;

    self['promise'] = self

    self['resolve'] = function (v) {
      fn = self.fn
      er = self.er
      if (!state) {
        val = v
        state = 1

        nextTick(fire)
      }
      return self
    }

    self['reject'] = function (v) {
      fn = self.fn
      er = self.er
      if (!state) {
        val = v
        state = 2

        nextTick(fire)

      }
      return self
    }

    self['_d'] = 1

    self['then'] = function (_fn, _er) {
      if (!(this._d == 1))
        throw TypeError()

      var d = new Deferred()

      d.fn = _fn
      d.er = _er
      if (state == 3) {
        d.resolve(val)
      }
      else if (state == 4) {
        d.reject(val)
      }
      else {
        next.push(d)
      }

      return d
    }

    self['catch'] = function (_er) {
      return self['then'](null, _er)
    }

    var finish = function (type) {
      state = type || 4
      next.map(function (p) {
        state == 3 && p.resolve(val) || p.reject(val)
      })
    }

    try {
      if (typeof resolver == 'function')
        resolver(self['resolve'], self['reject'])
    } catch (e) {
      self['reject'](e)
    }

    return self

    // ref : reference to 'then' function
    // cb, ec, cn : successCallback, failureCallback, notThennableCallback
    function thennable (ref, cb, ec, cn) {
      // Promises can be rejected with other promises, which should pass through
      if (state == 2) {
        return cn()
      }
      if ((typeof val == 'object' || typeof val == 'function') && typeof ref == 'function') {
        try {

          // cnt protects against abuse calls from spec checker
          var cnt = 0
          ref.call(val, function (v) {
            if (cnt++) return
            val = v
            cb()
          }, function (v) {
            if (cnt++) return
            val = v
            ec()
          })
        } catch (e) {
          val = e
          ec()
        }
      } else {
        cn()
      }
    };

    function fire() {

      // check if it's a thenable
      var ref;
      try {
        ref = val && val.then
      } catch (e) {
        val = e
        state = 2
        return fire()
      }

      thennable(ref, function () {
        state = 1
        fire()
      }, function () {
        state = 2
        fire()
      }, function () {
        try {
          if (state == 1 && typeof fn == 'function') {
            val = fn(val)
          }

          else if (state == 2 && typeof er == 'function') {
            val = er(val)
            state = 1
          }
        } catch (e) {
          val = e
          return finish()
        }

        if (val == self) {
          val = TypeError()
          finish()
        } else thennable(ref, function () {
            finish(3)
          }, finish, function () {
            finish(state == 1 && 3)
          })

      })
    }


  }

  // Export our library object, either for node.js or as a globally scoped variable
  if (true) {
    module['exports'] = Deferred
  } else {}
})()

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(14), __webpack_require__(49).setImmediate))

/***/ }),
/* 14 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Promise) {
Object.defineProperty(exports, "__esModule", { value: true });
var DataProxy = /** @class */ (function () {
    function DataProxy(url) {
        this.url = url;
    }
    DataProxy.prototype.load = function () {
        return this._ajax(this.url);
    };
    DataProxy.prototype.save = function (data, mode) {
        var modes = {
            insert: "POST",
            delete: "DELETE",
            update: "POST"
        };
        return this._ajax(this.url, data, modes[mode] || "POST");
    };
    DataProxy.prototype._ajax = function (url, data, method) {
        if (method === void 0) { method = "GET"; }
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr.response || xhr.responseText);
                }
                else {
                    reject({
                        status: xhr.status,
                        statusText: xhr.statusText
                    });
                }
            };
            xhr.onerror = function () {
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                });
            };
            xhr.open(method, url);
            xhr.setRequestHeader("Content-Type", "application/json");
            switch (method) {
                case "POST":
                case "DELETE":
                case "PUT":
                    xhr.send(JSON.stringify(data));
                    break;
                case "GET":
                    xhr.send();
                    break;
                default:
                    xhr.send();
                    break;
            }
        });
    };
    return DataProxy;
}());
exports.DataProxy = DataProxy;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(13)))

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = __webpack_require__(12);
exports.DataEvents = types_1.DataEvents;
var ItemType;
(function (ItemType) {
    ItemType["button"] = "button";
    ItemType["dhxButton"] = "dhxButton";
    ItemType["imageButton"] = "imageButton";
    ItemType["selectButton"] = "selectButton";
    ItemType["input"] = "input";
    ItemType["separator"] = "separator";
    ItemType["text"] = "text";
    ItemType["spacer"] = "spacer";
    ItemType["menuItem"] = "menuItem";
    ItemType["block"] = "block";
    ItemType["customHTMLButton"] = "customButton";
})(ItemType = exports.ItemType || (exports.ItemType = {}));
var NavigationBarEvents;
(function (NavigationBarEvents) {
    NavigationBarEvents["inputCreated"] = "inputcreated";
    NavigationBarEvents["click"] = "click";
    NavigationBarEvents["openMenu"] = "openmenu";
})(NavigationBarEvents = exports.NavigationBarEvents || (exports.NavigationBarEvents = {}));
var NavigationType;
(function (NavigationType) {
    NavigationType["pointer"] = "pointer";
    NavigationType["click"] = "click";
})(NavigationType = exports.NavigationType || (exports.NavigationType = {}));


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(3);
var dom_1 = __webpack_require__(0);
var events_1 = __webpack_require__(7);
var html_1 = __webpack_require__(1);
var Keymanager_1 = __webpack_require__(46);
var view_1 = __webpack_require__(8);
var ts_data_1 = __webpack_require__(47);
var itemfactory_1 = __webpack_require__(27);
var types_1 = __webpack_require__(16);
var MenuBase = /** @class */ (function (_super) {
    __extends(MenuBase, _super);
    function MenuBase(element, config) {
        var _this = _super.call(this, element, core_1.extend({}, config)) || this;
        _this._isContextMenu = false;
        _this._documentHaveListener = false;
        _this._rootItem = {};
        _this.events = new events_1.EventSystem();
        _this.data = new ts_data_1.TreeCollection({}, _this.events);
        _this._documentClick = function (e) {
            if (html_1.locate(e, "dhx_widget_id") !== _this._uid && _this._documentHaveListener) {
                document.removeEventListener("click", _this._documentClick);
                _this._documentHaveListener = false;
                _this._close();
            }
        };
        _this._currentRoot = _this.data.getRoot();
        _this._factory = itemfactory_1.createFactory(types_1.ItemType.menuItem);
        _this._init();
        _this._initHandlers();
        _this._initEvents();
        return _this;
    }
    MenuBase.prototype.paint = function () {
        _super.prototype.paint.call(this);
        this._vpopups.redraw();
    };
    MenuBase.prototype.disable = function (ids) {
        this._setProp(ids, "$disabled", true);
    };
    MenuBase.prototype.enable = function (ids) {
        this._setProp(ids, "$disabled", false);
    };
    MenuBase.prototype.show = function (ids) {
        this._setProp(ids, "$hidden", false);
    };
    MenuBase.prototype.hide = function (ids) {
        this._setProp(ids, "$hidden", true);
    };
    MenuBase.prototype.destructor = function () {
        Keymanager_1.keyManager.removeHotKey(null, this);
    };
    MenuBase.prototype._close = function () {
        if (this.config.navigationType === types_1.NavigationType.click) {
            this._isActive = false;
        }
        clearTimeout(this._currentTimeout);
        this._activeMenu = null;
        this.paint();
    };
    MenuBase.prototype._init = function () {
        var _this = this;
        var render = function () { return dom_1.el("div", __assign({ dhx_widget_id: _this._uid, class: "menu-popups" + (_this._isContextMenu ? " context-menu" : "") }, _this._handlers), _this._drawPopups()); };
        this._vpopups = dom_1.create({
            render: render
        });
        this._vpopups.mount(document.body);
    };
    MenuBase.prototype._initHandlers = function () {
        var _this = this;
        /*
            for navigation type click:
            first click open menu, _isActive = true
            after navigation use mousemove
            can be closed after outer click or menu leaf item click
        */
        this._isActive = this.config.navigationType !== types_1.NavigationType.click;
        this._handlers = {
            onmousemove: function (e) {
                if (!_this._isActive) {
                    return;
                }
                var elem = html_1.locateNode(e);
                if (!elem) {
                    _this._activeItemChange(null);
                    return;
                }
                var id = elem.getAttribute("dhx_id");
                if (_this._activeMenu !== id) {
                    _this._activeMenu = id;
                    if (_this.data.haveItems(id)) {
                        var position = html_1.getRealPosition(elem);
                        _this.data.update(id, { $position: position }, false);
                    }
                    _this._activeItemChange(id);
                }
            },
            onmouseleave: function () {
                if (_this.config.navigationType !== types_1.NavigationType.click) { // maybe all time when mouse leave close menu
                    _this._activeItemChange(null);
                }
            },
            onclick: function (e) {
                var element = html_1.locateNode(e);
                if (!element) {
                    return;
                }
                var id = element.getAttribute("dhx_id");
                var item = _this.data.getItem(id);
                if (item.multiClick) {
                    return;
                }
                if (_this.data.haveItems(id)) {
                    if (id === _this._currentRoot) {
                        _this._close();
                        return;
                    }
                    if (!_this._isActive) {
                        _this._isActive = true;
                    }
                    _this._setRoot(id);
                    _this._activeMenu = id;
                    var position = html_1.getRealPosition(element);
                    _this.data.update(id, { $position: position }, false);
                    _this._activeItemChange(id);
                }
                else {
                    switch (item.type) {
                        case types_1.ItemType.input:
                        case types_1.ItemType.text:
                            break;
                        case types_1.ItemType.menuItem:
                        case types_1.ItemType.selectButton:
                            _this._onMenuItemClick(id, e);
                            break;
                        case types_1.ItemType.imageButton:
                        case types_1.ItemType.dhxButton:
                        case types_1.ItemType.button:
                        case types_1.ItemType.customHTMLButton:
                            if (item.twoState) {
                                _this.data.update(item.id, { active: !item.active });
                            }
                            _this.events.fire(types_1.NavigationBarEvents.click, [id, e]);
                        // missed break for trigger close
                        default:
                            _this._close();
                    }
                }
            },
            onmousedown: function (e) {
                var element = html_1.locateNode(e);
                if (!element) {
                    return;
                }
                var id = element.getAttribute("dhx_id");
                var item = _this.data.getItem(id);
                if (!item.multiClick) {
                    return;
                }
                var fireTime = 365;
                var timeout;
                var fireAction = function () {
                    _this.events.fire(types_1.NavigationBarEvents.click, [id, e]);
                    if (fireTime > 50) {
                        fireTime -= 55;
                    }
                    timeout = setTimeout(fireAction, fireTime);
                };
                var mouseup = function () {
                    clearTimeout(timeout);
                    document.removeEventListener("mouseup", mouseup);
                };
                fireAction();
                document.addEventListener("mouseup", mouseup);
            }
        };
    };
    MenuBase.prototype._initEvents = function () {
        var _this = this;
        var timeout = null;
        this.data.events.on(types_1.DataEvents.change, function () {
            _this.paint();
            if (timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(function () {
                _this._normalizeData();
                _this._resetHotkeys();
                timeout = null;
                _this.paint();
            }, 100);
        });
        this.events.on(types_1.NavigationBarEvents.click, function (id) {
            var item = _this.data.getItem(id);
            var parent = _this.data.getItem(item.parent);
            if (parent && parent.type === types_1.ItemType.selectButton) {
                _this.data.update(item.parent, { value: item.value, icon: item.icon });
            }
            if (item.group) {
                var group = _this._groups[item.group];
                if (group.active) {
                    _this.data.update(group.active, { active: false });
                }
                group.active = item.id;
                _this.data.update(item.id, { active: true });
            }
        });
    };
    MenuBase.prototype._drawPopups = function () {
        var _this = this;
        var id = this._activeMenu;
        if (!this._isContextMenu && !id) {
            return null;
        }
        var root = this._currentRoot;
        if (this._isContextMenu && !this._activePosition) {
            return null;
        }
        var parentIds = this._getParents(id, root);
        return parentIds.map(function (itemId) {
            if (!_this.data.haveItems(itemId)) {
                return null;
            }
            var item = _this.data.getItem(itemId) || _this._rootItem; // for root item
            return dom_1.el("ul", {
                class: "dhx_menu",
                _key: itemId,
                _hooks: {
                    didInsert: function (vnode) {
                        var _a = vnode.el.getBoundingClientRect(), width = _a.width, height = _a.height;
                        var position = _this._isContextMenu && _this._activePosition && itemId === root ? _this._activePosition : item.$position;
                        var mode = _this._getMode(item, root, position === _this._activePosition);
                        var style = html_1.calculatePosition(position, { mode: mode, width: width, height: height });
                        item.$style = style;
                        vnode.patch({ style: style });
                    }
                },
                tabindex: 0,
                style: item.$style || {
                    position: "absolute"
                }
            }, _this._drawMenuItems(itemId));
        }).reverse();
    };
    MenuBase.prototype._onMenuItemClick = function (id, e) {
        var item = this.data.getItem(id);
        if (item.$disabled) {
            return;
        }
        if (item.twoState) {
            this.data.update(item.id, { active: !item.active });
        }
        this.events.fire(types_1.NavigationBarEvents.click, [id, e]);
        this._close();
    };
    MenuBase.prototype._activeItemChange = function (id) {
        var _this = this;
        if (id && !this._documentHaveListener) {
            this._listenOuterClick();
        }
        if (id && this.data.haveItems(id)) {
            this.events.fire(types_1.NavigationBarEvents.openMenu);
            this._activeMenu = id;
            clearTimeout(this._currentTimeout);
            this.paint();
        }
        else {
            this._activeMenu = id;
            clearTimeout(this._currentTimeout);
            this._currentTimeout = setTimeout(function () { return _this.paint(); }, 400);
        }
    };
    MenuBase.prototype._resetHotkeys = function () {
        var _this = this;
        Keymanager_1.keyManager.removeHotKey(null, this);
        this.data.map(function (item) {
            if (item.hotkey) {
                Keymanager_1.keyManager.addHotKey(item.hotkey, function () { return _this._onMenuItemClick(item.id, null); }, _this);
            }
        });
    };
    MenuBase.prototype._listenOuterClick = function () {
        document.addEventListener("click", this._documentClick);
        this._documentHaveListener = true;
    };
    MenuBase.prototype._getMode = function (item, root, _active) {
        if (_active === void 0) { _active = false; }
        return item.parent === root ? "bottom" : "right";
    };
    MenuBase.prototype._drawMenuItems = function (id) {
        var _this = this;
        return this.data.map(function (item) { return _this._factory(item, _this.events); }, id, false);
    };
    MenuBase.prototype._normalizeData = function () {
        var _this = this;
        var root = this.data.getRoot();
        var groups = {};
        this.data.eachChild(root, function (item) {
            if (_this.data.haveItems(item.id) && item.parent !== _this.data.getRoot()) {
                item.$openIcon = "right";
            }
            if (item.group) {
                addInGroups(groups, item);
            }
        }, true);
        this._groups = groups;
    };
    MenuBase.prototype._setRoot = function (_id) {
        return; // need only for toolbar
    };
    MenuBase.prototype._getParents = function (id, root) {
        var parentIds = [];
        var afterRoot = false;
        var currentItem = this.data.getItem(id);
        var disabled = currentItem && currentItem.$disabled;
        this.data.eachParent(id, function (item) {
            if (item.id === root) {
                parentIds.push(item.id);
                afterRoot = true;
            }
            else if (!afterRoot) {
                parentIds.push(item.id);
            }
        }, !disabled);
        if (this._isContextMenu && this._activePosition) {
            parentIds.push(root);
        }
        return parentIds;
    };
    MenuBase.prototype._setProp = function (id, key, value) {
        var _this = this;
        var _a;
        if (Array.isArray(id)) {
            id.forEach(function (itemId) {
                var _a;
                return _this.data.update(itemId, (_a = {}, _a[key] = value, _a));
            });
        }
        else {
            this.data.update(id, (_a = {}, _a[key] = value, _a));
        }
    };
    return MenuBase;
}(view_1.View));
exports.MenuBase = MenuBase;
function addInGroups(groups, item) {
    if (groups[item.group]) {
        if (item.active) {
            groups[item.group].active = item.id;
        }
        groups[item.group].elements.push(item.id);
    }
    else {
        groups[item.group] = {
            active: item.active ? item.id : null,
            elements: [item.id]
        };
    }
}


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(71));
__export(__webpack_require__(30));


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(0);
var constants_1 = __webpack_require__(5);
var types_1 = __webpack_require__(2);
function calcTextNodeStyle(modifiers) {
    var style = {};
    for (var key in modifiers) {
        if (!modifiers[key]) {
            continue;
        }
        switch (key) {
            case types_1.Modifier.bold:
                style["font-weight"] = "bold";
                break;
            case types_1.Modifier.italic:
                style["font-style"] = "italic";
                break;
            case types_1.Modifier.underline:
                if (style["text-decoration"]) {
                    style["text-decoration"] += " underline";
                }
                else {
                    style["text-decoration"] = "underline";
                }
                break;
            case types_1.Modifier.strike:
                if (style["text-decoration"]) {
                    style["text-decoration"] += " line-through";
                }
                else {
                    style["text-decoration"] = "line-through";
                }
                break;
            case types_1.Modifier.color:
                style.color = modifiers[key];
                break;
            case types_1.Modifier.background:
                style.background = modifiers[key];
                break;
            case types_1.Modifier.fontFamily:
                style["font-family"] = modifiers[key];
                break;
            case types_1.Modifier.fontSize:
                style["font-size"] = modifiers[key];
                break;
        }
    }
    return style;
}
exports.calcTextNodeStyle = calcTextNodeStyle;
function calcBlockStyle(modifiers) {
    var style = {};
    for (var key in modifiers) {
        if (!modifiers[key]) {
            continue;
        }
        switch (key) {
            case types_1.Modifier.align:
                style["text-align"] = modifiers[key];
        }
    }
    return style;
}
exports.calcBlockStyle = calcBlockStyle;
function blockStyleToTag(style) {
    if (style[types_1.Modifier.style]) {
        return style[types_1.Modifier.style];
    }
    return "p";
}
exports.blockStyleToTag = blockStyleToTag;
function blockquoteWrapper(style, blockIndex) {
    if (style[types_1.Modifier.blockquote]) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return dom_1.el("blockquote", {
                dhx_offset: blockIndex,
            }, [dom_1.el.apply(void 0, args)]);
        };
    }
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return dom_1.el.apply(void 0, args);
    };
}
exports.blockquoteWrapper = blockquoteWrapper;
function getComputedNodeStyle(textNode, block, defaultModifiers) {
    var computed = {};
    for (var key in textNode.style) {
        computed[key] = textNode.style[key];
    }
    if (!computed[types_1.Modifier.fontSize]) {
        if (block.style[types_1.Modifier.style] && block.style[types_1.Modifier.style] !== "p") {
            computed[types_1.Modifier.fontSize] = constants_1.defaultFontSizeByBlock[block.style[types_1.Modifier.style]];
        }
        else {
            computed[types_1.Modifier.fontSize] = defaultModifiers[types_1.Modifier.fontSize];
        }
    }
    if (!computed[types_1.Modifier.fontFamily]) {
        computed[types_1.Modifier.fontFamily] = defaultModifiers[types_1.Modifier.fontFamily];
    }
    return computed;
}
exports.getComputedNodeStyle = getComputedNodeStyle;
function getComputedBlockStyle(block, defaultModifiers) {
    var computed = {};
    for (var key in block.style) {
        computed[key] = block.style[key];
    }
    if (!computed[types_1.Modifier.style]) {
        computed[types_1.Modifier.style] = defaultModifiers[types_1.Modifier.style];
    }
    if (!computed[types_1.Modifier.align]) {
        computed[types_1.Modifier.align] = defaultModifiers[types_1.Modifier.align];
    }
    if (!computed[types_1.Modifier.blockquote]) {
        computed[types_1.Modifier.blockquote] = defaultModifiers[types_1.Modifier.blockquote];
    }
    return computed;
}
exports.getComputedBlockStyle = getComputedBlockStyle;
function isEmptyBlockStyle(style) {
    return !style[types_1.Modifier.blockquote] && !style[types_1.Modifier.align];
}
exports.isEmptyBlockStyle = isEmptyBlockStyle;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = __webpack_require__(5);
var RemoveTextResult;
(function (RemoveTextResult) {
    RemoveTextResult[RemoveTextResult["textIsEmpty"] = 0] = "textIsEmpty";
    RemoveTextResult[RemoveTextResult["complete"] = 1] = "complete";
    RemoveTextResult[RemoveTextResult["nullTextLength"] = 2] = "nullTextLength";
    RemoveTextResult[RemoveTextResult["forceRemovePrevious"] = 3] = "forceRemovePrevious";
    RemoveTextResult[RemoveTextResult["forceRemoveNext"] = 4] = "forceRemoveNext";
})(RemoveTextResult = exports.RemoveTextResult || (exports.RemoveTextResult = {}));
var TextNode = /** @class */ (function () {
    function TextNode(text, style) {
        this.text = text;
        this.style = style || constants_1.emptyStyle;
    }
    TextNode.prototype.isEmpty = function () {
        return this.text.length === 0;
    };
    TextNode.prototype.insert = function (data, offset) {
        this.text = this.text.slice(0, offset) + data + this.text.slice(offset);
    };
    TextNode.prototype.remove = function (offset, prev) {
        if (this.isEmpty()) {
            return RemoveTextResult.textIsEmpty;
        }
        if (offset === 0 && prev) {
            return RemoveTextResult.forceRemovePrevious;
        }
        if (offset === this.text.length && !prev) {
            return RemoveTextResult.forceRemoveNext;
        }
        if (prev) {
            this.text = this.text.slice(0, offset - 1) + this.text.slice(offset);
        }
        else {
            this.text = this.text.slice(0, offset) + this.text.slice(offset + 1);
        }
        if (this.text.length === 0) {
            return RemoveTextResult.nullTextLength;
        }
        return RemoveTextResult.complete;
    };
    return TextNode;
}());
exports.TextNode = TextNode;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(44));
var ts_menu_1 = __webpack_require__(22);
exports.ItemType = ts_menu_1.ItemType;
exports.NavigationBarEvents = ts_menu_1.NavigationBarEvents;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(45));
__export(__webpack_require__(65));
__export(__webpack_require__(17));
__export(__webpack_require__(27));
__export(__webpack_require__(16));


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = __webpack_require__(7);
var loader_1 = __webpack_require__(48);
var sort_1 = __webpack_require__(52);
var dataproxy_1 = __webpack_require__(15);
var helpers_1 = __webpack_require__(10);
var types_1 = __webpack_require__(9);
var core_1 = __webpack_require__(3);
var DataCollection = /** @class */ (function () {
    function DataCollection(config, events) {
        this.config = config || {};
        this._order = [];
        this._pull = {};
        this._changes = { order: [] };
        this._initOrder = null;
        this._sort = new sort_1.Sort();
        this._loader = new loader_1.Loader(this, this._changes);
        this.events = events || new events_1.EventSystem(this);
    }
    DataCollection.prototype.add = function (obj, index) {
        if (!this.events.fire(types_1.DataEvents.beforeAdd, [obj])) {
            return;
        }
        var id = this._addCore(obj, index);
        this._onChange("add", obj.id, obj);
        this.events.fire(types_1.DataEvents.afterAdd, [obj]);
        return id;
    };
    DataCollection.prototype.remove = function (id) {
        var obj = this._pull[id];
        if (obj) {
            if (!this.events.fire(types_1.DataEvents.beforeRemove, [obj])) {
                return;
            }
            this._removeCore(obj.id);
            this._onChange("remove", id, obj);
        }
        this.events.fire(types_1.DataEvents.afterRemove, [obj]);
    };
    DataCollection.prototype.removeAll = function () {
        this._removeAll();
        this.events.fire(types_1.DataEvents.removeAll);
        this.events.fire(types_1.DataEvents.change);
    };
    DataCollection.prototype.exists = function (id) {
        return !!this._pull[id];
    };
    DataCollection.prototype.getNearId = function (id) {
        var item = this._pull[id];
        if (!item) {
            return this._order[0].id || "";
        }
    };
    DataCollection.prototype.getItem = function (id) {
        return this._pull[id];
    };
    DataCollection.prototype.update = function (id, obj, silent) {
        var item = this.getItem(id);
        if (item) {
            if (helpers_1.isEqualObj(obj, item)) {
                return;
            }
            if (obj.id && id !== obj.id) {
                helpers_1.dhxWarning("this method doesn't allow change id");
                if (helpers_1.isDebug()) {
                    // tslint:disable-next-line:no-debugger
                    debugger;
                }
            }
            else {
                core_1.extend(this._pull[id], obj, false);
                if (this.config.update) {
                    this.config.update(this._pull[id]);
                }
                if (!silent) {
                    this._onChange("update", id, this._pull[id]);
                }
            }
        }
        else {
            helpers_1.dhxWarning("item not found");
        }
    };
    DataCollection.prototype.getIndex = function (id) {
        var res = core_1.findIndex(this._order, function (item) { return item.id === id; });
        if (this._pull[id] && res >= 0) {
            return res;
        }
        return -1;
    };
    DataCollection.prototype.getId = function (index) {
        if (!this._order[index]) {
            return;
        }
        return this._order[index].id;
    };
    DataCollection.prototype.getLength = function () {
        return this._order.length;
    };
    DataCollection.prototype.filter = function (rule, config) {
        var _this = this;
        config = core_1.extend({
            add: false,
            multiple: true
        }, config);
        if (!config.add) {
            this._order = this._initOrder || this._order;
            this._initOrder = null;
        }
        this._filters = this._filters || {};
        if (!config.multiple || !rule) {
            this._filters = {};
        }
        if (rule) {
            if (typeof rule === "function") {
                var f = "_";
                this._filters[f] = {
                    match: f,
                    compare: rule
                };
            }
            else {
                if (!rule.match) {
                    delete this._filters[rule.by];
                }
                else {
                    rule.compare = rule.compare || (function (val, match) { return val === match; });
                    this._filters[rule.by] = rule;
                }
            }
            var fOrder = this._order.filter(function (item) {
                return Object.keys(_this._filters).every(function (key) {
                    return item[key] ?
                        _this._filters[key].compare(item[key], _this._filters[key].match, item)
                        : _this._filters[key].compare(item);
                });
            });
            if (!this._initOrder) {
                this._initOrder = this._order;
                this._order = fOrder;
            }
        }
        this.events.fire(types_1.DataEvents.change);
    };
    DataCollection.prototype.find = function (conf) {
        for (var key in this._pull) {
            var res = helpers_1.findByConf(this._pull[key], conf);
            if (res) {
                return res;
            }
        }
        return null;
    };
    DataCollection.prototype.findAll = function (conf) {
        var res = [];
        for (var key in this._pull) {
            var item = helpers_1.findByConf(this._pull[key], conf);
            if (item) {
                res.push(item);
            }
        }
        return res;
    };
    DataCollection.prototype.sort = function (by) {
        this._sort.sort(this._order, by);
        if (this._initOrder && this._initOrder.length) {
            this._sort.sort(this._initOrder, by);
        }
        this.events.fire(types_1.DataEvents.change);
    };
    DataCollection.prototype.copy = function (id, index, target, targetId) {
        if (!this.exists(id)) {
            return null;
        }
        var newid = core_1.uid();
        if (target) {
            if (targetId) {
                target.add(__assign({}, this.getItem(id)), index, targetId);
                return;
            }
            if (target.exists(id)) {
                target.add(__assign({}, this.getItem(id), { id: newid }), index);
                return newid;
            }
            else {
                target.add(this.getItem(id), index);
                return id;
            }
        }
        this.add(__assign({}, this.getItem(id), { id: newid }), index);
        return newid;
    };
    DataCollection.prototype.move = function (id, index, target, targetId) {
        if (target && target !== this && this.exists(id)) {
            var item = this.getItem(id);
            if (target.exists(id)) {
                item.id = core_1.uid();
            }
            if (targetId) {
                item.parent = targetId;
            }
            target.add(item, index);
            // remove data from original collection
            this.remove(item.id);
            return item.id;
        }
        if (this.getIndex(id) === index) {
            return null;
        }
        // move other elements
        var spliced = this._order.splice(this.getIndex(id), 1)[0];
        if (index === -1) {
            index = this._order.length;
        }
        this._order.splice(index, 0, spliced);
        this.events.fire(types_1.DataEvents.change); // if target not this, it trigger add and remove
        return id;
    };
    DataCollection.prototype.load = function (url, driver) {
        if (typeof url === "string") {
            url = new dataproxy_1.DataProxy(url);
        }
        return this._loader.load(url, driver);
    };
    DataCollection.prototype.parse = function (data, driver) {
        this._removeAll();
        return this._loader.parse(data, driver);
    };
    DataCollection.prototype.$parse = function (data) {
        var apx = this.config.approximate;
        if (apx) {
            data = this._approximate(data, apx.value, apx.maxNum);
        }
        this._parse_data(data);
        this.events.fire(types_1.DataEvents.change);
        this.events.fire(types_1.DataEvents.load);
    };
    DataCollection.prototype.save = function (url) {
        this._loader.save(url);
    };
    // todo: loop through the array and check saved statuses
    DataCollection.prototype.isSaved = function () {
        return !this._changes.order.length; // todo: bad solution, errors and holded elments are missed...
    };
    DataCollection.prototype.map = function (cb) {
        var result = [];
        for (var i = 0; i < this._order.length; i++) {
            result.push(cb.call(this, this._order[i], i));
        }
        return result;
    };
    DataCollection.prototype.mapRange = function (from, to, cb) {
        if (from < 0) {
            from = 0;
        }
        if (to > this._order.length - 1) {
            to = this._order.length - 1;
        }
        var result = [];
        for (var i = from; i <= to; i++) {
            result.push(cb.call(this, this._order[i], i));
        }
        return result;
    };
    DataCollection.prototype.reduce = function (cb, acc) {
        for (var i = 0; i < this._order.length; i++) {
            acc = cb.call(this, acc, this._order[i], i);
        }
        return acc;
    };
    DataCollection.prototype.serialize = function () {
        return this.map(function (item) {
            var newItem = __assign({}, item);
            Object.keys(newItem).forEach(function (key) {
                if (key[0] === "$") {
                    delete newItem[key];
                }
            });
            return newItem;
        });
    };
    DataCollection.prototype.getInitialData = function () {
        return this._initOrder;
    };
    DataCollection.prototype._removeAll = function () {
        this._pull = {};
        this._order = [];
        this._changes.order = [];
        this._initOrder = null;
    };
    DataCollection.prototype._addCore = function (obj, index) {
        if (this.config.init) {
            obj = this.config.init(obj);
        }
        obj.id = obj.id ? obj.id.toString() : core_1.uid();
        if (this._pull[obj.id]) {
            helpers_1.dhxError("Item already exist");
        }
        // todo: not ideal solution
        if (this._initOrder && this._initOrder.length) {
            this._addToOrder(this._initOrder, obj, index);
        }
        this._addToOrder(this._order, obj, index);
        return obj.id;
    };
    DataCollection.prototype._removeCore = function (id) {
        if (this.getIndex(id) >= 0) {
            this._order = this._order.filter(function (el) { return el.id !== id; });
            delete this._pull[id];
        }
        if (this._initOrder && this._initOrder.length) {
            this._initOrder = this._initOrder.filter(function (el) { return el.id !== id; });
        }
    };
    DataCollection.prototype._parse_data = function (data) {
        var index = this._order.length;
        if (this.config.prep) {
            data = this.config.prep(data);
        }
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var obj = data_1[_i];
            if (this.config.init) {
                obj = this.config.init(obj);
            }
            obj.id = (obj.id || obj.id === 0) ? obj.id : core_1.uid();
            this._pull[obj.id] = obj;
            this._order[index++] = obj;
        }
    };
    DataCollection.prototype._approximate = function (data, values, maxNum) {
        var len = data.length;
        var vlen = values.length;
        var rlen = Math.floor(len / maxNum);
        var newData = Array(Math.ceil(len / rlen));
        var index = 0;
        for (var i = 0; i < len; i += rlen) {
            var newItem = core_1.copy(data[i]);
            var end = Math.min(len, i + rlen);
            for (var j = 0; j < vlen; j++) {
                var sum = 0;
                for (var z = i; z < end; z++) {
                    sum += data[z][values[j]];
                }
                newItem[values[j]] = sum / (end - i);
            }
            newData[index++] = newItem;
        }
        return newData;
    };
    DataCollection.prototype._onChange = function (status, id, obj) {
        for (var _i = 0, _a = this._changes.order; _i < _a.length; _i++) {
            var item = _a[_i];
            // update pending item if previous state is "saving" or if item not saved yet
            if (item.id === id && !item.saving) {
                // update item
                if (item.error) {
                    item.error = false;
                }
                item = __assign({}, item, { obj: obj, status: status });
                this.events.fire(types_1.DataEvents.change, [id, status, obj]);
                return;
            }
        }
        this._changes.order.push({ id: id, status: status, obj: __assign({}, obj), saving: false });
        this.events.fire(types_1.DataEvents.change, [id, status, obj]);
    };
    DataCollection.prototype._addToOrder = function (array, obj, index) {
        if (index >= 0 && array[index]) {
            this._pull[obj.id] = obj;
            array.splice(index, 0, obj);
        }
        else {
            this._pull[obj.id] = obj;
            array.push(obj);
        }
    };
    return DataCollection;
}());
exports.DataCollection = DataCollection;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var CsvDriver = /** @class */ (function () {
    function CsvDriver(config) {
        if (config === void 0) { config = {}; }
        var initConfig = {
            skipHeader: 0,
            nameByHeader: false,
            row: "\n",
            column: ",",
        };
        this.config = __assign({}, initConfig, config);
        if (this.config.nameByHeader) {
            this.config.skipHeader = 1;
        }
    }
    CsvDriver.prototype.getFields = function (row, headers) {
        var parts = row.trim().split(this.config.column);
        var obj = {};
        for (var i = 0; i < parts.length; i++) {
            obj[headers ? headers[i] : i + 1] = parts[i];
        }
        return obj;
    };
    CsvDriver.prototype.getRows = function (data) {
        return data.trim().split(this.config.row);
    };
    CsvDriver.prototype.toJsonArray = function (data) {
        var _this = this;
        var rows = this.getRows(data);
        var names = this.config.names;
        if (this.config.skipHeader) {
            var top_1 = rows.splice(0, this.config.skipHeader);
            if (this.config.nameByHeader) {
                names = top_1[0].trim().split(this.config.column);
            }
        }
        return rows.map(function (row) { return _this.getFields(row, names); });
    };
    return CsvDriver;
}());
exports.CsvDriver = CsvDriver;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var JsonDriver = /** @class */ (function () {
    function JsonDriver() {
    }
    JsonDriver.prototype.toJsonArray = function (data) {
        return this.getRows(data);
    };
    JsonDriver.prototype.getFields = function (row) {
        return row;
    };
    JsonDriver.prototype.getRows = function (data) {
        return typeof data === "string" ? JSON.parse(data) : data;
    };
    return JsonDriver;
}());
exports.JsonDriver = JsonDriver;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(3);
var datacollection_1 = __webpack_require__(23);
var dataproxy_1 = __webpack_require__(15);
var helpers_1 = __webpack_require__(10);
var types_1 = __webpack_require__(9);
function addToOrder(store, obj, parent, index) {
    if (index !== undefined && index !== -1 && store[parent] && store[parent][index]) {
        store[parent].splice(index, 0, obj);
    }
    else {
        if (!store[parent]) {
            store[parent] = [];
        }
        store[parent].push(obj);
    }
}
var TreeCollection = /** @class */ (function (_super) {
    __extends(TreeCollection, _super);
    function TreeCollection(config, events) {
        var _a;
        var _this = _super.call(this, config, events) || this;
        var root = _this._root = "_ROOT_" + core_1.uid();
        _this._childs = (_a = {}, _a[root] = [], _a);
        _this._initChilds = null;
        return _this;
    }
    TreeCollection.prototype.add = function (obj, index, parent) {
        if (index === void 0) { index = -1; }
        if (parent === void 0) { parent = this._root; }
        if (typeof obj !== "object") {
            obj = {
                value: obj
            };
        }
        obj.parent = obj.parent ? obj.parent.toString() : parent;
        var id = _super.prototype.add.call(this, obj, index);
        if (Array.isArray(obj.items)) {
            for (var _i = 0, _a = obj.items; _i < _a.length; _i++) {
                var item = _a[_i];
                this.add(item, -1, obj.id);
            }
        }
        return id;
    };
    TreeCollection.prototype.getRoot = function () {
        return this._root;
    };
    TreeCollection.prototype.getParent = function (id, asObj) {
        if (asObj === void 0) { asObj = false; }
        if (!this._pull[id]) {
            return null;
        }
        var parent = this._pull[id].parent;
        return asObj ? this._pull[parent] : parent;
    };
    TreeCollection.prototype.getItems = function (id) {
        if (this._childs && this._childs[id]) {
            return this._childs[id];
        }
        return [];
    };
    TreeCollection.prototype.getLength = function (id) {
        if (id === void 0) { id = this._root; }
        if (!this._childs[id]) {
            return null;
        }
        return this._childs[id].length;
    };
    TreeCollection.prototype.removeAll = function (id) {
        var _a;
        if (id) {
            var childs = this._childs[id].slice();
            for (var _i = 0, childs_1 = childs; _i < childs_1.length; _i++) {
                var child = childs_1[_i];
                this.remove(child.id);
            }
        }
        else {
            _super.prototype.removeAll.call(this);
            var root = this._root;
            this._initChilds = null;
            this._childs = (_a = {}, _a[root] = [], _a);
        }
    };
    TreeCollection.prototype.getIndex = function (id) {
        var parent = this.getParent(id);
        if (!parent || !this._childs[parent]) {
            return -1;
        }
        return core_1.findIndex(this._childs[parent], function (item) { return item.id === id; });
    };
    TreeCollection.prototype.sort = function (conf) {
        var childs = this._childs;
        for (var key in childs) {
            this._sort.sort(childs[key], conf);
        }
        this.events.fire(types_1.DataEvents.change);
    };
    TreeCollection.prototype.map = function (cb, parent, direct) {
        if (parent === void 0) { parent = this._root; }
        if (direct === void 0) { direct = true; }
        var result = [];
        if (!this.haveItems(parent)) {
            return result;
        }
        for (var i = 0; i < this._childs[parent].length; i++) {
            result.push(cb.call(this, this._childs[parent][i], i));
            if (direct) {
                var childResult = this.map(cb, this._childs[parent][i].id, direct);
                result = result.concat(childResult);
            }
        }
        return result;
    };
    TreeCollection.prototype.filter = function (conf) {
        if (!conf) {
            this.restoreOrder();
            return;
        }
        if (!this._initChilds) {
            this._initChilds = this._childs;
        }
        conf.type = conf.type || types_1.TreeFilterType.all;
        var newChilds = {};
        this._recursiveFilter(conf, this._root, 0, newChilds);
        this._childs = newChilds;
        this.events.fire(types_1.DataEvents.change);
    };
    TreeCollection.prototype.restoreOrder = function () {
        if (this._initChilds) {
            this._childs = this._initChilds;
            this._initChilds = null;
        }
        this.events.fire(types_1.DataEvents.change);
    };
    TreeCollection.prototype.copy = function (id, index, target, targetId) {
        if (target === void 0) { target = this; }
        if (targetId === void 0) { targetId = this._root; }
        if (!this.exists(id)) {
            return null;
        }
        var currentChilds = this._childs[id];
        if (target === this && !this.canCopy(id, targetId)) {
            return null;
        }
        if (!(target instanceof TreeCollection)) { // copy to datacollection
            target.add(this._pull[id]);
            return;
        }
        if (this.exists(id)) {
            var item = __assign({}, this.getItem(id));
            if (target.exists(id)) {
                item.id = core_1.uid();
            }
            else {
                item.id = id;
            }
            item.parent = targetId;
            target.add(item, index);
            id = item.id;
        }
        if (currentChilds) {
            for (var _i = 0, currentChilds_1 = currentChilds; _i < currentChilds_1.length; _i++) {
                var child = currentChilds_1[_i];
                var childId = child.id;
                var childIndex = this.getIndex(childId);
                this.copy(childId, childIndex, target, id);
            }
        }
        return id;
    };
    TreeCollection.prototype.move = function (id, index, target, targetId) {
        if (target === void 0) { target = this; }
        if (targetId === void 0) { targetId = this._root; }
        if (!this.exists(id)) {
            return null;
        }
        if (target !== this) {
            if (!(target instanceof TreeCollection)) { // move to datacollection
                target.add(this._pull[id]);
                this.remove(id);
                return;
            }
            var returnId = this.copy(id, index, target, targetId);
            this.remove(id);
            return returnId;
        }
        // move inside
        if (!this.canCopy(id, targetId)) {
            return null;
        }
        var parent = this.getParent(id);
        var parentIndex = this.getIndex(id);
        // get item from parent array and move to target array
        var spliced = this._childs[parent].splice(parentIndex, 1)[0];
        spliced.parent = targetId; // need for next moving, ... not best solution, may be full method for get item
        if (!this._childs[parent].length) {
            delete this._childs[parent];
        }
        if (!this.haveItems(targetId)) {
            this._childs[targetId] = [];
        }
        if (index === -1) {
            index = this._childs[targetId].push(spliced);
        }
        else {
            this._childs[targetId].splice(index, 0, spliced);
        }
        this.events.fire(types_1.DataEvents.change);
        return id;
    };
    TreeCollection.prototype.eachChild = function (id, cb, direct, checkItem) {
        if (direct === void 0) { direct = true; }
        if (checkItem === void 0) { checkItem = function () { return true; }; }
        if (!this.haveItems(id)) {
            return;
        }
        for (var i = 0; i < this._childs[id].length; i++) {
            cb.call(this, this._childs[id][i], i);
            if (direct && checkItem(this._childs[id][i])) {
                this.eachChild(this._childs[id][i].id, cb, direct, checkItem);
            }
        }
    };
    TreeCollection.prototype.getNearId = function (id) {
        return id; // for selection
    };
    TreeCollection.prototype.loadItems = function (id, driver) {
        var _this = this;
        if (driver === void 0) { driver = "json"; }
        var url = this.config.autoload + "?id=" + id;
        var proxy = new dataproxy_1.DataProxy(url);
        proxy.load().then(function (data) {
            driver = helpers_1.toDataDriver(driver);
            data = driver.toJsonArray(data);
            _this._parse_data(data, id);
            _this.events.fire(types_1.DataEvents.change);
        });
    };
    TreeCollection.prototype.refreshItems = function (id, driver) {
        if (driver === void 0) { driver = "json"; }
        this.removeAll(id);
        this.loadItems(id, driver);
    };
    TreeCollection.prototype.eachParent = function (id, cb, self) {
        if (self === void 0) { self = false; }
        var item = this.getItem(id);
        if (!item) {
            return;
        }
        if (self) {
            cb.call(this, item);
        }
        if (item.parent === this._root) {
            return;
        }
        var parent = this.getItem(item.parent);
        cb.call(this, parent);
        this.eachParent(item.parent, cb);
    };
    TreeCollection.prototype.haveItems = function (id) {
        return id in this._childs;
    };
    TreeCollection.prototype.canCopy = function (id, target) {
        if (id === target) {
            return false;
        }
        var canCopy = true;
        this.eachParent(target, function (item) { return item.id === id ? canCopy = false : null; }); // locate return string
        return canCopy;
    };
    TreeCollection.prototype.serialize = function (fn) {
        return this._serialize(this._root, fn);
    };
    TreeCollection.prototype.getId = function (index, parent) {
        if (parent === void 0) { parent = this._root; }
        if (!this._childs[parent] || !this._childs[parent][index]) {
            return;
        }
        return this._childs[parent][index].id;
    };
    TreeCollection.prototype._removeAll = function (id) {
        var _a;
        if (id) {
            var childs = this._childs[id].slice();
            for (var _i = 0, childs_2 = childs; _i < childs_2.length; _i++) {
                var child = childs_2[_i];
                this.remove(child.id);
            }
        }
        else {
            _super.prototype._removeAll.call(this);
            var root = this._root;
            this._initChilds = null;
            this._childs = (_a = {}, _a[root] = [], _a);
        }
    };
    TreeCollection.prototype._removeCore = function (id) {
        if (this._pull[id]) {
            var parent_1 = this.getParent(id);
            this._childs[parent_1] = this._childs[parent_1].filter(function (item) { return item.id !== id; });
            if (parent_1 !== this._root && !this._childs[parent_1].length) {
                delete this._childs[parent_1];
            }
            if (this._initChilds && this._initChilds[parent_1]) {
                this._initChilds[parent_1] = this._initChilds[parent_1].filter(function (item) { return item.id !== id; });
                if (parent_1 !== this._root && !this._initChilds[parent_1].length) {
                    delete this._initChilds[parent_1];
                }
            }
            this._fastDeleteChilds(this._childs, id);
            if (this._initChilds) {
                this._fastDeleteChilds(this._initChilds, id);
            }
        }
    };
    TreeCollection.prototype._addToOrder = function (_order, obj, index) {
        var childs = this._childs;
        var initChilds = this._initChilds;
        var parent = obj.parent;
        this._pull[obj.id] = obj;
        addToOrder(childs, obj, parent, index);
        if (initChilds) {
            addToOrder(initChilds, obj, parent, index);
        }
    };
    TreeCollection.prototype._parse_data = function (data, parent) {
        if (parent === void 0) { parent = this._root; }
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var obj = data_1[_i];
            if (this.config.init) {
                obj = this.config.init(obj);
            }
            if (typeof obj !== "object") {
                obj = {
                    value: obj
                };
            }
            obj.id = obj.id ? obj.id.toString() : core_1.uid();
            obj.parent = obj.parent ? obj.parent.toString() : parent;
            this._pull[obj.id] = obj;
            if (!this._childs[obj.parent]) {
                this._childs[obj.parent] = [];
            }
            this._childs[obj.parent].push(obj);
            if (obj.items && obj.items instanceof Object) {
                this._parse_data(obj.items, obj.id);
            }
        }
    };
    TreeCollection.prototype._fastDeleteChilds = function (target, id) {
        if (this._pull[id]) {
            delete this._pull[id];
        }
        if (!target[id]) {
            return;
        }
        for (var i = 0; i < target[id].length; i++) {
            this._fastDeleteChilds(target, target[id][i].id);
        }
        delete target[id];
    };
    TreeCollection.prototype._recursiveFilter = function (conf, current, level, newChilds) {
        var _this = this;
        var childs = this._childs[current];
        if (!childs) {
            return;
        }
        var condition = function (item) {
            switch (conf.type) {
                case types_1.TreeFilterType.all: {
                    return true;
                }
                case types_1.TreeFilterType.specific: {
                    return level === conf.specific;
                }
                case types_1.TreeFilterType.leafs: {
                    return !_this.haveItems(item.id);
                }
            }
        };
        if (conf.by && conf.match) {
            var customRule = function (item) { return !condition(item) || item[conf.by].toString().toLowerCase().indexOf(conf.match.toString().toLowerCase()) !== -1; };
            newChilds[current] = childs.filter(customRule);
        }
        else if (conf.rule && typeof conf.rule === "function") {
            var customRule = function (item) { return !condition(item) || conf.rule(item); };
            var filtered = childs.filter(customRule);
            if (filtered.length) {
                newChilds[current] = filtered;
            }
        }
        for (var _i = 0, childs_3 = childs; _i < childs_3.length; _i++) {
            var child = childs_3[_i];
            this._recursiveFilter(conf, child.id, level + 1, newChilds);
        }
    };
    TreeCollection.prototype._serialize = function (parent, fn) {
        var _this = this;
        if (parent === void 0) { parent = this._root; }
        return this.map(function (item) {
            var itemCopy = {};
            for (var key in item) {
                if (key === "parent" || key === "childs") {
                    continue;
                }
                itemCopy[key] = item[key];
            }
            if (fn) {
                itemCopy = fn(itemCopy);
            }
            if (_this.haveItems(item.id)) {
                itemCopy.childs = _this._serialize(item.id, fn);
            }
            return itemCopy;
        }, parent, false);
    };
    return TreeCollection;
}(datacollection_1.DataCollection));
exports.TreeCollection = TreeCollection;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var button_1 = __webpack_require__(56);
var customHTMLButton_1 = __webpack_require__(57);
var dhxButton_1 = __webpack_require__(58);
var imageButton_1 = __webpack_require__(59);
var input_1 = __webpack_require__(60);
var menuItem_1 = __webpack_require__(61);
var separator_1 = __webpack_require__(62);
var spacer_1 = __webpack_require__(63);
var text_1 = __webpack_require__(64);
var types_1 = __webpack_require__(16);
function itemfactory(item, events) {
    if (item.$hidden) {
        return null;
    }
    switch (item.type) {
        case types_1.ItemType.button:
            return button_1.button(item);
        case types_1.ItemType.text:
            return text_1.text(item);
        case types_1.ItemType.separator:
            return separator_1.separator(item);
        case types_1.ItemType.spacer:
            return spacer_1.spacer(item);
        case types_1.ItemType.input:
            return input_1.input(item, events);
        case types_1.ItemType.imageButton:
            return imageButton_1.imageButton(item);
        case types_1.ItemType.selectButton:
        case types_1.ItemType.menuItem:
            return menuItem_1.menuItem(item);
        case types_1.ItemType.dhxButton:
            return dhxButton_1.dhxButton(item);
        case types_1.ItemType.customHTMLButton:
            return customHTMLButton_1.customHTMLButton(item);
        case types_1.ItemType.block:
        default:
            throw new Error("unknown item type " + item.type);
    }
}
exports.itemfactory = itemfactory;
function createFactory(defaultType, forbiddenTypes) {
    if (forbiddenTypes === void 0) { forbiddenTypes = []; }
    var forbidden = {};
    forbiddenTypes.forEach(function (type) { return forbidden[type] = true; });
    return function (item, events) {
        item.type = item.type || defaultType;
        if (forbidden[item.type]) {
            item.type = defaultType;
        }
        return itemfactory(item, events);
    };
}
exports.createFactory = createFactory;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(29));
__export(__webpack_require__(66));
__export(__webpack_require__(68));


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var html_1 = __webpack_require__(1);
var Position;
(function (Position) {
    Position["right"] = "right";
    Position["bottom"] = "bottom";
    Position["center"] = "center";
})(Position = exports.Position || (exports.Position = {}));
var MessageContainerPosition;
(function (MessageContainerPosition) {
    MessageContainerPosition["topLeft"] = "top-left";
    MessageContainerPosition["topRight"] = "top-right";
    MessageContainerPosition["bottomLeft"] = "bottom-left";
    MessageContainerPosition["bottomRight"] = "bottom-right";
})(MessageContainerPosition = exports.MessageContainerPosition || (exports.MessageContainerPosition = {}));
var nodeTimeout = new WeakMap();
var containers = new Map();
function onExpire(node, fromClick) {
    if (fromClick) {
        clearTimeout(nodeTimeout.get(node));
    }
    var parent = node.parentNode.parentNode;
    var _a = containers.get(parent), stack = _a.stack, container = _a.container;
    var index = stack.indexOf(node);
    if (index !== -1) {
        container.removeChild(node);
        stack.splice(index, 1);
        if (stack.length === 0) {
            parent.removeChild(container);
        }
        return;
    }
}
function message(props) {
    if (typeof props === "string") {
        props = { text: props };
    }
    var messageBox = document.createElement("div");
    messageBox.className = "dhx_message " + (props.css || "");
    messageBox.innerHTML = "<span class=\"dhx_message__text\">" + props.text + "</span>\n\t<span class=\"dhx_message__icon dxi " + props.icon + "\"></span>";
    var parent = props.node ? html_1.toNode(props.node) : document.body;
    var position = getComputedStyle(parent).position;
    if (position === "static") {
        parent.style.position = "relative";
    }
    if (!containers.has(parent)) {
        var messageContainer = document.createElement("div");
        messageContainer.className = "dhx-message-container " +
            (props.position ? "dhx-message-container--" + props.position : "dhx-message-container--top-right") +
            (parent === document.body ? " dhx-message-container--in-body" : "");
        containers.set(parent, {
            stack: [],
            container: messageContainer
        });
    }
    var _a = containers.get(parent), stack = _a.stack, container = _a.container;
    if (stack.length === 0) {
        parent.appendChild(container);
    }
    stack.push(messageBox);
    container.appendChild(messageBox);
    if (props.expire) {
        var timeout = setTimeout(function () { return onExpire(messageBox); }, props.expire);
        nodeTimeout.set(messageBox, timeout);
    }
    messageBox.onclick = function () { return onExpire(messageBox, true); };
}
exports.message = message;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var PopupEvents;
(function (PopupEvents) {
    PopupEvents["beforeHide"] = "beforehide";
    PopupEvents["beforeShow"] = "beforeshow";
    PopupEvents["afterHide"] = "afterhide";
    PopupEvents["afterShow"] = "aftershow";
})(PopupEvents = exports.PopupEvents || (exports.PopupEvents = {}));


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = __webpack_require__(2);
var Key;
(function (Key) {
    Key[Key["backspace"] = 8] = "backspace";
    Key[Key["enter"] = 13] = "enter";
    Key[Key["tab"] = 9] = "tab";
    Key[Key["esc"] = 27] = "esc";
    Key[Key["space"] = 32] = "space";
    Key[Key["left"] = 37] = "left";
    Key[Key["up"] = 38] = "up";
    Key[Key["right"] = 39] = "right";
    Key[Key["down"] = 40] = "down";
    Key[Key["insert"] = 45] = "insert";
    Key[Key["del"] = 46] = "del";
    Key[Key["ctrl"] = 17] = "ctrl";
    Key[Key["a"] = 65] = "a";
    Key[Key["b"] = 66] = "b";
    Key[Key["c"] = 67] = "c";
    Key[Key["s"] = 83] = "s";
    Key[Key["u"] = 85] = "u";
    Key[Key["v"] = 86] = "v";
    Key[Key["x"] = 88] = "x";
    Key[Key["y"] = 89] = "y";
    Key[Key["z"] = 90] = "z";
    Key[Key["i"] = 73] = "i";
})(Key = exports.Key || (exports.Key = {}));
function keyToOperation(e) {
    if (e.shiftKey && e.which === Key.enter) {
        e.preventDefault();
        return {
            action: types_1.Action.add,
            data: "\n"
        };
    }
    switch (e.which) {
        case Key.insert:
            e.preventDefault();
            return;
        case Key.left:
        case Key.right:
        case Key.down:
        case Key.up:
            return;
        case Key.backspace:
            e.preventDefault();
            return {
                action: types_1.Action.remove,
                data: true
            };
        case Key.del:
            e.preventDefault();
            return {
                action: types_1.Action.remove,
                data: false
            };
        case Key.space:
            e.preventDefault();
            return {
                action: types_1.Action.add,
                data: " "
            };
        case Key.enter:
            e.preventDefault();
            return {
                action: types_1.Action.add,
                data: { newBlock: true }
            };
    }
    if (e.ctrlKey || e.metaKey) {
        return ctrlKey(e);
    }
    var char = e.key;
    if (char.length > 1 || e.altKey) {
        return;
    }
    e.preventDefault();
    return {
        action: types_1.Action.add,
        data: char
    };
}
exports.keyToOperation = keyToOperation;
function ctrlKey(e) {
    var key = e.which;
    switch (key) {
        case Key.z:
            return {
                action: e.shiftKey ? types_1.Action.redo : types_1.Action.undo
            };
        case Key.y:
            return {
                action: types_1.Action.redo
            };
        case Key.a:
            return {
                action: types_1.Action.selectAll
            };
        case Key.v:
        case Key.x:
        case Key.c:
            return;
        case Key.u:
        case Key.i:
        case Key.b:
            e.preventDefault();
            return;
    }
    return;
}


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(0);
var en_1 = __webpack_require__(11);
function charsExlSpace(text) {
    return text.replace(/[\n ]/g, "").length;
}
function chars(text) {
    return text.replace(/[\n]/g, "").length;
}
function words(text) {
    return text.split(/[\n !.?,:;]+/g).filter(function (word) { return word.length > 0; }).length;
}
var defaultStats = {
    words: words,
    chars: chars,
    charsExlSpace: charsExlSpace
};
function getStats(text, customStats) {
    if (customStats) {
        var stats = {};
        for (var _i = 0, customStats_1 = customStats; _i < customStats_1.length; _i++) {
            var _a = customStats_1[_i], cb = _a.cb, name_1 = _a.name;
            if (typeof cb === "function") {
                stats[name_1] = cb(text);
            }
            else if (!cb && name_1 in defaultStats) {
                stats[name_1] = defaultStats[name_1](text);
            }
            else if (typeof cb === "string" && cb in defaultStats) {
                stats[name_1] = defaultStats[cb](text);
            }
        }
        return stats;
    }
    return {
        chars: defaultStats.chars(text),
        words: defaultStats.words(text),
        charsExlSpace: defaultStats.charsExlSpace(text)
    };
}
exports.getStats = getStats;
function getDefaultRenderStat() {
    return [
        { name: "chars" },
        { name: "charsExlSpace" },
        { name: "words" }
    ];
}
function statsRenderer(stats, statSequence) {
    if (statSequence === void 0) { statSequence = getDefaultRenderStat(); }
    return function () { return dom_1.el("ul.dhx_richtext-stat", statSequence.map(function (stat) {
        return dom_1.el("li.dhx_richtext-stat__item", [
            dom_1.el("span.dhx_richtext-stat__name", en_1.default[stat.name] || stat.name),
            dom_1.el("span.dhx_richtext-stat__value", stats[stat.name])
        ]);
    })); };
}
exports.statsRenderer = statsRenderer;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ColorpickerEvents;
(function (ColorpickerEvents) {
    ColorpickerEvents["colorChange"] = "colorChange";
})(ColorpickerEvents = exports.ColorpickerEvents || (exports.ColorpickerEvents = {}));


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = __webpack_require__(5);
var other_1 = __webpack_require__(4);
var TextNode_1 = __webpack_require__(20);
var SplitResult;
(function (SplitResult) {
    SplitResult[SplitResult["invalidNode"] = 0] = "invalidNode";
    SplitResult[SplitResult["offsetStart"] = 1] = "offsetStart";
    SplitResult[SplitResult["offsetEnd"] = 2] = "offsetEnd";
    SplitResult[SplitResult["complete"] = 3] = "complete";
})(SplitResult = exports.SplitResult || (exports.SplitResult = {}));
var Block = /** @class */ (function () {
    function Block(textNodes, style) {
        this.style = style || constants_1.emptyStyle;
        if (!textNodes || textNodes.length === 0) {
            this.clear();
        }
        else {
            this.textNodes = textNodes;
        }
    }
    Block.prototype.clear = function () {
        this.textNodes = [new TextNode_1.TextNode("", constants_1.emptyStyle)];
    };
    Block.prototype.isEmpty = function () {
        return this.textNodes.length === 1 && this.textNodes[0].isEmpty();
    };
    Block.prototype.splitTextNode = function (index, offset) {
        var textNode = this.textNodes[index];
        if (!textNode) {
            return SplitResult.invalidNode;
        }
        if (offset === 0) {
            return SplitResult.offsetStart;
        }
        if (offset >= textNode.text.length) {
            return SplitResult.offsetEnd;
        }
        var text = textNode.text.slice(0, offset);
        var newText = textNode.text.slice(offset);
        var newTextNode = new TextNode_1.TextNode(newText, textNode.style);
        textNode.text = text;
        this.textNodes.splice(index + 1, 0, newTextNode);
        return SplitResult.complete;
    };
    Block.prototype.removeNodes = function (index, left) {
        // for right selection -> remove from 0 to index
        // for left selection -> remove from index to end
        if (left) {
            if (index === 0) {
                return true;
            }
            this.textNodes = this.textNodes.slice(0, index);
            return false;
        }
        if (index === this.textNodes.length - 1) {
            return true;
        }
        this.textNodes = this.textNodes.slice(index + 1);
        return false;
    };
    Block.prototype.offsetToNodePosition = function (offset) {
        if (offset === 0) {
            return {
                textIndex: 0,
                offset: 0
            };
        }
        var textNodes = this.textNodes;
        for (var i = 0; i < textNodes.length; i++) {
            var len = textNodes[i].text.length;
            if (offset <= len) {
                return {
                    textIndex: i,
                    offset: offset
                };
            }
            offset -= len;
        }
    };
    Block.prototype.nodePositionToOffset = function (textIndex, offset) {
        for (var i = 0; i < textIndex; i++) {
            offset += this.textNodes[i].text.length;
        }
        return offset;
    };
    Block.prototype.getBlockEnd = function () {
        return {
            textIndex: this.textNodes.length - 1,
            offset: this.textNodes[this.textNodes.length - 1].text.length
        };
    };
    Block.prototype.balance = function () {
        var textNodes = this.textNodes;
        var len = textNodes.length;
        var index = 1;
        while (index < textNodes.length) {
            if (other_1.isEqual(textNodes[index - 1].style, textNodes[index].style)) {
                textNodes[index - 1].text += textNodes[index].text;
                textNodes.splice(index, 1);
            }
            else {
                index++;
            }
        }
        return len !== textNodes.length;
    };
    return Block;
}());
exports.Block = Block;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = __webpack_require__(2);
function serializer(blocks) {
    return blocks.reduce(function (result, block) { return result + serializeBlock(block); }, "");
}
exports.serializer = serializer;
function serializeBlock(block) {
    var inline = "";
    var style = block.style, textNodes = block.textNodes;
    var tags = [];
    if (block.style[types_1.Modifier.blockquote]) {
        tags.push("blockquote");
    }
    tags.push(style[types_1.Modifier.style] || "p");
    var align = style[types_1.Modifier.align] ? "text-align: " + style[types_1.Modifier.align] + ";" : "";
    if (textNodes.length === 1 && !textNodes[0].style[types_1.Modifier.link]) {
        var res = serializeTextNode(textNodes[0], true);
        tags.push.apply(tags, res.tags);
        var textInline = res.inline;
        if (textInline || align) {
            inline = " style=\"" + textInline + align + "\"";
        }
        return tagWithContent(tags, inline, res.text);
    }
    if (align) {
        inline = " style=\"" + align + "\"";
    }
    return tagWithContent(tags, inline, serializeTextNodes(textNodes));
}
function serializeTextNode(textNode, raw) {
    if (raw === void 0) { raw = false; }
    var style = textNode.style, text = textNode.text;
    var tags = [];
    if (style[types_1.Modifier.underline]) {
        tags.push("u");
    }
    if (style[types_1.Modifier.strike]) {
        tags.push("s");
    }
    if (style[types_1.Modifier.bold]) {
        tags.push("strong");
    }
    if (style[types_1.Modifier.italic]) {
        tags.push("i");
    }
    if (raw) {
        return {
            tags: tags,
            inline: textInlineStyle(style, true),
            text: processText(text)
        };
    }
    var inlineStyle = textInlineStyle(style);
    if (inlineStyle && tags.length === 0) {
        tags.push("span");
    }
    return tagWithContent(tags, inlineStyle, processText(text));
}
function serializeTextNodes(textNodes) {
    var res = "";
    var linkContent = "";
    var linkText = "";
    var prevLink;
    for (var _i = 0, textNodes_1 = textNodes; _i < textNodes_1.length; _i++) {
        var textNode = textNodes_1[_i];
        if (textNode.style.link) {
            if (prevLink === textNode.style.link) {
                linkContent += serializeTextNode(textNode);
                linkText += textNode.text.replace(/\"/g, "'");
            }
            else {
                linkContent = serializeTextNode(textNode);
                linkText = textNode.text.replace(/\"/g, "'");
            }
        }
        else {
            if (prevLink) {
                res += tagWithContent(["a"], " href=\"" + prevLink + "\" title=\"" + linkText + "\"", linkContent);
            }
            res += serializeTextNode(textNode);
        }
        prevLink = textNode.style.link;
    }
    if (prevLink) {
        res += tagWithContent(["a"], " href=\"" + prevLink + "\" title=\"" + linkText + "\"", linkContent);
    }
    return res;
}
function textInlineStyle(style, raw) {
    if (raw === void 0) { raw = false; }
    var inline = "";
    for (var key in style) {
        switch (key) {
            case types_1.Modifier.background:
                inline += "background: " + style[key] + ";";
                break;
            case types_1.Modifier.color:
                inline += "color: " + style[key] + ";";
                break;
            case types_1.Modifier.fontFamily:
                inline += "font-family: " + style[key] + ";";
                break;
            case types_1.Modifier.fontSize:
                inline += "font-size: " + style[key] + ";";
                break;
        }
    }
    if (raw) {
        return inline;
    }
    if (inline) {
        return " style=\"" + inline + "\"";
    }
    return "";
}
function tagWithContent(tags, inlineStyle, content) {
    if (tags.length === 0 && content.trim() === "") {
        tags.push("span");
    }
    var openTags = tags.reduce(function (res, tag, i) { return res + (i === 0 ? "<" + tag + inlineStyle + ">" : "<" + tag + ">"); }, "");
    var closeTags = tags.reduceRight(function (res, tag) { return res + ("</" + tag + ">"); }, "");
    return openTags + content + closeTags;
}
function repeatStr(str, count) {
    var res = "";
    while (count--) {
        res += str;
    }
    return res;
}
function processText(text) {
    return text
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\n/g, "<br>")
        .replace(/[ ]{2,}/g, function (match) { return " " + repeatStr("&nbsp;", match.length - 1); });
}


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(37);
var Richtext_1 = __webpack_require__(38);
exports.Richtext = Richtext_1.Richtext;
var en_1 = __webpack_require__(11);
var w = window;
exports.i18n = (w.dhx && w.dhx.i18n) ? w.dhx.i18 : {};
exports.i18n.setLocale = function (component, value) {
    var target = exports.i18n[component];
    for (var key in value) {
        target[key] = value[key];
    }
};
exports.i18n.richtext = exports.i18n.richtext || en_1.default;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(3);
var dom_1 = __webpack_require__(0);
var events_1 = __webpack_require__(7);
var html_1 = __webpack_require__(1);
var view_1 = __webpack_require__(8);
var ts_layout_1 = __webpack_require__(41);
var constants_1 = __webpack_require__(5);
var composition_1 = __webpack_require__(69);
var link_1 = __webpack_require__(70);
var other_1 = __webpack_require__(4);
var scroll_1 = __webpack_require__(72);
var statistics_1 = __webpack_require__(32);
var styles_1 = __webpack_require__(19);
var toolbar_1 = __webpack_require__(73);
var keyhandler_1 = __webpack_require__(31);
var Editor_1 = __webpack_require__(79);
var types_1 = __webpack_require__(2);
var Richtext = /** @class */ (function (_super) {
    __extends(Richtext, _super);
    function Richtext(container, config) {
        var _a;
        var _this = _super.call(this, container, core_1.extend({
            mode: "classic",
            toolbarBlocks: [
                types_1.RTEToolbarBlock.undo,
                types_1.RTEToolbarBlock.style,
                types_1.RTEToolbarBlock.decoration,
                types_1.RTEToolbarBlock.color,
                types_1.RTEToolbarBlock.align,
                types_1.RTEToolbarBlock.link
                // RTEToolbarBlock.clear,
                // RTEToolbarBlock.fullscreen
            ]
        }, config)) || this;
        var defaultBlockIndex = _this.config.toolbarBlocks.indexOf(types_1.RTEToolbarBlock.default);
        if (defaultBlockIndex !== -1) {
            (_a = _this.config.toolbarBlocks).splice.apply(_a, [defaultBlockIndex, 1].concat(constants_1.defaultBlocks));
        }
        _this._initContainer = html_1.toNode(container);
        _this.events = new events_1.EventSystem();
        var getRootView = function () { return _this.getRootView(); };
        _this._composition = {
            active: false,
            initSelection: null
        };
        _this._compositionEventsDestructor = composition_1.listenCompositionEvents(_this.events, function () { return _this._editor.selection.isActive(); });
        _this._editor = new Editor_1.Editor({
            events: _this.events,
            uid: _this._uid,
            getRootView: getRootView,
            repaint: function () { return _this.paint(); }
        });
        _this._toolbarHelper = new toolbar_1.RichTextToolbarHelper(_this, _this._editor);
        _this.toolbar = _this._toolbarHelper.toolbar;
        _this._linkEditor = new link_1.LinkEditor(null, {
            events: _this.events,
            editor: _this._editor,
            getRootView: getRootView
        });
        _this._initHandlers();
        _this._initUI(_this._initContainer);
        _this._initEvents();
        return _this;
    }
    Richtext.prototype.setValue = function (value, mode) {
        if (mode === void 0) { mode = "html"; }
        this.events.fire(types_1.RichTextEvents.action, [types_1.Action.parse, { value: value, mode: mode }, false]);
    };
    Richtext.prototype.getValue = function (mode) {
        if (mode === void 0) { mode = "html"; }
        return this._editor.serialize(mode);
    };
    Richtext.prototype.getStats = function (selection) {
        var text = selection ? this._editor.selection.getSelectedText() : this.getValue("text");
        return statistics_1.getStats(text, this.config.customStats);
    };
    Richtext.prototype.destructor = function () {
        this._compositionEventsDestructor();
        this._editor.selection.destructor();
        this.toolbar.destructor();
        this._layout.getRootView().unmount();
    };
    Richtext.prototype.fullScreen = function () {
        if (this.toolbar.data.exists("fullscreen")) {
            this.toolbar.data.update("fullscreen", {
                icon: "dxi-arrow-collapse",
                $fullscreen: true
            });
        }
        document.body.classList.add("dhx_richtext--fullscreen", "dhx_widget--fullscreen");
        var view = this._layout.getRootView();
        view.mount(document.body);
    };
    Richtext.prototype.exitFullScreen = function () {
        if (this.toolbar.data.exists("fullscreen")) {
            this.toolbar.data.update("fullscreen", {
                icon: "dxi-arrow-expand",
                $fullscreen: false
            });
        }
        document.body.classList.remove("dhx_richtext--fullscreen", "dhx_widget--fullscreen");
        var view = this._layout.getRootView();
        view.mount(this._initContainer);
    };
    Richtext.prototype.getEditorAPI = function () {
        var _this = this;
        return {
            getSelection: function () { return _this._editor.selection.get(); },
            setSelection: function (selection) {
                _this._editor.selection.set(selection);
                _this._restoreFocus();
            },
            getPosition: function (selection) { return _this._editor.selection.getPosition(selection); },
            getModel: function () { return _this._editor.blocks.map(function (block) { return ({
                style: __assign({}, block.style),
                textNodes: block.textNodes.map(function (textNode) { return ({
                    style: __assign({}, textNode.style),
                    text: textNode.text
                }); })
            }); }); },
            setModel: function (blocks, selection) {
                _this.events.fire(types_1.RichTextEvents.action, [types_1.Action.parse, { value: blocks, mode: "inner" }, false]);
                if (selection) {
                    _this._editor.selection.set(selection);
                }
            },
            add: function (config, selection) {
                if (selection) {
                    _this._editor.selection.set(selection);
                }
                _this.events.fire(types_1.RichTextEvents.action, [types_1.Action.innerAdd, config, true]);
            },
            remove: function (selection) {
                if (selection) {
                    _this._editor.selection.set(selection);
                }
                _this.events.fire(types_1.RichTextEvents.action, [types_1.Action.remove, true, true]);
            },
            update: function (config, selection) {
                if (selection) {
                    _this._editor.selection.set(selection);
                }
                _this.events.fire(types_1.RichTextEvents.action, [types_1.Action.update, {
                        modifier: config.modifier,
                        modifierValue: config.value
                    }]);
            }
        };
    };
    Richtext.prototype._initUI = function (container) {
        var _this = this;
        var layout = this._layout = new ts_layout_1.Layout(container, {
            css: "dhx_richtext" + " dhx_richtext--mode_" + this.config.mode,
            cols: [{
                    css: "dhx_toolbar__height-holder",
                    rows: [
                        { id: "toolbar", on: { click: function () { return _this._restoreFocus(); } }, css: "dhx_richtext__toolbar-holder" },
                        { id: "editor", css: "dhx_richtext__editor-holder" }
                    ]
                }]
        });
        this.mount(null, dom_1.create({
            render: function () { return _this._draw(); },
            hooks: {
                didRedraw: function () {
                    if (_this._editor.selection.isActive()) {
                        var isUpdated = _this._editor.selection.update();
                        if (!isUpdated) {
                            _this._restoreFocus();
                        }
                    }
                }
            }
        }));
        layout.cell("editor").attach(this);
        layout.cell("toolbar").attach(this.toolbar);
    };
    Richtext.prototype._initHandlers = function () {
        var _this = this;
        this._handlers = {
            onkeydown: function (e) {
                if (_this._composition.active || (_this._linkEditor.isVisible() && !_this._editor.selection.isActive())) {
                    return;
                }
                var operation = keyhandler_1.keyToOperation(e);
                if (!operation) {
                    return;
                }
                _this.events.fire(types_1.RichTextEvents.action, [operation.action, operation.data]);
            },
            onpaste: function (e) {
                _this.events.fire(types_1.RichTextEvents.action, [types_1.Action.paste, e, false]);
            },
            oncut: function (e) {
                _this.events.fire(types_1.RichTextEvents.action, [types_1.Action.cut, e, false]);
            },
            oncopy: function (e) {
                _this.events.fire(types_1.RichTextEvents.action, [types_1.Action.copy, e, false]);
            },
            ondrop: function (e) {
                e.preventDefault();
            },
            ondragstart: function (e) {
                e.preventDefault();
            }
        };
    };
    Richtext.prototype._initEvents = function () {
        var _this = this;
        this.events.on(types_1.RichTextEvents.selectionRefresh, function () { return _this._scrollHelper.update(); });
        this.events.on(types_1.RichTextEvents.action, function (action, data, restoreFocus) {
            var isChanged = _this._editor.manager.execute({ action: action, data: data });
            if (isChanged) {
                _this.events.fire(types_1.RichTextEvents.change, [action, _this._editor.manager.canUndo(), _this._editor.manager.canRedo()]);
                _this.paint();
            }
            if (restoreFocus) {
                _this._restoreFocus();
            }
        });
        this.events.on(types_1.RichTextEvents.compositionStart, function () {
            _this._composition.active = true;
            _this._composition.initSelection = _this._editor.selection.get();
        });
        this.events.on(types_1.RichTextEvents.compositionEnd, function (data) {
            _this._editor.selection.set(_this._composition.initSelection);
            _this.events.fire(types_1.RichTextEvents.action, [types_1.Action.add, data, true]);
            _this._composition.active = false;
            _this._composition.initSelection = null;
        });
    };
    Richtext.prototype._restoreFocus = function () {
        var _this = this;
        if (this._restoreFocusTimeout) {
            clearTimeout(this._restoreFocusTimeout);
        }
        this._restoreFocusTimeout = setTimeout(function () {
            _this._scrollHelper.saveScrollTop();
            _this.getRootView().refs.editor.el.focus();
            _this._scrollHelper.restoreScrollTop();
            var isUpdated = _this._editor.selection.refresh();
            _this._restoreFocusTimeout = null;
            if (!isUpdated) {
                _this._restoreFocus();
            }
        }, 25);
    };
    Richtext.prototype._draw = function () {
        var _this = this;
        var currentLinkRef = this._linkEditor.getCurrentLinkRef();
        var linkRefer = other_1.getLinkRefer();
        var currentLink = null;
        var currentLinkArr = [];
        return dom_1.el(".dhx_richtext__overflow-wrapper", {
            _hooks: this.config.mode === "document" && {
                didInsert: function (node) {
                    _this._scrollHelper = scroll_1.createScrollHelper(node.el);
                }
            }
        }, [
            dom_1.el(".dhx_richtext__editor.dhx_richtext-editor", __assign({ "dhx_widget_id": this._uid, "_ref": "editor", "contentEditable": "true", "role": "textbox", "data-gramm": "false", "spellcheck": "false", "_hooks": this.config.mode !== "document" && {
                    didInsert: function (node) {
                        _this._scrollHelper = scroll_1.createScrollHelper(node.el);
                    }
                } }, this._handlers), this._editor.blocks.map(function (block, blockIndex) {
                if (currentLinkArr.length) {
                    currentLinkArr = [];
                    currentLink = null;
                }
                return styles_1.blockquoteWrapper(block.style, blockIndex)(styles_1.blockStyleToTag(block.style), {
                    style: styles_1.calcBlockStyle(block.style),
                    dhx_offset: blockIndex
                }, block.textNodes.map(function (textNode, textIndex) {
                    var hash = other_1.getTextHash(blockIndex, textIndex);
                    var isLastBlockNode = textIndex === block.textNodes.length - 1;
                    if (textNode.style.link) {
                        if (currentLink !== textNode.style.link) {
                            currentLinkArr = [_this._renderTextNode(textNode, hash, isLastBlockNode)];
                            currentLink = textNode.style.link;
                            var linkRef = linkRefer();
                            return dom_1.el("a", {
                                href: textNode.style.link,
                                class: linkRef === currentLinkRef ? "dhx--link_edited" : "",
                                _ref: linkRef
                            }, currentLinkArr);
                        }
                        else {
                            currentLinkArr.push(_this._renderTextNode(textNode, hash, isLastBlockNode));
                            return;
                        }
                    }
                    currentLink = textNode.style.link;
                    return _this._renderTextNode(textNode, hash, isLastBlockNode);
                }));
            }))
        ]);
    };
    Richtext.prototype._renderTextNode = function (textNode, hash, isLastBlockNode) {
        var text = textNode.text;
        var lastSymbolIsGap = text[text.length - 1] === "\n" && isLastBlockNode;
        return dom_1.el("span", {
            _ref: hash,
            dhx_offset: hash,
            style: styles_1.calcTextNodeStyle(textNode.style)
        }, text.length === 0 ? [dom_1.el("br")] : lastSymbolIsGap ? [text + "\n"] : text);
    };
    return Richtext;
}(view_1.View));
exports.Richtext = Richtext;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

/**
* Copyright (c) 2017, Leon Sorokin
* All rights reserved. (MIT Licensed)
*
* domvm.js (DOM ViewModel)
* A thin, fast, dependency-free vdom view layer
* @preserve https://github.com/leeoniya/domvm (v3.2.6, micro build)
*/

(function (global, factory) {
	 true ? module.exports = factory() :
	undefined;
}(this, (function () { 'use strict';

// NOTE: if adding a new *VNode* type, make it < COMMENT and renumber rest.
// There are some places that test <= COMMENT to assert if node is a VNode

// VNode types
var ELEMENT	= 1;
var TEXT		= 2;
var COMMENT	= 3;

// placeholder types
var VVIEW		= 4;
var VMODEL		= 5;

var ENV_DOM = typeof window !== "undefined";
var win = ENV_DOM ? window : {};
var rAF = win.requestAnimationFrame;

var emptyObj = {};

function noop() {}

var isArr = Array.isArray;

function isSet(val) {
	return val != null;
}

function isPlainObj(val) {
	return val != null && val.constructor === Object;		//  && typeof val === "object"
}

function insertArr(targ, arr, pos, rem) {
	targ.splice.apply(targ, [pos, rem].concat(arr));
}

function isVal(val) {
	var t = typeof val;
	return t === "string" || t === "number";
}

function isFunc(val) {
	return typeof val === "function";
}

function isProm(val) {
	return typeof val === "object" && isFunc(val.then);
}



function assignObj(targ) {
	var args = arguments;

	for (var i = 1; i < args.length; i++)
		{ for (var k in args[i])
			{ targ[k] = args[i][k]; } }

	return targ;
}

// export const defProp = Object.defineProperty;

function deepSet(targ, path, val) {
	var seg;

	while (seg = path.shift()) {
		if (path.length === 0)
			{ targ[seg] = val; }
		else
			{ targ[seg] = targ = targ[seg] || {}; }
	}
}

/*
export function deepUnset(targ, path) {
	var seg;

	while (seg = path.shift()) {
		if (path.length === 0)
			targ[seg] = val;
		else
			targ[seg] = targ = targ[seg] || {};
	}
}
*/

function sliceArgs(args, offs) {
	var arr = [];
	for (var i = offs; i < args.length; i++)
		{ arr.push(args[i]); }
	return arr;
}

function cmpObj(a, b) {
	for (var i in a)
		{ if (a[i] !== b[i])
			{ return false; } }

	return true;
}

function cmpArr(a, b) {
	var alen = a.length;

	if (b.length !== alen)
		{ return false; }

	for (var i = 0; i < alen; i++)
		{ if (a[i] !== b[i])
			{ return false; } }

	return true;
}

// https://github.com/darsain/raft
// rAF throttler, aggregates multiple repeated redraw calls within single animframe
function raft(fn) {
	if (!rAF)
		{ return fn; }

	var id, ctx, args;

	function call() {
		id = 0;
		fn.apply(ctx, args);
	}

	return function() {
		ctx = this;
		args = arguments;
		if (!id) { id = rAF(call); }
	};
}

function curry(fn, args, ctx) {
	return function() {
		return fn.apply(ctx, args);
	};
}

/*
export function prop(val, cb, ctx, args) {
	return function(newVal, execCb) {
		if (newVal !== undefined && newVal !== val) {
			val = newVal;
			execCb !== false && isFunc(cb) && cb.apply(ctx, args);
		}

		return val;
	};
}
*/

/*
// adapted from https://github.com/Olical/binary-search
export function binaryKeySearch(list, item) {
    var min = 0;
    var max = list.length - 1;
    var guess;

	var bitwise = (max <= 2147483647) ? true : false;
	if (bitwise) {
		while (min <= max) {
			guess = (min + max) >> 1;
			if (list[guess].key === item) { return guess; }
			else {
				if (list[guess].key < item) { min = guess + 1; }
				else { max = guess - 1; }
			}
		}
	} else {
		while (min <= max) {
			guess = Math.floor((min + max) / 2);
			if (list[guess].key === item) { return guess; }
			else {
				if (list[guess].key < item) { min = guess + 1; }
				else { max = guess - 1; }
			}
		}
	}

    return -1;
}
*/

// https://en.wikipedia.org/wiki/Longest_increasing_subsequence
// impl borrowed from https://github.com/ivijs/ivi
function longestIncreasingSubsequence(a) {
	var p = a.slice();
	var result = [];
	result.push(0);
	var u;
	var v;

	for (var i = 0, il = a.length; i < il; ++i) {
		var j = result[result.length - 1];
		if (a[j] < a[i]) {
			p[i] = j;
			result.push(i);
			continue;
		}

		u = 0;
		v = result.length - 1;

		while (u < v) {
			var c = ((u + v) / 2) | 0;
			if (a[result[c]] < a[i]) {
				u = c + 1;
			} else {
				v = c;
			}
		}

		if (a[i] < a[result[u]]) {
			if (u > 0) {
				p[i] = result[u - 1];
			}
			result[u] = i;
		}
	}

	u = result.length;
	v = result[u - 1];

	while (u-- > 0) {
		result[u] = v;
		v = p[v];
	}

	return result;
}

// based on https://github.com/Olical/binary-search
function binaryFindLarger(item, list) {
	var min = 0;
	var max = list.length - 1;
	var guess;

	var bitwise = (max <= 2147483647) ? true : false;
	if (bitwise) {
		while (min <= max) {
			guess = (min + max) >> 1;
			if (list[guess] === item) { return guess; }
			else {
				if (list[guess] < item) { min = guess + 1; }
				else { max = guess - 1; }
			}
		}
	} else {
		while (min <= max) {
			guess = Math.floor((min + max) / 2);
			if (list[guess] === item) { return guess; }
			else {
				if (list[guess] < item) { min = guess + 1; }
				else { max = guess - 1; }
			}
		}
	}

	return (min == list.length) ? null : min;

//	return -1;
}

function isEvProp(name) {
	return name[0] === "o" && name[1] === "n";
}

function isSplProp(name) {
	return name[0] === "_";
}

function isStyleProp(name) {
	return name === "style";
}

function repaint(node) {
	node && node.el && node.el.offsetHeight;
}

function isHydrated(vm) {
	return vm.node != null && vm.node.el != null;
}

// tests interactive props where real val should be compared
function isDynProp(tag, attr) {
//	switch (tag) {
//		case "input":
//		case "textarea":
//		case "select":
//		case "option":
			switch (attr) {
				case "value":
				case "checked":
				case "selected":
//				case "selectedIndex":
					return true;
			}
//	}

	return false;
}

function getVm(n) {
	n = n || emptyObj;
	while (n.vm == null && n.parent)
		{ n = n.parent; }
	return n.vm;
}

function VNode() {}

var VNodeProto = VNode.prototype = {
	constructor: VNode,

	type:	null,

	vm:		null,

	// all this stuff can just live in attrs (as defined) just have getters here for it
	key:	null,
	ref:	null,
	data:	null,
	hooks:	null,
	ns:		null,

	el:		null,

	tag:	null,
	attrs:	null,
	body:	null,

	flags:	0,

	_class:	null,
	_diff:	null,

	// pending removal on promise resolution
	_dead:	false,
	// part of longest increasing subsequence?
	_lis:	false,

	idx:	null,
	parent:	null,

	/*
	// break out into optional fluent module
	key:	function(val) { this.key	= val; return this; },
	ref:	function(val) { this.ref	= val; return this; },		// deep refs
	data:	function(val) { this.data	= val; return this; },
	hooks:	function(val) { this.hooks	= val; return this; },		// h("div").hooks()
	html:	function(val) { this.html	= true; return this.body(val); },

	body:	function(val) { this.body	= val; return this; },
	*/
};

function defineText(body) {
	var node = new VNode;
	node.type = TEXT;
	node.body = body;
	return node;
}

// creates a one-shot self-ending stream that redraws target vm
// TODO: if it's already registered by any parent vm, then ignore to avoid simultaneous parent & child refresh

var tagCache = {};

var RE_ATTRS = /\[(\w+)(?:=(\w+))?\]/g;

function cssTag(raw) {
	{
		var cached = tagCache[raw];

		if (cached == null) {
			var tag, id, cls, attr;

			tagCache[raw] = cached = {
				tag:	(tag	= raw.match( /^[-\w]+/))		?	tag[0]						: "div",
				id:		(id		= raw.match( /#([-\w]+)/))		? 	id[1]						: null,
				class:	(cls	= raw.match(/\.([-\w.]+)/))		?	cls[1].replace(/\./g, " ")	: null,
				attrs:	null,
			};

			while (attr = RE_ATTRS.exec(raw)) {
				if (cached.attrs == null)
					{ cached.attrs = {}; }
				cached.attrs[attr[1]] = attr[2] || "";
			}
		}

		return cached;
	}
}

// (de)optimization flags

// forces slow bottom-up removeChild to fire deep willRemove/willUnmount hooks,
var DEEP_REMOVE = 1;
// prevents inserting/removing/reordering of children
var FIXED_BODY = 2;
// enables fast keyed lookup of children via binary search, expects homogeneous keyed body
var KEYED_LIST = 4;
// indicates an vnode match/diff/recycler function for body
var LAZY_LIST = 8;

function initElementNode(tag, attrs, body, flags) {
	var node = new VNode;

	node.type = ELEMENT;

	if (isSet(flags))
		{ node.flags = flags; }

	node.attrs = attrs;

	var parsed = cssTag(tag);

	node.tag = parsed.tag;

	// meh, weak assertion, will fail for id=0, etc.
	if (parsed.id || parsed.class || parsed.attrs) {
		var p = node.attrs || {};

		if (parsed.id && !isSet(p.id))
			{ p.id = parsed.id; }

		if (parsed.class) {
			node._class = parsed.class;		// static class
			p.class = parsed.class + (isSet(p.class) ? (" " + p.class) : "");
		}
		if (parsed.attrs) {
			for (var key in parsed.attrs)
				{ if (!isSet(p[key]))
					{ p[key] = parsed.attrs[key]; } }
		}

//		if (node.attrs !== p)
			node.attrs = p;
	}

	var mergedAttrs = node.attrs;

	if (isSet(mergedAttrs)) {
		if (isSet(mergedAttrs._key))
			{ node.key = mergedAttrs._key; }

		if (isSet(mergedAttrs._ref))
			{ node.ref = mergedAttrs._ref; }

		if (isSet(mergedAttrs._hooks))
			{ node.hooks = mergedAttrs._hooks; }

		if (isSet(mergedAttrs._data))
			{ node.data = mergedAttrs._data; }

		if (isSet(mergedAttrs._flags))
			{ node.flags = mergedAttrs._flags; }

		if (!isSet(node.key)) {
			if (isSet(node.ref))
				{ node.key = node.ref; }
			else if (isSet(mergedAttrs.id))
				{ node.key = mergedAttrs.id; }
			else if (isSet(mergedAttrs.name))
				{ node.key = mergedAttrs.name + (mergedAttrs.type === "radio" || mergedAttrs.type === "checkbox" ? mergedAttrs.value : ""); }
		}
	}

	if (body != null)
		{ node.body = body; }

	return node;
}

function setRef(vm, name, node) {
	var path = ["refs"].concat(name.split("."));
	deepSet(vm, path, node);
}

function setDeepRemove(node) {
	while (node = node.parent)
		{ node.flags |= DEEP_REMOVE; }
}

// vnew, vold
function preProc(vnew, parent, idx, ownVm) {
	if (vnew.type === VMODEL || vnew.type === VVIEW)
		{ return; }

	vnew.parent = parent;
	vnew.idx = idx;
	vnew.vm = ownVm;

	if (vnew.ref != null)
		{ setRef(getVm(vnew), vnew.ref, vnew); }

	var nh = vnew.hooks,
		vh = ownVm && ownVm.hooks;

	if (nh && (nh.willRemove || nh.didRemove) ||
		vh && (vh.willUnmount || vh.didUnmount))
		{ setDeepRemove(vnew); }

	if (isArr(vnew.body))
		{ preProcBody(vnew); }
	else {}
}

function preProcBody(vnew) {
	var body = vnew.body;

	for (var i = 0; i < body.length; i++) {
		var node2 = body[i];

		// remove false/null/undefined
		if (node2 === false || node2 == null)
			{ body.splice(i--, 1); }
		// flatten arrays
		else if (isArr(node2)) {
			insertArr(body, node2, i--, 1);
		}
		else {
			if (node2.type == null)
				{ body[i] = node2 = defineText(""+node2); }

			if (node2.type === TEXT) {
				// remove empty text nodes
				if (node2.body == null || node2.body === "")
					{ body.splice(i--, 1); }
				// merge with previous text node
				else if (i > 0 && body[i-1].type === TEXT) {
					body[i-1].body += node2.body;
					body.splice(i--, 1);
				}
				else
					{ preProc(node2, vnew, i, null); }
			}
			else
				{ preProc(node2, vnew, i, null); }
		}
	}
}

var unitlessProps = {
	animationIterationCount: true,
	boxFlex: true,
	boxFlexGroup: true,
	boxOrdinalGroup: true,
	columnCount: true,
	flex: true,
	flexGrow: true,
	flexPositive: true,
	flexShrink: true,
	flexNegative: true,
	flexOrder: true,
	gridRow: true,
	gridColumn: true,
	order: true,
	lineClamp: true,

	borderImageOutset: true,
	borderImageSlice: true,
	borderImageWidth: true,
	fontWeight: true,
	lineHeight: true,
	opacity: true,
	orphans: true,
	tabSize: true,
	widows: true,
	zIndex: true,
	zoom: true,

	fillOpacity: true,
	floodOpacity: true,
	stopOpacity: true,
	strokeDasharray: true,
	strokeDashoffset: true,
	strokeMiterlimit: true,
	strokeOpacity: true,
	strokeWidth: true
};

function autoPx(name, val) {
	{
		// typeof val === 'number' is faster but fails for numeric strings
		return !isNaN(val) && !unitlessProps[name] ? (val + "px") : val;
	}
}

// assumes if styles exist both are objects or both are strings
function patchStyle(n, o) {
	var ns =     (n.attrs || emptyObj).style;
	var os = o ? (o.attrs || emptyObj).style : null;

	// replace or remove in full
	if (ns == null || isVal(ns))
		{ n.el.style.cssText = ns; }
	else {
		for (var nn in ns) {
			var nv = ns[nn];

			if (os == null || nv != null && nv !== os[nn])
				{ n.el.style[nn] = autoPx(nn, nv); }
		}

		// clean old
		if (os) {
			for (var on in os) {
				if (ns[on] == null)
					{ n.el.style[on] = ""; }
			}
		}
	}
}

var didQueue = [];

function fireHook(hooks, name, o, n, immediate) {
	if (hooks != null) {
		var fn = o.hooks[name];

		if (fn) {
			if (name[0] === "d" && name[1] === "i" && name[2] === "d") {	// did*
				//	console.log(name + " should queue till repaint", o, n);
				immediate ? repaint(o.parent) && fn(o, n) : didQueue.push([fn, o, n]);
			}
			else {		// will*
				//	console.log(name + " may delay by promise", o, n);
				return fn(o, n);		// or pass  done() resolver
			}
		}
	}
}

function drainDidHooks(vm) {
	if (didQueue.length) {
		repaint(vm.node);

		var item;
		while (item = didQueue.shift())
			{ item[0](item[1], item[2]); }
	}
}

var doc = ENV_DOM ? document : null;

function closestVNode(el) {
	while (el._node == null)
		{ el = el.parentNode; }
	return el._node;
}

function createElement(tag, ns) {
	if (ns != null)
		{ return doc.createElementNS(ns, tag); }
	return doc.createElement(tag);
}

function createTextNode(body) {
	return doc.createTextNode(body);
}

function createComment(body) {
	return doc.createComment(body);
}

// ? removes if !recycled
function nextSib(sib) {
	return sib.nextSibling;
}

// ? removes if !recycled
function prevSib(sib) {
	return sib.previousSibling;
}

// TODO: this should collect all deep proms from all hooks and return Promise.all()
function deepNotifyRemove(node) {
	var vm = node.vm;

	var wuRes = vm != null && fireHook(vm.hooks, "willUnmount", vm, vm.data);

	var wrRes = fireHook(node.hooks, "willRemove", node);

	if ((node.flags & DEEP_REMOVE) === DEEP_REMOVE && isArr(node.body)) {
		for (var i = 0; i < node.body.length; i++)
			{ deepNotifyRemove(node.body[i]); }
	}

	return wuRes || wrRes;
}

function _removeChild(parEl, el, immediate) {
	var node = el._node, vm = node.vm;

	if (isArr(node.body)) {
		if ((node.flags & DEEP_REMOVE) === DEEP_REMOVE) {
			for (var i = 0; i < node.body.length; i++)
				{ _removeChild(el, node.body[i].el); }
		}
		else
			{ deepUnref(node); }
	}

	delete el._node;

	parEl.removeChild(el);

	fireHook(node.hooks, "didRemove", node, null, immediate);

	if (vm != null) {
		fireHook(vm.hooks, "didUnmount", vm, vm.data, immediate);
		vm.node = null;
	}
}

// todo: should delay parent unmount() by returning res prom?
function removeChild(parEl, el) {
	var node = el._node;

	// already marked for removal
	if (node._dead) { return; }

	var res = deepNotifyRemove(node);

	if (res != null && isProm(res)) {
		node._dead = true;
		res.then(curry(_removeChild, [parEl, el, true]));
	}
	else
		{ _removeChild(parEl, el); }
}

function deepUnref(node) {
	var obody = node.body;

	for (var i = 0; i < obody.length; i++) {
		var o2 = obody[i];
		delete o2.el._node;

		if (o2.vm != null)
			{ o2.vm.node = null; }

		if (isArr(o2.body))
			{ deepUnref(o2); }
	}
}

function clearChildren(parent) {
	var parEl = parent.el;

	if ((parent.flags & DEEP_REMOVE) === 0) {
		isArr(parent.body) && deepUnref(parent);
		parEl.textContent = null;
	}
	else {
		var el = parEl.firstChild;

		do {
			var next = nextSib(el);
			removeChild(parEl, el);
		} while (el = next);
	}
}

// todo: hooks
function insertBefore(parEl, el, refEl) {
	var node = el._node, inDom = el.parentNode != null;

	// el === refEl is asserted as a no-op insert called to fire hooks
	var vm = (el === refEl || !inDom) ? node.vm : null;

	if (vm != null)
		{ fireHook(vm.hooks, "willMount", vm, vm.data); }

	fireHook(node.hooks, inDom ? "willReinsert" : "willInsert", node);
	parEl.insertBefore(el, refEl);
	fireHook(node.hooks, inDom ? "didReinsert" : "didInsert", node);

	if (vm != null)
		{ fireHook(vm.hooks, "didMount", vm, vm.data); }
}

function insertAfter(parEl, el, refEl) {
	insertBefore(parEl, el, refEl ? nextSib(refEl) : null);
}

var onemit = {};

function emitCfg(cfg) {
	assignObj(onemit, cfg);
}

function emit(evName) {
	var targ = this,
		src = targ;

	var args = sliceArgs(arguments, 1).concat(src, src.data);

	do {
		var evs = targ.onemit;
		var fn = evs ? evs[evName] : null;

		if (fn) {
			fn.apply(targ, args);
			break;
		}
	} while (targ = targ.parent());

	if (onemit[evName])
		{ onemit[evName].apply(targ, args); }
}

var onevent = noop;

function config(newCfg) {
	onevent = newCfg.onevent || onevent;

	{
		if (newCfg.onemit)
			{ emitCfg(newCfg.onemit); }
	}

	
}

function bindEv(el, type, fn) {
	el[type] = fn;
}

function exec(fn, args, e, node, vm) {
	var out = fn.apply(vm, args.concat([e, node, vm, vm.data]));

	// should these respect out === false?
	vm.onevent(e, node, vm, vm.data, args);
	onevent.call(null, e, node, vm, vm.data, args);

	if (out === false) {
		e.preventDefault();
		e.stopPropagation();
	}
}

function handle(e) {
	var node = closestVNode(e.target);
	var vm = getVm(node);

	var evDef = e.currentTarget._node.attrs["on" + e.type], fn, args;

	if (isArr(evDef)) {
		fn = evDef[0];
		args = evDef.slice(1);
		exec(fn, args, e, node, vm);
	}
	else {
		for (var sel in evDef) {
			if (e.target.matches(sel)) {
				var evDef2 = evDef[sel];

				if (isArr(evDef2)) {
					fn = evDef2[0];
					args = evDef2.slice(1);
				}
				else {
					fn = evDef2;
					args = [];
				}

				exec(fn, args, e, node, vm);
			}
		}
	}
}

function patchEvent(node, name, nval, oval) {
	if (nval === oval)
		{ return; }

	var el = node.el;

	if (nval == null || isFunc(nval))
		{ bindEv(el, name, nval); }
	else if (oval == null)
		{ bindEv(el, name, handle); }
}

function remAttr(node, name, asProp) {
	if (name[0] === ".") {
		name = name.substr(1);
		asProp = true;
	}

	if (asProp)
		{ node.el[name] = ""; }
	else
		{ node.el.removeAttribute(name); }
}

// setAttr
// diff, ".", "on*", bool vals, skip _*, value/checked/selected selectedIndex
function setAttr(node, name, val, asProp, initial) {
	var el = node.el;

	if (val == null)
		{ !initial && remAttr(node, name, false); }		// will also removeAttr of style: null
	else if (node.ns != null)
		{ el.setAttribute(name, val); }
	else if (name === "class")
		{ el.className = val; }
	else if (name === "id" || typeof val === "boolean" || asProp)
		{ el[name] = val; }
	else if (name[0] === ".")
		{ el[name.substr(1)] = val; }
	else
		{ el.setAttribute(name, val); }
}

function patchAttrs(vnode, donor, initial) {
	var nattrs = vnode.attrs || emptyObj;
	var oattrs = donor.attrs || emptyObj;

	if (nattrs === oattrs) {
		
	}
	else {
		for (var key in nattrs) {
			var nval = nattrs[key];
			var isDyn = isDynProp(vnode.tag, key);
			var oval = isDyn ? vnode.el[key] : oattrs[key];

			if (nval === oval) {}
			else if (isStyleProp(key))
				{ patchStyle(vnode, donor); }
			else if (isSplProp(key)) {}
			else if (isEvProp(key))
				{ patchEvent(vnode, key, nval, oval); }
			else
				{ setAttr(vnode, key, nval, isDyn, initial); }
		}

		// TODO: bench style.cssText = "" vs removeAttribute("style")
		for (var key in oattrs) {
			!(key in nattrs) &&
			!isSplProp(key) &&
			remAttr(vnode, key, isDynProp(vnode.tag, key) || isEvProp(key));
		}
	}
}

function createView(view, data, key, opts) {
	if (view.type === VVIEW) {
		data	= view.data;
		key		= view.key;
		opts	= view.opts;
		view	= view.view;
	}

	return new ViewModel(view, data, key, opts);
}

//import { XML_NS, XLINK_NS } from './defineSvgElement';
function hydrateBody(vnode) {
	for (var i = 0; i < vnode.body.length; i++) {
		var vnode2 = vnode.body[i];
		var type2 = vnode2.type;

		// ELEMENT,TEXT,COMMENT
		if (type2 <= COMMENT)
			{ insertBefore(vnode.el, hydrate(vnode2)); }		// vnode.el.appendChild(hydrate(vnode2))
		else if (type2 === VVIEW) {
			var vm = createView(vnode2.view, vnode2.data, vnode2.key, vnode2.opts)._redraw(vnode, i, false);		// todo: handle new data updates
			type2 = vm.node.type;
			insertBefore(vnode.el, hydrate(vm.node));
		}
		else if (type2 === VMODEL) {
			var vm = vnode2.vm;
			vm._redraw(vnode, i);					// , false
			type2 = vm.node.type;
			insertBefore(vnode.el, vm.node.el);		// , hydrate(vm.node)
		}
	}
}

//  TODO: DRY this out. reusing normal patch here negatively affects V8's JIT
function hydrate(vnode, withEl) {
	if (vnode.el == null) {
		if (vnode.type === ELEMENT) {
			vnode.el = withEl || createElement(vnode.tag, vnode.ns);

		//	if (vnode.tag === "svg")
		//		vnode.el.setAttributeNS(XML_NS, 'xmlns:xlink', XLINK_NS);

			if (vnode.attrs != null)
				{ patchAttrs(vnode, emptyObj, true); }

			if ((vnode.flags & LAZY_LIST) === LAZY_LIST)	// vnode.body instanceof LazyList
				{ vnode.body.body(vnode); }

			if (isArr(vnode.body))
				{ hydrateBody(vnode); }
			else if (vnode.body != null && vnode.body !== "")
				{ vnode.el.textContent = vnode.body; }
		}
		else if (vnode.type === TEXT)
			{ vnode.el = withEl || createTextNode(vnode.body); }
		else if (vnode.type === COMMENT)
			{ vnode.el = withEl || createComment(vnode.body); }
	}

	vnode.el._node = vnode;

	return vnode.el;
}

// prevent GCC from inlining some large funcs (which negatively affects Chrome's JIT)
//window.syncChildren = syncChildren;
window.lisMove = lisMove;

function nextNode(node, body) {
	return body[node.idx + 1];
}

function prevNode(node, body) {
	return body[node.idx - 1];
}

function parentNode(node) {
	return node.parent;
}

var BREAK = 1;
var BREAK_ALL = 2;

function syncDir(advSib, advNode, insert, sibName, nodeName, invSibName, invNodeName, invInsert) {
	return function(node, parEl, body, state, convTest, lis) {
		var sibNode, tmpSib;

		if (state[sibName] != null) {
			// skip dom elements not created by domvm
			if ((sibNode = state[sibName]._node) == null) {
				state[sibName] = advSib(state[sibName]);
				return;
			}

			if (parentNode(sibNode) !== node) {
				tmpSib = advSib(state[sibName]);
				sibNode.vm != null ? sibNode.vm.unmount(true) : removeChild(parEl, state[sibName]);
				state[sibName] = tmpSib;
				return;
			}
		}

		if (state[nodeName] == convTest)
			{ return BREAK_ALL; }
		else if (state[nodeName].el == null) {
			insert(parEl, hydrate(state[nodeName]), state[sibName]);	// should lis be updated here?
			state[nodeName] = advNode(state[nodeName], body);		// also need to advance sib?
		}
		else if (state[nodeName].el === state[sibName]) {
			state[nodeName] = advNode(state[nodeName], body);
			state[sibName] = advSib(state[sibName]);
		}
		// head->tail or tail->head
		else if (!lis && sibNode === state[invNodeName]) {
			tmpSib = state[sibName];
			state[sibName] = advSib(tmpSib);
			invInsert(parEl, tmpSib, state[invSibName]);
			state[invSibName] = tmpSib;
		}
		else {
			if (lis && state[sibName] != null)
				{ return lisMove(advSib, advNode, insert, sibName, nodeName, parEl, body, sibNode, state); }

			return BREAK;
		}
	};
}

function lisMove(advSib, advNode, insert, sibName, nodeName, parEl, body, sibNode, state) {
	if (sibNode._lis) {
		insert(parEl, state[nodeName].el, state[sibName]);
		state[nodeName] = advNode(state[nodeName], body);
	}
	else {
		// find closest tomb
		var t = binaryFindLarger(sibNode.idx, state.tombs);
		sibNode._lis = true;
		var tmpSib = advSib(state[sibName]);
		insert(parEl, state[sibName], t != null ? body[state.tombs[t]].el : t);

		if (t == null)
			{ state.tombs.push(sibNode.idx); }
		else
			{ state.tombs.splice(t, 0, sibNode.idx); }

		state[sibName] = tmpSib;
	}
}

var syncLft = syncDir(nextSib, nextNode, insertBefore, "lftSib", "lftNode", "rgtSib", "rgtNode", insertAfter);
var syncRgt = syncDir(prevSib, prevNode, insertAfter, "rgtSib", "rgtNode", "lftSib", "lftNode", insertBefore);

function syncChildren(node, donor) {
	var obody	= donor.body,
		parEl	= node.el,
		body	= node.body,
		state = {
			lftNode:	body[0],
			rgtNode:	body[body.length - 1],
			lftSib:		((obody)[0] || emptyObj).el,
			rgtSib:		(obody[obody.length - 1] || emptyObj).el,
		};

	converge:
	while (1) {
//		from_left:
		while (1) {
			var l = syncLft(node, parEl, body, state, null, false);
			if (l === BREAK) { break; }
			if (l === BREAK_ALL) { break converge; }
		}

//		from_right:
		while (1) {
			var r = syncRgt(node, parEl, body, state, state.lftNode, false);
			if (r === BREAK) { break; }
			if (r === BREAK_ALL) { break converge; }
		}

		sortDOM(node, parEl, body, state);
		break;
	}
}

// TODO: also use the state.rgtSib and state.rgtNode bounds, plus reduce LIS range
function sortDOM(node, parEl, body, state) {
	var kids = Array.prototype.slice.call(parEl.childNodes);
	var domIdxs = [];

	for (var k = 0; k < kids.length; k++) {
		var n = kids[k]._node;

		if (n.parent === node)
			{ domIdxs.push(n.idx); }
	}

	// list of non-movable vnode indices (already in correct order in old dom)
	var tombs = longestIncreasingSubsequence(domIdxs).map(function (i) { return domIdxs[i]; });

	for (var i = 0; i < tombs.length; i++)
		{ body[tombs[i]]._lis = true; }

	state.tombs = tombs;

	while (1) {
		var r = syncLft(node, parEl, body, state, null, true);
		if (r === BREAK_ALL) { break; }
	}
}

function alreadyAdopted(vnode) {
	return vnode.el._node.parent !== vnode.parent;
}

function takeSeqIndex(n, obody, fromIdx) {
	return obody[fromIdx];
}

function findSeqThorough(n, obody, fromIdx) {		// pre-tested isView?
	for (; fromIdx < obody.length; fromIdx++) {
		var o = obody[fromIdx];

		if (o.vm != null) {
			// match by key & viewFn || vm
			if (n.type === VVIEW && o.vm.view === n.view && o.vm.key === n.key || n.type === VMODEL && o.vm === n.vm)
				{ return o; }
		}
		else if (!alreadyAdopted(o) && n.tag === o.tag && n.type === o.type && n.key === o.key && (n.flags & ~DEEP_REMOVE) === (o.flags & ~DEEP_REMOVE))
			{ return o; }
	}

	return null;
}

function findHashKeyed(n, obody, fromIdx) {
	return obody[obody._keys[n.key]];
}

/*
// list must be a sorted list of vnodes by key
function findBinKeyed(n, list) {
	var idx = binaryKeySearch(list, n.key);
	return idx > -1 ? list[idx] : null;
}
*/

// have it handle initial hydrate? !donor?
// types (and tags if ELEM) are assumed the same, and donor exists
function patch(vnode, donor) {
	fireHook(donor.hooks, "willRecycle", donor, vnode);

	var el = vnode.el = donor.el;

	var obody = donor.body;
	var nbody = vnode.body;

	el._node = vnode;

	// "" => ""
	if (vnode.type === TEXT && nbody !== obody) {
		el.nodeValue = nbody;
		return;
	}

	if (vnode.attrs != null || donor.attrs != null)
		{ patchAttrs(vnode, donor, false); }

	// patch events

	var oldIsArr = isArr(obody);
	var newIsArr = isArr(nbody);
	var lazyList = (vnode.flags & LAZY_LIST) === LAZY_LIST;

//	var nonEqNewBody = nbody != null && nbody !== obody;

	if (oldIsArr) {
		// [] => []
		if (newIsArr || lazyList)
			{ patchChildren(vnode, donor); }
		// [] => "" | null
		else if (nbody !== obody) {
			if (nbody != null)
				{ el.textContent = nbody; }
			else
				{ clearChildren(donor); }
		}
	}
	else {
		// "" | null => []
		if (newIsArr) {
			clearChildren(donor);
			hydrateBody(vnode);
		}
		// "" | null => "" | null
		else if (nbody !== obody) {
			if (el.firstChild)
				{ el.firstChild.nodeValue = nbody; }
			else
				{ el.textContent = nbody; }
		}
	}

	fireHook(donor.hooks, "didRecycle", donor, vnode);
}

// larger qtys of KEYED_LIST children will use binary search
//const SEQ_FAILS_MAX = 100;

// TODO: modify vtree matcher to work similar to dom reconciler for keyed from left -> from right -> head/tail -> binary
// fall back to binary if after failing nri - nli > SEQ_FAILS_MAX
// while-advance non-keyed fromIdx
// [] => []
function patchChildren(vnode, donor) {
	var nbody		= vnode.body,
		nlen		= nbody.length,
		obody		= donor.body,
		olen		= obody.length,
		isLazy		= (vnode.flags & LAZY_LIST) === LAZY_LIST,
		isFixed		= (vnode.flags & FIXED_BODY) === FIXED_BODY,
		isKeyed		= (vnode.flags & KEYED_LIST) === KEYED_LIST,
		domSync		= !isFixed && vnode.type === ELEMENT,
		doFind		= true,
		find		= (
			isKeyed ? findHashKeyed :				// keyed lists/lazyLists
			isFixed || isLazy ? takeSeqIndex :		// unkeyed lazyLists and FIXED_BODY
			findSeqThorough							// more complex stuff
		);

	if (isKeyed) {
		var keys = {};
		for (var i = 0; i < obody.length; i++)
			{ keys[obody[i].key] = i; }
		obody._keys = keys;
	}

	if (domSync && nlen === 0) {
		clearChildren(donor);
		if (isLazy)
			{ vnode.body = []; }	// nbody.tpl(all);
		return;
	}

	var donor2,
		node2,
		foundIdx,
		patched = 0,
		everNonseq = false,
		fromIdx = 0;		// first unrecycled node (search head)

	if (isLazy) {
		var fnode2 = {key: null};
		var nbodyNew = Array(nlen);
	}

	for (var i = 0; i < nlen; i++) {
		if (isLazy) {
			var remake = false;
			var diffRes = null;

			if (doFind) {
				if (isKeyed)
					{ fnode2.key = nbody.key(i); }

				donor2 = find(fnode2, obody, fromIdx);
			}

			if (donor2 != null) {
                foundIdx = donor2.idx;
				diffRes = nbody.diff(i, donor2);

				// diff returns same, so cheaply adopt vnode without patching
				if (diffRes === true) {
					node2 = donor2;
					node2.parent = vnode;
					node2.idx = i;
					node2._lis = false;
				}
				// diff returns new diffVals, so generate new vnode & patch
				else
					{ remake = true; }
			}
			else
				{ remake = true; }

			if (remake) {
				node2 = nbody.tpl(i);			// what if this is a VVIEW, VMODEL, injected element?
				preProc(node2, vnode, i);

				node2._diff = diffRes != null ? diffRes : nbody.diff(i);

				if (donor2 != null)
					{ patch(node2, donor2); }
			}
			else {
				// TODO: flag tmp FIXED_BODY on unchanged nodes?

				// domSync = true;		if any idx changes or new nodes added/removed
			}

			nbodyNew[i] = node2;
		}
		else {
			var node2 = nbody[i];
			var type2 = node2.type;

			// ELEMENT,TEXT,COMMENT
			if (type2 <= COMMENT) {
				if (donor2 = doFind && find(node2, obody, fromIdx)) {
					patch(node2, donor2);
					foundIdx = donor2.idx;
				}
			}
			else if (type2 === VVIEW) {
				if (donor2 = doFind && find(node2, obody, fromIdx)) {		// update/moveTo
					foundIdx = donor2.idx;
					var vm = donor2.vm._update(node2.data, vnode, i);		// withDOM
				}
				else
					{ var vm = createView(node2.view, node2.data, node2.key, node2.opts)._redraw(vnode, i, false); }	// createView, no dom (will be handled by sync below)

				type2 = vm.node.type;
			}
			else if (type2 === VMODEL) {
				// if the injected vm has never been rendered, this vm._update() serves as the
				// initial vtree creator, but must avoid hydrating (creating .el) because syncChildren()
				// which is responsible for mounting below (and optionally hydrating), tests .el presence
				// to determine if hydration & mounting are needed
				var withDOM = isHydrated(node2.vm);

				var vm = node2.vm._update(node2.data, vnode, i, withDOM);
				type2 = vm.node.type;
			}
		}

		// found donor & during a sequential search ...at search head
		if (!isKeyed && donor2 != null) {
			if (foundIdx === fromIdx) {
				// advance head
				fromIdx++;
				// if all old vnodes adopted and more exist, stop searching
				if (fromIdx === olen && nlen > olen) {
					// short-circuit find, allow loop just create/init rest
					donor2 = null;
					doFind = false;
				}
			}
			else
				{ everNonseq = true; }

			if (olen > 100 && everNonseq && ++patched % 10 === 0)
				{ while (fromIdx < olen && alreadyAdopted(obody[fromIdx]))
					{ fromIdx++; } }
		}
	}

	// replace List w/ new body
	if (isLazy)
		{ vnode.body = nbodyNew; }

	domSync && syncChildren(vnode, donor);
}

// view + key serve as the vm's unique identity
function ViewModel(view, data, key, opts) {
	var vm = this;

	vm.view = view;
	vm.data = data;
	vm.key = key;

	if (opts) {
		vm.opts = opts;
		vm.config(opts);
	}

	var out = isPlainObj(view) ? view : view.call(vm, vm, data, key, opts);

	if (isFunc(out))
		{ vm.render = out; }
	else {
		vm.render = out.render;
		vm.config(out);
	}

	// these must be wrapped here since they're debounced per view
	vm._redrawAsync = raft(function (_) { return vm.redraw(true); });
	vm._updateAsync = raft(function (newData) { return vm.update(newData, true); });

	vm.init && vm.init.call(vm, vm, vm.data, vm.key, opts);
}

var ViewModelProto = ViewModel.prototype = {
	constructor: ViewModel,

	_diff:	null,	// diff cache

	init:	null,
	view:	null,
	key:	null,
	data:	null,
	state:	null,
	api:	null,
	opts:	null,
	node:	null,
	hooks:	null,
	onevent: noop,
	refs:	null,
	render:	null,

	mount: mount,
	unmount: unmount,
	config: function(opts) {
		var t = this;

		if (opts.init)
			{ t.init = opts.init; }
		if (opts.diff)
			{ t.diff = opts.diff; }
		if (opts.onevent)
			{ t.onevent = opts.onevent; }

		// maybe invert assignment order?
		if (opts.hooks)
			{ t.hooks = assignObj(t.hooks || {}, opts.hooks); }

		{
			if (opts.onemit)
				{ t.onemit = assignObj(t.onemit || {}, opts.onemit); }
		}
	},
	parent: function() {
		return getVm(this.node.parent);
	},
	root: function() {
		var p = this.node;

		while (p.parent)
			{ p = p.parent; }

		return p.vm;
	},
	redraw: function(sync) {
		var vm = this;
		sync ? vm._redraw(null, null, isHydrated(vm)) : vm._redrawAsync();
		return vm;
	},
	update: function(newData, sync) {
		var vm = this;
		sync ? vm._update(newData, null, null, isHydrated(vm)) : vm._updateAsync(newData);
		return vm;
	},

	_update: updateSync,
	_redraw: redrawSync,
	_redrawAsync: null,
	_updateAsync: null,
};

function mount(el, isRoot) {
	var vm = this;

	if (isRoot) {
		clearChildren({el: el, flags: 0});

		vm._redraw(null, null, false);

		// if placeholder node doesnt match root tag
		if (el.nodeName.toLowerCase() !== vm.node.tag) {
			hydrate(vm.node);
			insertBefore(el.parentNode, vm.node.el, el);
			el.parentNode.removeChild(el);
		}
		else
			{ insertBefore(el.parentNode, hydrate(vm.node, el), el); }
	}
	else {
		vm._redraw(null, null);

		if (el)
			{ insertBefore(el, vm.node.el); }
	}

	if (el)
		{ drainDidHooks(vm); }

	return vm;
}

// asSub means this was called from a sub-routine, so don't drain did* hook queue
function unmount(asSub) {
	var vm = this;

	var node = vm.node;
	var parEl = node.el.parentNode;

	// edge bug: this could also be willRemove promise-delayed; should .then() or something to make sure hooks fire in order
	removeChild(parEl, node.el);

	if (!asSub)
		{ drainDidHooks(vm); }
}

function reParent(vm, vold, newParent, newIdx) {
	if (newParent != null) {
		newParent.body[newIdx] = vold;
		vold.idx = newIdx;
		vold.parent = newParent;
		vold._lis = false;
	}
	return vm;
}

function redrawSync(newParent, newIdx, withDOM) {
	var isRedrawRoot = newParent == null;
	var vm = this;
	var isMounted = vm.node && vm.node.el && vm.node.el.parentNode;

	var vold = vm.node, oldDiff, newDiff;

	if (vm.diff != null) {
		oldDiff = vm._diff;
		vm._diff = newDiff = vm.diff(vm, vm.data);

		if (vold != null) {
			var cmpFn = isArr(oldDiff) ? cmpArr : cmpObj;
			var isSame = oldDiff === newDiff || cmpFn(oldDiff, newDiff);

			if (isSame)
				{ return reParent(vm, vold, newParent, newIdx); }
		}
	}

	isMounted && fireHook(vm.hooks, "willRedraw", vm, vm.data);

	var vnew = vm.render.call(vm, vm, vm.data, oldDiff, newDiff);

	if (vnew === vold)
		{ return reParent(vm, vold, newParent, newIdx); }

	// todo: test result of willRedraw hooks before clearing refs
	vm.refs = null;

	// always assign vm key to root vnode (this is a de-opt)
	if (vm.key != null && vnew.key !== vm.key)
		{ vnew.key = vm.key; }

	vm.node = vnew;

	if (newParent) {
		preProc(vnew, newParent, newIdx, vm);
		newParent.body[newIdx] = vnew;
	}
	else if (vold && vold.parent) {
		preProc(vnew, vold.parent, vold.idx, vm);
		vold.parent.body[vold.idx] = vnew;
	}
	else
		{ preProc(vnew, null, null, vm); }

	if (withDOM !== false) {
		if (vold) {
			// root node replacement
			if (vold.tag !== vnew.tag || vold.key !== vnew.key) {
				// hack to prevent the replacement from triggering mount/unmount
				vold.vm = vnew.vm = null;

				var parEl = vold.el.parentNode;
				var refEl = nextSib(vold.el);
				removeChild(parEl, vold.el);
				insertBefore(parEl, hydrate(vnew), refEl);

				// another hack that allows any higher-level syncChildren to set
				// reconciliation bounds using a live node
				vold.el = vnew.el;

				// restore
				vnew.vm = vm;
			}
			else
				{ patch(vnew, vold); }
		}
		else
			{ hydrate(vnew); }
	}

	isMounted && fireHook(vm.hooks, "didRedraw", vm, vm.data);

	if (isRedrawRoot && isMounted)
		{ drainDidHooks(vm); }

	return vm;
}

// this also doubles as moveTo
// TODO? @withRedraw (prevent redraw from firing)
function updateSync(newData, newParent, newIdx, withDOM) {
	var vm = this;

	if (newData != null) {
		if (vm.data !== newData) {
			fireHook(vm.hooks, "willUpdate", vm, newData);
			vm.data = newData;

			
		}
	}

	return vm._redraw(newParent, newIdx, withDOM);
}

function defineElement(tag, arg1, arg2, flags) {
	var attrs, body;

	if (arg2 == null) {
		if (isPlainObj(arg1))
			{ attrs = arg1; }
		else
			{ body = arg1; }
	}
	else {
		attrs = arg1;
		body = arg2;
	}

	return initElementNode(tag, attrs, body, flags);
}

//export const XML_NS = "http://www.w3.org/2000/xmlns/";
var SVG_NS = "http://www.w3.org/2000/svg";

function defineSvgElement(tag, arg1, arg2, flags) {
	var n = defineElement(tag, arg1, arg2, flags);
	n.ns = SVG_NS;
	return n;
}

function defineComment(body) {
	var node = new VNode;
	node.type = COMMENT;
	node.body = body;
	return node;
}

// placeholder for declared views
function VView(view, data, key, opts) {
	this.view = view;
	this.data = data;
	this.key = key;
	this.opts = opts;
}

VView.prototype = {
	constructor: VView,

	type: VVIEW,
	view: null,
	data: null,
	key: null,
	opts: null,
};

function defineView(view, data, key, opts) {
	return new VView(view, data, key, opts);
}

// placeholder for injected ViewModels
function VModel(vm) {
	this.vm = vm;
}

VModel.prototype = {
	constructor: VModel,

	type: VMODEL,
	vm: null,
};

function injectView(vm) {
//	if (vm.node == null)
//		vm._redraw(null, null, false);

//	return vm.node;

	return new VModel(vm);
}

function injectElement(el) {
	var node = new VNode;
	node.type = ELEMENT;
	node.el = node.key = el;
	return node;
}

function lazyList(items, cfg) {
	var len = items.length;

	var self = {
		items: items,
		length: len,
		// defaults to returning item identity (or position?)
		key: function(i) {
			return cfg.key(items[i], i);
		},
		// default returns 0?
		diff: function(i, donor) {
			var newVals = cfg.diff(items[i], i);
			if (donor == null)
				{ return newVals; }
			var oldVals = donor._diff;
			var same = newVals === oldVals || isArr(oldVals) ? cmpArr(newVals, oldVals) : cmpObj(newVals, oldVals);
			return same || newVals;
		},
		tpl: function(i) {
			return cfg.tpl(items[i], i);
		},
		map: function(tpl) {
			cfg.tpl = tpl;
			return self;
		},
		body: function(vnode) {
			var nbody = Array(len);

			for (var i = 0; i < len; i++) {
				var vnode2 = self.tpl(i);

			//	if ((vnode.flags & KEYED_LIST) === KEYED_LIST && self. != null)
			//		vnode2.key = getKey(item);

				vnode2._diff = self.diff(i);			// holds oldVals for cmp

				nbody[i] = vnode2;

				// run preproc pass (should this be just preProc in above loop?) bench
				preProc(vnode2, vnode, i);
			}

			// replace List with generated body
			vnode.body = nbody;
		}
	};

	return self;
}

var nano = {
	config: config,

	ViewModel: ViewModel,
	VNode: VNode,

	createView: createView,

	defineElement: defineElement,
	defineSvgElement: defineSvgElement,
	defineText: defineText,
	defineComment: defineComment,
	defineView: defineView,

	injectView: injectView,
	injectElement: injectElement,

	lazyList: lazyList,

	FIXED_BODY: FIXED_BODY,
	DEEP_REMOVE: DEEP_REMOVE,
	KEYED_LIST: KEYED_LIST,
	LAZY_LIST: LAZY_LIST,
};

function protoPatch(n, doRepaint) {
	patch$1(this, n, doRepaint);
}

// newNode can be either {class: style: } or full new VNode
// will/didPatch hooks?
function patch$1(o, n, doRepaint) {
	if (n.type != null) {
		// no full patching of view roots, just use redraw!
		if (o.vm != null)
			{ return; }

		preProc(n, o.parent, o.idx, null);
		o.parent.body[o.idx] = n;
		patch(n, o);
		doRepaint && repaint(n);
		drainDidHooks(getVm(n));
	}
	else {
		// TODO: re-establish refs

		// shallow-clone target
		var donor = Object.create(o);
		// fixate orig attrs
		donor.attrs = assignObj({}, o.attrs);
		// assign new attrs into live targ node
		var oattrs = assignObj(o.attrs, n);
		// prepend any fixed shorthand class
		if (o._class != null) {
			var aclass = oattrs.class;
			oattrs.class = aclass != null && aclass !== "" ? o._class + " " + aclass : o._class;
		}

		patchAttrs(o, donor);

		doRepaint && repaint(o);
	}
}

VNodeProto.patch = protoPatch;

function nextSubVms(n, accum) {
	var body = n.body;

	if (isArr(body)) {
		for (var i = 0; i < body.length; i++) {
			var n2 = body[i];

			if (n2.vm != null)
				{ accum.push(n2.vm); }
			else
				{ nextSubVms(n2, accum); }
		}
	}

	return accum;
}

function defineElementSpread(tag) {
	var args = arguments;
	var len = args.length;
	var body, attrs;

	if (len > 1) {
		var bodyIdx = 1;

		if (isPlainObj(args[1])) {
			attrs = args[1];
			bodyIdx = 2;
		}

		if (len === bodyIdx + 1 && (isVal(args[bodyIdx]) || isArr(args[bodyIdx]) || attrs && (attrs._flags & LAZY_LIST) === LAZY_LIST))
			{ body = args[bodyIdx]; }
		else
			{ body = sliceArgs(args, bodyIdx); }
	}

	return initElementNode(tag, attrs, body);
}

function defineSvgElementSpread() {
	var n = defineElementSpread.apply(null, arguments);
	n.ns = SVG_NS;
	return n;
}

ViewModelProto.emit = emit;
ViewModelProto.onemit = null;

ViewModelProto.body = function() {
	return nextSubVms(this.node, []);
};

nano.defineElementSpread = defineElementSpread;
nano.defineSvgElementSpread = defineSvgElementSpread;

return nano;

})));
//# sourceMappingURL=domvm.micro.js.map


/***/ }),
/* 40 */
/***/ (function(module, exports) {

if (Element && !Element.prototype.matches) {
    var proto = Element.prototype;
    proto.matches = proto.matchesSelector ||
        proto.mozMatchesSelector || proto.msMatchesSelector ||
        proto.oMatchesSelector || proto.webkitMatchesSelector;
}


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(42));


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Cell_1 = __webpack_require__(43);
var dom_1 = __webpack_require__(0);
var Layout = /** @class */ (function (_super) {
    __extends(Layout, _super);
    function Layout(parent, config) {
        var _this = _super.call(this, parent, config) || this;
        // root layout
        _this._root = _this.config.parent || _this;
        _this._all = {};
        _this._parseConfig();
        if (_this.config.views) {
            _this.config.activeView = _this.config.activeView || _this._cells[0].id;
            _this._isViewLayout = true;
        }
        if (!config.parent) {
            var view = dom_1.create({ render: function () { return _this.toVDOM(); } }, _this);
            _this.mount(parent, view);
        }
        return _this;
    }
    Layout.prototype.cell = function (id) {
        // FIXME
        return this._root._all[id];
    };
    Layout.prototype.toVDOM = function () {
        if (this._isViewLayout) {
            var roots = [this.cell(this.config.activeView).toVDOM()];
            return _super.prototype.toVDOM.call(this, roots);
        }
        var nodes = [];
        this._cells.forEach(function (cell) {
            var node = cell.toVDOM();
            if (Array.isArray(node)) {
                nodes = nodes.concat(node);
            }
            else {
                nodes.push(node);
            }
        });
        return _super.prototype.toVDOM.call(this, nodes);
    };
    Layout.prototype.removeCell = function (id) {
        var root = (this.config.parent || this);
        if (root !== this) {
            return root.removeCell(id);
        }
        // this === root layout
        var view = this.cell(id);
        if (view) {
            var parent_1 = view.getParent();
            delete this._all[id];
            parent_1._cells = parent_1._cells.filter(function (cell) { return cell.id !== id; });
            parent_1.paint();
        }
    };
    Layout.prototype.addCell = function (config, index) {
        if (index === void 0) { index = -1; }
        var view = this._createCell(config);
        if (index < 0) {
            index = this._cells.length + index + 1;
        }
        this._cells.splice(index, 0, view);
        this.paint();
    };
    Layout.prototype.getId = function (index) {
        if (index < 0) {
            index = this._cells.length + index;
        }
        return this._cells[index] ? this._cells[index].id : undefined;
    };
    Layout.prototype.getRefs = function (name) {
        return this._root.getRootView().refs[name];
    };
    Layout.prototype._getCss = function (content) {
        if (content) {
            return (this._xLayout ? " dhx_layout-columns" : " dhx_layout-rows");
        }
        else {
            return (this.config.parent ? _super.prototype._getCss.call(this) : "dhx_widget dhx_layout") +
                (this.config.full
                    ? (!this.config.parent
                        ? " dhx_layout-cell"
                        : "")
                    : (this._xLayout ? " dhx_layout-columns" : " dhx_layout-rows"));
        }
    };
    Layout.prototype._parseConfig = function () {
        var _this = this;
        var config = this.config;
        var cells = config.rows || config.cols || config.views;
        this._xLayout = !config.rows;
        this._cells = cells.map(function (a) { return _this._createCell(a); });
    };
    Layout.prototype._createCell = function (cell) {
        var view;
        if (cell.rows || cell.cols || cell.views) {
            cell.parent = this._root;
            view = new Layout(this, cell);
        }
        else {
            view = new Cell_1.Cell(this, cell);
        }
        // FIxME
        this._root._all[view.id] = view;
        return view;
    };
    return Layout;
}(Cell_1.Cell));
exports.Layout = Layout;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(3);
var dom_1 = __webpack_require__(0);
var view_1 = __webpack_require__(8);
var resizeMode;
(function (resizeMode) {
    resizeMode[resizeMode["unknown"] = 0] = "unknown";
    resizeMode[resizeMode["percents"] = 1] = "percents";
    resizeMode[resizeMode["pixels"] = 2] = "pixels";
    resizeMode[resizeMode["mixedpx1"] = 3] = "mixedpx1";
    resizeMode[resizeMode["mixedpx2"] = 4] = "mixedpx2";
    resizeMode[resizeMode["mixedperc1"] = 5] = "mixedperc1";
    resizeMode[resizeMode["mixedperc2"] = 6] = "mixedperc2";
})(resizeMode || (resizeMode = {}));
function getResizeMode(dir, conf1, conf2) {
    var field = dir ? "width" : "height";
    var is1perc = conf1[field] && conf1[field].indexOf("%") !== -1;
    var is2perc = conf2[field] && conf2[field].indexOf("%") !== -1;
    var is1px = conf1[field] && conf1[field].indexOf("px") !== -1;
    var is2px = conf2[field] && conf2[field].indexOf("px") !== -1;
    if (is1perc && is2perc) {
        return resizeMode.percents;
    }
    if (is1px && is2px) {
        return resizeMode.pixels;
    }
    if (is1px && !is2px) {
        return resizeMode.mixedpx1;
    }
    if (is2px && !is1px) {
        return resizeMode.mixedpx2;
    }
    if (is1perc) {
        return resizeMode.mixedperc1;
    }
    if (is2perc) {
        return resizeMode.mixedperc2;
    }
    return resizeMode.unknown;
}
function getBlockRange(block1, block2, isXLayout) {
    if (isXLayout === void 0) { isXLayout = true; }
    if (isXLayout) {
        return {
            min: block1.left + window.pageXOffset,
            max: block2.right + window.pageXOffset
        };
    }
    return {
        min: block1.top + window.pageYOffset,
        max: block2.bottom + window.pageYOffset
    };
}
var Cell = /** @class */ (function (_super) {
    __extends(Cell, _super);
    function Cell(parent, config) {
        var _this = _super.call(this, parent, config) || this;
        var p = parent;
        if (p && p.isVisible) {
            _this._parent = p;
        }
        _this.config.full = _this.config.full === undefined ? Boolean(_this.config.header || _this.config.footer) : _this.config.full;
        _this._initHandlers();
        _this.id = _this.config.id || core_1.uid();
        return _this;
    }
    Cell.prototype.paint = function () {
        if (this.isVisible()) {
            var view = this.getRootView();
            if (view) {
                view.redraw();
            }
            else {
                this._parent.paint();
            }
        }
    };
    Cell.prototype.isVisible = function () {
        // top level node
        if (!this._parent) {
            if (this._container && this._container.tagName) {
                return true;
            }
            return false;
        }
        // check active view in case of multiview
        var active = this._parent.config.activeView;
        if (active && active !== this.id) {
            return false;
        }
        // check that all parents of the cell are visible as well
        return !this.config.hidden && (!this._parent || this._parent.isVisible());
    };
    Cell.prototype.hide = function () {
        this.config.hidden = true;
        if (this._parent && this._parent.paint) {
            this._parent.paint();
        }
    };
    Cell.prototype.show = function () {
        if (this._parent && this._parent.config.activeView) {
            this._parent.config.activeView = this.id;
        }
        else {
            this.config.hidden = false;
        }
        if (this._parent && !this._parent.isVisible()) {
            this._parent.show();
        }
        this.paint();
    };
    Cell.prototype.getParent = function () {
        return this._parent;
    };
    Cell.prototype.destructor = function () {
        this.config = null;
    };
    Cell.prototype.getWidget = function () {
        return this._ui;
    };
    Cell.prototype.getCellView = function () {
        return this._parent && this._parent.getRefs(this._uid);
    };
    Cell.prototype.attach = function (name, config) {
        if (typeof name === "object") {
            name._container = this;
            this._ui = name;
        }
        else if (typeof name === "string") {
            this._ui = new window.dhx[name](null, config);
        }
        else if (typeof name === "function") {
            if (name.prototype instanceof view_1.View) {
                this._ui = new name(null, config);
            }
            else {
                this._ui = {
                    getRootView: function () {
                        return name(config);
                    }
                };
            }
        }
        this.paint();
        return this._ui;
    };
    Cell.prototype.toVDOM = function (nodes) {
        var _a;
        var conf = this.config;
        if (conf.hidden) {
            return;
        }
        var style = this._calculateStyle();
        var kids;
        if (this.config.html) {
            kids = [dom_1.el(".dhx_inner-html-content", { ".innerHTML": this.config.html })];
        }
        else if (this._ui) {
            var view = this._ui.getRootView();
            if (view.render) {
                view = dom_1.inject(view);
            }
            kids = [view];
        }
        else {
            kids = nodes || null;
        }
        var resizer = this.config.canResize && !this._isLastCell() ?
            dom_1.el(".dhx_layout-resizer." + (this._isXDirection() ? "dhx_layout-resizer--x" : "dhx_layout-resizer--y"), __assign({}, this._resizerHandlers, { _ref: "resizer_" + this._uid }), [dom_1.el("span.dhx_layout-resizer__icon", {
                    class: "dxi " + (this._isXDirection() ? "dxi-dots-vertical" : "dxi-dots-horizontal")
                })]) : null;
        var handlers = {};
        if (this.config.on) {
            for (var key in this.config.on) {
                handlers["on" + key] = this.config.on[key];
            }
        }
        var cell = dom_1.el("div", __assign((_a = { _key: this._uid, style: style, _ref: this._uid, id: this.config.id || this._uid }, _a["aria-labelledby"] = this.config.id ? "tab-content-" + this.config.id : null, _a), handlers, { class: "" + this._getCss(false) + (this.config.css ? " " + this.config.css : "") }), this.config.full ? [
            this.config.header ? dom_1.el("div", {
                class: "dhx_layout-cell-header" +
                    ("" + (this.config.collapsed ? " dhx_layout-cell-header--collapsed" : "")) +
                    ("" + (this.config.canCollapse ? " dhx_layout-cell-header--collapseble" : "")),
                onclick: this._handlers.collapse
            }, [
                this.config.headerIcon && dom_1.el("span.dhx_layout-cell-header__icon.dxi." + this.config.headerIcon),
                dom_1.el(".dhx_layout-cell-header__title", this.config.header),
                this.config.canCollapse ? dom_1.el("div.dhx_layout-cell-header__collapse-icon", {
                    "tabindex": "0",
                    "role": "button",
                    "aria-label": "collapse",
                    "class": "dxi dxi-chevron-down"
                }) : null,
            ]) : null,
            !this.config.collapsed ? dom_1.el("div", {
                class: "dhx_layout-cell--content" + this._getCss(true),
            }, kids) : null,
        ] : kids);
        return resizer ? [
            cell,
            resizer
        ] : cell;
    };
    Cell.prototype._getCss = function (content) {
        return "dhx_layout-cell ";
    };
    Cell.prototype._initHandlers = function () {
        var _this = this;
        var blockOpts = {
            left: null,
            top: null,
            isActive: false,
            range: null,
            xLayout: null,
            nextCell: null,
            size: null,
            resizerLength: null,
            mode: null,
            percentsum: null
        };
        var mouseUp = function () {
            blockOpts.isActive = false;
            document.body.classList.remove("dhx_no-select");
            document.removeEventListener("mouseup", mouseUp);
            document.removeEventListener("mousemove", mouseMove);
        };
        var mouseMove = function (e) {
            if (!blockOpts.isActive || blockOpts.mode === resizeMode.unknown) {
                return;
            }
            var newValue = blockOpts.xLayout ? e.x - blockOpts.range.min - window.pageXOffset :
                e.y - blockOpts.range.min - window.pageYOffset;
            var prop = blockOpts.xLayout ? "width" : "height";
            if (newValue < 0) {
                newValue = blockOpts.resizerLength / 2;
            }
            else if (newValue > blockOpts.size) {
                newValue = blockOpts.size - blockOpts.resizerLength;
            }
            switch (blockOpts.mode) {
                case resizeMode.pixels:
                    _this.config[prop] = newValue - blockOpts.resizerLength / 2 + "px";
                    blockOpts.nextCell.config[prop] = blockOpts.size - newValue - blockOpts.resizerLength / 2 + "px";
                    break;
                case resizeMode.mixedpx1:
                    _this.config[prop] = newValue - blockOpts.resizerLength / 2 + "px";
                    break;
                case resizeMode.mixedpx2:
                    blockOpts.nextCell.config[prop] = blockOpts.size - newValue - blockOpts.resizerLength / 2 + "px";
                    break;
                case resizeMode.percents:
                    _this.config[prop] = newValue / blockOpts.size * blockOpts.percentsum + "%";
                    blockOpts.nextCell.config[prop] = (blockOpts.size - newValue) / blockOpts.size * blockOpts.percentsum + "%";
                    break;
                case resizeMode.mixedperc1:
                    _this.config[prop] = newValue / blockOpts.size * blockOpts.percentsum + "%";
                    break;
                case resizeMode.mixedperc2:
                    blockOpts.nextCell.config[prop] = (blockOpts.size - newValue) / blockOpts.size * blockOpts.percentsum + "%";
                    break;
            }
            _this.paint();
        };
        this._handlers = {
            collapse: function () {
                if (!_this.config.canCollapse) {
                    return;
                }
                _this.config.collapsed = !_this.config.collapsed;
                _this.paint();
            }
        };
        this._resizerHandlers = {
            onmousedown: function (e) {
                if (e.which === 3) {
                    return;
                }
                if (blockOpts.isActive) {
                    mouseUp();
                }
                document.body.classList.add("dhx_no-select");
                var block = _this.getCellView();
                var nextCell = _this._getNextCell();
                var nextBlock = nextCell.getCellView();
                var resizerBlock = _this._getResizerView();
                var blockOffsets = block.el.getBoundingClientRect();
                var resizerOffsets = resizerBlock.el.getBoundingClientRect();
                var nextBlockOffsets = nextBlock.el.getBoundingClientRect();
                blockOpts.xLayout = _this._isXDirection();
                blockOpts.left = blockOffsets.left + window.pageXOffset;
                blockOpts.top = blockOffsets.top + window.pageYOffset;
                blockOpts.range = getBlockRange(blockOffsets, nextBlockOffsets, blockOpts.xLayout);
                blockOpts.size = blockOpts.range.max - blockOpts.range.min;
                blockOpts.isActive = true;
                blockOpts.nextCell = nextCell;
                blockOpts.resizerLength = blockOpts.xLayout ? resizerOffsets.width : resizerOffsets.height;
                blockOpts.mode = getResizeMode(blockOpts.xLayout, _this.config, nextCell.config);
                if (blockOpts.mode === resizeMode.percents) {
                    var field = blockOpts.xLayout ? "width" : "height";
                    blockOpts.percentsum = parseFloat(_this.config[field]) + parseFloat(nextCell.config[field]);
                }
                if (blockOpts.mode === resizeMode.mixedperc1) {
                    var field = blockOpts.xLayout ? "width" : "height";
                    blockOpts.percentsum = 1 / (blockOffsets[field] / (blockOpts.size - blockOpts.resizerLength)) * parseFloat(_this.config[field]);
                }
                if (blockOpts.mode === resizeMode.mixedperc2) {
                    var field = blockOpts.xLayout ? "width" : "height";
                    blockOpts.percentsum = 1 / (nextBlockOffsets[field] / (blockOpts.size - blockOpts.resizerLength)) * parseFloat(nextCell.config[field]);
                }
                document.addEventListener("mouseup", mouseUp);
                document.addEventListener("mousemove", mouseMove);
            },
            ondragstart: function (e) { return e.preventDefault(); }
        };
    };
    Cell.prototype._isLastCell = function () {
        var parent = this._parent;
        return parent && parent._cells.indexOf(this) === parent._cells.length - 1;
    };
    Cell.prototype._getNextCell = function () {
        var parent = this._parent;
        var index = parent._cells.indexOf(this);
        return parent._cells[index + 1];
    };
    Cell.prototype._getResizerView = function () {
        return this._parent.getRefs("resizer_" + this._uid);
    };
    Cell.prototype._isXDirection = function () {
        return this._parent && this._parent._xLayout;
    };
    Cell.prototype._calculateStyle = function () {
        var conf = this.config;
        var style = {};
        if (this._isXDirection()) {
            if (this.config.width !== undefined) {
                style.flexBasis = conf.width;
            }
            if (conf.height !== undefined) {
                style.height = conf.height;
            }
        }
        else {
            if (this.config.height !== undefined) {
                style.flexBasis = conf.height;
            }
            if (conf.width !== undefined) {
                style.width = conf.width;
            }
        }
        return style;
    };
    return Cell;
}(view_1.View));
exports.Cell = Cell;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(3);
var dom_1 = __webpack_require__(0);
var html_1 = __webpack_require__(1);
var ts_menu_1 = __webpack_require__(22);
var ts_message_1 = __webpack_require__(28);
function addInGroups(groups, item) {
    if (groups[item.group]) {
        if (item.active) {
            groups[item.group].active = item.id;
        }
        groups[item.group].elements.push(item.id);
    }
    else {
        groups[item.group] = {
            active: item.active ? item.id : null,
            elements: [item.id]
        };
    }
}
var Toolbar = /** @class */ (function (_super) {
    __extends(Toolbar, _super);
    function Toolbar(element, config) {
        var _this = _super.call(this, element, core_1.extend({
            navigationType: "click"
        }, config)) || this;
        _this._listeners = {
            input: function (e) {
                var id = html_1.locate(e);
                _this.data.update(id, { value: e.target.value });
            },
            tooltip: function (e) {
                var elem = html_1.locateNode(e);
                if (!elem) {
                    return;
                }
                var id = elem.getAttribute("dhx_id");
                var item = _this.data.getItem(id);
                if (item.tooltip) {
                    ts_message_1.tooltip(item.tooltip, {
                        node: elem,
                        position: ts_message_1.Position.bottom
                    });
                }
            }
        };
        _this._currentRoot = null;
        _this._factory = ts_menu_1.createFactory(ts_menu_1.ItemType.button);
        var render = function () { return _this._draw(); };
        _this.mount(element, dom_1.create({ render: render }));
        return _this;
    }
    Toolbar.prototype.getValues = function () {
        var state = {};
        this.data.eachChild(this.data.getRoot(), function (item) {
            if (item.twoState) {
                state[item.id] = item.active;
            }
            else if (item.type === ts_menu_1.ItemType.input) {
                state[item.id] = item.value;
            }
        }, false);
        for (var key in this._groups) {
            if (this._groups[key].active) {
                state[key] = this._groups[key].active;
            }
        }
        return state;
    };
    Toolbar.prototype.setValues = function (state) {
        for (var key in state) {
            if (this._groups[key]) {
                if (this._groups[key].active) {
                    this.data.update(this._groups[key].active, { active: false });
                    this._groups[key].active = state[key];
                    this.data.update(state[key], { active: true });
                }
            }
            else {
                var item = this.data.getItem(key);
                if (item.type === ts_menu_1.ItemType.input) {
                    this.data.update(key, { value: state[key] });
                }
                else {
                    this.data.update(key, { active: state[key] });
                }
            }
        }
    };
    Toolbar.prototype._draw = function () {
        var _this = this;
        return dom_1.el("nav.dhx_toolbar.dhx_widget" + (this.config.css ? "." + this.config.css : ""), [
            dom_1.el("ul.dhx_toolbar__list", {
                dhx_widget_id: this._uid,
                tabindex: 0,
                onclick: this._handlers.onclick,
                onmousedown: this._handlers.onmousedown,
                oninput: this._listeners.input,
                onmouseover: this._listeners.tooltip,
                _hooks: {
                    didInsert: function (node) {
                        node.el.addEventListener("keyup", function (e) {
                            if (e.which !== 9) {
                                return;
                            }
                            var elem = html_1.locateNode(document.activeElement);
                            if (!elem) {
                                return;
                            }
                            var id = elem.getAttribute("dhx_id");
                            var item = _this.data.getItem(id);
                            if (item.tooltip) {
                                ts_message_1.tooltip(item.tooltip, {
                                    node: elem,
                                    position: ts_message_1.Position.bottom,
                                    force: true
                                });
                            }
                        }, true);
                    }
                }
            }, this.data.map(function (item) { return _this._factory(item, _this.events); }, this.data.getRoot(), false))
        ]);
    };
    Toolbar.prototype._getMode = function (item, root) {
        return item.id === root ? "bottom" : "right";
    };
    Toolbar.prototype._close = function () {
        this._activePosition = null;
        this._currentRoot = null;
        _super.prototype._close.call(this);
    };
    Toolbar.prototype._normalizeData = function () {
        var _this = this;
        var root = this.data.getRoot();
        var groups = {};
        this.data.eachChild(root, function (item) {
            if (item.type === ts_menu_1.ItemType.separator) {
                item.$menuSeparator = item.parent !== _this.data.getRoot();
            }
            if (_this.data.haveItems(item.id)) {
                _this.data.eachChild(item.id, function (child) { return child.type = child.type || ts_menu_1.ItemType.menuItem; }, false);
                if (item.parent !== root) {
                    item.$openIcon = "right";
                }
                else {
                    item.$openIcon = "bot";
                }
            }
            if (item.group) {
                addInGroups(groups, item);
            }
        }, true);
        this._groups = groups;
    };
    Toolbar.prototype._setRoot = function (id) {
        if (this.data.getParent(id) === this.data.getRoot()) {
            this._currentRoot = id;
        }
    };
    return Toolbar;
}(ts_menu_1.MenuBase));
exports.Toolbar = Toolbar;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var html_1 = __webpack_require__(1);
var MenuBase_1 = __webpack_require__(17);
var ContextMenu = /** @class */ (function (_super) {
    __extends(ContextMenu, _super);
    function ContextMenu() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._isContextMenu = true;
        return _this;
    }
    ContextMenu.prototype.showAt = function (elem, showAt) {
        if (showAt === void 0) { showAt = "bottom"; }
        if (elem instanceof MouseEvent) {
            this._changeActivePosition({
                left: window.pageXOffset + elem.x + 1,
                right: window.pageXOffset + elem.x + 1,
                top: window.pageYOffset + elem.y,
                bottom: window.pageYOffset + elem.y
            }, showAt);
        }
        else {
            var node = html_1.toNode(elem);
            this._changeActivePosition(html_1.getRealPosition(node), showAt);
        }
    };
    ContextMenu.prototype._close = function () {
        this._activeMenu = null;
        this._changeActivePosition(null, null);
    };
    ContextMenu.prototype._normalizeData = function () {
        var _this = this;
        var root = this.data.getRoot();
        this.data.eachChild(root, function (item) {
            if (_this.data.haveItems(item.id)) {
                item.$openIcon = "right";
            }
        }, true);
    };
    ContextMenu.prototype._getMode = function (_item, _root, active) {
        return active ? this._mode : "right";
    };
    ContextMenu.prototype._changeActivePosition = function (position, mode) {
        this._activePosition = position;
        this._mode = mode;
        this._listenOuterClick();
        this.paint();
    };
    return ContextMenu;
}(MenuBase_1.MenuBase));
exports.ContextMenu = ContextMenu;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function getHotKeyCode(code) {
    var matches = code.toLowerCase().match(/\w+/g);
    var comp = 0;
    var key = "";
    for (var i = 0; i < matches.length; i++) {
        var check = matches[i];
        if (check === "ctrl") {
            comp += 4;
        }
        else if (check === "shift") {
            comp += 2;
        }
        else if (check === "alt") {
            comp += 1;
        }
        else {
            key = check;
        }
    }
    return comp + key;
}
var KeyManager = /** @class */ (function () {
    function KeyManager() {
        var _this = this;
        this._keysStorage = {};
        document.addEventListener("keydown", function (e) {
            var comp = (e.ctrlKey || e.metaKey ? 4 : 0) + (e.shiftKey ? 2 : 0) + (e.altKey ? 1 : 0);
            var key;
            if ((e.which >= 48 && e.which <= 57) || (e.which >= 65 && e.which <= 90)) { // A-Z 0-9
                key = String.fromCharCode(e.which);
            }
            else {
                key = e.key;
            }
            var code = comp + key.toLowerCase();
            var actions = _this._keysStorage[code];
            if (actions) {
                for (var i = 0; i < actions.length; i++) {
                    actions[i].handler(e);
                }
            }
        });
    }
    KeyManager.prototype.addHotKey = function (key, handler, scope) {
        var code = getHotKeyCode(key);
        if (!this._keysStorage[code]) {
            this._keysStorage[code] = [];
        }
        this._keysStorage[code].push({
            handler: handler,
            scope: scope
        });
    };
    KeyManager.prototype.removeHotKey = function (key, scope) {
        var keyStorage = this._keysStorage;
        if (key) {
            var code = getHotKeyCode(key);
            delete keyStorage[code];
        }
        if (scope) {
            for (var code in keyStorage) {
                var toDelete = []; // items index to delete
                for (var i = 0; i < keyStorage[code].length; i++) {
                    if (keyStorage[code][i].scope === scope) {
                        toDelete.push(i);
                    }
                }
                if (keyStorage[code].length === toDelete.length) {
                    delete keyStorage[code];
                }
                else {
                    for (var i = toDelete.length - 1; i >= 0; i--) { // begin from last coz splice change other index
                        keyStorage[code].splice(toDelete[i], 1);
                    }
                }
            }
        }
    };
    KeyManager.prototype.exist = function (key) {
        var code = getHotKeyCode(key);
        return !!this._keysStorage[code];
    };
    return KeyManager;
}());
exports.keyManager = new KeyManager();
function addHotkeys(handlers, beforeCall) {
    var context = new Date();
    var wrapHandler = function (handler) { return function (e) {
        if (beforeCall && beforeCall() === false) {
            return;
        }
        handler(e);
    }; };
    for (var key in handlers) {
        exports.keyManager.addHotKey(key, wrapHandler(handlers[key]), context);
    }
    return function () { return exports.keyManager.removeHotKey(undefined, context); };
}
exports.addHotkeys = addHotkeys;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(9));
__export(__webpack_require__(23));
__export(__webpack_require__(26));
__export(__webpack_require__(53));
__export(__webpack_require__(15));
__export(__webpack_require__(10));
__export(__webpack_require__(24));
__export(__webpack_require__(25));
__export(__webpack_require__(55));


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Promise) {
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = __webpack_require__(10);
var Loader = /** @class */ (function () {
    function Loader(parent, changes) {
        this._parent = parent;
        this._changes = changes; // todo: [dirty] mutation
    }
    Loader.prototype.load = function (url, driver) {
        var _this = this;
        return this._parent.loadData = url.load().then(function (data) {
            _this._parent.removeAll();
            _this.parse(data, driver);
        });
    };
    Loader.prototype.parse = function (data, driver) {
        if (driver === void 0) { driver = "json"; }
        driver = helpers_1.toDataDriver(driver);
        data = driver.toJsonArray(data);
        this._parent.$parse(data);
    };
    Loader.prototype.save = function (url) {
        var _this = this;
        var _loop_1 = function (el) {
            if (el.saving || el.pending) {
                helpers_1.dhxWarning("item is saving");
            }
            else {
                var prevEl_1 = this_1._findPrevState(el.id);
                if (prevEl_1 && prevEl_1.saving) {
                    var pending = new Promise(function (res, rej) {
                        prevEl_1.promise.then(function () {
                            el.pending = false;
                            res(_this._setPromise(el, url));
                        }).catch(function (err) {
                            _this._removeFromOrder(prevEl_1);
                            _this._setPromise(el, url);
                            helpers_1.dhxWarning(err);
                            rej(err);
                        });
                    });
                    this_1._addToChain(pending);
                    el.pending = true;
                }
                else {
                    this_1._setPromise(el, url);
                }
            }
        };
        var this_1 = this;
        for (var _i = 0, _a = this._changes.order; _i < _a.length; _i++) {
            var el = _a[_i];
            _loop_1(el);
        }
        this._parent.saveData.then(function () {
            _this._saving = false;
        });
    };
    Loader.prototype._setPromise = function (el, url) {
        var _this = this;
        el.promise = url.save(el.obj, el.status);
        el.promise.then(function () {
            _this._removeFromOrder(el);
        }).catch(function (err) {
            el.saving = false;
            el.error = true;
            helpers_1.dhxError(err);
        });
        el.saving = true;
        this._saving = true;
        this._addToChain(el.promise);
        return el.promise;
    };
    Loader.prototype._addToChain = function (promise) {
        // tslint:disable-next-line:prefer-conditional-expression
        if (this._parent.saveData && this._saving) {
            this._parent.saveData = this._parent.saveData.then(function () { return promise; });
        }
        else {
            this._parent.saveData = promise;
        }
    };
    Loader.prototype._findPrevState = function (id) {
        for (var _i = 0, _a = this._changes.order; _i < _a.length; _i++) {
            var el = _a[_i];
            if (el.id === id) {
                return el;
            }
        }
        return null;
    };
    Loader.prototype._removeFromOrder = function (el) {
        this._changes.order = this._changes.order.filter(function (item) { return !helpers_1.isEqualObj(item, el); });
    };
    return Loader;
}());
exports.Loader = Loader;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(13)))

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(50);
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(14)))

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(14), __webpack_require__(51)))

/***/ }),
/* 51 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = __webpack_require__(10);
var Sort = /** @class */ (function () {
    function Sort() {
    }
    Sort.prototype.sort = function (array, by) {
        var _this = this;
        if (by.rule && typeof by.rule === "function") {
            this._sort(array, by);
        }
        else if (by.by) {
            by.rule = function (a, b) {
                var aa = _this._checkVal(by.as, a[by.by]);
                var bb = _this._checkVal(by.as, b[by.by]);
                return helpers_1.naturalCompare(aa.toString(), bb.toString()); // didnt work with numbers
            };
            this._sort(array, by);
        }
    };
    Sort.prototype._checkVal = function (method, val) {
        return method ? method.call(this, val) : val;
    };
    Sort.prototype._sort = function (arr, conf) {
        var _this = this;
        var dir = {
            asc: 1,
            desc: -1
        };
        return arr.sort(function (a, b) {
            return conf.rule.call(_this, a, b) * (dir[conf.dir] || dir.asc);
        });
    };
    return Sort;
}());
exports.Sort = Sort;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var html_1 = __webpack_require__(1);
var types_1 = __webpack_require__(12);
var CollectionStore_1 = __webpack_require__(54);
var treecollection_1 = __webpack_require__(26);
var types_2 = __webpack_require__(9);
var DropPosition;
(function (DropPosition) {
    DropPosition[DropPosition["top"] = 0] = "top";
    DropPosition[DropPosition["bot"] = 1] = "bot";
    DropPosition[DropPosition["in"] = 2] = "in";
})(DropPosition || (DropPosition = {}));
function getPosition(e) {
    var y = e.clientY;
    var element = html_1.locateNode(e);
    if (!element) {
        return null;
    }
    var treeLine = element.childNodes[0];
    var _a = treeLine.getBoundingClientRect(), top = _a.top, height = _a.height;
    return (y - top) / height;
}
function dragEventContent(item) {
    var ghost = document.createElement("div");
    ghost.textContent = item.value || item.text;
    ghost.className = "dhx_drag-ghost";
    ghost.style.pointerEvents = "none";
    return ghost;
}
var DragManager = /** @class */ (function () {
    function DragManager() {
        var _this = this;
        this._transferData = {};
        this._canMove = true;
        this._ghostTopPadding = -17;
        this._onMouseMove = function (e) {
            if (!_this._transferData.id) {
                return;
            }
            var pageX = e.pageX, pageY = e.pageY;
            if (!_this._transferData.ghost) {
                if (Math.abs(_this._transferData.x - pageX) < 3 && Math.abs(_this._transferData.y - pageY) < 3) {
                    return;
                }
                else {
                    var ghost = _this._onDragStart(_this._transferData.id, _this._transferData.targetId);
                    if (!ghost) {
                        _this._endDrop();
                        return;
                    }
                    else {
                        _this._transferData.ghost = ghost;
                        document.body.appendChild(_this._transferData.ghost);
                    }
                }
            }
            _this._moveGhost(pageX, pageY);
            _this._onDrag(e);
        };
        this._onMouseUp = function () {
            if (!_this._transferData.x) {
                return;
            }
            if (_this._transferData.ghost) {
                _this._removeGhost();
                _this._onDrop();
            }
            else {
                _this._endDrop();
            }
            document.removeEventListener("mousemove", _this._onMouseMove);
            document.removeEventListener("mouseup", _this._onMouseUp);
        };
    }
    DragManager.prototype.setItem = function (id, item, config) {
        CollectionStore_1.collectionStore.setItem(id, item, config);
    };
    DragManager.prototype.onMouseDown = function (e) {
        if (e.which !== 1) {
            return;
        }
        document.addEventListener("mousemove", this._onMouseMove);
        document.addEventListener("mouseup", this._onMouseUp);
        var id = html_1.locate(e, "dhx_id");
        var targetId = html_1.locate(e, "dhx_collection_id");
        if (id && targetId) {
            this._transferData.x = e.x;
            this._transferData.y = e.y;
            this._transferData.targetId = targetId;
            this._transferData.id = id;
        }
    };
    DragManager.prototype._moveGhost = function (x, y) {
        if (this._transferData.ghost) {
            var width = this._transferData.ghost.offsetWidth / 2;
            this._transferData.ghost.style.left = x - width + "px";
            this._transferData.ghost.style.top = y + this._ghostTopPadding + "px";
        }
    };
    DragManager.prototype._removeGhost = function () {
        document.body.removeChild(this._transferData.ghost);
    };
    DragManager.prototype._onDrop = function () {
        if (!this._canMove) {
            this._endDrop();
            return;
        }
        var target = CollectionStore_1.collectionStore.getItem(this._lastCollectionId);
        var config = CollectionStore_1.collectionStore.getItemConfig(this._lastCollectionId);
        if (!target || config.mode === types_2.DragMode.source) {
            this._endDrop();
            return;
        }
        var to = {
            id: this._lastId,
            target: target
        };
        var from = {
            id: this._transferData.id,
            target: this._transferData.target
        };
        if (from.target.events.fire(types_1.DragEvents.beforeDrop, [from, to])) {
            this._move(from, to);
            to.target.events.fire(types_1.DragEvents.dropComplete, [to.id, this._transferData.dropPosition]);
        }
        this._endDrop();
    };
    DragManager.prototype._onDragStart = function (id, targetId) {
        var target = CollectionStore_1.collectionStore.getItem(targetId);
        var config = CollectionStore_1.collectionStore.getItemConfig(targetId);
        if (config.dragMode === types_2.DragMode.target) {
            return null;
        }
        var item = target.data.getItem(id);
        target.events.fire(types_1.DragEvents.dragStart);
        var ghost = dragEventContent(item);
        var ans = target.events.fire(types_1.DragEvents.beforeDrag, [item, ghost]);
        if (!ans || !id) {
            return null;
        }
        this._toggleTextSelection(true);
        this._transferData.target = target;
        this._transferData.dragConfig = config;
        return ghost;
    };
    DragManager.prototype._onDrag = function (e) {
        var x = e.x, y = e.y;
        var element = document.elementFromPoint(x, y);
        var id = html_1.locate(element, "dhx_id");
        if (!id) {
            this._cancelCanDrop();
            return;
        }
        var collectionId = html_1.locate(element, "dhx_collection_id");
        if (this._transferData.dragConfig.behaviour === types_2.DragBehaviour.complex) {
            var pos = getPosition(e);
            if (pos <= 0.25) {
                this._transferData.dropPosition = DropPosition.top;
            }
            else if (pos >= 0.75) {
                this._transferData.dropPosition = DropPosition.bot;
            }
            else {
                this._transferData.dropPosition = DropPosition.in;
            }
        }
        else if (this._lastId === id && this._lastCollectionId === collectionId) {
            return;
        }
        var eventArgs;
        var from;
        var targetTo;
        if ((!id || !collectionId) && this._canMove) {
            this._cancelCanDrop();
            return;
        }
        else {
            from = {
                id: this._transferData.id,
                target: this._transferData.target
            };
            targetTo = CollectionStore_1.collectionStore.getItem(collectionId);
            eventArgs = [from, {
                    id: id,
                    target: targetTo
                }];
            from.target.events.fire(types_1.DragEvents.dragOut, eventArgs);
        }
        if (collectionId !== this._transferData.targetId || !(from.target.data instanceof treecollection_1.TreeCollection) ||
            (from.target.data instanceof treecollection_1.TreeCollection && from.target.data.canCopy(from.id, id))) {
            // handle cursor or something, can drop
            this._cancelCanDrop(); // clear last
            this._lastId = id;
            this._lastCollectionId = collectionId;
            eventArgs.push(this._transferData.dropPosition);
            var canMove = from.target.events.fire(types_1.DragEvents.dragIn, eventArgs);
            if (canMove) {
                this._canDrop();
            }
        }
        else {
            this._cancelCanDrop();
        }
    };
    DragManager.prototype._move = function (from, to) {
        var fromData = from.target.data;
        var toData = to.target.data;
        var index = 0;
        var targetId = to.id;
        var behaviour = this._transferData.dragConfig.behaviour;
        switch (behaviour) {
            case types_2.DragBehaviour.child:
                break;
            case types_2.DragBehaviour.sibling:
                targetId = toData.getParent(targetId);
                index = toData.getIndex(to.id) + 1;
                break;
            case types_2.DragBehaviour.complex:
                var dropPosition = this._transferData.dropPosition;
                if (dropPosition === DropPosition.top) {
                    targetId = toData.getParent(targetId);
                    index = toData.getIndex(to.id);
                }
                else if (dropPosition === DropPosition.bot) {
                    targetId = toData.getParent(targetId);
                    index = toData.getIndex(to.id) + 1;
                }
                break;
        }
        if (this._transferData.dragConfig.copy) {
            fromData.copy(from.id, index, toData, targetId);
        }
        else {
            fromData.move(from.id, index, toData, targetId);
        }
    };
    DragManager.prototype._endDrop = function () {
        this._toggleTextSelection(false);
        if (this._transferData.target) {
            this._transferData.target.events.fire(types_1.DragEvents.dragEnd);
        }
        this._cancelCanDrop();
        this._canMove = true;
        this._transferData = {};
        this._lastId = null;
        this._lastCollectionId = null;
    };
    DragManager.prototype._cancelCanDrop = function () {
        this._canMove = false;
        var collection = CollectionStore_1.collectionStore.getItem(this._lastCollectionId);
        if (collection && this._lastId) {
            collection.events.fire(types_1.DragEvents.cancelDrop, [this._lastId]);
        }
    };
    DragManager.prototype._canDrop = function () {
        this._canMove = true;
        var collection = CollectionStore_1.collectionStore.getItem(this._lastCollectionId);
        if (collection && this._lastId) {
            collection.events.fire(types_1.DragEvents.canDrop, [this._lastId, this._transferData.dropPosition]);
        }
    };
    DragManager.prototype._toggleTextSelection = function (add) {
        if (add) {
            document.body.classList.add("dhx_no-select");
        }
        else {
            document.body.classList.remove("dhx_no-select");
        }
    };
    return DragManager;
}());
exports.dragManager = new DragManager();


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CollectionStore = /** @class */ (function () {
    function CollectionStore() {
        this._store = {};
    }
    CollectionStore.prototype.setItem = function (id, target, config) {
        this._store[id] = {
            target: target,
            config: config
        };
    };
    CollectionStore.prototype.getItem = function (id) {
        if (!this._store[id]) {
            return null;
        }
        return this._store[id].target;
    };
    CollectionStore.prototype.getItemConfig = function (id) {
        if (!this._store[id]) {
            return null;
        }
        return this._store[id].config;
    };
    return CollectionStore;
}());
exports.collectionStore = new CollectionStore();


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = __webpack_require__(7);
var types_1 = __webpack_require__(12);
var types_2 = __webpack_require__(9);
var Selection = /** @class */ (function () {
    function Selection(_config, data, events) {
        var _this = this;
        this.events = events || (new events_1.EventSystem());
        this._data = data;
        this._data.events.on(types_2.DataEvents.removeAll, function () {
            _this._selected = null;
        });
        this._data.events.on(types_2.DataEvents.change, function () {
            if (_this._selected) {
                var near = _this._data.getNearId(_this._selected);
                if (near !== _this._selected) {
                    _this._selected = null;
                    if (near) {
                        _this.add(near);
                    }
                }
            }
        });
    }
    Selection.prototype.getId = function () {
        return this._selected;
    };
    Selection.prototype.getItem = function () {
        if (this._selected) {
            return this._data.getItem(this._selected);
        }
        return null;
    };
    Selection.prototype.remove = function (id) {
        id = id || this._selected;
        if (!id) {
            return true;
        }
        if (this.events.fire(types_1.SelectionEvents.beforeUnSelect, [id])) {
            this._data.update(id, { $selected: false });
            this._selected = null;
            this.events.fire(types_1.SelectionEvents.afterUnSelect, [id]);
            return true;
        }
        return false;
    };
    Selection.prototype.add = function (id) {
        if (this._selected === id) {
            return;
        }
        this.remove();
        if (this.events.fire(types_1.SelectionEvents.beforeSelect, [id])) {
            this._selected = id;
            this._data.update(id, { $selected: true });
            this.events.fire(types_1.SelectionEvents.afterSelect, [id]);
        }
    };
    return Selection;
}());
exports.Selection = Selection;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(0);
var helpers_1 = __webpack_require__(6);
function button(item) {
    var className = "dhx_toolbar-button dhx_button dhx_toolbar__button ";
    return dom_1.el("li.dhx_toolbar__item", [
        dom_1.el("button", {
            class: className + helpers_1.getIconButtonClass(item) + helpers_1.getCss(item),
            dhx_id: item.id,
            disabled: item.$disabled
        }, [
            helpers_1.counter(item),
            item.icon ? helpers_1.icon(item.icon, "button") : null,
            // item.value ? el("span.dhx_button__text", item.value) : null,
            dom_1.el("span.dhx_button__text", item.value),
            item.$openIcon ? dom_1.el("span.dhx_button__icon.dhx_button__icon--menu-down.dxi.dxi-menu-down") : null
        ])
    ]);
}
exports.button = button;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(0);
var helpers_1 = __webpack_require__(6);
function customHTMLButton(item) {
    return dom_1.el("li.dhx_toolbar__item", [
        dom_1.el("button", {
            class: "dhx_button dhx_toolbar__button--custom_html" + helpers_1.getCss(item),
            dhx_id: item.id
        }, [
            helpers_1.counter(item),
            dom_1.el(".dhx_toolbar-button__html-wrapper", {
                ".innerHTML": item.html
            }),
            item.value ? dom_1.el("span.dhx_button__text", item.value) : null
        ])
    ]);
}
exports.customHTMLButton = customHTMLButton;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(0);
var helpers_1 = __webpack_require__(6);
function dhxButton(item) {
    return dom_1.el("li.dhx_toolbar__item", [
        dom_1.el("button", {
            class: "dhx_button dhx_toolbar__button" + helpers_1.getCss(item) + (!item.value && item.icon ? " dhx_button--icon" : ""),
            dhx_id: item.id,
            disabled: item.$disabled
        }, [
            helpers_1.counter(item),
            item.icon ? helpers_1.icon(item.icon, "button") : null,
            item.value ? dom_1.el("span.dhx_button__text", item.value) : null,
            item.$openIcon ? dom_1.el("span.dhx_button__icon.dhx_button__icon--menu-down.dxi.dxi-menu-down") : null
        ])
    ]);
}
exports.dhxButton = dhxButton;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(0);
var helpers_1 = __webpack_require__(6);
function imageButton(item) {
    return dom_1.el("li.dhx_toolbar__item", [
        dom_1.el("button", {
            class: "dhx_button dhx_toolbar__button dhx_toolbar-img-button" + helpers_1.getCss(item),
            dhx_id: item.id
        }, [
            helpers_1.counter(item),
            dom_1.el("div.dhx_toolbar-img-button__text", item.value),
            dom_1.el("img.dhx_toolbar-img-button__image", {
                src: item.src
            }),
        ])
    ]);
}
exports.imageButton = imageButton;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(0);
var types_1 = __webpack_require__(16);
var helpers_1 = __webpack_require__(6);
function input(item, events) {
    return dom_1.el("li.dhx_toolbar__item", {}, [
        dom_1.el(".dhx_form-group.dhx_form-group--no-message-holder.dhx_form-group--label_sr", {
            class: helpers_1.getCss(item) + item.icon
        }, [
            dom_1.el("input.dhx_input", {
                placeholder: item.placeholder,
                value: item.value,
                dhx_id: item.id,
                style: {
                    width: item.width ? item.width : null
                },
                _hooks: {
                    didInsert: function (node) {
                        if (events) {
                            events.fire(types_1.NavigationBarEvents.inputCreated, [item.id, node.el]);
                        }
                    }
                },
                _key: item.id
            }),
            dom_1.el("label.dhx_label", { for: item.id }, item.label),
            dom_1.el(".input-animation")
        ]),
    ]);
}
exports.input = input;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(0);
var helpers_1 = __webpack_require__(6);
function menuItem(item) {
    return dom_1.el("li.dhx_menu__item", [
        dom_1.el("button", {
            class: "dhx_menu__button dhx_button dhx_button--type_link dhx_button--color_secondary dhx_button--width_full" + helpers_1.getCss(item),
            dhx_id: item.id,
        }, [
            item.icon ? helpers_1.icon(item.icon, "menu") : null,
            item.value ? dom_1.el("span.dhx_menu__text", item.value) : null,
            item.$openIcon ? dom_1.el("span.dhx_menu__icon.dhx_menu__icon--submenu.dxi.dxi-menu-right") : null,
            item.hotkey ? dom_1.el("span.span.dhx_menu__hotkey", item.hotkey) : null
        ])
    ]);
}
exports.menuItem = menuItem;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(0);
function separator(item) {
    var className = item.$menuSeparator
        ? "dhx_menu__item dhx_menu__separator"
        : "dhx_toolbar__item dhx_toolbar__separator";
    return dom_1.el("li", {
        "class": className,
        "aria-hidden": "true"
    });
}
exports.separator = separator;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(0);
function spacer(_item) {
    return dom_1.el("li", {
        "class": "dhx_toolbar__item dhx_toolbar__spacer",
        "aria-hidden": "true"
    });
}
exports.spacer = spacer;


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(0);
var helpers_1 = __webpack_require__(6);
function text(item) {
    return dom_1.el("li.dhx_toolbar__item", [dom_1.el("span", {
            class: "dhx_toolbar__text" + helpers_1.getCss(item)
        }, item.value)]);
}
exports.text = text;


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(0);
var MenuBase_1 = __webpack_require__(17);
var Menu = /** @class */ (function (_super) {
    __extends(Menu, _super);
    function Menu(element, config) {
        var _this = _super.call(this, element, config) || this;
        var render = function () { return _this._draw(); };
        _this.mount(element, dom_1.create({ render: render }));
        return _this;
    }
    Menu.prototype._draw = function () {
        return dom_1.el("div", __assign({ dhx_widget_id: this._uid, class: "main-menu" }, this._handlers), this._drawMenuItems(this.data.getRoot()));
    };
    return Menu;
}(MenuBase_1.MenuBase));
exports.Menu = Menu;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Promise) {
Object.defineProperty(exports, "__esModule", { value: true });
var en_1 = __webpack_require__(67);
function blockKeys(e) {
    var active = document.activeElement;
    if (!active.classList.contains("dhx_alert__confirm-reject") && !active.classList.contains("dhx_alert__confirm-aply")) {
        e.preventDefault();
    }
}
function blockScreen(css) {
    var blocker = document.createElement("div");
    blocker.className = "dhx_alert__overlay " + (css || "");
    document.body.appendChild(blocker);
    document.addEventListener("keydown", blockKeys);
    return function () {
        document.body.removeChild(blocker);
        document.removeEventListener("keydown", blockKeys);
    };
}
exports.blockScreen = blockScreen;
function alert(props) {
    var apply = props.buttons && props.buttons[0] ? props.buttons[0] : en_1.default.apply;
    var unblock = blockScreen(props.blockerCss);
    return new Promise(function (res) {
        var alertBox = document.createElement("div");
        alertBox.className = "dhx_alert " + (props.css || "");
        alertBox.innerHTML = "\n\t\t\t<div class=\"dhx_alert__header\">\n\t\t\t\t" + props.header + "\n\t\t\t</div>\n\t\t\t<div class=\"dhx_alert__content\">" + props.text + "</div>\n\t\t\t<div class=\"dhx_alert__footer " + (props.buttonsAlignment ? ("dhx_alert__footer--" + props.buttonsAlignment) : "") + "\">\n\t\t\t\t<button class=\"dhx_alert__apply-button dhx_button dhx_button--type_flat dhx_button--color_primary dhx_button--size_medium\">" + apply + "</button>\n\t\t\t</div>";
        document.body.appendChild(alertBox);
        alertBox.querySelector(".dhx_alert__apply-button").focus();
        alertBox.querySelector("button").addEventListener("click", function () {
            unblock();
            document.body.removeChild(alertBox);
            res(true);
        });
    });
}
exports.alert = alert;
function confirm(props) {
    var apply = props.buttons && props.buttons[1] ? props.buttons[1] : en_1.default.apply;
    var reject = props.buttons && props.buttons[0] ? props.buttons[0] : en_1.default.reject;
    var unblock = blockScreen(props.blockerCss);
    return new Promise(function (res) {
        var answer = function (val) {
            unblock();
            confirmBox.removeEventListener("click", clickHandler);
            document.body.removeChild(confirmBox);
            res(val);
        };
        var confirmBox = document.createElement("div");
        confirmBox.className = "dhx_alert dhx_alert--confirm" + (props.css || "");
        confirmBox.innerHTML = "\n\t\t\t<div class=\"dhx_alert__header\">\n\t\t\t\t" + props.header + "\n\t\t\t</div>\n\t\t\t<div class=\"dhx_alert__content\">" + props.text + "</div>\n\t\t\t<div class=\"dhx_alert__footer " + (props.buttonsAlignment ? ("dhx_alert__footer--" + props.buttonsAlignment) : "") + "\">\n\t\t\t\t<button class=\"dhx_alert__confirm-reject dhx_button dhx_button--type_link dhx_button--color_primary dhx_button--size_medium\">" + reject + "</button>\n\t\t\t\t<button class=\"dhx_alert__confirm-aply dhx_button dhx_button--type_flat dhx_button--color_primary dhx_button--size_medium\">" + apply + "</button>\n\t\t\t</div>";
        document.body.appendChild(confirmBox);
        confirmBox.querySelector(".dhx_alert__confirm-reject").focus();
        var clickHandler = function (e) {
            if (e.target.tagName === "BUTTON") {
                answer(e.target.classList.contains("dhx_alert__confirm-aply"));
            }
        };
        confirmBox.addEventListener("click", clickHandler);
    });
}
exports.confirm = confirm;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(13)))

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var locale = {
    apply: "apply",
    reject: "reject"
};
exports.default = locale;


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var html_1 = __webpack_require__(1);
var message_1 = __webpack_require__(29);
var SHOW_DELAY = 750;
var HIDE_DELAY = 200;
var RealPosition;
(function (RealPosition) {
    RealPosition["left"] = "left";
    RealPosition["right"] = "right";
    RealPosition["top"] = "top";
    RealPosition["bottom"] = "bottom";
    RealPosition["center"] = "center";
})(RealPosition = exports.RealPosition || (exports.RealPosition = {}));
function findPosition(targetRect, position, width, height) {
    var margin = 8; // margin top/bot, left/right
    var pos;
    var left;
    var top;
    switch (position) {
        case message_1.Position.center:
            left = targetRect.left + window.pageXOffset + (targetRect.width - width) / 2;
            if (left + margin < window.pageXOffset) {
                left = targetRect.left + window.pageXOffset;
            }
            top = targetRect.top + window.pageYOffset + (targetRect.height - height) / 2;
            pos = RealPosition.center;
            return { left: left, top: top, pos: pos };
        case message_1.Position.right:
            pos = RealPosition.right;
            left = targetRect.right + window.pageXOffset;
            if (left + width + margin > window.innerWidth + window.pageXOffset) { // set left
                left = window.pageXOffset + targetRect.left - width;
                pos = RealPosition.left;
            }
            top = window.pageYOffset + targetRect.top + (targetRect.height - height) / 2;
            return { left: left, top: top, pos: pos };
        case message_1.Position.bottom:
            left = window.pageXOffset + targetRect.left + (targetRect.width - width) / 2;
            if (left + width > window.innerWidth + window.pageXOffset) {
                left = window.innerWidth + window.pageXOffset - width;
            }
            else if (left < 0) {
                left = 0;
            }
            pos = RealPosition.bottom;
            top = window.pageYOffset + targetRect.bottom;
            if (top + height + margin > window.innerHeight + window.pageYOffset) { // set top
                top = window.pageYOffset + targetRect.top - height;
                pos = RealPosition.top;
            }
            return { left: left, top: top, pos: pos };
    }
}
exports.findPosition = findPosition;
// tooltip init
var tooltipBox = document.createElement("div");
var tooltipText = document.createElement("span");
tooltipText.className = "dhx_tooltip__text";
tooltipBox.appendChild(tooltipText);
tooltipBox.style.position = "absolute";
var lastNode = null;
var isActive = false;
var hideTimeout = null;
var showTimeout = null;
var activeListenersDestructor;
function showTooltip(node, text, position, css, force) {
    if (force === void 0) { force = false; }
    var rects = node.getBoundingClientRect();
    tooltipText.textContent = text;
    document.body.appendChild(tooltipBox);
    tooltipBox.className = "dhx_tooltip" + (force ? " dhx_tooltip--forced" : "");
    var _a = tooltipBox.getBoundingClientRect(), width = _a.width, height = _a.height;
    var _b = findPosition(rects, position, width, height), left = _b.left, top = _b.top, pos = _b.pos;
    switch (pos) {
        case RealPosition.bottom:
            tooltipBox.style.left = left + "px";
            tooltipBox.style.top = top + "px";
            break;
        case RealPosition.top:
            tooltipBox.style.left = left + "px";
            tooltipBox.style.top = top + "px";
            break;
        case RealPosition.left:
            tooltipBox.style.left = left + "px";
            tooltipBox.style.top = top + "px";
            break;
        case RealPosition.right:
            tooltipBox.style.left = left + "px";
            tooltipBox.style.top = top + "px";
            break;
        case RealPosition.center:
            tooltipBox.style.left = left + "px";
            tooltipBox.style.top = top + "px";
            break;
    }
    tooltipBox.className += " dhx_tooltip--" + pos + " " + (css || "");
    isActive = true;
    if (!force) {
        setTimeout(function () {
            tooltipBox.className += " dhx_tooltip--animate";
        });
    }
}
function hideTooltip() {
    if (lastNode) {
        hideTimeout = setTimeout(function () {
            document.body.removeChild(tooltipBox);
            isActive = false;
            hideTimeout = null;
        }, HIDE_DELAY);
    }
}
function addListeners(node, text, position, css, force) {
    if (force === void 0) { force = false; }
    if (!force) {
        showTimeout = setTimeout(function () {
            showTooltip(node, text, position, css);
        }, SHOW_DELAY);
    }
    var hide = function () {
        if (isActive) {
            hideTooltip();
        }
        clearTimeout(showTimeout);
        node.removeEventListener("mouseleave", hide);
        node.removeEventListener("blur", hide);
        document.removeEventListener("mousedown", hide);
        lastNode = null;
        activeListenersDestructor = null;
    };
    if (force) {
        showTooltip(node, text, position, css, force);
    }
    node.addEventListener("mouseleave", hide);
    node.addEventListener("blur", hide);
    document.addEventListener("mousedown", hide);
    activeListenersDestructor = hide;
}
// default
function tooltip(text, config) {
    var node = html_1.toNode(config.node);
    if (node === lastNode) {
        return;
    }
    if (activeListenersDestructor) {
        activeListenersDestructor();
        activeListenersDestructor = null;
    }
    lastNode = node;
    if (hideTimeout) {
        clearTimeout(hideTimeout);
        hideTimeout = null;
        addListeners(node, text, config.position, config.css, true);
    }
    else {
        addListeners(node, text, config.position || message_1.Position.bottom, config.css, config.force);
    }
}
exports.tooltip = tooltip;
function enableTooltip() {
    document.addEventListener("mousemove", _mousemove);
}
exports.enableTooltip = enableTooltip;
function disableTooltip() {
    document.removeEventListener("mousemove", _mousemove);
}
exports.disableTooltip = disableTooltip;
function _mousemove(e) {
    var node = html_1.locateNode(e, "dhx_tooltip_text");
    if (!node) {
        return;
    }
    tooltip(node.getAttribute("dhx_tooltip_text"), {
        position: node.getAttribute("dhx_tooltip_position") || message_1.Position.bottom,
        node: node
    });
}


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = __webpack_require__(2);
function listenCompositionEvents(events, isActive) {
    var compositionStart = function (e) {
        if (isActive()) {
            events.fire(types_1.RichTextEvents.compositionStart);
        }
    };
    var compositionEnd = function (e) {
        if (isActive()) {
            events.fire(types_1.RichTextEvents.compositionEnd, [e.data]);
        }
    };
    var compositionUpdate = function (e) {
        if (isActive()) {
            events.fire(types_1.RichTextEvents.compositionUpdate, [e.data]);
        }
    };
    document.addEventListener("compositionstart", compositionStart);
    document.addEventListener("compositionend", compositionEnd);
    document.addEventListener("compositionupdate", compositionUpdate);
    return function () {
        document.removeEventListener("compositionstart", compositionStart);
        document.removeEventListener("compositionend", compositionEnd);
        document.removeEventListener("compositionupdate", compositionUpdate);
    };
}
exports.listenCompositionEvents = listenCompositionEvents;


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(0);
var html_1 = __webpack_require__(1);
var view_1 = __webpack_require__(8);
var ts_message_1 = __webpack_require__(28);
var ts_popup_1 = __webpack_require__(18);
var keyhandler_1 = __webpack_require__(31);
var en_1 = __webpack_require__(11);
var types_1 = __webpack_require__(2);
var other_1 = __webpack_require__(4);
var LinkEditor = /** @class */ (function (_super) {
    __extends(LinkEditor, _super);
    function LinkEditor(container, config) {
        var _this = _super.call(this, container, config) || this;
        _this._events = config.events;
        _this._editor = config.editor;
        _this._getParentView = config.getRootView;
        _this._popup = new ts_popup_1.Popup();
        _this._initEvents();
        _this._handlers = {
            onclick: {
                ".dhx_richtext-linkeditor--handler_apply": function () { return _this._apply(); },
                ".dhx_richtext-linkeditor--handler_unlink, .dhx_richtext-linkeditor--handler_unlink *": function () {
                    _this._events.fire(types_1.RichTextEvents.action, [
                        types_1.Action.update,
                        {
                            modifier: types_1.Modifier.link,
                            modifierValue: undefined
                        },
                        true
                    ]);
                    _this._popup.hide();
                },
                ".dhx_richtext-linkeditor--handler_edit, .dhx_richtext-linkeditor--handler_edit *": function () {
                    _this._editMode = true;
                    _this.paint();
                    setTimeout(function () { return _this.focus(); }, 10);
                }
            },
            onmouseover: function (e) {
                var node = html_1.locateNode(e, "dhx_id");
                if (node) {
                    ts_message_1.tooltip(en_1.default[node.getAttribute("dhx_id")], {
                        node: node,
                        position: ts_message_1.Position.bottom
                    });
                }
            },
            oninput: function (e) {
                var value = e.target.value;
                if (e.target.classList.contains("link-input")) {
                    if (!_this._link && value) {
                        _this._link = value;
                        _this.paint();
                    }
                    else if (!value) {
                        _this._link = value;
                        _this.paint();
                    }
                    else {
                        _this._link = value;
                    }
                }
                else {
                    _this._text = value;
                }
            },
            onkeydown: function (e) {
                if (e.which === keyhandler_1.Key.enter && _this._link) {
                    _this._apply();
                }
                if (e.which === keyhandler_1.Key.esc) {
                    _this._popup.hide();
                }
            }
        };
        _this.mount(null, dom_1.create({ render: function () { return _this._draw(); } }));
        _this._popup.attach(_this);
        return _this;
    }
    LinkEditor.prototype.isVisible = function () {
        return this._popup.isVisible();
    };
    LinkEditor.prototype.show = function (node, mode) {
        var _this = this;
        this._popup.show(node, { mode: mode, centering: true });
        setTimeout(function () { return _this.focus(); }, 10);
    };
    LinkEditor.prototype.hide = function () {
        this._popup.hide();
    };
    LinkEditor.prototype.get = function () {
        return {
            link: this._link,
            text: this._text
        };
    };
    LinkEditor.prototype.getCurrentLinkRef = function () {
        return this._currentLinkRef;
    };
    LinkEditor.prototype.set = function (link, text) {
        this._editMode = !link;
        this._link = link || "";
        this._text = text || "";
        this._initText = this._text;
        this.paint();
    };
    LinkEditor.prototype.focus = function () {
        var refs = this.getRootView().refs;
        if (refs && refs.linkInput) {
            refs.linkInput.el.focus();
        }
    };
    LinkEditor.prototype._destroyCurrentLinkRef = function () {
        if (this._currentLinkRef) {
            this._getParentView().refs[this._currentLinkRef].patch({ class: "" });
            this._currentLinkRef = null;
        }
    };
    LinkEditor.prototype._initEvents = function () {
        var _this = this;
        this._popup.events.on(ts_popup_1.PopupEvents.beforeHide, function (outer, e) { return !outer || !_this._getParentView().node.el.contains(e.target); });
        this._popup.events.on(ts_popup_1.PopupEvents.afterHide, function () { return _this._destroyCurrentLinkRef(); });
        this._popup.events.on(ts_popup_1.PopupEvents.afterShow, function () {
            var left = _this._editor.selection.get().left;
            var key = other_1.getTextHash(left.blockIndex, left.textIndex);
            var parentView = _this._getParentView();
            var vnode = parentView.refs[key];
            vnode.parent.patch({ class: "dhx--link_edited" });
            _this._currentLinkRef = vnode.parent.ref;
        });
        this._events.on(types_1.RichTextEvents.selectionChange, function (_a) {
            var range = _a.range, left = _a.left;
            var textNode = _this._editor.blocks[left.blockIndex].textNodes[left.textIndex];
            if (_this.isVisible()) {
                _this.hide();
            }
            if (textNode.style.link && !range) {
                _this._show();
            }
        });
        this._events.on(types_1.RichTextEvents.showLinkEditor, function () { return _this._show(); });
        this._events.on(types_1.RichTextEvents.change, function () {
            if (_this.isVisible()) {
                var _a = _this._editor.selection.get(), left = _a.left, range = _a.range;
                var textNode = _this._editor.blocks[left.blockIndex].textNodes[left.textIndex];
                if (!textNode.style.link || range) {
                    _this.hide();
                }
                else {
                    var _b = _this._editor.getLinkInfo(), link = _b.link, text = _b.text;
                    _this.set(link, text);
                }
            }
        });
    };
    LinkEditor.prototype._draw = function () {
        return dom_1.el(".dhx_richtext-linkeditor " + (this._drawViewMode() ? ".dhx_richtext-linkeditor--mode_view" : ""), __assign({}, this._handlers), this._editMode ? this._drawEditMode() : this._drawViewMode());
    };
    LinkEditor.prototype._drawEditMode = function () {
        return [
            dom_1.el(".dhx_richtext-linkeditor__inputs", [
                dom_1.el(".dhx_form-group.dhx_form-group--type_inline.dhx_richtext-linkeditor__input", [
                    dom_1.el(".dhx_label", "Text"),
                    dom_1.el("input.dhx_input.text-input", {
                        value: this._text,
                        _key: "textInput",
                        _ref: "textInput"
                    }),
                ]),
                dom_1.el(".dhx_form-group.dhx_form-group--type_inline.dhx_richtext-linkeditor__input", [
                    dom_1.el(".dhx_label", "Link"),
                    dom_1.el("input.dhx_input.link-input", {
                        value: this._link,
                        _key: "linkInput",
                        _ref: "linkInput"
                    }),
                ])
            ]),
            dom_1.el(".dhx_richtext-linkeditor__controls", [
                dom_1.el("button.dhx_richtext-linkeditor--handler_apply.dhx_button.dhx_button--size_medium.dhx_button--type_flat.dhx_button--color_primary", {
                    disabled: !this._link,
                }, en_1.default.apply)
            ])
        ];
    };
    LinkEditor.prototype._drawViewMode = function () {
        return [
            dom_1.el("a.dhx_richtext-linkeditor__link", { href: this._link, target: "_blank" }, this._link),
            dom_1.el(".dhx_richtext-linkeditor__controls", [
                dom_1.el("button.dhx_richtext-linkeditor--handler_edit.dhx_button.dhx_button--icon.dhx_button--size_medium.dhx_button--type_link.dhx_button--color_secondary", {
                    dhx_id: "edit"
                }, [
                    dom_1.el("span.dhx_button__icon.dxi.dxi-pencil")
                ]),
                dom_1.el("button.dhx_richtext-linkeditor--handler_unlink.dhx_button.dhx_button--icon.dhx_button--size_medium.dhx_button--type_link.dhx_button--color_secondary", {
                    dhx_id: "removeLink"
                }, [
                    dom_1.el("span.dhx_button__icon.dxi.dxi-link-variant-off")
                ]),
            ])
        ];
    };
    LinkEditor.prototype._modifyLink = function (value) {
        if (value[0] === "#") {
            return value;
        }
        if (value.slice(0, 4).toLowerCase() === "http") {
            return value;
        }
        return "http://" + value;
    };
    LinkEditor.prototype._apply = function () {
        var link = this._modifyLink(this._link);
        var text = this._text;
        var isEmptyText = !text.trim();
        var isTextChanged = this._initText !== this._text;
        if (isTextChanged || isEmptyText) {
            this._editor.updateLinkText(isEmptyText ? link : text);
        }
        if (link) {
            this._events.fire(types_1.RichTextEvents.action, [
                types_1.Action.update,
                {
                    modifier: types_1.Modifier.link,
                    modifierValue: link
                },
                true
            ]);
        }
        this.hide();
    };
    LinkEditor.prototype._show = function () {
        var _a = this._editor.getLinkInfo(), link = _a.link, text = _a.text;
        var left = this._editor.selection.get().left;
        var key = other_1.getTextHash(left.blockIndex, left.textIndex);
        var parentView = this._getParentView();
        var vnode = parentView.refs[key];
        if (!link) { // case for add new link
            this.set(null, this._editor.selection.getSelectedText());
            this.show(vnode.el, ts_message_1.Position.bottom);
        }
        else { // link already exists
            if (vnode.parent.ref === this._currentLinkRef) { // this link already in focus
                return;
            }
            this.set(link, text);
            this.show(vnode.parent.el, ts_message_1.Position.bottom);
        }
    };
    return LinkEditor;
}(view_1.View));
exports.LinkEditor = LinkEditor;


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(3);
var dom_1 = __webpack_require__(0);
var events_1 = __webpack_require__(7);
var html_1 = __webpack_require__(1);
var view_1 = __webpack_require__(8);
var types_1 = __webpack_require__(30);
var Popup = /** @class */ (function (_super) {
    __extends(Popup, _super);
    function Popup(config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, null, core_1.extend({}, config)) || this;
        var popup = _this._popup = document.createElement("div");
        // [todo] remove one of "popup" classes
        popup.className = "dhx_popup dhx_widget";
        popup.style.position = "absolute";
        _this.mount(popup, dom_1.create({
            render: function () { return _this.toVDOM(); }
        }));
        _this.events = config.events || new events_1.EventSystem();
        _this._isActive = false;
        return _this;
    }
    Popup.prototype.show = function (node, config, attached) {
        var _this = this;
        if (config === void 0) { config = {}; }
        if (this.events.fire(types_1.PopupEvents.beforeShow) === false) {
            return;
        }
        if (this._isActive) {
            this._setPopupSize(node, config);
            return;
        }
        if (attached) {
            this.attach(attached);
        }
        setTimeout(function () {
            document.body.appendChild(_this._popup);
            _this._setPopupSize(node, config);
            _this._isActive = true;
            _this.events.fire(types_1.PopupEvents.afterShow);
            _this._outerClickDestructor = _this._detectOuterClick(node);
        });
    };
    Popup.prototype.hide = function () {
        this._hide(false, null);
    };
    Popup.prototype.isVisible = function () {
        return this._isActive;
    };
    Popup.prototype.attach = function (name, config) {
        this._html = null;
        if (typeof name === "object") {
            this._ui = name;
        }
        else if (typeof name === "string") {
            this._ui = new window.dhx[name](null, config);
        }
        else if (typeof name === "function") {
            if (name.prototype instanceof view_1.View) {
                this._ui = new name(null, config);
            }
            else {
                this._ui = {
                    getRootView: function () {
                        return name(config);
                    }
                };
            }
        }
        this.paint();
        return this._ui;
    };
    Popup.prototype.attachHTML = function (html) {
        this._html = html;
        this.paint();
    };
    Popup.prototype.getWidget = function () {
        return this._ui;
    };
    Popup.prototype.getContainer = function () {
        return this.getRootView().refs.content.el;
    };
    Popup.prototype.toVDOM = function () {
        var view;
        if (this._html) {
            view = dom_1.el(".dhx_popup__inner-html-content", {
                ".innerHTML": this._html
            });
        }
        else {
            view = this._ui ? this._ui.getRootView() : null;
            if (view && view.render) {
                view = dom_1.inject(view);
            }
        }
        return dom_1.el("div", {
            class: "dhx_popup-content " + (this.config.css || ""),
            _key: this._uid,
            _ref: "content"
        }, [view]);
    };
    Popup.prototype._setPopupSize = function (node, config) {
        var _this = this;
        var _a = this._popup.getBoundingClientRect(), width = _a.width, height = _a.height;
        if (width === 0 || height === 0) {
            if (this._timeout) {
                clearTimeout(this._timeout);
            }
            this._timeout = setTimeout(function () {
                if (!_this._isActive) {
                    return;
                }
                _this._setPopupSize(node, config);
                _this._timeout = null;
            });
        }
        var _b = html_1.fitPosition(node, __assign({}, config, { width: width, height: height })), left = _b.left, top = _b.top;
        this._popup.style.left = left;
        this._popup.style.top = top;
    };
    Popup.prototype._detectOuterClick = function (node) {
        var _this = this;
        var outerClick = function (e) {
            var target = e.target;
            while (target) {
                if (target === node || target === _this._popup) {
                    return;
                }
                target = target.parentNode;
            }
            if (_this._hide(true, e)) {
                document.removeEventListener("click", outerClick);
            }
        };
        document.addEventListener("click", outerClick);
        return function () { return document.removeEventListener("click", outerClick); };
    };
    Popup.prototype._hide = function (fromOuterClick, e) {
        if (this._isActive) {
            if (this.events.fire(types_1.PopupEvents.beforeHide, [fromOuterClick, e]) === false) {
                return false;
            }
            document.body.removeChild(this._popup);
            this._isActive = false;
            if (this._outerClickDestructor) {
                this._outerClickDestructor();
                this._outerClickDestructor = null;
            }
            this.events.fire(types_1.PopupEvents.afterHide);
            return true;
        }
    };
    return Popup;
}(view_1.View));
exports.Popup = Popup;


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function createScrollHelper(element) {
    var scrollHeight = element.scrollHeight;
    var scrollTop = element.scrollTop;
    return {
        update: function () {
            var newScrollHeight = element.scrollHeight;
            if (newScrollHeight > scrollHeight) {
                element.scrollTop += newScrollHeight - scrollHeight;
            }
            scrollHeight = newScrollHeight;
        },
        saveScrollTop: function () {
            scrollTop = element.scrollTop;
        },
        restoreScrollTop: function () {
            element.scrollTop = scrollTop;
        }
    };
}
exports.createScrollHelper = createScrollHelper;


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
var ts_colorpicker_1 = __webpack_require__(74);
var html_1 = __webpack_require__(1);
var ts_popup_1 = __webpack_require__(18);
var ts_toolbar_1 = __webpack_require__(21);
var constants_1 = __webpack_require__(5);
var other_1 = __webpack_require__(4);
var en_1 = __webpack_require__(11);
var types_1 = __webpack_require__(2);
var statistics_1 = __webpack_require__(32);
var styles_1 = __webpack_require__(19);
// move to richtext config
var defaultStyle = (_a = {},
    // textnode style
    _a[types_1.Modifier.fontFamily] = "Roboto",
    _a[types_1.Modifier.fontSize] = "14px",
    _a[types_1.Modifier.color] = "#4D4D4D",
    _a[types_1.Modifier.background] = "#FFFFFF",
    _a[types_1.Modifier.bold] = false,
    _a[types_1.Modifier.italic] = false,
    _a[types_1.Modifier.strike] = false,
    _a[types_1.Modifier.underline] = false,
    // block style
    _a[types_1.Modifier.style] = "p",
    _a[types_1.Modifier.blockquote] = false,
    _a[types_1.Modifier.align] = "left",
    _a);
var RichTextToolbarHelper = /** @class */ (function () {
    function RichTextToolbarHelper(parent, editor) {
        var _this = this;
        this._parent = parent;
        this._editor = editor;
        this.colorpicker = new ts_colorpicker_1.Colorpicker();
        this._statsPopup = new ts_popup_1.Popup();
        this._parent.events.on(types_1.RichTextEvents.change, function () {
            if (_this._statsPopup.isVisible()) {
                _this._statsPopup.hide();
            }
        });
        var toolbarBlocks = parent.config.toolbarBlocks;
        this.toolbar = new ts_toolbar_1.Toolbar(null, { css: "dhx_toolbar--bordered.dhx_toolbar--bg_gray" });
        this.toolbar.data.parse(constants_1.getToolbarData(toolbarBlocks, defaultStyle));
        this._defaultToolbarState = {};
        for (var _i = 0, toolbarBlocks_1 = toolbarBlocks; _i < toolbarBlocks_1.length; _i++) {
            var block = toolbarBlocks_1[_i];
            switch (block) {
                case types_1.RTEToolbarBlock.align:
                    this._defaultToolbarState[types_1.Modifier.align] = defaultStyle[types_1.Modifier.align];
                    break;
                case types_1.RTEToolbarBlock.color:
                    this._defaultToolbarState[types_1.Modifier.color] = defaultStyle[types_1.Modifier.color];
                    this._defaultToolbarState[types_1.Modifier.background] = defaultStyle[types_1.Modifier.background];
                    break;
                case types_1.RTEToolbarBlock.decoration:
                    this._defaultToolbarState[types_1.Modifier.bold] = defaultStyle[types_1.Modifier.bold];
                    this._defaultToolbarState[types_1.Modifier.italic] = defaultStyle[types_1.Modifier.italic];
                    this._defaultToolbarState[types_1.Modifier.underline] = defaultStyle[types_1.Modifier.underline];
                    this._defaultToolbarState[types_1.Modifier.strike] = defaultStyle[types_1.Modifier.strike];
                    break;
                case types_1.RTEToolbarBlock.style:
                    this._defaultToolbarState[types_1.Modifier.style] = defaultStyle[types_1.Modifier.style];
                    this._defaultToolbarState[types_1.Modifier.fontFamily] = defaultStyle[types_1.Modifier.fontFamily];
                    this._defaultToolbarState[types_1.Modifier.fontSize] = defaultStyle[types_1.Modifier.fontSize];
                    this._defaultToolbarState[types_1.Modifier.blockquote] = defaultStyle[types_1.Modifier.blockquote];
                    break;
            }
        }
        this._initEvents();
    }
    RichTextToolbarHelper.prototype._initEvents = function () {
        var _this = this;
        this._parent.events.on(types_1.RichTextEvents.selectionChange, function () {
            _this._updateState();
        });
        this._parent.events.on(types_1.RichTextEvents.change, function (action, canUndo, canRedo) {
            if (_this._parent.config.toolbarBlocks.indexOf(types_1.RTEToolbarBlock.undo) !== -1) {
                _this._updateUndoRedoState(canUndo, canRedo);
            }
            if (action !== types_1.Action.update) {
                _this._updateState();
            }
        });
        this.colorpicker.events.on(ts_colorpicker_1.ColorpickerEvents.colorChange, function (color) {
            _this._parent.events.fire(types_1.RichTextEvents.action, [
                types_1.Action.update,
                {
                    modifier: _this._colorpickerTarget,
                    modifierValue: color
                },
                true
            ]);
            _this.toolbar.data.update(_this._colorpickerTarget, {
                html: _this._colorpickerTarget === types_1.Modifier.color ? other_1.textColor(color) : other_1.textSelectColor(color)
            });
        });
        this.toolbar.events.on(ts_toolbar_1.NavigationBarEvents.click, function (id, e) { return _this._toolbarAction(id, e); });
    };
    RichTextToolbarHelper.prototype._toolbarAction = function (id, e) {
        var item = this.toolbar.data.getItem(id);
        var active = !item.active;
        switch (id) {
            case "bold":
                this._parent.events.fire(types_1.RichTextEvents.action, [
                    types_1.Action.update,
                    {
                        modifier: types_1.Modifier.bold,
                        modifierValue: active
                    },
                    true
                ]);
                this.toolbar.data.update("bold", { active: active });
                break;
            case "underline":
                this._parent.events.fire(types_1.RichTextEvents.action, [
                    types_1.Action.update,
                    {
                        modifier: types_1.Modifier.underline,
                        modifierValue: active
                    },
                    true
                ]);
                this.toolbar.data.update("underline", { active: active });
                break;
            case "italic":
                this._parent.events.fire(types_1.RichTextEvents.action, [
                    types_1.Action.update,
                    {
                        modifier: types_1.Modifier.italic,
                        modifierValue: active
                    },
                    true
                ]);
                this.toolbar.data.update("italic", { active: active });
                break;
            case "strike":
                this._parent.events.fire(types_1.RichTextEvents.action, [
                    types_1.Action.update,
                    {
                        modifier: types_1.Modifier.strike,
                        modifierValue: active
                    },
                    true
                ]);
                this.toolbar.data.update("strike", { active: active });
                break;
            case "color":
            case "background":
                this._colorpickerTarget = id === types_1.Modifier.background ? types_1.Modifier.background : types_1.Modifier.color;
                var currentColor = this._getColorState(this._colorpickerTarget);
                this.colorpicker.setValue(currentColor);
                this.colorpicker.paint();
                this.colorpicker.show(html_1.locateNode(e.target, "dhx_id"), html_1.Position.bottom);
                break;
            case "link":
                e.stopPropagation();
                this._parent.events.fire(types_1.RichTextEvents.showLinkEditor);
                break;
            case "redo":
                this._parent.events.fire(types_1.RichTextEvents.action, [types_1.Action.redo, null, true]);
                break;
            case "undo":
                this._parent.events.fire(types_1.RichTextEvents.action, [types_1.Action.undo, null, true]);
                break;
            case "clear-style":
                this._parent.events.fire(types_1.RichTextEvents.action, [types_1.Action.clear, null, true]);
                break;
            case "blockquote":
                this._parent.events.fire(types_1.RichTextEvents.action, [
                    types_1.Action.update,
                    {
                        modifier: types_1.Modifier.blockquote,
                        modifierValue: active
                    },
                    true
                ]);
                this.toolbar.data.update("blockquote", { active: active });
                break;
            case "fullscreen":
                if (item.$fullscreen) {
                    this._parent.exitFullScreen();
                }
                else {
                    this._parent.fullScreen();
                }
                break;
            case "stats":
                var node = html_1.locateNode(e);
                var isRange = this._editor.selection.get().range;
                this._statsPopup.attach(statistics_1.statsRenderer(this._parent.getStats(isRange), this._parent.config.customStats));
                this._statsPopup.show(node, { mode: html_1.Position.bottom, centering: true });
                break;
            default:
                var modifierValue = other_1.actionIdToModifierValue(id);
                switch (true) {
                    case other_1.startsWith(id, "font-size"):
                        this._parent.events.fire(types_1.RichTextEvents.action, [
                            types_1.Action.update,
                            {
                                modifier: types_1.Modifier.fontSize,
                                modifierValue: modifierValue + "px"
                            },
                            true
                        ]);
                        this.toolbar.data.update(types_1.Modifier.fontSize, { value: modifierValue + "px" });
                        break;
                    case other_1.startsWith(id, "align"):
                        this._parent.events.fire(types_1.RichTextEvents.action, [
                            types_1.Action.update,
                            {
                                modifier: types_1.Modifier.align,
                                modifierValue: modifierValue
                            },
                            true
                        ]);
                        this.toolbar.data.update("align-left", { active: modifierValue === "left" });
                        this.toolbar.data.update("align-right", { active: modifierValue === "right" });
                        this.toolbar.data.update("align-center", { active: modifierValue === "center" });
                        break;
                    case other_1.startsWith(id, "style"):
                        this._parent.events.fire(types_1.RichTextEvents.action, [
                            types_1.Action.update,
                            {
                                modifier: types_1.Modifier.style,
                                modifierValue: modifierValue
                            },
                            true
                        ]);
                        this.toolbar.data.update(types_1.Modifier.style, { value: en_1.default[modifierValue] });
                        break;
                    case other_1.startsWith(id, "font"):
                        this._parent.events.fire(types_1.RichTextEvents.action, [
                            types_1.Action.update,
                            {
                                modifier: types_1.Modifier.fontFamily,
                                modifierValue: other_1.actionIdToModifierValue(id)
                            },
                            true
                        ]);
                        this.toolbar.data.update(types_1.Modifier.fontFamily, { value: modifierValue });
                        break;
                }
        }
    };
    RichTextToolbarHelper.prototype._updateState = function () {
        var modifiers = this._getCommonModifiers();
        for (var key in modifiers) {
            switch (key) {
                // block modifiers
                case types_1.Modifier.align:
                    this.toolbar.data.update("align-left", { active: modifiers[key] === "left" });
                    this.toolbar.data.update("align-right", { active: modifiers[key] === "right" });
                    this.toolbar.data.update("align-center", { active: modifiers[key] === "center" });
                    break;
                case types_1.Modifier.style:
                    if (this._parent.config.toolbarBlocks.indexOf(types_1.RTEToolbarBlock.style) !== -1) {
                        this.toolbar.data.update(key, { value: en_1.default[modifiers[key]] });
                    }
                    break;
                case types_1.Modifier.blockquote:
                    this.toolbar.data.update("blockquote", { active: modifiers[key] });
                    break;
                // text modifiers
                case types_1.Modifier.color:
                    this.toolbar.data.update(key, {
                        html: other_1.textColor(modifiers[key])
                    });
                    break;
                case types_1.Modifier.background:
                    this.toolbar.data.update(key, {
                        html: other_1.textSelectColor(modifiers[key])
                    });
                    break;
                case types_1.Modifier.fontFamily:
                case types_1.Modifier.fontSize:
                    this.toolbar.data.update(key, { value: modifiers[key] });
                    break;
                case types_1.Modifier.italic:
                case types_1.Modifier.bold:
                case types_1.Modifier.underline:
                case types_1.Modifier.strike:
                    this.toolbar.data.update(key, { active: modifiers[key] });
                    break;
            }
        }
    };
    RichTextToolbarHelper.prototype._updateUndoRedoState = function (canUndo, canRedo) {
        if (canUndo) {
            this.toolbar.enable("undo");
        }
        else {
            this.toolbar.disable("undo");
        }
        if (canRedo) {
            this.toolbar.enable("redo");
        }
        else {
            this.toolbar.disable("redo");
        }
    };
    RichTextToolbarHelper.prototype._getCommonModifiers = function () {
        var _this = this;
        var commonTextStyle;
        var commonBlockStyle;
        this._editor.eachSelectedNode(function (node, block) {
            if (!commonTextStyle) {
                commonTextStyle = styles_1.getComputedNodeStyle(node, block, _this._defaultToolbarState);
                return;
            }
            var style = styles_1.getComputedNodeStyle(node, block, _this._defaultToolbarState);
            for (var key in commonTextStyle) {
                if (commonTextStyle[key] !== style[key]) {
                    delete commonTextStyle[key];
                }
            }
        });
        this._editor.eachSelectedBlock(function (block) {
            if (!commonBlockStyle) {
                commonBlockStyle = styles_1.getComputedBlockStyle(block, _this._defaultToolbarState);
                return;
            }
            var style = styles_1.getComputedBlockStyle(block, _this._defaultToolbarState);
            for (var key in commonBlockStyle) {
                if (commonBlockStyle[key] !== style[key]) {
                    delete commonBlockStyle[key];
                }
            }
        });
        return __assign({}, constants_1.defaultDiffrentStyle, commonBlockStyle, commonTextStyle);
    };
    RichTextToolbarHelper.prototype._getColorState = function (modifier) {
        var defaultColor = defaultStyle[modifier];
        var isSame = true;
        var initColor;
        this._editor.eachSelectedNode(function (node) {
            var color = node.style[modifier] || defaultColor;
            if (!initColor) {
                initColor = color;
            }
            else {
                isSame = isSame && initColor === color;
            }
        });
        return isSame ? initColor : defaultColor;
    };
    return RichTextToolbarHelper;
}());
exports.RichTextToolbarHelper = RichTextToolbarHelper;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(75));
__export(__webpack_require__(33));


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(0);
var events_1 = __webpack_require__(7);
var html_1 = __webpack_require__(1);
var view_1 = __webpack_require__(8);
var ts_popup_1 = __webpack_require__(18);
var core_1 = __webpack_require__(3);
var colorHelpers_1 = __webpack_require__(76);
var colors_1 = __webpack_require__(77);
var en_1 = __webpack_require__(78);
var types_1 = __webpack_require__(33);
var Colorpicker = /** @class */ (function (_super) {
    __extends(Colorpicker, _super);
    function Colorpicker(config) {
        var _this = _super.call(this, null, config) || this;
        _this._handleGripMove = function (e) {
            var paletteRect = _this.getRootView().refs.picker_palette.el.getBoundingClientRect();
            var top = e.clientY - paletteRect.top;
            var left = e.clientX - paletteRect.left;
            _this._calculatePaletteGrip(top, left);
            _this.paint();
        };
        _this._handleRangeMove = function (e) {
            var rangeRect = _this.getRootView().refs.hue_range.el.getBoundingClientRect();
            var rangeGripWidth = 3;
            var left = e.clientX - rangeRect.left - rangeGripWidth;
            _this._calculateRangeGrip(left);
            _this.paint();
        };
        _this.config = core_1.extend({
            css: "",
            customColors: true
        }, _this.config);
        _this._popup = new ts_popup_1.Popup({
            css: " dhx_colorpicker-popup " + _this.config.css
        });
        _this.events = new events_1.EventSystem(_this);
        _this._pickerState = {
            hsv: { h: 0, s: 1, v: 1 },
            currentView: "palette",
            customColors: [],
            customHex: ""
        };
        _this._handlers = {
            click: {
                ".dhx_palette__cell": _this._onColorClick.bind(_this)
            },
            mousedown: function (e) {
                var name = html_1.locate(e);
                _this._pickerState.customHex = "";
                var target = _this.getRootView().refs[name].el.getBoundingClientRect();
                if (name === "picker_palette") {
                    _this._calculatePaletteGrip(e.clientY - target.top, e.clientX - target.left);
                }
                else {
                    _this._calculateRangeGrip(e.clientX - target.left);
                }
                var handler = name === "picker_palette" ? _this._handleGripMove : _this._handleRangeMove;
                document.addEventListener("mousemove", handler);
                document.addEventListener("mouseup", function () {
                    document.removeEventListener("mousemove", handler);
                });
                _this.paint();
            },
            buttonsClick: function (button) {
                _this._pickerState.currentView = "palette";
                _this.paint();
                if (button === "cancel") {
                    return;
                }
                if (button === "apply" && _this._pickerState.customColors.indexOf(_this._pickerState.background) === -1) {
                    _this._pickerState.customColors.push(_this._pickerState.background);
                }
                _this._selected = _this._pickerState.background;
                _this.events.fire(types_1.ColorpickerEvents.colorChange, [_this._selected]);
                setTimeout(function () {
                    _this._popup.hide();
                }, 1);
            },
            customColorClick: function () {
                _this._pickerState.currentView = "picker";
                _this.paint();
            },
            oninput: function (e) {
                if (_this._inputTimeout) {
                    clearTimeout(_this._inputTimeout);
                }
                _this._inputTimeout = setTimeout(function () {
                    var val = e.target.value;
                    if (val.indexOf("#") === -1) {
                        val = "#" + val;
                    }
                    _this._pickerState.customHex = val;
                    if (colorHelpers_1.isHex(val)) {
                        _this._pickerState.hsv = colorHelpers_1.HexToHSV(val);
                        _this.paint();
                    }
                }, 100);
            },
            contextmenu: {
                ".dhx_palette__cell": function (e, node) {
                    e.preventDefault();
                    var color = _this._pickerState.customColors.indexOf(node.data.color);
                    if (color !== -1) {
                        _this._pickerState.customColors.splice(color, 1);
                    }
                    _this.paint();
                    return;
                }
            }
        };
        _this._popup.events.on(ts_popup_1.PopupEvents.afterHide, function () {
            _this._pickerState.currentView = "palette";
        });
        var view = dom_1.create({ render: function () { return _this._getContent(); } });
        _this.mount(_this._popup, view);
        return _this;
    }
    Colorpicker.prototype.setValue = function (value) {
        this._selected = value || null;
    };
    Colorpicker.prototype.getValue = function () {
        return this._selected;
    };
    Colorpicker.prototype.show = function (node, side) {
        if (side === void 0) { side = "bottom"; }
        this._popup.show(html_1.toNode(node), { mode: side, centering: true });
        this.paint();
    };
    Colorpicker.prototype.hide = function () {
        this._popup.hide();
    };
    Colorpicker.prototype._calculatePaletteGrip = function (top, left) {
        var paletteRect = this.getRootView().refs.picker_palette.el.getBoundingClientRect();
        var bottom = paletteRect.height;
        var right = paletteRect.width;
        top = top < 0 ? 0 : top > bottom ? bottom : top;
        left = left < 0 ? 0 : left > right ? right : left;
        var pLeft = Math.round(left / (right / 100));
        var pTop = 100 - Math.round(top / (bottom / 100));
        this._pickerState.hsv.s = pLeft / 100;
        this._pickerState.hsv.v = pTop / 100;
    };
    Colorpicker.prototype._calculateRangeGrip = function (left) {
        var rangeBox = this.getRootView().refs.hue_range.el.getBoundingClientRect();
        var right = rangeBox.width;
        left = left < 0 ? 0 : left > right ? right : left;
        this._pickerState.rangeLeft = left;
        this._pickerState.hsv.h = Math.round(360 * (left / right));
    };
    Colorpicker.prototype._getCells = function (colors, cellClass) {
        var _this = this;
        if (cellClass === void 0) { cellClass = ""; }
        return colors.reduce(function (cells, color) {
            var selected = _this._selected === color ? "dhx_palette__cell--selected" : "";
            cells.push(dom_1.el(".dhx_palette__cell", {
                class: selected + " " + cellClass,
                _data: { color: color },
                style: "background:" + color
            }));
            return cells;
        }, []);
    };
    Colorpicker.prototype._onColorClick = function (_ev, node) {
        this._selected = node.data.color;
        this.events.fire(types_1.ColorpickerEvents.colorChange, [this._selected]);
        this._popup.hide();
    };
    Colorpicker.prototype._getGrayShades = function () {
        return dom_1.el(".dhx_palette__row", this._getCells(colors_1.grayShades));
    };
    Colorpicker.prototype._getPalette = function () {
        var _this = this;
        return colors_1.palette.reduce(function (total, row) {
            total.push(dom_1.el(".dhx_palette__col", _this._getCells(row.colors)));
            return total;
        }, []);
    };
    Colorpicker.prototype._getPicker = function () {
        var rgb = colorHelpers_1.HSVtoRGB(this._pickerState.hsv);
        this._pickerState.background = colorHelpers_1.RGBToHex(rgb);
        var currentBackground = colorHelpers_1.RGBToHex(colorHelpers_1.HSVtoRGB({ h: this._pickerState.hsv.h, s: 1, v: 1 }));
        var root = this.getRootView();
        var box = root.refs ?
            root.refs.picker_palette.el.getBoundingClientRect()
            : { height: 200, width: 218, x: 0, y: 0 };
        var height = box.height - 2;
        var width = box.width - 2;
        var gripTop = (height - this._pickerState.hsv.v * height) - 4;
        var gripLeft = (this._pickerState.hsv.s * width) - 4;
        var rangeWidth = box.width - 6;
        var rangeGripLeft = rangeWidth - ((360 - this._pickerState.hsv.h) / 360) * rangeWidth;
        var inputValue = this._pickerState.customHex ?
            this._pickerState.customHex.replace("#", "")
            : this._pickerState.background.replace("#", "");
        return dom_1.el(".dhx_colorpicker-picker", {}, [
            dom_1.el(".dhx_colorpicker-picker__palette", {
                style: {
                    height: 132,
                    background: currentBackground
                },
                onmousedown: this._handlers.mousedown,
                dhx_id: "picker_palette",
                _ref: "picker_palette"
            }, [
                dom_1.el(".dhx_palette_grip", {
                    style: {
                        top: gripTop,
                        left: gripLeft
                    }
                })
            ]),
            dom_1.el(".dhx_colorpicker-hue-range", {
                style: { height: 16 },
                onmousedown: this._handlers.mousedown,
                dhx_id: "hue_range",
                _key: "hue_range",
                _ref: "hue_range"
            }, [
                dom_1.el(".dhx_colorpicker-hue-range__grip", { style: { left: rangeGripLeft } })
            ]),
            dom_1.el(".dhx_colorpicker-value", [
                dom_1.el(".dhx_colorpicker-value__color", { style: { background: this._pickerState.background } }),
                dom_1.el(".dhx_colorpicker-value__input-wrapper", [
                    dom_1.el("input", {
                        class: "dhx_colorpicker-value__input",
                        value: inputValue,
                        oninput: this._handlers.oninput,
                        maxlength: "7",
                        _key: "hex_input"
                    })
                ])
            ]),
            dom_1.el(".dhx_colorpicker-picker__buttons", [
                dom_1.el("button", {
                    class: "dhx_button dhx_button--size_medium dhx_button--type_link dhx_button--color_primary",
                    onclick: [this._handlers.buttonsClick, "cancel"]
                }, en_1.default.cancel),
                dom_1.el("button", {
                    class: "dhx_button dhx_button--size_medium dhx_button--type_flat dhx_button--color_primary",
                    onclick: [this._handlers.buttonsClick, "apply"]
                }, en_1.default.select)
            ])
        ]);
    };
    Colorpicker.prototype._getContent = function () {
        var view = this._pickerState.currentView === "palette" ? [
            this._getGrayShades()
        ].concat((this._getPalette()), [
            this.config.customColors && dom_1.el(".dhx_colorpicker-custom-colors", [
                dom_1.el(".dhx_colorpicker-custom-colors__header", [
                    en_1.default.customColors,
                    dom_1.el("span.dhx_colorpicker-custom-colors__hint", " (" + en_1.default.rightClickToDelete + ")")
                ]),
                dom_1.el(".dhx_palette--custom.dhx_palette__row", this._getCells(this._pickerState.customColors, "dhx_custom-color__cell").concat([
                    dom_1.el(".dhx_colorpicker-custom-colors__picker", { class: "dxi dxi-plus", onclick: this._handlers.customColorClick })
                ]))
            ]),
        ]) :
            [this._getPicker()];
        return dom_1.el(".dhx_colorpicker", [
            dom_1.el(".dhx_palette", {
                onclick: this._handlers.click,
                oncontextmenu: this._handlers.contextmenu
            }, view)
        ]);
    };
    return Colorpicker;
}(view_1.View));
exports.Colorpicker = Colorpicker;


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function HSVtoRGB(hsv) {
    var rgb = { r: 0, g: 0, b: 0 };
    var h = hsv.h / 60;
    var s = hsv.s;
    var v = hsv.v;
    var i = Math.floor(h) % 6;
    var f = h - Math.floor(h);
    var p = 255 * v * (1 - s);
    var q = 255 * v * (1 - (s * f));
    var t = 255 * v * (1 - (s * (1 - f)));
    v *= 255;
    switch (i) {
        case 0:
            rgb.r = v;
            rgb.g = t;
            rgb.b = p;
            break;
        case 1:
            rgb.r = q;
            rgb.g = v;
            rgb.b = p;
            break;
        case 2:
            rgb.r = p;
            rgb.g = v;
            rgb.b = t;
            break;
        case 3:
            rgb.r = p;
            rgb.g = q;
            rgb.b = v;
            break;
        case 4:
            rgb.r = t;
            rgb.g = p;
            rgb.b = v;
            break;
        case 5:
            rgb.r = v;
            rgb.g = p;
            rgb.b = q;
            break;
    }
    for (var key in rgb) {
        rgb[key] = Math.round(rgb[key]);
    }
    return rgb;
}
exports.HSVtoRGB = HSVtoRGB;
function RGBToHex(rgb) {
    return Object.keys(rgb).reduce(function (hex, c) {
        var h = rgb[c].toString(16).toUpperCase();
        h = h.length === 1 ? "0" + h : h;
        return hex += h;
    }, "#");
}
exports.RGBToHex = RGBToHex;
function HexToRGB(hex) {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (_m, r, g, b) {
        return r + r + g + g + b + b;
    });
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
exports.HexToRGB = HexToRGB;
function RGBToHSV(rgb) {
    var h;
    var s;
    var r = rgb.r / 255;
    var g = rgb.g / 255;
    var b = rgb.b / 255;
    var v = Math.max(r, g, b);
    var diff = v - Math.min(r, g, b);
    var diffc = function (c) {
        return (v - c) / 6 / diff + 1 / 2;
    };
    if (diff === 0) {
        h = s = 0;
    }
    else {
        s = diff / v;
        var rdif = diffc(r);
        var gdif = diffc(g);
        var bdif = diffc(b);
        if (r === v) {
            h = bdif - gdif;
        }
        else if (g === v) {
            h = (1 / 3) + rdif - bdif;
        }
        else if (b === v) {
            h = (2 / 3) + gdif - rdif;
        }
        if (h < 0) {
            h += 1;
        }
        else if (h > 1) {
            h -= 1;
        }
    }
    return {
        h: Math.floor(h * 360),
        s: s,
        v: v
    };
}
exports.RGBToHSV = RGBToHSV;
function HexToHSV(hex) {
    return RGBToHSV(HexToRGB(hex));
}
exports.HexToHSV = HexToHSV;
function isHex(hex) {
    return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(hex);
}
exports.isHex = isHex;


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.grayShades = [
    "#000000",
    "#4C4C4C",
    "#666666",
    "#808080",
    "#999999",
    "#B3B3B3",
    "#CCCCCC",
    "#E6E6E6",
    "#F2F2F2",
    "#FFFFFF"
];
exports.palette = [{
        colors: [
            "#D4DAE4",
            "#B0B8CD",
            "#949DB1",
            "#727A8C",
            "#5E6677",
            "#3F4757",
            "#1D2534"
        ]
    },
    {
        colors: [
            "#FFCDD2",
            "#FE9998",
            "#F35C4E",
            "#E94633",
            "#D73C2D",
            "#CA3626",
            "#BB2B1A"
        ]
    },
    {
        colors: [
            "#F9E6AD",
            "#F4D679",
            "#EDB90F",
            "#EAA100",
            "#EA8F00",
            "#EA7E00",
            "#EA5D00"
        ]
    },
    {
        colors: [
            "#BCE4CE",
            "#90D2AF",
            "#33B579",
            "#36955F",
            "#247346",
            "#1D5B38",
            "#17492D"
        ]
    },
    {
        colors: [
            "#BDF0E9",
            "#92E7DC",
            "#02D7C5",
            "#11B3A5",
            "#018B80",
            "#026B60",
            "#024F43"
        ]
    },
    {
        colors: [
            "#B3E5FC",
            "#81D4FA",
            "#29B6F6",
            "#039BE5",
            "#0288D1",
            "#0277BD",
            "#01579B"
        ]
    },
    {
        colors: [
            "#AEC1FF",
            "#88A3F9",
            "#5874CD",
            "#2349AE",
            "#163FA2",
            "#083596",
            "#002381"
        ]
    },
    {
        colors: [
            "#C5C0DA",
            "#9F97C1",
            "#7E6BAD",
            "#584A8F",
            "#4F4083",
            "#473776",
            "#3A265F"
        ]
    },
    {
        colors: [
            "#D6BDCC",
            "#C492AC",
            "#A9537C",
            "#963A64",
            "#81355A",
            "#6E3051",
            "#4C2640"
        ]
    },
    {
        colors: [
            "#D2C5C1",
            "#B4A09A",
            "#826358",
            "#624339",
            "#5D4037",
            "#4E342E",
            "#3E2723"
        ]
    }
];


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var en = {
    cancel: "Cancel",
    select: "Select",
    rightClickToDelete: "Right click to delete",
    customColors: "Custom colors"
};
exports.default = en;


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = __webpack_require__(5);
var markdown_1 = __webpack_require__(80);
var minimizer_1 = __webpack_require__(81);
var other_1 = __webpack_require__(4);
var parser_1 = __webpack_require__(82);
var serializer_1 = __webpack_require__(35);
var Manager_1 = __webpack_require__(84);
var types_1 = __webpack_require__(2);
var SelectionHelper_1 = __webpack_require__(86);
var Block_1 = __webpack_require__(34);
var TextNode_1 = __webpack_require__(20);
var styles_1 = __webpack_require__(19);
var Editor = /** @class */ (function () {
    function Editor(_a) {
        var events = _a.events, uid = _a.uid, getRootView = _a.getRootView, repaint = _a.repaint;
        var _this = this;
        this.getTextElement = function (blockIndex, textIndex) {
            var id = other_1.getTextHash(blockIndex, textIndex);
            var rootView = _this._getRootView();
            return rootView.refs && rootView.refs[id] && rootView.refs[id].el && rootView.refs[id].el.childNodes[0];
        };
        this._events = events;
        this._repaint = repaint;
        this._getRootView = getRootView;
        this.selection = new SelectionHelper_1.SelectionHelper(this, uid, events);
        this.clear();
        this.manager = new Manager_1.Manager(this);
        this._events.on(types_1.RichTextEvents.change, function (action) {
            if (action !== types_1.Action.update) {
                _this._tempNode = null;
            }
        });
        this._events.on(types_1.RichTextEvents.selectionChange, function () {
            _this._tempNode = null;
        });
    }
    Editor.prototype.clear = function () {
        this.blocks = [new Block_1.Block([new TextNode_1.TextNode("", constants_1.emptyStyle)])];
        this.selection.clear();
    };
    Editor.prototype.getState = function () {
        return JSON.stringify({
            b: this.blocks.map(function (block) { return ({
                s: minimizer_1.minimizeBlockStyle(block.style),
                n: block.textNodes.map(function (textNode) { return ({
                    s: minimizer_1.minimizeTextNodeStyle(textNode.style),
                    t: textNode.text
                }); })
            }); }),
            s: this.selection.getCompact()
        });
    };
    Editor.prototype.setState = function (state) {
        var raw = JSON.parse(state);
        this.blocks = raw.b.map(function (_a) {
            var s = _a.s, n = _a.n;
            var textNodes = n.map(function (node) { return new TextNode_1.TextNode(node.t, minimizer_1.textNodeStyleFromMinimize(node.s)); });
            var block = new Block_1.Block(textNodes, minimizer_1.blockStyleFromMinimize(s));
            return block;
        });
        this.selection.setCompact(raw.s);
    };
    Editor.prototype.parse = function (value, mode) {
        if (mode === void 0) { mode = "html"; }
        if (mode === "html" || mode === "markdown") {
            var blocks = parser_1.parser(value, mode);
            this.blocks = blocks;
        }
        else {
            this.blocks = value.map(function (block) { return new Block_1.Block(block.textNodes.map(function (textNode) { return new TextNode_1.TextNode(textNode.text, textNode.style); }), block.style); });
        }
        this.selection.set({
            range: false,
            left: __assign({ blockIndex: this.blocks.length - 1 }, this.blocks[this.blocks.length - 1].getBlockEnd())
        });
        return true;
    };
    Editor.prototype.serialize = function (mode) {
        if (mode === void 0) { mode = "html"; }
        this.balance();
        if (mode === "markdown") {
            return markdown_1.markdownSerializer(this.blocks);
        }
        if (mode === "html") {
            return serializer_1.serializer(this.blocks);
        }
        if (mode === "text") {
            return this.blocks.reduce(function (blockText, block, i) { return blockText + (i > 0 ? "\n" : "") +
                block.textNodes.reduce(function (text, textNode) { return text + textNode.text; }, ""); }, "");
        }
    };
    Editor.prototype.removeBlock = function (index) {
        this.blocks.splice(index, 1);
        if (this.blocks.length === 0) {
            this.clear();
        }
    };
    Editor.prototype.insertBlock = function () {
        this._splitCarret();
        var _a = this.selection.get(), range = _a.range, left = _a.left;
        if (range) {
            return;
        }
        var currentLineNodes = this.blocks[left.blockIndex].textNodes;
        var nextLineNodes = currentLineNodes.splice(left.textIndex + (left.offset ? 1 : 0), Infinity); // Infinity to remove all after left
        var nextLineBlockStyle = this.blocks[left.blockIndex].style;
        if (nextLineNodes.length === 0) {
            var style = this.blocks[left.blockIndex].textNodes[left.textIndex].style;
            nextLineNodes = [new TextNode_1.TextNode("", other_1.copyWithout(style, { link: true }))];
            nextLineBlockStyle = other_1.copyWithout(nextLineBlockStyle, { blockquote: true, style: true });
            nextLineBlockStyle[types_1.Modifier.style] = "p";
        }
        else {
            var link = currentLineNodes[currentLineNodes.length - 1] && currentLineNodes[currentLineNodes.length - 1].style.link;
            if (link) {
                for (var _i = 0, nextLineNodes_1 = nextLineNodes; _i < nextLineNodes_1.length; _i++) {
                    var textNode = nextLineNodes_1[_i];
                    if (textNode.style.link === link) {
                        textNode.style = other_1.copyWithout(textNode.style, { link: true });
                    }
                    else {
                        break;
                    }
                }
            }
        }
        if (currentLineNodes.length === 0) {
            this.blocks[left.blockIndex].clear();
        }
        var block = new Block_1.Block(nextLineNodes, nextLineBlockStyle);
        this.blocks.splice(left.blockIndex + 1, 0, block);
        this.selection.set({
            range: range,
            left: {
                offset: 0,
                textIndex: 0,
                blockIndex: left.blockIndex + 1
            }
        });
    };
    Editor.prototype.eachSelectedNode = function (fn) {
        var _a = this.selection.get(), range = _a.range, left = _a.left, right = _a.right;
        if (range) {
            for (var i = left.blockIndex; i <= right.blockIndex; i++) {
                var startNode = 0;
                var endNode = this.blocks[i].textNodes.length - 1;
                if (i === left.blockIndex) {
                    startNode = left.textIndex;
                }
                if (i === right.blockIndex) {
                    endNode = right.textIndex;
                }
                for (var j = startNode; j <= endNode; j++) {
                    fn(this.blocks[i].textNodes[j], this.blocks[i]);
                }
            }
        }
        else {
            if (left) {
                fn(this.blocks[left.blockIndex].textNodes[left.textIndex], this.blocks[left.blockIndex]);
            }
        }
    };
    Editor.prototype.eachSelectedBlock = function (fn) {
        var _a = this.selection.get(), range = _a.range, left = _a.left, right = _a.right;
        if (range) {
            for (var i = left.blockIndex; i <= right.blockIndex; i++) {
                fn(this.blocks[i], i);
            }
        }
        else {
            fn(this.blocks[left.blockIndex]);
        }
    };
    Editor.prototype.copy = function () {
        var range = this.selection.get().range;
        if (!range) {
            return false;
        }
        this._splitRange();
        var editorContent = [];
        var raw = "";
        var _a = this.selection.get(), left = _a.left, right = _a.right;
        this.eachSelectedBlock(function (block, index) {
            var startIndex = 0;
            var endIndex = block.textNodes.length - 1;
            var textNodes = [];
            editorContent.push({
                style: block.style,
                textNodes: textNodes
            });
            if (index === left.blockIndex) {
                startIndex = left.textIndex;
            }
            if (index === right.blockIndex) {
                endIndex = right.textIndex;
            }
            for (var i = startIndex; i <= endIndex; i++) {
                var textNode = block.textNodes[i];
                textNodes.push({
                    style: textNode.style,
                    text: textNode.text
                });
                raw += textNode.text;
            }
            if (index < right.blockIndex) {
                raw += "\n";
            }
        });
        return {
            content: editorContent,
            raw: raw
        };
    };
    Editor.prototype.cut = function () {
        var result = this.copy();
        this._splitRange();
        this._removeRange();
        return result;
    };
    Editor.prototype.paste = function (value, mode) {
        if (mode === void 0) { mode = "text"; }
        var _a, _b, _c;
        if (mode === "text") {
            return this.add(value);
        }
        else {
            var range = this.selection.get().range;
            if (range) {
                this._splitRange();
                this._removeRange();
            }
            var left = this.selection.get().left;
            var _d = mode === "inner" ? JSON.parse(value) : parser_1.parser(value, "html"), firstBlock = _d[0], blocks = _d.slice(1);
            var lastLineIndex = void 0;
            if (this.blocks[left.blockIndex].isEmpty()) { // destroy empty node
                this.blocks[left.blockIndex].textNodes = [];
                this.blocks[left.blockIndex].style = firstBlock.style;
            }
            else { // split node before paste
                var splitResult = this.blocks[left.blockIndex].splitTextNode(left.textIndex, left.offset);
                switch (splitResult) {
                    case Block_1.SplitResult.offsetStart:
                        lastLineIndex = left.textIndex;
                        break;
                    case Block_1.SplitResult.offsetEnd:
                    case Block_1.SplitResult.complete:
                        lastLineIndex = left.textIndex + 1;
                        break;
                }
            }
            var currentLineNodes = void 0;
            var lastLineNodes = void 0;
            if (lastLineIndex > 0) {
                currentLineNodes = this.blocks[left.blockIndex].textNodes.slice(0, lastLineIndex);
                lastLineNodes = this.blocks[left.blockIndex].textNodes.slice(lastLineIndex, Infinity);
            }
            else {
                currentLineNodes = [];
                lastLineNodes = this.blocks[left.blockIndex].textNodes;
            }
            for (var _i = 0, _e = firstBlock.textNodes; _i < _e.length; _i++) {
                var textNode = _e[_i];
                currentLineNodes.push(new TextNode_1.TextNode(textNode.text, textNode.style));
            }
            this.blocks[left.blockIndex].textNodes = currentLineNodes;
            if (blocks.length) {
                var newBlocks = blocks.map(function (block) { return new Block_1.Block(block.textNodes.map(function (node) { return new TextNode_1.TextNode(node.text, node.style); }), block.style); });
                (_a = this.blocks).splice.apply(_a, [left.blockIndex + 1, 0].concat(newBlocks));
                var blockEnd = this.blocks[left.blockIndex + blocks.length].getBlockEnd();
                (_b = this.blocks[left.blockIndex + blocks.length].textNodes).push.apply(_b, lastLineNodes);
                this.selection.set({
                    range: false,
                    left: __assign({ blockIndex: left.blockIndex + blocks.length }, blockEnd)
                });
            }
            else {
                var blockEnd = this.blocks[left.blockIndex].getBlockEnd();
                (_c = this.blocks[left.blockIndex].textNodes).push.apply(_c, lastLineNodes);
                this.selection.set({
                    range: false,
                    left: __assign({ blockIndex: left.blockIndex }, blockEnd)
                });
            }
            return true;
        }
    };
    Editor.prototype.add = function (data) {
        var range = this.selection.get().range;
        if (range) {
            this._splitRange();
            this._removeRange();
        }
        if (data.newBlock) {
            this.insertBlock();
            return true;
        }
        var _a = this.selection.get().left, offset = _a.offset, blockIndex = _a.blockIndex, textIndex = _a.textIndex;
        if (this._tempNode && this._tempNode.offset === offset &&
            this._tempNode.blockIndex === blockIndex && this._tempNode.textIndex === textIndex) {
            return this._createNodeFromTemp(data);
        }
        var textNodes = this.blocks[blockIndex].textNodes;
        var textNode = textNodes[textIndex];
        if (textNode.style.link && textNode.text.length === offset && (!textNodes[textIndex + 1] || !textNodes[textIndex + 1].style.link)) {
            var newTextNode = new TextNode_1.TextNode(data, other_1.copyWithout(textNode.style, { link: true }));
            textNodes.splice(textIndex + 1, 0, newTextNode);
            this.selection.set({
                range: false,
                left: {
                    offset: data.length,
                    blockIndex: blockIndex,
                    textIndex: textIndex + 1
                }
            });
        }
        else if (textNode.style.link && offset === 0) {
            var newTextNode = new TextNode_1.TextNode(data, other_1.copyWithout(textNode.style, { link: true }));
            textNodes.splice(textIndex, 0, newTextNode);
            this.selection.set({
                range: false,
                left: {
                    offset: data.length,
                    blockIndex: blockIndex,
                    textIndex: textIndex
                }
            });
        }
        else {
            textNodes[textIndex].insert(data, offset);
            this.selection.set({
                range: false,
                left: {
                    offset: offset + data.length,
                    blockIndex: blockIndex,
                    textIndex: textIndex
                }
            });
        }
        return true;
    };
    Editor.prototype.remove = function (prev) {
        var range = this.selection.get().range;
        if (range) {
            this._splitRange();
            this._removeRange();
            return true;
        }
        else {
            return this._removeSymbol(prev);
        }
    };
    Editor.prototype.update = function (_a) {
        var modifier = _a.modifier, modifierValue = _a.modifierValue;
        var _b = this.selection.get(), range = _b.range, left = _b.left;
        switch (modifier) {
            // block modifiers
            case types_1.Modifier.align:
            case types_1.Modifier.style:
            case types_1.Modifier.blockquote:
                this.eachSelectedBlock(function (block) {
                    var _a;
                    block.style = __assign({}, block.style, (_a = {}, _a[modifier] = modifierValue, _a));
                    if (modifier === types_1.Modifier.style && modifierValue !== "p") {
                        block.textNodes.forEach(function (textNode) {
                            var _a;
                            textNode.style = other_1.copyWithout(textNode.style, (_a = {}, _a[types_1.Modifier.fontSize] = true, _a));
                        });
                    }
                });
                return true;
            // text modifers
            case types_1.Modifier.strike:
            case types_1.Modifier.underline:
            case types_1.Modifier.italic:
            case types_1.Modifier.bold:
            case types_1.Modifier.color:
            case types_1.Modifier.background:
            case types_1.Modifier.fontFamily:
            case types_1.Modifier.fontSize:
                if (!range) {
                    this._createTempTextNode({ modifier: modifier, modifierValue: modifierValue });
                    return false;
                }
                this._splitRange();
                this.eachSelectedNode(function (node) {
                    var _a;
                    node.style = __assign({}, node.style, (_a = {}, _a[modifier] = modifierValue, _a));
                });
                return true;
            case types_1.Modifier.link:
                var leftTextNode = this.blocks[left.blockIndex].textNodes[left.textIndex];
                if (modifier === undefined || leftTextNode.style.link !== undefined) {
                    this._eachLink(function (node) {
                        var _a;
                        node.style = __assign({}, node.style, (_a = {}, _a[modifier] = modifierValue, _a));
                    });
                }
                else {
                    if (range) {
                        this._splitRange();
                    }
                    this.eachSelectedNode(function (node) {
                        var _a;
                        node.style = __assign({}, node.style, (_a = {}, _a[modifier] = modifierValue, _a));
                    });
                }
                return true;
        }
    };
    Editor.prototype.clearStyles = function () {
        if (!this.selection.get().range) {
            return false;
        }
        this._splitRange();
        this.eachSelectedNode(function (node) {
            node.style = constants_1.emptyStyle;
        });
        return true;
    };
    Editor.prototype.balance = function () {
        var _a = this.selection.get(), left = _a.left, right = _a.right, range = _a.range;
        var leftOffset = this.blocks[left.blockIndex].nodePositionToOffset(left.textIndex, left.offset);
        var rightOffset;
        if (range) {
            rightOffset = this.blocks[right.blockIndex].nodePositionToOffset(right.textIndex, right.offset);
        }
        var notChanged = true;
        this.blocks.forEach(function (block) {
            if (block.balance()) {
                notChanged = false;
            }
        });
        if (notChanged) {
            return;
        }
        this.selection.set({
            range: range,
            left: __assign({ blockIndex: left.blockIndex }, this.blocks[left.blockIndex].offsetToNodePosition(leftOffset)),
            right: rightOffset && __assign({ blockIndex: right.blockIndex }, this.blocks[right.blockIndex].offsetToNodePosition(rightOffset))
        });
        this._repaint();
    };
    Editor.prototype.getLinkInfo = function () {
        var text = "";
        var link;
        this._eachLink(function (textNode) {
            text += textNode.text;
            link = textNode.style.link;
        });
        return { text: text, link: link };
    };
    Editor.prototype.updateLinkText = function (text) {
        var _a = this.selection.get(), left = _a.left, range = _a.range;
        var textNodes = this.blocks[left.blockIndex].textNodes;
        var link = textNodes[left.textIndex].style.link;
        var textNode = new TextNode_1.TextNode(text, {});
        if (link) {
            var linkLeftIndex = left.textIndex;
            var linkRightIndex = left.textIndex;
            while (textNodes[linkLeftIndex - 1] && textNodes[linkLeftIndex - 1].style.link === link) {
                linkLeftIndex--;
            }
            while (textNodes[linkRightIndex + 1] && textNodes[linkRightIndex + 1].style.link === link) {
                linkRightIndex++;
            }
            textNodes.splice(linkLeftIndex, linkRightIndex - linkLeftIndex + 1, textNode);
            this.selection.set({
                range: true,
                left: {
                    blockIndex: left.blockIndex,
                    textIndex: linkLeftIndex,
                    offset: 0
                },
                right: {
                    blockIndex: left.blockIndex,
                    textIndex: linkLeftIndex,
                    offset: text.length
                }
            });
        }
        else {
            if (range) {
                this._splitRange();
                this._removeRange();
                var _b = this.selection.get().left, blockIndex = _b.blockIndex, textIndex = _b.textIndex;
                this.blocks[blockIndex].textNodes.splice(textIndex + 1, 0, textNode);
                this.selection.set({
                    range: true,
                    left: {
                        blockIndex: blockIndex,
                        textIndex: textIndex + 1,
                        offset: 0
                    },
                    right: {
                        blockIndex: blockIndex,
                        textIndex: textIndex + 1,
                        offset: text.length
                    }
                });
            }
            else {
                var index = void 0;
                if (this.blocks[left.blockIndex].isEmpty()) {
                    textNodes.splice(0, 1);
                    index = 0;
                }
                else {
                    var splitResult = this.blocks[left.blockIndex].splitTextNode(left.textIndex, left.offset);
                    index = splitResult === Block_1.SplitResult.offsetStart ? left.textIndex : left.textIndex + 1;
                }
                textNodes.splice(index, 0, textNode);
                this.selection.set({
                    range: true,
                    left: {
                        blockIndex: left.blockIndex,
                        textIndex: index,
                        offset: 0
                    },
                    right: {
                        blockIndex: left.blockIndex,
                        textIndex: index,
                        offset: text.length
                    }
                });
            }
        }
    };
    Editor.prototype._splitRange = function () {
        // left selection must have offset = 0
        // right selection must have offset = end of textnode
        var _a = this.selection.get(), range = _a.range, left = _a.left, right = _a.right;
        if (!range) {
            return;
        }
        // 1 - left and right are single text node
        if (left.blockIndex === right.blockIndex && left.textIndex === right.textIndex) {
            var rightTextIndex = left.textIndex;
            var rightOffset = right.offset;
            var leftSplitResult = this.blocks[left.blockIndex].splitTextNode(left.textIndex, left.offset);
            // in this case left cant return SplitResult.offsetEnd coz this textNode has right
            // if node was splited need to update right text index and right offset
            if (leftSplitResult === Block_1.SplitResult.complete) {
                rightTextIndex += 1;
                rightOffset -= left.offset;
            }
            this.blocks[right.blockIndex].splitTextNode(rightTextIndex, rightOffset);
            var selection = {
                range: range,
                left: { blockIndex: left.blockIndex, textIndex: rightTextIndex, offset: 0 },
                right: { blockIndex: right.blockIndex, textIndex: rightTextIndex, offset: rightOffset }
            };
            this.selection.set(selection);
            return;
        }
        // 2 - left and right located in one block, so left split can move right position
        if (left.blockIndex === right.blockIndex) {
            var leftTextIndex = left.textIndex;
            var rightTextIndex = right.textIndex;
            var leftSplitResult = this.blocks[left.blockIndex].splitTextNode(leftTextIndex, left.offset);
            // move selection to next node
            if (leftSplitResult === Block_1.SplitResult.offsetEnd) {
                leftTextIndex += 1;
            }
            // move selection to next node and update right position
            if (leftSplitResult === Block_1.SplitResult.complete) {
                rightTextIndex += 1;
                leftTextIndex += 1;
            }
            this.blocks[right.blockIndex].splitTextNode(rightTextIndex, right.offset);
            var selection = {
                range: range,
                left: { blockIndex: left.blockIndex, textIndex: leftTextIndex, offset: 0 },
                right: { blockIndex: right.blockIndex, textIndex: rightTextIndex, offset: right.offset }
            };
            this.selection.set(selection);
            return;
        }
        // 3 - left and right located in diffrent blocks
        if (left.blockIndex !== right.blockIndex) {
            var leftTextIndex = left.textIndex;
            var leftBlockIndex = left.blockIndex;
            var leftSplitResult = this.blocks[left.blockIndex].splitTextNode(left.textIndex, left.offset);
            this.blocks[right.blockIndex].splitTextNode(right.textIndex, right.offset);
            if (leftSplitResult === Block_1.SplitResult.offsetEnd) {
                // if this textnode have next node
                if (this.blocks[leftBlockIndex].textNodes[leftTextIndex + 1]) {
                    leftTextIndex += 1;
                }
                else {
                    leftTextIndex = 0;
                    leftBlockIndex += 1;
                }
            }
            if (leftSplitResult === Block_1.SplitResult.complete) {
                leftTextIndex += 1;
            }
            var selection = {
                range: range,
                left: { blockIndex: leftBlockIndex, textIndex: leftTextIndex, offset: 0 },
                right: { blockIndex: right.blockIndex, textIndex: right.textIndex, offset: right.offset }
            };
            this.selection.set(selection);
        }
    };
    Editor.prototype._splitCarret = function () {
        // need for split block into text nodes
        var _a = this.selection.get(), range = _a.range, left = _a.left;
        if (range) {
            return;
        }
        var splitResult = this.blocks[left.blockIndex].splitTextNode(left.textIndex, left.offset);
        if (splitResult === Block_1.SplitResult.complete) {
            var selection = {
                range: range,
                left: {
                    blockIndex: left.blockIndex,
                    textIndex: left.textIndex + 1,
                    offset: 0
                }
            };
            this.selection.set(selection);
        }
    };
    Editor.prototype._removeRange = function () {
        var _a;
        // call only after splitRange
        var _b = this.selection.get(), left = _b.left, right = _b.right;
        if (!right) {
            return;
        }
        if (this.selection.isFull()) {
            this.clear();
            return;
        }
        if (left.blockIndex === right.blockIndex) {
            // selection contains full block
            if (left.textIndex === 0 && right.textIndex === this.blocks[right.blockIndex].textNodes.length - 1) {
                this.blocks[left.blockIndex].clear();
                this.selection.set({
                    range: false,
                    left: __assign({}, left, { offset: 0 })
                });
            }
            else {
                this.blocks[left.blockIndex].textNodes.splice(left.textIndex, right.textIndex - left.textIndex + 1);
                if (left.textIndex === 0) {
                    this.selection.set({
                        range: false,
                        left: {
                            blockIndex: left.blockIndex,
                            textIndex: 0,
                            offset: 0
                        }
                    });
                }
                else {
                    this.selection.set({
                        range: false,
                        left: {
                            blockIndex: left.blockIndex,
                            textIndex: left.textIndex - 1,
                            offset: this.blocks[left.blockIndex].textNodes[left.textIndex - 1].text.length
                        }
                    });
                }
            }
        }
        else {
            var isFullLeftRemove = this.blocks[left.blockIndex].removeNodes(left.textIndex, true);
            var isFullRightRemove = this.blocks[right.blockIndex].removeNodes(right.textIndex, false);
            var leftBlockEnd = this.blocks[left.blockIndex].getBlockEnd();
            switch (true) {
                case isFullLeftRemove && isFullRightRemove:
                    this.blocks[left.blockIndex].clear();
                    break;
                case isFullLeftRemove && !isFullRightRemove:
                    this.blocks[left.blockIndex].textNodes = this.blocks[right.blockIndex].textNodes;
                    break;
                case !isFullLeftRemove && !isFullRightRemove:
                    (_a = this.blocks[left.blockIndex].textNodes).push.apply(_a, this.blocks[right.blockIndex].textNodes);
                    break;
                case !isFullLeftRemove && isFullRightRemove:
                    break;
            }
            for (var i = right.blockIndex; i > left.blockIndex; i--) {
                this.removeBlock(i); // FIX
            }
            if (isFullLeftRemove) {
                this.selection.set({
                    range: false,
                    left: {
                        blockIndex: left.blockIndex,
                        textIndex: left.textIndex,
                        offset: 0
                    }
                });
            }
            else {
                this.selection.set({
                    range: false,
                    left: __assign({ blockIndex: left.blockIndex }, leftBlockEnd)
                });
            }
        }
    };
    Editor.prototype._removeSymbol = function (prev) {
        var _a = this.selection.get().left, offset = _a.offset, blockIndex = _a.blockIndex, textIndex = _a.textIndex;
        var selection = {
            range: false,
            left: { offset: offset, blockIndex: blockIndex, textIndex: textIndex }
        };
        var blockEnd = this.blocks[blockIndex].getBlockEnd();
        var textNodes = this.blocks[blockIndex].textNodes;
        var textNode = textNodes[textIndex];
        var repeat = false;
        switch (true) {
            case this.blocks[blockIndex].isEmpty():
                if (blockIndex === 0 && prev) {
                    if (!styles_1.isEmptyBlockStyle(this.blocks[0].style)) {
                        this.blocks[0].style = constants_1.emptyStyle;
                        return true;
                    }
                    return false;
                }
                if (!prev && !this.blocks[blockIndex + 1]) {
                    return false;
                }
                this.removeBlock(blockIndex);
                if (blockIndex === 0) {
                    selection.left.offset = 0;
                    selection.left.textIndex = 0;
                }
                else {
                    if (prev) {
                        selection.left = __assign({ blockIndex: blockIndex - 1 }, this.blocks[blockIndex - 1].getBlockEnd());
                    }
                }
                break;
            case offset === 0 && textIndex === 0 && prev: // move all nodes of this block to previous
                if (blockIndex === 0) {
                    return false;
                }
                if (this.blocks[blockIndex - 1].isEmpty()) {
                    this.blocks[blockIndex - 1].textNodes = textNodes;
                    this.removeBlock(blockIndex);
                    selection.left = {
                        blockIndex: blockIndex - 1,
                        textIndex: 0,
                        offset: 0
                    };
                }
                else {
                    var previousBlockEnd = this.blocks[blockIndex - 1].getBlockEnd();
                    this.blocks[blockIndex - 1].textNodes = this.blocks[blockIndex - 1].textNodes.concat(textNodes);
                    this.removeBlock(blockIndex);
                    selection.left = __assign({ blockIndex: blockIndex - 1 }, previousBlockEnd);
                }
                break;
            case blockEnd.offset === offset && blockEnd.textIndex === textIndex && !prev: // move all nodes of next block to this block
                var nextBlock = this.blocks[blockIndex + 1];
                if (!nextBlock) {
                    return;
                }
                if (nextBlock.isEmpty()) {
                    this.removeBlock(blockIndex + 1);
                    return true;
                }
                this.blocks[blockIndex].textNodes = this.blocks[blockIndex].textNodes.concat(nextBlock.textNodes);
                this.removeBlock(blockIndex + 1);
                break;
            default:
                var removeResult = textNode.remove(offset, prev);
                switch (removeResult) {
                    case TextNode_1.RemoveTextResult.nullTextLength:
                        if (textNodes.length > 1) {
                            textNodes.splice(textIndex, 1);
                            if (textIndex === 0) {
                                selection.left = {
                                    blockIndex: blockIndex,
                                    textIndex: 0,
                                    offset: 0
                                };
                            }
                            else {
                                selection.left = {
                                    blockIndex: blockIndex,
                                    textIndex: textIndex - 1,
                                    offset: textNodes[textIndex - 1].text.length
                                };
                            }
                        }
                        else {
                            textNode.style = constants_1.emptyStyle;
                            selection.left = {
                                textIndex: textIndex,
                                blockIndex: blockIndex,
                                offset: 0
                            };
                        }
                        break;
                    case TextNode_1.RemoveTextResult.complete:
                        if (prev) {
                            selection.left = {
                                blockIndex: blockIndex,
                                textIndex: textIndex,
                                offset: offset - 1
                            };
                        }
                        break;
                    case TextNode_1.RemoveTextResult.forceRemoveNext:
                        selection.left = {
                            blockIndex: blockIndex,
                            textIndex: textIndex + 1,
                            offset: 0
                        };
                        repeat = true;
                        break;
                    case TextNode_1.RemoveTextResult.forceRemovePrevious:
                        selection.left = {
                            blockIndex: blockIndex,
                            textIndex: textIndex - 1,
                            offset: textNodes[textIndex - 1].text.length
                        };
                        repeat = true;
                        break;
                }
        }
        this.selection.set(selection);
        if (repeat) {
            return this._removeSymbol(prev);
        }
        return true;
    };
    Editor.prototype._eachLink = function (fn) {
        var left = this.selection.get().left;
        var link = this.blocks[left.blockIndex].textNodes[left.textIndex].style.link;
        if (!link) {
            return;
        }
        var block = this.blocks[left.blockIndex];
        var textNodes = block.textNodes;
        var linkNodes = [];
        for (var i = left.textIndex; i >= 0; i--) {
            if (textNodes[i].style.link !== link) {
                break;
            }
            linkNodes.unshift(textNodes[i]);
        }
        for (var i = left.textIndex + 1; i < textNodes.length; i++) {
            if (textNodes[i].style.link !== link) {
                break;
            }
            linkNodes.push(textNodes[i]);
        }
        linkNodes.forEach(fn);
    };
    Editor.prototype._createTempTextNode = function (_a) {
        var modifier = _a.modifier, modifierValue = _a.modifierValue;
        var _b;
        var _c = this.selection.get().left, offset = _c.offset, blockIndex = _c.blockIndex, textIndex = _c.textIndex;
        var nodeStyle;
        if (this._tempNode && this._tempNode.offset === offset &&
            this._tempNode.blockIndex === blockIndex && this._tempNode.textIndex === textIndex) {
            nodeStyle = this._tempNode.style;
        }
        else {
            nodeStyle = this.blocks[blockIndex].textNodes[textIndex].style;
        }
        var tempStyle = __assign({}, nodeStyle, (_b = {}, _b[modifier] = modifierValue, _b));
        var textNodes = this.blocks[blockIndex].textNodes;
        if (tempStyle.link && (!textNodes[textIndex + 1] || !textNodes[textIndex + 1].style.link)) {
            delete tempStyle.link;
        }
        this._tempNode = {
            style: tempStyle,
            blockIndex: blockIndex,
            textIndex: textIndex,
            offset: offset
        };
    };
    Editor.prototype._createNodeFromTemp = function (data) {
        var _a = this._tempNode, style = _a.style, blockIndex = _a.blockIndex, textIndex = _a.textIndex, offset = _a.offset;
        var splitResult = this.blocks[blockIndex].splitTextNode(textIndex, offset);
        var newTextIndex = splitResult === Block_1.SplitResult.offsetStart ? textIndex : textIndex + 1;
        var textNode = new TextNode_1.TextNode(data, style);
        if (this.blocks[blockIndex].isEmpty()) {
            this.blocks[blockIndex].textNodes = [textNode];
        }
        else {
            this.blocks[blockIndex].textNodes.splice(newTextIndex, 0, textNode);
        }
        this.selection.set({
            range: false,
            left: {
                blockIndex: blockIndex,
                textIndex: newTextIndex,
                offset: data.length
            }
        });
        this._tempNode = null;
        return true;
    };
    return Editor;
}());
exports.Editor = Editor;


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = __webpack_require__(2);
function markdownSerializer(blocks) {
    return blocks.reduce(function (res, block, i) { return res + (i ? "\n\n" : "") + blockPrefix(block) + serializeBlockContent(block); }, "");
}
exports.markdownSerializer = markdownSerializer;
function blockPrefix(block) {
    switch (block.style[types_1.Modifier.style]) {
        case "h1":
            return "# ";
        case "h2":
            return "## ";
        case "h3":
            return "### ";
        case "h4":
            return "#### ";
        case "h5":
            return "##### ";
        case "h6":
            return "###### ";
        default:
            return "";
    }
}
function serializeBlockContent(block) {
    var result = "";
    var textNodes = block.textNodes;
    var group = [];
    var currentLink;
    for (var _i = 0, textNodes_1 = textNodes; _i < textNodes_1.length; _i++) {
        var textNode = textNodes_1[_i];
        if (textNode.style.link) {
            if (currentLink === textNode.style.link) {
                group.push(textNode);
            }
            else {
                if (group.length) {
                    result += serializeGroup(group, currentLink);
                }
                group = [textNode];
            }
        }
        else {
            if (currentLink) {
                if (group.length) {
                    result += serializeGroup(group, currentLink);
                }
                group = [textNode];
            }
            else {
                group.push(textNode);
            }
        }
        currentLink = textNode.style.link;
    }
    result += serializeGroup(group, currentLink);
    return result;
}
var Decorator;
(function (Decorator) {
    Decorator["bold"] = "**";
    Decorator["italic"] = "*";
    // strike = "~~"
})(Decorator || (Decorator = {}));
function serializeGroup(textNodes, link) {
    var result = "";
    var prevDecorators = [];
    for (var _i = 0, textNodes_2 = textNodes; _i < textNodes_2.length; _i++) {
        var textNode = textNodes_2[_i];
        var currentDecorators = [];
        var style = textNode.style;
        if (style[types_1.Modifier.bold]) {
            currentDecorators.push(Decorator.bold);
        }
        if (style[types_1.Modifier.italic]) {
            currentDecorators.push(Decorator.italic);
        }
        var dif = decoratorsDif(prevDecorators, currentDecorators);
        result += dif.join("") + textNode.text;
        prevDecorators = currentDecorators;
    }
    result += prevDecorators.join("");
    if (link) {
        result = "[" + result + "](" + link + ")";
    }
    return result;
}
function decoratorsDif(prev, current) {
    var open = current.filter(function (decorator) { return prev.indexOf(decorator) === -1; });
    var close = prev.filter(function (decorator) { return current.indexOf(decorator) === -1; });
    return open.concat(close);
}


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = __webpack_require__(2);
function minimizeTextNodeStyle(style) {
    var formatting = style[types_1.Modifier.bold] | style[types_1.Modifier.italic] << 1 | style[types_1.Modifier.underline] << 2 | style[types_1.Modifier.strike] << 3;
    var minimal = {};
    if (formatting !== 0) {
        minimal.f = formatting;
    }
    if (style[types_1.Modifier.fontSize]) {
        minimal.s = parseInt(style[types_1.Modifier.fontSize], 10);
    }
    if (style[types_1.Modifier.fontFamily]) {
        minimal.t = style[types_1.Modifier.fontFamily];
    }
    if (style[types_1.Modifier.color]) {
        minimal.c = style[types_1.Modifier.color];
    }
    if (style[types_1.Modifier.background]) {
        minimal.b = style[types_1.Modifier.background];
    }
    if (style[types_1.Modifier.link]) {
        minimal.a = style[types_1.Modifier.link];
    }
    return minimal;
}
exports.minimizeTextNodeStyle = minimizeTextNodeStyle;
function textNodeStyleFromMinimize(minimal) {
    var result = {};
    if (minimal.f) {
        if (minimal.f & 1) {
            result[types_1.Modifier.bold] = true;
        }
        if (minimal.f & 2) {
            result[types_1.Modifier.italic] = true;
        }
        if (minimal.f & 4) {
            result[types_1.Modifier.underline] = true;
        }
        if (minimal.f & 8) {
            result[types_1.Modifier.strike] = true;
        }
    }
    if (minimal.s) {
        result[types_1.Modifier.fontSize] = minimal.s + "px";
    }
    if (minimal.t) {
        result[types_1.Modifier.fontFamily] = minimal.t;
    }
    if (minimal.c) {
        result[types_1.Modifier.color] = minimal.c;
    }
    if (minimal.b) {
        result[types_1.Modifier.background] = minimal.b;
    }
    if (minimal.a) {
        result[types_1.Modifier.link] = minimal.a;
    }
    return result;
}
exports.textNodeStyleFromMinimize = textNodeStyleFromMinimize;
var alignToNumber = {
    left: 1,
    center: 2,
    right: 3
};
var numberToAlign = {
    1: "left",
    2: "center",
    3: "right"
};
var styleToNumber = {
    h1: 1,
    h2: 2,
    h3: 3,
    h4: 4,
    h5: 5,
    h6: 6
};
var numberToStyle = {
    1: "h1",
    2: "h2",
    3: "h3",
    4: "h4",
    5: "h5",
    6: "h6"
};
function minimizeBlockStyle(style) {
    var minimal = {};
    if (style[types_1.Modifier.blockquote]) {
        minimal.b = 1;
    }
    if (style[types_1.Modifier.style]) {
        var value = styleToNumber[style[types_1.Modifier.style]];
        if (value) {
            minimal.s = value;
        }
    }
    if (style[types_1.Modifier.align]) {
        minimal.a = alignToNumber[style[types_1.Modifier.align]];
    }
    return minimal;
}
exports.minimizeBlockStyle = minimizeBlockStyle;
function blockStyleFromMinimize(minimal) {
    var result = {};
    if (minimal.a) {
        result[types_1.Modifier.align] = numberToAlign[minimal.a];
    }
    if (minimal.b) {
        result[types_1.Modifier.blockquote] = true;
    }
    result[types_1.Modifier.style] = numberToStyle[minimal.s] || "p";
    return result;
}
exports.blockStyleFromMinimize = blockStyleFromMinimize;


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var marked = __webpack_require__(83);
var constants_1 = __webpack_require__(5);
var Block_1 = __webpack_require__(34);
var TextNode_1 = __webpack_require__(20);
var types_1 = __webpack_require__(2);
function parser(str, mode) {
    if (mode === void 0) { mode = "html"; }
    var _a;
    if (mode === "markdown") {
        str = marked(str);
    }
    var htmlElement = document.createElement("div");
    htmlElement.innerHTML = str.replace(/<br\s*[\/]?>/g, "\n");
    var blocks = [];
    parseBlocks(htmlElement, blocks);
    if (blocks.length === 0) {
        var style = __assign((_a = {}, _a[types_1.Modifier.style] = blockTags[htmlElement.nodeName] || "p", _a), getBlockStyle(htmlElement));
        var textNodes = [];
        parseTextNodes(htmlElement, textNodes);
        var block = new Block_1.Block(textNodes, style);
        return [block];
    }
    return blocks;
}
exports.parser = parser;
var blockTags = {
    P: "p",
    H1: "h1",
    H2: "h2",
    H3: "h3",
    H4: "h4",
    H5: "h5",
    H6: "h6"
};
function parseBlocks(htmlElement, blocks, style) {
    if (style === void 0) { style = {}; }
    var _a;
    style = __assign({}, style, getBlockStyle(htmlElement));
    if (blockTags[htmlElement.nodeName]) {
        var textNodes = [];
        parseTextNodes(htmlElement, textNodes);
        var block = new Block_1.Block(textNodes, __assign({}, style, (_a = {}, _a[types_1.Modifier.style] = blockTags[htmlElement.nodeName], _a)));
        blocks.push(block);
        return;
    }
    var childs = htmlElement.childNodes;
    for (var i = 0; i < childs.length; i++) {
        parseBlocks(childs[i], blocks, style);
    }
}
function tagToStyle(htmlElement) {
    var _a, _b, _c, _d, _e;
    switch (htmlElement.nodeName) {
        case "B":
        case "STRONG":
            return _a = {},
                _a[types_1.Modifier.bold] = true,
                _a;
        case "I":
        case "EM":
            return _b = {},
                _b[types_1.Modifier.italic] = true,
                _b;
        case "U":
            return _c = {},
                _c[types_1.Modifier.underline] = true,
                _c;
        case "STRIKE":
        case "S":
            return _d = {},
                _d[types_1.Modifier.strike] = true,
                _d;
        case "A":
            return _e = {},
                _e[types_1.Modifier.link] = htmlElement.href,
                _e;
        default:
            return {};
    }
}
function parseTextNodes(htmlElement, textNodes, style) {
    if (style === void 0) { style = {}; }
    if (htmlElement.nodeType === htmlElement.TEXT_NODE) {
        var text = htmlElement.textContent
            .replace(/&nbsp;/g, " ")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">");
        if (text.replace(/\n/g, "").length === 0) { // ignore empty nodes: TODO fix
            return;
        }
        var textNode = new TextNode_1.TextNode(text, style);
        textNodes.push(textNode);
        return;
    }
    var elementStyle = {};
    var _a = htmlElement.style || {}, fontSize = _a.fontSize, fontWeight = _a.fontWeight, fontFamily = _a.fontFamily, color = _a.color, background = _a.background, backgroundColor = _a.backgroundColor, textDecoration = _a.textDecoration, fontStyle = _a.fontStyle;
    var tagStyle = tagToStyle(htmlElement);
    if (fontSize) {
        elementStyle[types_1.Modifier.fontSize] = constants_1.fontSizes[fontSize] ? fontSize : "14px";
    }
    if (fontWeight) {
        elementStyle[types_1.Modifier.bold] = fontWeight === "bold" || parseInt(fontWeight, 10) >= 600;
    }
    if (fontFamily) {
        elementStyle[types_1.Modifier.fontFamily] = constants_1.fonts[fontFamily] ? fontFamily : "Roboto";
    }
    if (color) {
        elementStyle[types_1.Modifier.color] = color;
    }
    if (background || backgroundColor) {
        elementStyle[types_1.Modifier.background] = background || backgroundColor;
    }
    if (textDecoration === "underline") {
        elementStyle[types_1.Modifier.underline] = true;
    }
    if (textDecoration === "line-through") {
        elementStyle[types_1.Modifier.strike] = true;
    }
    if (fontStyle) {
        elementStyle[types_1.Modifier.italic] = fontStyle === "italic";
    }
    var fullStyle = __assign({}, style, tagStyle, elementStyle);
    var childs = htmlElement.childNodes;
    for (var i = 0; i < childs.length; i++) {
        parseTextNodes(childs[i], textNodes, fullStyle);
    }
}
function getBlockStyle(htmlElement) {
    if (!htmlElement || !htmlElement.style) {
        return {};
    }
    var style = {};
    if (htmlElement.style.textAlign) {
        style[types_1.Modifier.align] = htmlElement.style.textAlign;
    }
    if (htmlElement.nodeName === "BLOCKQUOTE") {
        style[types_1.Modifier.blockquote] = true;
    }
    return style;
}


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * marked - a markdown parser
 * Copyright (c) 2011-2018, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/markedjs/marked
 */

;(function(root) {
'use strict';

/**
 * Block-Level Grammar
 */

var block = {
  newline: /^\n+/,
  code: /^( {4}[^\n]+\n*)+/,
  fences: noop,
  hr: /^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,
  heading: /^ *(#{1,6}) *([^\n]+?) *(?:#+ *)?(?:\n+|$)/,
  nptable: noop,
  blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
  list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
  html: '^ {0,3}(?:' // optional indentation
    + '<(script|pre|style)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)' // (1)
    + '|comment[^\\n]*(\\n+|$)' // (2)
    + '|<\\?[\\s\\S]*?\\?>\\n*' // (3)
    + '|<![A-Z][\\s\\S]*?>\\n*' // (4)
    + '|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>\\n*' // (5)
    + '|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:\\n{2,}|$)' // (6)
    + '|<(?!script|pre|style)([a-z][\\w-]*)(?:attribute)*? */?>(?=\\h*\\n)[\\s\\S]*?(?:\\n{2,}|$)' // (7) open tag
    + '|</(?!script|pre|style)[a-z][\\w-]*\\s*>(?=\\h*\\n)[\\s\\S]*?(?:\\n{2,}|$)' // (7) closing tag
    + ')',
  def: /^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,
  table: noop,
  lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
  paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading| {0,3}>|<\/?(?:tag)(?: +|\n|\/?>)|<(?:script|pre|style|!--))[^\n]+)*)/,
  text: /^[^\n]+/
};

block._label = /(?!\s*\])(?:\\[\[\]]|[^\[\]])+/;
block._title = /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;
block.def = edit(block.def)
  .replace('label', block._label)
  .replace('title', block._title)
  .getRegex();

block.bullet = /(?:[*+-]|\d+\.)/;
block.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;
block.item = edit(block.item, 'gm')
  .replace(/bull/g, block.bullet)
  .getRegex();

block.list = edit(block.list)
  .replace(/bull/g, block.bullet)
  .replace('hr', '\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))')
  .replace('def', '\\n+(?=' + block.def.source + ')')
  .getRegex();

block._tag = 'address|article|aside|base|basefont|blockquote|body|caption'
  + '|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption'
  + '|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe'
  + '|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option'
  + '|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr'
  + '|track|ul';
block._comment = /<!--(?!-?>)[\s\S]*?-->/;
block.html = edit(block.html, 'i')
  .replace('comment', block._comment)
  .replace('tag', block._tag)
  .replace('attribute', / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/)
  .getRegex();

block.paragraph = edit(block.paragraph)
  .replace('hr', block.hr)
  .replace('heading', block.heading)
  .replace('lheading', block.lheading)
  .replace('tag', block._tag) // pars can be interrupted by type (6) html blocks
  .getRegex();

block.blockquote = edit(block.blockquote)
  .replace('paragraph', block.paragraph)
  .getRegex();

/**
 * Normal Block Grammar
 */

block.normal = merge({}, block);

/**
 * GFM Block Grammar
 */

block.gfm = merge({}, block.normal, {
  fences: /^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\n? *\1 *(?:\n+|$)/,
  paragraph: /^/,
  heading: /^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/
});

block.gfm.paragraph = edit(block.paragraph)
  .replace('(?!', '(?!'
    + block.gfm.fences.source.replace('\\1', '\\2') + '|'
    + block.list.source.replace('\\1', '\\3') + '|')
  .getRegex();

/**
 * GFM + Tables Block Grammar
 */

block.tables = merge({}, block.gfm, {
  nptable: /^ *([^|\n ].*\|.*)\n *([-:]+ *\|[-| :]*)(?:\n((?:.*[^>\n ].*(?:\n|$))*)\n*|$)/,
  table: /^ *\|(.+)\n *\|?( *[-:]+[-| :]*)(?:\n((?: *[^>\n ].*(?:\n|$))*)\n*|$)/
});

/**
 * Pedantic grammar
 */

block.pedantic = merge({}, block.normal, {
  html: edit(
    '^ *(?:comment *(?:\\n|\\s*$)'
    + '|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)' // closed tag
    + '|<tag(?:"[^"]*"|\'[^\']*\'|\\s[^\'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))')
    .replace('comment', block._comment)
    .replace(/tag/g, '(?!(?:'
      + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub'
      + '|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)'
      + '\\b)\\w+(?!:|[^\\w\\s@]*@)\\b')
    .getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/
});

/**
 * Block Lexer
 */

function Lexer(options) {
  this.tokens = [];
  this.tokens.links = Object.create(null);
  this.options = options || marked.defaults;
  this.rules = block.normal;

  if (this.options.pedantic) {
    this.rules = block.pedantic;
  } else if (this.options.gfm) {
    if (this.options.tables) {
      this.rules = block.tables;
    } else {
      this.rules = block.gfm;
    }
  }
}

/**
 * Expose Block Rules
 */

Lexer.rules = block;

/**
 * Static Lex Method
 */

Lexer.lex = function(src, options) {
  var lexer = new Lexer(options);
  return lexer.lex(src);
};

/**
 * Preprocessing
 */

Lexer.prototype.lex = function(src) {
  src = src
    .replace(/\r\n|\r/g, '\n')
    .replace(/\t/g, '    ')
    .replace(/\u00a0/g, ' ')
    .replace(/\u2424/g, '\n');

  return this.token(src, true);
};

/**
 * Lexing
 */

Lexer.prototype.token = function(src, top) {
  src = src.replace(/^ +$/gm, '');
  var next,
      loose,
      cap,
      bull,
      b,
      item,
      listStart,
      listItems,
      t,
      space,
      i,
      tag,
      l,
      isordered,
      istask,
      ischecked;

  while (src) {
    // newline
    if (cap = this.rules.newline.exec(src)) {
      src = src.substring(cap[0].length);
      if (cap[0].length > 1) {
        this.tokens.push({
          type: 'space'
        });
      }
    }

    // code
    if (cap = this.rules.code.exec(src)) {
      src = src.substring(cap[0].length);
      cap = cap[0].replace(/^ {4}/gm, '');
      this.tokens.push({
        type: 'code',
        text: !this.options.pedantic
          ? rtrim(cap, '\n')
          : cap
      });
      continue;
    }

    // fences (gfm)
    if (cap = this.rules.fences.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'code',
        lang: cap[2],
        text: cap[3] || ''
      });
      continue;
    }

    // heading
    if (cap = this.rules.heading.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'heading',
        depth: cap[1].length,
        text: cap[2]
      });
      continue;
    }

    // table no leading pipe (gfm)
    if (top && (cap = this.rules.nptable.exec(src))) {
      item = {
        type: 'table',
        header: splitCells(cap[1].replace(/^ *| *\| *$/g, '')),
        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
        cells: cap[3] ? cap[3].replace(/\n$/, '').split('\n') : []
      };

      if (item.header.length === item.align.length) {
        src = src.substring(cap[0].length);

        for (i = 0; i < item.align.length; i++) {
          if (/^ *-+: *$/.test(item.align[i])) {
            item.align[i] = 'right';
          } else if (/^ *:-+: *$/.test(item.align[i])) {
            item.align[i] = 'center';
          } else if (/^ *:-+ *$/.test(item.align[i])) {
            item.align[i] = 'left';
          } else {
            item.align[i] = null;
          }
        }

        for (i = 0; i < item.cells.length; i++) {
          item.cells[i] = splitCells(item.cells[i], item.header.length);
        }

        this.tokens.push(item);

        continue;
      }
    }

    // hr
    if (cap = this.rules.hr.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'hr'
      });
      continue;
    }

    // blockquote
    if (cap = this.rules.blockquote.exec(src)) {
      src = src.substring(cap[0].length);

      this.tokens.push({
        type: 'blockquote_start'
      });

      cap = cap[0].replace(/^ *> ?/gm, '');

      // Pass `top` to keep the current
      // "toplevel" state. This is exactly
      // how markdown.pl works.
      this.token(cap, top);

      this.tokens.push({
        type: 'blockquote_end'
      });

      continue;
    }

    // list
    if (cap = this.rules.list.exec(src)) {
      src = src.substring(cap[0].length);
      bull = cap[2];
      isordered = bull.length > 1;

      listStart = {
        type: 'list_start',
        ordered: isordered,
        start: isordered ? +bull : '',
        loose: false
      };

      this.tokens.push(listStart);

      // Get each top-level item.
      cap = cap[0].match(this.rules.item);

      listItems = [];
      next = false;
      l = cap.length;
      i = 0;

      for (; i < l; i++) {
        item = cap[i];

        // Remove the list item's bullet
        // so it is seen as the next token.
        space = item.length;
        item = item.replace(/^ *([*+-]|\d+\.) +/, '');

        // Outdent whatever the
        // list item contains. Hacky.
        if (~item.indexOf('\n ')) {
          space -= item.length;
          item = !this.options.pedantic
            ? item.replace(new RegExp('^ {1,' + space + '}', 'gm'), '')
            : item.replace(/^ {1,4}/gm, '');
        }

        // Determine whether the next list item belongs here.
        // Backpedal if it does not belong in this list.
        if (this.options.smartLists && i !== l - 1) {
          b = block.bullet.exec(cap[i + 1])[0];
          if (bull !== b && !(bull.length > 1 && b.length > 1)) {
            src = cap.slice(i + 1).join('\n') + src;
            i = l - 1;
          }
        }

        // Determine whether item is loose or not.
        // Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
        // for discount behavior.
        loose = next || /\n\n(?!\s*$)/.test(item);
        if (i !== l - 1) {
          next = item.charAt(item.length - 1) === '\n';
          if (!loose) loose = next;
        }

        if (loose) {
          listStart.loose = true;
        }

        // Check for task list items
        istask = /^\[[ xX]\] /.test(item);
        ischecked = undefined;
        if (istask) {
          ischecked = item[1] !== ' ';
          item = item.replace(/^\[[ xX]\] +/, '');
        }

        t = {
          type: 'list_item_start',
          task: istask,
          checked: ischecked,
          loose: loose
        };

        listItems.push(t);
        this.tokens.push(t);

        // Recurse.
        this.token(item, false);

        this.tokens.push({
          type: 'list_item_end'
        });
      }

      if (listStart.loose) {
        l = listItems.length;
        i = 0;
        for (; i < l; i++) {
          listItems[i].loose = true;
        }
      }

      this.tokens.push({
        type: 'list_end'
      });

      continue;
    }

    // html
    if (cap = this.rules.html.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: this.options.sanitize
          ? 'paragraph'
          : 'html',
        pre: !this.options.sanitizer
          && (cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style'),
        text: cap[0]
      });
      continue;
    }

    // def
    if (top && (cap = this.rules.def.exec(src))) {
      src = src.substring(cap[0].length);
      if (cap[3]) cap[3] = cap[3].substring(1, cap[3].length - 1);
      tag = cap[1].toLowerCase().replace(/\s+/g, ' ');
      if (!this.tokens.links[tag]) {
        this.tokens.links[tag] = {
          href: cap[2],
          title: cap[3]
        };
      }
      continue;
    }

    // table (gfm)
    if (top && (cap = this.rules.table.exec(src))) {
      item = {
        type: 'table',
        header: splitCells(cap[1].replace(/^ *| *\| *$/g, '')),
        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
        cells: cap[3] ? cap[3].replace(/(?: *\| *)?\n$/, '').split('\n') : []
      };

      if (item.header.length === item.align.length) {
        src = src.substring(cap[0].length);

        for (i = 0; i < item.align.length; i++) {
          if (/^ *-+: *$/.test(item.align[i])) {
            item.align[i] = 'right';
          } else if (/^ *:-+: *$/.test(item.align[i])) {
            item.align[i] = 'center';
          } else if (/^ *:-+ *$/.test(item.align[i])) {
            item.align[i] = 'left';
          } else {
            item.align[i] = null;
          }
        }

        for (i = 0; i < item.cells.length; i++) {
          item.cells[i] = splitCells(
            item.cells[i].replace(/^ *\| *| *\| *$/g, ''),
            item.header.length);
        }

        this.tokens.push(item);

        continue;
      }
    }

    // lheading
    if (cap = this.rules.lheading.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'heading',
        depth: cap[2] === '=' ? 1 : 2,
        text: cap[1]
      });
      continue;
    }

    // top-level paragraph
    if (top && (cap = this.rules.paragraph.exec(src))) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'paragraph',
        text: cap[1].charAt(cap[1].length - 1) === '\n'
          ? cap[1].slice(0, -1)
          : cap[1]
      });
      continue;
    }

    // text
    if (cap = this.rules.text.exec(src)) {
      // Top-level should never reach here.
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'text',
        text: cap[0]
      });
      continue;
    }

    if (src) {
      throw new Error('Infinite loop on byte: ' + src.charCodeAt(0));
    }
  }

  return this.tokens;
};

/**
 * Inline-Level Grammar
 */

var inline = {
  escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
  autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
  url: noop,
  tag: '^comment'
    + '|^</[a-zA-Z][\\w:-]*\\s*>' // self-closing tag
    + '|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>' // open tag
    + '|^<\\?[\\s\\S]*?\\?>' // processing instruction, e.g. <?php ?>
    + '|^<![a-zA-Z]+\\s[\\s\\S]*?>' // declaration, e.g. <!DOCTYPE html>
    + '|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>', // CDATA section
  link: /^!?\[(label)\]\(href(?:\s+(title))?\s*\)/,
  reflink: /^!?\[(label)\]\[(?!\s*\])((?:\\[\[\]]?|[^\[\]\\])+)\]/,
  nolink: /^!?\[(?!\s*\])((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\](?:\[\])?/,
  strong: /^__([^\s])__(?!_)|^\*\*([^\s])\*\*(?!\*)|^__([^\s][\s\S]*?[^\s])__(?!_)|^\*\*([^\s][\s\S]*?[^\s])\*\*(?!\*)/,
  em: /^_([^\s_])_(?!_)|^\*([^\s*"<\[])\*(?!\*)|^_([^\s][\s\S]*?[^\s_])_(?!_|[^\s.])|^_([^\s_][\s\S]*?[^\s])_(?!_|[^\s.])|^\*([^\s"<\[][\s\S]*?[^\s*])\*(?!\*)|^\*([^\s*"<\[][\s\S]*?[^\s])\*(?!\*)/,
  code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
  br: /^( {2,}|\\)\n(?!\s*$)/,
  del: noop,
  text: /^(`+|[^`])[\s\S]*?(?=[\\<!\[`*]|\b_| {2,}\n|$)/
};

inline._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g;

inline._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;
inline._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;
inline.autolink = edit(inline.autolink)
  .replace('scheme', inline._scheme)
  .replace('email', inline._email)
  .getRegex();

inline._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;

inline.tag = edit(inline.tag)
  .replace('comment', block._comment)
  .replace('attribute', inline._attribute)
  .getRegex();

inline._label = /(?:\[[^\[\]]*\]|\\[\[\]]?|`[^`]*`|[^\[\]\\])*?/;
inline._href = /\s*(<(?:\\[<>]?|[^\s<>\\])*>|(?:\\[()]?|\([^\s\x00-\x1f\\]*\)|[^\s\x00-\x1f()\\])*?)/;
inline._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;

inline.link = edit(inline.link)
  .replace('label', inline._label)
  .replace('href', inline._href)
  .replace('title', inline._title)
  .getRegex();

inline.reflink = edit(inline.reflink)
  .replace('label', inline._label)
  .getRegex();

/**
 * Normal Inline Grammar
 */

inline.normal = merge({}, inline);

/**
 * Pedantic Inline Grammar
 */

inline.pedantic = merge({}, inline.normal, {
  strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
  em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/,
  link: edit(/^!?\[(label)\]\((.*?)\)/)
    .replace('label', inline._label)
    .getRegex(),
  reflink: edit(/^!?\[(label)\]\s*\[([^\]]*)\]/)
    .replace('label', inline._label)
    .getRegex()
});

/**
 * GFM Inline Grammar
 */

inline.gfm = merge({}, inline.normal, {
  escape: edit(inline.escape).replace('])', '~|])').getRegex(),
  _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
  url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
  _backpedal: /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,
  del: /^~+(?=\S)([\s\S]*?\S)~+/,
  text: edit(inline.text)
    .replace(']|', '~]|')
    .replace('|$', '|https?://|ftp://|www\\.|[a-zA-Z0-9.!#$%&\'*+/=?^_`{\\|}~-]+@|$')
    .getRegex()
});

inline.gfm.url = edit(inline.gfm.url)
  .replace('email', inline.gfm._extended_email)
  .getRegex();
/**
 * GFM + Line Breaks Inline Grammar
 */

inline.breaks = merge({}, inline.gfm, {
  br: edit(inline.br).replace('{2,}', '*').getRegex(),
  text: edit(inline.gfm.text).replace('{2,}', '*').getRegex()
});

/**
 * Inline Lexer & Compiler
 */

function InlineLexer(links, options) {
  this.options = options || marked.defaults;
  this.links = links;
  this.rules = inline.normal;
  this.renderer = this.options.renderer || new Renderer();
  this.renderer.options = this.options;

  if (!this.links) {
    throw new Error('Tokens array requires a `links` property.');
  }

  if (this.options.pedantic) {
    this.rules = inline.pedantic;
  } else if (this.options.gfm) {
    if (this.options.breaks) {
      this.rules = inline.breaks;
    } else {
      this.rules = inline.gfm;
    }
  }
}

/**
 * Expose Inline Rules
 */

InlineLexer.rules = inline;

/**
 * Static Lexing/Compiling Method
 */

InlineLexer.output = function(src, links, options) {
  var inline = new InlineLexer(links, options);
  return inline.output(src);
};

/**
 * Lexing/Compiling
 */

InlineLexer.prototype.output = function(src) {
  var out = '',
      link,
      text,
      href,
      title,
      cap,
      prevCapZero;

  while (src) {
    // escape
    if (cap = this.rules.escape.exec(src)) {
      src = src.substring(cap[0].length);
      out += cap[1];
      continue;
    }

    // autolink
    if (cap = this.rules.autolink.exec(src)) {
      src = src.substring(cap[0].length);
      if (cap[2] === '@') {
        text = escape(this.mangle(cap[1]));
        href = 'mailto:' + text;
      } else {
        text = escape(cap[1]);
        href = text;
      }
      out += this.renderer.link(href, null, text);
      continue;
    }

    // url (gfm)
    if (!this.inLink && (cap = this.rules.url.exec(src))) {
      if (cap[2] === '@') {
        text = escape(cap[0]);
        href = 'mailto:' + text;
      } else {
        // do extended autolink path validation
        do {
          prevCapZero = cap[0];
          cap[0] = this.rules._backpedal.exec(cap[0])[0];
        } while (prevCapZero !== cap[0]);
        text = escape(cap[0]);
        if (cap[1] === 'www.') {
          href = 'http://' + text;
        } else {
          href = text;
        }
      }
      src = src.substring(cap[0].length);
      out += this.renderer.link(href, null, text);
      continue;
    }

    // tag
    if (cap = this.rules.tag.exec(src)) {
      if (!this.inLink && /^<a /i.test(cap[0])) {
        this.inLink = true;
      } else if (this.inLink && /^<\/a>/i.test(cap[0])) {
        this.inLink = false;
      }
      if (!this.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
        this.inRawBlock = true;
      } else if (this.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
        this.inRawBlock = false;
      }

      src = src.substring(cap[0].length);
      out += this.options.sanitize
        ? this.options.sanitizer
          ? this.options.sanitizer(cap[0])
          : escape(cap[0])
        : cap[0];
      continue;
    }

    // link
    if (cap = this.rules.link.exec(src)) {
      src = src.substring(cap[0].length);
      this.inLink = true;
      href = cap[2];
      if (this.options.pedantic) {
        link = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(href);

        if (link) {
          href = link[1];
          title = link[3];
        } else {
          title = '';
        }
      } else {
        title = cap[3] ? cap[3].slice(1, -1) : '';
      }
      href = href.trim().replace(/^<([\s\S]*)>$/, '$1');
      out += this.outputLink(cap, {
        href: InlineLexer.escapes(href),
        title: InlineLexer.escapes(title)
      });
      this.inLink = false;
      continue;
    }

    // reflink, nolink
    if ((cap = this.rules.reflink.exec(src))
        || (cap = this.rules.nolink.exec(src))) {
      src = src.substring(cap[0].length);
      link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
      link = this.links[link.toLowerCase()];
      if (!link || !link.href) {
        out += cap[0].charAt(0);
        src = cap[0].substring(1) + src;
        continue;
      }
      this.inLink = true;
      out += this.outputLink(cap, link);
      this.inLink = false;
      continue;
    }

    // strong
    if (cap = this.rules.strong.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.strong(this.output(cap[4] || cap[3] || cap[2] || cap[1]));
      continue;
    }

    // em
    if (cap = this.rules.em.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.em(this.output(cap[6] || cap[5] || cap[4] || cap[3] || cap[2] || cap[1]));
      continue;
    }

    // code
    if (cap = this.rules.code.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.codespan(escape(cap[2].trim(), true));
      continue;
    }

    // br
    if (cap = this.rules.br.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.br();
      continue;
    }

    // del (gfm)
    if (cap = this.rules.del.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.del(this.output(cap[1]));
      continue;
    }

    // text
    if (cap = this.rules.text.exec(src)) {
      src = src.substring(cap[0].length);
      if (this.inRawBlock) {
        out += this.renderer.text(cap[0]);
      } else {
        out += this.renderer.text(escape(this.smartypants(cap[0])));
      }
      continue;
    }

    if (src) {
      throw new Error('Infinite loop on byte: ' + src.charCodeAt(0));
    }
  }

  return out;
};

InlineLexer.escapes = function(text) {
  return text ? text.replace(InlineLexer.rules._escapes, '$1') : text;
};

/**
 * Compile Link
 */

InlineLexer.prototype.outputLink = function(cap, link) {
  var href = link.href,
      title = link.title ? escape(link.title) : null;

  return cap[0].charAt(0) !== '!'
    ? this.renderer.link(href, title, this.output(cap[1]))
    : this.renderer.image(href, title, escape(cap[1]));
};

/**
 * Smartypants Transformations
 */

InlineLexer.prototype.smartypants = function(text) {
  if (!this.options.smartypants) return text;
  return text
    // em-dashes
    .replace(/---/g, '\u2014')
    // en-dashes
    .replace(/--/g, '\u2013')
    // opening singles
    .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1\u2018')
    // closing singles & apostrophes
    .replace(/'/g, '\u2019')
    // opening doubles
    .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1\u201c')
    // closing doubles
    .replace(/"/g, '\u201d')
    // ellipses
    .replace(/\.{3}/g, '\u2026');
};

/**
 * Mangle Links
 */

InlineLexer.prototype.mangle = function(text) {
  if (!this.options.mangle) return text;
  var out = '',
      l = text.length,
      i = 0,
      ch;

  for (; i < l; i++) {
    ch = text.charCodeAt(i);
    if (Math.random() > 0.5) {
      ch = 'x' + ch.toString(16);
    }
    out += '&#' + ch + ';';
  }

  return out;
};

/**
 * Renderer
 */

function Renderer(options) {
  this.options = options || marked.defaults;
}

Renderer.prototype.code = function(code, lang, escaped) {
  if (this.options.highlight) {
    var out = this.options.highlight(code, lang);
    if (out != null && out !== code) {
      escaped = true;
      code = out;
    }
  }

  if (!lang) {
    return '<pre><code>'
      + (escaped ? code : escape(code, true))
      + '</code></pre>';
  }

  return '<pre><code class="'
    + this.options.langPrefix
    + escape(lang, true)
    + '">'
    + (escaped ? code : escape(code, true))
    + '</code></pre>\n';
};

Renderer.prototype.blockquote = function(quote) {
  return '<blockquote>\n' + quote + '</blockquote>\n';
};

Renderer.prototype.html = function(html) {
  return html;
};

Renderer.prototype.heading = function(text, level, raw) {
  if (this.options.headerIds) {
    return '<h'
      + level
      + ' id="'
      + this.options.headerPrefix
      + raw.toLowerCase().replace(/[^\w]+/g, '-')
      + '">'
      + text
      + '</h'
      + level
      + '>\n';
  }
  // ignore IDs
  return '<h' + level + '>' + text + '</h' + level + '>\n';
};

Renderer.prototype.hr = function() {
  return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
};

Renderer.prototype.list = function(body, ordered, start) {
  var type = ordered ? 'ol' : 'ul',
      startatt = (ordered && start !== 1) ? (' start="' + start + '"') : '';
  return '<' + type + startatt + '>\n' + body + '</' + type + '>\n';
};

Renderer.prototype.listitem = function(text) {
  return '<li>' + text + '</li>\n';
};

Renderer.prototype.checkbox = function(checked) {
  return '<input '
    + (checked ? 'checked="" ' : '')
    + 'disabled="" type="checkbox"'
    + (this.options.xhtml ? ' /' : '')
    + '> ';
};

Renderer.prototype.paragraph = function(text) {
  return '<p>' + text + '</p>\n';
};

Renderer.prototype.table = function(header, body) {
  if (body) body = '<tbody>' + body + '</tbody>';

  return '<table>\n'
    + '<thead>\n'
    + header
    + '</thead>\n'
    + body
    + '</table>\n';
};

Renderer.prototype.tablerow = function(content) {
  return '<tr>\n' + content + '</tr>\n';
};

Renderer.prototype.tablecell = function(content, flags) {
  var type = flags.header ? 'th' : 'td';
  var tag = flags.align
    ? '<' + type + ' align="' + flags.align + '">'
    : '<' + type + '>';
  return tag + content + '</' + type + '>\n';
};

// span level renderer
Renderer.prototype.strong = function(text) {
  return '<strong>' + text + '</strong>';
};

Renderer.prototype.em = function(text) {
  return '<em>' + text + '</em>';
};

Renderer.prototype.codespan = function(text) {
  return '<code>' + text + '</code>';
};

Renderer.prototype.br = function() {
  return this.options.xhtml ? '<br/>' : '<br>';
};

Renderer.prototype.del = function(text) {
  return '<del>' + text + '</del>';
};

Renderer.prototype.link = function(href, title, text) {
  href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
  if (href === null) {
    return text;
  }
  var out = '<a href="' + escape(href) + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += '>' + text + '</a>';
  return out;
};

Renderer.prototype.image = function(href, title, text) {
  href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
  if (href === null) {
    return text;
  }

  var out = '<img src="' + href + '" alt="' + text + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += this.options.xhtml ? '/>' : '>';
  return out;
};

Renderer.prototype.text = function(text) {
  return text;
};

/**
 * TextRenderer
 * returns only the textual part of the token
 */

function TextRenderer() {}

// no need for block level renderers

TextRenderer.prototype.strong =
TextRenderer.prototype.em =
TextRenderer.prototype.codespan =
TextRenderer.prototype.del =
TextRenderer.prototype.text = function (text) {
  return text;
};

TextRenderer.prototype.link =
TextRenderer.prototype.image = function(href, title, text) {
  return '' + text;
};

TextRenderer.prototype.br = function() {
  return '';
};

/**
 * Parsing & Compiling
 */

function Parser(options) {
  this.tokens = [];
  this.token = null;
  this.options = options || marked.defaults;
  this.options.renderer = this.options.renderer || new Renderer();
  this.renderer = this.options.renderer;
  this.renderer.options = this.options;
}

/**
 * Static Parse Method
 */

Parser.parse = function(src, options) {
  var parser = new Parser(options);
  return parser.parse(src);
};

/**
 * Parse Loop
 */

Parser.prototype.parse = function(src) {
  this.inline = new InlineLexer(src.links, this.options);
  // use an InlineLexer with a TextRenderer to extract pure text
  this.inlineText = new InlineLexer(
    src.links,
    merge({}, this.options, {renderer: new TextRenderer()})
  );
  this.tokens = src.reverse();

  var out = '';
  while (this.next()) {
    out += this.tok();
  }

  return out;
};

/**
 * Next Token
 */

Parser.prototype.next = function() {
  return this.token = this.tokens.pop();
};

/**
 * Preview Next Token
 */

Parser.prototype.peek = function() {
  return this.tokens[this.tokens.length - 1] || 0;
};

/**
 * Parse Text Tokens
 */

Parser.prototype.parseText = function() {
  var body = this.token.text;

  while (this.peek().type === 'text') {
    body += '\n' + this.next().text;
  }

  return this.inline.output(body);
};

/**
 * Parse Current Token
 */

Parser.prototype.tok = function() {
  switch (this.token.type) {
    case 'space': {
      return '';
    }
    case 'hr': {
      return this.renderer.hr();
    }
    case 'heading': {
      return this.renderer.heading(
        this.inline.output(this.token.text),
        this.token.depth,
        unescape(this.inlineText.output(this.token.text)));
    }
    case 'code': {
      return this.renderer.code(this.token.text,
        this.token.lang,
        this.token.escaped);
    }
    case 'table': {
      var header = '',
          body = '',
          i,
          row,
          cell,
          j;

      // header
      cell = '';
      for (i = 0; i < this.token.header.length; i++) {
        cell += this.renderer.tablecell(
          this.inline.output(this.token.header[i]),
          { header: true, align: this.token.align[i] }
        );
      }
      header += this.renderer.tablerow(cell);

      for (i = 0; i < this.token.cells.length; i++) {
        row = this.token.cells[i];

        cell = '';
        for (j = 0; j < row.length; j++) {
          cell += this.renderer.tablecell(
            this.inline.output(row[j]),
            { header: false, align: this.token.align[j] }
          );
        }

        body += this.renderer.tablerow(cell);
      }
      return this.renderer.table(header, body);
    }
    case 'blockquote_start': {
      body = '';

      while (this.next().type !== 'blockquote_end') {
        body += this.tok();
      }

      return this.renderer.blockquote(body);
    }
    case 'list_start': {
      body = '';
      var ordered = this.token.ordered,
          start = this.token.start;

      while (this.next().type !== 'list_end') {
        body += this.tok();
      }

      return this.renderer.list(body, ordered, start);
    }
    case 'list_item_start': {
      body = '';
      var loose = this.token.loose;

      if (this.token.task) {
        body += this.renderer.checkbox(this.token.checked);
      }

      while (this.next().type !== 'list_item_end') {
        body += !loose && this.token.type === 'text'
          ? this.parseText()
          : this.tok();
      }

      return this.renderer.listitem(body);
    }
    case 'html': {
      // TODO parse inline content if parameter markdown=1
      return this.renderer.html(this.token.text);
    }
    case 'paragraph': {
      return this.renderer.paragraph(this.inline.output(this.token.text));
    }
    case 'text': {
      return this.renderer.paragraph(this.parseText());
    }
  }
};

/**
 * Helpers
 */

function escape(html, encode) {
  if (encode) {
    if (escape.escapeTest.test(html)) {
      return html.replace(escape.escapeReplace, function (ch) { return escape.replacements[ch]; });
    }
  } else {
    if (escape.escapeTestNoEncode.test(html)) {
      return html.replace(escape.escapeReplaceNoEncode, function (ch) { return escape.replacements[ch]; });
    }
  }

  return html;
}

escape.escapeTest = /[&<>"']/;
escape.escapeReplace = /[&<>"']/g;
escape.replacements = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
};

escape.escapeTestNoEncode = /[<>"']|&(?!#?\w+;)/;
escape.escapeReplaceNoEncode = /[<>"']|&(?!#?\w+;)/g;

function unescape(html) {
  // explicitly match decimal, hex, and named HTML entities
  return html.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig, function(_, n) {
    n = n.toLowerCase();
    if (n === 'colon') return ':';
    if (n.charAt(0) === '#') {
      return n.charAt(1) === 'x'
        ? String.fromCharCode(parseInt(n.substring(2), 16))
        : String.fromCharCode(+n.substring(1));
    }
    return '';
  });
}

function edit(regex, opt) {
  regex = regex.source || regex;
  opt = opt || '';
  return {
    replace: function(name, val) {
      val = val.source || val;
      val = val.replace(/(^|[^\[])\^/g, '$1');
      regex = regex.replace(name, val);
      return this;
    },
    getRegex: function() {
      return new RegExp(regex, opt);
    }
  };
}

function cleanUrl(sanitize, base, href) {
  if (sanitize) {
    try {
      var prot = decodeURIComponent(unescape(href))
        .replace(/[^\w:]/g, '')
        .toLowerCase();
    } catch (e) {
      return null;
    }
    if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0 || prot.indexOf('data:') === 0) {
      return null;
    }
  }
  if (base && !originIndependentUrl.test(href)) {
    href = resolveUrl(base, href);
  }
  try {
    href = encodeURI(href).replace(/%25/g, '%');
  } catch (e) {
    return null;
  }
  return href;
}

function resolveUrl(base, href) {
  if (!baseUrls[' ' + base]) {
    // we can ignore everything in base after the last slash of its path component,
    // but we might need to add _that_
    // https://tools.ietf.org/html/rfc3986#section-3
    if (/^[^:]+:\/*[^/]*$/.test(base)) {
      baseUrls[' ' + base] = base + '/';
    } else {
      baseUrls[' ' + base] = rtrim(base, '/', true);
    }
  }
  base = baseUrls[' ' + base];

  if (href.slice(0, 2) === '//') {
    return base.replace(/:[\s\S]*/, ':') + href;
  } else if (href.charAt(0) === '/') {
    return base.replace(/(:\/*[^/]*)[\s\S]*/, '$1') + href;
  } else {
    return base + href;
  }
}
var baseUrls = {};
var originIndependentUrl = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;

function noop() {}
noop.exec = noop;

function merge(obj) {
  var i = 1,
      target,
      key;

  for (; i < arguments.length; i++) {
    target = arguments[i];
    for (key in target) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        obj[key] = target[key];
      }
    }
  }

  return obj;
}

function splitCells(tableRow, count) {
  // ensure that every cell-delimiting pipe has a space
  // before it to distinguish it from an escaped pipe
  var row = tableRow.replace(/\|/g, function (match, offset, str) {
        var escaped = false,
            curr = offset;
        while (--curr >= 0 && str[curr] === '\\') escaped = !escaped;
        if (escaped) {
          // odd number of slashes means | is escaped
          // so we leave it alone
          return '|';
        } else {
          // add space before unescaped |
          return ' |';
        }
      }),
      cells = row.split(/ \|/),
      i = 0;

  if (cells.length > count) {
    cells.splice(count);
  } else {
    while (cells.length < count) cells.push('');
  }

  for (; i < cells.length; i++) {
    // leading or trailing whitespace is ignored per the gfm spec
    cells[i] = cells[i].trim().replace(/\\\|/g, '|');
  }
  return cells;
}

// Remove trailing 'c's. Equivalent to str.replace(/c*$/, '').
// /c*$/ is vulnerable to REDOS.
// invert: Remove suffix of non-c chars instead. Default falsey.
function rtrim(str, c, invert) {
  if (str.length === 0) {
    return '';
  }

  // Length of suffix matching the invert condition.
  var suffLen = 0;

  // Step left until we fail to match the invert condition.
  while (suffLen < str.length) {
    var currChar = str.charAt(str.length - suffLen - 1);
    if (currChar === c && !invert) {
      suffLen++;
    } else if (currChar !== c && invert) {
      suffLen++;
    } else {
      break;
    }
  }

  return str.substr(0, str.length - suffLen);
}

/**
 * Marked
 */

function marked(src, opt, callback) {
  // throw error in case of non string input
  if (typeof src === 'undefined' || src === null) {
    throw new Error('marked(): input parameter is undefined or null');
  }
  if (typeof src !== 'string') {
    throw new Error('marked(): input parameter is of type '
      + Object.prototype.toString.call(src) + ', string expected');
  }

  if (callback || typeof opt === 'function') {
    if (!callback) {
      callback = opt;
      opt = null;
    }

    opt = merge({}, marked.defaults, opt || {});

    var highlight = opt.highlight,
        tokens,
        pending,
        i = 0;

    try {
      tokens = Lexer.lex(src, opt);
    } catch (e) {
      return callback(e);
    }

    pending = tokens.length;

    var done = function(err) {
      if (err) {
        opt.highlight = highlight;
        return callback(err);
      }

      var out;

      try {
        out = Parser.parse(tokens, opt);
      } catch (e) {
        err = e;
      }

      opt.highlight = highlight;

      return err
        ? callback(err)
        : callback(null, out);
    };

    if (!highlight || highlight.length < 3) {
      return done();
    }

    delete opt.highlight;

    if (!pending) return done();

    for (; i < tokens.length; i++) {
      (function(token) {
        if (token.type !== 'code') {
          return --pending || done();
        }
        return highlight(token.text, token.lang, function(err, code) {
          if (err) return done(err);
          if (code == null || code === token.text) {
            return --pending || done();
          }
          token.text = code;
          token.escaped = true;
          --pending || done();
        });
      })(tokens[i]);
    }

    return;
  }
  try {
    if (opt) opt = merge({}, marked.defaults, opt);
    return Parser.parse(Lexer.lex(src, opt), opt);
  } catch (e) {
    e.message += '\nPlease report this to https://github.com/markedjs/marked.';
    if ((opt || marked.defaults).silent) {
      return '<p>An error occurred:</p><pre>'
        + escape(e.message + '', true)
        + '</pre>';
    }
    throw e;
  }
}

/**
 * Options
 */

marked.options =
marked.setOptions = function(opt) {
  merge(marked.defaults, opt);
  return marked;
};

marked.getDefaults = function () {
  return {
    baseUrl: null,
    breaks: false,
    gfm: true,
    headerIds: true,
    headerPrefix: '',
    highlight: null,
    langPrefix: 'language-',
    mangle: true,
    pedantic: false,
    renderer: new Renderer(),
    sanitize: false,
    sanitizer: null,
    silent: false,
    smartLists: false,
    smartypants: false,
    tables: true,
    xhtml: false
  };
};

marked.defaults = marked.getDefaults();

/**
 * Expose
 */

marked.Parser = Parser;
marked.parser = Parser.parse;

marked.Renderer = Renderer;
marked.TextRenderer = TextRenderer;

marked.Lexer = Lexer;
marked.lexer = Lexer.lex;

marked.InlineLexer = InlineLexer;
marked.inlineLexer = InlineLexer.output;

marked.parse = marked;

if (true) {
  module.exports = marked;
} else {}
})(this || (typeof window !== 'undefined' ? window : global));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(14)))

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var buffer_1 = __webpack_require__(85);
var types_1 = __webpack_require__(2);
var INACTION_DELAY = 5000;
var Manager = /** @class */ (function () {
    function Manager(editor) {
        this._editor = editor;
        this.clearChanges();
        this._buffer = new buffer_1.TextBuffer(this._editor);
    }
    Manager.prototype.execute = function (operation) {
        var _this = this;
        if (this._inactionTimer) {
            clearTimeout(this._inactionTimer);
            this._inactionTimer = null;
        }
        this._inactionTimer = setTimeout(function () {
            if (_this._editor.selection.isActive()) { // if editor not in focus it can call some unexpected behaviour
                _this._editor.balance();
            }
            _this._inactionTimer = null;
        }, INACTION_DELAY);
        var result;
        switch (operation.action) {
            case types_1.Action.parse:
                result = this._editor.parse(operation.data.value, operation.data.mode);
                this.clearChanges();
                return true;
            case types_1.Action.add:
                result = this._editor.add(operation.data);
                break;
            case types_1.Action.innerAdd:
                if (typeof operation.data === "string") {
                    result = this._editor.add(operation.data);
                }
                else {
                    var _a = operation.data, data = _a.data, type = _a.type;
                    switch (type) {
                        case "text":
                            result = this._editor.add(data);
                            break;
                        case "full":
                            result = this._editor.paste(JSON.stringify(data), "inner");
                            break;
                        case "textnode":
                            // tricky
                            result = this._editor.paste(JSON.stringify([{
                                    textNodes: [data],
                                    style: {}
                                }]), "inner");
                            break;
                    }
                }
                break;
            case types_1.Action.remove:
                result = this._editor.remove(operation.data);
                break;
            case types_1.Action.update:
                result = this._editor.update(operation.data);
                break;
            case types_1.Action.clear:
                result = this._editor.clearStyles();
                break;
            case types_1.Action.paste:
                result = this._buffer.paste(operation.data);
                break;
            case types_1.Action.cut:
                result = this._buffer.cut(operation.data);
                break;
            case types_1.Action.copy:
                this._buffer.copy(operation.data); // it split nodes, need to update view
                return true;
            case types_1.Action.selectAll:
                break;
        }
        if (result) {
            this._change();
            return true;
        }
        if (operation.action === types_1.Action.undo) {
            return this.undo();
        }
        if (operation.action === types_1.Action.redo) {
            return this.redo();
        }
        return false;
    };
    Manager.prototype.canUndo = function () {
        return this._changes.prev !== null;
    };
    Manager.prototype.canRedo = function () {
        return this._changes.next !== null;
    };
    Manager.prototype.undo = function () {
        var change = this._changes.prev;
        if (change) {
            this._editor.setState(change.state);
            this._changes = change;
            return true;
        }
        return false;
    };
    Manager.prototype.redo = function () {
        var change = this._changes.next;
        if (change) {
            this._editor.setState(change.state);
            this._changes = change;
            return true;
        }
        return false;
    };
    Manager.prototype.clearChanges = function () {
        this._changes = {
            prev: null,
            next: null,
            state: this._editor.getState()
        };
    };
    Manager.prototype._change = function () {
        var newChange = {
            prev: this._changes,
            next: null,
            state: this._editor.getState()
        };
        this._changes.next = newChange;
        this._changes = newChange;
    };
    return Manager;
}());
exports.Manager = Manager;


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var serializer_1 = __webpack_require__(35);
var TextBuffer = /** @class */ (function () {
    function TextBuffer(editor) {
        this._editor = editor;
    }
    TextBuffer.prototype.copy = function (event) {
        event.preventDefault();
        var result = this._editor.copy();
        return this._setBuffer(event, result);
    };
    TextBuffer.prototype.cut = function (event) {
        event.preventDefault();
        var result = this._editor.cut();
        return this._setBuffer(event, result);
    };
    TextBuffer.prototype.paste = function (event) {
        event.preventDefault();
        var text;
        if (event.clipboardData) {
            text = event.clipboardData.getData("text/plain");
        }
        else {
            text = window.clipboardData.getData("text");
        }
        if (text === this._rawText) {
            return this._editor.paste(this._editorContent, "inner");
        }
        else {
            var htmlData = eventHTMLData(event);
            if (htmlData) {
                return this._editor.paste(htmlData, "html");
            }
            return this._editor.paste(text, "text");
        }
    };
    TextBuffer.prototype._setBuffer = function (event, result) {
        if (!result) {
            return false;
        }
        this._rawText = result.raw;
        this._editorContent = JSON.stringify(result.content);
        if (event.clipboardData) {
            event.clipboardData.setData("text/plain", result.raw);
            event.clipboardData.setData("text/html", serializer_1.serializer(result.content));
        }
        else {
            window.clipboardData.setData("text", result.raw);
        }
        return true;
    };
    return TextBuffer;
}());
exports.TextBuffer = TextBuffer;
function eventHTMLData(e) {
    if (!e.clipboardData) {
        return;
    }
    if (e.clipboardData.types.indexOf("text/html") !== -1) {
        return e.clipboardData.getData("text/html");
    }
}


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Promise) {
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var html_1 = __webpack_require__(1);
var other_1 = __webpack_require__(4);
var selection_1 = __webpack_require__(87);
var types_1 = __webpack_require__(2);
var SelectionHelper = /** @class */ (function () {
    function SelectionHelper(editor, uid, events) {
        var _this = this;
        this._selectionChange = function () {
            var isActive = _this.isActive();
            if (isActive) {
                _this._selectedText = window.getSelection().toString();
                if (_this._ignoreSelection) {
                    return;
                }
                var state = selection_1.stateFromDom(_this._editor);
                if (other_1.isEqual(state, _this._state, true)) {
                    return;
                }
                _this._state = state;
                _this._events.fire(types_1.RichTextEvents.selectionChange, [state]);
            }
        };
        this._events = events;
        this._uid = uid;
        this._editor = editor;
        this.clear();
        this._initEvents();
    }
    SelectionHelper.prototype.clear = function () {
        this._state = {
            range: false,
            left: {
                blockIndex: 0,
                textIndex: 0,
                offset: 0
            }
        };
        this._waitUpdate = true;
    };
    SelectionHelper.prototype.set = function (state) {
        this._state = state;
        this._waitUpdate = true;
    };
    SelectionHelper.prototype.get = function () {
        return this._state;
    };
    SelectionHelper.prototype.getCompact = function () {
        var state = this._state;
        var compact = [[state.left.blockIndex, state.left.textIndex, state.left.offset]];
        if (this._state.range) {
            compact.push([state.right.blockIndex, state.right.textIndex, state.right.offset]);
        }
        return compact;
    };
    SelectionHelper.prototype.setCompact = function (compact) {
        var state = {
            left: {
                blockIndex: compact[0][0],
                textIndex: compact[0][1],
                offset: compact[0][2]
            },
            range: compact.length === 2
        };
        if (state.range) {
            state.right = {
                blockIndex: compact[1][0],
                textIndex: compact[1][1],
                offset: compact[1][2]
            };
        }
        this.set(state);
    };
    SelectionHelper.prototype.getPosition = function (selection) {
        var _this = this;
        return new Promise(function (res) {
            if (!_this._waitUpdate) {
                var range = _this._createRange(selection);
                res(getPositionFromRange(range));
            }
            var ctx = new Date();
            _this._events.on(types_1.RichTextEvents.selectionRefresh, function () {
                _this._events.detach(types_1.RichTextEvents.selectionRefresh, ctx);
                var range = _this._createRange(selection);
                res(getPositionFromRange(range));
            }, ctx);
        });
    };
    SelectionHelper.prototype.destructor = function () {
        document.removeEventListener("selectionchange", this._selectionChange);
    };
    SelectionHelper.prototype.isActive = function () {
        var anchorNode = window.getSelection().anchorNode;
        return html_1.locate(anchorNode, "dhx_widget_id") === this._uid;
    };
    SelectionHelper.prototype.isFull = function () {
        var _a = this._state, left = _a.left, right = _a.right, range = _a.range;
        if (!range) {
            return false;
        }
        var last = this._editor.blocks.length - 1;
        var end = this._editor.blocks[last].getBlockEnd();
        return left.blockIndex === 0 && left.textIndex === 0 && left.offset === 0 && right.blockIndex === last && right.textIndex === end.textIndex && right.offset === end.offset;
    };
    SelectionHelper.prototype.update = function () {
        if (!this._waitUpdate) {
            return true;
        }
        return this.refresh();
    };
    SelectionHelper.prototype.getSelectedText = function () {
        return this._selectedText;
    };
    SelectionHelper.prototype.selectAll = function () {
        var blocks = this._editor.blocks;
        this._state = {
            range: true,
            left: {
                blockIndex: 0,
                textIndex: 0,
                offset: 0
            },
            right: __assign({ blockIndex: blocks.length - 1 }, blocks[blocks.length - 1].getBlockEnd())
        };
    };
    SelectionHelper.prototype.refresh = function () {
        var _this = this;
        var _a = this._state, left = _a.left, right = _a.right, range = _a.range;
        var selection = window.getSelection();
        if (!selection) {
            return false;
        }
        if (this._ignoreSelectionTimeout) {
            clearTimeout(this._ignoreSelectionTimeout);
        }
        this._ignoreSelection = true;
        this._ignoreSelectionTimeout = setTimeout(function () {
            _this._ignoreSelection = false;
            _this._ignoreSelectionTimeout = null;
        }, 5);
        var selectionRange;
        if (selection.rangeCount > 0) {
            selectionRange = selection.getRangeAt(0);
            selection.removeAllRanges();
        }
        else {
            selectionRange = document.createRange();
        }
        var startNode = this._editor.getTextElement(left.blockIndex, left.textIndex);
        if (!startNode) {
            return false;
        }
        var endNode;
        selectionRange.setStart(startNode, Math.min(left.offset, startNode.length));
        if (range) {
            endNode = this._editor.getTextElement(right.blockIndex, right.textIndex);
            if (!endNode) {
                return false;
            }
            selectionRange.setEnd(endNode, Math.min(right.offset, endNode.length));
        }
        else {
            selectionRange.setEnd(startNode, Math.min(left.offset, startNode.length));
        }
        selection.addRange(selectionRange);
        this._waitUpdate = false;
        this._events.fire(types_1.RichTextEvents.selectionRefresh, []);
        return true;
    };
    SelectionHelper.prototype._initEvents = function () {
        document.addEventListener("selectionchange", this._selectionChange);
    };
    SelectionHelper.prototype._createRange = function (selection) {
        var left = selection.left, right = selection.right;
        var range = document.createRange();
        var startNode = this._editor.getTextElement(left.blockIndex, left.textIndex);
        range.setStart(startNode, left.offset);
        if (selection.range) {
            var endNode = this._editor.getTextElement(right.blockIndex, right.textIndex);
            range.setEnd(endNode, right.offset);
        }
        else {
            range.setEnd(startNode, left.offset);
        }
        return range;
    };
    return SelectionHelper;
}());
exports.SelectionHelper = SelectionHelper;
function getPositionFromRange(range) {
    var pos = {};
    var rect = range.getBoundingClientRect();
    if (rect.height === 0) {
        rect = range.getClientRects()[0];
    }
    pos.xStart = rect.left + window.pageXOffset;
    pos.yStart = rect.top + window.pageYOffset;
    range.collapse(false);
    rect = range.getClientRects()[0];
    pos.xEnd = rect.left + window.pageXOffset;
    pos.yEnd = rect.top + window.pageYOffset;
    return pos;
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(13)))

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var html_1 = __webpack_require__(1);
var other_1 = __webpack_require__(4);
function stateFromDom(editor) {
    var _a, _b;
    var _c = window.getSelection(), anchorNode = _c.anchorNode, anchorOffset = _c.anchorOffset, focusNode = _c.focusNode, focusOffset = _c.focusOffset, isCollapsed = _c.isCollapsed;
    var leftNode = anchorNode;
    var rightNode = focusNode;
    var leftOffset = anchorOffset;
    var rightOffset = focusOffset;
    if (isSelectionBackwards()) {
        _a = [rightNode, leftNode], leftNode = _a[0], rightNode = _a[1];
        _b = [rightOffset, leftOffset], leftOffset = _b[0], rightOffset = _b[1];
    }
    var leftKey = html_1.locate(leftNode, "dhx_offset");
    var rightKey = html_1.locate(rightNode, "dhx_offset");
    var leftInfo = other_1.hashToInfo(leftKey);
    var rightInfo = other_1.hashToInfo(rightKey);
    var left;
    var right;
    if (leftInfo.length === 2) {
        if (leftNode.nodeType === 3) {
            left = {
                blockIndex: leftInfo[0],
                textIndex: leftInfo[1],
                offset: leftOffset
            };
        }
        else {
            left = {
                blockIndex: leftInfo[0],
                textIndex: leftInfo[1],
                offset: editor.blocks[leftInfo[0]].textNodes[leftInfo[1]].text.length
            };
        }
    }
    else if (leftInfo.length === 1) {
        if (editor.blocks[leftInfo[0]].textNodes[leftOffset]) {
            left = {
                blockIndex: leftInfo[0],
                textIndex: leftOffset,
                offset: 0
            };
        }
        else {
            left = {
                blockIndex: leftInfo[0],
                textIndex: leftOffset - 1,
                offset: editor.blocks[leftInfo[0]].textNodes[leftOffset - 1].text.length
            };
        }
    }
    else {
        left = {
            blockIndex: leftOffset,
            textIndex: 0,
            offset: 0
        };
    }
    if (isCollapsed) {
        return {
            range: false,
            left: left
        };
    }
    if (rightInfo.length === 2) {
        if (rightNode.nodeType === 3) {
            right = {
                blockIndex: rightInfo[0],
                textIndex: rightInfo[1],
                offset: rightOffset
            };
        }
        else {
            right = {
                blockIndex: rightInfo[0],
                textIndex: rightInfo[1],
                offset: editor.blocks[rightInfo[0]].textNodes[rightInfo[1]].text.length
            };
        }
    }
    else if (rightInfo.length === 1) {
        if (rightOffset === 0) {
            right = __assign({ blockIndex: rightInfo[0] - 1 }, editor.blocks[rightInfo[0] - 1].getBlockEnd());
        }
        else {
            right = {
                blockIndex: rightInfo[0],
                textIndex: rightOffset - 1,
                offset: editor.blocks[rightInfo[0]].textNodes[rightOffset - 1].text.length
            };
        }
    }
    else {
        right = __assign({ blockIndex: rightOffset - 1 }, editor.blocks[rightOffset - 1].getBlockEnd());
    }
    return {
        left: left,
        right: right,
        range: true
    };
}
exports.stateFromDom = stateFromDom;
// range end cannot be set before range start, so if selection backwards range be collapsed
function isSelectionBackwards() {
    var _a = window.getSelection(), anchorNode = _a.anchorNode, focusNode = _a.focusNode, anchorOffset = _a.anchorOffset, focusOffset = _a.focusOffset;
    var range = document.createRange();
    range.setStart(anchorNode, anchorOffset);
    range.setEnd(focusNode, focusOffset);
    return range.collapsed;
}


/***/ })
/******/ ]);
});if (window.dhx_legacy) { if (window.dhx){ for (var key in dhx) dhx_legacy[key] = dhx[key]; } window.dhx = dhx_legacy; delete window.dhx_legacy; }