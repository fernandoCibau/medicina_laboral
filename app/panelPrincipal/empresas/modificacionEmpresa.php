<?php
if (isset($_POST['id']) && (isset($_POST['razon_social']) || isset($_POST['cuit']) || isset($_POST['domicilio']) || isset($_POST['telefono']) || isset($_POST['email']))) {
    try {
        include "../../conexion.php";

        $id = $_POST['id'];
        $razon_social = $_POST['razon_social'] ?? null;
        $cuit = $_POST['cuit'] ?? null;
        $domicilio = $_POST['domicilio'] ?? null;
        $telefono = $_POST['telefono'];
        $email = $_POST['email'] ?? null;

        // Verificar si la empresa con el id existe
        $stmt = $conexion->prepare("SELECT * FROM empresas WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $resultado = $stmt->get_result();

        if ($resultado->num_rows > 0) {
            // Construir la consulta de actualización dinámicamente según los campos proporcionados
            $campos = [];
            $valores = [];
            $tipos = "";

            if ($razon_social) {
                $campos[] = "razon_social = ?";
                $valores[] = $razon_social;
                $tipos .= "s";
            }

            if ($cuit) {
                $campos[] = "cuit = ?";
                $valores[] = $cuit;
                $tipos .= "i";
            }

            if ($domicilio) {
                $campos[] = "domicilio = ?";
                $valores[] = $domicilio;
                $tipos .= "s";
            }

            if ($email) {
                $campos[] = "email = ?";
                $valores[] = $email;
                $tipos .= "s";
            }

            // Unir los campos actualizables con comas
            $sql = "UPDATE empresas SET " . implode(", ", $campos) . " WHERE id = ?";
            $stmt = $conexion->prepare($sql);

            // Añadir el id al final de los valores
            $valores[] = $id;
            $tipos .= "i";

            // Usar array para pasar los parámetros a bind_param
            $stmt->bind_param($tipos, ...$valores);

            // Ejecutar la consulta
            $resultado = $stmt->execute();

            if ($resultado) {
                echo json_encode(['mensaje' => 'La empresa fue modificada con éxito', 'operacion' => true]);
            } else {
                echo json_encode(['mensaje' => 'Error al intentar modificar la empresa. Línea: ' . __LINE__, 'operacion' => false]);
            }
            $stmt->close();  // Cerrar la sentencia preparada
        } else {
            echo json_encode(['mensaje' => 'ERROR. No se encontró ninguna empresa con ese ID.', 'operacion' => false]);
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