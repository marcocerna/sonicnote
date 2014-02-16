
jQuery.ajaxSettings.traditional = true;

var apiKey = 'A5WKJ2QGNWHMGJN8Q';
var genre = 'rock';
var songs = [];
var url = "http://developer.echonest.com/api/v4/artist/top_hottt?api_key=" + apiKey;
var status = false;

function formatSongs(data) {
  _(data.response.songs).each(function(song) {
    var thisSong = {
      'song_title': song.title,
      'artist': song.artist_name,
      'preview_url': song.tracks[0].preview_url,
      'artwork': song.tracks[0].release_image,
      'genre': genre
    };
    songs.push(thisSong);
    songs = _.uniq(songs);
  });
};

function getSongs(artistId) {
  var url = "http://developer.echonest.com/api/v4/song/search?api_key=" + apiKey;
  $.getJSON(url,
    {'artist_id': artistId,
    'format':'json',
    'bucket': ['id:7digital-US', 'tracks'],
    'limit' : true,
    'results': 4 },
    function(data) {
      formatSongs(data);
      songs = _.shuffle(songs);
      if(songs.length > 0) {
        if($('#cover1').attr('src') !== '') {
          return;
        } else {
          var song = songs.shift();
          $('#cover1').attr('src', song.artwork);
          $('#song').attr('src', song.preview_url);
          $('#title1').text(song.song_title);
          $('#band1').text(song.artist);
          $('.mainBanner').animate({'opacity':'1'});
        }
      }
    }
  );
};

var swipeRight = function(song1, song2, cover, title, band) {
  status = true;
  if(songs.length > 0) {
    var song = songs.shift();
    if(song2.css('left', '320px')) {
      song2.css('left', '-320px');
    }
    cover.attr('src', song.artwork);
    $('#song').attr('src', song.preview_url);
    title.text(song.song_title);
    band.text(song.artist);
    if(status) {
      $('.play').css('opacity','0');
      $('.play').css('display','none');
      $('.pause').css('opacity','1');
      $('.pause').css('display','inline-block');
      $('#song')[0].play();
    }
    song1.animate({'left': '320'});
    song2.animate({'left': '0'});
  };
};

var swipeLeft = function(song1, song2, cover, title, band) {
  status = true;
  if(songs.length > 0) {
    var song = songs.shift();
    if(song2.css('left', '-320px')) {
      song2.css('left', '320px');
    }
    cover.attr('src', song.artwork);
    $('#song').attr('src', song.preview_url);
    title.text(song.song_title);
    band.text(song.artist);
    if(status) {
      $('.play').css('opacity','0');
      $('.play').css('display','none');
      $('.pause').css('opacity','1');
      $('.pause').css('display','inline-block');
      $('#song')[0].play();
    }
    song1.animate({'left': '-320'});
    song2.animate({'left': '0'});

  }
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
    } else if($(this).hasClass('login')) {
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
    swipeRight($('.song1'), $('.song2'), $('#cover2'), $('#title2'), $('#band2'));
  });

  $('.song2').on('swiperight', function() {
    swipeRight($('.song2'), $('.song1'), $('#cover1'), $('#title1'), $('#band1'));
  });

  $('.song1').on('swipeleft', function() {
    swipeLeft($('.song1'), $('.song2'), $('#cover2'), $('#title2'), $('#band2'));
  });

  $('.song2').on('swipeleft', function() {
    swipeLeft($('.song2'), $('.song1'), $('#cover1'), $('#title1'), $('#band1'));
  });

  $('.genreWindow').on('swiperight', function() {
    $(this).animate({'right': -($(this).width())});
  });

  $('.category').on('click', function() {

      genre = $(this).val();
      $.getJSON(url,
        {'genre': genre, 'format':'json', 'results': 10 },
        function(data) {
          _(data.response.artists).each(function(el) {
            getSongs(el.id);

        });
      });

  });

});
