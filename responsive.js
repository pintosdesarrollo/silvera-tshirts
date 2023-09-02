const mostrarProductosResponsive = () => {
    const contenedorProductos = document.getElementById("contenedorProductos");
    contenedorProductos.innerHTML = "";

    for (let i = 0; i < productos.length; i += 2) {
        const row = document.createElement("div");
        row.classList.add("col", "col-6", "col-md-4", "col-lg-3");

        for (let j = i; j < i + 2; j++) {
            if (j >= productos.length) {
                break;
            }

            const producto = productos[j];
            const card = document.createElement("div");
            // card.classList.add("col");
            card.innerHTML = `
                <div class="card">
                    <img class="card-img-top imgProductos" src="${producto.img}" alt="${producto.nombre}">
                    <div class="card-body">
                        <h3>${producto.nombre}</h3>
                        <p>${producto.precio}</p>
                        <!-- Creamos el menú desplegable para elegir el talle -->
                        <label for="talle-${producto.id}">Talle:</label>
                        <select id="talle-${producto.id}">
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <!-- Agrega más opciones de talle según tus necesidades -->
                        </select>
                        <button class="btn colorBoton agregar-carrito" data-id="${producto.id}">Agregar al carrito</button>
                    </div>
                </div>
            `;

            row.appendChild(card);
        }

        contenedorProductos.appendChild(row);
    }

    // Agregar eventos a los botones de agregar al carrito
    const botonesAgregar = document.getElementsByClassName("agregar-carrito");
    Array.from(botonesAgregar).forEach((boton) => {
        boton.addEventListener("click", () => {
            const idProducto = parseInt(boton.dataset.id);
            // Obtenemos el talle seleccionado para el producto
            const talleSelect = boton.parentElement.querySelector("select");
            const talleElegido = talleSelect.value;
            agregarAlCarrito(idProducto, talleElegido);
        });
    });
};





const agregarAlCarrito = (id, talle) => {
    const productoExistente = carrito.find((producto) => producto.id === id && producto.talle === talle);

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        const producto = productos.find((producto) => producto.id === id);
        producto.talle = talle;
        carrito.push(producto);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
};

const mostrarCarrito = () => {
    const contenedorCarrito = document.getElementById("contenedorCarrito");
    contenedorCarrito.innerHTML = "";

    carrito.forEach((producto) => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
            <div class="card">
                <img class="card-img-top imgProductos" src="${producto.img}" alt="${producto.nombre}">
                <div class="card-body">
                    <h3>${producto.nombre}</h3>
                    <p>${producto.precio}</p>
                    <p>${producto.cantidad} x ${producto.talle}</p> <!-- Agregamos el talle del producto -->
                    <button class="btn colorBoton eliminar-producto" data-id="${producto.id}" data-talle="${producto.talle}">Eliminar producto</button> <!-- Agregamos el talle a los datos del botón -->
                </div>
            </div>
        `;

        contenedorCarrito.appendChild(card);
    });

    const botonesEliminar = document.getElementsByClassName("eliminar-producto");
    Array.from(botonesEliminar).forEach((boton) => {
        boton.addEventListener("click", () => {
            const idProducto = parseInt(boton.dataset.id);
            const talleProducto = boton.dataset.talle; // Obtenemos el talle del producto desde los datos del botón
            eliminarDelCarrito(idProducto, talleProducto); // Pasamos el talle como segundo argumento
        });
    });

    calcularTotal();
};