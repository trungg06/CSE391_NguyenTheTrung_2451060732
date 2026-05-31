### Câu A1 (5đ) — HTTP & Browser

**1. 5 bước xảy ra khi gõ `https://shopee.vn` và nhấn Enter:**
1. **DNS Lookup:** Trình duyệt tìm kiếm địa chỉ IP của máy chủ chứa tên miền `shopee.vn`.
2. **Thiết lập kết nối (TCP & TLS):** Trình duyệt mở kết nối tới máy chủ và thực hiện quá trình bắt tay bảo mật (TLS) vì đây là giao thức HTTPS.
3. **Gửi HTTP Request:** Trình duyệt gửi yêu cầu (GET) tới máy chủ để lấy nội dung trang web.
4. **Nhận HTTP Response:** Máy chủ xử lý và trả về dữ liệu (HTML) kèm mã trạng thái (ví dụ: 200 OK).
5. **Parse & Render:** Trình duyệt đọc file HTML, tải thêm CSS/JS/Ảnh và vẽ trang web lên màn hình.

**2. Tab Network trong DevTools hiển thị gì?**
Tab Network hiển thị toàn bộ các yêu cầu mạng (network requests) mà trang web gọi ra, bao gồm thông tin chi tiết về từng file (HTML, CSS, JS, ảnh...), trạng thái tải, phương thức, dung lượng và thời gian tải.

*(Bạn tự mở DevTools F12 -> tab Network -> reload trang -> chụp ảnh màn hình và khoanh đỏ 3 vị trí sau nhé):*
* **Status Code của request đầu tiên:** Dòng trên cùng của danh sách (thường có status là 200).
* **Tổng thời gian load trang:** Nằm ở thanh trạng thái dưới cùng (ví dụ: Load: 1.25s).
* **Một request trả về file CSS:** Cột Type ghi là `stylesheet` hoặc cột Name có đuôi `.css`.

---

### Câu A2 (5đ) — Semantic HTML

**Tại sao trang web bị Google đánh giá SEO thấp?**
Trang web lạm dụng thẻ `<div>` cho mọi thành phần, thiếu hoàn toàn các thẻ ngữ nghĩa (Semantic HTML). Điều này khiến Googlebot và trình đọc màn hình không thể hiểu được đâu là phần đầu trang, menu, hay nội dung chính của trang.

**4 lỗi Semantic cụ thể:**
1. Phần chứa logo và menu dùng `<div class="header">` thay vì thẻ `<header>`.
2. Khối menu dùng `<div class="menu">` thay vì thẻ `<nav>` kết hợp danh sách `<ul>` và `<li>`.
3. Khu vực chứa sản phẩm dùng `<div class="main">` thay vì thẻ `<main>`.
4. Thiếu thẻ tiêu đề (ví dụ `<h2>`) cho tên sản phẩm và thẻ `<img>` không có thuộc tính `alt` mô tả ảnh.

**Code sửa lại chuẩn Semantic:**

    <header class="header">
        <div class="logo">ShopTLU</div>
        <nav class="menu">
            <ul>
                <li><a href="/">Trang chủ</a></li>
                <li><a href="/products">Sản phẩm</a></li>
            </ul>
        </nav>
    </header>
    <main class="main">
        <article class="product">
            <h2 class="title">iPhone 16 Pro</h2>
            <p class="price">25.990.000đ</p>
            <div class="image">
                <img src="iphone.jpg" alt="Điện thoại iPhone 16 Pro">
            </div>
        </article>
    </main>
    <footer class="footer">
        <p>© 2026 ShopTLU</p>
    </footer>

---

### Câu A3 (5đ) — Block vs Inline

**Kết quả hiển thị trên trình duyệt:**

    Hộp 1
    Text A Text B
    Hộp 2
    Text C Text D
    Hộp 3

**Giải thích:**
* Các thẻ `<div>` là phần tử **Block-level**. Chúng luôn bắt đầu ở một dòng mới và chiếm toàn bộ chiều ngang có sẵn của phần tử cha.
* Các thẻ `<span>` và `<strong>` là phần tử **Inline-level**. Chúng chỉ chiếm không gian vừa đủ cho phần chữ bên trong và có thể nằm sát cạnh nhau trên cùng một dòng.

---

### Câu A4 (5đ) — Table

**1. Sự khác nhau giữa `<thead>`, `<tbody>`, `<tfoot>`:**
* `<thead>`: Chứa các hàng làm tiêu đề của bảng (nhóm các thẻ `<th>`).
* `<tbody>`: Chứa các hàng dữ liệu chính của bảng.
* `<tfoot>`: Chứa các hàng tổng kết ở cuối bảng (ví dụ: dòng tổng tiền).

**2. Tại sao KHÔNG NÊN dùng table để tạo layout trang web?**
1. **Khó làm Responsive:** Layout bằng bảng rất cứng nhắc, cực kỳ khó để sắp xếp lại các khối hiển thị cho phù hợp với các thiết bị màn hình nhỏ như điện thoại.
2. **Code rối rắm và nặng nề:** Dùng table làm layout bắt buộc phải lồng ghép rất nhiều thẻ `<table>`, `<tr>`, `<td>` vào nhau, làm code HTML trở nên khó đọc và khó bảo trì.
3. **Ảnh hưởng xấu đến Accessibility:** Table vốn được thiết kế để hiển thị dữ liệu có cấu trúc dòng/cột. Dùng nó làm layout sẽ làm các phần mềm đọc màn hình (dành cho người khiếm thị) đọc sai cấu trúc logic của trang web.