// State management

let currentState = {
    currentCategory: 'all',
    searchQuery: '',
    orderItems: []
};

// Initialize state
function initState() {
    const savedOrder = loadFromLocalStorage('restaurantOrder');
    if (savedOrder) {
        currentState.orderItems = savedOrder;
    }
}

// Get current category items
function getCurrentCategoryItems() {
    if (currentState.currentCategory === 'all') {
        return menuData.items.filter(item => 
            item.name.toLowerCase().includes(currentState.searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(currentState.searchQuery.toLowerCase())
        );
    }
    
    return menuData.items.filter(item => 
        item.category === currentState.currentCategory &&
        (item.name.toLowerCase().includes(currentState.searchQuery.toLowerCase()) ||
         item.description.toLowerCase().includes(currentState.searchQuery.toLowerCase()))
    );
}

// Add item to order
function addToOrder(itemId) {
    const item = menuData.items.find(i => i.id === itemId);
    if (!item) return;
    
    const existingItem = currentState.orderItems.find(i => i.id === itemId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        currentState.orderItems.push({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: 1
        });
    }
    
    saveToLocalStorage('restaurantOrder', currentState.orderItems);
}

// Update order item quantity
function updateOrderItemQuantity(itemId, change) {
    const item = currentState.orderItems.find(i => i.id === itemId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        currentState.orderItems = currentState.orderItems.filter(i => i.id !== itemId);
    }
    
    saveToLocalStorage('restaurantOrder', currentState.orderItems);
}

// Remove order item
function removeOrderItem(itemId) {
    currentState.orderItems = currentState.orderItems.filter(i => i.id !== itemId);
    saveToLocalStorage('restaurantOrder', currentState.orderItems);
}

// Clear order
function clearOrder() {
    currentState.orderItems = [];
    saveToLocalStorage('restaurantOrder', currentState.orderItems);
}
