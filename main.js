// main.js
class Producto {
  constructor(id, nombre, precios, img) {
    this.id = id;
    this.nombre = nombre;
    this.precios = precios;
    this.img = img;
    this.cantidad = 1;
    this.talle = "S";
  }
}

const remera = new Producto(1, "remera", {
  S: 4999,
  M: 4999,
  L: 4999,
  XL: 12000,
  "2XL": 12000,
  "3XL": 12000,
  "4xL": 15000,
  "5xL": 15000,
}, "./img/remera-uno.jpg");
const remeraDos = new Producto(2, "remeraDos", {
  S: 4999,
  M: 4999,
  L: 4999,
  XL: 12000,
  "2XL": 12000,
  "3XL": 12000,
  "4xL": 15000,
  "5xL": 15000,
}, "./img/remera-2.jpg");

const remeraTres = new Producto(3, "remeraTres", {
  S: 4999,
  M: 4999,
  L: 4999,
  XL: 12000,
  "2XL": 12000,
  "3XL": 12000,
  "4xL": 15000,
  "5xL": 15000,
}, "./img/remera-3.jpg");

const remeraCuatro = new Producto(4, "remeraCuatro", {
  S: 4999,
  M: 4999,
  L: 4999,
  XL: 12000,
  "2XL": 12000,
  "3XL": 12000,
  "4xL": 15000,
  "5xL": 15000,
}, "./img/remera-4.jpg");

const remeraCinco = new Producto(5, "remeraCinco", {
  S: 4999,
  M: 4999,
  L: 4999,
  XL: 12000,
  "2XL": 12000,
  "3XL": 12000,
  "4xL": 15000,
  "5xL": 15000,
}, "./img/remera-5.jpg");

const remeraSeis = new Producto(6, "remeraSeis", {
  S: 4999,
  M: 4999,
  L: 4999,
  XL: 12000,
  "2XL": 12000,
  "3XL": 12000,
  "4xL": 15000,
  "5xL": 15000,
}, "./img/remera-6.jpg");

const remeraSiete = new Producto(7, "remeraSiete", {
  S: 4999,
  M: 4999,
  L: 4999,
  XL: 12000,
  "2XL": 12000,
  "3XL": 12000,
  "4xL": 15000,
  "5xL": 15000,
}, "./img/remera-7.jpg");

const remeraOcho = new Producto(8, "remeraocho", {
  S: 4999,
  M: 4999,
  L: 4999,
  XL: 12000,
  "2XL": 12000,
  "3XL": 12000,
  "4xL": 15000,
  "5xL": 15000,
}, "./img/remera-8.jpg");

const productos = [remera, remeraDos, remeraTres, remeraCuatro, remeraCinco, remeraSeis, remeraSiete, remeraOcho];
let carrito = [];

if (localStorage.getItem("carrito")) {
  carrito = JSON.parse(localStorage.getItem("carrito"));
}

const obtenerPrecioPorTalle = (producto, talleSeleccionado) => {
  // Verificamos si el talle seleccionado existe en los precios, de lo contrario, usamos el talle predeterminado (S)
  const talle = producto.precios.hasOwnProperty(talleSeleccionado) ? talleSeleccionado : producto.talle;

  // Verificamos si el talle es uno de los talles especiales (XL, 2XL, 3XL, 4xL, 5xL)
  if (["XL", "2XL", "3XL", "4xL", "5xL"].includes(talle)) {
    return producto.precios[talle];
  } else {
    // Si el talle no es uno de los talles especiales, usamos el talle predeterminado (S)
    return producto.precios[producto.talle];
  }
};

