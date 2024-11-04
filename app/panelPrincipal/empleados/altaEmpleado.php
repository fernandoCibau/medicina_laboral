<?php
header('Content-Type: application/json');

if (isset($_POST['id_empresa'], $_POST['legajo'], $_POST['dni'], $_POST['apellido'], $_POST['nombre'], $_POST['fecha_nacimiento'])) {
    try {
        include "../../conexion.php";

        // Mostrar datos recibidos para depuración
        var_dump($_POST);  // Para verificar que se reciben los datos correctamente

        // Asignación de variables
        $id_empresa = $_POST['id_empresa'];
        $legajo = $_POST['legajo'];
        $dni = $_POST['dni'];
        $apellido = $_POST['apellido'];
        $nombre = $_POST['nombre'];
        $domicilio = $_POST['domicilio'] ?? null;
        $fecha_nacimiento = $_POST['fecha_nacimiento'];
        $fecha_ingreso = $_POST['fecha_ingreso'] ?? null;
        $id_categoria = $_POST['id_categoria'] ?? null;
        $id_seccion = $_POST['id_seccion'] ?? null;
        $observaciones = $_POST['observaciones'] ?? null;

        // Verificar si el empleado ya existe por DNI
        $stmt = $conexion->prepare("SELECT 1 FROM empleados WHERE dni = ?");
        $stmt->bind_param("i", $dni);
        $stmt->execute();
        $resultado = $stmt->get_result();

        if ($resultado->num_rows > 0) {
            echo json_encode(['mensaje' => 'ERROR. El empleado ya existe.', 'operacion' => false]);
        } else {
            // Preparar la consulta de inserción
            $stmt = $conexion->prepare("INSERT INTO empleados (legajo, dni, nombre, apellido, domicilio, fecha_nacimiento, fecha_ingreso, id_categoria, id_seccion, observaciones, id_empresa) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
            
            // Bind de parámetros, permitiendo null para id_categoria e id_seccion
            $stmt->bind_param(
                "iisssssiisi", 
                $legajo, 
                $dni, 
                $nombre, 
                $apellido, 
                $domicilio, 
                $fecha_nacimiento, 
                $fecha_ingreso,
                $id_categoria, 
                $id_seccion, 
                $observaciones, 
                $id_empresa
            );

            // Ejecutar y verificar la consulta de inserción
            if ($stmt->execute()) {
                echo json_encode(['mensaje' => 'El empleado se registró con éxito', 'operacion' => true]);
            } else {
                echo json_encode(['mensaje' => 'Error en la inserción: ' . $stmt->error, 'operacion' => false]);
            }
        }

        // Cerrar la declaración
        $stmt->close();
    } catch (Exception $e) {
        echo json_encode(['mensaje' => 'Error: ' . $e->getMessage(), 'linea' => __LINE__, 'operacion' => false]);
    }
} else {
    echo json_encode(['mensaje' => 'No se recibieron datos suficientes desde el formulario', 'operacion' => false]);
}

// Cerrar la conexión
$conexion->close();
?>