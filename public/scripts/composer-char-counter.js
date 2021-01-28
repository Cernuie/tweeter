$(document).ready(function() {
  // --- our code goes here ---
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

