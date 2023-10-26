

<?php



    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "companydirectory";

    $config = new PDO("mysql:host=$servername;dbname=$dbname",$username, $password);
    $config->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
?>
