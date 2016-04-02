var Twit = require('twit')
require('dotenv').config();
var tracks = [];
var locations = [['-115.414625','36.129623','-115.062072','36.380623'],['36.49','-89.57','39.15','-81.97']];
var T = new Twit({
  consumer_key:         process.env.CONSUMER_KEY,
  consumer_secret:      process.env.CONSUMER_SECRET,
  access_token:         process.env.ACCESS_TOKEN,
  access_token_secret:  process.env.ACCESS_TOKEN_SECRET,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})
var LineByLineReader = require('line-by-line');
var lr = new LineByLineReader('Keywords.csv'), tracks = [], data = {};
lr.on('error', function (err) {
	// 'err' contains error object
  console.log('ERROR!! ' + err);
});

lr.on('line', function (line) {
	// 'line' contains the current line without the trailing newline character.
  if(line != null && line != ''){
    tracks.push(line);
  }
  //console.log('Line read!');
});

lr.on('end', function () {
	// All lines are read, file is closed now.
  //Las Vegas bounding box SW/NE Long/Lat pair

  //data = {track:tracks, locations:locations};
  data = {track:tracks};
  console.log('Tracks loaded!');

  //
  //  search twitter for all tweets containing the word 'banana' since July 11, 2011
  //
  T.get('search/tweets', { q: 'new music', count: 100 }, function(err, data, response) {
    //data.statuses
    for(var i = 0; i < data.statuses.length; i++){
      //console.log(data.statuses[i].id);
      //console.log(data.statuses[i].user.screen_name);
      T.post('statuses/update', { status: '@'+ data.statuses[i].user.screen_name +', Please review and R/T my music video about our times: https://youtu.be/XoKqCQDNmmY  #FreshwaddaBrooks', in_reply_to_status_id: data.statuses[i].id }, function(err, data, response) {
        console.log(data)
      })
    }
  })

});
