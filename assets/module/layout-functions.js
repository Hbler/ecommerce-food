//// Imports
import { Filter } from "../models/Filter.js";
import { Produtcs } from "./database.js";
import { displayInstance } from "../../main.js";

//// Global Variables
const Screen = document.getElementById("display");
const Filters = document.querySelector(".nav__filters");
const SearchBar = document.getElementById("search-bar");
const Access = new Date();

//// Functions
///Navigation -> FIlters + Search
function createFilters(arr, parent) {
  // clear parent
  parent.innerHTML = "";

  // variables
  const list = document.createElement("ul");

  // fill
  arr.forEach((str, i) => {
    const item = document.createElement("li");

    item.innerText = str;
    item.classList.add("nav__filter");
    if (i === 0) item.classList.add("nav__filter--active");

    item.addEventListener("click", applyFitlers);

    list.appendChild(item);
  });

  parent.appendChild(list);
}

function applyFitlers() {
  const section = this.innerText;

  displayInstance.toShow = [...Filter.bySection(Produtcs, section)];
  displayInstance.showProducts();

  updateFilters(section);
  pageTimer();
}

function search() {
  // variables
  const searched = conditionStr(SearchBar.value);
  console.log(searched);

  displayInstance.toShow = [...Filter.bySearch(Produtcs, searched)];
  displayInstance.showProducts();

  let section = "";

  if (
    input === "" ||
    input === " " ||
    input.includes("todos") ||
    input.includes("todas") ||
    input.includes("produtos")
  ) {
    section = "Todos Produtos";
  } else {
    Produtcs.forEach((obj) => {
      let { secao } = obj;
      if (conditionStr(secao).includes(searched)) {
        section = secao;
      }
    });
  }

  updateFilters(section);
  pageTimer();
}

function updateFilters(str) {
  const filters = document.querySelectorAll(".nav__filter");

  filters.forEach((x) => {
    x.classList.remove("nav__filter--active");
    if (x.innerText === str) x.classList.toggle("nav__filter--active");
  });
}

function conditionStr(str) {
  const nStr = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return nStr.toLowerCase();
}

/// Aside
function pageTimer() {
  const timer = document.getElementById("timer");
  timer.innerText = "";

  let currentTime = new Date();
  let time = Date.parse(currentTime) - Date.parse(Access);

  switch (true) {
    case time < 60000:
      timer.innerText = `${Math.round(time / 1000)} segundos.`;
      break;
    case time < 3.6e6:
      timer.innerText = `${Math.round(time / 60000)} minutos.`;
      break;
    case time < 8.64e7:
      timer.innerText = `${Math.round(time / 3.6e6)} horas.`;
      break;
    default:
      timer.innerText = `${Math.round(time / 8.64e7)} dias.`;
      break;
  }
}

pageTimer();
setInterval(pageTimer, 10000);

//// Export
export {
  Screen,
  Filters,
  applyFitlers,
  displayInstance,
  search,
  createFilters,
  conditionStr,
};
