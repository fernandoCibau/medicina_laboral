<?php
if(isset($_GET['empresas'])){

    try{

        include('conexion.php');
        
        $sql = "SELECT  * FROM empresasClientes";
        
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
        echo json_encode( [ 'mensaje' => 'Error, ' .  $e->getMessage() . "cargarSelectEmpresa.php" . " : LINEA  : " . __LINE__  ] );
    }


}
?>