<?php
    if(isset($_POST["name"]) && isset($_POST["email"]) && isset($_POST["phone"]) && isset($_POST["subject"]) && isset($_POST["message"])){
        $nombre = $_POST["name"];
        $email = $_POST["email"];
        $telefono = $_POST["phone"];
        $asunto = $_POST["subject"];
        $mensaje = $_POST["message"];
        $de = "From: nachomelga123@gmail.com";

        $menEnt = $nombre.$email.$asunto.$mensaje;

        
        mail($email,$asunto,$mensaje,$de);

        echo json_encode(['mensa'=> $menEnt]);

    }
?>