export function checkWeather() {
    // Variable declaration
    const apiKey = "4a0a4e2c52efd00bf099f477d93f7ccf";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
    const searchBox = document.querySelector('.search input');
    const searchBtn = document.querySelector('.search button');
    const weatherIcon = document.querySelector('.current-weather-icon img');
    const utcHourElement = document.querySelector('.utc-hour');

    // Function to get user's location
    function getUserLocation() {
        return new Promise((resolve, reject) => {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        resolve({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        });
                    },
                    (error) => {
                        reject(error);
                    }
                );
            } else {
                reject(new Error("Geolocation is not available"));
            }
        });
    }

    // Function to get location name from coordinates using reverse geocoding
    async function getLocationName(latitude, longitude) {
        const geocodingUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`;
        const response = await fetch(geocodingUrl);
        const data = await response.json();
        if (data.length > 0) {
            return data[0].name;
        } else {
            throw new Error("Invalid location");
        }
    }

    // Function to display local time in different time zones
    function displayLocalTime(timezone) {
        const date = new Date();
        const n = date.toDateString();

        const options = {
            timeZone: timezone,
            hour12: false,
        };
        const formattedTime = date.toLocaleTimeString("en-US", options);
        utcHourElement.innerHTML = formattedTime;

        document.querySelector('.date').innerHTML = n;
    }

    // Asynchronous Function
    async function checkWeather(city) {
        try {
            let locationName;
            let timezone;
            if (city) {
                const weatherUrl = `${apiUrl}${city}&appid=${apiKey}`;
                const response = await fetch(weatherUrl);
                const data = await response.json();

                if (data.cod === 200) {
                    locationName = data.name;
                    timezone = getTimezone(data.timezone);
                    document.querySelector('.location p').innerHTML = locationName;
                    document.querySelector('.temperature h3').innerHTML = Math.round(data.main.temp) + "°C";
                    document.querySelector('.temperature p').innerHTML = "Feels like " + Math.round(data.main.feels_like) + "°C";
                    document.querySelector('.humidity p').innerHTML = data.main.humidity + "%";
                    document.querySelector('.pressure p').innerHTML = data.main.pressure + " hPa";
                    document.querySelector('.wind p').innerHTML = data.wind.speed + " km/h";
                    document.querySelector('.visibility p').innerHTML = data.visibility / 1000 + " km";
                    document.querySelector('.current-weather-icon p').innerHTML = data.weather[0].description;

                    // Change weather card's icon
                    // var iconcode = a.weather[0].icon;
                    // var iconurl = "http://openweathermap.org/img/w/" + iconcode 
                    if (data.weather[0].main == "Clouds") {
                        weatherIcon.src = "https://openweathermap.org/img/wn/04d@2x.png";
                    } else if (data.weather[0].main == "Clear") {
                        weatherIcon.src = "https://openweathermap.org/img/wn/01d@2x.png";
                    } else if (data.weather[0].main == "Rain") {
                        weatherIcon.src = "https://openweathermap.org/img/wn/10d@2x.png";
                    } else if (data.weather[0].main == "Thunderstorm") {
                        weatherIcon.src = "https://openweathermap.org/img/wn/11d@2x.png";
                    } else if (data.weather[0].main == "Drizzle") {
                        weatherIcon.src = "https://openweathermap.org/img/wn/09d@2x.png";
                    } else if (data.weather[0].main == "Snow") {
                        weatherIcon.src = "https://openweathermap.org/img/wn/13d@2x.png";
                    } else if (data.weather[0].main == "Mist") {
                        weatherIcon.src = "https://openweathermap.org/img/wn/13d@2x.png";
                    }
                } else {
                    throw new Error("Invalid location");
                }
            } else {
                const userLocation = await getUserLocation();
                locationName = await getLocationName(userLocation.latitude, userLocation.longitude);

                const weatherUrl = `${apiUrl}${locationName}&appid=${apiKey}`;
                const response = await fetch(weatherUrl);
                const data = await response.json();

                if (data.cod === 200) {
                    timezone = getTimezone(data.timezone);
                    document.querySelector('.location p').innerHTML = locationName;
                    document.querySelector('.temperature h3').innerHTML = Math.round(data.main.temp) + "°C";
                    document.querySelector('.temperature p').innerHTML = "Feels like " + Math.round(data.main.feels_like) + "°C";
                    document.querySelector('.humidity p').innerHTML = data.main.humidity + "%";
                    document.querySelector('.pressure p').innerHTML = data.main.pressure + " hPa";
                    document.querySelector('.wind p').innerHTML = data.wind.speed + " km/h";
                    document.querySelector('.visibility p').innerHTML = data.visibility / 1000 + " km";
                    document.querySelector('.current-weather-icon p').innerHTML = data.weather[0].description;

                    // Change weather card's icon
                    if (data.weather[0].main == "Clouds") {
                        weatherIcon.src = "https://openweathermap.org/img/wn/04d@2x.png";
                    } else if (data.weather[0].main == "Clear") {
                        weatherIcon.src = "https://openweathermap.org/img/wn/01d@2x.png";
                    } else if (data.weather[0].main == "Rain") {
                        weatherIcon.src = "https://openweathermap.org/img/wn/10d@2x.png";
                    } else if (data.weather[0].main == "Thunderstorm") {
                        weatherIcon.src = "https://openweathermap.org/img/wn/11d@2x.png";
                    } else if (data.weather[0].main == "Drizzle") {
                        weatherIcon.src = "https://openweathermap.org/img/wn/09d@2x.png";
                    } else if (data.weather[0].main == "Snow") {
                        weatherIcon.src = "https://openweathermap.org/img/wn/13d@2x.png";
                    }
                }
            }

            displayLocalTime(timezone);
        } catch (error) {
            document.querySelector('.location p').innerHTML = "Invalid location";
            document.querySelector('.temperature h3').innerHTML = null + "°C";
            document.querySelector('.temperature p').innerHTML = "Feels like " + null + "°C";
            document.querySelector('.humidity p').innerHTML = null + "%";
            document.querySelector('.pressure p').innerHTML = null + " hPa";
            document.querySelector('.wind p').innerHTML = null + " km/h";
            document.querySelector('.visibility p').innerHTML = null + " km";
            document.querySelector('.current-weather-icon p').innerHTML = undefined;

            // Show alert for invalid location
            alert("Invalid location. Please enter a valid city name.");
        }
    }

    // Function to get timezone based on timezone offset
    function getTimezone(offset) {
        const timezoneOffsets = {
            "-12": "Etc/GMT+12",
            "-11": "Pacific/Midway",
            "-10": "Pacific/Honolulu",
            "-9": "America/Anchorage",
            "-8": "America/Los_Angeles",
            "-7": "America/Denver",
            "-6": "America/Chicago",
            "-5": "America/New_York",
            "-4": "America/Caracas",
            "-3.5": "America/St_Johns",
            "-3": "America/Argentina/Buenos_Aires",
            "-2": "Atlantic/Azores",
            "-1": "Atlantic/Cape_Verde",
            "0": "Etc/GMT",
            "1": "Europe/Berlin",
            "2": "Europe/Sofia",
            "3": "Europe/Moscow",
            "3.5": "Asia/Tehran",
            "4": "Asia/Dubai",
            "4.5": "Asia/Kabul",
            "5": "Asia/Karachi",
            "5.5": "Asia/Kolkata",
            "5.75": "Asia/Kathmandu",
            "6": "Asia/Dhaka",
            "6.5": "Asia/Rangoon",
            "7": "Asia/Bangkok",
            "8": "Asia/Shanghai",
            "9": "Asia/Tokyo",
            "9.5": "Australia/Darwin",
            "10": "Pacific/Guam",
            "11": "Asia/Magadan",
            "12": "Asia/Kamchatka"
        };

        const timezoneOffset = offset / 3600;
        const timezone = timezoneOffsets[timezoneOffset.toString()];

        return timezone || "UTC";
    }

    // AddEventListener
    searchBtn.addEventListener("click", () => {
        const city = searchBox.value.trim();
        checkWeather(city);
    });

    // Initialize with user's location
    checkWeather();

    // Update local time every second
    setInterval(() => {
        const city = searchBox.value.trim();
        if (!city) {
            checkWeather();
        }
    }, 1000);
}
