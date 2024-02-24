// Arreglo de objeto con el nombre 'pizzas'
const pizzas = [

  {
    "img": "https://res.cloudinary.com/dqjnzfsp6/image/upload/v1704334410/neapolitanPizza_xfw7lh.jpg",
    "name": "Napolitana",
    "ingredients": "Queso mozzarella y tomate al oreganato.",
    "cost": 10990,
  },
  {
    "img": "https://res.cloudinary.com/dqjnzfsp6/image/upload/v1704334409/pepperoniPizza_xlfb9u.jpg",
    "name": "Pepperoni",
    "ingredients": "Queso mozzarella y pepperoni.",
    "cost": 10990,
  },
  {
    "img": "https://res.cloudinary.com/dqjnzfsp6/image/upload/v1704334409/italianPizza_sr5wyw.jpg",
    "name": "Italiana",
    "ingredients": "Queso mozzarella, jamón y tomate al oreganato.",
    "cost": 10990,
  },
  {
    "img": "https://res.cloudinary.com/dqjnzfsp6/image/upload/v1704334410/hawaiianPizza_g4tsui.jpg",
    "name": "Hawaiana",
    "ingredients": "Queso mozzarella, jamón y trozos de piña.",
    "cost": 10990,
  },
  {
    "img": "https://res.cloudinary.com/dqjnzfsp6/image/upload/v1704334410/americanPizza_pkwbxc.jpg",
    "name": "Americana",
    "ingredients": "Queso mozzarella, pepperoni, aceituna y champiñón.",
    "cost": 11990,
  },
  {
    "img": "https://res.cloudinary.com/dqjnzfsp6/image/upload/v1704334410/vegetarianPizza_je5zek.jpg",
    "name": "Vegetariana",
    "ingredients": "Queso mozzarella, pimentón verde, aceituna y tomate.",
    "cost": 11990,
  },
  {
    "img": "https://res.cloudinary.com/dqjnzfsp6/image/upload/v1704334412/spanishPizza_vjs8gw.jpg",
    "name": "Española",
    "ingredients": "Queso mozzarella, choricillo, jamón, tomate y pimentón verde.",
    "cost": 11990,
  },
  {
    "img": "https://res.cloudinary.com/dqjnzfsp6/image/upload/v1704334410/fourSeasonsPizza_b9zfjp.jpg",
    "name": "Cuatro Estaciones",
    "ingredients": "Mozzarella y 4 estaciones de jamón pepperonni, aceituna y champiñones.",
    "cost": 15990,
  },

];

// Variables
// Asignando elementos a las variables.
const cardTemplate = document.querySelector('.card-template');
const cartTemplate = document.querySelector('.cart-template');
const buttonCart = document.querySelector('.button-cart');
const printTotal = document.querySelector('#print-total'); 
const fs6 = document.querySelector('.fs-6');

// arreglo vacío con el nombre 'pizzasCart'
let pizzasCart = [];

// Eventos
// Método <addEventListener> para escuchar el evento click.
cartTemplate.addEventListener('click', subtractPizza);
cartTemplate.addEventListener('click', removePizza);
buttonCart.addEventListener('click', dropdownCart);
cartTemplate.addEventListener('click', addPizza);

// Este evento espera a que el DOM se cargue completamente antes de ejecutar el código localStorage.
document.addEventListener('DOMContentLoaded', () => {

  // Recuperar los datos del carrito del localStorage y si no hay datos, asigna un arreglo vacío.
  pizzasCart = JSON.parse( localStorage.getItem ('cart') ) || [];

  // Llamada a la función.
  addPizzaCart();

});

// Utilizo el método <.map> para iterar sobre el arreglo de objetos 'pizzas' y poder generar varias plantillas HTML para cada pizza.
const templatesCard = pizzas.map( pizza => {

  // Destructuro los atributos del arreglo de objetos 'pizzas' (destructuring) para asignar variables individuales.
  const { img, name, ingredients, cost} = pizza;

  // Retorno una plantilla HTML con los datos de la pizza.
  return`
    <div class="">
      <div class="col-12 col-md-6 col-lg-4 col-xxl-3">
        <div class="card mb-5" style="width: 18rem;">
          <img src="${img}" class="card-img-top p-2 rounded-4" alt="...">
          <div class="card-body">
            <h4 class="card-title">${name}</h4>
            <p class="card-text h-card">${ingredients}</p>
            <p class="card-cost" style="display: none;">${cost}</p>
            <h6 class="card-cost">${cost.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</h6>
            <button class="btn pizza-bg-color btn-agregar" type="button">
              Agregar
              <i class="fa-solid fa-cart-shopping"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `
});

// Utilizo el método <join('')> para concatenar 'templatesCard' en una sola cadena de texto.
// Inserto las plantillas en el elemento HTML con la clase 'card-template' mediante innerHTML.
cardTemplate.innerHTML = templatesCard.join('');

