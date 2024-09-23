import { products } from "./product.js";
const productContainer = document.querySelector(".js-product-container");

let currentIndex = 0;
let typeIndex = 0;
let qty = 1;

loadPage();

function loadPage() {
  productContainer.innerHTML = getHtml(products[currentIndex]);
  const productType = document.querySelectorAll(".js-product-img-container");

  addActiveState(productType);

  productType.forEach((type, i) => {
    type.addEventListener("click", () => {
      removeActiveState(productType);
      addActiveState(productType);
      typeIndex = i;
      currentIndex = i;
      loadPage();
    });
  });
  controlTheQuantity();
}

function addActiveState(productArray) {
  productArray.forEach((p, i) => {
    if (i === typeIndex) {
      p.classList.add("active");
    }
  });
}
function removeActiveState(productArray) {
  productArray.forEach((p) => {
    if (p.classList.contains("active")) {
      p.classList.remove("active");
    }
  });
}

function getHtml(productData) {
  let html = "";
  const {
    bestUse,
    dimension,
    description,
    disposeUsage,
    holds,
    imgUrl,
    manufactured,
    name,
    price,
    productId,
    pros,
    qty,
    type,
  } = productData;

  html += `
  <div class="row text-center text-lg-start mt-3">
          <h1 class="product-type">${type}</h1>
        </div>
        <div class="row">
          <div class="col-lg-5 mb-3 d-flex flex-column align-items-center px-5">
            <div class="product-section--product-image-container pt-3">
              <img
                src="${imgUrl}"
                alt="ft-${type}-png"
                class="img-fluid"
              />
            </div>
            <p class="product-price my-3">₦${price.toLocaleString()}</p>
          </div>
          <div class="product-section--product-details col-lg-7">
            <h2 class="product-desc">Product Description</h2>
            <p>${name}</p>
            <p>
              Dimension: ${dimension} <br />
              Holds: ${holds}
            </p>
            <p>Manufactured from ${manufactured}</p>
            <p>
              ${description}
            </p>
            <p>Best Use: ${bestUse}</p>
            <p>${disposeUsage}</p>
            <p>${pros}</p>
            <div class="product-section---product-quantity mx-auto mx-lg-0">
              <div class="increase quantity-btn js-increase-btn" data-qty-type="add">
                <img
                  src="../Project_pages/images/ft-product-page-images/add.png"
                  alt="plus/add png"
                  class="img-fluid"
                  
                />
              </div>
              <div class="total-quantity js-total-quantity">${qty}</div>
              <div class="decrease quantity-btn" data-qty-type="minus">
                <img
                  src="../Project_pages/images/ft-product-page-images/minus.png"
                  alt="minus/subtract png"
                  class="img-fluid"
                />
              <h/div>
            </div>
          </div>
        </div>
        <div class="row mx-0">
          <div class="col-lg-5 order-1 order-lg-0 ">
            <p class="mb-3 text-black p">Available colours</p>
            <div class="available-products-container">
              <div class="product-img-container js-product-img-container">
                <img
                  src="../Project_pages/images/ft-product-page-images/ft-yellow-plastic-waste-bin.png"
                  alt="ft-product-name"
                  height="74"
                />
              </div>
              <div class="product-img-container js-product-img-container">
                <img
                  src="../Project_pages/images/ft-product-page-images/ft-blue-plastic-waste-bin.png"
                  alt="ft-product-name"
                  height="74"
                />
              </div>
              <div class="product-img-container js-product-img-container">
                <img
                  src="../Project_pages/images/ft-product-page-images/ft-pink-plastic-waste-bin.png"
                  alt="ft-product-name"
                  height="74"
                />
              </div>
            </div>
          </div>
          <div class="col-lg-7">
            <div class="c-btn w-75 mx-auto add-to-cart-btn">Add to Cart</div>
            <a href='/Project_pages/cartPayment.html' class="c-btn c-btn-alt w-75 mx-auto">Buy now</a>
          </div>
        </div>
        <div class="row mt-3 mb-5 mx-0">
          <p class="text-semi-bold text-black mb-3">Related products</p>
          <div class="col-12 related-products-container">
            <div class="related-products--img-container">
              <img
                src="../Project_pages/images/ft-product-page-images/ft-trash-container-1.png"
                alt="ft-product-name"
                class="img-fluid"
              />
            </div>
            <div class="related-products--img-container">
              <img
                src="../Project_pages/images/ft-product-page-images/ft-trash-container.png"
                alt="ft-product-name"
                class="img-fluid"
              />
            </div>
            <div class="related-products--img-container">
              <img
                src="../Project_pages/images/ft-product-page-images/ft-trash-container-2.png"
                alt="ft-trash-container png"
                class="img-fluid"
              />
            </div>
          </div>
        </div>
  
  
  `;

  return html;
}

function controlTheQuantity() {
  document.querySelectorAll(".quantity-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const { qtyType } = btn.dataset;
      const quantity = document.querySelector(".js-total-quantity");
      if (qtyType === "add") {
        qty++;
        quantity.innerHTML = qty;
      } else {
        if (qty !== 1) {
          qty--;
          quantity.innerHTML = qty;
        }
      }
    });
  });
}
