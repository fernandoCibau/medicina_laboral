<?php
if (isset($_POST['fecha']) ) {
    include 'conexion.php';
    
    $fecha= $_POST['fecha']; 
    $hora = $_POST['horas-del-dia'];
    $horaSplit = explode(":", $hora);
    $nombre = $_POST['nombre'];

    $sql = "SELECT * FROM turnos WHERE fecha='$fecha' AND hora='$hora'";
    $resultado = mysqli_query($conexion, $sql);
    
    if(mysqli_num_rows($resultado) ){
        mysqli_free_result($resultado);
        echo json_encode( ['mensaje' => 'El turno ya exite', 'operacion' => FALSE]);
        
    }else{
        $sql = "INSERT INTO turnos ( fecha, hora) VALUES ('$fecha', '$hora')";
        $resultado = mysqli_query($conexion, $sql);
        
        if ($resultado) {
            echo json_encode(['mensaje' => 'Turno agendado correctamente.', 'fecha' => $fecha, 'hora' => $hora, 'operacion'=> TRUE ]);
        } else {
            echo json_encode(['mensaje' => 'Error al guardar los datos: ' ]);
        }
    }

    mysqli_close($conexion);
} else {
    echo json_encode(['mensaje' => 'Error al convertir la fecha.']);
}



?>