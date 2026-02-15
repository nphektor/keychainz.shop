let products = [];
let filteredProducts = [];
let selectedCategory = 'All';
let editingProductId = null;
let hasUnsavedChanges = false;

// Initialize app
async function init() {
  await loadProducts();
  renderCategoryFilters();
  renderProducts();
  attachEventListeners();
}

// Load products from file
async function loadProducts() {
  try {
    products = await window.electronAPI.readProducts();
    filteredProducts = [...products];
    hasUnsavedChanges = false;
    updateStatusBar();
  } catch (error) {
    showNotification('Error loading products: ' + error.message, 'error');
  }
}

// Save products to file
async function saveProducts() {
  try {
    const result = await window.electronAPI.writeProducts(products);
    if (result.success) {
      showNotification('Products saved successfully!');
      hasUnsavedChanges = false;
      updateStatusBar();
    } else {
      showNotification('Error saving products: ' + result.error, 'error');
    }
  } catch (error) {
    showNotification('Error saving products: ' + error.message, 'error');
  }
}

// Export products
async function exportProducts() {
  try {
    const result = await window.electronAPI.exportProducts(products);
    if (result.success && !result.cancelled) {
      showNotification('Products exported to: ' + result.path);
    }
  } catch (error) {
    showNotification('Error exporting products: ' + error.message, 'error');
  }
}

// Import products
async function importProducts() {
  try {
    const result = await window.electronAPI.importProducts();
    if (result.success && !result.cancelled) {
      products = result.products;
      filteredProducts = [...products];
      hasUnsavedChanges = true;
      renderCategoryFilters();
      renderProducts();
      updateStatusBar();
      showNotification('Products imported successfully!');
    } else if (result.error) {
      showNotification('Error importing products: ' + result.error, 'error');
    }
  } catch (error) {
    showNotification('Error importing products: ' + error.message, 'error');
  }
}

// Render category filters
function renderCategoryFilters() {
  const categories = ['All', ...new Set(products.map(p => p.category))];
  const container = document.getElementById('categoryFilters');
  
  container.innerHTML = categories.map(cat => `
    <button class="category-badge ${selectedCategory === cat ? 'active' : ''}" data-category="${cat}">
      ${cat}
    </button>
  `).join('');

  // Attach click events
  container.querySelectorAll('.category-badge').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedCategory = btn.dataset.category;
      filterProducts();
      renderCategoryFilters();
    });
  });
}

// Filter products
function filterProducts() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  
  filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
                         product.description.toLowerCase().includes(searchTerm);
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  renderProducts();
}

// Render products grid
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  const emptyState = document.getElementById('emptyState');
  
  if (filteredProducts.length === 0) {
    grid.classList.add('hidden');
    emptyState.classList.remove('hidden');
    return;
  }
  
  grid.classList.remove('hidden');
  emptyState.classList.add('hidden');
  
  grid.innerHTML = filteredProducts.map((product, index) => `
    <div class="product-card" style="animation-delay: ${index * 0.05}s">
      <div class="product-image" style="background-image: url('${product.imageUrl}')">
        <div class="product-category-badge">${product.category}</div>
      </div>
      <div class="product-content">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <div class="product-footer">
          <div class="product-price">$${product.price.toFixed(2)}</div>
          <div class="product-actions">
            <button class="btn-icon btn-edit" data-id="${product.id}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </button>
            <button class="btn-icon btn-delete" data-id="${product.id}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  // Attach event listeners to product buttons
  grid.querySelectorAll('.btn-edit').forEach(btn => {
    btn.addEventListener('click', () => openEditModal(parseInt(btn.dataset.id)));
  });

  grid.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', () => deleteProduct(parseInt(btn.dataset.id)));
  });
  
  updateStatusBar();
}

// Open add modal
function openAddModal() {
  editingProductId = null;
  document.getElementById('modalTitle').textContent = 'Add New Product';
  document.getElementById('submitBtnText').textContent = 'Create Product';
  document.getElementById('productForm').reset();
  document.getElementById('modalOverlay').classList.remove('hidden');
}

// Open edit modal
function openEditModal(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  
  editingProductId = productId;
  document.getElementById('modalTitle').textContent = 'Edit Product';
  document.getElementById('submitBtnText').textContent = 'Update Product';
  
  document.getElementById('productName').value = product.name;
  document.getElementById('productPrice').value = product.price;
  document.getElementById('productCategory').value = product.category;
  document.getElementById('productDescription').value = product.description;
  document.getElementById('productImageUrl').value = product.imageUrl;
  
  document.getElementById('modalOverlay').classList.remove('hidden');
}

// Close modal
function closeModal() {
  document.getElementById('modalOverlay').classList.add('hidden');
  editingProductId = null;
}

// Handle form submit
function handleFormSubmit(e) {
  e.preventDefault();
  
  const formData = {
    name: document.getElementById('productName').value,
    price: parseFloat(document.getElementById('productPrice').value),
    category: document.getElementById('productCategory').value,
    description: document.getElementById('productDescription').value,
    imageUrl: document.getElementById('productImageUrl').value
  };
  
  if (editingProductId) {
    // Update existing product
    const index = products.findIndex(p => p.id === editingProductId);
    if (index !== -1) {
      products[index] = { ...products[index], ...formData };
      showNotification('Product updated successfully!');
    }
  } else {
    // Add new product
    const newProduct = {
      id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
      ...formData
    };
    products.push(newProduct);
    showNotification('Product added successfully!');
  }
  
  hasUnsavedChanges = true;
  closeModal();
  renderCategoryFilters();
  filterProducts();
}

// Delete product
function deleteProduct(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  
  if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
    products = products.filter(p => p.id !== productId);
    hasUnsavedChanges = true;
    renderCategoryFilters();
    filterProducts();
    showNotification('Product deleted successfully!');
  }
}

// Show notification
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Update status bar
function updateStatusBar() {
  document.getElementById('productCount').textContent = 
    `${products.length} product${products.length !== 1 ? 's' : ''}`;
  
  const statusEl = document.getElementById('saveStatus');
  if (hasUnsavedChanges) {
    statusEl.innerHTML = '<span class="unsaved-indicator">● Unsaved changes</span>';
  } else {
    statusEl.innerHTML = '<span style="color: #4ade80;">✓ All changes saved</span>';
  }
}

// Attach event listeners
function attachEventListeners() {
  document.getElementById('searchInput').addEventListener('input', filterProducts);
  document.getElementById('addBtn').addEventListener('click', openAddModal);
  document.getElementById('saveBtn').addEventListener('click', saveProducts);
  document.getElementById('exportBtn').addEventListener('click', exportProducts);
  document.getElementById('importBtn').addEventListener('click', importProducts);
  document.getElementById('closeModal').addEventListener('click', closeModal);
  document.getElementById('cancelBtn').addEventListener('click', closeModal);
  document.getElementById('productForm').addEventListener('submit', handleFormSubmit);
  
  // Close modal on overlay click
  document.getElementById('modalOverlay').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  });
  
  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Ctrl+S or Cmd+S to save
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      saveProducts();
    }
    // Escape to close modal
    if (e.key === 'Escape') {
      closeModal();
    }
  });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
