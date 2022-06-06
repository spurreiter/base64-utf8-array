require('@babel/polyfill')

const { assert } = require('chai')

const {
  base64Decode,
  base64Encode,
  utf8ArrayToString,
  stringToUtf8Array
} = require('..')

const isBrowser = typeof window !== 'undefined'
function noop () {}
const itBrowser = isBrowser ? it : noop

describe('base64-utf8-array', function () {
  const sInput = '🦈 ほふねむれゐぬ もやのうち \u2014 as a דג סקרן? '
  const sBase64 = '8J+miCDjgbvjgbXjga3jgoDjgozjgpDjgawg44KC44KE44Gu44GG44GhIOKAlCBhcyBhINeT15Ig16HXp9eo158/IA=='

  describe('utf8 array', function () {
    let arr
    it('encodes using stringToUtf8Array', function () {
      arr = stringToUtf8Array(sInput)
    })
    it('decodes using utf8ArrayToString', function () {
      const res = utf8ArrayToString(arr)
      assert.strictEqual(res, sInput)
    })
  })

  describe('base64 string', function () {
    it('can encode', function () {
      const aUtf8 = stringToUtf8Array(sInput)
      const res = base64Encode(aUtf8)
      assert.strictEqual(res, sBase64)
    })
    it('can decode', function () {
      const aUtf8 = base64Decode(sBase64)
      const str = utf8ArrayToString(aUtf8)
      assert.strictEqual(str, sInput)
    })
    it('can decode base64 strings with linebreaks', function () {
      const sBase64CR = sBase64.match(/[^]{1,20}/g).join('\r\n')
      const aUtf8 = base64Decode(sBase64CR)
      const str = utf8ArrayToString(aUtf8)
      assert.strictEqual(str, sInput)
    })
    itBrowser('decode may throw on invalid encoded string in browser', function () {
      const sBase64 = 'AAAAs' + Array(200).fill('0').join('')
      assert.throws(() => {
        base64Decode(sBase64)
      }, /InvalidCharacterError|Failed to execute 'atob' on 'Window'|String contains an invalid character/)
    })
  })
})

/*

http://ecmanaut.blogspot.com/2006/07/encoding-decoding-utf8-in-javascript.html

var utf8 = unescape(encodeURIComponent(str));

var arr = [];
for (var i = 0; i < utf8.length; i++) {
    arr.push(utf8.charCodeAt(i));
}
 */
