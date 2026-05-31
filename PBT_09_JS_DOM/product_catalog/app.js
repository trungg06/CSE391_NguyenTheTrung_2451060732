const products = [
    { id: 1, name: "iPhone 16", price: 25990000, category: "phone", image: "https://placehold.co/200?text=iPhone+16", rating: 4.5, inStock: true },
    { id: 2, name: "MacBook Pro", price: 45990000, category: "laptop", image: "https://placehold.co/200?text=MacBook", rating: 4.8, inStock: true },
    { id: 3, name: "iPad Air", price: 16990000, category: "tablet", image: "https://placehold.co/200?text=iPad", rating: 4.6, inStock: false },
    { id: 4, name: "Samsung S24", price: 22990000, category: "phone", image: "https://placehold.co/200?text=S24", rating: 4.4, inStock: true },
    // Thêm các sản phẩm khác tương tự
];

const productList = document.getElementById('productList');
const searchInput = document.getElementById('searchInput');
const categoryFilters = document.getElementById('categoryFilters');
const sortSelect = document.getElementById('sortSelect');
const cartBadge = document.getElementById('cartBadge');
const modal = document.getElementById('productModal');
const modalBody = document.getElementById('modalBody');

let cartCount = 0;
let currentSearch = '';
let currentCat = 'all';
let currentSort = 'default';

function renderProducts() {
    productList.innerHTML = '';
    
    // Filter
    let filtered = products.filter(p => {
        const matchCat = currentCat === 'all' || p.category === currentCat;
        const matchSearch = p.name.toLowerCase().includes(currentSearch.toLowerCase());
        return matchCat && matchSearch;
    });

    // Sort
    if (currentSort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
    if (currentSort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
    if (currentSort === 'name-asc') filtered.sort((a, b) => a.name.localeCompare(b.name));
    if (currentSort === 'rating') filtered.sort((a, b) => b.rating - a.rating);

    // Render
    filtered.forEach(p => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.id = p.id;
        
        card.innerHTML = `
            <img src="${p.image}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>${p.price.toLocaleString('vi-VN')}đ</p>
            <p>⭐ ${p.rating}</p>
            <button class="add-to-cart" ${!p.inStock ? 'disabled' : ''}>
                ${p.inStock ? 'Thêm giỏ' : 'Hết hàng'}
            </button>
        `;
        productList.appendChild(card);
    });
}

// 1. Search
searchInput.addEventListener('input', (e) => {
    currentSearch = e.target.value;
    renderProducts();
});

// 2. Category Filter
categoryFilters.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        document.querySelector('.cat-btn.active').classList.remove('active');
        e.target.classList.add('active');
        currentCat = e.target.dataset.cat;
        renderProducts();
    }
});

// 3. Sort
sortSelect.addEventListener('change', (e) => {
    currentSort = e.target.value;
    renderProducts();
});

// 4. Event Delegation: Modal & Add to Cart
productList.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if (!card) return;
    const pId = Number(card.dataset.id);
    const product = products.find(p => p.id === pId);

    if (e.target.classList.contains('add-to-cart')) {
        cartCount++;
        cartBadge.textContent = cartCount;
        // Chặn nổi bọt để không mở modal khi click nút thêm
        e.stopPropagation(); 
    } else {
        // Mở Modal
        modalBody.innerHTML = `
            <h2>${product.name}</h2>
            <img src="${product.image}" style="max-width:100%">
            <p>Giá: ${product.price.toLocaleString('vi-VN')}đ</p>
            <p>Đánh giá: ⭐ ${product.rating}</p>
            <p>Tình trạng: ${product.inStock ? 'Còn hàng' : 'Hết hàng'}</p>
        `;
        modal.classList.remove('hidden');
    }
});

// Close Modal
document.querySelector('.close-btn').addEventListener('click', () => modal.classList.add('hidden'));
modal.addEventListener('click', (e) => { if(e.target === modal) modal.classList.add('hidden') });

// Dark Mode Toggle
document.getElementById('themeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

renderProducts();