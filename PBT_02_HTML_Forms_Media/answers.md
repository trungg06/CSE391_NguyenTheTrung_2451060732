### Câu A1 (5đ) — Input Types

1. `type="email"` → Ô nhập text (trên mobile sẽ gọi bàn phím có nút @), tự kiểm tra xem có ký tự `@` và tên miền hợp lệ không → Dùng cho form đăng ký tài khoản hoặc đăng ký nhận bản tin.
2. `type="password"` → Ô nhập văn bản bị mã hóa thành dấu chấm/sao để che thông tin, không tự động validate → Dùng để người dùng nhập mật khẩu đăng nhập.
3. `type="number"` → Ô nhập số có nút tăng/giảm (spinner) bên cạnh, chặn nhập chữ cái, tự validate theo khoảng `min` / `max` → Dùng cho ô điều chỉnh số lượng sản phẩm trong giỏ hàng.
4. `type="tel"` → Ô nhập text (gọi bàn phím số điện thoại trên mobile), không tự động validate cú pháp do mỗi quốc gia có định dạng khác nhau → Dùng nhập số điện thoại giao hàng.
5. `type="date"` → Mở bảng chọn ngày tháng (calendar picker), tự validate đúng định dạng ngày hợp lệ → Dùng để chọn ngày tháng năm sinh hoặc ngày giao hàng.
6. `type="color"` → Bảng chọn màu sắc trực quan (color picker), chỉ cho phép mã màu Hex hợp lệ → Dùng để người dùng filter tìm sản phẩm theo màu sắc.
7. `type="checkbox"` → Ô vuông đánh dấu (tick box), tự validate nếu có thuộc tính `required` (bắt buộc phải tick) → Dùng cho ô "Tôi đồng ý với điều khoản mua hàng".
8. `type="radio"` → Nút tròn chọn 1 trong nhiều (các nút phải cùng `name`), tự validate nếu có `required` → Dùng để chọn Phương thức thanh toán (COD, thẻ tín dụng).
9. `type="file"` → Nút mở hộp thoại tải file từ máy tính, tự validate định dạng nếu kết hợp thuộc tính `accept` → Dùng để tải lên hình ảnh đánh giá (review) sản phẩm.
10. `type="search"` → Ô nhập text có thêm nút "x" nhỏ để xóa nhanh nội dung, không tự động validate → Dùng làm thanh tìm kiếm sản phẩm chính trên Header.

---

### Câu A2 (5đ) — Validation Attributes

**Dự đoán kết quả khi bấm Submit:**

* **Trường hợp 1:** `required value=""` (Để trống).
  * **Dự đoán:** Trình duyệt chặn submit, viền ô nhập hóa đỏ và hiện thông báo pop-up: *"Please fill out this field"*.
  * **Giải thích:** Thuộc tính `required` bắt buộc input phải có dữ liệu. Chuỗi rỗng không vượt qua được bài test này.
* **Trường hợp 2:** `type="email" value="abc"` (Nhập sai định dạng).
  * **Dự đoán:** Trình duyệt chặn submit, hiện thông báo: *"Please include an '@' in the email address..."*.
  * **Giải thích:** `type="email"` được tích hợp sẵn Regex kiểm tra định dạng thư điện tử bắt buộc phải có ký tự `@` và tên miền.
* **Trường hợp 3:** `type="number" min="1" max="10" value="15"` (Vượt quá Max).
  * **Dự đoán:** Trình duyệt chặn submit, hiện thông báo: *"Value must be less than or equal to 10"*.
  * **Giải thích:** Thuộc tính `max="10"` giới hạn giá trị cao nhất được phép gửi đi. 15 lớn hơn 10 nên bị báo lỗi.
* **Trường hợp 4:** `pattern="[0-9]{10}" value="abc123"` (Sai Pattern Regex).
  * **Dự đoán:** Trình duyệt chặn submit, hiện thông báo: *"Please match the requested format"*.
  * **Giải thích:** Thuộc tính `pattern` yêu cầu chuỗi phải gồm đúng 10 chữ số từ 0 đến 9. Dữ liệu "abc123" chứa chữ cái và không đủ 10 ký tự nên bị từ chối.
* **Trường hợp 5:** `type="password" minlength="8" value="123"` (Thiếu độ dài tối thiểu).
  * **Dự đoán:** Trình duyệt chặn submit, hiện thông báo yêu cầu tăng độ dài lên ít nhất 8 ký tự.
  * **Giải thích:** Thuộc tính `minlength` ép buộc chuỗi nhập vào phải đạt một độ dài số lượng ký tự tối thiểu.



