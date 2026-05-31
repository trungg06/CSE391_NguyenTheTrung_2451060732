### Câu A1 — var / let / const

- **Đoạn 1:** Kết quả là `undefined`.
  > **Giải thích:** Biến `var` được _hoisted_ (đẩy phần khai báo lên đầu) nhưng không đi kèm giá trị gán. Trình duyệt hiểu là biến có tồn tại nhưng chưa có giá trị.
- **Đoạn 2:** Lỗi `ReferenceError: Cannot access 'y' before initialization`.
  > **Giải thích:** Biến `let` cũng được hoisted nhưng nằm trong vùng an toàn TDZ (Temporal Dead Zone). Bạn không thể truy cập nó trước dòng khởi tạo.
- **Đoạn 3:** Lỗi `TypeError: Assignment to constant variable.`.
  > **Giải thích:** `const` dùng để khai báo hằng số. Việc gán lại giá trị mới (20) cho biến `z` đã được khởi tạo bằng 15 là vi phạm quy tắc.
- **Đoạn 4:** Kết quả là `[1, 2, 3, 4]`.
  > **Giải thích:** `const` ngăn chặn việc gán lại toàn bộ biến (reassignment), nhưng đối với kiểu dữ liệu tham chiếu (Array, Object), bạn hoàn toàn có thể thay đổi nội dung (mutate) bên trong nó.
- **Đoạn 5:** In ra `"Trong block: 2"` và `"Ngoài block: 1"`.
  > **Giải thích:** `let` có phạm vi khối (block scope). Biến `a` bên trong `{}` là một biến hoàn toàn độc lập với biến `a` bên ngoài.

---

### Câu A2 — Data Types & Coercion

**Dự đoán kết quả:**

- `typeof null`: `"object"` (Đây là một lỗi lịch sử của JavaScript và được giữ lại để tương thích ngược).
- `typeof undefined`: `"undefined"`
- `typeof NaN`: `"number"` (NaN viết tắt của Not-a-Number, nhưng kiểu dữ liệu cấu thành của nó vẫn thuộc nhóm số).
- `"5" + 3`: `"53"`
- `"5" - 3`: `2`
- `"5" * "3"`: `15`
- `true + true`: `2` (true bị ép kiểu thành 1).
- `[] + []`: `""` (Chuỗi rỗng, mảng bị ép về chuỗi).
- `[] + {}`: `"[object Object]"`
- `{} + []`: `0` (Engine coi `{}` là block trống, `+[]` ép mảng rỗng thành số 0) hoặc `"[object Object]"`.

**Giải thích sự khác biệt giữa `"5" + 3` và `"5" - 3`:**
Toán tử `+` trong JavaScript vừa là phép cộng toán học, vừa là phép nối chuỗi. Khi một trong hai toán hạng là chuỗi, JS ưu tiên **nối chuỗi**. Trong khi đó, toán tử `-` chỉ có một chức năng duy nhất là trừ toán học, nên JS sẽ chủ động **ép kiểu (coercion)** chuỗi `"5"` về số `5` để thực hiện phép tính.

---

### Câu A3 — So sánh == vs ===

**Dự đoán kết quả:**

- `5 == "5"`: `true`
- `5 === "5"`: `false`
- `null == undefined`: `true`
- `null === undefined`: `false`
- `NaN == NaN`: `false` (Đặc thù của NaN là không bao giờ bằng chính nó).
- `0 == false`: `true`
- `0 === false`: `false`
- `"" == false`: `true`

**Quy tắc áp dụng:** Từ giờ trở đi luôn dùng `===` (Strict Equality).
_Lý do:_ Toán tử `===` so sánh cả **giá trị** và **kiểu dữ liệu** mà không tự động ép kiểu ngầm. Việc dùng `==` thường dẫn đến các lỗi logic khó lường (bug ẩn) do quy tắc ép kiểu phức tạp của JavaScript.

---

### Câu A4 — Truthy & Falsy

**Các giá trị Falsy trong JavaScript bao gồm:** `false`, `0`, `-0`, `0n` (BigInt), `""` (chuỗi rỗng), `null`, `undefined`, và `NaN`.

**Dự đoán kết quả lệnh `if`:**

- `if ("0")` → **In "A"** (Chuỗi khác rỗng là Truthy).
- `if ("")` → **Không in "B"** (Chuỗi rỗng là Falsy).
- `if ([])` → **In "C"** (Mảng rỗng là Object, mà mọi Object đều là Truthy).
- `if ({})` → **In "D"** (Object rỗng là Truthy).
- `if (null)` → **Không in "E"** (Falsy).
- `if (0)` → **Không in "F"** (Falsy).
- `if (-1)` → **In "G"** (Số khác 0 là Truthy).
- `if (" ")` → **In "H"** (Chuỗi chứa khoảng trắng không phải chuỗi rỗng → Truthy).

