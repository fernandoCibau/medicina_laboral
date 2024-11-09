<?php
if (isset($_GET['anioYMes']) && isset($_GET['cantidadDeDias'])) {
    try {
        
        include '../conexion.php';
        
        $cantidadDeDias = $_GET['cantidadDeDias'];
        $listaDeTurnos = array();
        
        //Busca la cantidad de turnos de cada dia del mes.
        for ($i=0; $i <$cantidadDeDias ; $i++) {
            $fecha = $_GET['anioYMes'] . "-" . $i+1;

            $query = "SELECT * FROM turnos WHERE fecha='$fecha' ";
            $resultado = mysqli_query($conexion, $query);
            
            $turnos = mysqli_num_rows($resultado);
            
            $listaDeTurnos[$i] = ['fecha' => $fecha, 'turnos' => $turnos];
        }
            
        echo json_encode($listaDeTurnos);
            
        mysqli_close($conexion);
        mysqli_free_result($resultado);
            
    } catch (Exception $e) {
        $error = "Error en " . $e->getFile() . " en la línea " . $e->getLine() . ": " . $e->getMessage();
        echo json_encode(['mensaje' => 'Ocurrió un error', 'error'=> $error ]);
    }
}else{
    echo json_encode(['mensaje' => 'Ocurrió un error : '. __LINE__]);
}
?>