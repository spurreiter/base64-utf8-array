"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var isNode = typeof window === 'undefined' && (typeof process === "undefined" ? "undefined" : _typeof(process)) === 'object';
var atob = isNode ? function (sBase64) {
  return Buffer.from(sBase64, 'base64').toString('binary');
} : window.atob;
var btoa = isNode ? function (sBinary) {
  return Buffer.from(sBinary, 'binary').toString('base64');
} : window.btoa;

// detect support for linebreaks in `atob`
var supportsCR = true;
try {
  !isNode && atob('\r\n');
  // eslint-disable-next-line no-unused-vars
} catch (e) {
  supportsCR = false;
}

/**
 * converts a string to an Uint8Array
 * @private
 */
function stringToUint8Array(str) {
  var array = new Uint8Array(str.length);
  for (var i = 0; i < array.length; i++) {
    array[i] = str.charCodeAt(i);
  }
  return array;
}

/**
 * @private
 */
function uint8ArrayToString(arrUint8) {
  var sUtf8 = '';
  var _iterator = _createForOfIteratorHelper(arrUint8),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var c = _step.value;
      sUtf8 += String.fromCharCode(c);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return sUtf8;
}

/**
 * decodes a base64 encoded string to an Uint8Array of UTF8 chars/values
 * @param {string} sBase64
 * @returns {Uint8Array}
 * @example
 * const { base64Decode, utf8ArrayToString } = require('base64-utf8-array')
 * const aUtf8 = base64Decode('YWJj')
 * const str = utf8ArrayToString(aUtf8)
 * //> str = 'abc'
 */
function base64Decode() {
  var sBase64 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  // e.g. IE11 requires to remove unallowed chars like linebreaks
  if (!supportsCR) sBase64 = sBase64.replace(/[\r\n]/g, '');
  var sBinary = atob(sBase64);
  var arrUint8 = stringToUint8Array(sBinary);
  return arrUint8;
}

/**
 * encodes a Uint8Array of UTF8 chars/values to a base64 encoded string
 * @param {Uint8Array} arrUint8
 * @returns {string}
 * @example
 * const { stringToUtf8Array, base64Encode } = require('base64-utf8-array')
 * const aUtf8 = stringToUtf8Array('abc')
 * const sbase64 = base64Encode(aUtf8)
 * //> sbase64 = 'YWJj'
 */
function base64Encode(arrUint8) {
  return btoa(uint8ArrayToString(arrUint8));
}

/**
 * converts a Uint8Array of UTF8 chars/values to a UTF16 string
 * @param {Uint8Array}
 * @returns {string} UTF16 string
 */
function utf8ArrayToString(aUtf8) {
  var sUtf8 = uint8ArrayToString(aUtf8);
  return decodeURIComponent(escape(sUtf8));
}

/**
 * converts a UTF16 string to a Uint8Array of UTF8 chars/values
 * @param {string} str UTF16 string
 * @returns {Uint8Array}
 */
function stringToUtf8Array(str) {
  var sUtf8 = unescape(encodeURIComponent(str));
  return stringToUint8Array(sUtf8);
}
module.exports = {
  base64Decode: base64Decode,
  base64Encode: base64Encode,
  utf8ArrayToString: utf8ArrayToString,
  stringToUtf8Array: stringToUtf8Array
};