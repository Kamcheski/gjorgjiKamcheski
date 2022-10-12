<?php 
    
    require('config.php');
    
    $sql = "SELECT p.firstName, d.name as department FROM personnel p LEFT JOIN department d ON (d.id = p.departmentID) WHERE departmentID = ".$_POST['id'];
    $result = $config->query($sql);
    $array =[];
    foreach($result as $row){

        array_push($array, $row);
    }

    echo json_encode($array);
?>