var Twit = require('twit')
var LineByLineReader = require('line-by-line');
require('dotenv').config();

var locations = [['-115.414625','36.129623','-115.062072','36.380623'],['36.49','-89.57','39.15','-81.97']];
var T = new Twit({
  consumer_key:         process.env.CONSUMER_KEY,
  consumer_secret:      process.env.CONSUMER_SECRET,
  access_token:         process.env.ACCESS_TOKEN,
  access_token_secret:  process.env.ACCESS_TOKEN_SECRET,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})
var tweets = [
  ' Please, check out my video and R/T to people who want to save the kids!! https://youtu.be/XoKqCQDNmmY #Freshwadda',
  ' Trying to reach all of those who care about our next generation,  R/T and share please: https://youtu.be/XoKqCQDNmmY  #Freshwadda',
  ' Music Video response to the presidential campaign, please R/T: https://youtu.be/XoKqCQDNmmY  #Freshwadda',
  ' My music video "For The People!!"!! Please R/T: https://youtu.be/XoKqCQDNmmY  #Freshwadda',
  ' My music video "WARNING", a message to the kids: https://youtu.be/XoKqCQDNmmY  #Freshwadda',
  ' Please review & R/T my music video talking about lessons we must pass on: https://youtu.be/XoKqCQDNmmY  #Freshwadda'
]
var t = new LineByLineReader('tweets.csv');
t.on('error', function (err) {
	// 'err' contains error object
  console.log('ERROR!! ' + err);
});

t.on('line', function (line) {
	// 'line' contains the current line without the trailing newline character.
  if(line != null && line != ''){
    tweets.push(line);
  }
  //console.log('Line read!');
});

t.on('end', function () {
  console.log(tweets);
});

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
  console.log(tracks);
  tracks = tracks.toString();
  tracks = tracks.replace(/,/gi , ' OR ');
  console.log(tracks);
  console.log('Tracks loaded!');

  T.get('search/tweets', { q: tracks, count: 200, language: 'en', locations:locations, since: '2016-04-01' }, function(err, data, response) {
    //data.statuses
    for(var i = 0; i < data.statuses.length; i++){
      //console.log(data.statuses[i]);
      var rand = Math.floor((Math.random() * tweets.length));
      console.log('@'+ data.statuses[i].user.screen_name +tweets[rand]);
      /*T.post('favorites/create', {id: data.statuses[i].id }, function(err, data, response) {
        console.log(data)
      })

      T.post('statuses/update', { status: '@'+ data.statuses[i].user.screen_name +tweets[rand], in_reply_to_status_id: data.statuses[i].id }, function(err, data, response) {
        console.log(data)
      })*/

    }
  })

});
