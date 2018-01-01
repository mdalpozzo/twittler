$(document).ready(function(){
        var $body = $('body');
        var $mainfeed = $('.mainfeed');
        var $friendlist = $('#friendlist');
        var $toolbar = $('.toolbar');
        var $timeline = $('.timeline');



        $.each(streams.users, function(key, element) {
          $friendlist.append("<li class='friend'>@"+key+"</li>");
          $friendlist.find('li:last-child').attr('user', key);
          $friendlist.find('li:last-child').prepend("<img src='images/"+key+".jpg'>")
        });

        var startingTweetCount = streams.home.length;
        //show initial tweets
        var index = streams.home.length - 1;
        while(index >= 0){
          var tweet = streams.home[index];
          var $tweet = $("<div class='tweet'></div>");
          $tweet.append("<p class='tweetUser'>@" + tweet.user + "</p><p class='tweetMessage'>" + tweet.message + "</p><p class='tweetTime'>" + tweet.created_at + "</p>");
          $tweet.appendTo($mainfeed);
          
          index -= 1;
        }

        //update every x seconds to show any new tweets if there are any
        var updateTweets = function() {
          var currentTweetCount = streams.home.length;
          if (currentTweetCount > startingTweetCount) {
            for (var i = startingTweetCount; i < currentTweetCount; i++) {
              var tweet = streams.home[i];
              var $tweet = $("<div class='tweet'></div>");
              $tweet.append("<p class='tweetUser'>@" + tweet.user + "</p><p class='tweetMessage'>" + tweet.message + "</p><p class='tweetTime'>" + tweet.created_at + "</p>");
              $('#tweetIn').after($tweet);
            }
          }

          
          //hide old tweets at bottom of feed
          //if current tweet count is > n, remove last n number of <p> in main feed
          /*
          if (currentTweetCount > 13) {
            var surplusTweetCount = currentTweetCount - 13;
            for (var i = 0; i < surplusTweetCount; i++) {
              $('.mainfeed:last-child').hide();
            }
          }
          */

          //reset starting TweetCount
          startingTweetCount = currentTweetCount;
        }

        setInterval(updateTweets, 1000);

        //show timeline of friend when name is clicked (to do: show number of total tweets)
        $friendlist.on('click', '.friend', function() {
          if ($timeline.is(":hidden")) {
            var user = $(this).attr('user');
            var tweets = streams.users[user];
            $timeline.text('');
            for (var i = 0; i < tweets.length; i++) {
              var $tweet = $("<div class='tweet'></div>");
              $tweet.append("<p class='message'>@" + tweets[i].user + ": " + tweets[i].message + "</p><p class='postTime'>" + tweets[i].created_at + "</p>");
              $tweet.prependTo($timeline);
            }
            $timeline.show();
          }
        });

        $(document).mouseup(function(e) {
          var container = $timeline;

    // if the target of the click isn't the container nor a descendant of the container
          if (!container.is(e.target) && container.has(e.target).length === 0) {
            container.hide();
          }
        });

      });