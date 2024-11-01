<?php

if( isset($_GET['consulta']) ){
    include 'conexion.php';

    $consulta = $_GET['consulta'];

    $sql = "SELECT * FROM empresa WHERE nombre LIKE '$consulta%' ";

    $resultado = mysqli_query($conexion, $sql);

    if($resultado){

        $datos = array();
        while($fila = mysqli_fetch_assoc($resultado) ){
            $datos[] = $fila;
        }

        echo json_encode(['mensaje' => 'SEEE', 'datos' => $datos ]);
    }else{
        echo json_encode(['mensaje' => 'Problemas en la busqueda : '. __LINE__ ]);
    }

}else{
    echo json_encode(['mensaje' => 'NOOO'] );
}

?>