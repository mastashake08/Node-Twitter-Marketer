var Twit = require('twit')
require('dotenv').config();

var locations = [['-115.414625','36.129623','-115.062072','36.380623'],['36.49','-89.57','39.15','-81.97']];
var T = new Twit({
  consumer_key:         process.env.CONSUMER_KEY,
  consumer_secret:      process.env.CONSUMER_SECRET,
  access_token:         process.env.ACCESS_TOKEN,
  access_token_secret:  process.env.ACCESS_TOKEN_SECRET,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})
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
  //console.log('Line read!');
});

lr.on('end', function () {
	// All lines are read, file is closed now.
  //Las Vegas bounding box SW/NE Long/Lat pair
  tracks = tracks.toString();
  tracks = tracks.replace(',',' OR ');
  console.log(tracks);
  console.log('Tracks loaded!');

  T.get('search/tweets', { q: tracks, count: 100, language: 'en', locations:locations }, function(err, data, response) {
    //data.statuses
    for(var i = 0; i < data.statuses.length; i++){
      console.log(data.statuses[i].id+') '+data.statuses[i].text);
      //console.log(data.statuses[i].user.screen_name);
      T.post('favorites/create', {id: data.statuses[i].id }, function(err, data, response) {
        console.log(data)
      })

      T.post('statuses/update', { status: '@'+ data.statuses[i].user.screen_name +process.env.TWEET, in_reply_to_status_id: data.statuses[i].id }, function(err, data, response) {
        //console.log(data)
      })
    }
  })

});
