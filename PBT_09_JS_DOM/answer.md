# ĐÁP ÁN PHIẾU BÀI TẬP - PHẦN A

## Câu A1 (5đ) — DOM Tree

**1. Sơ đồ cây (DOM Tree):**

```text
div#app
├── header
│   ├── h1 (Todo App)
│   └── nav
│       ├── a.active (All)
│       ├── a (Active)
│       └── a (Completed)
└── main
    ├── form#todoForm
    │   ├── input#todoInput[type="text"]
    │   └── button[type="submit"] (Add)
    └── ul#todoList
        ├── li.todo-item (Learn HTML)
        └── li.todo-item.completed (Learn CSS)
```

**2. Các câu lệnh querySelector:**

- **Chọn thẻ `<h1>`:**
  `document.querySelector('h1');`
- **Chọn input trong form:**
  `document.querySelector('#todoInput');` (hoặc `document.querySelector('#todoForm input');`)
- **Chọn tất cả `.todo-item`:**
  `document.querySelectorAll('.todo-item');`
- **Chọn link đang active:**
  `document.querySelector('nav a.active');` (hoặc `document.querySelector('.active');`)
- **Chọn `<li>` đầu tiên trong `#todoList`:**
  `document.querySelector('#todoList li:first-child');` (hoặc `document.querySelector('#todoList li');` vì querySelector mặc định chỉ lấy phần tử đầu tiên thỏa mãn).
- **Chọn tất cả `<a>` bên trong `<nav>`:**
  `document.querySelectorAll('nav a');`

---

## Câu A2 (5đ) — innerHTML vs textContent

**1. Sự khác nhau và khi nào dùng:**

- **`innerHTML`:** Trả về hoặc thiết lập toàn bộ nội dung HTML bên trong một phần tử. Trình duyệt sẽ **phân tích cú pháp (parse)** chuỗi truyền vào thành các thẻ HTML thực sự.
  - _Khi nào dùng:_ Khi bạn muốn render cấu trúc HTML động (ví dụ: in ra một danh sách `<li>` được tạo từ mảng dữ liệu).
- **`textContent`:** Trả về hoặc thiết lập toàn bộ **chuỗi văn bản thuần túy** bên trong một phần tử. Nó sẽ bỏ qua mọi thẻ HTML và xem chúng chỉ là những ký tự text bình thường.
  - _Khi nào dùng:_ Khi bạn chỉ muốn cập nhật chữ (text) thuần túy (ví dụ: cập nhật tên user, tiêu đề bài viết).

**2. Câu hỏi bảo mật (XSS):**
Tại sao `innerHTML` nguy hiểm? Nếu bạn đưa dữ liệu người dùng nhập trực tiếp vào `innerHTML` mà không qua xử lý, trình duyệt sẽ biên dịch và chạy các thẻ HTML/Javascript độc hại. Kẻ gian có thể dùng lỗ hổng này (gọi là **Cross-Site Scripting - XSS**) để đánh cắp cookie hoặc thực thi mã độc.

**Cách sửa code minh họa:** Đổi `innerHTML` thành `textContent`. Trình duyệt sẽ chỉ in ra dòng chữ `<img src=x onerror="alert('Hacked!')">` chứ không cố gắng load ảnh hay chạy script.

```javascript
// Cách an toàn:
const userInput = document.querySelector("#search").value;
document.querySelector("#result").textContent = userInput; // ← Đã an toàn!
```

---

## Câu A3 (5đ) — Event Bubbling

**1. Khi click vào button (Mặc định):**
Cơ chế **Event Bubbling** (sủi bọt) làm cho sự kiện click lan truyền từ phần tử con (nơi xảy ra sự kiện) lên dần các phần tử cha của nó.
Output sẽ là:

```text
BUTTON
INNER
OUTER
```

**2. Nếu uncomment `e.stopPropagation()`:**
Hàm `stopPropagation()` có tác dụng ngăn chặn ngay lập tức sự kiện sủi bọt lên trên. Sự kiện click sẽ bị chặn lại ở chính button và không lan tới `#inner` hay `#outer`.
Output sẽ là:

```text
BUTTON
```

# ĐÁP ÁN PHIẾU BÀI TẬP - PHẦN C

## Câu C1 (8đ) — Debug DOM Code

**Phân tích 7+ lỗi trong đoạn code:**

