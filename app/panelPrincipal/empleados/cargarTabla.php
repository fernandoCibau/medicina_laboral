<?php

if(isset($_GET['todos']) ){

    try {

        include '../../conexion.php';
        
        $sql = "SELECT 
                    e.id,
                    e.legajo,
                    e.dni,
                    e.nombre,
                    e.apellido,
                    e.domicilio,
                    e.fecha_nacimiento,
                    e.fecha_ingreso,
                    c.nombre AS categoria_nombre,
                    s.nombre AS seccion_nombre,
                    emp.razon_social AS empresa_nombre,
                    e.observaciones
                FROM
                    empleados e
                LEFT JOIN 
                    categorias c ON e.id_categoria = c.id
                LEFT JOIN 
                    seccion s ON e.id_seccion = s.id
                LEFT JOIN 
                    empresas emp ON e.id_empresa = emp.id
                ORDER BY 
                    e.id DESC";
        
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

