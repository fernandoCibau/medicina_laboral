//Funcion promesa para obtener los datos del archivo json
const obtenerDatos = () => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "data.json",
      dataType: "json",

      success: (resultado) => {
        const datosMap = resultado.map((item) => ({
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
        reject("Error al cargar los datos: " + error);
      },
    });
  });
};

//Filtrar por descripcion
$("#buscarPorDescripcion").on("input", () => {
  $("#buscarPorCodigo").val("");

  const buscarPorDescripcion = $("#buscarPorDescripcion").val();

  if (buscarPorDescripcion.length >= 3) {
    // Uso de la función
    obtenerDatos()
      .then((datosMap) => {
        // Filtra los datos
        const datosFiltrados = datosMap.filter((fila) => {
          return fila.description
            .toUpperCase()
            .includes(buscarPorDescripcion.toUpperCase());
        });

        // Limpia la tabla antes de agregar nuevas filas
        $("#cie10Table tbody").empty();

        // Muestra los resultados filtrados
        datosFiltrados.forEach((fila) => {
          const tr = $("<tr>");
          for (const key in fila) {
            const td = $("<td>").append(fila[key]);
            tr.append(td);
          }
          $("#cie10Table tbody").append(tr);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    obtenerDatos()
      .then((datosMap) => {
        // Toma solo los primeros 17 registros
        const primeros17Registros = datosMap.slice(0, 17);

        // Limpia la tabla antes de agregar nuevas filas
        $("#cie10Table tbody").empty();

        // Muestra los primeros 20 registros en la tabla
        primeros17Registros.forEach((fila) => {
          const tr = $("<tr>");
          for (const key in fila) {
            const td = $("<td>").append(fila[key]);
            tr.append(td);
          }
          $("#cie10Table tbody").append(tr);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
});

// Filtra por código
$("#buscarPorCodigo").on("input", () => {
  $("#buscarPorDescripcion").val("");

  const buscarPorCodigo = $("#buscarPorCodigo").val();

  if (buscarPorCodigo.length >= 1) {
    // Uso de la función
    obtenerDatos()
      .then((datosMap) => {
        // Filtra los datos
        const datosFiltrados = datosMap.filter((fila) => {
          return fila.code
            .toUpperCase()
            .includes(buscarPorCodigo.toUpperCase());
        });

        // Limpia la tabla antes de agregar nuevas filas
        $("#cie10Table tbody").empty();

        // Muestra los resultados filtrados
        datosFiltrados.forEach((fila) => {
          const tr = $("<tr>");
          for (const key in fila) {
            const td = $("<td>").append(fila[key]);
            tr.append(td);
          }
          $("#cie10Table tbody").append(tr);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    obtenerDatos()
      .then((datosMap) => {
        // Toma solo los primeros 20 registros
        const primeros17Registros = datosMap.slice(0, 17);

        // Limpia la tabla antes de agregar nuevas filas
        $("#cie10Table tbody").empty();

        // Muestra los primeros 20 registros en la tabla
        primeros17Registros.forEach((fila) => {
          const tr = $("<tr>");
          for (const key in fila) {
            const td = $("<td>").append(fila[key]);
            tr.append(td);
          }
          $("#cie10Table tbody").append(tr);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
});

/*TRAE LOS PRIMEROS REGISTROS*/

$(document).ready(() => {
  // Llama a la función para obtener los datos al cargar la página

  obtenerDatos()
    .then((datosMap) => {
      // Toma solo los primeros 15 registros
      const primeros17Registros = datosMap.slice(0, 17);

      // Limpia la tabla antes de agregar nuevas filas
      $("#cie10Table tbody").empty();

      // Muestra los primeros 17 registros en la tabla
      primeros17Registros.forEach((fila) => {
        const tr = $("<tr>");
        for (const key in fila) {
          const td = $("<td>").append(fila[key]);
          tr.append(td);
        }
        $("#cie10Table tbody").append(tr);
      });
    })
    .catch((error) => {
      console.error(error);
    });
});


$("#btmCerrarSesion").click(() => {
  // if (confirm("¿Desea cerrar la sesión?")) {
  //   window.location.href = "../cerrarSesion.php";
  // }

  Swal.fire({
      title: "¿Está seguro de salir del sistema?",
      text: "Está a punto de cerrar sesión.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar!"
  }).then((result) => {
      if (  result.isConfirmed    ) {
      cerrarCuentaRegresiva()
      }
  });
});

//Cuenta regresiva Cerrar sesion
const cerrarCuentaRegresiva = ()=>{
  let timerInterval;
  Swal.fire({
      title: "Saliendo del sistama",
      html: "El sistema se está cerrando... <b></b> milliseconds.",
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
      Swal.showLoading();
      const timer = Swal.getPopup().querySelector("b");
      timerInterval = setInterval(() => {
          timer.textContent = `${Swal.getTimerLeft()}`;
      }, 100);
  },
      willClose: () => {
      clearInterval(timerInterval);
  }
  }).then((result) => {
    /* Read more about handling dismissals below */
  if (result.dismiss === Swal.DismissReason.timer) {
      window.location.href = "../cerrarSesion.php";
      }
  });
}
