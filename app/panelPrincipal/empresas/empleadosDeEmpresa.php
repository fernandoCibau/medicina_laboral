<?php
if( isset($_GET['idEmpresa'])){
    try {
    
        include '../../conexion.php';

        $idEmpresa = $_GET['idEmpresa'];

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

                    empresas emp ON e.id_empresa = emp.id WHERE id_empresa='$idEmpresa' ";

        $resultado = mysqli_query($conexion, $sql);
        
        if($resultado){
            $datos = array();
            while ( $fila = mysqli_fetch_assoc($resultado)) {
                $datos[] = $fila;
            }

            echo json_encode( ['mensaje' => 'Se cargaron los datos exitosamente', 'datos'=> $datos ]);
        }else{
            echo json_encode( ['mensaje' => 'No se encontraron datos de la empresa' ]);
        }
        
        mysqli_free_result($resultado);
        mysqli_close($conexion);
    } catch (Exception $e) {
        echo json_encode( [ 'mensaje' => 'Error, ' .  $e->getMessage() . "empleadosEmpresa.php" . " : LINEA  : " . __LINE__  ] );
    }

}else{
    echo json_encode( ['mensaje' => 'Error, no se recibio ningun idEmpresa | LINEA' . __LINE__ ]);
    
}

?>