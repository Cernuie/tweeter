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
  //hide error message because no error yet
  $('.error').hide();
  //functionality to scroll up and focus on text box
  $('.nav-text-right').on("click", () => {
    const textBox = $(document.querySelector(".tweet-input")).children('#tweet-text');
    textBox[0].scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
    textBox[0].focus({ preventScroll: true });
  })
  //functionality to submit tweet
  $('form').on('submit', function(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    let $input = $(this).serialize();
    let textInput = $(document.querySelector(".tweet-input")).children('#tweet-text')

    //check if submission is correct
    //check for empty string, and string over char limit
    if (textInput.val().length === 0) {
      let error = `
      <i class="fas fa-exclamation-triangle"></i> 
      <b> You need to write a message to submit! </b>
      <i class="fas fa-exclamation-triangle"></i> 
      `
      $('.error').hide();
      $('.error').empty();
      $('.error').append(error);
      $('.error').slideDown('slow');
    } else if (textInput.val().length > 140) {
      let error = `
      <i class="fas fa-exclamation-triangle"></i> 
      <b> Your message is too long, please make it below 140 characters! </b>
      <i class="fas fa-exclamation-triangle"></i> 
      `
      $('.error').hide();
      $('.error').empty();
      $('.error').append(error);
      $('.error').slideDown('slow');
    } else {
      //if everything is good, submits tweet via ajax request
      //gets it from /tweets, and then renders the tweets
    $.ajax({
      url:'/tweets',
      method: 'POST',
      data: $input
    })
    .done(() => {
      $.ajax({
        url: '/tweets',
        method: 'GET'
      })
      .done((tweets) => {
        renderTweets(tweets);
      })
    })
    //resets counter and text box
    textInput.val('');
    $('.counter').val(140);
    }
  })
  //load tweets on entering page
  $.ajax({
    url: '/tweets',
    method: 'GET',
    })
  .done((tweets) => {
    renderTweets(tweets);
    })
})
