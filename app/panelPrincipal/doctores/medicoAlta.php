<?php
if ( isset($_POST['matricula']) || isset($_POST['dni']) || isset($_POST['apellido']) || isset($_POST['nombre'])  || isset($_POST['especialidad']) ) {
    try{

        include "../../conexion.php";
        
        $nombre         = $_POST['nombre'];
        $especialidad = $_POST['especialidad'];
        $matricula       = $_POST['matricula'] ?? null;
        $dni                 = $_POST['dni'] ?? null;
        $apellido         = $_POST['apellido'] ?? null;
        $email             = $_POST['email'];

        $sql = "INSERT INTO medicos 
            ( nombre, especialidad, matricula, dni, apellido, email )
        VALUES
            ('$nombre', '$especialidad', '$matricula', '$dni', '$apellido', '$email' ) ";
        
        $resultado = mysqli_query($conexion, $sql);
        
        if($resultado){
            echo json_encode(['mensaje' => 'El médico fue Agregado con éxito', 'operacion' => TRUE]);
        }else{
            echo json_encode(['mensaje' => 'ERROR, No se pedo agregar el medico' , 'operacion' => FALSE] )  ;
        }
        
        mysqli_close($conexion);
        
    } catch (Exception $e) {
        $error = "Error en " . $e->getFile() . " en la línea " . $e->getLine() . ": " . $e->getMessage();
        echo json_encode(['mensaje' => 'Ocurrió un error', 'error'=> $error ]);
    }

}else{
    echo json_encode(['mensaje' => 'No se recibieron datos suficientes desde el formulario',  'operacion' => FALSE ]);
}
?>