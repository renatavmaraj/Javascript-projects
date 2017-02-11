/****************************************************************
* Wait for page load, click review tab, scrape contents
* Print reviews and dates of review from bestbuy
* Unable to use jQuery
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

var url = 'http://www.bestbuy.com/site/dji-phantom-3-standard-quadcopter-white/4406800.p?id=1219743453736&skuId=4406800';

var ratings = [];
var dates = [];

function getRatings() {
  var ratings = document.querySelectorAll('.BVRRNumber.BVRRRatingNumber')
  return Array.prototype.map.call(ratings, function(e){
    return e.innerText;
  });
};

function getDates() {
  var dates = document.querySelectorAll('.BVRRValue.BVRRReviewDate');
  return Array.prototype.map.call(dates, function(e) {
    return e.innerText;
  });
};

casper.start(url, function() {
  this.echo(this.getTitle());
});

casper.wait(1000, function() {
    this.echo("I've waited for a second.");
});

casper.then(function() {
  this.click('button[data-click-location="customerreviewstab"]');
  console.log('clicked reviews tab ');
});

casper.waitForSelector('.BVRRRatingContainerStar', function() {
  console.log('ratings loaded' );
});

casper.then(function() {
  ratings = this.evaluate(getRatings);
  dates = this.evaluate(getDates);
});
casper.then(function() {
  this.echo(ratings.length + ' ratings found: ');
  this.echo(' - ' + ratings.join('\n - '));
  this.echo(' - ' + dates.join('\n - '));
});

casper.run()