/* Shared behaviour for the /learn/ tracker layout: theme, sidebar drawer, active section.
   Theme is shared by every tracker under one key, so switching it once applies everywhere. */
(function () {
    "use strict";
    var KEY = "learn_theme";
    var root = document.documentElement;
    var wide = window.matchMedia ? window.matchMedia("(min-width: 1024px)") : { matches: true };

    function readTheme() {
        try {
            var t = localStorage.getItem(KEY);
            if (t === "dark" || t === "light") return t;
        } catch (e) {}
        return window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    function applyTheme(t) {
        t = t || readTheme();
        root.classList.toggle("dark", t === "dark");
        document.querySelectorAll("[data-tk-theme]").forEach(function (b) {
            b.textContent = t === "dark" ? "Light mode" : "Dark mode";
            b.setAttribute("aria-pressed", t === "dark" ? "true" : "false");
        });
        document.dispatchEvent(new CustomEvent("tk:theme", { detail: t }));
        return t;
    }
    function setTheme(t) {
        try { localStorage.setItem(KEY, t); } catch (e) {}
        return applyTheme(t);
    }
    function toggleTheme() {
        return setTheme(root.classList.contains("dark") ? "light" : "dark");
    }

    function openerButtons() { return document.querySelectorAll("[data-tk-open]"); }
    function openSide() {
        if (wide.matches) return;
        document.body.classList.add("tk-open");
        openerButtons().forEach(function (b) { b.setAttribute("aria-expanded", "true"); });
        var first = document.querySelector(".tk-side .tk-item.is-active, .tk-side .tk-item.active, .tk-side .tk-item");
        if (first) first.focus({ preventScroll: true });
    }
    function closeSide(restoreFocus) {
        if (!document.body.classList.contains("tk-open")) return;
        document.body.classList.remove("tk-open");
        openerButtons().forEach(function (b) { b.setAttribute("aria-expanded", "false"); });
        if (restoreFocus) { var o = openerButtons()[0]; if (o) o.focus(); }
    }
    function isOpen() { return document.body.classList.contains("tk-open"); }

    // Marks the matching sidebar item active and mirrors its title into the headers.
    function setActive(view, title) {
        var match = null;
        document.querySelectorAll(".tk-side .tk-item[data-view]").forEach(function (el) {
            var on = el.getAttribute("data-view") === view;
            el.classList.toggle("is-active", on);
            if (on) { el.setAttribute("aria-current", "page"); match = el; }
            else el.removeAttribute("aria-current");
        });
        var t = title || (match && (match.getAttribute("data-title") ||
            (match.querySelector(".tk-item-label") || match).textContent.trim()));
        if (t) document.querySelectorAll("[data-tk-title]").forEach(function (h) { h.textContent = t; });
    }

    document.addEventListener("click", function (e) {
        var t = e.target;
        if (!t.closest) return;
        if (t.closest("[data-tk-open]")) { openSide(); return; }
        if (t.closest("[data-tk-close]")) { closeSide(true); return; }
        if (t.closest("[data-tk-theme]")) { toggleTheme(); return; }
        if (t.closest(".tk-side .tk-item") && !wide.matches) closeSide(false);
        document.querySelectorAll("details.tk-menu[open]").forEach(function (m) {
            if (!m.contains(t)) m.open = false;
        });
    });
    document.addEventListener("keydown", function (e) {
        if (e.key !== "Escape") return;
        var menu = document.querySelector("details.tk-menu[open]");
        if (menu) { menu.open = false; var s = menu.querySelector("summary"); if (s) s.focus(); return; }
        if (isOpen()) closeSide(true);
    });
    if (wide.addEventListener) wide.addEventListener("change", function (m) { if (m.matches) closeSide(false); });

    applyTheme();
    window.TK = { readTheme: readTheme, applyTheme: applyTheme, setTheme: setTheme, toggleTheme: toggleTheme,
        openSide: openSide, closeSide: closeSide, isOpen: isOpen, setActive: setActive };
})();
