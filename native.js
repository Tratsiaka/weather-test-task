window.addEventListener('load', () => {

    var lati, longi;

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
            lati = position.coords.latitude;
            longi = position.coords.longitude;
            getWeather(lati, longi);

        });
    } else {
        alert('Геолокация не доступна');
    }

    var button = document.querySelector('#weather-button');
    button.addEventListener('click', () => {
        let custLat = document.querySelector('#lat').value;
        let custLon = document.querySelector('#lon').value;

        getWeather(custLat, custLon);
    });

    function getWeather(lat, lon) {
        fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=2e54b5823b0b1e58133d56faba348d2e`)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                let output = `<div class = "weather-widget__icon" > 
                <img class = "weather-widget__img" src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
                </div>
                <div class="weather-widget__params">
                <p>Температура: <b>${Math.round(data.main.temp - 273)} &#176;C</b></p>
                <p>Влажность: <b>${data.main.humidity} %</b></p>
                <p>Давление: <b>${Math.round(data.main.pressure * 0.0075 * 100)} мм.рт.ст.</b></p>
                <p>Скорость ветра: <b>${data.wind.speed} м/с</b></p>
                </div>`;
                document.querySelector('.weather-widget__output').innerHTML = output;
            });
    }
});