var response = document.getElementById("response");
var city = document.getElementById("city");
var cloudCoverage = document.getElementById("cloudCoverage");
var conditionsDescription = document.getElementById("conditionsDescription");
var icon = document.getElementById("icon");
var temp = document.getElementById("temp");
var wind = document.getElementById("wind");
var vid = document.getElementById("bgvid");
var cf = "C";
var xhr = new XMLHttpRequest();
var key = "49053df2a73594c121e946ca0957ae47";

var defaultBounds = new google.maps.LatLngBounds(
  new google.maps.LatLng(-90,-180),
  new google.maps.LatLng(90,180));

var input = document.getElementById('manualLocate');
var options = {
  bounds: defaultBounds,
  types: ['(regions)']
};

Area = new google.maps.places.Autocomplete(input, options);

document.onload = getLocation();

function getLocation() {
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(callOnPosition, showError);
} else { 
  response.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function callOnPosition(position) {
getData(position.coords.latitude,position.coords.longitude);
}

function callOnManual() {
var place = Area.getPlace();
getData(place.geometry.location.lat(),place.geometry.location.lng());
}

function getData(lat, long) {
xhr.open("GET", "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=" + key + "&units=metric", false);
xhr.send();
weatherObj = JSON.parse(xhr.response);
setBackground(weatherObj.weather[0].main,weatherObj.weather[0].icon,weatherObj.weather[0].id);
city.innerHTML = weatherObj.name + ", " + weatherObj.sys.country;
conditionsDescription.innerHTML = capitalise(weatherObj.weather[0].description);
cloudCoverage.innerHTML = weatherObj.clouds.all + "% Cloud Coverage";
icon.src = "http://openweathermap.org/img/w/" + weatherObj.weather[0].icon + ".png";
icon.innerHTML = weatherObj.weather[0].icon;
temp.innerHTML = weatherObj.main.temp.toFixed(2) + " " + String.fromCharCode(176) + cf;
wind.innerHTML = Math.round(weatherObj.wind.speed * 223.694) / 100 + " mph, " + calculateBearing(weatherObj.wind.deg);
//alert(JSON.stringify(weatherObj));
}

function capitalise(str) {
var caps = str.match(/\b[a-z]/g);
var split = str.split(" ");
var capitalised = [];
  for (w=0;w<split.length;w++) {
    capitalised.push(split[w].replace(/\b[a-z]/g, caps[w].toUpperCase()));
  };
return capitalised.join(" ");
}

function calculateBearing(degrees) {
if (!degrees) {return "Direction not available"};
  if (degrees >= 354.38) {return "North (N)"}
  else if (degrees >= 0.00 && degrees <= 5.62) {return "North (N)"}
  else if (degrees >= 5.63 && degrees <= 16.87) {return "North by East (NbE)"}
  else if (degrees >= 16.88 && degrees <= 28.12) {return "North-northeast (NNE)"}
  else if (degrees >= 28.13 && degrees <= 39.37) {return "Northeast by North (NEbN)"}
  else if (degrees >= 28.13 && degrees <= 39.37) {return "Northeast by North (NEbN)"}
  else if (degrees >= 39.38 && degrees <= 50.62) {return "Northeast (NE)"}  
  else if (degrees >= 50.63 && degrees <= 61.87) {return "Northeast by East (NEbE)"}  
  else if (degrees >= 61.88 && degrees <= 73.12) {return "East-northeast (ENE)"}    
  else if (degrees >= 73.13 && degrees <= 84.37) {return "East by North (EbN)"}
  else if (degrees >= 84.38 && degrees <= 95.62) {return "East (E)"}   
  else if (degrees >= 95.63 && degrees <= 106.87) {return "East by South (EbS)"}   
  else if (degrees >= 106.88 && degrees <= 118.12) {return "East-southeast (ESE)"}   
  else if (degrees >= 118.13 && degrees <= 129.37) {return "Southeast by East (SEbE)"}   
  else if (degrees >= 129.38 && degrees <= 140.62) {return "Southeast (SE)"}
  else if (degrees >= 140.63 && degrees <= 151.87) {return "Southeast by South (SEbS)"} 
  else if (degrees >= 151.88 && degrees <= 163.12) {return "South-southeast (SSE)"} 
  else if (degrees >= 163.13 && degrees <= 174.37) {return "South by East (SbE)"} 
  else if (degrees >= 174.38 && degrees <= 185.62) {return "South (S)"} 
  else if (degrees >= 185.63 && degrees <= 196.87) {return "South by West (SbW)"} 
  else if (degrees >= 196.88 && degrees <= 208.12) {return "South-southwest (SSW)"} 
  else if (degrees >= 208.13 && degrees <= 219.37) {return "Southwest by South (SWbS)"} 
  else if (degrees >= 219.38 && degrees <= 230.62) {return "Southwest (SW)"} 
  else if (degrees >= 230.63 && degrees <= 241.87) {return "Southwest by West (SWbW)"} 
  else if (degrees >= 241.88 && degrees <= 253.12) {return "West-southwest (WSW)"} 
  else if (degrees >= 253.13 && degrees <= 264.37) {return "West by South (WbS)"} 
  else if (degrees >= 264.38 && degrees <= 275.62) {return "West (W)"} 
  else if (degrees >= 275.63 && degrees <= 286.87) {return "West by North (WbN)"}
  else if (degrees >= 286.88 && degrees <= 298.12) {return "West-northwest (WNW)"} 
  else if (degrees >= 298.13 && degrees <= 309.37) {return "Northwest by West (NWbW)"} 
  else if (degrees >= 309.38 && degrees <= 320.62) {return "Northwest (NW)"} 
  else if (degrees >= 320.63 && degrees <= 331.87) {return "Northwest by North (NWbN)"} 
  else if (degrees >= 331.88 && degrees <= 343.12) {return "North-northwest (NNW)"} 
  else if (degrees >= 343.13 && degrees <= 354.37) {return "North by West (NbW)"} 
}

function switchTemp(cOrF) {
if (cOrF === "C") {
  cf="F";
  var far = weatherObj.main.temp * 1.8 + 32;
  temp.innerHTML = far.toFixed(2) + " " + String.fromCharCode(176) + cf;
  return;
}
if (cOrF === "F") {
  cf="C";
  temp.innerHTML = weatherObj.main.temp.toFixed(2) + " " + String.fromCharCode(176) + cf;
  return;
}
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            city.innerHTML = 'To show weather for your current location:<br><br>Mobile users please turn on location services.<br><br>Desktop users please click "Allow" when prompted for location.<br><br>Alternatively, use the menu to search manually for the required location.'
            cloudCoverage.innerHTML = "Not available";
            temp.innerHTML = "Not available";
            wind.innerHTML = "Not available";
            break;
        case error.POSITION_UNAVAILABLE:
            city.innerHTML = "Location information is unavailable.<br><br>Alternatively, use the menu to search manually for the required location.";
            cloudCoverage.innerHTML = "Not available";
            temp.innerHTML = "Not available";
            wind.innerHTML = "Not available";
            break;
        case error.TIMEOUT:
            city.innerHTML = "The request to get your location timed out.<br><br>Please try again.<br><br>Alternatively, use the menu to search manually for the required location."
            cloudCoverage.innerHTML = "Not available";
            temp.innerHTML = "Not available";
            wind.innerHTML = "Not available";
            break;
        case error.UNKNOWN_ERROR:
            city.innerHTML = "An unknown error occurred.<br><br>Please try again.<br><br>Alternatively, use the menu to search manually for the required location."
            cloudCoverage.innerHTML = "Not available";
            temp.innerHTML = "Not available";
            wind.innerHTML = "Not available";
            break;
    }
}

