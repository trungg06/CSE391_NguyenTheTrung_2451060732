// 1. TÌM VÀ LƯU TRỮ CÁC PHẦN TỬ DOM CẦN THIẾT
const btnAddStudent = document.getElementById('btnAddStudent');
const btnCancel = document.getElementById('btnCancel');
const studentModal = document.getElementById('studentModal');
const studentForm = document.getElementById('studentForm');
const modalTitle = document.getElementById('modalTitle');
const studentTableBody = document.getElementById('studentTableBody');
const editIndexInput = document.getElementById('editIndex');

// DOM phần thống kê
const totalStudentsEl = document.getElementById('totalStudents');
const averageScoreEl = document.getElementById('averageScore');

// 2. KHỞI TẠO DỮ LIỆU TỪ LOCALSTORAGE
// Nếu trong localStorage chưa có thì gán mảng rỗng []
// 2. KHỞI TẠO DỮ LIỆU VỚI 5 SINH VIÊN MẪU CỐ ĐỊNH
// Danh sách 5 sinh viên mẫu mặc định
const defaultStudents = [
    { id: "2451060001", name: "Nguyễn Văn Đại", dob: "2006-10-15", className: "66CNTT1", gpa: "8.5", email: "dainv@gmail.com" },
    { id: "2451060002", name: "Trần Thị Thu Hà", dob: "2006-03-22", className: "66CNTT1", gpa: "7.8", email: "hatt@gmail.com" },
    { id: "2451060003", name: "Lê Hoàng Nam", dob: "2006-12-05", className: "66HTTT2", gpa: "9.2", email: "namlh@gmail.com" },
   
];

// Thử đọc dữ liệu cũ từ trình duyệt ra
let students = JSON.parse(localStorage.getItem('students'));

// BẪY LOGIC: Nếu trong bộ nhớ chưa hề có dữ liệu (lần đầu tiên mở web)
// hoặc mảng dữ liệu đang bị trống không có ai
if (!students || students.length === 0) {
    students = defaultStudents; // Nạp ngay 5 sinh viên mẫu vào biến hệ thống
    localStorage.setItem('students', JSON.stringify(students)); // Lưu luôn xuống bộ nhớ trình duyệt
}

// 3. HÀM HIỂN THỊ DỮ LIỆU (RENDER)
function renderTable() {
    // Xóa trắng bảng trước khi vẽ lại
    studentTableBody.innerHTML = '';
    
    let totalScore = 0;

    // Duyệt qua mảng và tạo các thẻ <tr>
    students.forEach((student, index) => {
        totalScore += parseFloat(student.gpa);

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.dob}</td>
            <td>${student.className}</td>
            <td>${student.gpa}</td>
            <td>${student.email}</td>
            <td>
                <button class="btn btn-edit" data-index="${index}">Sửa</button>
                <button class="btn btn-delete" data-index="${index}">Xóa</button>
            </td>
        `;
        studentTableBody.appendChild(tr);
    });

    // Cập nhật khu vực thống kê
    totalStudentsEl.textContent = students.length;
    
    if (students.length > 0) {
        const avg = (totalScore / students.length).toFixed(2);
        averageScoreEl.textContent = avg;
    } else {
        averageScoreEl.textContent = '0.0';
        // Hiển thị dòng thông báo trống nếu không có sinh viên
        studentTableBody.innerHTML = `<tr><td colspan="7" style="text-align: center;">Chưa có dữ liệu sinh viên.</td></tr>`;
    }
}

// 4. CÁC HÀM XỬ LÝ ẨN/HIỆN MODAL
function openModal(mode = 'add', index = -1) {
    studentModal.classList.add('show');
    
    if (mode === 'add') {
        modalTitle.textContent = 'Thêm Sinh viên';
        studentForm.reset();
        editIndexInput.value = -1; // -1 nghĩa là đang thêm mới
    } else if (mode === 'edit') {
        modalTitle.textContent = 'Cập nhật Sinh viên';
        editIndexInput.value = index;
        
        // Nạp dữ liệu cũ lên form
        const student = students[index];
        document.getElementById('studentId').value = student.id;
        document.getElementById('fullName').value = student.name;
        document.getElementById('dob').value = student.dob;
        document.getElementById('className').value = student.className;
        document.getElementById('gpa').value = student.gpa;
        document.getElementById('email').value = student.email;
    }
}

function closeModal() {
    studentModal.classList.remove('show');
    studentForm.reset();
}

// 5. LƯU DỮ LIỆU XUỐNG LOCALSTORAGE
function saveToLocalStorage() {
    localStorage.setItem('students', JSON.stringify(students));
}

// 6. BẮT CÁC SỰ KIỆN (EVENTS)

// Mở form khi bấm "Thêm Sinh viên"
btnAddStudent.addEventListener('click', () => {
    openModal('add');
});

// Đóng form khi bấm "Hủy"
btnCancel.addEventListener('click', closeModal);

// Xử lý sự kiện Submit Form (Thêm hoặc Sửa)
studentForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Chặn hành vi load lại trang mặc định của form

    // Lấy dữ liệu từ các input
    const newStudent = {
        id: document.getElementById('studentId').value,
        name: document.getElementById('fullName').value,
        dob: document.getElementById('dob').value,
        className: document.getElementById('className').value,
        gpa: document.getElementById('gpa').value,
        email: document.getElementById('email').value
    };

    const currentIndex = parseInt(editIndexInput.value);

    if (currentIndex === -1) {
        // Trạng thái Thêm mới
        students.push(newStudent);
    } else {
        // Trạng thái Cập nhật (Sửa)
        students[currentIndex] = newStudent;
    }

    saveToLocalStorage();
    renderTable();
    closeModal();
});

// Xử lý sự kiện Sửa/Xóa bằng EVENT DELEGATION
// Bắt sự kiện click trên toàn bộ thẻ <tbody>, sau đó kiểm tra phần tử được click
studentTableBody.addEventListener('click', function(e) {
    // Nếu click trúng nút có class 'btn-delete'
    if (e.target.classList.contains('btn-delete')) {
        const index = e.target.getAttribute('data-index');
        
        // Hiển thị hộp thoại xác nhận
        if (confirm(`Bạn có chắc chắn muốn xóa sinh viên: ${students[index].name}?`)) {
            students.splice(index, 1); // Xóa 1 phần tử tại vị trí index
            saveToLocalStorage();
            renderTable();
        }
    }

    // Nếu click trúng nút có class 'btn-edit'
    if (e.target.classList.contains('btn-edit')) {
        const index = e.target.getAttribute('data-index');
        openModal('edit', index);
    }
});

// 7. CHẠY LẦN ĐẦU KHI TẢI TRANG
renderTable();