var map;
//Global variable for markers
var markers = [];
//Initialize map
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: {lat: 46.0645809, lng: -118.3430209}
  });
//Add infowindow
  var myInfoWindow = new google.maps.InfoWindow();
//An array of favorite places with locations
  var favPlaces = [
    {name: 'Brasserie Four', location: {lat: 46.066612, lng: -118.33807}},
    {name: 'Whitehouse-Crawford', location: {lat: 46.0686515, lng: -118.3421814}},
    {name: 'Saffron Mediterranean Kitchen', location: {lat: 46.0648235, lng: -118.3408598}},
    {name: 'Graze', location: {lat: 46.0677724, lng: -118.3366146}},
    {name: 'Gramercy Cellars', location: {lat: 46.0670125, lng: -118.3569582}}
  ];
  //Loop through favPlaces array to make a marker for each
  for (i = 0; i<favPlaces.length; i++) {
    //Get lat lng
    var position = favPlaces[i].location;
    //Get name
    var title = favPlaces[i].name;
    //Create marker
    var marker = new google.maps.Marker({
    position: position,
    map: map,
    title: title,
    animation: google.maps.Animation.DROP,
    id: i
    });

  //Push the created marker to the global marker array
  markers.push(marker);

//Open the specific infowindow on click
  marker.addListener('click', function() {
    populateInfoWindow(this, myInfoWindow);
  });
}
  function populateInfoWindow(marker, infowindow) {
//Check if an infowindow is open, if not proceed
    if (window.marker !== marker) {
      infowindow.marker = marker;
//Insert the name of the place into the infowindow
      infowindow.setContent('<div>' + marker.title + '</div>');
//Open the infowindow on the map anchored to the marker
      infowindow.open(map, marker);
      }
    }
    //Make marker bounce on click mostly from Google Maps API.
        marker.addListener('click', function() {
          toggleBounce(this);
        });
    //toggleBounce function.
         function toggleBounce(marker) {
          if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
          } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
          }
        }
//Apply app view model
var appViewModel = function() {

var self = this;
//an array to store all places
self.allFavPlaces = [];

      favPlaces.forEach(function(place) {
        self.allFavPlaces(new Place())(place);
      });


self.visibleFavPlaces = ko.observableArray();
//Monitor search inputs
self.userInput = ko.observableArray();

var searchInput = self.userInput().toUpperCase;

self.allFavPlaces.forEach(function(place) {
  place.marker.setVisible(false);
});


//This is the init closure
    };
}

var locations = [
    { title: 'Brasserie Four'},
    { title: 'Whitehouse-Crawford'},
    { title: 'Saffron Mediterranean Kitchen'},
    { title: 'Graze'},
    { title: 'Gramercy Cellars'}
  ];
var viewModel = {
  locations: ko.observableArray(locations)
};
ko.applyBindngs(viewModel);


//appViewModel = new AppViewModel();

//ko.applyBindings(appViewModel);
//});
//AJAX request
//$(document).ready(function(){

/*
$.ajax({
  url: "https://api.foursquare.com/v2/venues/search?",
  dataType: "json",
  data: "limit=1" +
  '&ll = 46.066612, -118.33807' +
  '&query= address',
  '&client_id=U1Y4IIWY4GNNZ0MWADGNUSGR2TW0U2NN0EVZOIHBLKCIXABW',
  '&client_secret=U1Y4IIWY4GNNZ0MWADGNUSGR2TW0U2NN0EVZOIHBLKCIXABW',
  '&v=20170814',
});
*/
