//TODO: Data continues to load instead of replacing current data, icon won't load 

let weatherURL = 'http://api.openweathermap.org/geo/1.0/direct?q={city name}&limit=1&appid={API key}';
let apiKey = '35c625d915571ffc550721e2286046d0';
// let weatherIcons = 'https://openweathermap.org/img/wn/{icon}@2x.png'
let citySearch = [];
let today = dayjs().date();
let newCity = document.getElementById("city-name");
const searchButton = document.getElementById('city-search-button');


searchButton.addEventListener ("click", function(event) {
    // Calls function that gets API request
    //saves city search to localStorage
    var newSearch = newCity.value.trim();

    //parse the data from localStorage, if no data it will return an empty array
    // var cityList = JSON.parse(localStorage.getItem("city")) || [];

    // //add city to array
    // cityList.push(newSearch);

    // //save city array as a string
    // localStorage.setItem("city", JSON.stringify(cityList));

    //display localStorage  
// document.getElementById('city-search-button').value = window.localStorage['display'];

    getApi(newSearch);
    console.log("submit clicked");
    // let cityStored = JSON.parse(localStorage.getItem('city')) || [];

// for (var i=0; i<cityStored.length; i++) {
//     var city = cityStored[i];
//     console.log(city);
//     var cityButton = document.createElement('button');
//     cityButton.innerHTML = city;
//     document.getElementById('buttonlinks').appendChild(cityButton);

});

const showlinks = document.getElementById
('city-search-button');

showlinks.addEventListener("click", function () {
  localStorage.setItem("showClicked", true)
  displayButtonInDom()
})

function displayButtonInDom() {
  const showClicked = localStorage.getItem("showClicked")
  if (showClicked) {
  const button = document.createElement("button"); 
  button.innerHTML = newCity;
  document.getElementById("history").appendChild(button);
  }
}
displayButtonInDom();


function dayCurrent() {
        document.getElementById('currentDay').innerHTML = dayjs().format('MM/DD/YYYY');
    };
dayCurrent();

function displayWeather(data) {
    console.log(data, "What data");
   
    // var cityList = JSON.parse(localStorage.getItem("city")) || [];

    //add city to array
    // cityList.push(data.name);

    //save city array as a string
    // localStorage.setItem('city', JSON.stringify(cityList));
    // for (var i=0; i<=cityList.length; i++) {
    //     var city = cityList[i];
    //     console.log('city: ', city);
    //     var cityButton = document.createElement('button');
    //     cityButton.innerHTML = city;
    //     cityButton.setAttribute("id", city);
    //     document.getElementById("history").appendChild(cityButton);
    // }
    // const currentForecast = data.main;
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


function getApi(city) {
    var requestUrl2 = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;
    console.log(city, "The city");
    fetch(requestUrl2)
        .then((response) =>{
            if(response.ok) {
                return response.json();
            }else {
                throw new Error("Unable to retrieve data");
            }
        })
        .then(data => {
            fiveDay(data.city.coord.lat, data.city.coord.lon);
            displayWeather(data);
        })

        .catch((error) => console.error("Fetch error:", error));
}

function fiveDay(lat, lon) {
    const fiveDayUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`; 
    fetch(fiveDayUrl).then(response => response.json()).then(data => {
        console.log(data, "what's here");
       for(i=0; i<5; i++) {
        document.getElementById('Day-1' +(i+1)+"Temp").innerHTML =("Temp:" + data.list[0].main.temp + "°");
       } 
       for(i=0; i<5; i++) {
        document.getElementById('five' +(i+1)+"Wind").innerHTML ="Wind:" + Number(data.list[1].wind.speed);
        document.getElementById('card-body-1' +(i+1)+"Humidity").innerHTML ="Humidity:" + Number(data.list[i].main.humidity);
        document.getElementById("img" +(i+1)).src=`https://openweathermap.org/img/wn/${data.list[0].weather.icon}@2x.png` + data.list[i].weather[0].icon +".png";
       }
    });
   
};
fiveDay();




// .catch()
// }
// getApi();

// displayWeather();

// const day =new Date();
// const daysWeek =["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// function dateCheck(day){
//     if(day +dateCheck.getDay() > 6){
//         return day +dateCheck.getDay()-7;
//     }
//     else{
// return day +dateCheck.getDay();
//     }
// }

// for(i=0; i<5; i++){
//     document.getElementById('five'+(i+1)).innerHTML = daysWeek[dateCheck[i]];
// }




// dateCheck();