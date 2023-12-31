//Today Variables
let today_name           = document.getElementById("today_name")
let today_number         = document.getElementById("today_number")
let today_month          = document.getElementById("today_month")
let today_city           = document.getElementById("today_city")
let today_degree         = document.getElementById("today_degree")
let today_condition      = document.getElementById("today_condition")
let todayConditionImg    = document.getElementById("todayConditionImg")
let humidity             = document.getElementById("humidity")
let wind                 = document.getElementById("wind")
let wind_direction       = document.getElementById("wind_direction")
let searchInput          = document.getElementById("searchInput")


//Tomorrow Variables
let nextDay_name                = document.getElementsByClassName("nextDay_name")
let nextdayConditionImg         = document.getElementsByClassName("nextdayConditionImg")
let next_max_temp               = document.getElementsByClassName("next_max_temp")
let next_min_temp               = document.getElementsByClassName("next_min_temp")
let next_conditionText          = document.getElementsByClassName("next_condition_text")

//fetch API 

async function getWeatherData(cityName)
{
    let weatherResponces = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=afee0db9ed8446cdb91123008232508&q=${cityName}&days=3`)
    let weatherData = await weatherResponces.json()
    return weatherData
    
}

function displayTodayData(data) {
    let todayData = new Date()
    today_name.innerHTML = todayData.toLocaleDateString("en-US",{weekday:"long"})
    today_month.innerHTML = todayData.toLocaleDateString("en-US",{month:"long"})
    today_number.innerHTML = todayData.getDate()
    today_city.innerHTML = data.location.name
    today_degree.innerHTML = data.current.feelslike_c
    todayConditionImg.setAttribute("src",data.current.condition.icon)
    today_condition.innerHTML = data.current.condition.text
    humidity.innerHTML = data.current.humidity + "%"
    wind.innerHTML = data.current.wind_kph + "km/h"
    wind_direction.innerHTML = data.current.wind_dir
    console.log(data);
    
}

function displayNextDay(data)
{
    let nextDayData = data.forecast.forecastday
    console.log(nextDayData);
    console.log(next_conditionText);
    for(let i = 0 ; i < 2 ; i++)
    {
        let nextData = new Date(nextDayData[i+1].date)
        nextDay_name[i].innerHTML  = nextData.toLocaleDateString("en-US",{weekday:"long"})
        next_max_temp[i].innerHTML = nextDayData[i+1].day.maxtemp_c
        next_min_temp[i].innerHTML = nextDayData[i+1].day.mintemp_c
        next_conditionText[i].innerHTML = nextDayData[i+1].day.condition.text
        nextdayConditionImg[i].setAttribute("src",nextDayData[i+1].day.condition.icon) 
    }
}

async function startApp(city="cairo")
{
    let weatherData = await getWeatherData(city)
    if(!weatherData.error){
        displayTodayData(weatherData)
        displayNextDay(weatherData)
    }
    
}

startApp()

searchInput.addEventListener("input" , function() {
    startApp(searchInput.value)
})