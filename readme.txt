Free Code Camp Front End Development Projects - Show the Local Weather

Task: Create a webpage which can show the user's current local weather conditions based by capturing their location geo coordinates.

User Stories:

- As a user, I can see the weather in my current location.
- As a user, I can see a different icon or background image (e.g. snowy mountain, hot desert) depending on the weather.
- As a user, I can push a button to toggle between Fahrenheit and Celsius.

Additional Functionality:

- I decided to make use of HTML5 background functionality to display a short looping background video clip rather than a background image.

- I created a function to take the wind bearing degree and translate this into a more user-friendly traditional compass abbreviation (e.g. "North (N)") 

- I added a manual location lookup picklist using the Google Maps API. This allows the user to search for and select any worldwide location without allowing location services to identify their device location. 

Once a manual location is selected, the OpenWeather API is called using the geo coordinates provided by Google Maps.

Created Using:

- HTML5
- Javascript/jQuery
- CSS3
- Bootstrap
- Font Awesome
- OpenWeather API
- Google Maps API