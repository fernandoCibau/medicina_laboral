<?php 
include "error_config.php";
include "../../conexion.php";
if (!$conexion) {
    echo json_encode(['mensaje' => 'Error de conexión a la base de datos', 'operacion' => false]);
    exit; // Detiene la ejecución si no hay conexión
}

if (isset($_POST['dni'])) {
    try {

        // Asignación de variables con valores por defecto
        $legajo = isset($_POST['legajo']) ? $_POST['legajo'] : null;
        $dni = $_POST['dni'];
        $apellido = $_POST['apellido'];
        $nombre = $_POST['nombre'];
        $domicilio = isset($_POST['domicilio']) ? $_POST['domicilio'] : null;
        $fecha_nacimiento = $_POST['fecha_nac'];
        $fecha_ingreso = isset($_POST['fecha_ing']) ? $_POST['fecha_ing'] : null;
        $id_categoria = $_POST['id_categoria'];
        $id_seccion = $_POST['id_seccion'];
        $observaciones = isset($_POST['observaciones']) ? $_POST['observaciones'] : null;
        $id_empresa = $_POST['id_empresa'];

        $sql= "SELECT * FROM empleados WHERE dni = '$dni'";
        $resultado = mysqli_query($conexion, $sql);
        if(mysqli_num_rows($resultado)){
            mysqli_free_result($resultado);
            echo json_encode( ['mensaje' => 'El empleado ya existe', 'operacion' => FALSE]);
        } else {
            $sql = "INSERT INTO empleados (legajo, dni, nombre, apellido, domicilio, fecha_nacimiento, fecha_ingreso, id_categoria, id_seccion, observaciones, id_empresa) VALUES ('$legajo', '$dni', '$nombre', '$domicilio', '$fecha_nacimiento', '$fecha_ingreso', '$id_categoria', '$id_seccion', '$observaciones', '$id_empresa')";
            $resultado = mysqli_query($conexion, $sql);
            if($resultado) {
                echo json_encode(['mensaje' => 'Empleado agregado con exito.', 'dni' => $dni , 'operacion'=> TRUE]);
            } else {
                echo json_encode(['mensaje' => 'Error al guardar los datos: ']);
            }
        }
        mysqli_close($conexion);            
    } catch (Exception $e) {
        error_log("Error en " . $e->getFile() . " en la linea " . $e->getLine() . ": " . $e->getMessage());
        echo json_encode(['mensaje' => 'Ocurrio un error', 'operacion' => FALSE]);
    }
} else {
    echo json_encode(['mensaje' => 'Error al recibir los datos', 'operacion' => FALSE]);
}       
exit;
?>