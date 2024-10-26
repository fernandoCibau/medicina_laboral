
//Funcion promesa para obtener los datos del archivo json
const obtenerDatos = () => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'data.json',
            dataType: 'json',

            success: (resultado) => {
                const datosMap = resultado.map(item => ({
                    code: item.code,
                    level: item.level,
                    description: item.description,
                    code_0: item.code_0,
                    code_1: item.code_1,
                    code_2: item.code_2,
                    code_3: item.code_3,
                    code_4: item.code_4,
                }));
                resolve(datosMap); 
            },
            error: (error) => {
                reject("Error al cargar los datos: "  + error);         
            }
        });
    });
};


//Filtrar por descripcion
$("#buscarPorDescripcion").on('input', () => {
    
    $('#buscarPorCodigo').val('');

    const buscarPorDescripcion = $("#buscarPorDescripcion").val(); 
    
    if (buscarPorDescripcion.length >= 3) {
        
        // Uso de la función
        obtenerDatos().then(datosMap => {
            
            // Filtra los datos
            const datosFiltrados = datosMap.filter(fila => {
                return fila.description.toUpperCase().includes(buscarPorDescripcion.toUpperCase()) 
            });
            
            // Limpia la tabla antes de agregar nuevas filas
            $('#cie10Table tbody').empty();
            
            // Muestra los resultados filtrados
            datosFiltrados.forEach(fila => {
                const tr = $('<tr>');
                for (const key in fila) {
                    const td = $('<td>').append(fila[key]);
                    tr.append(td);
                }
                $('#cie10Table tbody').append(tr); 
            });

        }).catch(error => {
            console.error(error);
        });

    } else {
        $('#cie10Table tbody').empty(); 
    }
});



// Filtra por código
$("#buscarPorCodigo").on('input', () => {
    
    $('#buscarPorDescripcion').val('');

    const buscarPorCodigo = $("#buscarPorCodigo").val(); 
    
    if (buscarPorCodigo.length >= 1) {
        
        // Uso de la función
        obtenerDatos().then(datosMap => {
            
            // Filtra los datos
            const datosFiltrados = datosMap.filter(fila => {
                return fila.code.toUpperCase().includes(buscarPorCodigo.toUpperCase()) 
            });
            
            // Limpia la tabla antes de agregar nuevas filas
            $('#cie10Table tbody').empty();
            
            // Muestra los resultados filtrados
            datosFiltrados.forEach(fila => {
                const tr = $('<tr>');
                for (const key in fila) {
                    const td = $('<td>').append(fila[key]);
                    tr.append(td);
                }
                $('#cie10Table tbody').append(tr); 
            });
            
        }).catch(error => {
            console.error(error);
        });
            
            
    } else {
        $('#cie10Table tbody').empty(); 
    }
});