---

### Câu A3 (5đ) — Accessibility

1. **Tại sao `<label for="email">` quan trọng cho người dùng screen reader?**
   Screen reader (phần mềm đọc màn hình) không thể tự liên kết bằng mắt giữa ô input và dòng chữ đứng cạnh nó. Việc dùng `for` trỏ đúng vào `id` của input giúp screen reader đọc to chức năng của ô đó. Ngoài ra, click vào chữ cũng làm focus vào ô input (tăng diện tích click).
2. **Khi nào dùng `<fieldset>` + `<legend>`? Cho ví dụ.**
   Dùng để nhóm các ô input có liên quan logic chặt chẽ với nhau thành một khối, và cung cấp một tiêu đề chung cho khối đó.
   *Ví dụ:* Nhóm các nút radio chọn Phương thức giao hàng.
   `<fieldset><legend>Phương thức giao hàng</legend> <input type="radio"...> Hỏa tốc <input type="radio"...> Tiêu chuẩn </fieldset>`
3. **`aria-label` dùng khi nào? Tại sao KHÔNG nên dùng khi đã có `<label>`?**
   * Dùng `aria-label` khi một phần tử tương tác KHÔNG CÓ đoạn chữ (text) nào hiển thị trên màn hình. Ví dụ: Nút đóng cửa sổ chỉ có icon chữ "X" (cần `aria-label="Đóng"`).
   * Không nên dùng khi đã có thẻ `<label>` vì `aria-label` sẽ **ghi đè** nội dung đọc của `<label>` gốc, gây dư thừa và dễ sinh lỗi trải nghiệm cho Screen Reader.

---

### Câu A4 (5đ) — Media

1. **Giải thích `loading="lazy"` trên thẻ `<img>`:**
   * **Cải thiện gì:** Báo cho trình duyệt khoan tải bức ảnh nếu nó chưa xuất hiện trong tầm nhìn của người dùng. Giúp tăng tốc độ tải trang ban đầu, tiết kiệm băng thông.
   * **Khi nào KHÔNG nên dùng:** Không dùng cho những hình ảnh nằm ở ngay màn hình đầu tiên khi vừa mở web (như Logo, ảnh Banner), vì nó sẽ làm chậm quá trình hiển thị khối nội dung quan trọng nhất.
2. **Tại sao nên cung cấp nhiều `<source>` trong thẻ `<video>`?**
   Mỗi trình duyệt web sử dụng một bộ giải mã video khác nhau. Việc cung cấp nhiều source giúp trình duyệt tự chọn định dạng đầu tiên mà nó hỗ trợ, đảm bảo video chạy được trên mọi thiết bị. 
   *3 format video phổ biến:* MP4 (H.264), WebM, và Ogg.
3. **Viết thuộc tính `alt` tốt cho 3 trường hợp:**
   * Ảnh sản phẩm iPhone 16: `alt="Điện thoại iPhone 16 Pro Max 256GB màu Titan Tự Nhiên chụp từ mặt trước"`
   * Ảnh trang trí (decorative): `alt=""` (Để rỗng hoàn toàn, Screen Reader sẽ lướt qua, tránh đọc rác).
   * Ảnh biểu đồ doanh thu: `alt="Biểu đồ cột biểu diễn doanh thu quý 1 năm 2026 đạt 50 tỷ đồng, tăng trưởng 20% so với cùng kỳ"` (Phải mô tả DỮ LIỆU biểu đồ nói lên điều gì).

---

### Câu A5 (5đ) — So sánh `<figure>` vs `<img>`

**Khi nào dùng Cách 1 (Chỉ dùng `<img>`):**
Dùng khi bức ảnh chỉ mang tính chất minh họa chèn thẳng vào luồng văn bản, không cần một chú thích độc lập đi kèm. 
* *Ví dụ:* Ảnh avatar của người dùng trên thanh navbar, ảnh icon nhỏ trang trí cạnh tiêu đề bài viết.

**Khi nào dùng Cách 2 (`<figure>` kết hợp `<figcaption>`):**
Dùng khi bức ảnh là một khối nội dung độc lập, bắt buộc phải có dòng chú thích (`<figcaption>`) gắn chặt với nó về mặt ngữ nghĩa. Khối này có thể bị dời đi nơi khác mà không làm mất đi ý nghĩa của ngữ cảnh.
* *Ví dụ:* 1. Một sơ đồ luồng xử lý trong bài blog công nghệ, có chú thích "Hình 1: Cấu trúc hệ thống".
  2. Một ảnh sản phẩm nổi bật nằm trên trang tạp chí có hiển thị tên tác giả chụp bức ảnh ở dòng chú thích.
  ### Câu C1 (10đ) — Debug Form

