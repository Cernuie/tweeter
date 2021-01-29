$(document).ready(function() {
  //selects tweetinput and adds an event listener
  //inits a count and textcount and changes the textcount as 
  //text is added
  //if the character count is over 140, we change the css to red
  document.querySelector(".tweet-input").addEventListener('keyup', (event) => {
    let count = $(".tweet-counter").find(".counter");
    let textCount = $(this).find("#tweet-text").val().length;
    countUpdate = $(count.val((140 - textCount)));

    if (countUpdate.val() < 0) {
      $(count).css({color: 'red'});
    } else {
      $(count).css({color: 'black'});
    }
  })
});

