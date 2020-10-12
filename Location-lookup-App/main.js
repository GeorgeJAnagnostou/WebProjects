// Foursquare API Info
const clientId = '1FCVG2RT0CDKWNLAMV2AFULFGLCZLBSUDDJCJXNWQIEIHZQE';
const clientSecret = '2RIFSM1NW53QV1QEEQCXDX4A5JQW1JYCMRA54ANUQUMK51GH';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';

// OpenWeather Info
const openWeatherKey = '8d37d9dd738da34a997856ab4a02cc13';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

// TomTom API Info
let locationCoord = {};
const tomtomKey = 'Fql1hjnrcBxcIGAHBjAjBfGeZyEEfMAg';
const tomtomUrl = 'https://api.tomtom.com/map/1/staticimage?layer=basic&style=main&format=jpeg&zoom=11&center=';
;
// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDiv = $("#weather1");
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const $map = $('#map');
const $main = $('main');

// Add AJAX functions here:

const getVenues = async () => {
    const city = $input.val();
    const urlToFetch = `${url}${city}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=20201009`;
    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const jsonResponse = await response.json();
            const venues = jsonResponse.response.groups[0].items.map(item => item.venue);
            return venues;
        } else {
            throw new Error('Request failed!');
        }
    } catch (error) {
        console.log(error);
    }
}

const getForecast = async () => {
    const urlToFetch = `${weatherUrl}?&q=${$input.val()}&APPID=${openWeatherKey}`;
    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const jsonResponse = await response.json();
            locationCoord = jsonResponse.coord;
            getMap().then(mapData => renderMap(mapData));
            return jsonResponse;
        } else {
            throw new Error('Request failed!');
        }
    } catch (error) {
        console.log(error);
    }
}

const getMap = async () => {
    const urlToFetch = `${tomtomUrl}${locationCoord.lon}%2C${locationCoord.lat}&width=500&height=300&view=Unified&key=${tomtomKey}`;
    console.log(locationCoord);

    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            console.log(response);
            return response.url;
        } else {
            throw new Error('Request failed for getMap');
        }
    } catch (error) {
        console.log(error);
    }
}

// Render functions
const renderVenues = (venues) => {
    $venueDivs.forEach(($venue, index) => {
        const venue = venues[index];
        const venueIcon = venue.categories[0].icon;
        const venueImgSrc = `${venueIcon.prefix}bg_64${venueIcon.suffix}`;
        let venueContent = createVenueHTML(venue.name, venue.location, venueImgSrc);
        $venue.append(venueContent);
    });
    $destination.append(`<h2>${venues[0].location.city}, ${venues[0].location.state}</h2>`);
}

const renderForecast = (day) => {
    let weatherContent = createWeatherHTML(day);
    $weatherDiv.append(weatherContent);
}

const renderMap = (mapUrl) => {
    let mapContent = createMapHTML(mapUrl);
    $map.append(mapContent);
}

const createVenueHTML = (name, location, iconSource) => {
    return `<h2>${name}</h2>
    <img class="venueimage" src="${iconSource}"/>
    <h3>Address:</h3>
    <p>${location.address}</p>
    <p>${location.city}</p>
    <p>${location.country}</p>`;
}

const createWeatherHTML = (currentDay) => {
    locationCoord = currentDay.coord;
    return `<h2>${weekDays[(new Date()).getDay()]}</h2>
            <h2>Temperature: ${kelvinToFahrenheit(currentDay.main.temp)}&deg;F</h2>
            <h2>Condition: ${currentDay.weather[0].description}</h2>
            <img src="https://openweathermap.org/img/wn/${currentDay.weather[0].icon}@2x.png">`;
}

const createMapHTML = (mapUrl) => {
    return `<img src="${mapUrl}">`;
}

const kelvinToFahrenheit = k => ((k - 273.15) * 9 / 5 + 32).toFixed(0);

const executeSearch = () => {
    $venueDivs.forEach(venue => venue.empty());
    $weatherDiv.empty();
    $destination.empty();
    $map.empty();
    $container.css("visibility", "visible");
    getVenues().then(venues => renderVenues(venues));
    getForecast().then(forecast => renderForecast(forecast));
    
    return false;
}

$submit.click(executeSearch);