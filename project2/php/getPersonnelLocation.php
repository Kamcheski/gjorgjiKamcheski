<?php 
    
    require('config.php');
    
    $sql = "SELECT d.name as department, l.name as location FROM department d LEFT JOIN location l ON (l.id = d.locationID) WHERE l.id =".$_POST['id'];
    $result = $config->query($sql);
    $array =[];
    foreach($result as $row){

        array_push($array, $row);
    }
    
    echo json_encode($array);
?>