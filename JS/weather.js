export function checkWeather() {
    // Variable declaration
    const apiKey = "4a0a4e2c52efd00bf099f477d93f7ccf";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
    const searchBox = document.querySelector('.search input');
    const searchBtn = document.querySelector('.search button');
    const weatherIcon = document.querySelector('.current-weather-icon img');

    // program to display the date
    // get local machine date time
    function utcTime() {
        const date = new Date();

        // get the date as a string
        const n = date.toDateString();

        // get the time as a string
        const hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();
        const seconds = date.getUTCSeconds();

        // Change time and date in HTML 
        if (minutes < 10 && seconds < 10) {
            document.querySelector('.utc-hour').innerHTML = hours + ":0" + minutes + ":0" + seconds + " UTC";
        }
        else if (minutes > 10 && seconds < 10) {
            document.querySelector('.utc-hour').innerHTML = hours + ":" + minutes + ":0" + seconds + " UTC";
        }
        else if (minutes < 10 && seconds > 10) {
            document.querySelector('.utc-hour').innerHTML = hours + ":0" + minutes + ":" + seconds + " UTC";
        }
        else {
            document.querySelector('.utc-hour').innerHTML = hours + ":" + minutes + ":" + seconds + " UTC";
        }
        document.querySelector('.date').innerHTML = n;
    }
    setInterval(utcTime, 1000);
    // Asynchronous Function
    async function checkWeather(city) {
        // fetching data
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        var data = await response.json();

        // Change tags in weather card
        if (data.name != undefined) {
            document.querySelector('.location p').innerHTML = data.name;
            document.querySelector('.temperature h3').innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector('.temperature p').innerHTML = "Feels like " + Math.round(data.main.feels_like) + "°C";
            document.querySelector('.humidity p').innerHTML = data.main.humidity + "%";
            document.querySelector('.pressure p').innerHTML = data.main.pressure + " hPa";
            document.querySelector('.wind p').innerHTML = data.wind.speed + " km/h";
            document.querySelector('.visibility p').innerHTML = data.visibility / 1000 + " km";
            document.querySelector('.current-weather-icon p').innerHTML = data.weather[0].description;


            // Change weather card's icon
            if(data.weather[0].main == "Clouds") {
                weatherIcon.src = "https://openweathermap.org/img/wn/04d@2x.png";
            }
            else if(data.weather[0].main == "Clear") {
                weatherIcon.src = "https://openweathermap.org/img/wn/01d@2x.png";
            }
            else if(data.weather[0].main == "Rain") {
                weatherIcon.src = "https://openweathermap.org/img/wn/10d@2x.png";
            }
            else if(data.weather[0].main == "Thunderstorm") {
                weatherIcon.src = "https://openweathermap.org/img/wn/11d@2x.png";
            }
            else if(data.weather[0].main == "Drizzle") {
                weatherIcon.src = "https://openweathermap.org/img/wn/09d@2x.png";
            }
            else if(data.weather[0].main == "Snow") {
                weatherIcon.src = "https://openweathermap.org/img/wn/13d@2x.png";
            }
        } else {
            document.querySelector('.location p').innerHTML = data.name;
            document.querySelector('.temperature h3').innerHTML = null + "°C";
            document.querySelector('.temperature p').innerHTML = "Feels like " + null + "°C";
            document.querySelector('.humidity p').innerHTML = null + "%";
            document.querySelector('.pressure p').innerHTML = null + " hPa";
            document.querySelector('.wind p').innerHTML = null + " km/h";
            document.querySelector('.visibility p').innerHTML = null + " km";
            document.querySelector('.current-weather-icon p').innerHTML = undefined;
        }
    }

    // AddEventListener
    searchBtn.addEventListener("click", () => {
        checkWeather(searchBox.value);
    })

}
