<?php
  
  require('config.php');


  $sql = "SELECT p.lastName, p.firstName, p.jobTitle, p.id, p.email, d.name as department, l.name as location FROM personnel p LEFT JOIN department d ON (d.id = p.departmentID) LEFT JOIN location l ON (l.id = d.locationID) ORDER BY p.lastName";
  $result = $config->query($sql);
  $array =[];
  foreach($result as $row){

    array_push($array, $row);
  }

  echo json_encode($array);

?>