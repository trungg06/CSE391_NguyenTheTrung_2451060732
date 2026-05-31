// 1. pipe() — Nối chuỗi functions
function pipe(...fns) {
    // Trả về một function nhận vào giá trị ban đầu x
    return function(initialValue) {
        // Dùng reduce để đưa giá trị x qua lần lượt từng hàm trong mảng fns
        return fns.reduce((currentValue, currentFunction) => currentFunction(currentValue), initialValue);
    };
}

const process = pipe(
    x => x * 2,        // 5 → 10
    x => x + 10,       // 10 → 20
    x => x.toString(), // 20 → "20"
    x => "Kết quả: " + x
);
console.log(process(5)); // → "Kết quả: 20"


// 2. memoize() — Cache kết quả
function memoize(fn) {
    const cache = {}; // Object dùng để lưu trữ kết quả
    return function(...args) {
        // Chuyển mảng tham số thành một chuỗi duy nhất để làm key
        const key = JSON.stringify(args); 
        
        if (cache[key]) {
            return cache[key]; // Lấy từ cache
        }
        
        // Gọi hàm gốc nếu chưa có cache
        const result = fn(...args);
        cache[key] = result; // Lưu vào cache
        return result;
    };
}

const expensiveCalc = memoize((n) => {
    console.log("Đang tính...");
    let result = 0;
    for (let i = 0; i < n; i++) result += i;
    return result;
});

console.log(expensiveCalc(1000000)); // → "Đang tính..." rồi ra kết quả
console.log(expensiveCalc(1000000)); // → (Chỉ ra kết quả, không in "Đang tính...")


// 3. debounce() — Chờ user ngừng gõ mới thực hiện
function debounce(fn, delay) {
    let timeoutId;
    return function(...args) {
        // Hủy bộ đếm giờ cũ nếu user gọi lại hàm (ví dụ gõ phím tiếp)
        clearTimeout(timeoutId);
        
        // Đặt bộ đếm giờ mới
        timeoutId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

// Test debounce (Để thấy rõ kết quả, bạn có thể chạy trong console trình duyệt hoặc đợi 500ms)
const search = debounce((query) => {
    console.log("Searching:", query);
}, 500);

search("a"); // Bị hủy
search("ap"); // Bị hủy
search("app"); // Bị hủy
search("apple"); // Sẽ chạy sau 500ms


// 4. retry() — Thử lại nếu lỗi
// Hàm này trả về một Promise (thường dùng khi gọi API)
async function retry(fn, maxAttempts = 3) {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            // Đợi hàm fn chạy xong (nếu là hàm async)
            return await fn();
        } catch (error) {
            console.log(`Lần thử ${attempt} thất bại.`);
            if (attempt === maxAttempts) {
                throw new Error(`Đã thử ${maxAttempts} lần nhưng vẫn lỗi: ${error.message}`);
            }
        }
    }
}

// Test retry
let counter = 0;
const unstableFunction = () => {
    return new Promise((resolve, reject) => {
        counter++;
        if (counter < 3) {
            reject(new Error("Lỗi mạng"));
        } else {
            resolve("Thành công!");
        }
    });
};

retry(unstableFunction)
    .then(res => console.log(res))
    .catch(err => console.error(err.message));