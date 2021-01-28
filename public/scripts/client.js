/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]


const renderTweets = (tweets) => {
  for (const tweet of tweets) {
    $('.tweet-container').prepend(createTweetElement(tweet));
  }
}

const createTweetElement = (tweetData) => {
  let content = `<article class="tweet"> 
   <header class="tweet-header">
    <div class= "tweeted-profile">
      <img class="icon" src=${tweetData.user.avatars} width = "50", height = "50">
      <span>${tweetData.user.name}</span>
    </div>
      <span>${tweetData.user.handle}</span>
      </header>
      <p>
        ${tweetData.content.text}
      </p>
    <footer>
      <small>${tweetData.created_at}
      <button class = "nav-text-right"> 
      buttons
    </button>
  </footer>
  </article>`
    
  return content
}

renderTweets(data);
