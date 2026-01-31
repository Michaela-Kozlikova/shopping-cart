const scanner = document.getElementById(`navTrigger`);
const navMenu = document.querySelector(`.left-nav`);

scanner.addEventListener(`click`, () => {
  navMenu.classList.toggle(`open`);
});

const title = document.querySelectorAll(`.matrix-title`);

title.forEach((title) => {
  const text = title.innerText;
  title.innerText = ``;

  text.split(``).forEach((char, i) => {
    const span = document.createElement(`span`);
    span.innerText = char === ` ` ? `\u00A0` : char;
    span.className = `letter`;
    span.style.animationDelay = `${i * 0.1}s`;
    title.appendChild(span);
  });

  const cursor = document.createElement(`span`);
  cursor.innerText = ``;
  cursor.className = `terminal-block`;
  cursor.style.animationDelay = `${text.length * 0.11}s`;
  title.appendChild(cursor);
});

const cards = document.querySelectorAll(".product-card");

cards.forEach((card) => {
  card.addEventListener("click", () => {
    cards.forEach((otherCard) => {
      if (otherCard !== card) otherCard.classList.remove("active");
    });

    card.classList.toggle("active");
  });
});

class ShoppingCart {
  constructor() {
    this.items = [];
    this.totalPrice = 0;
    this.userName = "CYBER_GHOST_2077";
  }

  addItem(productName, productPrice) {
    const existingItem = this.items.find((item) => item.name === productName);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      const newItem = {
        name: productName,
        price: productPrice,
        quantity: 1,
      };
      this.items.push(newItem);
    }
    this.calculateTotal();
    this.render();
  }

  removeItem(productName) {
    const itemIndex = this.items.findIndex((item) => item.name === productName);

    if (itemIndex > -1) {
      if (this.items[itemIndex].quantity > 1) {
        this.items[itemIndex].quantity -= 1;
      } else {
        this.items.splice(itemIndex, 1);
      }
    }
    this.calculateTotal();
    this.render();
  }

  calculateTotal() {
    this.totalPrice = this.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
  }

  render() {
    const listContainer = document.querySelector(".cart-items-list");
    const priceLabel = document.querySelector(".total-price");
    const countLabel = document.querySelector(".cart-count");

    if (!listContainer) return;

    listContainer.innerHTML = `
      <p style="color: #00ff41;">> USER: ${this.userName}</p>
      <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
        <thead>
          <tr style="border-bottom: 2px solid #ff00ff;">
            <th style="text-align: left; padding: 5px;">ITEM</th>
            <th style="text-align: right; padding: 5px;">QTY</th>
            <th style="text-align: right; padding: 5px;">PRICE</th>
          </tr>
        </thead>
        <tbody id="cart-table-body"></tbody>
      </table>
    `;

    const tableBody = document.getElementById("cart-table-body");

    if (this.items.length === 0) {
      const emptyRow = document.createElement("tr");
      emptyRow.innerHTML = `
        <td colspan="4" style="text-align: center; padding: 40px 0;">
            <span class="blink"> [ WAITING_FOR_DATA_STREAM... ]</span>
            </td>
            `;
      tableBody.appendChild(emptyRow);
    } else {
      this.items.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td style="text-align: left; padding: 5px;"> ${item.name}</td>
        <td style="text-align: right; padding: 5px;"> ${item.quantity}</td>
        <td style="text-align: right; padding: 5px;"> ${(item.price * item.quantity).toLocaleString()} CR</td>
        <td style="text-align: center; padding: 10px 5px; border-bottom: 1px solid rgba(0, 255, 65, 0.1);">
          <button class="remove-item" data-name="${item.name}" style="background:none; border:1px solid #ff00ff; color:#ff00ff; cursor:pointer; padding: 2px 6px;">-</button>
        </td>
      `;
        tableBody.appendChild(row);
      });

      document.querySelectorAll(`.remove-item`).forEach((btn) => {
        btn.addEventListener(`click`, () => {
          this.removeItem(btn.getAttribute(`data-name`));
        });
      });
    }
    if (priceLabel) priceLabel.innerText = this.totalPrice.toLocaleString();

    const totalQty = this.items.reduce((sum, item) => sum + item.quantity, 0);
    if (countLabel) {
      countLabel.innerText = `[${totalQty}]`;

      countLabel.style.color = "#ff00ff";
      setTimeout(() => {
        countLabel.style.color = "";
      }, 150);
    }
  }
}

const myCart = new ShoppingCart();

const allBuyButtons = document.querySelectorAll(".buy-button");

allBuyButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.stopPropagation();

    const card = button.closest(".product-card");

    const name = card.querySelector("h3").innerText;
    const priceRaw = card.querySelector(".price").innerText;

    const cleanPrice = Number(priceRaw.replace(/[^0-9]/g, "")) / 100;

    myCart.addItem(name, cleanPrice);
  });
});

const cartPanel = document.getElementById("cartSidebar");
const cartOpenTrigger = document.querySelector(".cart-chip");
const cartCloseTrigger = document.getElementById("closeCart");

if (cartOpenTrigger) {
  cartOpenTrigger.addEventListener("click", () => {
    cartPanel.classList.add("open");
    cartOpenTrigger.classList.add("hidden");
    console.log("System: Vault opened. Hiding chip...");
  });
}

if (cartCloseTrigger) {
  cartCloseTrigger.addEventListener("click", () => {
    cartPanel.classList.remove("open");
    cartOpenTrigger.classList.remove("hidden");
    console.log("System: Vault secured. Restoring chip...");
  });
}

myCart.render();
