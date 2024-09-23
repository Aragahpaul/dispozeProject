import {
  getNavBarHTML,
  getFooterHTML,
  handleNavBar,
} from "../Js/product-page-scripts/nav-footer.js";
import { getData, loadPage } from "../Js/product-page-scripts/product-page.js";

const productContainer = document.querySelector(".js-product-container");

document.querySelector(".js-header").innerHTML = getNavBarHTML();
document.querySelector(".js-footer").innerHTML = getFooterHTML();

handleNavBar();

await getData("Bagster");

loadPage("66d6487b40ff47651e6afe6e");
