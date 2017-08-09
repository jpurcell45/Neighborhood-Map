var map;
//Initialize map
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: {lat: 46.0645809, lng: -118.3430209}
  });
//An array of favorite places and locations
  var favPlaces = [
    {name: 'Brasserie Four', location: {lat: 46.066612, lng: -118.33807}},
    {name: 'Whitehouse-Crawford', location: {lat: 46.0686515, lng: -118.3421814}},
    {name: 'Saffron Mediterranean Kitchen', location: {lat: 46.0648235, lng: -118.3408598}},
    {name: 'Graze', location: {lat: 46.0677724, lng: -118.3366146}},
    {name: 'Gramercy Cellars', location: {lat: 46.0670125, lng: -118.3569582}}
  ];
  //var marker = new google.maps.Marker({
    //position: tribeca,
    //map: map,
    //title: 'first marker',
    //animation: google.maps.Animation.DROP
  //});
//Create infowindow
  var infowindow = new google.maps.InfoWindow({
    content: 'insert content here'
  });
//Open infowindow on click
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });


}
