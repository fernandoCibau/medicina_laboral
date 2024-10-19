<?php

if (isset($_GET['anioYMes']) && isset($_GET['cantidadDeDias'])) {
        include 'conexion.php';

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

    }else{
        echo json_encode(['mensaje' => 'Error con el envio de anioYMes o cantidadDeDias : '. __LINE__]);
    }


?>