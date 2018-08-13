var prefix = "https://cors-anywhere.herokuapp.com/",
    tweetLink = "https://twitter.com/intent/tweet?text=",
    quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";

function createTweet(input) {
  var data = input[0],
      quoteText = $(data.content).text().trim(),
      quoteAuthor = data.title,
      quoteId = data.ID;

  if (!quoteAuthor.length) {
    quoteAuthor = "Unknown author";
  }

  var tweetText = "Quote of the day - " + quoteText + " Author: " + quoteAuthor;

  if (tweetText.length > 140) {
    getQuote();
  } else {
    var tweet = tweetLink + encodeURIComponent(tweetText);
    $('.quote').text(quoteText);
    $('.author').text("— " + quoteAuthor);
    $('.number').text("# " + quoteId);
    $('.tweet').attr('href', tweet);
  }
}

function getQuote() {
  $.getJSON(prefix + quoteUrl, createTweet);
  $.ajaxSetup({ cache: false });
}

$(document).ready(function() {
  getQuote();
  $('.trigger').click(function() {
    getQuote();
  })
});
