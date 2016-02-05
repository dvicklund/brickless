var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'dvicklund.p2no7d88',
    accessToken: 'pk.eyJ1IjoiZHZpY2tsdW5kIiwiYSI6ImNpazllZzk3bTA3enF2OWt1cXRvbjVvdzEifQ.xZoxddPrFFB8m8za__Xa4A'
}).addTo(map);
