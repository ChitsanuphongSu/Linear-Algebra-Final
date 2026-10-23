(function () {
  const key = "la-final-theme";
  const root = document.documentElement;
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

  function savedTheme() {
    try {
      const value = localStorage.getItem(key);
      return value === "dark" || value === "light" ? value : null;
    } catch {
      return null;
    }
  }

  function applyTheme(theme) {
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    const button = document.querySelector(".theme-toggle");
    if (button) {
      const dark = theme === "dark";
      button.textContent = dark ? "☀ โหมดสว่าง" : "☾ โหมดมืด";
      button.setAttribute("aria-label", dark ? "เปลี่ยนเป็นโหมดสว่าง" : "เปลี่ยนเป็นโหมดมืด");
      button.setAttribute("aria-pressed", String(dark));
    }
  }

  applyTheme(savedTheme() || (systemTheme.matches ? "dark" : "light"));

  document.addEventListener("DOMContentLoaded", function () {
    const nav = document.querySelector(".nav");
    if (!nav) return;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "theme-toggle";
    nav.appendChild(button);
    applyTheme(root.dataset.theme);
    button.addEventListener("click", function () {
      const next = root.dataset.theme === "dark" ? "light" : "dark";
      try { localStorage.setItem(key, next); } catch { /* Browsing still works without storage. */ }
      applyTheme(next);
    });
  });

  systemTheme.addEventListener("change", function (event) {
    if (!savedTheme()) applyTheme(event.matches ? "dark" : "light");
  });
})();
