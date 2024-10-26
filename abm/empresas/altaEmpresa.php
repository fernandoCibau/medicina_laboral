<?php
if (isset($_POST['razon_social']) && isset($_POST['cuit']) && isset($_POST['email'])) {
    try {
        include "../../conexion.php";

        $razon_social = $_POST['razon_social'];
        $cuit = $_POST['cuit'];
        $domicilio = isset($_POST['domicilio']) ? $_POST['domicilio'] : null;
        $telefono = isset($_POST['telefono']) ? $_POST['telefono'] : null;
        $email = $_POST['email'];

        // Preparar la consulta para verificar si la razon_social ya existe
        $stmt = $conexion->prepare("SELECT * FROM empresasclientes WHERE cuit = ?");
        $stmt->bind_param("i", $cuit);
        $stmt->execute();
        $resultado = $stmt->get_result();

        if ($resultado->num_rows > 0) {
            echo json_encode(['mensaje' => 'ERROR. La empresa ya existe.', 'operacion' => FALSE]);
        } else {
            // Preparar la consulta de inserción
            $stmt = $conexion->prepare("INSERT INTO empresasclientes (razon_social, cuit, domicilio, telefono, email) VALUES (?, ?, ?, ?, ?)");
            $stmt->bind_param("sisis", $razon_social, $cuit, $domicilio, $telefono, $email);
            $resultado = $stmt->execute();

            if ($resultado) {
                echo json_encode(['mensaje' => 'La empresa se registró con éxito', 'operacion' => TRUE]);
            } else {
                echo json_encode(['mensaje' => 'Error, no se pudo registrar. Línea: ' . __LINE__, 'operacion' => FALSE]);
            }
        }
    } catch (Exception $e) {
        echo json_encode(['mensaje' => 'Error: ' . $e->getMessage(), 'linea' => __LINE__, 'operacion' => FALSE]);
    }
} else {
    echo json_encode(['mensaje' => 'No se recibieron datos desde el formulario']);
}

// Cerrar la conexión
$conexion->close();
?>