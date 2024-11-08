<?php
if(isset($_GET['idEmpresa'])){
    
    try{
        
        include('../conexion.php');
        
        $idEmpresa = $_GET['idEmpresa'];

        if( empty( $idEmpresa ) ){
            $sql = "SELECT  * FROM empresas";
        }else{
            $sql = "SELECT  * FROM empresas WHERE id='$idEmpresa' ";
        }

        $resultado = mysqli_query($conexion, $sql );

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
        $error = "Error en " . $e->getFile() . " en la línea " . $e->getLine() . ": " . $e->getMessage();
        echo json_encode(['mensaje' => 'Ocurrió un error', 'error'=> $error ]);
    }
}
?>