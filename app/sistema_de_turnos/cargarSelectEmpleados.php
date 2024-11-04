<?php
include '../error_config.php';
if(isset($_GET['idEmpresa'])){
    
    try{
        
        include('../conexion.php');
        
        $idEmpresa = $_GET['idEmpresa'];

        $sql = "SELECT  * FROM empleados WHERE id_empresa='$idEmpresa' ";
        
        $resultado = mysqli_query($conexion, $sql );
        
        if($resultado){
            $datos = array();
            while ($fila = mysqli_fetch_assoc($resultado) ) {
                $datos[] = $fila;
            }
        }
        
        echo json_encode(['mensaje' => 'Se cargaron los datos exitosamente', 'datos' => $datos ] );
        
        mysqli_close($conexion);
    } catch (Exception $e) {
        // echo json_encode( [ 'mensaje' => 'Error, ' .  $e->getMessage() . "cargarSelectEmpleado.php" . " : LINEA  : " . __LINE__  ] );
        error_log("Error en " . $e->getFile() . " en la línea " . $e->getLine() . ": " . $e->getMessage());
        echo json_encode(['mensaje' => 'Ocurrió un error.']);
    }
}
?>