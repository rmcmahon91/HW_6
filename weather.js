

$("#cityBtn").on('click', function () {
    var cityName = $("#city").val()
    var queryUrl = "https://api.openweathermap.org/data/2.5/weather?appid=e0d9c81b0bba874f62ffa1a9597ae520&q=" + cityName

    $.ajax({
        url: queryUrl,
        method: "GET"
    })

        .then(function (response) {

            console.log(response)

            var h3 = $("<h3>")
            var currentDate = moment(response.dt, "X").format("MM/DD/YYYY")
            currentDate = " (" + currentDate + ")"
            var img = $("<img>")
            img.attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png")
            h3.append(response.name, currentDate, img)

            var p = $("<p>")
            var temp = ((response.main.temp - 273.15) * 1.8) + 32
            temp = "Temperature: " + Math.round(temp) + " F"

            p.append(temp)

            var p2 = $("<p>")
            var humidity = (response.main.humidity)
            humidity = "Humidity " + humidity
            p2.append(humidity)

            var p3 = $("<p>")
            var wind = (response.wind.speed)
            wind = "Wind Speed: " + wind
            p3.append(wind)


            var lat = (response.coord.lat)
            var lon = (response.coord.lon)
            $.ajax({
                url: "http://api.openweathermap.org/data/2.5/uvi?appid=e0d9c81b0bba874f62ffa1a9597ae520&lat=" + lat + "&lon=" + lon,
                method: "GET"
            }).then(function (response2) {

                console.log(response2)

                var p4 = $("<p>")
                var uvIndex = (response2.value)
                uvIndex = "UV Index " + uvIndex
                p4.append(uvIndex)
                $("#dashBoard").append(h3, p, p2, p3, p4)


                $.ajax({
                    url: "http://api.openweathermap.org/data/2.5/forecast?appid=e0d9c81b0bba874f62ffa1a9597ae520&q=" + cityName,
                    method: "GET"

                }).then(function (response3) {
                    console.log(response3)
                    var row = $("<div class='row'>")
                    for (let index = 0; index < response3.list.length; index++) {    //indexof search for positon of the string search
                        if (response3.list[index].dt_txt.indexOf("00:00:00") > -1) {
                            var column = $("<div class= 'col-sm-2'>")
                            var h4 = $("<h4>")

                            var date = moment(response3.list[index].dt, "X").format("MM/DD/YYYY")
                            h4.append(date)
                            column.append(h4)
                            row.append(column)
                        }
                        
                        
                        $("#fiveDays").append(row)

                    }
                })
            })

        })
})


