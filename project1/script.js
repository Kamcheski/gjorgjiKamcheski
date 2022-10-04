let displayBorder = L.geoJSON();
let displayMarkers = L.markerClusterGroup();
let displayMarkersI = L.markerClusterGroup();
let displayMarkersII = L.markerClusterGroup();

function displayMap(lat, lng, zoom) {
  map = L.map("map").setView([lat, lng], zoom);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  var osm = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap",
  });

  var streets = L.tileLayer(
    "https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png",
    {
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      maxZoom: 30,
      attribution:
        '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
  );

  var baseMaps = {
    OpenStreetMap: osm,
    "Mapbox Streets": streets,
  };
  var layerControl = L.control.layers(baseMaps).addTo(map);

  L.control.scale({ imperial: false }).addTo(map);

  L.easyButton(
    "fa-globe",
    function (btn, map) {
      $("#getInfomodal").modal("show");
    },
    { position: "topright" }
  ).addTo(map);

  L.easyButton(
    "fa-cloud",
    function (btn, map) {
      $(".weather").css("display", "initial");
    },
    { position: "topright" }
  ).addTo(map);

  L.easyButton(
    "fa-flag",
    function (btn, map) {
      $("#displayFlag").modal("show");
    },
    { position: "topright" }
  ).addTo(map);

  L.easyButton(
    "fa-light fa-newspaper",
    function (btn, map) {
      $("#getNews").modal("show");
    },
    { position: "topright" }
  ).addTo(map);

  L.easyButton(
    "fa-dollar",
    function (btn, map) {
      $("#getCurrency").modal("show");
    },
    { position: "topright" }
  ).addTo(map);

  L.easyButton(
    "fa-book",
    function (btn, map) {
      $("#getWiki").modal("show");
    },
    {
      position: "topright",
    }
  ).addTo(map);
}

$.ajax({
  url: "php/dropdownList.php",
  dataType: "json",
  success: function (data) {
    $.each(data, function (result) {
      $("#dropdownList").append(
        $("<option>", {
          value: data[result].countryCode,
          text: data[result].name,
        })
      );
    });
  },
  error: function (jqXHR, textStatus, errorThrown) {
    console.log("error");
  },
});

function success(position) {
  let lat = position.coords.latitude;
  let lng = position.coords.longitude;
  displayMap(lat, lng, "5");
  getCountryCode(lat, lng).then(function (value) {
    border(value.data);
    document.getElementById("dropdownList").value = value.data;
  });
}

function error() {
  displayMap("51.505", "-0.09", "2");
}

function border(countryCode) {
  $.ajax({
    url: "php/bordersList.php",
    dataType: "json",
    data: {
      request: countryCode,
    },
    success: function (data) {
      map.removeLayer(displayBorder);
      let border = data;

      displayBorder = L.geoJSON(border, {
        style: { color: "blue" },
      });

      map.fitBounds(displayBorder.getBounds());
      map.addLayer(displayBorder);
      getInfo(countryCode);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("error");
    },
  });
}

function getInfo(countryCode) {
  $.ajax({
    url: "php/getInfo.php",
    dataType: "json",
    data: {
      request: countryCode,
    },
    success: function (data) {
      $("#flagImg").attr(
        "src",
        `https://countryflagsapi.com/png/${countryCode}`
      );
      $("#continent").html(data["data"]["0"]["continentName"]);
      $("#country").html(data["data"]["0"]["countryName"]);
      $("#population").html(
        new Intl.NumberFormat().format(data["data"]["0"]["population"])
      );
      $("#capital").html(data["data"]["0"]["capital"]);

      getWeather(data["data"]["0"]["capital"]);
      poiLakes(data["data"]["0"]["countryCode"]);
      poiAirports(data["data"]["0"]["countryCode"]);
      poiParks(data["data"]["0"]["countryCode"]);
      getExchange(data["data"]["0"]["currencyCode"]);
      getNews(data["data"]["0"]["countryCode"]);
      getWiki(data["data"]["0"]["countryName"].split(" ").join(""));
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("error");
    },
  });
}

function getExchange(currency) {
  $.ajax({
    url: "php/getExchange.php",
    type: "POST",
    dataType: "json",
    data: {
      request: currency,
    },
    success: function (data) {
      $("#exchangeRate").html(`${data.data.rates[currency]} ${currency}:`);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("error");
    },
  });
}

