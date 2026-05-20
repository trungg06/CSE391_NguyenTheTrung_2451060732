## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 — Viewport & Mobile-First

**1. Thẻ Meta Viewport chuẩn:**
`<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- `width=device-width`: Yêu cầu trình duyệt thiết lập chiều rộng trang web bằng đúng chiều rộng vật lý của thiết bị.
- `initial-scale=1.0`: Đặt mức độ zoom ban đầu là 100% (không phóng to hay thu nhỏ khi mới load).

**2. Nếu THIẾU thẻ này:**
Trình duyệt trên điện thoại (như Safari trên iPhone) sẽ mặc định trang web là phiên bản Desktop (thường tự ép về chiều rộng khoảng 980px). Kết quả là trang web bị thu nhỏ lại, chữ siêu bé, người dùng phải dùng tay zoom lên mới đọc được.

**3. Mobile-First vs Desktop-First:**
- **Mobile-First:** Code CSS mặc định dành cho màn hình nhỏ nhất. Sau đó dùng `@media (min-width: ...)` để thêm style cho màn hình lớn dần.
  *Ví dụ:* `body { font-size: 14px; } @media (min-width: 768px) { body { font-size: 16px; } }`
- **Desktop-First:** Code CSS mặc định dành cho máy tính. Sau đó dùng `@media (max-width: ...)` để ghi đè style, bóp nhỏ lại cho điện thoại.
  *Ví dụ:* `body { font-size: 16px; } @media (max-width: 767px) { body { font-size: 14px; } }`
- **Tại sao khuyên dùng Mobile-First?** Hiệu suất tốt hơn. Điện thoại có cấu hình và mạng yếu hơn sẽ không phải tải và xử lý một đống CSS phức tạp của Desktop, chúng chỉ tải đúng CSS gốc cơ bản nhất.

### Câu A2 — Breakpoints (Chuẩn Bootstrap 5)

| Breakpoint | Kích thước | Thiết bị đại diện | Ví dụ lưới sản phẩm |
|---|---|---|---|
| Mặc định | `< 576px` | Mobile dọc (iPhone, Android) | 1 cột (100%) |
| `sm` | `≥ 576px` | Mobile ngang | 2 cột |
| `md` | `≥ 768px` | Tablet (iPad dọc) | 2 hoặc 3 cột |
| `lg` | `≥ 992px` | Laptop nhỏ, iPad ngang | 3 hoặc 4 cột |
| `xl` | `≥ 1200px`| Desktop tiêu chuẩn | 4 cột |

### Câu A3 — Dự đoán Media Queries

| Chiều rộng màn hình | `.container` width | Giải thích |
|---|---|---|
| 375px (iPhone SE) | **100%** | Chưa đạt mốc `min-width: 576px` nào, nhận CSS gốc. |
| 600px | **540px** | Vượt mốc 576px nhưng chưa tới 768px. |
| 800px | **720px** | Vượt mốc 768px nhưng chưa tới 992px. |
| 1000px | **960px** | Vượt mốc 992px nhưng chưa tới 1200px. |
| 1400px | **1140px** | Vượt mốc lớn nhất 1200px. |

### Câu A4 — SCSS Basics

**1. Variables (Biến):** Giúp lưu trữ các giá trị dùng chung (màu sắc, font) để tái sử dụng và sửa đổi hàng loạt. Ví dụ: `$primary: #ff0000; color: $primary;`
**2. Nesting (Lồng ghép):** Cho phép viết CSS theo cấu trúc phân cấp như HTML, tránh việc lặp lại tên class cha. Ví dụ: `.card { .title { font-weight: bold; } }`
**3. Mixins:** Đóng gói một khối code CSS thành 1 hàm để gọi lại nhiều nơi, có thể truyền tham số. Ví dụ: `@mixin flex-center { display: flex; justify-content: center; align-items: center; } .box { @include flex-center; }`
**4. @extend:** Cho phép một class thừa kế toàn bộ thuộc tính của một class khác. Ví dụ: `.btn-danger { @extend .btn; background: red; }`

**Tại sao trình duyệt không đọc được SCSS?** Trình duyệt chỉ được lập trình để hiểu mã CSS tiêu chuẩn.
**Cách chuyển đổi:** Phải dùng một trình biên dịch (Compiler). Trong VS Code, cách nhanh nhất là cài extension **Live Sass Compiler**, bấm nút "Watch Sass" để tự động xuất ra file `.css`.

---

## PHẦN C — PHÂN TÍCH

### Câu C1 — Phân tích trang web (Ví dụ: Shopee)



**Phân tích:**
- **Navigation:** Trên Desktop là một thanh ngang dài đầy đủ danh mục. Trên Mobile, nó biến thành một thanh tìm kiếm dính ở trên và một thanh Bottom Navigation (chứa icon Home, Mall, Tôi...) dính ở đáy màn hình.
- **Lưới content (Sản phẩm gợi ý):** Desktop (6 cột), Tablet (4 cột), Mobile (2 cột).
- **Element bị ẩn:** Trên Mobile, toàn bộ banner dọc hai bên, sidebar bộ lọc chi tiết bên trái đều bị ẩn đi để tiết kiệm diện tích.
- **Font size:** Chữ trên Mobile được làm nhỏ lại, khoảng cách (padding) giữa các khối cũng thu hẹp tối đa.

### Câu C2 — Thiết kế Responsive Strategy (Nhà hàng)

**1. Sơ đồ bố cục (Wireframe mô tả):**
- **Mobile (< 768px):** Header chỉ có Logo và nút Hamburger. Hero image chiếm 50vh. Grid món ăn xếp **1 cột**. Form đặt bàn xếp dọc 100% width. Bản đồ nằm dưới cùng trước Footer.
- **Tablet (≥ 768px):** Grid món ăn xếp **2 cột**. Form đặt bàn chia 2 cột (ngày/giờ một bên, thông tin khách một bên). Bản đồ và Form có thể nằm cạnh nhau.
- **Desktop (≥ 1024px):** Header hiện full menu. Grid món ăn xếp **3 cột**. Layout chính chia 2 phần: Bên trái (70%) chứa Grid món ăn và Form; Bên phải (30%) là Sidebar chứa Bản đồ và thông tin liên hệ.

**2. CSS Skeleton (Mobile-First Grid):**

```css
/* Base (Mobile) */
.layout-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
}
.grid-mon-an {
    display: grid;
    grid-template-columns: 1fr;
    gap: 15px;
}

/* Tablet */
@media (min-width: 768px) {
    .grid-mon-an {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* Desktop */
@media (min-width: 1024px) {
    .layout-container {
        grid-template-columns: 7fr 3fr; /* Main 70%, Sidebar 30% */
    }
    .grid-mon-an {
        grid-template-columns: repeat(3, 1fr);
    }
    .sidebar-map {
        grid-column: 2 / 3;
    }
}