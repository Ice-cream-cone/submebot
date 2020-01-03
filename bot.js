const Snoowrap = require('snoowrap');
const { CommentStream } = require('snoostorm');
const secret = require('./secret');

const client = new Snoowrap({
  userAgent: secret.userAgent,
  clientId: secret.clientId,
  clientSecret: secret.clientSecret,
  username: secret.username,
  password: secret.password
});

// pollTime is 10000 because reddit is very strict on posting too frequently
// at first, you'll only be able to post once every 10 minutes, so make sure you get it right!
const comments = new CommentStream(client, {
  subreddit: 'testingground4bots',
  limit: 10,
  pollTime: 10000
});

comments.on('item', item => {
  console.log(item);
});

// client
//   .getHot()
//   .map(post => post.title)
//   .then(console.log);
