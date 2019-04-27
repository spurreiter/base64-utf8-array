const assert = require('assert')
const {
  base64Decode,
  base64Encode,
  utf8ArrayToString,
  stringToUtf8Array
} = require('..')

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
    it('encodes', function () {
      const aUtf8 = stringToUtf8Array(sInput)
      const res = base64Encode(aUtf8)
      assert.strictEqual(res, sBase64)
    })

    it('decodes', function () {
      const aUtf8 = base64Decode(sBase64)
      const str = utf8ArrayToString(aUtf8)
      assert.strictEqual(str, sInput)
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
