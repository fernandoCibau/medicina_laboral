

export const errores = ( error ) => {
    $.ajax({
        url: "erroresJs.php",
        method: "post",
        data: {error: error},

        success: (resultado, estado) => {
            // let datos = JSON.parse(resultado);
            console.log(estado);
        },
    });
};