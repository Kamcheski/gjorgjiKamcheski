<?php

    require('config.php');
    
    $stmt = $config->prepare("DELETE FROM location WHERE id = ".$_POST['id']);

    $result = $stmt->execute();
    
    if (!$result) {

        $output['status']['code'] = "400";
        $output['status']['name'] = "executed";
        $output['status']['description'] = "query failed";	
        $output['data'] = [];

        mysqli_close($config);

        echo json_encode($output); 

        exit;

    }

    $output['status']['code'] = "200";
    $output['status']['name'] = "ok";
    $output['status']['description'] = "success";
    $output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
    $output['data'] = [];

    echo json_encode($output);
?>