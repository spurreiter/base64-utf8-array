"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var isNode = typeof window === 'undefined' && (typeof process === "undefined" ? "undefined" : _typeof(process)) === 'object';
var atob = isNode ? function (sBase64) {
  return Buffer.from(sBase64, 'base64').toString('binary');
} : window.atob;
var btoa = isNode ? function (sBinary) {
  return Buffer.from(sBinary, 'binary').toString('base64');
} : window.btoa; // detect support for linebreaks in `atob`

var supportsCR = true;

try {
  !isNode && atob('\r\n');
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
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = arrUint8[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var c = _step.value;
      sUtf8 += String.fromCharCode(c);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
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
  var sBinary = atob(sBase64); // eslint-disable-line node/no-deprecated-api

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
  return btoa(uint8ArrayToString(arrUint8)); // eslint-disable-line node/no-deprecated-api
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