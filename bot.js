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
      //check to see if message is unread.
      if (comment.new) {
        console.log(comment);
        comment.reply(
          'thanks for including me. ' +
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
