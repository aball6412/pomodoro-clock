$(document).ready(function() {
    
    var breaktime = Number($(".breakval").text());
    var timertime = Number($(".timerval").text());
    time = Number($(".timerval").text());
    var play = "not playing";
    var clicks = "active";
    var reset = "no";
    var session = "session";



    $(".breakval").on("click", ".minusbreak", function() {
      if (clicks === "active") {
          if (breaktime !== 1) {
              breaktime = breaktime - 1;
              $(".breakval").html("<span class='glyphicon glyphicon-minus minusbreak'></span> " + breaktime + " <span class='glyphicon glyphicon-plus plusbreak'></span>");
          }
      }
    })

    $(".breakval").on("click", ".plusbreak", function() {
      if (clicks === "active") {
         if(breaktime !== 99) { 
             breaktime = breaktime + 1;
             $(".breakval").html("<span class='glyphicon glyphicon-minus minusbreak'></span> " + breaktime + " <span class='glyphicon glyphicon-plus plusbreak'></span>");
         }
      }
    })

    $(".timerval").on("click", ".minustime", function() {
      if (clicks === "active") {

            if (timertime !== 1) {
                timertime = timertime - 1;
                $(".timerval").html("<span class='glyphicon glyphicon-minus minustime'></span> " + timertime + " <span class='glyphicon glyphicon-plus plustime'></span>");
                if (timertime >= 10) {
                  $(".clocktime").html("<class='text-center clocktime'>" + timertime + ":00</h1>");
                }
                if (timertime < 10) {
                  $(".clocktime").html("<class='text-center clocktime'>0" + timertime + ":00</h1>");
                }
            }
      }
    })

    $(".timerval").on("click", ".plustime", function() {
      if (clicks === "active") {
        if (timertime !== 99) {
            timertime = timertime + 1;
            $(".timerval").html("<span class='glyphicon glyphicon-minus minustime'></span> " + timertime + " <span class='glyphicon glyphicon-plus plustime'></span>");

            if (timertime >= 10) {
                  $(".clocktime").html("<class='text-center clocktime'>" + timertime + ":00</h1>");
                }
            if (timertime < 10) {
                  $(".clocktime").html("<class='text-center clocktime'>0" + timertime + ":00</h1>");
                }
        }
      }
    })


    function timer (duration) {
      var start = Date.now();
      var datesec = start/1000;
      var datemin = datesec/60;
      datesec = Math.round(datesec);
      var output = datesec + (duration);
      var play = play;


          function display () {
            start = Date.now();
            datesec = Math.round(start/1000);
            datemin = datesec/60;
            diff = output - datesec;

            if (diff <= 0) {
              $(".clocktime").html("00:00");
              if(session == "session") {
                  duration = Number($(".breakval").text());
                  $(".title").html("Break");
                  clearInterval(clear);
                  timer(duration*60);
                  var notification = new Audio("https://www.myinstants.com/media/sounds/lbpnotification.mp3");
                  notification.play();
                  session = "break";
              }
              else if (session == "break") {
                duration = Number($(".timerval").text());
                $(".title").html("Session");
                clearInterval(clear);
                timer(duration*60);
                var notification = new Audio("https://www.myinstants.com/media/sounds/lbpnotification.mp3");
                notification.play();
                session = "session";
              }
            }
            else if (diff % 60 === 0) {
              datemin = diff/60;
                  if (datemin < 10) {
                    $(".clocktime").html("0" + datemin + ":00");
                  }
                  else{
                    $(".clocktime").html(datemin + ":00");
                  }
            }
            else {
                  datemin = Math.floor(diff/60);
                  var remainder = diff % 60;

                  if (remainder < 10 && datemin < 10) {
                    $(".clocktime").html("0" + datemin + ":" + "0" + remainder);
                  }
                  else if (remainder < 10 && datemin >= 10) {
                    $(".clocktime").html(datemin + ":" + "0" + remainder);
                  }
                  else if (remainder >= 10 && datemin < 10) {
                    $(".clocktime").html("0" + datemin + ":" + remainder);
                  }
                  else {
                  $(".clocktime").html(datemin + ":" + remainder);
                  }

            }
          }

          display();
          var clear = setInterval(display, 1000);

          $(".pause").one("click", function() {
            clearInterval(clear);
            clicks = "active";
            reset = "yes";
            $(".pause").html("<span class='glyphicon glyphicon-repeat pausebutton'></span></h3>");
          })

    }




    $(".countdown").click(function() {
      if (clicks === "active") {
            var duration = $(".clocktime").text();
            var check = duration.slice(3);

            if (check === "00") {
              duration = (Number(duration.slice(0,2) * 60));
            }
            else {
              duration = Number((duration.slice(0,2) * 60) + Number(duration.slice(3)));
            }

              $(".pause").html("<span class='glyphicon glyphicon-pause pausebutton'></span>");

            timer(duration, play);

      }

      clicks = "inactive";
      reset = "no";
    });


    $(".pause").on("click", function() {
            clicks = "active";
            if (reset === "yes") {
                breaktime = Number($(".breakval").text());
                timertime = Number($(".timerval").text());
                reset = "no";
                if (timertime < 10) {
                  $(".title").html("Session");
                  $(".clocktime").html("0" + timertime + ":00");
                  session = "session";
                }
                else {
                  $(".title").html("Session");
                  $(".clocktime").html(timertime + ":00");
                  session = "session";
                }
            }

          })


    $(".breakval").on("mouseenter", ".minusbreak", function() {
        $(".minusbreak").css("color", "#FFFFFF");
    })
    $(".breakval").on("mouseleave", ".minusbreak", function() {
        $(".minusbreak").css("color", "#9795B8");
    })


    $(".breakval").on("mouseenter", ".plusbreak", function() {
        $(".plusbreak").css("color", "#FFFFFF");
    })
    $(".breakval").on("mouseleave", ".plusbreak", function() {
        $(".plusbreak").css("color", "#9795B8");
    })


    $(".timerval").on("mouseenter", ".minustime", function() {
        $(".minustime").css("color", "#FFFFFF");
    })
    $(".timerval").on("mouseleave", ".minustime", function() {
        $(".minustime").css("color", "#9795B8");
    })


    $(".timerval").on("mouseenter", ".plustime", function() {
        $(".plustime").css("color", "#FFFFFF");
    })
    $(".timerval").on("mouseleave", ".plustime", function() {
        $(".plustime").css("color", "#9795B8");
    })


    $(".countdown").on("mouseenter", ".playbutton", function() {
        $(".playbutton").css("color", "#FFFFFF");
    })
    $(".countdown").on("mouseleave", ".playbutton", function() {
        $(".playbutton").css("color", "#9795B8");
    })


    $(".pause").on("mouseenter", ".pausebutton", function() {
        $(".pausebutton").css("color", "#FFFFFF");
    })
    $(".pause").on("mouseleave", ".pausebutton", function() {
        $(".pausebutton").css("color", "#9795B8");
    })




    
    
    
    
});