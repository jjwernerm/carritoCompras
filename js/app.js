// Cuando el DOM se haya cargado completamente,
// Utilizo el evento <addEventListener> del DOM para ejecutar el resto del código. 
document.addEventListener('DOMContentLoaded', function () {

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
      "cost": 11990,
    },

  ];

  // Asigno el elemento <class='card-template'> a <cardTemplate>
  const cardTemplate = document.querySelector('.card-template');

  // Utilizo el método <.map> para iterar sobre el arreglo de objetos y poder generar un array de plantillas.
  const templatesCard = pizzas.map( pizza => {

    // Aplico destructuring (desestructuración de objetos), me permite extraer valores del arreglo y asignarlos
    // a variables individuales. 
    const { img, name, ingredients, cost} = pizza;

    return`
      <div class="col-12 col-md-6 col-lg-4 col-xxl-3">
        <div class="card mb-5" style="width: 18rem;">
          <img src="${img}" class="card-img-top p-2 rounded-4" alt="...">
          <div class="card-body">
            <h4 class="card-title">${name}</h4>
            <p class="card-text h-card">${ingredients}</p>
            <h6 class="card-cost">${cost.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</h6>
            <button class="btn pizza-bg-color btn-agregar" type="button">
              Agregar
              <i class="fa-solid fa-cart-shopping"></i>
            </button>
          </div>
        </div>
      </div>      
    `
  });

  // Utilizo el método <.join('')> para concatenar el array 'templates' en una sola cadena de texto.
  // Asigno al <innerHTML> de 'cardTemplate'
  cardTemplate.innerHTML = templatesCard.join('');

  const cards = document.querySelectorAll('.card');
  let pizzasCart = [];  
  
  // Utilizo el método <forEach> para iterar sobre cada elemento '.card'
  // Utilizo el evento <click> mediante <addEventListener> especificando que la función 'selectPizza' debe ejecutarse. 
  cards.forEach(card => {
    card.addEventListener('click', selectPizza);
  });

  function selectPizza(e) {

    e.preventDefault();
  
    if (e.target.classList.contains('btn-agregar')) {

      const btnAgregarClick = e.target.parentElement.parentElement;

      createObjectCart(btnAgregarClick);

    };

  };

  function createObjectCart(cardPizza) {

    const fs6 = document.querySelector('.fs-5');

    const objectCart = {
      img: cardPizza.querySelector('img').src,
      name: cardPizza.querySelector('h4').textContent,
      cost: cardPizza.querySelector('h6').textContent,
      amount: 1,
    };

    const existsPizza = pizzasCart.some(pizza => pizza.name === objectCart.name);
    
    if (existsPizza) {
      msgPizzaExists(`Pizza ${objectCart.name}`, `Ya está en tu carrito.`);
    } else {
      // spread operator
      pizzasCart = [...pizzasCart, objectCart];
      fs6.innerHTML = pizzasCart.length;
    };    

    addPizzaCart();        

  };

  function addPizzaCart() {

    const cartTemplate = document.querySelector('.cart-template');

    const templatesCart = pizzasCart.map( pizzaCart => {

      // Aplicando destructuring
      const { img, name, cost, amount} = pizzaCart;

      // Utilizo <return> para devolver cada plantilla generada por el <.map>
      return`
        <div class="row">
          <div class="col-3"><img src='${img}' class="cart-img"></div>
          <div class="col-4">
            <p class="fw-bold">${name}</p>
            <p class="cart-cost">${cost}</p>
          </div>
          <div class="col-5">
            <p class="fw-bold text-center">Cantidad</p>
            <div class="d-flex justify-content-between">
              <p class="cart-amount">${amount}</p>
              <i class="fa-solid fa-square-plus amount-edit"></i>
              <i class="fa-solid fa-square-minus amount-edit"></i>
              <i class="fa-solid fa-trash-can amount-edit"></i>
            </div>
          </div>
        </div>
        <hr />      
      `;
    });

    cartTemplate.innerHTML = templatesCart.join('');

    editCartTemplate(pizzasCart, cartTemplate);

  };

  function msgPizzaExists(pizzaName, msg) {

    // Obtengo una referencia al modal por su ID
    const miModal = new bootstrap.Modal(document.getElementById('exampleModal'));

    const exampleModalLabel = document.querySelector('#exampleModalLabel');
    exampleModalLabel.innerHTML = pizzaName;

    const modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = msg;

    // Activo el modal con el método <.show>
    miModal.show();

  };

  function editCartTemplate(a, b) {

    const emptyCartText = b.parentElement.querySelector('.empty-cart-text');
    const btnIr = b.parentElement.querySelector('.btn-ir');

    if (a.length >= 1) {

      emptyCartText.style.display = 'none';
      btnIr.removeAttribute('disabled');
      return;
    };

  };

});