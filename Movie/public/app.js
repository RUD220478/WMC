async function fetchMovies() {
  const statusEl = document.getElementById("status");
  const tbody = document.querySelector("#movies-table tbody");

  try {
    // Set the status
    statusEl.textContent = "Loading List of movies...";

    // Use the route to get the data
    const res = await fetch("/movies");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    // Get an array of movies
    const movies = await res.json();

    // Clear the table
    tbody.innerHTML = "";

    // Add rows to the table
    for (const o of movies) {
      const tr = document.createElement("tr");

      const tdId = document.createElement("td");
      tdId.textContent = o.id;

      const tdTitle = document.createElement("td");
      tdTitle.textContent = o.title;

      const tdYear = document.createElement("td");
      tdYear.textContent = o.year;

      // tdRaum ?! Wie umbenennen
      tr.append(tdId, tdTitle, tdYear);
      tbody.appendChild(tr);
    }

    statusEl.textContent = `Loaded a list of ${movies.length} movies`;
  } catch (err) {
    console.error(err);
    statusEl.textContent = "Error while loading the data.";
  }
}

// When page isloaded the fetchMovies is called
window.addEventListener("DOMContentLoaded", fetchMovies);