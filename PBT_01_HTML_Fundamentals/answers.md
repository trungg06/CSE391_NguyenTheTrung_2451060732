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
### Câu C1 (10đ) — Thiết kế cấu trúc

Dưới đây là cấu trúc HTML chuẩn Semantic cho trang chi tiết sản phẩm. Mỗi thẻ đều được chú thích rõ lý do sử dụng:

    <header>
        <nav>
            <ul>
                <li><a href="/">Trang chủ</a></li>
            </ul>
        </nav>
    </header>

    <nav aria-label="breadcrumb">
        <ol>
            <li><a href="/">Trang chủ</a></li>
            <li><a href="/dien-thoai">Điện thoại</a></li>
            <li><a href="/iphone-16" aria-current="page">iPhone 16</a></li>
        </ol>
    </nav>

    <main>
        <article>
            <section id="product-gallery">
                <figure>
                    <img src="main.jpg" alt="Mặt trước iPhone 16">
                    <img src="thumb1.jpg" alt="Mặt sau iPhone 16">
                </figure>
            </section>

            <section id="product-info">
                <h1>iPhone 16 Pro Max</h1>
                <p class="price">25.990.000đ</p>
                <p class="description">Mô tả ngắn về sản phẩm...</p>
            </section>

            <section id="product-specs">
                <h2>Thông số kỹ thuật</h2>
                <table>
                    <tbody>
                        <tr>
                            <th scope="row">Màn hình</th>
                            <td>OLED 6.7 inch</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section id="product-reviews">
                <h2>Đánh giá từ khách hàng</h2>
                <article class="review-item">
                    <h3>Khách hàng A</h3>
                    <p>Sản phẩm rất tốt!</p>
                </article>
            </section>
        </article>

        <aside id="related-products">
            <h2>Sản phẩm tương tự</h2>
            <ul>
                <li><a href="/iphone-15">iPhone 15 Pro</a></li>
            </ul>
        </aside>
    </main>

    <footer>
        <p>© 2026 Cửa hàng điện thoại</p>
    </footer>

---

### Câu C2 (10đ) — So sánh & Tranh luận

Quan điểm "chỉ cần dùng `<div>` cho mọi thứ" là một tư duy phổ biến ở những người mới học CSS, vì `<div>` kết hợp với class có thể tạo ra bất kỳ giao diện trực quan nào. Tuy nhiên, việc bỏ qua Semantic HTML lại mang đến những hậu quả kỹ thuật nghiêm trọng. 

**Thứ nhất là về SEO (Tối ưu hóa công cụ tìm kiếm).** Các bot của Google (Googlebot) không có "mắt" để nhìn thấy màu sắc hay kích thước chữ như con người. Chúng đọc mã nguồn để lập chỉ mục. Một thẻ `<h1>` hay `<article>` phát đi tín hiệu mạnh mẽ rằng đây là nội dung cốt lõi của trang, giúp từ khóa dễ lên top. Nếu chỉ dùng `<div class="title">`, bot sẽ coi đó là một đoạn text vô thưởng vô phạt, làm giảm đáng kể thứ hạng tìm kiếm.

**Thứ hai là về Accessibility (Khả năng tiếp cận).** Những người khiếm thị sử dụng phần mềm đọc màn hình (Screen Readers) để duyệt web. Các phần mềm này cho phép người dùng nhảy cóc nhanh chóng giữa các khối `<nav>`, `<main>`, hay `<footer>`. Nếu toàn bộ trang là một "bể" `<div>`, người khiếm thị sẽ phải nghe trình duyệt đọc từng dòng một từ trên xuống dưới một cách cực kỳ ức chế.

**Ví dụ thực tế chứng minh:** Thẻ `<button>` và `<div class="btn">`. 
Khi bạn dùng thẻ `<button>` chuẩn, trình duyệt tự động cung cấp khả năng focus bằng phím `Tab`, và kích hoạt sự kiện click bằng phím `Enter` hoặc `Space`. Nếu bạn dùng `<div class="btn">`, bạn sẽ phải viết thêm rất nhiều mã JavaScript và thuộc tính `tabindex` chỉ để "bắt chước" lại những tính năng mà thẻ `<button>` được hỗ trợ miễn phí từ đầu.

