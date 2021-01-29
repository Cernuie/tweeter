/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}


const renderTweets = function(tweets) {
  for (let tweet of tweets) {
    let tweetPrepend = createTweetElement(tweet);
    $(".tweet-container").prepend(tweetPrepend);
  }
}

const createTweetElement = function(tweetData) {
  let $tweet = `
  <article class="tweet"> 
   <header class="tweet-header">
    <div class= "tweeted-profile">
      <img class="icon" src=${tweetData.user.avatars} width = "50", height = "50">
      <span>${escape(tweetData.user.name)}</span>
    </div>
      <span>${escape(tweetData.user.handle)}</span>
      </header>
      <p>
        ${escape(tweetData.content.text)}
      </p>
    <footer>
      <time>
      ${moment(tweetData.created_at).fromNow()}
      </time>
      <button> 
      buttons
      </button>
  </footer>
  </article>
  `;
    
  return $tweet;
}


$(document).ready(function() {
  $('form').on('submit', function(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    let $input = $(this).serialize();
    let textInput = $(document.querySelector(".tweet-input")).children('#tweet-text')

    //check if submission is correct
    //check for empty string, and string over char limit
    if (textInput.val().length === 0) {
      alert("You need to write a message to submit!");

    } else if (textInput.val().length > 140) {
      alert("Your message is too long! Trim it down.")
    } else {

    $.ajax({
      url:'/tweets',
      method: 'POST',
      data: $input
    })
    .done(() => {
      console.log($input)
      $.ajax({
        url: '/tweets',
        method: 'GET'
      })
      .done((tweets) => {
        renderTweets(tweets);
      })
    })
    textInput.val('');
    $('.counter').val(140);
    }
  })
  $.ajax({
    url: '/tweets',
    method: 'GET',
    })
  .done((tweets) => {
    renderTweets(tweets);
    })
})
