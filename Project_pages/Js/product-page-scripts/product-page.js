export let products = [];

let typeIndex = 0;

export async function getData(category) {
  try {
    const response = await fetch(
      "https://studynow-be.onrender.com/api/v1/products"
    );
    const data = await response.json();
    products = data.docs.filter((product) => {
      return product.productCategory === category;
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export function loadPage(productCategory) {
  let modifyProducts =
    JSON.parse(localStorage.getItem("modifyProducts")) || products;

  // create a variable that store selected Items
  let selectedProduct = JSON.parse(localStorage.getItem("selectedProduct")) || {
    _id: productCategory,
  };

  // cart array of objects
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  products.map((product) => {
    product.productQuantity = 1;
  });

  if (selectedProduct.count) {
    modifyProducts.map((product) => {
      if (product._id === selectedProduct._id) {
        product.productQuantity = selectedProduct.count;
      }
    });
  }

  localStorage.setItem("modifyProducts", JSON.stringify(modifyProducts));

  let matchingProduct = getMatchingProduct(selectedProduct, modifyProducts);

  // rendering the html
  document.querySelector(".js-product-container").innerHTML = getProductHTML(
    matchingProduct,
    selectedProduct
  );

  if (matchingProduct._id !== "66d64aa940ff47651e6afe77") {
    document.querySelector(".js-colors-container").innerHTML = "";
  }

  const productType = document.querySelectorAll(".js-product-img-container");

  addActiveState(productType);

  productType.forEach((type, i) => {
    type.addEventListener("click", (e) => {
      if (!type.classList.contains("active")) {
        removeActiveState(productType);
        type.classList.add("active");
        const index = i;
        const img = document.querySelector(".js-product-img");
        const imgUrl = e.target.src;
        img.src = imgUrl;
      }
    });
  });

  let qty = matchingProduct.productQuantity;

  // add the functionality
  controlTheQuantity(qty, modifyProducts, saveUpdatedProductsToStorage);

  // target the action btns and add event listener
  const productBtn = document.querySelector(".js-product-CTA");

  productBtn.addEventListener("click", (e) => {
    const btn = e.target.textContent;
    const { productId } = productBtn.dataset;

    let matchingProduct = getMatchingProduct(selectedProduct, modifyProducts);

    qty = matchingProduct.productQuantity;

    if (btn === "Add to Cart") {
      // add to cart functionality

      const existingProduct = cart.find(
        (product) => product._id === matchingProduct._id
      );

      if (!existingProduct) {
        cart.push({
          _id: matchingProduct._id,
          count: qty,
        });
      } else {
        cart.forEach((product) => {
          if (product._id === matchingProduct._id) {
            product.count = qty;
          }
        });
      }
    } else if (btn === "Buy now") {
      // redirect to cartPayment us page

      window.location.href = "cartPayment.html";
    }

    saveCartItemsToStorage(cart);
  });

  // add click event to the related product
  document.querySelectorAll(".js-related-product").forEach((product) => {
    product.addEventListener("click", () => {
      const { productId } = product.dataset;
      saveSelectedProductToStorage(productId);
      loadPage();
    });
  });
}

function controlTheQuantity(productQty, productsArray) {
  let qty = productQty;
  document.querySelectorAll(".quantity-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const { qtyType } = btn.dataset;
      const { productId } = btn.dataset;

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

      productsArray.forEach((product) => {
        if (product._id === productId) {
          product.productQuantity = qty;
        }
      });

      saveUpdatedProductsToStorage(productsArray);
    });
  });
}

function getMatchingProduct(selectedArray, productsArray) {
  if (selectedArray) {
    let matchingProduct;
    productsArray.forEach((product) => {
      if (product._id === selectedArray._id) {
        matchingProduct = product;
      }
    });
    return matchingProduct;
  } else {
    console.error("Selected product is not defined");
    return null;
  }
}

function getRelatedProducts(relatedProductArray) {
  let html = "";
  relatedProductArray.forEach((product) => {
    const productImg = product.productImages[0];
    const productName = product.productName;
    const productId = product._id;

    html += `
    <div class="related-products--img-container js-related-product" data-product-id ="${productId}" >
              <img
                src="${productImg}"
                alt="img of ${productName}"
                class="img-fluid"
              />
            </div>
    `;
  });

  return html;
}

function saveSelectedProductToStorage(id) {
  localStorage.setItem("selectedProduct", JSON.stringify({ _id: id }));
}

function saveUpdatedProductsToStorage(productsArray) {
  localStorage.setItem("modifyProducts", JSON.stringify(productsArray));
}

function getProductHTML(productData, selectedArray) {
  let relatedProducts = [];
  let html = "";

  const {
    bestUse,
    description,
    dimensions,
    price,
    productName,
    productImages,
    productQuantity,
    _id,
    features,
    emptyingMethod,
    material,
    capacity,
    coverFeatures,
    weightLimit,
  } = productData;

  const imgUrl = productImages[0];
  const formattedPrice = Number(price).toLocaleString();

  // get the related product array
  products.forEach((product) => {
    if (product._id !== selectedArray._id) {
      relatedProducts.push(product);
    }
  });

  html += `
  <div class="row text-center text-lg-start mt-3">
          <h1 class="product-type">${productName}</h1>
        </div>
        <div class="row">
          <div class="col-lg-5 mb-3 d-flex flex-column align-items-center px-5">
            <div class="product-section--product-image-container pt-3">
              <img
                src="${imgUrl}"
                alt="ft-${productName}-png"
                class="img-fluid js-product-img"
                width=600
              />
            </div>
            <p class="product-price my-3">₦${formattedPrice}</p>
          </div>
          <div class="product-section--product-details col-lg-7">
            <h2 class="product-desc">Product Description</h2>
            <p>${productName}</p>
            <p>
              Dimension: ${dimensions} <br />
              Capacity: ${capacity} 
            </p>
            <p> Weight Limit: ${weightLimit}</p>
            <p> Material: ${material}</p>
            <p>
             Description: ${description}
            </p>
            <p>
             Cover: ${coverFeatures}
            </p>
            <p>Best Use: ${bestUse}</p>
            <p>To be emptied by ${emptyingMethod}</p>
            <p> Features: ${features}</p>
            <div class="product-section---product-quantity mx-auto mx-lg-0">
              <div class="increase quantity-btn js-increase-btn" data-qty-type="add" data-product-id="${_id}">
                <img
                  src="../Project_pages/images/ft-product-page-images/add.png"
                  alt="plus/add png"
                  class="img-fluid"
                  
                />
              </div>
              <div class="total-quantity js-total-quantity">${productQuantity}</div>
              <div class="decrease quantity-btn" data-qty-type="minus" data-product-id="${_id}">
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
          <div class="col-lg-5 order-1 order-lg-0 js-colors-container">
            <p class="mb-3 text-black p">Available colours</p>
            <div class="available-products-container">
              <div class="product-img-container js-product-img-container">
                <img
                  src="${imgUrl}"
                  alt="green plastic bin"
                  height="74"
                  
                />
              </div>
              <div class="product-img-container js-product-img-container">
                <img
                  src="../Project_pages/images/ft-product-page-images/ft-yellow-plastic-waste-bin.png"
                  alt="yellow plastic bin"
                  height="74"
                />
              </div>
              <div class="product-img-container js-product-img-container">
                <img
                  src="../Project_pages/images/ft-product-page-images/ft-blue-plastic-waste-bin.png"
                  alt="blue plastic"
                  height="74"
                />
              </div>
              <div class="product-img-container js-product-img-container">
                <img
                  src="../Project_pages/images/ft-product-page-images/ft-pink-plastic-waste-bin.png"
                  alt="pink plastic"
                  height="74"
                />
              </div>
            </div>
          </div>
          <div class="col-lg-7 js-product-CTA" data-product-id="${_id}">
            <div class="c-btn w-75 mx-auto add-to-cart-btn" >Add to Cart</div>
            <div class="c-btn c-btn-alt w-75 mx-auto">Buy now</div>
          </div>
        </div>
        <div class="row mt-3 mb-5 mx-0">
          <p class="text-semi-bold text-black mb-3">Related products</p>
          <div class="col-12 related-products-container">
           ${getRelatedProducts(relatedProducts)}
          </div>
        </div>
  
  
  `;

  return html;
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

function saveCartItemsToStorage(cartArray) {
  localStorage.setItem("cart", JSON.stringify(cartArray));
}
