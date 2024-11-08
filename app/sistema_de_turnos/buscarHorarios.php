<?php
if(isset($_GET['fecha'])){

    try{

        include('../conexion.php');
        
        $fecha = $_GET['fecha'];

        $sql = "SELECT hora FROM turnos WHERE fecha='$fecha' ";
        
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
        error_log("Error en " . $e->getFile() . " en la línea " . $e->getLine() . ": " . $e->getMessage());
        echo json_encode(['mensaje' => 'Ocurrió un error.']);
    }


}
?>