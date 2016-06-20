var path = require('path');
var twit = require('twit');
var config = require('../config');
var express = require('express');
var router = express.Router();
var sentiment = require('sentiword');



router.post('/:search', function(req, res) {
    var twitter = new twit({
        consumer_key: config.consumer_key,
        consumer_secret: config.consumer_secret,
        access_token: config.access_token,
        access_token_secret: config.access_token_secret
    });
    twitter.get('search/tweets', {
        q: req.params.search + ' filter:safe',
        result_type: 'mixed',
        lang: 'en',
        include_entities: false,
        count: 100
    }, function(err, data, response) {
        console.log(data)

        var resp = {};
        resp.data = data;
        resp.score = getScore(data);
        res.send(resp);
    })
});

function getScore(tweet) {
    var scoreArray = [];
    var sentArray = [];
    var sentTotalArray = [];

    for (var i = 0; i < tweet.statuses.length; i++) {

        var tweetSentiment = sentiment(tweet.statuses[i].text);
        var score = '';
        console.log('tweet sentiment', tweetSentiment);

        if (tweetSentiment.sentiment <= -0.65) {
            score = 'Very Negative';
        } else if (tweetSentiment.sentiment < 0 && tweetSentiment.sentiment > -0.65 ) {
            score = 'Negative'
        } else if (tweetSentiment.sentiment >= 0.65) {
            score = 'Very Positive';
        } else if (tweetSentiment.sentiment > 0 && tweetSentiment.sentiment < 0.65) {
              score = 'Positive';
        } else {
            score = 'Neutral';
        }
        sentTotalArray.push(tweetSentiment.sentiment);
        sentArray.push((tweetSentiment.sentiment)*100).toFixed(1);
        scoreArray.push(score);

    }
    console.log('tweet sentiment = ', scoreArray);
    return {score: scoreArray, sentiment: sentArray, rawSentiment: sentTotalArray};


}



module.exports = router;
