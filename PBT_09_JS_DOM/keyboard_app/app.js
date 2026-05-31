// --- GALLERY LOGIC ---
const images = [
  "https://placehold.co/600x400/007bff/fff?text=Image+1",
  "https://placehold.co/600x400/28a745/fff?text=Image+2",
  "https://placehold.co/600x400/dc3545/fff?text=Image+3",
];
let currentIndex = 0;
let playing = false;
let playInterval;

const galleryImg = document.getElementById("galleryImg");
const galleryInfo = document.getElementById("galleryInfo");

function updateGallery() {
  galleryImg.src = images[currentIndex];
  galleryInfo.textContent = `Hình ${currentIndex + 1} / ${images.length} ${playing ? "(Đang phát...)" : ""}`;
}

function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  updateGallery();
}
function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateGallery();
}
function togglePlay() {
  playing = !playing;
  if (playing) playInterval = setInterval(nextImage, 1500);
  else clearInterval(playInterval);
  updateGallery();
}

// --- COMMAND PALETTE LOGIC ---
const cmdPalette = document.getElementById("cmdPalette");
const cmdInput = document.getElementById("cmdInput");
const cmdList = document.getElementById("cmdList");

const commands = [
  { name: "Settings", action: () => alert("Mở Settings") },
  { name: "Dark Mode", action: () => alert("Bật Dark Mode") },
  { name: "Logout", action: () => alert("Đăng xuất") },
];
let selectedCmdIndex = 0;

function renderCommands(filterText = "") {
  cmdList.innerHTML = "";
  const filtered = commands.filter((c) =>
    c.name.toLowerCase().includes(filterText.toLowerCase()),
  );

  filtered.forEach((cmd, idx) => {
    const li = document.createElement("li");
    li.textContent = cmd.name;
    if (idx === selectedCmdIndex) li.classList.add("selected");
    cmdList.appendChild(li);
  });
}

function openPalette() {
  cmdPalette.classList.remove("hidden");
  cmdInput.value = "";
  selectedCmdIndex = 0;
  renderCommands();
  setTimeout(() => cmdInput.focus(), 10);
}

function closePalette() {
  cmdPalette.classList.add("hidden");
}

cmdInput.addEventListener("input", (e) => {
  selectedCmdIndex = 0; // reset selection
  renderCommands(e.target.value);
});

// --- GLOBAL KEYBOARD EVENTS ---
window.addEventListener("keydown", (e) => {
  const isPaletteOpen = !cmdPalette.classList.contains("hidden");

  if (isPaletteOpen) {
    if (e.key === "Escape") {
      closePalette();
      e.preventDefault();
    } else if (e.key === "ArrowDown") {
      const currentItemsCount = cmdList.children.length;
      selectedCmdIndex = (selectedCmdIndex + 1) % currentItemsCount;
      renderCommands(cmdInput.value);
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      const currentItemsCount = cmdList.children.length;
      selectedCmdIndex =
        (selectedCmdIndex - 1 + currentItemsCount) % currentItemsCount;
      renderCommands(cmdInput.value);
      e.preventDefault();
    } else if (e.key === "Enter") {
      const visibleCmds = commands.filter((c) =>
        c.name.toLowerCase().includes(cmdInput.value.toLowerCase()),
      );
      if (visibleCmds[selectedCmdIndex]) {
        visibleCmds[selectedCmdIndex].action();
        closePalette();
      }
    }
    return; // Dừng xử lý các phím khác nếu Palette đang mở
  }

  // Ctrl + K hoặc Cmd + K
  if ((e.ctrlKey || e.metaKey) && e.key === "k") {
    openPalette();
    e.preventDefault();
  }

  // Tránh việc nhấn mũi tên/Space khi đang gõ text ở thẻ input khác trên trang
  if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

  if (e.key === "ArrowRight") nextImage();
  else if (e.key === "ArrowLeft") prevImage();
  else if (e.key === " ") {
    togglePlay();
    e.preventDefault(); // Tránh scroll trang
  }
  // Bấm số 1-9
  else if (e.key >= "1" && e.key <= "9") {
    const num = parseInt(e.key) - 1;
    if (num < images.length) {
      currentIndex = num;
      updateGallery();
    }
  }
});
