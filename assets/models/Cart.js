//// Imports
import { Display } from "./Display.js";
import { Produtcs } from "../module/database.js";

//// Model
class Cart extends Display {
  constructor(parent, totalValueNode) {
    super(parent, totalValueNode);
    this.products = [];
    this.totalValueNode = totalValueNode;
    this.id = "cart";
  }

  // event handler
  handleEvent(e) {
    switch (e.type) {
      case "click":
        this.removeProduct(e);
        break;
      case "change":
        this.inputControl(e);
        break;
    }
  }

  // methods
  showProducts() {
    // limit
    this.toShow = Array.from(new Set(this.products));

    // clear
    this.parent.innerHTML = "";

    this.toShow.forEach((obj) => {
      let qtt = this.products.filter((p) => p === obj).length;
      this.createCard(obj, qtt);
    });

    this.currentPrice();
  }

  createCard(obj, qtt) {
    const card = document.createElement("article");
    const frame = this.productImg(obj);
    const info = this.productInfo(obj);
    const control = this.productControl(obj, qtt);

    card.classList.add("cart-card");

    card.appendChild(frame);
    card.appendChild(info);
    card.appendChild(control);
    this.parent.appendChild(card);
  }

  productInfo(obj) {
    const { nome, preco, promocao, secao } = obj;
    const info = document.createElement("section");
    const name = document.createElement("h4");
    const section = document.createElement("small");
    const price = document.createElement("h5");

    name.innerText = nome;
    section.innerText = secao;

    if (promocao) {
      const { precoPromocao } = obj;
      price.innerText = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(precoPromocao);
    } else {
      price.innerText = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(preco);
    }

    info.classList.add("cart-card__info");
    name.classList.add("cart-card__info--elem", "cart-card__info--name");
    section.classList.add("cart-card__info--elem", "cart-card__info--section");
    price.classList.add("cart-card__info--elem", "cart-card__info--price");

    info.appendChild(name);
    info.appendChild(section);
    info.appendChild(price);

    return info;
  }

  productControl(obj, qtt = 1) {
    const { id } = obj;
    const control = document.createElement("section");
    const input = document.createElement("input");
    const btn = document.createElement("button");

    control.classList.add("cart-card__control");
    btn.classList.add("cart-card__btn");
    btn.innerHTML = "&#10799;";
    btn.addEventListener("click", this);
    input.addEventListener("change", this);
    input.classList.add("cart-card__input");
    input.id = `${id}-input`;
    input.type = "number";
    input.name = "qtty";
    input.min = "1";
    input.value = String(qtt);

    control.appendChild(input);
    control.appendChild(btn);

    return control;
  }

  addProduct(obj) {
    this.products.push(obj);
    this.showProducts();
  }

  removeProduct(e) {
    const elem = e.target;
    const product = +elem.parentElement.childNodes[0].id.split("-")[0];
    const path = e.path || (e.composedPath && e.composedPath());
    const loc = path[0].classList[0];

    if (loc === "cart-card__btn") {
      const newCart = this.products.filter(({ id }) => id !== product);

      this.products.splice(0, this.products.length);
      this.products.push(...newCart);

      this.showProducts();
    }
  }

  inputControl(e) {
    const elem = e.target;
    const product = +elem.id.split("-")[0];
    const inputQtt = +elem.value;
    const amount = this.products.filter(({ id }) => id === product).length;

    if (inputQtt > amount) {
      Produtcs.forEach((obj) => {
        let { id } = obj;
        if (id === product) this.products.push(obj);
      });
      this.showProducts();
    } else {
      let index = this.products
        .map((obj) => {
          return obj.id;
        })
        .lastIndexOf(product);

      this.products.splice(index, 1);

      this.showProducts();
    }
  }
}

//// Export
export { Cart };
