<?php
if( isset($_GET['medicos'])){
    
    try{
        
        include('../conexion.php');
        
        $sql = "SELECT  * FROM medicos";
        
        $resultado = mysqli_query($conexion, $sql );
        
        if($resultado){
            $datos = array();
            while ($fila = mysqli_fetch_assoc($resultado) ) {
                $datos[] = $fila;
            }
            
            echo json_encode(['mensaje' => 'Se cargaron los datos exitosamente', 'datos' => $datos ] );
        }else{
            echo json_encode(['mensaje' => 'Error, No se puedieron cargar los medicos' ] );
        }
        
        mysqli_free_result($resultado);
        mysqli_close($conexion);
        
    } catch (Exception $e) {
        $error = "Error en " . $e->getFile() . " en la línea " . $e->getLine() . ": " . $e->getMessage();
        echo json_encode(['mensaje' => 'Ocurrió un error', 'error'=> $error ]);
    }
}
?>