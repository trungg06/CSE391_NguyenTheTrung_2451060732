# ĐÁP ÁN PHIẾU BÀI TẬP - PHẦN A

## Câu A1 (5đ) — Function Declaration vs Expression vs Arrow

**1. Viết hàm theo 3 cách:**

```javascript
// 1. Function Declaration
function tinhThueBaoHiem1(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return { thue: thue, thuc_nhan: luong - thue };
}

// 2. Function Expression
const tinhThueBaoHiem2 = function(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return { thue: thue, thuc_nhan: luong - thue };
};

// 3. Arrow Function
const tinhThueBaoHiem3 = (luong) => {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return { thue, thuc_nhan: luong - thue };
};
```

**2. Giải thích sự khác biệt về Hoisting:**

Ba cách viết này **có khác biệt lớn** về hoisting.
* **Function Declaration:** Hàm được hoisted toàn bộ (cả tên và nội dung). Bạn có thể gọi hàm ở bất kỳ dòng code nào, kể cả trước khi khai báo nó.
* **Function Expression & Arrow Function:** Vì được gán vào biến (thường dùng `let` hoặc `const`), chúng chỉ được hoisted phần khai báo biến nhưng rơi vào "Vùng chết tạm thời" (Temporal Dead Zone). Bạn KHÔNG thể gọi hàm trước dòng khởi tạo.

**Ví dụ chứng minh:**
```javascript
// Gọi hàm trước khi khai báo
console.log(hamKhaiBao(12000000)); // Chạy bình thường, không lỗi
console.log(hamBieuThuc(12000000)); // Lỗi: ReferenceError: Cannot access 'hamBieuThuc' before initialization

function hamKhaiBao(luong) { return luong; }
const hamBieuThuc = (luong) => { return luong; }
```

---

## Câu A2 (5đ) — Scope & Closure

**Dự đoán Output Đoạn 1:**
```javascript
console.log(c.increment());  // 1
console.log(c.increment());  // 2
console.log(c.increment());  // 3
console.log(c.decrement());  // 2
console.log(c.getCount());   // 2
```
> **Giải thích:** Đây là tính chất **Closure**. Các hàm con được trả về vẫn giữ được tham chiếu đến môi trường từ vựng (lexical environment) của chúng, cụ thể là biến `count`, dù hàm `counter()` đã thực thi xong từ lâu.

**Dự đoán Output Đoạn 2:**
```text
var: 3
var: 3
var: 3
let: 0
let: 1
let: 2
```
> **Giải thích sự khác biệt:**
> * **`var`:** Có phạm vi hàm (function scope) hoặc toàn cục. Khi vòng lặp chạy xong, `i` đã tăng lên 3. Callback của `setTimeout` chạy sau đó, nó trỏ tới cùng một ô nhớ của biến `i`, nên in ra 3 lần số 3.
> * **`let`:** Có phạm vi khối (block scope). Tại mỗi vòng lặp `for`, một biến `j` mới, hoàn toàn độc lập được tạo ra cho khối đó. Khi `setTimeout` chạy, mỗi callback lưu giữ chính xác giá trị `j` tại thời điểm vòng lặp của nó.

---

## Câu A3 (5đ) — Array Methods

```javascript
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 1. Lấy các số chẵn
const evens = nums.filter(n => n % 2 === 0);

// 2. Nhân mỗi số với 3
const multiplied = nums.map(n => n * 3);

// 3. Tính tổng tất cả
const sum = nums.reduce((acc, n) => acc + n, 0);

// 4. Tìm số đầu tiên > 7
const firstOver7 = nums.find(n => n > 7);

// 5. Kiểm tra CÓ số > 10 không
const hasOver10 = nums.some(n => n > 10);

// 6. Kiểm tra TẤT CẢ đều > 0
const allPositive = nums.every(n => n > 0);

// 7. Tạo mảng "Số X là [chẵn/lẻ]"
const strArr = nums.map(n => `Số ${n} là ${n % 2 === 0 ? "chẵn" : "lẻ"}`);

// 8. Đảo ngược mảng (không mutate gốc)
const reversed = [...nums].reverse(); // Hoặc dùng nums.toReversed() nếu ES2023
```

---

## Câu A4 (5đ) — Object Destructuring & Spread

**Dự đoán Output:**

```javascript
// Destructuring
console.log(name, price, ram, color);  
// Output: iPhone 16 25990000 8 Titan

console.log(specs);                      
// Output: ReferenceError: specs is not defined
// (Vì khi bạn dùng cú pháp lồng `specs: { ram, color }`, bạn chỉ bóc tách các thuộc tính bên trong ra thành biến độc lập, chứ không tạo ra biến `specs`).

// Spread
console.log(updated.price);            // Output: 23990000 (Ghi đè giá trị mới)
console.log(updated.sale);             // Output: true
console.log(product.price);            // Output: 25990000 (Mảng gốc KHÔNG đổi)

// Spread gotcha
console.log(product.specs.ram);        // Output: 16
```

**Tại sao dòng cuối in ra 16 thay vì 8?**
Toán tử Spread (`...`) chỉ thực hiện **Shallow Copy** (Sao chép nông). Nghĩa là nó chỉ sao chép giá trị mới đối với các kiểu dữ liệu nguyên thủy (string, number, boolean...). Còn với các kiểu dữ liệu tham chiếu lồng nhau bên trong (như object `specs`), nó chỉ sao chép **địa chỉ bộ nhớ**. Do đó, `copy.specs` và `product.specs` thực chất cùng trỏ về một nơi. Khi bạn sửa `copy.specs.ram = 16`, bản gốc `product` cũng bị thay đổi theo.g