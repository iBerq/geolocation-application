var country_btn_div = document.getElementById("country-btn-div");
var northpole_btn_div = document.getElementById("northpole-btn-div");
var moon_btn_div = document.getElementById("moon-btn-div");
var map_div = document.getElementById("map");
var map;
var infoWindow;
var geocoder;
var input_div = document.getElementById("input-div");
var lat = document.getElementById("lat");
var lon = document.getElementById("lon");
var inv_lat_lon = document.getElementById("inv-lat-lon");
var dist_moon_div = document.getElementById("dist-moon-div");
var dist_moon = document.getElementById("dist-moon");
var get_loc_div = document.getElementById("get-loc-div");

function showCountrySection() {
  if (northpole_btn_div.style.display === "none") {
    northpole_btn_div.style.display = "flex";
    moon_btn_div.style.display = "flex";
    map_div.style.display = "none";
    input_div.style.display = "none";
  } else {
    northpole_btn_div.style.display = "none";
    moon_btn_div.style.display = "none";
    map_div.style.display = "block";
    input_div.style.display = "block";
  }
}

function distanceToNorthPoleSection() {
  if (country_btn_div.style.display === "none") {
    country_btn_div.style.display = "flex";
    moon_btn_div.style.display = "flex";
    map_div.style.display = "none";
    infoWindow.close();
  } else {
    country_btn_div.style.display = "none";
    moon_btn_div.style.display = "none";
    map_div.style.display = "block";
    calculateDistanceToNorthPole();
  }
}

function distanceToMoonCoreSection() {
  if (country_btn_div.style.display === "none") {
    country_btn_div.style.display = "flex";
    northpole_btn_div.style.display = "flex";
    input_div.style.display = "none";
    dist_moon_div.style.display = "none";
    get_loc_div.style.display = "none";
    lat.value = "";
    lon.value = "";
  } else {
    country_btn_div.style.display = "none";
    northpole_btn_div.style.display = "none";
    input_div.style.display = "block";
    dist_moon_div.style.display = "flex";
    get_loc_div.style.display = "block";
    calculateDistanceToMoonCore();
  }
}

// Initialize and add the map
function initMap() {
  const bilkent = { lat: 39.874989474594805, lng: 32.74762280405252 };

  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 14,
    center: bilkent,
  });
  geocoder = new google.maps.Geocoder();
  infoWindow = new google.maps.InfoWindow();
}

window.initMap = initMap;

const validateLatitude = (lat) => {
  const regex =
    /^(\+|-)?(?:90(?:(?:\.0{1,15})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,15})?))$/;
  return regex.test(String(lat));
};

const validateLongitude = (lon) => {
  const regex =
    /^(\+|-)?(?:180(?:(?:\.0{1,15})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,15})?))$/;
  return regex.test(String(lon));
};

async function showCountryOnMap() {
  if (!validateLatitude(lat.value) || !validateLongitude(lon.value)) {
    inv_lat_lon.style.display = "inline-flex";
    return;
  }
  inv_lat_lon.style.display = "none";

  const givenPos = {
    lat: parseFloat(lat.value),
    lng: parseFloat(lon.value),
  };

  var country = "";
  await geocoder
    .geocode({ location: givenPos })
    .then((response) => {
      country = response.results[response.results.length - 1].formatted_address;
    })
    .catch((e) => console.log("Geocoder failed due to: " + e));

  if (country == "") {
    infoWindow.setPosition(givenPos);
    infoWindow.setContent("Given coordinates are not within a country");
    infoWindow.open(map);
    map.setCenter(givenPos);
    map.setZoom(4);
  } else {
    await geocoder
      .geocode({ address: country })
      .then((response) => {
        infoWindow.setPosition(response.results[0].geometry.location);
        infoWindow.setContent("Given coordinates are within " + country + ".");
        infoWindow.open(map);
        map.setCenter(response.results[0].geometry.location);
        map.setZoom(4);
      })
      .catch((e) => console.log("Geocoder failed due to: " + e));
  }
}

function haversine_distance(mk1, mk2) {
  var R = 6371.071; // Radius of the Earth in miles
  var rlat1 = mk1.position.lat() * (Math.PI / 180); // Convert degrees to radians
  var rlat2 = mk2.position.lat() * (Math.PI / 180); // Convert degrees to radians
  var difflat = rlat2 - rlat1; // Radian difference (latitudes)
  var difflon = (mk2.position.lng() - mk1.position.lng()) * (Math.PI / 180); // Radian difference (longitudes)

  var d =
    2 *
    R *
    Math.asin(
      Math.sqrt(
        Math.sin(difflat / 2) * Math.sin(difflat / 2) +
          Math.cos(rlat1) *
            Math.cos(rlat2) *
            Math.sin(difflon / 2) *
            Math.sin(difflon / 2)
      )
    );
  return d;
}

function calculateDistanceToNorthPole() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const currentLoc = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        const northPole = { lat: 90, lng: 0 };

        var mk1 = new google.maps.Marker({ position: currentLoc, map: map });
        var mk2 = new google.maps.Marker({ position: northPole, map: map });
        /* var line = new google.maps.Polyline({
          path: [currentLoc, northPole],
          map: map,
        }); */
        var distance = haversine_distance(mk1, mk2);

        infoWindow.setPosition(currentLoc);
        infoWindow.setContent(
          "Distance between your location and North Pole is " +
            distance.toFixed(2) +
            " km."
        );
        infoWindow.open(map);
        map.setCenter(currentLoc);
      },
      () => {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

function calculateDistanceToMoonCore() {
  dist_moon.innerHTML = "asdsadasd";
}

function getCurrentLoc() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const currentLoc = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        lat.value = currentLoc.lat;
        lon.value = currentLoc.lng;
      },
      () => {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}