const mostrarProductos = () => {
  const contenedorProductos = document.getElementById("contenedorProductos");
  contenedorProductos.innerHTML = "";

  productos.forEach((producto) => {
    const card = document.createElement("div");
    card.classList.add("col-md-6", "col-lg-4", "col-xl-3");
    card.innerHTML = `
      <div class="card">
          <img class="card-img-top imgProductos" src="${producto.img}" alt="${producto.nombre}">
          <div class="card-body">
              <h3>${producto.nombre}</h3>
              <!-- Mostramos el precio según el talle seleccionado -->
              <p id="precio">$${producto.precios[producto.talle]}</p>
              <!-- Cambiamos "precio" a "precios" aquí -->
              <!-- Creamos el menú desplegable para elegir el talle -->
              <label for="talle-${producto.id}">Talle:</label>
              <select id="talle-${producto.id}">
                  <!-- Aquí agregamos todas las opciones de talle -->
                  ${Object.keys(producto.precios).map((talle) => `<option value="${talle}">${talle}</option>`).join("")}
              </select>
              <button class="btn colorBoton agregar-carrito" data-id="${producto.id}">Agregar al carrito</button>
          </div>
      </div>
    `;

    contenedorProductos.appendChild(card);

    // Establecemos el talle predeterminado (por ejemplo, "S") para cada producto
    const talleSelect = document.getElementById(`talle-${producto.id}`);
    talleSelect.value = producto.talle; // Cambiar "S" por el valor que desees como predeterminado

    // Agregar evento para actualizar el precio mostrado cuando se cambia el talle
    talleSelect.addEventListener("change", () => {
      const precioElement = card.querySelector(`#precio-${producto.id}`);
      precioElement.textContent = `$${obtenerPrecioPorTalle(producto, talleSelect.value)}`;
    });
  });

  const botonesAgregar = document.getElementsByClassName("agregar-carrito");
  Array.from(botonesAgregar).forEach((boton) => {
    boton.addEventListener("click", () => {
      const idProducto = parseInt(boton.dataset.id);
      // Obtenemos el talle seleccionado para el producto
      const talleSelect = boton.parentElement.querySelector(`#talle-${idProducto}`);
      const talleElegido = talleSelect.value;
      agregarAlCarrito(idProducto, talleElegido);
      //mensje de que se agrego producto al carrito:
    });
  });
};

const agregarAlCarrito = (id, talle) => {
  const productoExistente = carrito.find((producto) => producto.id === id && producto.talle === talle);
  Toastify({
    text: "Producto agregado",
    duration: 2000,
    gravity: "top",
    position: "right",
    style: {
      background: "white",
      color: "black"
    }
  }).showToast();
  if (productoExistente) {
    productoExistente.cantidad++;
  } else {
    const producto = productos.find((producto) => producto.id === id);
    producto.talle = talle;
    // Actualizar el precio del producto según el talle seleccionado
    producto.precio = producto.precios[talle]; // Agregamos esta línea para actualizar el precio
    carrito.push(producto);
  }
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
};

const eliminarDelCarrito = (id, talle) => {
  carrito = carrito.filter((producto) => producto.id !== id || producto.talle !== talle); // Verificamos ambos id y talle
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
};

const vaciarCarrito = () => {
  carrito = [];
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
};

let carritoAbierto = false;

const mostrarCarrito = () => {
  const contenedorCarrito = document.getElementById("contenedorCarrito");
  contenedorCarrito.innerHTML = "";

  carrito.forEach((producto) => {
    const card = document.createElement("div");
    card.classList.add("col-xl-3", "col-md-6", "col-xs-6");
    card.innerHTML = `
      <div class="card">
          <img class="card-img-top imgProductos" src="${producto.img}" alt="${producto.nombre}">
          <div class="card-body">
              <h3>${producto.nombre}</h3>
              <p>$${producto.precios[producto.talle]}</p>
              <p>Talle: ${producto.talle}</p>
              <p>cant:${producto.cantidad}</p>
              <button class="btn colorBoton eliminar-producto" data-id="${producto.id}" data-talle="${producto.talle}">Eliminar producto</button>
          </div>
      </div>
    `;

    contenedorCarrito.appendChild(card);
  });

  const botonesEliminar = document.getElementsByClassName("eliminar-producto");
  Array.from(botonesEliminar).forEach((boton) => {
    boton.addEventListener("click", () => {
      const idProducto = parseInt(boton.dataset.id);
      const talleProducto = boton.dataset.talle;
      eliminarDelCarrito(idProducto, talleProducto);
    });
  });

  calcularTotal();
};


const calcularTotal = () => {
  const totalElemento = document.createElement("p");
  totalElemento.id = "total";
  let totalCompra = 0;

  carrito.forEach((producto) => {
    totalCompra += producto.precio * producto.cantidad;
  });

  totalElemento.textContent = `Total: $${totalCompra}`;

  const contenedorCarrito = document.getElementById("contenedorCarrito");
  contenedorCarrito.appendChild(totalElemento);
};

