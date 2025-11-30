async function fetchOrders() {
  const statusEl = document.getElementById("status");
  const tbody = document.querySelector("#orders-table tbody");

  try {
    // Set the status
    statusEl.textContent = "Load data...";

    // Use the route to get the data
    const res = await fetch("/orders");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    // Get an array of orders
    const orders = await res.json();

    // Clear the table
    tbody.innerHTML = "";

    // Add rows to the table
    for (const o of orders) {
      const tr = document.createElement("tr");

      const tdId = document.createElement("td");
      tdId.textContent = o.id;

      const tdName = document.createElement("td");
      tdName.textContent = o.name;

      const tdPizza = document.createElement("td");
      tdPizza.textContent = o.pizza;

      tr.append(tdId, tdName, tdPizza);
      tbody.appendChild(tr);
    }

    statusEl.textContent = `Loaded: ${orders.length} orders`;
  } catch (err) {
    console.error(err);
    statusEl.textContent = "Error while loading the data.";
  }
}

// When page isloaded the fetchOrders is called
window.addEventListener("DOMContentLoaded", fetchOrders);
