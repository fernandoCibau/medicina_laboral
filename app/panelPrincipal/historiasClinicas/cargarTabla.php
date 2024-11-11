<?php

if(isset($_GET['todos']) ){

    try {

        include '../../conexion.php';
        
        $sql = "SELECT 
                    cm.id AS consulta_id,
                    cm.fecha,
                    cm.medico_certificado,
                    cm.diagnostico_cie10,
                    cm.solicitud_ausentismo,
                    cm.fecha_inicio_ausentismo,
                    cm.fecha_fin_ausentismo,
                    cm.observaciones,
                    e.nombre AS empleado_nombre,
                    e.apellido AS empleado_apellido,
                    e.id_empresa AS empleado_empresa,
                    emp.razon_social AS empresa_razon_social
                FROM 
                    consultamedica cm
                JOIN 
                    empleados e ON cm.id_empleado = e.id
                JOIN 
                    empresas emp ON e.id_empresa = emp.id
                ORDER BY
                    cm.id DESC;";
        
        $resultado = mysqli_query($conexion, $sql);
        
        if($resultado){

            $datos = array();
            while ($fila = mysqli_fetch_assoc($resultado) ) {
                $datos[] = $fila;
            }
            
            echo json_encode(['mensaje' => 'Datos cargados exitosamente...!', 'datos' => $datos, 'operacion'=> TRUE] );
    
            mysqli_close($conexion);
            mysqli_free_result($resultado);
        
        }else{
            echo json_encode([ "mensaje" => "Error, en la busque da datos |  cargar tabla : Linea : " . __LINE__ ] );
        }

    } catch (Exception $e) {
        echo json_encode( [ 'mensaje' => 'Error, ' .  $e->getMessage() . "cargarTabla.php" . " : LINEA  : " . __LINE__  ] );
    }
}
?>