Lỗi 1: Dòng 1 — Thẻ <form> thiếu thuộc tính `action` và `method`.
Sửa: <form action="/submit" method="POST">

Lỗi 2: Dòng 2 — Input "Tên" không có <label for="...">, thiếu `id` và `name`.
Sửa: <label for="fullName">Tên:</label> <input type="text" id="fullName" name="fullName" required>

Lỗi 3: Dòng 4 — Input "Email" lạm dụng `placeholder` thay cho <label>.
Sửa: <label for="email">Email:</label> <input type="email" id="email" name="email" placeholder="Ví dụ: abc@gmail.com" required>

Lỗi 4: Dòng 6, 7 — Input "Mật khẩu" thiếu <label>, `id`, `name` và không liên kết với nhau.
Sửa: 
<label for="pwd">Mật khẩu:</label> <input type="password" id="pwd" name="password" required>
<label for="confirmPwd">Nhập lại mật khẩu:</label> <input type="password" id="confirmPwd" name="confirmPassword" required>

Lỗi 5: Dòng 9 — Input "Phone" dùng sai type, hardcode `value` và thiếu thẻ <label>.
Sửa: <label for="phone">Phone:</label> <input type="tel" id="phone" name="phone" placeholder="0901234567" pattern="[0-9]{10}">

Lỗi 6: Dòng 11, 12, 13 — Thẻ <select> thiếu <label>, `name`, `id` và các <option> thiếu `value`.
Sửa:
<label for="city">Thành phố:</label>
<select id="city" name="city" required>
    <option value="">Chọn thành phố</option>
    <option value="hn">Hà Nội</option>
    <option value="hcm">TP.HCM</option>
</select>

Lỗi 7: Dòng 16, 17, 18 — Thẻ <label> "Tôi đồng ý" thiếu checkbox thực sự.
Sửa:
<label for="terms">
    <input type="checkbox" id="terms" name="terms" required> Tôi đồng ý điều khoản
</label>

Lỗi 8: Toàn bộ form — Hoàn toàn không sử dụng HTML5 Validation.
Sửa: Cần thêm thuộc tính `required`, `pattern`, `minlength`... vào các trường tương ứng như đã bổ sung ở các mã sửa bên trên.

---

### Câu C2 (10đ) — Thiết kế chiến lược Validation

1. Viết `pattern` regex:
- CMND/CCCD: `pattern="[0-9]{12}"`
- Số tài khoản: `pattern="[0-9]{10,15}"`

2. HTML5 validation đủ an toàn cho ứng dụng ngân hàng chưa? Tại sao?
- Trả lời: TUYỆT ĐỐI CHƯA AN TOÀN. 
- Tại sao: HTML5 Validation chỉ chạy ở phía Client (trình duyệt). Kẻ gian có thể dễ dàng vô hiệu hóa bằng cách tắt JavaScript, xóa thuộc tính validation qua DevTools (F12), hoặc dùng công cụ như Postman gửi thẳng request độc hại đến Server. HTML5 chỉ giúp trải nghiệm người dùng (UX) tốt hơn, không có tác dụng bảo mật.

3. 3 loại validation mà HTML5 KHÔNG THỂ làm được (phải dùng JS/Backend):
- Kiểm tra tính duy nhất với Database (ví dụ: Số CCCD này đã tồn tại trong hệ thống chưa).
- Kiểm tra logic nghiệp vụ phức tạp (ví dụ: Khách hàng đã đủ 18 tuổi chưa dựa trên ngày sinh vừa nhập, hoặc check 2 ô mật khẩu có khớp nhau không).
- Xác thực nội dung file thực tế (Ví dụ: Chống tải lên file mã độc bị đổi đuôi thành .jpg).

4. 2 rủi ro bảo mật nếu chỉ validate trên Frontend mà không validate Backend:
- SQL Injection: Hacker gửi chuỗi mã độc (vd: ' OR 1=1 --) vào ô input. Nếu backend không chặn, mã này sẽ chọc thẳng vào Database, gây rò rỉ hoặc mất toàn bộ dữ liệu ngân hàng.
- Cross-Site Scripting (XSS): Hacker chèn mã JavaScript độc hại vào input. Nếu backend lưu thẳng vào Database, đoạn mã sẽ chạy trên trình duyệt của nhân viên ngân hàng hoặc người dùng khác, dẫn đến mất cắp phiên đăng nhập (session/cookie).