<?php

include '../conexion.php';



   if(isset($_POST["correo"]) && isset($_POST["contrasenia"]) && isset($_POST["contrasenia2"])){
      $email =$_POST["correo"];
/*
        $emailCheck = "SELECT * FROM usuarios WHERE email = ' $email '"; 
        $resultado = mysqli_query($conexion, $emailCheck);
        $num_filas = mysqli_num_rows($resultado);
*/
       
         try{
        
            $nuevaContrasenia = $_POST["contrasenia"];
    
            $hashContrasenia = password_hash( trim($nuevaContrasenia), PASSWORD_DEFAULT);
    
            $sql = "UPDATE usuarios SET contrasenia = '$hashContrasenia' WHERE email = '$email'"; 
            $result = mysqli_query($conexion, $sql);
    
             if($result)
             {
                echo "Se cambio la contraseña con exito";
             }else{
                 echo "Error";
             }
         }catch(Exception $e){
            echo $e;
         }
        

      
   }


?>


