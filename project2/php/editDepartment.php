<?php

  require("config.php");

  $sql = "SELECT id, name, locationID FROM department WHERE id = ".$_REQUEST['id'];
  $result = $config->query($sql);
  $department = $result->fetch();
    
  $holder['name'] = $department['name'];
  $holder['id'] = $department['id'];
  $holder['location'] = $department['locationID'];

  echo json_encode($holder);
                  
?>