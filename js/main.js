//Neigborhood Map Project
/*jshint loopfunc: true */
var locations = [
  //Places with foursquare i[
    {
      name: 'Brasserie Four',
      fsid: '4b7c923ff964a520af9b2fe3'
    },
    {
      name: 'Whitehouse-Crawford',
      fsid: '4b63ec49f964a52045972ae3'
    },
    {
      name: 'Saffron Mediterranean Kitchen',
      fsid: '4b63e8d6f964a520b4962ae3'
    },
    {
      name: 'Graze',
      fsid: '4db2325504374b3c49722dde'
    },
    {
      name: 'Gramercy Cellars',
      fsid: '4da0a2abb521224bd070e1ed'}
  ];
var favPlaces = [{
    name: 'Brasserie Four',
    location: {
      lat: 46.066612,
      lng: -118.33807
    }
  },
  {
    name: 'Whitehouse-Crawford',
    location: {
      lat: 46.0686515,
      lng: -118.3421814
    }
  },
  {
    name: 'Saffron Mediterranean Kitchen',
    location: {
      lat: 46.0648235,
      lng: -118.3408598
    }
  },
  {
    name: 'Graze',
    location: {
      lat: 46.0677724,
      lng: -118.3366146
    }
  },
  {
    name: 'Gramercy Cellars',
    location: {
      lat: 46.0670125,
      lng: -118.3569582
    }
  }
];
var map;
//Initialize map
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: {
        lat: 46.0645809,
        lng: -118.3430209}
    });
    var markers = [];
    //Add infowindow
    var myInfoWindow = new google.maps.InfoWindow();
    //An array of favorite places with locations

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
    //Put marker in the myCafes object
    appViewModel.myCafes()[i].marker = marker;
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
      var contentString = appViewModel.myCafes()[marker.id].contentString();
      infowindow.setContent('<div>' + marker.title + '</div>' + contentString);
      //infowindow.setContent(contentString);
      //BOUNCE and timeout in 3 seconds
      marker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(function(){
        marker.setAnimation(null);
      }, 3500);
      //Open the infowindow on the map anchored to the marker
      infowindow.open(map, marker);
      }
    }
  //This is the map init closure
  }
  //handle error from google map
  function mapError() {
    alert("There was an error retrieving the map from Google");
  }

    //Implement viewmodel.
    var AppViewModel = function() {
      var self= this;
      //Make var locations and ko observableArray
      self.myCafes = ko.observableArray(locations);
      //Iterate through the myCafes object
      self.myCafes().forEach(function(cafe) {
        cafe.contentString = ko.observable('');
        getData(cafe);
      });
      //Activley watch what the user inputs in the search field
      self.userInput = ko.observable("");
      //Function to display in the list view if it contains search input
      self.searchResults = ko.computed(function() {
        //Change user input to upper case to do case sensitive search.
        var searchInput = self.userInput().toUpperCase();
        //If no search input display all myCafe
          //change names of locations to compare against to upper case for case sensitive search
          self.myCafes.name.toUpperCase();
          var myCafes = self.myCafes();
          //return items matching searchInput
          return ko.utils.arrayFilter(self.myCafes(), function(cafe) {
            var cafeName = cafe.name.toUpperCase();
            var isInName = cafeName.indexOf(searchInput) > -1; //true of false
            if (cafe.marker) {
              cafe.marker.setVisible(isInName);//true or false
            }
              return isInName;
          });
      });
      this.showCafes = function(myCafes) {
        google.maps.event.trigger(myCafes.marker, 'click');
      };
    };
//AJAX request
function getData(cafe) {
//Info request to foursquare API
  $.ajax({
    url: "https://api.foursquare.com/v2/venues/" + cafe.fsid,
    dataType: "json",
    async: true,
    data: {
      client_id:'U1Y4IIWY4GNNZ0MWADGNUSGR2TW0U2NN0EVZOIHBLKCIXABW',
      client_secret:'TYVKI2AHL3PRDLU4SPYROMJWZJ1QUHM3MRCFRM2SP3FWMJPI',
      v: 20170814
    },
    success: function(data) {
      //console.log(data);
      var venue = data.response.venue;
      //get the addresses
      var address;
      if (venue.location.formattedAddress !== undefined) {
        address = venue.location.formattedAddress[0];
      } else {
        adress = "Address is not available";
      }
      //console.log(address);
      //add the content to the InfoWindow
      var contentString = "<div class='address'>" + 'Address: '+ "<span class='info'> " + address + "</span></div>";
      cafe.contentString(contentString);
    },
    //handle error from foursquare
    error: function() {
      window.alert("Sorry information not availablle from foursquare, try again later.");
    }
  });
}
var appViewModel = new AppViewModel();
ko.applyBindings(appViewModel);
