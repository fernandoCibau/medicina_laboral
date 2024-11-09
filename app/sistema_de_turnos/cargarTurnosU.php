<?php
if( isset($_GET['idEmpresa'])){
    try {
        
        include '../conexion.php';
        
        $idEmpresa = $_GET['idEmpresa'];
        

        $sql = "SELECT EMPL.nombre AS Empleado, EMPR.razon_social AS Empresa, T.fecha, M.nombre AS Medico, T.hora 
        FROM turnos T
            JOIN empleados EMPL ON T.empleado_id = EMPL.id
            JOIN empresas EMPR ON T.empresa_id = EMPR.id
            JOIN medicos M ON T.medico = M.id
            WHERE T.empresa_id = '$idEmpresa' ";


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