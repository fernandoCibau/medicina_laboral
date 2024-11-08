<?php

include '../conexion.php';

if(isset($_POST["correo"])){
    
    try{

        if(!empty($_POST["correo"]))
        {
            $para = $_POST["correo"];
            $de = "From: thekitin2@gmail.com";
            $asunto = "Prueba PHP";
            $mensaje = "http://localhost/Medicina_laboral/app/recuperarContrasenia/actualizacionContrasenia.html";
        
            
            $sql = "SELECT * FROM usuarios WHERE email = '$para'"; 
            $resultado = mysqli_query($conexion, $sql);
            
            if($result = mysqli_fetch_assoc($resultado) != null)
            {
                
                $enviarMail = mail($para,$asunto,$mensaje,$de);
                
                if($enviarMail){
                    echo json_encode( [ 'mensaje' => 'Se envio el correo de recuperacion', 'operacion' => true ]); 
                    
            }
            
            }else{ 
                echo json_encode( [ 'mensaje' => 'El correo no pertenece a un usuario', 'operacion' => false ]); 
            }
        
        } 
    } catch (Exception $e) {
        $error = "Error en " . $e->getFile() . " en la línea " . $e->getLine() . ": " . $e->getMessage();
        echo json_encode(['mensaje' => 'Ocurrió un error', 'error'=> $error ]);
    }
}
    
?>