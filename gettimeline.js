var Twitter = require('twitter');
modules.export = function(hashtag, user){
	var client = new Twitter({
	consumer_key: process.env.TWITTER_KEY,
	consumer_secret: process.env.TWITTER_SECRET,
	access_token_key: user.token,
	access_token_secret: user.token_secret
});

var params = {count: 200};
client.get('statuses/mentions_timeline', params, function(error, tweets, response){
	function(error){
		if(error){
			return error
		}
	}
		var count = 0;
		tweets.forEach(function(tweet){
			if (tweet.text.match(hashtag)){
				count+=1;
			}
		}
		)
	return count;
});

}
