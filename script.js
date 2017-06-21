$(document).ready(function () {
    
    var prefix = "https://cors-anywhere.herokuapp.com/",
        tweetLink = "https://twitter.com/intent/tweet?text=",
        quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";
    
    $.ajaxSetup({ cache: false });
    
    function getQuote() {
        $.getJSON(prefix + quoteUrl, createTweet);
    }
    
    function createTweet(input) {
        var data = input[0],
            quoteText = $(data.content).text().trim(),
            quoteAuthor = data.title,
            tweetText = "Quote of the day - " + quoteText + " Author: " + quoteAuthor;

        if (!quoteAuthor.length) {
            quoteAuthor = "Unknown author";
        }
        
        if (quoteText.length > 140) {
            getQuote();
        } else {
            var tweet = tweetLink + encodeURIComponent(tweetText);
            $('.quote').text(quoteText);
            $('.author').text("Author: " + quoteAuthor);
            $('.tweet').attr('href', tweet);
        }
    }
    
    getQuote();
    $('.trigger').click(function () {
        getQuote();
    });
});