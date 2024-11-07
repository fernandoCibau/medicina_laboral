<?php
if ( isset($_GET['buscarPor']) || isset($_GET['caracteres']) ) {
    try{

        include "../../conexion.php";
        
        $buscarPor        = $_GET['buscarPor'];
        $caracteres        = $_GET['caracteres'];

        if( $buscarPor == "nombre" ){
            $sql = "SELECT * FROM medicos WHERE nombre LIKE '$caracteres%' ";
        }

        if( $buscarPor == "especialidad" ){
            $sql = "SELECT * FROM medicos WHERE especialidad LIKE '$caracteres%' ";
        }

        if( $buscarPor == "todos" ){
            $sql = "SELECT * FROM medicos";
        }
        
        
        $resultado = mysqli_query($conexion, $sql);
        
        if( mysqli_num_rows($resultado) ){
            $datos = array();
            while ($fila = mysqli_fetch_assoc($resultado) ) {
                $datos[] = $fila;
            }

            echo json_encode(['mensaje' => 'Se encontraron medicos con éxito', 'datos'=>$datos, 'operacion' => TRUE]);
        }else{
            echo json_encode(['mensaje' => 'ERROR, No se encontraron medicos ' , 'operacion' => FALSE] )  ;
        }
        
        mysqli_close($conexion);
        mysqli_free_result($resultado);
        
    } catch (Exception $e) {
        $error = "Error en " . $e->getFile() . " en la línea " . $e->getLine() . ": " . $e->getMessage();
        echo json_encode(['mensaje' => 'Ocurrió un error', 'error'=> $error ]);
    }

}else{
    echo json_encode(['mensaje' => 'No se recibieron datos suficientes desde el formulario',  'operacion' => FALSE ]);
}
?>