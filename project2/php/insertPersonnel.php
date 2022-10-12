<?php
    
    if(isset($_POST['firstName'])){
    
        include("config.php");

        $stmt = $config->prepare("INSERT INTO personnel (firstName, lastName, email) VALUES (:firstName, :lastName, :email)");
        $stmt->bindParam(':firstName', $_POST['firstName']);
        $stmt->bindParam(':lastName', $_POST['lastName']);
        $stmt->bindParam(':jobTitle', $_POST['jobTitle']);
        $stmt->bindParam(':email', $_POST['email']);
        $stmt->bindParam(':departmentID', $_POST['departmentID']);
   
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
    }

?>