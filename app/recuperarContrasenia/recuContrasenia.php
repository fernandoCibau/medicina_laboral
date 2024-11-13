<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Medicina Laboral |  Inicio Session</title>
</head>
<body>
<header>
        <img src="../icon/ElSalvadorMarca.png" alt="El Salvador">
        <div class="contenedorNombreHeader">
        </div>
        <div class="contenedorBtnHeader">
        </div>
    </header>

    <main>
        <div class="container">
            <div class="logo">
                
            </div>
            <div class="login-box">
            <div class="left-panel">
                <img src="../icon/ElSalvadorMarca.png" alt="El Salvador"/>
                </div>
                <div class="right-panel">
                    <h3>Ingrese su correo electronico</h3>

                    <form   method="post" id="formContraseña">
                        <input required type="email" name="correo">
                        <br>
                        <spam id="mensaje" class="hidde" >-</spam>
                        
                        <div class="loader hidde"></div>
                        <button id="enviarBTN">Enviar</button>
                    </form>
                </div>
            </div>
        </div>
    </main>


    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="./index.js"></script>
    <footer>
      <p>© 2024 Tecnicatura Universitaria en Programacion UTN FRH.</p>
    </footer>
</body>
</html>