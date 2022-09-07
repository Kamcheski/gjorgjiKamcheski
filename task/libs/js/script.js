$("#timezoneBtn").click(function () {
  $.ajax({
    url: "libs/php/timezone.php",
    type: "POST",
    dataType: "json",
    data: {
      lat: $("#timezoneLat").val(),
      lng: $("#timezoneLng").val(),
    },
    success: function (result) {
      $("#result").html("Date and time: " + result["data"]);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#result").html("No data for this location");
    },
  });
});

$("#oceanBtn").click(function () {
  $.ajax({
    url: "libs/php/ocean.php",
    type: "POST",
    dataType: "json",
    data: {
      lat: $("#oceanLat").val(),
      lng: $("#oceanLng").val(),
    },
    success: function (result) {
      $("#result").html("Ocean: " + result["data"]);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#result").html("No data for this location");
    },
  });
});

$("#weatherBtn").click(function () {
  $.ajax({
    url: "libs/php/weather.php",
    type: "POST",
    dataType: "json",
    data: {
      lat: $("#weatherLat").val(),
      lng: $("#weatherLng").val(),
    },
    success: function (result) {
      $("#result").html("Weather temperature: " + result["data"] + "&#8451;");
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#result").html("No data for this location");
    },
  });
});
