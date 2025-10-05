// UI rendering

// Render categories menu
function renderCategories() {
    const categoriesContainer = document.querySelector('.categories');
    categoriesContainer.innerHTML = '';
    
    menuData.categories.forEach(category => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="fas ${category.icon}"></i> ${category.name}`;
        li.dataset.category = category.id;
        
        if (category.id === currentState.currentCategory) {
            li.classList.add('active');
        }
        
        categoriesContainer.appendChild(li);
    });
}

// Render menu items
function renderMenuItems() {
    const menuContainer = document.getElementById('menu-items-container');
    menuContainer.innerHTML = '';
    
    const items = getCurrentCategoryItems();
    
    if (items.length === 0) {
        menuContainer.innerHTML = '<div class="no-items">No items available</div>';
        return;
    }
    
    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.dataset.id = item.id;
        
        card.innerHTML = `
            <div class="item-image">
                <i class="fas ${item.icon}"></i>
            </div>
            <div class="item-info">
                <h3>${item.name}</h3>
                <p>${item.description}</p >
                <span class="item-price">${formatPrice(item.price)}</span>
                <button class="add-btn" data-id="${item.id}">Add to Order</button>
            </div>
        `;
        
        menuContainer.appendChild(card);
    });
}

// Render order items
function renderOrderItems() {
    const orderContainer = document.getElementById('order-items-container');
    orderContainer.innerHTML = '';
    
    if (currentState.orderItems.length === 0) {
        orderContainer.innerHTML = '<div class="no-items">Order is empty</div>';
        return;
    }
    
    currentState.orderItems.forEach(item => {
        const li = document.createElement('li');
        li.className = 'order-item';
        li.dataset.id = item.id;
        
        li.innerHTML = `
            <div class="order-item-info">
                <h4>${item.name}</h4>
                <span class="order-item-price">${formatPrice(item.price)}</span>
            </div>
            <div class="quantity-controls">
                <span class="quantity-btn minus">-</span>
                <span class="quantity">${item.quantity}</span>
                <span class="quantity-btn plus">+</span>
                <span class="remove-btn"><i class="fas fa-trash"></i></span>
            </div>
        `;
        
        orderContainer.appendChild(li);
    });
}

// Update order total
function updateOrderTotal() {
    const totals = calculateTotal(currentState.orderItems);
    
    document.getElementById('subtotal-price').textContent = totals.subtotal;
    document.getElementById('service-fee').textContent = totals.serviceFee;
    document.getElementById('total-price').textContent = totals.total;
}

// Update current category title
function updateCategoryTitle() {
    const category = menuData.categories.find(c => c.id === currentState.currentCategory);
    document.getElementById('current-category').textContent = category ? category.name : 'All Items';
}
