var express = require('express');
var cons = require('consolidate');
var twitterAPI = require('node-twitter-api');
var session = require('express-session');
var getTimeLine = require('./gettimeline.js')

var app = express();
var hashtag = 'cake';

app.use(session({
	secret: process.env.APP_KEY,
	resave: false,
	saveUninitialized: true
}))

app.engine('html', cons.mustache);
app.set('view engine', 'html');
app.set('views', './views');

var twitter = new twitterAPI({
	consumerKey: process.env.TWITTER_KEY,
	consumerSecret: process.env.TWITTER_SECRET,
	callback: 'http://tempnode.canfuckrightoff.com:3030/app'
})





app.get('/', function (request, response){
	twitter.getRequestToken(function(error, requestToken, requestTokenSecret, result){
		if(error){
			console.log(error);
		}
		else{
			request.session.requestTokenSecret = requestTokenSecret;
			response.render('index.html', {
				requestToken: requestToken
			});
			//do the thing here, the thing where you get the tokens and redirect
		}
	})

});

app.get('/app', function(request, response){
	twitter.getAccessToken(request.query.oauth_token, request.session.requestTokenSecret, request.query.oauth_verifier, function(error, accessToken, accessTokenSecret, results){
		console.log(error);
		var count = getTimeLine(hashtag, {accessToken, accessTokenSecret}) 
		response.send(count)
	})
})

var server = app.listen(3030);

//http://canfuckrightoff.com/app?oauth_token=8PdSEwAAAAAAgjgMAAABTn377uw&oauth_verifier=dE1PeHZmRv97DdS4KTbMpLaPg8AoEQfP
