<?php
include 'error_config.php';

if(isset($_GET['seccion'])){
    
    
    try{
        
        include('../../conexion.php');
        
        $sql = "SELECT  * FROM seccion";
        
        $resultado = mysqli_query($conexion, $sql );
        
        if($resultado){
            $datos = array();
            while ($fila = mysqli_fetch_assoc($resultado) ) {
                $datos[] = $fila;
            }
        }
        
        
        echo json_encode(['mensaje' => 'Se cargaron los datos exitosamente', 'datos' => $datos ] );
        
        
        mysqli_free_result($resultado);
        mysqli_close($conexion);
        
        
    } catch (Exception $e) {
        // echo json_encode( [ 'mensaje' => 'Error, ' .  $e->getMessage() . "cargarSelectEmpresa.php" . " : LINEA  : " . __LINE__  ] );
        error_log("Error en " . $e->getFile() . " en la línea " . $e->getLine() . ": " . $e->getMessage());
        echo json_encode(['mensaje' => 'Ocurrió un error.']);
        // echo json_encode( [ 'mensaje' => 'Error, ' .  $e->getMessage() . "cargarSelectEmpresa.php" . " : LINEA  : " . __LINE__  ] );
        error_log("Error en " . $e->getFile() . " en la línea " . $e->getLine() . ": " . $e->getMessage());
        echo json_encode(['mensaje' => 'Ocurrió un error.']);
    }
}
?>