// Asignando el elemento '.card' a la variable 'cards'.
const cards = document.querySelectorAll('.card');

// Utilizo el método <forEach> para iterar sobre cada elemento '.card'
// Agrego un <addEventListener> a cada tarjeta para seleccionar una pizza cuando se hace clic en ella.
cards.forEach(card => {
  card.addEventListener('click', selectPizza);
});

// Función para seleccionar la pizza.
function selectPizza(e) {

  // Prevengo el comportamiento predeterminado del navegador.
  e.preventDefault();

  // Verifico si se hizo clic en un botón que contiene la clase <.btn-agregar>
  if (e.target.classList.contains('btn-agregar')) {

    // Obtengo el elemento abuelo del botón 'Agregar' y creo un objeto html.
    const btnAgregarClick = e.target.parentElement.parentElement;

    // Llamo a la función 'createObjectCart' y paso 'btnAgregarClick' como argumento.
    createObjectCart(btnAgregarClick);

  };

};

// Función para crear el objeto del carrito con los elementos seleccionado.
function createObjectCart(cardPizza) {

  // Creo un objeto con el nombre 'objectcart'
  // Los valores de cada atributo los abtengo desde la plantilla html con la ayuda del argumento 'btnAgregarClick' -> 'cardPizza'
  const objectCart = {
    img: cardPizza.querySelector('img').src,
    name: cardPizza.querySelector('h4').textContent,
    cost: parseInt(cardPizza.querySelector('.card-cost').textContent),
    id: cardPizza.querySelector('h4').textContent,
    subTotal: parseInt(cardPizza.querySelector('.card-cost').textContent),
    amount: 1,
  };

  // Utilizo el método <some> en el array 'pizzasCart' para verificar si ya existe el nombre de la pizza en 'objectCart'
  // El método <.some> verifica si se cumple o no cierta condición y el resultado es true o false. 
  const existsPizza = pizzasCart.some(pizza => pizza.name === objectCart.name);

  // Si lo anterior es verdadero (true), llamo a la función 'msgPizzaExists' y le paso 2 argumentos.
  // Si lo anterior es falso (false), aplico 'spread operator'
  if (existsPizza) {
    msgPizzaExists(`Pizza ${objectCart.name}`, `Ya está en tu carrito.`);
  } else {
    // Utilizo el spread operator para crear un nuevo array 'pizzasCart'
    pizzasCart = [...pizzasCart, objectCart];

  };

  // Llamo a la función 'addPizzaCart'
  addPizzaCart();

};

// Función para agregar  las pizzas al carrito de compras.
function addPizzaCart() {

  const templatesCart = pizzasCart.map( pizzaCart => {

    const { img, name, cost, amount, id } = pizzaCart;

    return`
      <div class="row list-pizzas-cart">
        <div class="col-3"><img src='${img}' class="cart-img rounded"></div>
        <div class="col-4">
          <p class="fw-bold">${name}</p>
          <p class="cart-cost">${cost.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</p>
        </div>
        <div class="col-5">
          <p class="fw-bold ">Cantidad</p>
          <div class="d-flex justify-content-between">
            <p class="cart-amount">${amount}</p>
            <i type="button" class="fa-solid fa-square-plus amount-edit btn-add" data-id="${id}"></i>
            <i type="button" class="fa-solid fa-square-minus amount-edit btn-subtract" data-id="${id}"></i>
            <i type="button" class="fa-solid fa-trash-can amount-edit btn-remove" data-id="${id}"></i>
          </div>
        </div>
      </div>
      <hr />
    `;
  });

  cartTemplate.innerHTML = templatesCart.join('');

  // Llamo a la función 'editCartTemplate' y paso 'pizzasCart' y 'cartTemplate' como argumento.
  editCartTemplate(pizzasCart, cartTemplate);

  // Paso la longitud del arreglo 'pizzasCart' al elemento '.fs6' mediante innerHTML.
  fs6.innerHTML = pizzasCart.length;
  
  // Llamo a la función 'updateCart'
  updateCartCost()

  // Aplico <localStorage> a 'pizzasCart' con el método <setItem> bajo la clave 'cart' después de convertirlo a una cadena JSON.
  localStorage.setItem("cart", JSON.stringify(pizzasCart));

};

// Función para actualizar el costo total del carrito.
function updateCartCost() {
  
  let total = 0;
  
  // Itero sobre cada pizza en el carrito y sumo el subTotal al costo total.
  pizzasCart.forEach(pizza => {
    total += pizza.subTotal;
  });

  // Actualizo el contenido del elemento HTML con el costo total, formateado como moneda chilena (CLP)
  printTotal.innerHTML = total.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });

};

