const Snoowrap = require('snoowrap');
const keywordExtractor = require('keyword-extractor');
const secret = require('./secret');

const r = new Snoowrap({
  userAgent: secret.userAgent,
  clientId: secret.clientId,
  clientSecret: secret.clientSecret,
  username: secret.username,
  password: secret.password
});

const fetchMessages = async () => {
  console.log('function is running');
  const messages = await r.getInbox({ filter: 'mentions' });

  messages.map(async comment => {
    try {
      //check to see if message is unread
      if (comment.new) {
        console.log(comment);
        comment.reply(
          'thanks for including me.' +
            keywordExtractor.extract(comment.link_title)
        );
        console.log(keywordExtractor.extract(comment.link_title));

        await r.markMessagesAsRead([`t1_${comment.id}`]);
      }
    } catch (error) {
      console.log(error);
    }
  });
  //Set time out for 10 seconds before running the function again
};

setInterval(() => fetchMessages(), 10000);

// pollTime is 10000 because reddit is very strict on posting too frequently
// at first, you'll only be able to post once every 10 minutes, so make sure you get it right!
// const comments = new CommentStream(client, {
//   subreddit: 'AskReddit',
//   limit: 10,
//   pollTime: 10000
// });

// comments.on('item', item => {
//   console.log(item);
// });
