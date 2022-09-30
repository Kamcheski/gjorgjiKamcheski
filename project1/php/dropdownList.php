<?php

$executionStartTime = microtime(true);

$dataList = json_decode(file_get_contents("../json/countryBorders.geo.json"), true);

    $dropdownList = [];
  
    foreach ($dataList['features'] as $feature) {

         $countries;
         $countries['countryCode'] = $feature["properties"]['iso_a2'];
         $countries['name'] = $feature["properties"]['name'];

         array_push($dropdownList, $countries); 

     
    };

    usort($dropdownList, function ($countriesA, $countriesB) {

         return $countriesA['name'] <=> $countriesB['name'];
    });

    echo json_encode($dropdownList)

?>
