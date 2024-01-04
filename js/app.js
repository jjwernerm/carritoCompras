const pizzas = [
  {
    "img": "https://res.cloudinary.com/dqjnzfsp6/image/upload/v1704334410/neapolitanPizza_xfw7lh.jpg",
    "name": "Napolitana",
    "ingredients": "Queso mozzarella y tomate al oreganato.",
    "cost": 10.990,
  },
  {
    "img": "https://res.cloudinary.com/dqjnzfsp6/image/upload/v1704334409/pepperoniPizza_xlfb9u.jpg",
    "name": "Pepperoni",
    "ingredients": "Queso mozzarella y pepperoni.",
    "cost": 10.990,
  },
  {
    "img": "https://res.cloudinary.com/dqjnzfsp6/image/upload/v1704334409/italianPizza_sr5wyw.jpg",
    "name": "Italiana",
    "ingredients": "Queso mozzarella, jamón y tomate al oreganato.",
    "cost": 10.990,
  },
  {
    "img": "https://res.cloudinary.com/dqjnzfsp6/image/upload/v1704334410/hawaiianPizza_g4tsui.jpg",
    "name": "Hawaiana",
    "ingredients": "Queso mozzarella, jamón y trozos de piña.",
    "cost": 10.990,
  },
  {
    "img": "https://res.cloudinary.com/dqjnzfsp6/image/upload/v1704334410/americanPizza_pkwbxc.jpg",
    "name": "Americana",
    "ingredients": "Queso mozzarella, pepperoni, aceituna y champiñón.",
    "cost": 11.990,
  },
  {
    "img": "https://res.cloudinary.com/dqjnzfsp6/image/upload/v1704334410/vegetarianPizza_je5zek.jpg",
    "name": "Vegetariana",
    "ingredients": "Queso mozzarella, pimentón verde, aceituna y tomate.",
    "cost": 11.990,
  },
  {
    "img": "https://res.cloudinary.com/dqjnzfsp6/image/upload/v1704334412/spanishPizza_vjs8gw.jpg",
    "name": "Española",
    "ingredients": "Queso mozzarella, choricillo, jamón, tomate y pimentón verde.",
    "cost": 12.990,
  },
  {
    "img": "https://res.cloudinary.com/dqjnzfsp6/image/upload/v1704334410/fourSeasonsPizza_b9zfjp.jpg",
    "name": "Cuatro Estaciones",
    "ingredients": "Mozzarella y 4 estaciones de jamón pepperonni, aceituna y champiñones.",
    "cost": 12.990,
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
          <h6 class="card-cost">$ ${pizza.cost}</h6>
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