// Función que muestra un mensaje en un modal cuando se intenta agregar una pizza que ya está en el carrito.
function msgPizzaExists(pizzaName, msg) {
  
  // Obtiene una referencia al modal utilizando su ID
  const miModal = new bootstrap.Modal(document.getElementById('exampleModal'));

  // Actualiza el título del modal con el nombre de la pizza existente en el carrito
  const exampleModalLabel = document.querySelector('#exampleModalLabel');
  exampleModalLabel.innerHTML = pizzaName;

  // Actualiza el cuerpo del modal con el mensaje de advertencia o información relacionado con la pizza existente
  const modalBody = document.querySelector('.modal-body');
  modalBody.innerHTML = msg;

  // Muestra el modal
  miModal.show();
};

// Función que edita la plantilla del carrito según el estado del mismo.
function editCartTemplate(a, b) {

  // Obtengo referencias a elementos dentro del contenedor del carrito.
  const emptyCartText = b.parentElement.querySelector('.empty-cart-text');
  const emptyCartTotal = b.parentElement.querySelector('.empty-cart-total');
  const btnPagar = b.parentElement.querySelector('.btn-pagar');

  // Si hay al menos un elemento en el carrito, muestra los elementos relevantes y habilita el botón de pago.
  if (a.length >= 1) {

    emptyCartText.style.display = 'none';
    emptyCartTotal.style.display = 'block';
    btnPagar.removeAttribute('disabled');
    return;
  };

  // Si el carrito está vacío, muestra el texto de carrito vacío y deshabilita el botón de pago.
  if (a.length === 0) {

    emptyCartText.style.display = 'block';
    emptyCartTotal.style.display = 'none';
    btnPagar.setAttribute('disabled', true);
    return;
  };

};

// Función que controla el despliegue y ocultamiento del menú del carrito.
function dropdownCart() {

  // Obtiene una referencia al menú del carrito.
  const cartMenu = document.querySelector('.cart-menu');

  // Muestra el menú del carrito estableciendo su estilo de visualización en 'block'
  cartMenu.style.display = 'block';

  // Agrega un evento de clic al botón del carrito para mostrar el menú y evita la propagación del evento al documento.
  buttonCart.addEventListener('click', function(event) {
    cartMenu.style.display = 'block';
    event.stopPropagation(); // Evita que el clic se propague al documento.
  });

  // Agrega un evento de clic al documento para cerrar el menú del carrito si se hace clic fuera de él.
  document.addEventListener('click', function(event) {
    if (!cartMenu.contains(event.target) && !buttonCart.contains(event.target)) {
        cartMenu.style.display = 'none';
    };
  });

};

// Función que maneja la adición de una pizza al carrito cuando se hace clic en un botón de agregar.
// Incrementar la cantidad de la pizza.
function addPizza(e) {
  e.preventDefault(); // Evitar el comportamiento predeterminado del evento.
  e.stopPropagation(); // Detener la propagación del evento para evitar que se propague a elementos superiores.

  // Verifico si el clic se realizó en un botón de agregar.
  if (e.target.classList.contains('btn-add')) {
    const pizzaID = e.target.getAttribute('data-id'); // Se obtiene el ID de la pizza seleccionada.

    // Itero sobre las pizzas en el carrito.
    pizzasCart.forEach(pizza => {
      
      // Verifico si la pizza actual coincide con el ID seleccionado.
      if (pizza.id === pizzaID) {
        pizza.amount++; // Incrementar la cantidad de la pizza.
        pizza.subTotal = (parseInt(pizza.cost) * parseInt(pizza.amount)); // Actualizar el subtotal de la pizza.
        return pizza; // Retornar la pizza actualizada.
      } else {
        return pizza; // Retornar las pizzas que no coinciden con el ID seleccionado.
      };

    });

  };

  addPizzaCart(); // Llamo a la función 'addPizzaCart' para actualizar la interfaz del carrito.
};

// Función que maneja la adición de una pizza al carrito cuando se hace clic en un botón de agregar.
// Disminuir la cantidad de la pizza.
function subtractPizza(e) {
  e.preventDefault();
  e.stopPropagation();    

  if(e.target.classList.contains('btn-subtract')) {
    const pizzaID = e.target.getAttribute('data-id');

    pizzasCart.forEach( pizza => {

      // Verifico si la pizza actual coincide con el ID seleccionado  y si tiene más de 1 unidad.
      if(pizza.id === pizzaID && pizza.amount > 1 ) {
        pizza.amount--; // Disminuir la cantidad de la pizza.
        pizza.subTotal = ( parseInt(pizza.cost) * parseInt(pizza.amount) )
        updateCartCost();
        return pizza;
      } else {
      return pizza;
      };

    });

  };
  addPizzaCart();
};

// Función que maneja la eliminación de una pizza del carrito cuando se hace clic en un botón de eliminar.
function removePizza(e) {
  e.preventDefault();
  e.stopPropagation();

  if(e.target.classList.contains('btn-remove')) {

    const pizzaID = e.target.getAttribute('data-id');

    // COn el método <filter> filtro las pizzas en el carrito para excluir la pizza que coincida con el ID seleccionado.
    pizzasCart = pizzasCart.filter( pizza => pizza.id !== pizzaID );
  };

  addPizzaCart();

};