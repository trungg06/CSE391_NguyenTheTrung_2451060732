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

* **Chọn thẻ `<h1>`:**
  `document.querySelector('h1');`
* **Chọn input trong form:**
  `document.querySelector('#todoInput');` (hoặc `document.querySelector('#todoForm input');`)
* **Chọn tất cả `.todo-item`:**
  `document.querySelectorAll('.todo-item');`
* **Chọn link đang active:**
  `document.querySelector('nav a.active');` (hoặc `document.querySelector('.active');`)
* **Chọn `<li>` đầu tiên trong `#todoList`:**
  `document.querySelector('#todoList li:first-child');` (hoặc `document.querySelector('#todoList li');` vì querySelector mặc định chỉ lấy phần tử đầu tiên thỏa mãn).
* **Chọn tất cả `<a>` bên trong `<nav>`:**
  `document.querySelectorAll('nav a');`

---

## Câu A2 (5đ) — innerHTML vs textContent

**1. Sự khác nhau và khi nào dùng:**
* **`innerHTML`:** Trả về hoặc thiết lập toàn bộ nội dung HTML bên trong một phần tử. Trình duyệt sẽ **phân tích cú pháp (parse)** chuỗi truyền vào thành các thẻ HTML thực sự.
  * *Khi nào dùng:* Khi bạn muốn render cấu trúc HTML động (ví dụ: in ra một danh sách `<li>` được tạo từ mảng dữ liệu).
* **`textContent`:** Trả về hoặc thiết lập toàn bộ **chuỗi văn bản thuần túy** bên trong một phần tử. Nó sẽ bỏ qua mọi thẻ HTML và xem chúng chỉ là những ký tự text bình thường.
  * *Khi nào dùng:* Khi bạn chỉ muốn cập nhật chữ (text) thuần túy (ví dụ: cập nhật tên user, tiêu đề bài viết).

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