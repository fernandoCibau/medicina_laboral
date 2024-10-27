<?php
if( isset($_GET['idEmpresa'])){
    try {
    
        include '../../conexion.php';

        $idEmpresa = $_GET['idEmpresa'];

        $sql = "SELECT * FROM  empleados WHERE id_empresa='$idEmpresa' ";

        $resultado = mysqli_query($conexion, $sql);
        
        if($resultado){
            $datos = array();
            while ( $fila = mysqli_fetch_assoc($resultado)) {
                $datos[] = $fila;
            }

            echo json_encode( ['mensaje' => 'Se cargaron los datos exitosamente', 'datos'=> $datos ]);
        }else{
            echo json_encode( ['mensaje' => 'No se encontraron datos de la empresa' ]);
        }
        
        mysqli_free_result($resultado);
        mysqli_close($conexion);
    } catch (Exception $e) {
        echo json_encode( [ 'mensaje' => 'Error, ' .  $e->getMessage() . "empleadosEmpresa.php" . " : LINEA  : " . __LINE__  ] );
    }

}else{
    echo json_encode( ['mensaje' => 'Error, no se recibio ningun idEmpresa | LINEA' . __LINE__ ]);
    
}

?>