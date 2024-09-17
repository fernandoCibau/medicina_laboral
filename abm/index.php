<?php
    session_start();
    if( !isset( $_SESSION["usuario"]["idSesion"] ) ){
        header( "location: ../index.php");
        exit;
    }

    if( $_SESSION['usuario']['admin'] ){
        header('Location: ../admin');
        exit; 
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Medicina Laboral | Inicio</title>
</head>
<body>
    <header>
        <h1>BIENVANIDO A MEDICINA LABORAL</h1>
    </header>
</body>
</html>