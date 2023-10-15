let weatherURL = 'http://api.openweathermap.org/geo/1.0/direct?q={city name}&limit={1}&appid={API key}';
let apiKey = '35c625d915571ffc550721e2286046d0';
let weatherIcons = 'https://openweathermap.org/img/wn/10d@2x.png'
let fiveDay = 'api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}'
let citySearch = [];
let today = dayjs().date();

function dayCurrent() {
        document.getElementById('currentDay').innerHTML = dayjs().format('MM/DD/YYYY');
    };
dayCurrent();

function fiveDayForecast() {
    const newCity = document.getElementById('city-data').addEventListener('click', fiveDayForecast);

fetch(`api.openweathermap.org/data/2.5/forecast?${newCity}+&appid=35c625d915571ffc550721e2286046d0`).then(response => response.json()).then(data => {
   for(i=0; i<5; i++) {
    document.getElementById('five' +(i+1)+"Temp").innerHTML ="Temp:" +Number(data.list[i].main.temp)+"°";
   } 
   for(i=0; i<5; i++) {
    document.getElementById('five' +(i+1)+"Wind").innerHTML ="Wind:" +Number(data.list[i].wind.speed);
   }
   for(i=0; i<5; i++) {
    document.getElementById('card-body-1' +(i+1)+"Humidity").innerHTML ="Humidity:" +Number(data.list[i].main.humidity);
   }
   for(i=0; i<5; i++) {
    document.getElementById("img" +(i+1)).src="https://openweathermap.org/img/wn/10d@2x.png" + data.list[i].weather[0].icon+".png";
   }
})

.catch(err => alert("Error"))
}
fiveDayForecast();

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




