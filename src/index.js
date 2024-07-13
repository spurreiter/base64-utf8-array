const isNode = typeof window === 'undefined' && typeof process === 'object'

const atob = isNode
  ? (sBase64) => Buffer.from(sBase64, 'base64').toString('binary')
  : window.atob
const btoa = isNode
  ? (sBinary) => Buffer.from(sBinary, 'binary').toString('base64')
  : window.btoa

// detect support for linebreaks in `atob`
let supportsCR = true
try {
  !isNode && atob('\r\n')
// eslint-disable-next-line no-unused-vars
} catch (e) {
  supportsCR = false
}

/**
 * converts a string to an Uint8Array
 * @private
 */
function stringToUint8Array (str) {
  const array = new Uint8Array(str.length)
  for (let i = 0; i < array.length; i++) {
    array[i] = str.charCodeAt(i)
  }
  return array
}

/**
 * @private
 */
function uint8ArrayToString (arrUint8) {
  let sUtf8 = ''
  for (const c of arrUint8) {
    sUtf8 += String.fromCharCode(c)
  }
  return sUtf8
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
function base64Decode (sBase64 = '') {
  // e.g. IE11 requires to remove unallowed chars like linebreaks
  if (!supportsCR) sBase64 = sBase64.replace(/[\r\n]/g, '')
  const sBinary = atob(sBase64)
  const arrUint8 = stringToUint8Array(sBinary)
  return arrUint8
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
function base64Encode (arrUint8) {
  return btoa(uint8ArrayToString(arrUint8))
}

/**
 * converts a Uint8Array of UTF8 chars/values to a UTF16 string
 * @param {Uint8Array}
 * @returns {string} UTF16 string
 */
function utf8ArrayToString (aUtf8) {
  const sUtf8 = uint8ArrayToString(aUtf8)
  return decodeURIComponent(escape(sUtf8))
}

/**
 * converts a UTF16 string to a Uint8Array of UTF8 chars/values
 * @param {string} str UTF16 string
 * @returns {Uint8Array}
 */
function stringToUtf8Array (str) {
  const sUtf8 = unescape(encodeURIComponent(str))
  return stringToUint8Array(sUtf8)
}

module.exports = {
  base64Decode,
  base64Encode,
  utf8ArrayToString,
  stringToUtf8Array
}
