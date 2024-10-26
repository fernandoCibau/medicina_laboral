<?php

if(isset($_GET['todos']) ){

    include 'conexion.php';



    $sql = "SELECT * FROM empresas";

    $resultado = mysqli_query($conexion, $sql);

    if($resultado){

        $datos = array();
        while ($fila = mysqli_fetch_assoc($resultado) ) {
            $datos[] = $fila;
        }

        echo json_encode(['mensaje' => 'Datos cargados exitosamente...!', 'datos' => $datos, 'operacion'=> TRUE] );
    
        mysqli_close($conexion);


    }else{
        echo json_encode([ "mensaje" => "NOOOOOO" ] );
    }
}



?>

