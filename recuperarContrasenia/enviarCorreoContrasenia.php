<?php

include '../conexion.php';

if(isset($_POST["correo"])){
    
    if(!empty($_POST["correo"]))
    {
        $para = $_POST["correo"];
        $de = "From: nachomelga123@gmail.com";
        $asunto = "Prueba PHP";
        $mensaje = "http://localhost/Medicinal_laboral/recuperarContrasenia/actualizacionContrasenia.html";


        $sql = "SELECT * FROM usuarios WHERE email = '$para'"; 
        $resultado = mysqli_query($conexion, $sql);

         if($result = mysqli_fetch_assoc($resultado) != null)
         {
     
            $enviarMail = mail($para,$asunto,$mensaje,$de);

            if($enviarMail){
                echo "Se envio el correo de recuperacion exitosamente!";
                
           }

         }else{
           
            echo "El correo no pertenece a un usuario"; 
         }

        
    } 
  
}