**Vậy khi nào `<div>` thực sự phù hợp?**
Thẻ `<div>` (một thẻ vô nghĩa) sinh ra để làm **wrapper (khung chứa) cho mục đích styling**. Trường hợp thực tế hợp lý nhất là khi bạn cần nhóm các phần tử lại để áp dụng CSS Flexbox hoặc Grid (ví dụ: `<div class="flex-container">`), hoặc tạo bóng đổ, giới hạn chiều rộng trang. Trong những lúc cấu trúc không mang ý nghĩa ngữ nghĩa nào, `<div>` chính là sự lựa chọn hoàn hảo.
### Bài B4 (15đ) — Phân tích trang web thật

**Trang web khảo sát:** `thegioididong.com`

**1. Phân tích Semantic HTML5 (Tab Elements):**

* *(Chèn ảnh Screenshot Elements minh họa các thẻ tại đây)*
* **3 thẻ Semantic HTML5 mà trang sử dụng:**
  1. `<header>`: Được sử dụng ở trên cùng của trang để bao bọc toàn bộ khu vực logo, thanh tìm kiếm và các menu điều hướng tiện ích.
  2. `<footer>`: Nằm ở dưới cùng của trang, chứa các thông tin liên hệ của công ty, tổng đài hỗ trợ và các liên kết chính sách bảo hành.
  3. `<section>`: Được sử dụng để phân chia các khu vực nội dung lớn, ví dụ như khối chứa danh sách "Điện thoại nổi bật" hay "Laptop giá sốc".
* **2 thẻ KHÔNG dùng đúng semantic (Lạm dụng thẻ phi ngữ nghĩa):**
  1. Trang web thường sử dụng thẻ `<li>` hoặc `<div class="item">` để bọc một khối sản phẩm (Product Card). Theo chuẩn HTML5, một sản phẩm độc lập nên được bọc bằng thẻ `<article>`.
  2. Đối với tiêu đề của một số sản phẩm/khối nhỏ, thay vì dùng các thẻ heading chuẩn như `<h3>` hay `<h4>` để tạo cấu trúc phân cấp cho bot đọc, trang web lại lạm dụng thẻ `<div>` hoặc `<span>` kèm class để style kích thước chữ.

**2. Phân tích Bảng - Table (Mục Cấu hình chi tiết sản phẩm):**

* *(Chèn ảnh Screenshot Table phần Cấu hình sản phẩm tại đây)*
* **Nội dung hiển thị:** Bảng này hiển thị các thông số kỹ thuật chi tiết của thiết bị như: Kích thước và công nghệ màn hình, hệ điều hành, độ phân giải camera, chip xử lý, dung lượng RAM, ROM và dung lượng Pin.
* **Cấu trúc `<thead>`, `<tbody>`:** Thực tế, Thế Giới Di Động cấu trúc phần thông số khá đa dạng. Ở những khu vực sử dụng thẻ `<table>` để làm bảng thông số, họ thường lập tức mở thẻ `<tbody>` chứa các dòng `<tr>` và bỏ qua hoàn toàn thẻ `<thead>`.

**3. Phân tích Biểu mẫu - Form (Thanh tìm kiếm chính):**

* *(Chèn ảnh Screenshot Form Tìm kiếm tại đây)*
* **Thuộc tính action và method:** * `action`: Trỏ về đường dẫn xử lý kết quả tìm kiếm (Ví dụ: `action="/tim-kiem"`).
  * `method`: Sử dụng phương thức `GET` (để từ khóa tìm kiếm được đính trực tiếp lên URL, giúp người dùng có thể tải lại trang, copy hoặc chia sẻ link kết quả dễ dàng).
* **Input types được dùng:**
  * `<input type="text">` (hoặc đôi khi là `type="search"`): Dành cho người dùng nhập từ khóa tìm kiếm.
  * `<button type="submit">` (hoặc đôi khi dùng thẻ `<i>` kết hợp sự kiện JavaScript): Dùng làm nút nhấn kích hoạt hành động tìm kiếm.