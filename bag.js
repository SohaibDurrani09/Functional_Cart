const DELIVERY_FEES = 99;
let bagItemObjects;
onLoad();

function onLoad() {
  loadBagItemObjects();
  displayBagItems();
  displayBagSummary();
  addPlaceOrderEventListener();
}

function displayBagSummary() {
  let bagSummaryElement = document.querySelector('.bag-summary');
  let totalItem = bagItemObjects.length;
  let totalMRP = 0;
  let totalDiscount = 0;
  let finalPayment = 0;
  let deliveryFee = totalItem > 0 ? DELIVERY_FEES : 0;

  bagItemObjects.forEach(bagItem => {
    totalMRP += bagItem.original_price;
    totalDiscount += bagItem.original_price - bagItem.current_price;
  });

  finalPayment = totalMRP - totalDiscount + deliveryFee;

  bagSummaryElement.innerHTML = totalItem > 0 ? `
    <div class="bag-details-container">
      <div class="price-header">PRICE DETAILS (${totalItem} Items)</div>
      <div class="price-item">
        <span class="price-item-tag">Total MRP</span>
        <span class="price-item-value">${totalMRP}</span>
      </div>
      <div class="price-item">
        <span class="price-item-tag">Discount on MRP</span>
        <span class="price-item-value priceDetail-base-discount">-${totalDiscount}</span>
      </div>
      <div class="price-item">
        <span class="price-item-tag">Delivery Fee</span>
        <span class="price-item-value">${deliveryFee}</span>
      </div>
      <hr>
      <div class="price-footer">
        <span class="price-item-tag">Total Amount</span>
        <span class="price-item-value">${finalPayment}</span>
      </div>
    </div>
    <button id="btn-place-order" class="btn-place-order">
      <div class="css-xjhrni">PLACE ORDER</div>
    </button>
  ` : `<div class="empty-cart-message">Your cart is empty.</div>`;
}

function loadBagItemObjects() {
  console.log(bagItems);
  bagItemObjects = bagItems.map(itemId => {
    for (let i = 0; i < items.length; i++) {
      if (itemId == items[i].id) {
        return items[i];
      }
    }
  });
  console.log(bagItemObjects);
}

function displayBagItems() {
  let containerElement = document.querySelector('.bag-items-container');
  let innerHTML = '';

  if (bagItemObjects.length > 0) {
    bagItemObjects.forEach(bagItem => {
      innerHTML += generateItemHTML(bagItem);
    });
  } else {
    innerHTML = `<div class="empty-cart-message">Your cart is empty.</div>`;
  }

  containerElement.innerHTML = innerHTML;
}

function removeFromBag(itemId) {
  bagItems = bagItems.filter(bagItemId => bagItemId != itemId);
  localStorage.setItem('bagItems', JSON.stringify(bagItems));
  loadBagItemObjects();
  displayBagIcon();
  displayBagItems();
  displayBagSummary();
}

function generateItemHTML(item) {
  return `<div class="bag-item-container">
    <div class="item-left-part">
      <img class="bag-item-img" src="../${item.image}">
    </div>
    <div class="item-right-part">
      <div class="company">${item.company}</div>
      <div class="item-name">${item.item_name}</div>
      <div class="price-container">
        <span class="current-price">Rs ${item.current_price}</span>
        <span class="original-price">Rs ${item.original_price}</span>
        <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
      </div>
      <div class="return-period">
        <span class="return-period-days">${item.return_period} days</span> return available
      </div>
      <div class="delivery-details">
        Delivery by
        <span class="delivery-details-days">${item.delivery_date}</span>
      </div>
    </div>
    <div class="remove-from-cart" onclick="removeFromBag(${item.id})">X</div>
  </div>`;
}

function addPlaceOrderEventListener() {
  let placeOrderButton = document.getElementById('btn-place-order');
  if (placeOrderButton) {
    placeOrderButton.addEventListener('click', placeOrder);
  }
}

function placeOrder() {
  alert('Order placed successfully!');
  bagItems = [];
  localStorage.setItem('bagItems', JSON.stringify(bagItems));
  loadBagItemObjects();
  displayBagIcon();
  displayBagItems();
  displayBagSummary();
}
