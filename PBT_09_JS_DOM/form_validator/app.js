const form = document.getElementById('registerForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const pwdInput = document.getElementById('password');
const confirmPwdInput = document.getElementById('confirmPassword');
const phoneInput = document.getElementById('phone');
const submitBtn = document.getElementById('submitBtn');
const strengthBar = document.getElementById('strengthBar');
const emailError = document.getElementById('emailError');

let state = { name: false, email: false, pwd: false, confirm: false, phone: false };

function updateSubmitState() {
    submitBtn.disabled = !Object.values(state).every(Boolean);
}

function setStatus(input, isValid, iconSpan = null) {
    input.classList.toggle('valid', isValid);
    input.classList.toggle('invalid', !isValid);
    if(iconSpan) iconSpan.textContent = isValid ? '✅' : '❌';
}

// 1. Tên
nameInput.addEventListener('input', (e) => {
    const valid = e.target.value.length >= 2 && e.target.value.length <= 50;
    state.name = valid;
    setStatus(e.target, valid, e.target.nextElementSibling);
    updateSubmitState();
});

// 2. Email
emailInput.addEventListener('input', (e) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valid = regex.test(e.target.value);
    state.email = valid;
    setStatus(e.target, valid);
    emailError.textContent = valid || e.target.value === '' ? '' : 'Email không đúng định dạng';
    updateSubmitState();
});

// 3. Password Strength
pwdInput.addEventListener('input', (e) => {
    const val = e.target.value;
    let strength = 0;
    
    if (val.length >= 8) strength += 1;
    if (/[a-zA-Z]/.test(val) && /[0-9]/.test(val)) strength += 1;
    if (/[^a-zA-Z0-9]/.test(val)) strength += 1;

    strengthBar.style.width = (strength / 3) * 100 + '%';
    
    if (strength === 1) strengthBar.style.background = 'red';
    else if (strength === 2) strengthBar.style.background = 'orange';
    else if (strength === 3) strengthBar.style.background = 'green';
    else strengthBar.style.width = '0';

    state.pwd = strength >= 1; // Ít nhất 8 ký tự
    
    // Trigger confirm pwd check again
    confirmPwdInput.dispatchEvent(new Event('input'));
    updateSubmitState();
});

// 4. Confirm Password
confirmPwdInput.addEventListener('input', (e) => {
    const valid = e.target.value === pwdInput.value && e.target.value !== '';
    state.confirm = valid;
    setStatus(e.target, valid, e.target.nextElementSibling);
    updateSubmitState();
});

// 5. Phone format (0901-234-567)
phoneInput.addEventListener('input', (e) => {
    let raw = e.target.value.replace(/\D/g, ''); // Bỏ hết non-digit
    let formatted = raw;
    
    if (raw.length > 4) formatted = raw.slice(0, 4) + '-' + raw.slice(4);
    if (raw.length > 7) formatted = formatted.slice(0, 8) + '-' + raw.slice(7, 10);
    
    e.target.value = formatted;
    
    state.phone = raw.length === 10;
    setStatus(e.target, state.phone);
    updateSubmitState();
});

// 6. Submit
form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Đăng ký thành công!\nTên: ' + nameInput.value);
    form.reset();
    strengthBar.style.width = '0';
    Object.keys(state).forEach(k => state[k] = false);
    updateSubmitState();
    document.querySelectorAll('.valid, .invalid').forEach(el => el.classList.remove('valid', 'invalid'));
    document.querySelectorAll('.status-icon').forEach(el => el.textContent = '');
});