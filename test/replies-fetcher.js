var expect = require('chai').expect
var cheerio = require('cheerio')
var fetchReplies = require('../lib/replies-fetcher')

describe('Replies Fetcher', function () {
  it('should export a function', function () {
    expect(require('../lib/replies-fetcher')).to.be.a('function')
  })

  it('should throw an error if no video ID is provided', function () {
    expect(fetchReplies).to.throw(Error)
    expect(function () {
      fetchReplies(null, 'abc')
    }).to.throw(Error)
  })

  it('should throw an error if no comment ID is provided', function () {
    expect(fetchReplies).to.throw(Error)
    expect(function () {
      fetchReplies('abc', null)
    }).to.throw(Error)
  })

  it('should give an error for an invalid video ID', function () {
    this.timeout(180000)
    return fetchReplies('fakeId', 'z13oy5eavyzketqp204cjvjadqu5xttiwhk').then(function (page) {
      expect(page).not.to.exist
    }).catch(function (error) {
      expect(error).to.exist
    })
  })

  it('should give an error for an invalid comment ID', function () {
    this.timeout(180000)
    return fetchReplies('eKEwL-10s7E', 'yadayada').then(function (page) {
      expect(page).not.to.exist
    }).catch(function (error) {
      expect(error).to.exist
    })
  })

  it('should get replies to a comment', function () {
    this.timeout(180000)
    return fetchReplies('eKEwL-10s7E', 'z13oy5eavyzketqp204cjvjadqu5xttiwhk').then(function (page) {
      expect(page).to.have.a.property('html')
      expect(page.html).to.be.a('string')
      expect(page.html).to.have.length.above(1)
    })
  })

  it('should return valid HTML for replies', function () {
    this.timeout(180000)
    return fetchReplies('eKEwL-10s7E', 'z13oy5eavyzketqp204cjvjadqu5xttiwhk').then(function (page) {
      var $ = cheerio.load(page.html)
      expect($('.comment-item')).to.have.a.property('0')
    })
  })
})
