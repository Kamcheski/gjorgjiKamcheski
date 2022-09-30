<?php

$executionStartTime = microtime(true);

$dataBorders = json_decode(file_get_contents("../json/countryBorders.geo.json"), true);

    $border;

    foreach ($dataBorders['features'] as $feature) 

    if ($feature["properties"]["iso_a2"] ==  $_REQUEST['request']) {
       
        $border = $feature;
        break;
    }


echo json_encode($border);

?>