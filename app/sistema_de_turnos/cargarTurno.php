<?php

if( isset($_GET['idDelDia'])){
    include 'conexion.php';

    $fecha = $_GET['idDelDia'];
    $sql = "SELECT * FROM turnos WHERE fecha='$fecha'";

    $resultado = mysqli_query($conexion, $sql);

    
    if($resultado){
        $datos = array();
        while ($fila = mysqli_fetch_assoc($resultado) ) {
            $datos[] = $fila;
        }
        
        mysqli_free_result($resultado);
        echo json_encode(['mensaje' => 'Datos cargados exitosamente...!', 'datos' => $datos, 'operacion'=> TRUE] );
        
        mysqli_close($conexion);

    }else{
        echo json_encode(['mensaje' => 'Error en la carga de datos : ' . __LINE__ ]);
    }
}else{
    echo json_encode(['mensaje' => 'Error al obtener el  idDelDia : ' . __LINE__ ]);
}



?>