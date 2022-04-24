//// Imports
import { Cart } from "./assets/models/Cart.js";
import { MainDisplay } from "./assets/models/MainDisplay.js";
import { Produtcs, Sections } from "./assets/module/database.js";
import {
  Screen,
  Filters,
  search,
  createFilters,
} from "./assets/module/layout-functions.js";

//// Global Variables
const SearchBtn = document.getElementById("search");
const cartList = document.getElementById("cart__cards");
let mainPrice = document.getElementById("price");
let cartPrice = document.querySelector(".cart__total--number");

//// Instances
const cartInstance = new Cart(cartList, cartPrice);
const displayInstance = new MainDisplay(
  Screen,
  Produtcs,
  mainPrice,
  cartInstance
);

//// Listeners
SearchBtn.addEventListener("click", search);
document.addEventListener("keydown", (e) => {
  const keyName = e.key;
  const path = e.path || (e.composedPath && e.composedPath());

  if (keyName === "Enter" && path[0].id === "search-bar") {
    search();
  }
});

//// Flow
createFilters(Sections, Filters);

displayInstance.toShow = Produtcs;
displayInstance.showProducts();
displayInstance.currentPrice(displayInstance.products);

cartInstance.currentPrice(cartInstance.products);

//// Export
export { displayInstance };
