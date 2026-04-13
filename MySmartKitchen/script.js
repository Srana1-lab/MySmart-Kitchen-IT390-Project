// Declared here so future gemini.js API can access it when "Generate" is clicked
let ingredients = [];

// Add hover effect to navigation links
document.querySelectorAll('nav ul a').forEach(link => {

 // Preview text was removed already so function was removed
  link.addEventListener('mouseleave', function () {
    // Drops focus so the link doesn't stay highlighted after clicking
    this.blur();
  });

});

//Ingredient tag system 
const input   = document.getElementById('ingredient-input');
const addBtn  = document.getElementById('add-btn');
const tagArea = document.getElementById('tag-area');

if (input && addBtn && tagArea) {

  function addTag(value) {
    const trimmed = value.trim();
    if (!trimmed) return;

    // added this line that pushes the ingredient into the array so file gemini.js can read it
    ingredients.push(trimmed);

    const tag = document.createElement('span');
    tag.className = 'tag';
    tag.innerHTML = `${trimmed} <button aria-label="Remove ${trimmed}">✕</button>`;

    tag.querySelector('button').addEventListener('click', () => {
    // Added this line so it removes the filter from the array when X is clicked
      ingredients = ingredients.filter(i => i !== trimmed);
      tag.style.transform = 'scale(0)';
      tag.style.opacity   = '0';
      tag.style.transition = 'all 0.15s ease';
      setTimeout(() => tag.remove(), 150);
    });

    tagArea.appendChild(tag);
    input.value = '';
    input.focus();
  }

  addBtn.addEventListener('click', () => addTag(input.value));

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') addTag(input.value);
  });

}

// Filter toggle system
const activeFilters = { cuisine: null, diet: [] };

// Cuisine: single-select
document.querySelectorAll('#cuisine-filters .filter-pill').forEach(btn => {
  btn.addEventListener('click', function () {
    const wasActive = this.classList.contains('active');
    document.querySelectorAll('#cuisine-filters .filter-pill')
      .forEach(b => b.classList.remove('active'));
    if (!wasActive) {
      this.classList.add('active');
      activeFilters.cuisine = this.dataset.filter;
    } else {
      activeFilters.cuisine = null;
    }
  });
});

// Diet: multi-select
document.querySelectorAll('#diet-filters .filter-pill').forEach(btn => {
  btn.addEventListener('click', function () {
    this.classList.toggle('active');
    const filter = this.dataset.filter;
    if (this.classList.contains('active')) {
      activeFilters.diet.push(filter);
    } else {
      activeFilters.diet = activeFilters.diet.filter(f => f !== filter);
    }
  });
});
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Inventory - My Smart Kitchen</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <header>
    <h1>My Smart Kitchen</h1>
    <nav>
      <ul>
        <li><a href="SmartKitchen.html">Home</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="inventory.html">Inventory</a></li>
        <li><a href="contact.html">Contact</a></li>
        <li><a href="login.html">Login</a></li>
      </ul>
    </nav>
  </header>

  <main class="inventory-page">

    <section class="inventory-hero top-hero">
      <h2>Kitchen Inventory</h2>
      <p>Track your pantry items, monitor quantities, and keep an eye on expiration dates.</p>
    </section>

    <div class="inventory-grid">

      <section class="inventory-form-section">
        <h3>Add New Item</h3>
        <form id="inventory-form">
          <label for="item-name">Item Name:</label>
          <input type="text" id="item-name" name="item-name" placeholder="Enter item name">

          <label for="quantity">Quantity:</label>
          <input type="number" id="quantity" name="quantity" placeholder="Enter quantity">

          <label for="category">Category:</label>
          <select id="category" name="category">
            <option value="">Select category</option>
            <option value="Vegetable">Vegetable</option>
            <option value="Fruit">Fruit</option>
            <option value="Dairy">Dairy</option>
            <option value="Meat">Meat</option>
            <option value="Grain">Grain</option>
            <option value="Spice">Spice</option>
            <option value="Snack">Snack</option>
            <option value="Drink">Drink</option>
            <option value="Other">Other</option>
          </select>

          <label for="expiry-date">Expiration Date:</label>
          <input type="date" id="expiry-date" name="expiry-date">

          <button type="submit">Add Item</button>
        </form>
      </section>

      <section class="inventory-table-section">
        <h3>Current Inventory</h3>
        <table>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Category</th>
              <th>Expiration Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody id="inventory-table-body"></tbody>
        </table>

        <button id="clear-all">Clear All</button>
      </section>

      <section class="inventory-info">
        <h3>Smart Kitchen Features</h3>
        <p>
          This page helps users organize ingredients, reduce food waste, and track low-stock or expiring items.
          In a future version, the system could send reminders and suggest recipes based on available ingredients.
        </p>
      </section>

    </div>
  </main>

  <footer>
    <p>&copy; 2025 My Smart Kitchen. All rights reserved.</p>
  </footer>

  <script src="script.js"></script>
</body>
</html>
function generateRecipes() {
  alert("Recipe feature coming soon!");
}
