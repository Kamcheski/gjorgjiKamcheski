<?php

  require("config.php");

  $sql = "SELECT id, firstName, lastName, email FROM personnel WHERE id = ".$_REQUEST['id'];
  $result = $config->query($sql);
  $person = $result->fetch();

    
  $holder['firstName'] = $person['firstName'];
  $holder['lastName'] = $person['lastName'];
  $holder['id'] = $person['id'];
  $holder['email'] = $person['email'];


  echo json_encode($holder);
                  
?>