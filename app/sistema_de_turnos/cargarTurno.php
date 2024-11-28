<?php
if( isset($_GET['idDelDia'])){
    try {
        
        include '../conexion.php';
        
        $fecha = $_GET['idDelDia'];
        
        $sql = "SELECT EMPL.nombre AS Empleado, EMPR.razon_social AS Empresa, T.fecha,  T.hora 
                FROM turnos T 
                    JOIN empleados EMPL ON T.empleado_id = EMPL.id
                    JOIN empresas EMPR ON T.empresa_id = EMPR.id
                WHERE T.fecha='$fecha' ";


        $resultado = mysqli_query($conexion, $sql);

        if($resultado){

            $datos = array();
            while ($fila = mysqli_fetch_assoc($resultado) ) {
                $datos[] = $fila;
            }
            
            mysqli_free_result($resultado);
            echo json_encode(['mensaje' => 'Datos cargados exitosamente...!', 'datos' => $datos, 'operacion'=> TRUE] );
            
            mysqli_close($conexion);
            
        }else{
            echo json_encode(['mensaje' => 'Error en la carga de datos : ' . __LINE__ ]);
        }
    } catch (Exception $e) {
        $error = "Error en " . $e->getFile() . " en la línea " . $e->getLine() . ": " . $e->getMessage();
        echo json_encode(['mensaje' => 'Ocurrió un error', 'error'=> $error ]);
    }
}else{
    echo json_encode(['mensaje' => 'Error al obtener el  idDelDia : ' . __LINE__ ]);
}



?>