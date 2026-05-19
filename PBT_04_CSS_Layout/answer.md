# ĐÁP ÁN PHIẾU BÀI TẬP 04 - CSS LAYOUT

---

## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 — 5 Loại Positioning

| Position   | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí                                                      | Cuộn theo trang?              | Use case                                                                                           |
| ---------- | ------------------------- | ---------------------------------------------------------------------- | ----------------------------- | -------------------------------------------------------------------------------------------------- |
| `static`   | Có                        | Theo luồng văn bản mặc định                                            | Có                            | Trạng thái mặc định của mọi HTML element.                                                          |
| `relative` | Có                        | Vị trí gốc ban đầu của chính nó                                        | Có                            | Làm điểm gốc định vị cho phần tử con dùng absolute; Dịch chuyển nhẹ mà không đẩy các phần tử khác. |
| `absolute` | Không                     | Nearest positioned ancestor (cha/ông gần nhất có position khác static) | Có (cuộn theo cha)            | Badge thông báo, Tooltip, Dropdown menu, Nút tắt (X) ở góc pop-up.                                 |
| `fixed`    | Không                     | Viewport (Khung nhìn trình duyệt)                                      | Không                         | Header cố định, Nút scroll-to-top, Chatbox ở góc màn hình.                                         |
| `sticky`   | Có                        | Viewport (khi cuộn) & Parent (khi hết không gian)                      | Có (tới một ngưỡng nhất định) | Sidebar bám dọc, Tiêu đề của bảng (Table header).                                                  |

**Câu hỏi thêm:**

- **Khi nào `absolute` tham chiếu `body`?** Khi tất cả các thẻ cha/ông bao bọc nó đều ở trạng thái mặc định (`position: static`).
- **Khi nào tham chiếu parent?** Khi thẻ cha (hoặc tổ tiên) đó được set một thuộc tính `position` bất kỳ khác `static` (thường người ta dùng `relative`).
- **"Nearest positioned ancestor" là gì?** Là phần tử cha hoặc ông nội, cố nội... gần nhất (tính từ dưới lên trên trong cây HTML) đã được kích hoạt thuộc tính `position` (khác static). CSS sẽ dùng mép của phần tử này làm hệ tọa độ (0,0) để căn chỉnh `top`, `left`, `right`, `bottom`.

### Câu A2 — Flexbox vs Grid (Dự đoán bố cục)

1. **Trường hợp 1:** 4 items xếp thành **1 hàng ngang**, chia đều nhau (mỗi item chiếm 25% chiều rộng).
2. **Trường hợp 2:** Xếp thành **3 hàng, mỗi hàng 2 cột**. (Vì width 45% + margin hai bên 5% = 50%, nên một hàng chỉ chứa được 2 items, đến item thứ 3 sẽ bị rớt xuống dòng).
3. **Trường hợp 3:** 3 items xếp trên **1 hàng ngang, căn giữa theo chiều dọc**. Item 1 dính sát lề trái, Item 3 dính sát lề phải, Item 2 ở chính giữa.
4. **Trường hợp 4:** Xếp thành **1 hàng gồm 3 cột**. Cột trái 200px, cột phải 200px, cột giữa tự động co giãn lấp đầy khoảng trống (`1fr`).
5. **Trường hợp 5:** Xếp thành **3 hàng, mỗi hàng 3 cột** bằng nhau. Riêng hàng cuối cùng (hàng 3) chỉ có 1 item (Item 7) nằm ở cột ngoài cùng bên trái, 2 cột còn lại để trống.

---

## PHẦN C — SUY LUẬN

### Câu C1 — Flexbox vs Grid: Khi nào dùng gì?

1. **Navigation bar ngang:** Dùng **Flexbox**. Vì đây là layout 1 chiều (hàng ngang), cần căn chỉnh khoảng cách giữa các phần tử (logo, menu, nút) rất linh hoạt (`space-between`, `align-items: center`).
2. **Lưới ảnh Instagram:** Dùng **Grid**. Vì đây là layout 2 chiều (hàng và cột) cần sự đồng nhất tuyệt đối. Grid cho phép chia 3 cột chằn chặn ngay từ thẻ cha mà không cần quan tâm có bao nhiêu ảnh.
3. **Layout blog (main content + sidebar):** Dùng **Grid**. Tối ưu nhất để chia bố cục tổng thể trang web (ví dụ: chia 2 cột với tỷ lệ `1fr 300px`).
4. **Footer với 4 cột thông tin:** Dùng **Grid**. Giúp chia 4 cột đều nhau (`repeat(4, 1fr)`) rất nhanh và dễ dàng bẻ layout thành 2 cột hoặc 1 cột trên giao diện mobile.
5. **Card sản phẩm:** Dùng **Flexbox**. Thẻ cha đặt `flex-direction: column`, sau đó dùng thủ thuật `margin-top: auto` cho nút bấm là nút sẽ tự động bị đẩy dính chặt xuống đáy card.

### Câu C2 — Debug Flexbox

**Lỗi 1: Cards không đều chiều cao — nút "Mua" bị nhảy lên/xuống**

- **Nguyên nhân:** Nội dung text dài ngắn khác nhau làm chiều cao các thẻ h3, p thay đổi, đẩy nút bấm chạy tự do.
- **Cách sửa:** Biến thẻ `.card` thành Flexbox dọc và đẩy nút bấm xuống đáy.

```css
.card {
  display: flex;
  flex-direction: column;
  width: 30%;
  margin: 1.5%;
}
.card .btn {
  padding: 10px;
  margin-top: auto;
}
```

**Lỗi 2: Muốn items nằm giữa cả ngang lẫn dọc container 100vh**

- **Nguyên nhân:** Mới chỉ khai báo `display: flex` chứ chưa thêm lệnh căn chỉnh.
- **Cách sửa:** Thêm `justify-content` và `align-items`.

```css
.hero {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
```

**Lỗi 3: Sidebar bị co lại khi content quá dài**

- **Nguyên nhân:** Flexbox mặc định có thuộc tính `flex-shrink: 1`, tự động bóp méo các phần tử khi không đủ chỗ chứa.
- **Cách sửa:** Ép `.sidebar` không được phép co lại bằng `flex-shrink: 0`.

```css
.sidebar {
  width: 250px;
  flex-shrink: 0;
}
```
