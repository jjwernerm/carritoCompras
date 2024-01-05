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

  const cardTemplate = document.querySelector('.card-template');

  for (let pizza of pizzas) {

    const template =
    `
      <div class="col-12 col-md-6 col-lg-4 col-xxl-3">
        <div class="card mb-5" style="width: 18rem;">
          <img src="${pizza.img}" class="card-img-top p-2 rounded-4" alt="...">
          <div class="card-body">
            <h4 class="card-title">${pizza.name}</h4>
            <p class="card-text h-card">${pizza.ingredients}</p>
            <h6 class="card-cost">${pizza.cost.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</h6>
            <button class="btn pizza-bg-color btn-agregar" type="button">
              Agregar
              <i class="fa-solid fa-cart-shopping"></i>
            </button>
          </div>
        </div>
      </div>      
    `;

    cardTemplate.innerHTML += template;

  };

  // Declaro variables para almacenar referencias a los elementos del formulario.
  const card = document.querySelector('.card');
  
  // Asigno escuchadores de eventos a los elementos del formulario:
  card.addEventListener('click', addPizza);

  function addPizza(e) {

    e.preventDefault();
  
    // Si al seleccionar el elemento contiene una clase llamada 'btn-agregar'
    if(e.target.classList.contains('btn-agregar')) {

      // Se asgina a la variable 'btnAgregarClick' el elemento '.parentElement' que en este caso es el elemento abuelo. 
      const btnAgregarClick = e.target.parentElement.parentElement;

      readCard(btnAgregarClick);

    };

  };

  function readCard(cardPizza) {

    console.log(cardPizza); 

    // Creo un objeto con el contenido de la pizza agregada.
    const objectCart = {
      img: cardPizza.querySelector('img').src,
      name: cardPizza.querySelector('h4').textContent,
      cost: cardPizza.querySelector('h6').textContent,
    };

    console.log(objectCart);    
    
  };

});