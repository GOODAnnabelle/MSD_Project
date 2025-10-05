// Utility functions

// Format price to USD display
function formatPrice(price) {
    return '$' + price.toFixed(2);
}

// Calculate order total
function calculateTotal(orderItems) {
    const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const serviceFee = 10; // Fixed service fee
    const total = subtotal + serviceFee;
    
    return {
        subtotal: formatPrice(subtotal),
        serviceFee: formatPrice(serviceFee),
        total: formatPrice(total),
        rawSubtotal: subtotal,
        rawTotal: total
    };
}

// Save to local storage
function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Load from local storage
function loadFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
