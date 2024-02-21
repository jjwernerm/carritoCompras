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
  // Asignando elementos a las variables
  const cardTemplate = document.querySelector('.card-template');
  const cartTemplate = document.querySelector('.cart-template');
  const buttonCart = document.querySelector('.button-cart');
  const fs6 = document.querySelector('.fs-6'); 
  const printTotal = document.querySelector('#print-total'); 
  let pizzasCart = [];

  // Eventos
  buttonCart.addEventListener('click', dropdownCart);
  cartTemplate.addEventListener('click', removePizza);
  cartTemplate.addEventListener('click', addPizza);
  cartTemplate.addEventListener('click', subtractPizza);

  document.addEventListener('DOMContentLoaded', () => {

    //Agregar localStorage cuando el documento esté listo (DOMContentLoaded)
    pizzasCart = JSON.parse( localStorage.getItem ('cart') ) || [];

    addPizzaCart();

  });

  // Utilizo el método <.map> para iterar sobre el arreglo de objetos y poder generar un array de plantillas.
  const templatesCard = pizzas.map( pizza => {

    // Aplico destructuring (desestructuración de objetos), me permite extraer valores del arreglo y asignarlos
    // a variables individuales.
    const { img, name, ingredients, cost} = pizza;

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

  // Utilizo el método <.join('')> para concatenar el array 'templates' en una sola cadena de texto.
  // Asigno al <innerHTML> de 'cardTemplate'
  cardTemplate.innerHTML = templatesCard.join('');
  const cards = document.querySelectorAll('.card');

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

    const objectCart = {
      img: cardPizza.querySelector('img').src,
      name: cardPizza.querySelector('h4').textContent,
      cost: parseInt(cardPizza.querySelector('.card-cost').textContent),
      id: cardPizza.querySelector('h4').textContent,
      subTotal: parseInt(cardPizza.querySelector('.card-cost').textContent),
      amount: 1,
    };

    const existsPizza = pizzasCart.some(pizza => pizza.name === objectCart.name);

    if (existsPizza) {
      msgPizzaExists(`Pizza ${objectCart.name}`, `Ya está en tu carrito.`);
    } else {
      // spread operator
      pizzasCart = [...pizzasCart, objectCart];

    };

    addPizzaCart();

  };

  function addPizzaCart() {

    const templatesCart = pizzasCart.map( pizzaCart => {

      // Aplicando destructuring
      const { img, name, cost, amount, id } = pizzaCart;

      // Utilizo <return> para devolver cada plantilla generada por el <.map>
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

    editCartTemplate(pizzasCart, cartTemplate);

    fs6.innerHTML = pizzasCart.length;
    
    updateCart()

    localStorage.setItem("cart", JSON.stringify(pizzasCart));

  };

  function updateCart() {
    
    let total = 0;
    
    pizzasCart.forEach(pizza => {
      total += pizza.subTotal;
    });

    printTotal.innerHTML = total.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
  
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
    const emptyCartTotal = b.parentElement.querySelector('.empty-cart-total');
    const btnPagar = b.parentElement.querySelector('.btn-pagar');

    if (a.length >= 1) {

      emptyCartText.style.display = 'none';
      emptyCartTotal.style.display = 'block';
      btnPagar.removeAttribute('disabled');
      return;
    };

    if (a.length === 0) {

      emptyCartText.style.display = 'block';
      emptyCartTotal.style.display = 'none';
      btnPagar.setAttribute('disabled', true);
      return;
    };

  };

  function dropdownCart() {

    const cartMenu = document.querySelector('.cart-menu');

    cartMenu.style.display = 'block';

    buttonCart.addEventListener('click', function(event) {
      cartMenu.style.display = 'block';
      event.stopPropagation(); // Evita que el clic se propague al documento
    });

    // Cierra el cartMenu si se hace clic fuera de él
    document.addEventListener('click', function(event) {
      if (!cartMenu.contains(event.target) && !buttonCart.contains(event.target)) {
          cartMenu.style.display = 'none';
      };
    });

  };

  function addPizza(e) {
    e.preventDefault();
    e.stopPropagation();    

    if(e.target.classList.contains('btn-add')) {
      const pizzaID = e.target.getAttribute('data-id');

      pizzasCart.forEach( pizza => {
        if(pizza.id === pizzaID ) {
          pizza.amount++;
          pizza.subTotal = ( parseInt(pizza.cost) * parseInt(pizza.amount) );
          updateCart();
          return pizza; // retorna el objeto actualizado
        } else {
        return pizza; // retorna los objetos que no son los duplicados
        };
      });
    };
    addPizzaCart();
  };

  function subtractPizza(e) {
    e.preventDefault();
    e.stopPropagation();    

    if(e.target.classList.contains('btn-subtract')) {
      const pizzaID = e.target.getAttribute('data-id');

      pizzasCart.forEach( pizza => {
        if(pizza.id === pizzaID && pizza.amount > 1 ) {
          pizza.amount--;
          pizza.subTotal = ( parseInt(pizza.cost) * parseInt(pizza.amount) )
          updateCart();
          return pizza; // retorna el objeto actualizado
        } else {
        return pizza; // retorna los objetos que no son los duplicados
        };
      });
    };
    addPizzaCart();
  };

  function removePizza(e) {
    e.preventDefault();
    e.stopPropagation();

    if(e.target.classList.contains('btn-remove')) {
      const pizzaID = e.target.getAttribute('data-id');
      pizzasCart = pizzasCart.filter( pizza => pizza.id !== pizzaID );
    };
    addPizzaCart();
  };