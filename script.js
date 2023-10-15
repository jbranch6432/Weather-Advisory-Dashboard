let weatherURL = 'http://api.openweathermap.org/geo/1.0/direct?q={city name}&limit={1}&appid={API key}';
let apiKey = '35c625d915571ffc550721e2286046d0';
let weatherIcons = 'https://openweathermap.org/img/wn/10d@2x.png'
let fiveDay = 'api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}'
let citySearch = [];
let today = dayjs().date();
let newCity = document.getElementById("city-name");
const searchButton = document.getElementById('city-search-button');


searchButton.addEventListener ("click", function(event) {
    // Calls function that gets API request
    //saves city search to localStorage
    var newSearch = newCity.value.trim();

    //parse the data from localStorage, if no data it will return an empty array
    var cityList = JSON.parse(localStorage.getItem("city")) || [];

    //add city to array
    cityList.push(newSearch);

    //save city array as a string
    localStorage.setItem("city", JSON.stringify(cityList));

    //display localStorage  
document.getElementById('city-search-button').value = window.localStorage['display'];

    getApi();
    console.log("submit clicked");
});
let cityStored = JSON.parse(localStorage.getItem('city')) || [];

for (var i=0; i<cityStored.length; i++) {
    var city = cityStored[i];
    var cityButton = document.createElement('button');
    cityButton.innerHTML = city;
    document.getElementById('buttonlinks').appendChild(cityButton);
}
// // //save City search to localStorage
// let buttonsLength = 0;

// document.getElementById('city-list-button').addEventListener('click', function () {
//    createButton();
//    buttonsLength++;
//    localStorage.setItem('buttonsLength', buttonsLength)
//  });

//  function createButton() {
//    var button = document.createElement('button');
//    button.innerHTML = 'click me';
//    document.getElementById('buttonlinks').appendChild(button);
//  }

//  window.addEventListener('load', (event) => {
//    buttonsLength = Number(localStorage.getItem('buttonsLength')) || 0;
//    for (let i = 0; i < buttonsLength; i++) {
//      createButton();
//    }
// });

const showlinks = document.getElementById('city-list-button')

showlinks.addEventListener("click", function () {
  localStorage.setItem("showClicked", true)
  displayButtonInDom()
})

function displayButtonInDom() {
  const showClicked = localStorage.getItem("showClicked")
  if (showClicked) {
  const button = document.createElement("button"); 
  button.innerText = "click me"
  document.getElementById("buttonlinks").appendChild(button);
  }
}
displayButtonInDom();




function dayCurrent() {
        document.getElementById('currentDay').innerHTML = dayjs().format('MM/DD/YYYY');
    };
dayCurrent();

function getApi() {
    var cityName = newCity.value.trim();
    var requestUrl2 = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + "&units=imperial&appid=" + apiKey;
fetch(requestUrl2).then(response => response.json()).then(data => {
    console.log(data)
   for(i=0; i<5; i++) {
    document.getElementById('five' +(i+1)+"Temp").innerHTML ="Temp:" + Number(data.list[i].main.temp)+"°";
   } 
   for(i=0; i<5; i++) {
    document.getElementById('five' +(i+1)+"Wind").innerHTML ="Wind:" + Number(data.list[i].wind.speed);
   }
   for(i=0; i<5; i++) {
    document.getElementById('card-body-1' +(i+1)+"Humidity").innerHTML ="Humidity:" + Number(data.list[i].main.humidity);
   }
   for(i=0; i<5; i++) {
    document.getElementById("img" +(i+1)).src="https://openweathermap.org/img/wn/10d@2x.png" + data.list[i].weather[0].icon +".png";
   }
})

.catch()
}
getApi();

const day =new Date();
const daysWeek =["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function dateCheck(day){
    if(day +dateCheck.getDay() > 6){
        return day +dateCheck.getDay()-7;
    }
    else{
return day +dateCheck.getDay();
    }
}

for(i=0; i<5; i++){
    document.getElementById('five'+(i+1)).innerHTML = daysWeek[dateCheck[i]];
}




dateCheck();