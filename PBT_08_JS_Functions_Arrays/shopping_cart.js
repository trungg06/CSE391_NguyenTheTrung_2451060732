function createCart() {
    // Biến private, chỉ có thể truy cập qua các phương thức bên dưới
    let items = [];
    let appliedDiscount = 0; // Lưu số tiền giảm giá

    return {
        addItem(product, quantity = 1) {
            const existingItem = items.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                // Tạo một bản copy của product và thêm trường quantity
                items.push({ ...product, quantity });
            }
        },
        
        removeItem(productId) {
            items = items.filter(item => item.id !== productId);
        },
        
        updateQuantity(productId, newQuantity) {
            const item = items.find(i => i.id === productId);
            if (item) {
                if (newQuantity <= 0) {
                    this.removeItem(productId);
                } else {
                    item.quantity = newQuantity;
                }
            }
        },
        
        getTotal() {
            return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        },
        
        applyDiscount(code) {
            const subtotal = this.getTotal();
            if (code === "SALE10") {
                appliedDiscount = subtotal * 0.1;
            } else if (code === "SALE20") {
                appliedDiscount = subtotal * 0.2;
            } else if (code === "FREESHIP") {
                appliedDiscount = 30000;
            } else {
                appliedDiscount = 0;
            }
        },
        
        printCart() {
            const formatMoney = (amount) => amount.toLocaleString("vi-VN");
            
            console.log("┌──────────────────────────────────────────────┐");
            console.log("│ # │ Sản phẩm      │ SL │ Đơn giá      │ Tổng         │");
            
            items.forEach((item, index) => {
                const idStr = String(index + 1).padEnd(2);
                const nameStr = item.name.padEnd(14);
                const qtyStr = String(item.quantity).padStart(2);
                const priceStr = formatMoney(item.price).padStart(11);
                const totalStr = formatMoney(item.price * item.quantity).padStart(11);
                
                console.log(`│ ${idStr}│ ${nameStr}│ ${qtyStr} │ ${priceStr} │ ${totalStr}  │`);
            });
            
            console.log("├──────────────────────────────────────────────┤");
            
            const subtotal = this.getTotal();
            const finalTotal = Math.max(0, subtotal - appliedDiscount); // Tránh âm tiền
            
            console.log(`│ Tổng cộng:                       ${formatMoney(subtotal).padStart(11)}đ │`);
            
            if (appliedDiscount > 0) {
                console.log(`│ Giảm giá:                       -${formatMoney(appliedDiscount).padStart(11)}đ │`);
                console.log(`│ THANH TOÁN:                      ${formatMoney(finalTotal).padStart(11)}đ │`);
            }
            
            console.log("└──────────────────────────────────────────────┘");
        },
        
        getItemCount() {
            return items.reduce((sum, item) => sum + item.quantity, 0);
        },
        
        clearCart() {
            items = [];
            appliedDiscount = 0;
        }
    };
}

// === TEST ===
const cart = createCart();

cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1); // Tăng lên 2

cart.printCart();

cart.applyDiscount("SALE10");
cart.printCart();

console.log("Số SP:", cart.getItemCount()); // → 4
cart.removeItem(3);
console.log("Sau xóa:", cart.getItemCount()); // → 2