function getNews(countryCode) {
  $.ajax({
    url: "php/getNews.php",
    type: "POST",
    dataType: "json",
    data: {
      request: countryCode,
    },
    success: function (data) {
      $("#newsI").html(data.data.results[0].title);
      $("#textI").html(data.data.results[0].description);
      $("#newsII").html(data.data.results[1].title);
      $("#textII").html(data.data.results[1].description);
      $("#newsIII").html(data.data.results[2].title);
      $("#textIII").html(data.data.results[2].description);
      $("#newsIV").html(data.data.results[3].title);
      $("#textIV").html(data.data.results[3].description);
      $("#newsV").html(data.data.results[4].title);
      $("#textV").html(data.data.results[4].description);
      $("#newsVI").html(data.data.results[5].title);
      $("#textVI").html(data.data.results[5].description);
      $("#newsVII").html(data.data.results[6].title);
      $("#textVII").html(data.data.results[6].description);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("error");
    },
  });
}

function getWeather(city) {
  $.ajax({
    url: "php/getWeather.php",
    dataType: "json",
    data: {
      request: city,
    },
    success: function (data) {
      $(document).on("click", function (e) {
        $(".weather").css("display", "none");
      });
      var feelsLike = Math.trunc(data.data.main.feels_like);
      var temp = Math.trunc(data.data.main.temp);

      $("#name").html(data.data.name);
      $("#description").html(data.data.weather[0].description);
      $("#windSpeed").html(`${data.data.wind.speed} km/h`);
      $("#humidity").html(`${data.data.main.humidity} %`);
      $("#feelslike").html(`Feels like ${feelsLike} °C`);
      $("#temp").html(`${temp} °C`);
      $("#cc").html(data.data.sys.country);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("error");
    },
  });
}

function getWiki(countryName) {
  $.ajax({
    url: "php/getWiki.php",
    dataType: "json",
    data: {
      request: countryName,
    },
    success: function (data) {
      var obj = data.data.pages;
      var objid = Object.values(obj)[0].pageid;

      $("#title").html(data.data.pages[objid].title);
      $("#text").html(data.data.pages[objid].extract);
      $("#link").html(
        `<a href="https://en.wikipedia.org/wiki/${countryName}" target="_blank">Read more...</a>`
      );
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("error");
    },
  });
}

function poiLakes(countryCode) {
  $.ajax({
    url: "php/poiLakes.php",
    dataType: "json",
    data: {
      request: countryCode,
    },
    success: function (data) {
      map.removeLayer(displayMarkers);
      displayMarkers = L.markerClusterGroup();

      var latlng;
      data.data.forEach(function (e) {
        latlng = [e.lat, e.lng];

        var icon = L.icon({
          iconUrl: "icon/icons8-lake-48.png",
          iconSize: [30, 30],
        });

        displayMarkers.addLayer(
          L.marker(latlng, { icon: icon }).bindPopup(`${e.toponymName}`)
        );
      });
      map.addLayer(displayMarkers);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("error");
    },
  });
}

function poiAirports(countryCode) {
  $.ajax({
    url: "php/poiAirports.php",
    dataType: "json",
    data: {
      request: countryCode,
    },
    success: function (data) {
      map.removeLayer(displayMarkersI);
      displayMarkersI = L.markerClusterGroup();

      var latlng;
      data.data.forEach(function (e) {
        latlng = [e.lat, e.lng];

        var icon = L.icon({
          iconUrl: "icon/airport.png",
          iconSize: [30, 30],
        });

        displayMarkersI.addLayer(
          L.marker(latlng, { icon: icon }).bindPopup(`${e.toponymName}`)
        );
      });
      map.addLayer(displayMarkersI);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("error");
    },
  });
}

function poiParks(countryCode) {
  $.ajax({
    url: "php/poiParks.php",
    dataType: "json",
    data: {
      request: countryCode,
    },
    success: function (data) {
      map.removeLayer(displayMarkersII);
      displayMarkersII = L.markerClusterGroup();

      var latlng;
      data.data.forEach(function (e) {
        latlng = [e.lat, e.lng];

        var icon = L.icon({
          iconUrl: "icon/icons8-park-with-street-light-48.png",
          iconSize: [40, 40],
        });

        displayMarkersII.addLayer(
          L.marker(latlng, { icon: icon }).bindPopup(`${e.toponymName}`)
        );
      });

      map.addLayer(displayMarkersII);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("error");
    },
  });
}

async function getCountryCode(lat, lng) {
  let value = $.ajax({
    url: "php/getCountryCode.php",
    type: "POST",
    dataType: "json",
    data: {
      lat: lat,
      lng: lng,
    },
    success: function (data) {
      return data["data"];
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("error");
    },
  });
  return value;
}

$("#dropdownList").on("change", function (e) {
  border(e.target.value);
});

navigator.geolocation.getCurrentPosition(success, error);
