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

      const delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.className = "delete-btn";
      delBtn.id = "delete-btn";
      delBtn.onclick = async () => {
        if (!confirm(`Remove movie ${o.title}?`)) return;
        await deleteMovie(o.id);
        await fetchMovies();
      };

      tr.append(tdId, tdTitle, tdYear, delBtn);
      tbody.appendChild(tr);
    }

    statusEl.textContent = `Loaded a list of ${movies.length} movies`;
  } catch (err) {
    console.error(err);
    statusEl.textContent = "Error while loading the data.";
  }
}


async function addMovie(title, year) {
  const statusEl = document.getElementById("status");
  try {
    const res = await fetch("/movies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, year }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await fetchMovies();
    statusEl.textContent = "Movie added.";
  } catch (err) {
    console.error(err);
    statusEl.textContent = `Error while adding movie: ${err.message}`;
  }
}

async function addClick() {
  const titleInput   = document.getElementById("movie-title");
  const title = titleInput.value.trim();
  const yearInput = document.getElementById("movie-year");
  const year = yearInput.value.trim();
  const button = document.getElementById("add-btn");
  const statusEl = document.getElementById("status");

  if (!title || !year) {
    statusEl.textContent = "Movie title and year of release required.";
    return;
  }

  button.disabled = true;
  await addMovie(title, year);
  button.disabled = false;

  titleInput.value = "";
  yearInput.value = "";
  titleInput.focus();
}

async function deleteMovie(id) {
  const statusEl = document.getElementById("status");
  try {
    const res = await fetch(`/movies/${id}`, { method: "DELETE" });
    if (res.status === 204) {
      statusEl.textContent = `Movie ${id} removed.`;
    } else {
      throw new Error(msg.error || `HTTP ${res.status}`);
    }
  } catch (err) {
    console.error(err);
    statusEl.textContent = `Error while removing: ${err.message}`;
  }
}

// When page isloaded the fetchMovies is called
window.addEventListener("DOMContentLoaded", fetchMovies);