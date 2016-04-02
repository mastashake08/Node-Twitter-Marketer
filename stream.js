var Twit = require('twit')
require('dotenv').config();
var T = new Twit({
  consumer_key:         process.env.CONSUMER_KEY,
  consumer_secret:      process.env.CONSUMER_SECRET,
  access_token:         process.env.ACCESS_TOKEN,
  access_token_secret:  process.env.ACCESS_TOKEN_SECRET,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})

var sanFrancisco = [ '-122.75', '36.8', '-121.75', '37.8' ]
var lasVegas =  ['-115.24', '36.07', '-115°03', '36.22' ]

//
//  filter the twitter public stream by the word 'mango'.
//
var stream = T.stream('statuses/filter', { track: 'new music, rap music, #rap, #hotmusic, 2016 hits', locations: sanFrancisco })

stream.on('tweet', function (tweet) {
  //console.log(tweet)
  T.post('statuses/update', { status: '@'+ tweet.user.screen_name +', Please review and R/T my music video about our times: https://youtu.be/XoKqCQDNmmY  #FreshwaddaBrooks', in_reply_to_status_id: tweet.id }, function(err, data, response) {
    console.log(data)
  })
})
/*
//
// filter the public stream by the latitude/longitude bounded box of San Francisco
//


var stream = T.stream('statuses/filter', { locations: sanFrancisco })

stream.on('tweet', function (tweet) {
  console.log(tweet)
})

//
// filter the public stream by english tweets containing `#apple`
//
var stream = T.stream('statuses/filter', { track: '#apple', language: 'en' })

stream.on('tweet', function (tweet) {
  console.log(tweet)
})
*/
