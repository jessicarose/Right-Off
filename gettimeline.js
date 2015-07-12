var Twitter = require('twitter');
module.exports = function(hashtag, user, callback){
	console.log("Input:" + hashtag + "" + user);
	var client = new Twitter({
	consumer_key: process.env.TWITTER_KEY,
	consumer_secret: process.env.TWITTER_SECRET,
	access_token_key: user.token,
	access_token_secret: user.token_secret
});

var params = {count: 200};
var count = 0;
client.get('statuses/mentions_timeline', params, function(error, tweets, response){
		console.log("Error from get:" + error);
		if(error){
			return error
	}
		tweets.forEach(function(tweet){
			if (tweet.text.match(hashtag)){
				count+=1;
			}
		}
		)

		console.log("Count:" + count);
		callback(count);
});
}
