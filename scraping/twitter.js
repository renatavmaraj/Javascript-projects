/****************************************************************
* Log in to twitter
* Submit search query
* Capture results
* Use emit(). on() event methods
*****************************************************************/


//doesn't work

var casper = require("casper").create({
  verbose: true,
  logLevel: 'error',     // debug, info, warning, error
  pageSettings: {
    loadImages: false,
    loadPlugins: false,
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4'
  }
});

var url = 'http://www.twitter.com/'

var twitterId = 'robindykema'
var email = 'INSERT EMAIL HERE'
var auth = 'INSERT PASSWORD HERE'

var searchKey = 'trump'

casper.start(url + twitterId, function() {
  this.echo(this.getTitle());
});

casper.then(function() {
  this.fillSelectors('form.js-front-signin', {
    'input[name="session[username_or_email]"]': email,
    'input[name="session[password]"]': auth
  }, true);
});

casper.then(function(){
  console.log('Authentication ok, new location is ', this.getCurrentUrl());
})

casper.then(function(){
  this.fill('form#global-nav-search', {
    q: searchKey
  }, true);
})

casper.waitForSelector('.trends-inner', function() {
  console.log('search results loaded' );
});

casper.then(function() {
  this.emit('results.log');
});

casper.on('results.log', function() {
  this.captureSelector('twitPic.png', 'div.stream-container');
});

casper.run()