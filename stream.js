var Twit = require('twit')
require('dotenv').config();
var T = new Twit({
  consumer_key:         process.env.CONSUMER_KEY,
  consumer_secret:      process.env.CONSUMER_SECRET,
  access_token:         process.env.ACCESS_TOKEN,
  access_token_secret:  process.env.ACCESS_TOKEN_SECRET,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})

var locations = [['-115.414625','36.129623','-115.062072','36.380623'],['36.49','-89.57','39.15','-81.97']];
var LineByLineReader = require('line-by-line');
var lr = new LineByLineReader('Keywords.csv'), tracks = [];
lr.on('error', function (err) {
	// 'err' contains error object
  console.log('ERROR!! ' + err);
});

lr.on('line', function (line) {
	// 'line' contains the current line without the trailing newline character.
  if(line != null && line != ''){
    tracks.push(line);
  }
  console.log('Line read!');
});

lr.on('end', function () {

  //
  //  filter the twitter public stream by the word 'mango'.
  //
  console.log(tracks);
  var stream = T.stream('statuses/filter', { track: tracks })

  stream.on('tweet', function (tweet) {
    console.log(tweet)
    /*T.post('statuses/update', { status: '@'+ tweet.user.screen_name +', Please review and R/T my music video about our times: https://youtu.be/XoKqCQDNmmY  #FreshwaddaBrooks', in_reply_to_status_id: tweet.id }, function(err, data, response) {
      console.log(data)
    })*/
  })
/*
  stream.on('follow', function(event){
    console.log('You were followed');
    T.post('direct_messages/new',{user_id: event.target.id, text: process.env.DM });
  });*/

});
