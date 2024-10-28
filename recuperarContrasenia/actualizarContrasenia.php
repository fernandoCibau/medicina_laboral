<?php

include '../conexion.php';
$mensa = "1";


      $mensa = $mensa + "2";
      try{
         $email =$_POST["correo"];
         $nuevaContrasenia = $_POST["contrasenia"];
         $repNuevaContrasenia = $_POST["contrasenia2"];
 
         $hashContrasenia = password_hash( trim($nuevaContrasenia), PASSWORD_DEFAULT);
 
         $sql = "UPDATE usuarios SET contrasenia = '$hashContrasenia' WHERE email = '$email'"; 
         $resultado = mysqli_query($conexion, $sql);
         $mensa = $mensa + "3";
 
          if($resultado)
          {
             echo $mensa;
          }else{
             echo $mensa;
          }
      }catch(Exception $e){
         echo $mensa;
      }
      



//$2y$10$h4e5NXg.tvyXeuVDFcVCtOEvYmL6IYKeBmkZmtSOyMc
//$2y$10$h4e5NXg.tvyXeuVDFcVCtOEvYmL6IYKeBmkZmtSOyMc..

?>


