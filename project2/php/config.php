<?php

    $servername = "localhost";
    $username = "u471913926_username";
    $password = "username";
    $dbname = "u471913926_directory";

    $config = new PDO("mysql:host=$servername;dbname=$dbname",$username, $password);
    $config->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
?>
