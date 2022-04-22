//// Imports
import { conditionStr } from "../module/layout-functions.js";

//// Model
class Filter {
  // methods
  static bySection(products, section) {
    if (section.includes("Todos")) {
      return products;
    } else {
      const foundProducts = products.filter(
        (obj) => conditionStr(obj.secao) === conditionStr(section)
      );
      return foundProducts;
    }
  }

  static bySearch(products, input) {
    if (input === "" || input.includes("todos") || input.includes("produtos")) {
      section = "Todos Produtos";
      return products;
    } else {
      const foundProducts = products.filter((obj) => {
        let { nome, secao, categoria } = obj;
        if (
          conditionStr(nome).includes(input) ||
          conditionStr(secao).includes(input) ||
          conditionStr(categoria).includes(input)
        ) {
          return true;
        }
      });

      return foundProducts;
    }
  }
}

//// Export
export { Filter };
