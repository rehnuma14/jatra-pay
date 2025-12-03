// sidebar toggle
const aside = document.querySelector("aside");
const menuBtn = document.getElementById("menu_bar");
const closeBtn = document.getElementById("cbtn");

// Ensure closeBtn exists before using it
if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    aside.classList.add("open");
  });
}

if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    aside.classList.remove("open");
  });
}

// theme toggler
const themeToggler = document.querySelector('.theme-toggler');
const [lightIcon, darkIcon] = themeToggler.querySelectorAll('span');

// -------------- LOAD SAVED THEME --------------
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark-theme-variables");
  lightIcon.classList.remove("active");
  darkIcon.classList.add("active");
} else {
  lightIcon.classList.add("active");
  darkIcon.classList.remove("active");
}

// -------------- TOGGLE THEME --------------
themeToggler.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark-theme-variables');

  lightIcon.classList.toggle('active', !isDark);
  darkIcon.classList.toggle('active', isDark);

  // SAVE THEME TO LOCAL STORAGE
  localStorage.setItem("theme", isDark ? "dark" : "light");
});
