<?php
    // $servidor           = 'localhost';
    // $usuario  = 'u833023896_medicina_lab';
    // $baseDeDatos    = 'u833023896_medicina_lab';
    // $contrasenia   = '=n*~Th&aT4';

    $servidor           = 'localhost';
    $usuario             = 'root';
    $contrasenia        = '';
    $baseDeDatos    = 'el_salvador';
    
    try{
        @$conexion = mysqli_connect( $servidor, $usuario, $contrasenia, $baseDeDatos     ) ;
        // or exit("NO SE PUDO ESTABLECER LA CONEXION " . _LINE_);  //ESTE NO FUNCIONA PORQUE NO LO ESTOY MANDANDO AL HTML
        
    } catch (PDOException $e) {
        $mensaje = "ERROR AL CONECTAR CON LAS BASE DE DATOS " . $e->getMessage();

        // error( $mensaje,  $linea = __LINE__);
        echo json_encode( $mensaje);
    }
?>
