<?php
if(isset( $_GET['fecha'] ) && isset($_GET['hora']) ){
    try{
        include '../conexion.php';
        
        $fecha = $_GET['fecha'];
        $hora   = $_GET['hora'];
        
        $sql = "DELETE FROM turnos WHERE fecha='$fecha' and hora='$hora' ";
        
        $resultado = mysqli_query($conexion, $sql);
        
        if($resultado){
            echo json_encode( ['mensaje' => 'Se elimino correctamente el turno'] );
        }else{
        echo json_encode( ['mensaje' => 'Error, no se puede eliminar el turno : ' . __LINE__] );
        }
        
        mysqli_close($conexion);

    } catch (Exception $e) {
        $error = "Error en " . $e->getFile() . " en la línea " . $e->getLine() . ": " . $e->getMessage();
        echo json_encode(['mensaje' => 'Ocurrió un error', 'error'=> $error ]);
    }
}else{
    echo json_encode( ['mensaje' => 'Error con los datos fecha y hora, LINEA :  ' . __LINE__] );
}
?>