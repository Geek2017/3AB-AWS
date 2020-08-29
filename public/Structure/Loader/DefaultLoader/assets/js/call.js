new jmbotdetector({
    timeout: 5000,
    callback: function(result) {

        console.log('result:', result.tests)

        $.getJSON("./assets/js/data.json", function(data) {
            console.log(data.bot);
            console.log(data.human);

            var human = data.human;
            var bot = data.bot;


            var currentUrl = window.location.hostname;

            console.log(currentUrl);

            var today = new Date();

            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

            var datetime = today + '/' + time;

            if (result.cases.mousemove) {

                var myData = JSON.stringify({

                    "datetime": datetime,
                    "url": currentUrl,
                    "events": result.cases

                });
                console.log(myData);
                $.ajax({
                    type: "POST",
                    dataType: "json",
                    url: "https://pq38i6wtd4.execute-api.ap-southeast-1.amazonaws.com/verkoapi/human/{id}",
                    data: myData,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    success: function(data) {
                        console.log(data);
                    },
                    error: function(error) {
                        console.log(error);
                    }
                });

                setTimeout(function() {

                    console.log('MOUSEMOVE', result.cases.mousemove)

                    localStorage.setItem('adsurl', human)

                    $(window).attr('location', human)
                }, 3000);

                console.log('MOUSEMOVE', result.cases.mousemove)

                $('#loader').hide();

                $("#preloader").replaceWith("<div class='second-row'><iframe src='" + human + "'></iframe></div>");
            } else {

                var myData = JSON.stringify({

                    "datetime": datetime,
                    "url": currentUrl,
                    "events": result.cases

                });
                console.log(myData);
                $.ajax({
                    type: "POST",
                    dataType: "json",
                    url: "https://pq38i6wtd4.execute-api.ap-southeast-1.amazonaws.com/verkoapi/bot/{id}",
                    data: myData,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    success: function(data) {
                        console.log(data);
                    },
                    error: function(error) {
                        console.log(error);
                    }
                });

                $("#preloader").replaceWith("<div class='second-row'><iframe src='" + bot + "'></iframe></div>");
            }
        })

    }
}).monitor();