// Mostrar los productos al cargar la página
mostrarProductos();

// Evento para mostrar el carrito al hacer clic en "ver carrito"
const verCarrito = document.getElementById("verCarrito");
verCarrito.addEventListener("click", () => {
  if (carritoAbierto) {
    // Si el carrito ya está abierto, lo ocultamos
    const contenedorCarrito = document.getElementById("contenedorCarrito");
    contenedorCarrito.innerHTML = "";
    carritoAbierto = false;
  } else {
    // Si el carrito está cerrado, lo mostramos
    mostrarCarrito();
    carritoAbierto = true;
  }
});

// Evento para vaciar el carrito al hacer clic en "vaciar carrito"
const vaciarCarritoBtn = document.getElementById("vaciarCarrito");
vaciarCarritoBtn.addEventListener("click", () => {
  Swal.fire({
    title: "¿seguro que quieres vaciar el carrito?",
    text: "todos los producto seleccionados se elimanaran",
    icon: "question",
    confirmButtonText: "Aceptar",
    showCancelButton: true,
    cancelButtonText: "cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
      vaciarCarrito();
      Swal.fire({
        title: "¡carrito eliminado!",
        icon: "success",
        confirmButtonText: "Aceptar"
      })
    }
  })

})
/*
vaciarCarritoBtn.addEventListener("click", () => {
  vaciarCarrito();
});
*/

const mostrarProductosResponsive = () => {
  const contenedorProductos = document.getElementById("contenedorProductos");
  contenedorProductos.innerHTML = "";

  // Establecer la cantidad de columnas por fila dependiendo del ancho de la ventana
  const columnsPerRow = window.innerWidth >= 992 ? 4 : window.innerWidth >= 768 ? 3 : 2;

  for (let i = 0; i < productos.length; i += columnsPerRow) {
    const row = document.createElement("div");
    row.classList.add("row");

    for (let j = i; j < i + columnsPerRow; j++) {
      if (j >= productos.length) {
        break;
      }

      const producto = productos[j];
      const card = document.createElement("div");
      card.classList.add("col-xl-3", "col-lg-4", "col-md-6", "col-xs-12"); // Agregamos las clases de grillas de Bootstrap
      card.innerHTML = `
            <div class="card">
                <img class="card-img-top imgProductos" src="${producto.img}" alt="${producto.nombre}">
                <div class="card-body">
                    <h3>${producto.nombre}</h3>
                    <p>$${producto.precio}</p>
                    <!-- Creamos el menú desplegable para elegir el talle -->
                    <label for="talle-${producto.id}">Talle:</label>
                    <select id="talle-${producto.id}">
                        <!-- Agregamos todas las opciones de talle -->
                        ${Object.keys(producto.precios).map((talle) => `<option value="${talle}">${talle}</option>`).join("")}
                    </select>
                    <button class="btn colorBoton agregar-carrito" data-id="${producto.id}">Agregar al carrito</button>
                </div>
            </div>
          `;

      row.appendChild(card);
      // Establecemos el talle predeterminado (por ejemplo, "S") para cada producto
      const talleSelect = card.querySelector(`#talle-${producto.id}`);
      talleSelect.value = "S"; // Cambiar "S" por el valor que desees como predeterminado
    }

    contenedorProductos.appendChild(row);
  }

  // Agregar eventos a los botones de agregar al carrito
  const botonesAgregar = document.getElementsByClassName("agregar-carrito");
  Array.from(botonesAgregar).forEach((boton) => {
    boton.addEventListener("click", () => {
      const idProducto = parseInt(boton.dataset.id);
      // Obtenemos el talle seleccionado para el producto
      const talleSelect = boton.parentElement.querySelector(`#talle-${idProducto}`);
      const talleElegido = talleSelect.value;
      agregarAlCarrito(idProducto, talleElegido);
    });
  });
};

// Mostrar los productos al cargar la página
mostrarProductos();
mostrarProductosResponsive();

// Actualizar la disposición de los productos cuando se redimensiona la ventana
window.addEventListener("resize", mostrarProductosResponsive);
