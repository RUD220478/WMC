let editingId = null;

async function fetchOrders() {
  const statusEl = document.getElementById("status");
  const tbody = document.querySelector("#orders-table tbody");

  try {
    statusEl.textContent = "Load data...";
    const res = await fetch("/orders");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const orders = await res.json();

    tbody.innerHTML = "";
    for (const o of orders) {
      const tr = document.createElement("tr");

      const tdId = document.createElement("td");
      tdId.textContent = o.id;

      const tdName = document.createElement("td");
      const tdPizza = document.createElement("td");
      const tdActions = document.createElement("td");

      if (editingId === o.id) {
        // Edit mode
        const nameInput = document.createElement("input");
        nameInput.type = "text";
        nameInput.value = o.name;
        nameInput.className = "input-sm";

        const pizzaInput = document.createElement("input");
        pizzaInput.type = "text";
        pizzaInput.value = o.pizza;
        pizzaInput.className = "input-sm";

        tdName.appendChild(nameInput);
        tdPizza.appendChild(pizzaInput);

        const saveBtn = document.createElement("button");
        saveBtn.textContent = "Speichern";
        saveBtn.className = "save-btn";
        saveBtn.onclick = async () => {
          if (!nameInput.value.trim() || !pizzaInput.value.trim()) {
            document.getElementById("status").textContent = "Name und Pizza erforderlich.";
            return;
          }
          await updateOrder(o.id, {
            name: nameInput.value.trim(),
            pizza: pizzaInput.value.trim(),
          });
          editingId = null;
          await fetchOrders();
        };

        const cancelBtn = document.createElement("button");
        cancelBtn.textContent = "Abbrechen";
        cancelBtn.className = "cancel-btn";
        cancelBtn.onclick = async () => {
          editingId = null;
          await fetchOrders();
        };

        tdActions.append(saveBtn, " ", cancelBtn);
      } else {
        // View mode
        tdName.textContent = o.name;
        tdPizza.textContent = o.pizza;

        const editBtn = document.createElement("button");
        editBtn.textContent = "Bearbeiten";
        editBtn.className = "edit-btn";
        editBtn.onclick = () => {
          editingId = o.id;
          fetchOrders();
        };

        const delBtn = document.createElement("button");
        delBtn.textContent = "Löschen";
        delBtn.className = "delete-btn";
        delBtn.onclick = async () => {
          if (!confirm(`Order ${o.name} wirklich löschen?`)) return;
          await deleteOrder(o.id);
          await fetchOrders();
        };

        tdActions.append(editBtn, " ", delBtn);
      }

      tr.append(tdId, tdName, tdPizza, tdActions);
      tbody.appendChild(tr);
    }

    statusEl.textContent = `Geladen: ${orders.length} Orderen`;
  } catch (err) {
    console.error(err);
    statusEl.textContent = "Fehler beim Laden der Daten.";
  }
}

async function addClick() {
    const nameInput   = document.getElementById("order-name");
    const name = nameInput.value.trim();
    const pizzaInput = document.getElementById("order-pizza");
    const pizza = pizzaInput.value.trim();
    const button = document.getElementById("add-btn");
    const statusEl = document.getElementById("status");

    if (!name || !pizza) {
      statusEl.textContent = "Name and pizza required.";
      return;
    }

    button.disabled = true;
    await addOrder(name, pizza);
    button.disabled = false;

    nameInput.value = "";
    pizzaInput.value = "";
    nameInput.focus();
}

async function addOrder(name, pizza) {
  const statusEl = document.getElementById("status");
  try {
    const res = await fetch("/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, pizza }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await fetchOrders();
    statusEl.textContent = "Order added.";
  } catch (err) {
    console.error(err);
    statusEl.textContent = `Error while added a order: ${err.message}`;
  }
}

async function deleteOrder(id) {
  const statusEl = document.getElementById("status");
  try {
    const res = await fetch(`/orders/${id}`, { method: "DELETE" });
    if (res.status === 204) {
      statusEl.textContent = `Order ${id} removed.`;
    } else {
      throw new Error(msg.error || `HTTP ${res.status}`);
    }
  } catch (err) {
    console.error(err);
    statusEl.textContent = `Error while removing: ${err.message}`;
  }
}

async function updateOrder(id, data) {
  const statusEl = document.getElementById("status");
  try {
    const res = await fetch(`/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const msg = await res.json().catch(() => ({}));
      throw new Error(msg.error || `HTTP ${res.status}`);
    }
    statusEl.textContent = `Order ${id} aktualisiert.`;
  } catch (err) {
    console.error(err);
    statusEl.textContent = `Fehler beim Aktualisieren: ${err.message}`;
  }
}

// When page isloaded the fetchOrders is called
window.addEventListener("DOMContentLoaded", fetchOrders);