1. **Sai tên event ở nút decrement:** `addEventListener("onclick", ...)` phải sửa thành `addEventListener("click", ...)`.
2. **Gán giá trị sai cho DOM Element:** Ở nút reset, `countDisplay = count;` là sai vì `countDisplay` là phần tử DOM. Phải dùng `countDisplay.textContent = count;`.
3. **Gán lại biến const:** Cũng ở nút reset, `countDisplay` được khai báo là `const`, việc gán `countDisplay = ...` sẽ gây lỗi `TypeError: Assignment to constant variable`.
4. **Gọi hàm thiếu dấu ngoặc:** Ở nút clearHistory, `item.remove;` chỉ là tham chiếu đến hàm chứ chưa thực thi. Phải sửa thành `item.remove();`.
5. **Sai kiểu dữ liệu khi lấy từ localStorage:** `localStorage.getItem("count")` trả về String. Cần ép kiểu sang Number bằng `parseInt()` kèm giá trị mặc định, nếu không phép tính toán sẽ bị sai (vd: `"0" + 1 = "01"`).
6. **Thiếu logic phục hồi history:** Lúc lưu có `localStorage.setItem("history", ...)` nhưng lúc load lại trang thì quên không lấy `historyList.innerHTML = localStorage.getItem("history")`.
7. **Lỗi mất Event Listener khi lưu bằng innerHTML (Bug logic nghiêm trọng):** Khi phục hồi lại danh sách từ `innerHTML`, các thẻ `<li>` sẽ được vẽ lại bằng text HTML, đồng nghĩa với việc hàm `click` (xóa thẻ) được gán thủ công lúc trước sẽ biến mất. **Cách sửa:** Bỏ việc gán event vào từng `<li>`, thay vào đó dùng **Event Delegation** (Gắn 1 event click duy nhất vào `historyList`).

**Code sau khi sửa (Refactor bằng Event Delegation):**

```javascript
const countDisplay = document.querySelector(".count");
const historyList = document.getElementById("history");

let count = 0;

// Sử dụng Event Delegation cho historyList
historyList.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    e.target.remove();
  }
});

document.querySelector("#incrementBtn").addEventListener("click", function () {
  count++;
  countDisplay.textContent = count;

  const li = document.createElement("li");
  li.textContent = "Count changed to " + count;
  historyList.append(li);
});

document.querySelector("#decrementBtn").addEventListener("click", function () {
  count--;
  countDisplay.textContent = count;
});

document.querySelector("#resetBtn").addEventListener("click", () => {
  count = 0;
  countDisplay.textContent = count;
  historyList.innerHTML = "";
});

document.querySelector("#clearHistory").addEventListener("click", () => {
  const items = historyList.querySelectorAll("li");
  items.forEach((item) => item.remove());
});

window.addEventListener("beforeunload", () => {
  localStorage.setItem("count", count);
  localStorage.setItem("history", historyList.innerHTML);
});

window.addEventListener("load", () => {
  count = parseInt(localStorage.getItem("count"), 10) || 0;
  countDisplay.textContent = count;

  const savedHistory = localStorage.getItem("history");
  if (savedHistory) historyList.innerHTML = savedHistory;
});
```

---

## Câu C2 (7đ) — Performance

**1. Event Delegation:**

- **Tại sao bind 1000 events là Bad Practice?** Việc tạo ra 1000 event listeners cho 1000 phần tử sẽ ngốn rất nhiều tài nguyên bộ nhớ (Memory), làm trang web chậm chạp (hiệu năng kém). Hơn nữa, nếu phần tử DOM bị xóa/thêm động, bạn lại phải gỡ/gắn lại event thủ công rất dễ sinh lỗi (như lỗi số 7 ở Câu C1).
- **Event Delegation giải quyết thế nào?** Nó tận dụng cơ chế Event Bubbling. Thay vì gắn 1000 events vào 1000 đứa con, ta chỉ gắn **1 event duy nhất** vào phần tử cha chứa chúng. Khi click vào con, sự kiện sẽ sủi bọt lên cha. Tại đây ta dùng `event.target` để biết chính xác phần tử con nào bị click và xử lý.

**2. Refactor vòng lặp dùng DocumentFragment:**

```javascript
const fragment = document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {
  const div = document.createElement("div");
  div.textContent = `Item ${i}`;
  fragment.appendChild(div); // Append vào fragment (off-screen)
}

document.body.appendChild(fragment); // ← Chỉ 1 lần reflow!
```

- **Giải thích tại sao nhanh hơn:** `DocumentFragment` là một DOM node ảo nằm trong bộ nhớ (off-screen), không nằm trên giao diện thật. Việc thêm phần tử vào `Fragment` sẽ **không kích hoạt quá trình reflow/repaint** của trình duyệt. Sau khi lặp xong, ta đẩy toàn bộ nội dung của Fragment vào `document.body` một lần duy nhất, giúp trình duyệt chỉ phải tính toán lại bố cục (reflow) đúng 1 lần thay vì 1000 lần.
