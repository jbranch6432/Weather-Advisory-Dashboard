
let weatherURL = 'http://api.openweathermap.org/geo/1.0/direct?q={city name}&limit=1&appid={API key}';
let apiKey = '35c625d915571ffc550721e2286046d0';
let today = dayjs().date();
let newCity = document.getElementById("city-name");
const searchButton = document.getElementById('city-search-button');


searchButton.addEventListener ("click", function(event) {
    var newSearch = newCity.value.trim();

    getApi(newSearch, false);
    console.log("submit clicked");


});


function displayButtonInDom(city) {

  const button = document.createElement("button"); 
  button.setAttribute('id', city)
  button.innerHTML = city;
  button.addEventListener('click', callHistory);
  const historyDiv = document.getElementById("search-history");
  historyDiv.appendChild(button);
}


function callHistory() {
 const city = this.id;
getApi(city, true);
}

function dayCurrent() {
        document.getElementById('current-date').innerHTML = dayjs().format('MM/DD/YYYY');
    };
dayCurrent();

function displayWeather(data) {
   
    const currentDiv = document.getElementById('currentDay');

    const container = document.createElement('div');
    container.innerHTML = (data.name);
    const icon = document.getElementById('weather-icon');
    icon.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    container.appendChild(icon);
    currentDiv.appendChild(container);


    const windDiv = document.getElementById('wind');

    const container2 = document.createElement('div');
    container2.innerHTML = ("Wind: ", data.wind.speed);
    windDiv.appendChild(container2);

    const tempDiv = document.getElementById('temp');

    const container3 = document.createElement('div');
    container3.innerHTML = (data.main.temp + "°F");
    tempDiv.appendChild(container3);

    const humidDiv = document.getElementById('humid');
    
    const container4 = document.createElement('div');
    container4.innerHTML = (data.main.humidity);
    humidDiv.appendChild(container4);

}


function getApi(city, fromHistory) {
    var requestUrl2 = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;
    fetch(requestUrl2)
        .then((response) =>{

            if(response.ok) {
                return response.json();
            }else {
                throw new Error("Unable to retrieve data");
            }
        })
        .then(data => {
            fiveDay(data.coord.lat, data.coord.lon);
            displayWeather(data);
            if(!fromHistory) {
                let cityStored = JSON.parse(localStorage.getItem('city')) || [];
                cityStored.push(data.name);
                localStorage.setItem('city', JSON.stringify(cityStored));
                displayButtonInDom(data.name);
            }
            
        })

        .catch((error) => console.error("Fetch error:", error));
}

function fiveDay(lat, lon) {

    const fiveDayUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`; 

    fetch(fiveDayUrl).then(response => response.json()).then(data => {
        console.log(data);
       for(i=0; i<data.list.length; i+=8) {
        document.getElementById('date-' +(i/8 +1)).innerHTML =(data.list[i].dt_txt);
        document.getElementById('temp-' +(i/8 +1)).innerHTML =("Temp: " + data.list[i].main.temp + "°F");
        document.getElementById('wind-' +(i/8 +1)).innerHTML =("Wind: " + data.list[i].wind.speed + "MPH");
        document.getElementById('humid-' +(i/8 +1)).innerHTML =("Humidity: " + data.list[i].main.humidity + "%");
        document.getElementById('icon-' +(i/8 +1)).src=`https://openweathermap.org/img/wn/${data.list[i].weather.icon}@2x.png` + data.list[i].weather[0].icon +".png";
       } 
   
    });
   
};
