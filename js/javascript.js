var bikeParking = {};
//this is my object that everything will go into
bikeParking.points = [];

L.mapbox.accessToken = 'pk.eyJ1IjoiamF6enZhbnoiLCJhIjoiY2lmc3JyY20wMDQydXV3bHlqd3Q2eDgyZiJ9.T0-MtIKIAJ-tEsnVZBm2pA';

bikeParking.map = L.mapbox.map('map', 'jazzvanz.cifsqtb2e06o5uekqcodf3eb3');

bikeParking.apiKey = "8899c1a9fc80fed974fa12807da4a4a8eb06cba8c7c4ed61dac48544bf411585";
//this is my USER API Key

// bikeParking.getCorral = function() {
// 	$.ajax({
// 		url: "https://api.namara.io/v0/data_sets/19fbf18f-f10a-454c-922e-30c6f3ca5e80/data/en-0?api_key=" + bikeParking.apiKey,
// 		method: "GET",
// 		dataType: "jsonp"
// 	}).then(function(locationCorral){
// 		// console.log(locationCorral);
// 	});
// };
//this is our .ajax call for the large bike stands

bikeParking.getRings = function(lon, lat) {
	$.ajax({
		url: "https://api.namara.io/v0/data_sets/b5d9a990-246a-4a40-beaa-bb92a8132ce7/data/en-1",
		method: "GET",
		dataType: "jsonp",
		data: {
			offset: 150,
			limit: 150,
			api_key: bikeParking.apiKey,
			where: "nearby(geometry, "+ lat +", "+ lon + ", 1km)"
		}
	}).then(function(result) {
		console.log(result);
		bikeParking.points(result);
	});
};

bikeParking.points = function(points) {
	$.each(points, function(i, value) {
		// console.log(value)

		var lon = (value.geometry.coordinates[0]);
		var lat = (value.geometry.coordinates[1]);
		var latlng = L.latLng(lat, lon);
		// if latlng is within a ?? radius, .addTo. if it is not. do nothing. 

		L.marker(latlng).addTo(bikeParking.map);
	});
};

//THIS IS A BIG EXPERIMENT AND I HAVE NO CLUE WHAT I AM DOING.
// if latlng < RADIUS == true latlng.addTo(bikeParking.map);

// var RADIUS = 2000;

// if (latlng <= RADIUS) {
// 	L.marker(latlng).addTo(bikeParking.map);
// } else {

// };




// // MAP BOX EXAMPLE. 
// var RADIUS = 2000;

// var filterCircle = L.circle(L.latLng(40, -75), RADIUS, {
//     // opacity: 1,
//     // weight: 1,
//     // fillOpacity: 0.4
// }).addTo(map);

// var csvLayer = omnivore.csv('/mapbox.js/assets/data/airports.csv', null, L.mapbox.featureLayer())
//     .addTo(map);

// map.on('mousemove', function(e) {
//     filterCircle.setLatLng(e.latlng);
//     csvLayer.setFilter(function showAirport(feature) {
//         return e.latlng.distanceTo(L.latLng(
//                 feature.geometry.coordinates[1],
//                 feature.geometry.coordinates[0])) < RADIUS;
//     });
// });



var latLng;

bikeParking.userLocation = function(userLocation) {
	// console.log(userLocation);
	// $.each(userLocation, function(i, value) {
	// var userLon = value.latitude;
	// var userLat = value.longitude;
	var userLon = userLocation.coords.longitude;
	var userLat = userLocation.coords.latitude;
	latLng = L.latLng(userLat, userLon);
	bikeParking.cityMap(latLng);
	bikeParking.getRings(userLon, userLat);
	// });
}


bikeParking.cityMap = function(burgers) {
	bikeParking.map.setView(burgers, 20);
	L.marker(burgers).addTo(bikeParking.map);
};

//setveiw is a method, (mapbox), //simon

//set content pop-up. 
//make use your only calling a function once. 

bikeParking.init = function(){
	// bikeParking.getRings();
	// bikeParking.getCorral();
	//THIS IS GETTING THE USERS LOCATION AND SETTING IT AS THE CENTER OF THE MAP

	navigator.geolocation.getCurrentPosition(function(userLocation) {
		bikeParking.userLocation(userLocation);
	});
};
//this is our INIT which will start everything else 

$ (function(){
	bikeParking.init();
});
//this is our document ready which when the page is loaded will call bikeParking.init

//find out where someones, then based on that location go make a request. 
