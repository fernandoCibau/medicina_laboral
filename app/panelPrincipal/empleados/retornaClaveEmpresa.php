<?php

include "../../conexion.php";

// Obtener el nombre de la empresa desde la solicitud POST
$empresaNombre = $_POST['empresa'] ?? '';

// Verificar si se ha recibido un nombre de empresa
if (empty($empresaNombre)) {
    echo json_encode(['operacion' => false, 'mensaje' => 'No se recibió el nombre de la empresa.']);
    exit();
}

// Preparar la consulta SQL para obtener el ID de la empresa
$query = "SELECT id FROM empresas WHERE razon_social = ?";
$stmt = $conexion->prepare($query);
$stmt->bind_param("s", $empresaNombre);
$stmt->execute();
$result = $stmt->get_result();

// Verificar si se encontró la empresa
if ($result->num_rows > 0) {
    $empresa = $result->fetch_assoc();
    echo json_encode(['operacion' => true, 'id_empresa' => $empresa['id']]);
} else {
    echo json_encode(['operacion' => false, 'mensaje' => 'Empresa no encontrada.']);
}

// Cerrar la conexión
$stmt->close();
$conexion->close();
?>
