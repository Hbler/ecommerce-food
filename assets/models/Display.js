class Display {
  parent;
  products;
  constructor(parent, products, totalValueNode) {
    this.parent = parent;
    this.products = products;
    this.toShow = [];
    this.totalValueNode = totalValueNode;
  }

  // methods
  showProducts() {
    // clear
    this.parent.innerHTML = "";

    // limit
    const noRepeats = Array.from(new Set(this.toShow));

    // fill
    noRepeats.forEach((obj) => this.createCard(obj));

    this.currentPrice(noRepeats);
  }

  createCard(obj) {
    const container = document.createElement("div");
    const card = document.createElement("article");
    const frame = this.productImg(obj);
    const info = this.productInfo(obj);
    const nutri = this.productComp(obj);

    container.classList.add("product");
    card.classList.add("card");

    card.appendChild(frame);
    card.appendChild(info);
    container.appendChild(card);
    container.appendChild(nutri);
    this.parent.appendChild(container);
  }

  productImg(obj) {
    const loc = this.id;
    const { src, alt } = obj;
    const frame = document.createElement("figure");
    const img = document.createElement("img");

    img.src = src;
    img.alt = alt;

    if (loc === "main") {
      img.classList.add("card__img");
      frame.classList.add("card__img-frame");
    } else {
      img.classList.add(`${loc}-card__img`);
      frame.classList.add(`${loc}-card__img-frame`);
    }

    frame.appendChild(img);

    return frame;
  }

  productInfo(obj) {
    const { nome, preco, promocao, secao, id } = obj;
    const info = document.createElement("section");
    const control = document.createElement("div");
    const name = document.createElement("h2");
    const section = document.createElement("small");
    const price = document.createElement("h3");
    const btn = document.createElement("button");

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

    btn.innerHTML = '<i class="fa-solid fa-cart-arrow-down">';

    info.classList.add("card__info");
    control.classList.add("card_info--control");
    name.classList.add("card__info--name");
    section.classList.add("card__info--section");
    price.classList.add("card__info--price");
    btn.classList.add("card__info--btn");
    // btn.addEventListener("click", addToCart);
    btn.id = id;

    control.append(price, btn);
    info.append(name, section, control);

    return info;
  }

  productComp(obj) {
    const { componentes } = obj;
    const nutri = document.createElement("section");

    nutri.classList.add("card__product-comp");

    componentes.forEach((str) => {
      const strip = document.createElement("div");
      const name = document.createElement("small");

      strip.classList.add("card__product-comp--elem");
      name.innerText = str;

      strip.appendChild(name);
      nutri.appendChild(strip);
    });

    return nutri;
  }

  currentPrice(array) {
    const arr = [...array];
    const total = arr.reduce((t, obj) => {
      const price = obj.promocao ? obj.precoPromocao : obj.preco;
      return t + +price;
    }, 0);

    this.totalValueNode.innerText = "";
    this.totalValueNode.innerText = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(total);
  }
}

//// Export
export { Display };
