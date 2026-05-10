document.addEventListener('DOMContentLoaded', () => {
    // Tìm tất cả các thanh tiến trình
    const progressBars = document.querySelectorAll('.skill-progress');

    // Tạo một "người quan sát" (Observer)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Nếu thanh kỹ năng lọt vào khung hình người dùng đang xem
            if (entry.isIntersecting) {
                // Thêm class 'animate' vào để CSS bắt đầu chạy hiệu ứng
                entry.target.classList.add('animate');
            }
        });
    });

    // Bắt đầu quan sát từng thanh một
    progressBars.forEach(bar => {
        observer.observe(bar);
    });
});