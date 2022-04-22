//// Imports
import { Display } from "./Display.js";

//// Model
class MainDisplay extends Display {
  cart;
  constructor(parent, products, totalValueNode, cart) {
    super(parent, products, totalValueNode);
    this.cart = cart;
    this.id = "main";
    this.parent.addEventListener("click", this);
  }

  // event handler
  handleEvent(e) {
    switch (e.type) {
      case "click":
        this.addToCart(e);
        break;
    }
  }

  // methods
  addToCart(e) {
    const elem = e.target;
    if (elem.tagName === "BUTTON" || elem.tagName === "I") {
      const productID = +elem.id || +elem.closest("button").id;
      const product = this.products.find((obj) => {
        return obj.id === productID;
      });
      this.cart.addProduct(product);
    }
  }
}

//// Export
export { MainDisplay };
