export function increaseItem(item, store) {
  item.quantity++;
  item.total_dish_price = item.price * item.quantity;
  updateTotalCartPrice(store);
}

export function decreaseItem(item, store) {
  if (item.quantity > 1) {
    item.quantity--;
    item.total_dish_price = item.price * item.quantity;
    updateTotalCartPrice(store);
  } else {
    removeItem(item, store);
  }
}

export function removeItem(item, store) {
  const index = store.items.indexOf(item);
  if (index > -1) {
    store.items.splice(index, 1);
    updateTotalCartPrice(store);
  }
}

export function updateTotalCartPrice(store) {
  const totalCartPrice = store.items
    .reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0)
    .toFixed(2);

  store.totalCartPrice = totalCartPrice;
  localStorage.setItem("items", JSON.stringify(store.items));
  localStorage.setItem("totalCartPrice", totalCartPrice);

  console.log("Prezzo totale del carrello aggiornato:", totalCartPrice);
}
