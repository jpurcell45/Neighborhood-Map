var map;

var locations = [
  //Places with foursquare i[
          { name: 'Brasserie Four', fsid: '4b7c923ff964a520af9b2fe3'},
          { name: 'Whitehouse-Crawford', fsid: '4b63ec49f964a52045972ae3'},
          { name: 'Saffron Mediterranean Kitchen', fsid: '4b63e8d6f964a520b4962ae3'},
          { name: 'Graze', fsid: '4db2325504374b3c49722dde'},
          { name: 'Gramercy Cellars', fsid: '4da0a2abb521224bd070e1ed'}
        ];

var test = "testing123";

//var array = [Tom, Dick, Harry];
//Initialize map
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: {lat: 46.0645809, lng: -118.3430209}
  });
  var markers = [];
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
//BOUNCE
      marker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(function(){
        marker.setAnimation(null);
      }, 3000);
//Open the infowindow on the map anchored to the marker
      infowindow.open(map, marker);
      }
    }
    //This is the init closure
  }


    //Implement viewmodel.
    var AppViewModel = function() {
      var self= this;




    };

//an array to store all places
//self.allLocations = [];

      //allLocations.forEach(function(title) {
        //self.allLocations(new Location())(title);
      //});
self.visibleLocations = ko.observableArray();
//Monitor search inputs
self.userInput = ko.observableArray();

var searchInput = self.userInput().toUpperCase;


//});
//AJAX request
//$(document).ready(function(){


$.ajax({
  url: "https://api.foursquare.com/v2/venues/search",
  dataType: "json",
  data: {
  near: 'Walla Walla',
  query: 'winery',
  client_id:'U1Y4IIWY4GNNZ0MWADGNUSGR2TW0U2NN0EVZOIHBLKCIXABW',
  client_secret:'TYVKI2AHL3PRDLU4SPYROMJWZJ1QUHM3MRCFRM2SP3FWMJPI',
  v: 20170814
  },
  success: function(data) {
  //console.log(data);
  venue = data.response.venues[0];
  //get the addresses
  address = venue.location.formattedAddress[0];
  console.log(address);

  }
});
ko.applyBindings(new AppViewModel());
