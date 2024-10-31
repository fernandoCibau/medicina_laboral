<?php
if (isset($_POST['id']) && (isset($_POST['matricula']) || isset($_POST['dni']) || isset($_POST['apellido']) || isset($_POST['nombre']))) {
    try {
        include "../../conexion.php";

        $id = $_POST['id'];
        $matricula = $_POST['matricula'] ?? null;
        $dni = $_POST['dni'] ?? null;
        $apellido = $_POST['apellido'] ?? null;
        $nombre = $_POST['nombre'];

        // Verificar si la empresa con el id existe
        $stmt = $conexion->prepare("SELECT * FROM doctores WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $resultado = $stmt->get_result();

        if ($resultado->num_rows > 0) {
            // Construir la consulta de actualización dinámicamente según los campos proporcionados
            $campos = [];
            $valores = [];
            $tipos = "";

            if ($matricula) {
                $campos[] = "matricula = ?";
                $valores[] = $matricula;
                $tipos .= "i";
            }

            if ($dni) {
                $campos[] = "dni = ?";
                $valores[] = $dni;
                $tipos .= "i";
            }

            if ($apellido) {
                $campos[] = "apellido = ?";
                $valores[] = $apellido;
                $tipos .= "s";
            }

            if ($nombre) {
                $campos[] = "nombre = ?";
                $valores[] = $nombre;
                $tipos .= "s";
            }

            // Unir los campos actualizables con comas
            $sql = "UPDATE doctores SET " . implode(", ", $campos) . " WHERE id = ?";
            $stmt = $conexion->prepare($sql);

            // Añadir el id al final de los valores
            $valores[] = $id;
            $tipos .= "i";

            // Usar array para pasar los parámetros a bind_param
            $stmt->bind_param($tipos, ...$valores);

            // Ejecutar la consulta
            $resultado = $stmt->execute();

            if ($resultado) {
                echo json_encode(['mensaje' => 'El doctor fue modificado con éxito', 'operacion' => true]);
            } else {
                echo json_encode(['mensaje' => 'Error al intentar modificar al doctor. Línea: ' . __LINE__, 'operacion' => false]);
            }
            $stmt->close();  // Cerrar la sentencia preparada
        } else {
            echo json_encode(['mensaje' => 'ERROR. No se encontró ningun doctor con ese ID.', 'operacion' => false]);
        }

    } catch (Exception $e) {
        echo json_encode(['mensaje' => 'Error: ' . $e->getMessage(), 'linea' => __LINE__, 'operacion' => false]);
    } finally {
        $conexion->close();  // Cerrar la conexión en cualquier caso
    }
} else {
    echo json_encode(['mensaje' => 'No se recibieron datos suficientes desde el formulario']);
}
?>