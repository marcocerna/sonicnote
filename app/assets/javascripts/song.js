
// test.play();

var swipeRight = function(song1, song2) {
  if(song2.css('left', '320px')) {
    song2.css('left', '-320px');
  }
  song1.animate({'left': '320'});
  song2.animate({'left': '0'});
};

var swipeLeft = function(song1, song2) {
  if(song2.css('left', '-320px')) {
    song2.css('left', '320px');
  }
  song1.animate({'left': '-320'});
  song2.animate({'left': '0'});
};

$(function() {
  // $('.homePage').css('height', $(window).height());
  // $('.loginPage').css('height', $(window).height());
  // $('.songPage').css('height', $(window).height());
  // $('.genreWindow').css('bottom', -($('.genreWindow').height()));

  $('.homeNavButton').on('click', function() {
    if($(this).hasClass('explore')) {
      $('.homePage').animate({'opacity':'0'}, {'complete': function() {
        $('.homePage').css('display', 'none');
        $('.songPage').css('display', 'block');
        $('.songPage').animate({'opacity':'1'});
      }});
    }
  });

  $('.homeNavButton').on('click', function() {
    if($(this).hasClass('login')) {
      $('.homePage').animate({'opacity':'0'}, {'complete': function() {
        $('.homePage').css('display', 'none');
        $('.loginPage').css('display', 'block');
        $('.loginPage').animate({'opacity':'1'});
      }});
    }
  });

  $('.play').on('click', function() {
    $('#song')[0].play();
    $(this).animate({'opacity':'0'}, {'complete': function() {
        $(this).css('display', 'none');
        $(this).next().css('display', 'inline-block');
        $(this).next().animate({'opacity':'1'});
      }
    });
  });

  $('.pause').on('click', function() {
    $('#song')[0].pause();
    $(this).animate({'opacity':'0'}, {'complete': function() {
        $(this).css('display', 'none');
        $(this).prev().css('display', 'inline-block');
        $(this).prev().animate({'opacity':'1'});
      }
    });
  });

  $('.upArrow').on('click', function() {
    $('.genreWindow').animate({'bottom': '0'});
  });

  $('.song1').on('swiperight', function() {
    swipeRight($('.song1'), $('.song2'));
  });

  $('.song2').on('swiperight', function() {
    swipeRight($('.song2'), $('.song1'));
  });

  $('.song1').on('swipeleft', function() {
    swipeLeft($('.song1'), $('.song2'));
  });

  $('.song2').on('swipeleft', function() {
    swipeLeft($('.song2'), $('.song1'));
  });

  $('.genreWindow').on('swiperight', function() {
    $(this).animate({'right': -($(this).width())});
  });


  // $('#demo').play();
});