function setBackground(weather, icon, weatherId) {
// Conditions not catered for with background video (use generic image instead)
if (weatherId === 731 || weatherId === 751 || weatherId === 761 || weatherId === 762 || weatherId === 771 || weatherId === 903 || weatherId === 904) {
  return;
}
// Storm
if (weather === "Thunderstorm" || weatherId === 901 || weatherId === 960 || weatherId === 961) {
vid.poster = "http://www.danielcole.co.uk/media/img/stormy_still.jpg";
vid.src = "http://www.danielcole.co.uk/media/vid/stormy.mp4";
return;
  }   
// Clouds day
  if (weather === "Clouds" && icon === "02d" || weather === "Clouds" && icon === "03d" || weather === "Clouds" && icon === "04d" ) {
vid.poster = "http://www.danielcole.co.uk/media/img/cloudy_still.jpg";
vid.src = "http://www.danielcole.co.uk/media/vid/cloudy.mp4";
return;
  }
if (weather === "Clouds" && icon === "02n" || weather === "Clouds" && icon === "03n" || weather === "Clouds" && icon === "04n" ) {
vid.poster = "http://www.danielcole.co.uk/media/img/cloudy_night_still.jpg";
vid.src = "http://www.danielcole.co.uk/media/vid/cloudy_night.mp4";
return;
  }
//rain
if (weather === "Rain" || weather === "Drizzle" || weatherId === 906) {
vid.poster = "http://www.danielcole.co.uk/media/img/rainy_still.jpg";
vid.src = "http://www.danielcole.co.uk/media/vid/rainy.mp4";
return;
  }
// clear daytime
if (weather === "Clear" && icon === "01d" || weatherId === 951 || weatherId === 952) {
vid.poster = "http://www.danielcole.co.uk/media/img/sunny_still.jpg";
vid.src = "http://www.danielcole.co.uk/media/vid/sunny.mp4";
return;
  }
// clear night
if (weather === "Clear" && icon === "01n") {
vid.poster = "http://www.danielcole.co.uk/media/img/clear_night_still.jpg";
vid.src = "http://www.danielcole.co.uk/media/vid/clear_night.mp4";
return;
  }
//snow
if (weather === "Snow") {
vid.poster = "http://www.danielcole.co.uk/media/img/snowy_still.jpg";
vid.src = "http://www.danielcole.co.uk/media/vid/snowy.mp4";
return;
  }
// windsock
if (weather === "Extreme" || weather === "Additional" || weatherId === 781) {
vid.poster = "http://www.danielcole.co.uk/media/img/windy_still.jpg";
vid.src = "http://www.danielcole.co.uk/media/vid/windy.mp4";
return;
  }
// mist or fog
if (weather === "Mist") {
vid.poster = "http://www.danielcole.co.uk/media/img/misty_still.jpg";
vid.src = "http://www.danielcole.co.uk/media/vid/misty.mp4";
return;
  } 
}

$("#show").click(function(event) {
  $(".navbar-collapse").collapse('hide');
});