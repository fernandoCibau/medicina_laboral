<?php

if(isset($_GET['idEmpresa']) ){

    try {

        include '../../conexion.php';
        
        $idEmpresa =$_GET['idEmpresa'];

        if($idEmpresa){
            $sql = "SELECT 
                                EMPL.id,
                                EMPL.legajo,
                                EMPL.dni,
                                EMPL.nombre,
                                EMPL.apellido,
                                EMPL.domicilio,
                                EMPL.fecha_nacimiento,
                                EMPL.fecha_ingreso,
                                EMPR.razon_social AS empresa_nombre,
                                EMPL.observaciones
                        FROM empleados EMPL 
                            LEFT JOIN empresas EMPR ON EMPL.id_empresa = EMPR.id
                        WHERE EMPR.id = '$idEmpresa'
                        ORDER BY EMPL.id_empresa  ASC";
        }else{

            $sql = "SELECT 
                    e.id,
                    e.legajo,
                    e.dni,
                    e.nombre,
                    e.apellido,
                    e.domicilio,
                    e.fecha_nacimiento,
                    e.fecha_ingreso,
                    emp.razon_social AS empresa_nombre,
                    e.observaciones
                FROM
                    empleados e
                LEFT JOIN 
                    empresas emp ON e.id_empresa = emp.id
                ORDER BY 
                    e.id DESC";
        }
        
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

