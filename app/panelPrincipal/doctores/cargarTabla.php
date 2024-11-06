<?php
if(isset($_GET['todos']) ){
    try {

        include '../../conexion.php';
        
        $sql = "SELECT * FROM medicos";
        
        $resultado = mysqli_query($conexion, $sql);
        
        if($resultado){

            $datos = array();
            while ($fila = mysqli_fetch_assoc($resultado) ) {
                $datos[] = $fila;
            }
            
            echo json_encode(['mensaje' => 'Datos cargados exitosamente...!', 'datos' => $datos, 'operacion'=> TRUE] );
    
            mysqli_close($conexion);
            mysqli_free_result($resultado);
        
        }else{
            echo json_encode([ "mensaje" => "Error, en la busque da datos |  cargar tabla : Linea : " . __LINE__ ] );
        }

    } catch (Exception $e) {
        $error = "Error en " . $e->getFile() . " en la línea " . $e->getLine() . ": " . $e->getMessage();
        echo json_encode(['mensaje' => 'Ocurrió un error', 'error'=> $error ]);
    }
}
?>