---

### Câu A5 — Template Literals

**Viết lại bằng template literal (backtick):**

````javascript
// Cách 1:
const greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;

// Cách 2:
const url = `https://api.example.com/users/${userId}/orders?page=${page}`;

// Cách 3:
const html = `
<div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
    <span>Giá: ${price}đ</span>
</div>
`;
### Câu C1 (10đ) — Debug CSS Layout

**1. Tính chiều rộng thực tế (content-box):**

Theo mặc định, CSS sử dụng mô hình hộp (Box Model) là `content-box`. Chiều rộng thực tế của một phần tử chiếm trên màn hình sẽ bằng: `width` + `padding` (trái & phải) + `border` (trái & phải).
* **Sidebar:** `300px` (width) + `40px` (padding 2 bên) + `2px` (border 2 bên) = **342px**
* **Content:** `660px` (width) + `60px` (padding 2 bên) + `2px` (border 2 bên) = **722px**

**2. Giải thích tại sao layout bị vỡ:**

Tổng chiều rộng thực tế của `sidebar` và `content` là: `342px + 722px = 1064px`.
Trong khi đó, thẻ bọc ngoài (`.container`) chỉ có chiều rộng `960px`. Vì không đủ chỗ trống trên cùng một hàng để chứa cả hai phần tử (`1064px > 960px`), phần tử `content` mang thuộc tính `float: left` bị đẩy xuống dòng mới.

**3. Hai cách sửa lỗi:**

* **Cách 1: Sử dụng `box-sizing: border-box` (Khuyên dùng)**
  Chỉ định `border-box` để trình duyệt tự ép `padding` và `border` vào bên trong kích thước `width`. Lúc này chiều rộng thực tế chính là `width` đã khai báo (`300px + 660px = 960px`).

  ```css
  .sidebar, .content {
      box-sizing: border-box;
  }
  Cách 2: Không dùng border-box (Tự tính toán lại width)
Giữ nguyên mô hình content-box mặc định, ta phải trừ đi kích thước của padding và border ở phần width.

Chiều rộng Sidebar mới: 300 - 40 - 2 = 258px

Chiều rộng Content mới: 660 - 60 - 2 = 598px
````

### Câu C2 (10đ) — Cascade Puzzle

**1. "Sản phẩm A" (thẻ `<h2>`):**

- **`font-size` = 20px.** > **Giải thích:** Rule `.card .title` có độ ưu tiên (specificity) cao hơn rule khai báo ở `.container`, do đó kích thước chữ được áp dụng là `20px`.
- **`color` = green.** > **Giải thích:** Thẻ này chịu tác động của rule `#featured .title` (đổi màu `red`, specificity rất cao) nhưng class `.highlight` lại có chứa từ khóa `!important`. Trong CSS, `!important` sẽ phá vỡ mọi quy tắc tính điểm specificity thông thường và giành quyền ghi đè cao nhất, nên màu cuối cùng là `green`.

**2. "Mô tả sản phẩm" (thẻ `<p>` trong card featured):**

- **`color` = blue.** > **Giải thích:** Khai báo `.card p { color: inherit; }` buộc thẻ `<p>` phải từ bỏ màu mặc định để kế thừa màu trực tiếp từ phần tử cha của nó là `.card`. Khối cha này đang được định nghĩa `.card { color: blue; }`. Vì vậy, văn bản mang màu `blue`.

**3. "Sản phẩm B" (thẻ `<h2>`):**

- **`font-size` = 20px.** > **Giải thích:** Tương tự sản phẩm A, thẻ này bị nhắm trúng trực tiếp bởi bộ chọn `.card .title`.
- **`color` = blue.** > **Giải thích:** Thẻ `<h2>` này không có rule CSS nào chỉ định màu trực tiếp. Nó sẽ áp dụng cơ chế thừa kế (inheritance) tự nhiên từ khối cha gần nhất có định nghĩa màu, chính là `.card { color: blue; }`.

**4. "Mô tả sản phẩm B" (thẻ `<p>` mang class `.highlight`):**

- **`color` = green.** > **Giải thích:** Thẻ `<p>` này chịu tác động cạnh tranh giữa `.card p` (ép kế thừa màu `blue`) và `.highlight` (màu `green`). Dù `.card p` có điểm specificity `(0,1,1)` cao hơn `.highlight` `(0,1,0)`, nhưng thuộc tính trong `.highlight` lại mang cờ `!important`, giúp nó giành chiến thắng tuyệt đối trong quá trình Cascade.
