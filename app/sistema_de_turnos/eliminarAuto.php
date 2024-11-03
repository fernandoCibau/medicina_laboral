<?php
include '../error_config.php';
if (!isset( $_GET['fecha'] )) {
    try{
        include '../conexion.php';
        
        $diasDelMes = cal_days_in_month(CAL_GREGORIAN, date('m'), date('y')); //Constante que representa el calendatio gregoriano
        
        for ($i=0; $i < $diasDelMes ; $i++) { 
            $fecha = date('Y') . '-' . (date('m') - 1) . '-' .  ($i + 1) ;
            $sql = "DELETE FROM turnos WHERE fecha='$fecha' ";
            $resultado = mysqli_query($conexion, $sql);
        }
        
        if($resultado){
            echo json_encode( ['mensaje' => 'Se elimino correctamente los turnos hasta la fecha : ' . $fecha, 'fecha'=> $fecha]);
        }else{
            echo json_encode( ['mensaje' => 'Error, en la eliminacion automatica : '. __LINE__] );
        }
    
        mysqli_close($conexion);
    } catch (Exception $e) {
        error_log("Error en " . $e->getFile() . " en la línea " . $e->getLine() . ": " . $e->getMessage());
        echo json_encode(['mensaje' => 'Ocurrió un error.']);
    }
}else{
    echo json_encode( ['mensaje' => 'Error, con los datos de auto eliminar LINEA :  ' . __LINE__] );
}
?>