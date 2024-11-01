<?php
if(isset($_GET['fecha'])){

    try{

        include('conexion.php');
        
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
        echo json_encode( [ 'mensaje' => 'Error, ' .  $e->getMessage() . "buscarHorarios.php" . " : LINEA  : " . __LINE__  ] );
    }


}
?>