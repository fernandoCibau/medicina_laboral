<?php
if( isset($_GET['medicos'])){

    try{

        include('conexion.php');
        
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
        echo json_encode( [ 'mensaje' => 'Error, ' .  $e->getMessage() . "cargarSelectMedicos.php" . " : LINEA  : " . __LINE__  ] );
    }
}
?>