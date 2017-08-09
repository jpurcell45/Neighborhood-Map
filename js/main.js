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
  }
//Open the specific infowindow on click
  marker.addListener('click', function() {
    populateInfoWindow(this, myInfoWindow);
  });


}
