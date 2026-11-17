/* The /learn/ study app.
   One engine for every tracker. Each tracker page loads its content (window.TRACKER)
   and this file draws the same interface around it: sidebar with sections and progress,
   overview, section pages built from content blocks, search, library, tools.

   Content shape (all plain data):
   {
     id, storageKey, legacyKeys: [..],          // where progress lives, and older keys to import once
     meta: { title, mark, kicker, sub, footnote },
     phases: [{ id, label, color }],            // optional bands that group the groups (terms)
     groups: [{ id, label, short, phase, intro }],
     sections: [{ id, group, label, sub, title, h, blocks: [...] }],
     library: { refId: { title, by, href, kind, acct } },
     modes: { datedPlan: { hoursPerWeek, order, groupNoun } },
     tools: { timer: [25, 90] },
     labels: { section: "Day", item: "task" }
   }
   Blocks: text, cards, checklist, resources, note, select, table, reference, callout.
   Items in checklist/resources count toward progress unless the block says counts: false. */
(function () {
    "use strict";

    var C = window.TRACKER;
    var app = document.getElementById("app");
    if (!C || !app) return;

    // ------------------------------------------------------------------ helpers
    function $(s, r) { return (r || document).querySelector(s); }
    function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
    function esc(s) {
        return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
            return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
        });
    }
    function iso(d) { return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
    function addDays(d, n) { var x = new Date(d); x.setDate(x.getDate() + n); return x; }
    function today() { var d = new Date(); d.setHours(0, 0, 0, 0); return d; }
    function fmt(d) { return d.toLocaleDateString(undefined, { day: "numeric", month: "short" }); }
    function fmtY(d) { return d.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" }); }
    function pct(a, b) { return b ? Math.round(100 * a / b) : 0; }

    var COLORS = { coral: "var(--tk-coral)", teal: "var(--tk-teal)", gold: "var(--ap-gold)", plum: "var(--ap-plum)", muted: "var(--tk-muted)" };
    var KINDS = {
        course: ["Lectures", "watch"], video: ["Video", "watch"], book: ["Book", "read"], paper: ["Paper", "read"],
        doc: ["Docs", ""], interactive: ["Practice", "do"], link: ["Link", ""]
    };
    var KIND_ORDER = [["course", "Lecture courses"], ["video", "Video series"], ["book", "Books"], ["paper", "Papers and articles"], ["interactive", "Hands-on"], ["doc", "Docs"], ["link", "Links"]];
    var meta = C.meta || {};
    var labels = Object.assign({ section: "Section", sections: "Sections", item: "item", items: "items" }, C.labels || {});
    var PLAN = C.modes && C.modes.datedPlan;
    var TIMER = C.tools && C.tools.timer;
    var REVIEW = C.modes && C.modes.review;

    // ------------------------------------------------------------------ model
    var phases = C.phases || [];
    var PHASE = {}; phases.forEach(function (p) { PHASE[p.id] = p; });
    var groups = C.groups || [];
    var GROUP = {}; groups.forEach(function (g) { GROUP[g.id] = g; });
    var sections = C.sections || [];
    var SECTION = {}; sections.forEach(function (s, i) { s._i = i; SECTION[s.id] = s; });
    var library = C.library || {};

    // Every tickable thing, flattened once.
    var ITEMS = [];
    var BY_SECTION = {};
    sections.forEach(function (s) {
        BY_SECTION[s.id] = [];
        (s.blocks || []).forEach(function (b) {
            if (b.type !== "checklist" && b.type !== "resources" && b.type !== "problems") return;
            (b.items || []).forEach(function (it) {
                var r = it.ref ? library[it.ref] || {} : {};
                var rec = {
                    id: it.id, section: s.id, resource: b.type === "resources", review: b.type === "problems",
                    text: it.text || it.title || r.title || "", sub: it.sub || it.note || "",
                    counts: b.counts !== false && it.counts !== false, src: it
                };
                ITEMS.push(rec); BY_SECTION[s.id].push(rec);
            });
        });
    });
    var hasResources = ITEMS.some(function (i) { return i.resource; });
    var REVIEW_ITEMS = ITEMS.filter(function (i) { return i.review; });
    var ITEM = {}; ITEMS.forEach(function (i) { ITEM[i.id] = i; });

    function color(s) {
        var g = GROUP[s && s.group] || {};
        var p = PHASE[g.phase] || {};
        return COLORS[g.color || p.color] || "var(--tk-coral)";
    }
    function groupOf(s) { return GROUP[s.group] || null; }
    function titleOf(s) { return s.title || s.label; }
    // A subtitle worth showing: one the title doesn't already contain.
    function subOf(s) { return s.sub && titleOf(s).indexOf(s.sub) === -1 ? s.sub : ""; }
    function gTitle(g) { return g ? (g.title || g.label) : ""; }

    // ------------------------------------------------------------------ state
    var KEY = C.storageKey || ("learn_app_" + C.id);
    function planDefaults() {
        var d = PLAN ? { start: iso(today()), hpw: PLAN.hoursPerWeek || 10, order: PLAN.order || "parallel", off: [] } : {};
        if (REVIEW) { d.dailyNew = REVIEW.dailyNew || 4; d.startDate = null; }
        return d;
    }
    function fresh() {
        return { checks: {}, notes: {}, values: {}, reviews: {}, mock: null, active: null, settings: planDefaults(), ui: { open: {}, hideDone: false } };
    }
    function adopt(raw) {
        // Accepts this app's format and the older per-tracker formats.
        var s = fresh();
        if (!raw || typeof raw !== "object") return s;
        var checks = raw.checks || raw.p || raw.completedChecks || {};
        Object.keys(checks).forEach(function (k) { if (checks[k]) s.checks[k] = 1; });
        s.notes = Object.assign({}, raw.notes || {});
        s.values = Object.assign({}, raw.values || raw.rubrics || {});
        s.settings = Object.assign(planDefaults(), raw.settings || raw.set || {});
        if (!Array.isArray(s.settings.off)) s.settings.off = [];
        if (raw.ui) s.ui = Object.assign(s.ui, raw.ui);
        // Spaced reviews: this app's "reviews", or the old DSA tracker's "problems" (with notes inside).
        var reviews = raw.reviews || raw.problems || {};
        Object.keys(reviews).forEach(function (k) {
            var r = reviews[k] || {};
            if (r.note && !s.notes[k]) s.notes[k] = r.note;
            s.reviews[k] = { attempts: r.attempts || [], reps: r.reps || 0, interval: r.interval || 0, ease: r.ease || 2.5, due: r.due || null, everSolved: !!r.everSolved };
        });
        if (raw.dailyNew) s.settings.dailyNew = raw.dailyNew;
        if (raw.startDate) s.settings.startDate = raw.startDate;
        if (raw.mock) s.mock = raw.mock;
        if (raw.active) s.active = raw.active;
        return s;
    }
    var S = (function load() {
        try {
            var raw = localStorage.getItem(KEY);
            if (raw) return adopt(JSON.parse(raw));
            var legacy = C.legacyKeys || [];
            for (var i = 0; i < legacy.length; i++) {
                var old = localStorage.getItem(legacy[i]);
                if (old) { var st = adopt(JSON.parse(old)); localStorage.setItem(KEY, JSON.stringify(st)); return st; }
            }
        } catch (e) {}
        return fresh();
    })();
    var saveTimer = null;
    function save(now) {
        clearTimeout(saveTimer);
        var write = function () { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { toast("Couldn't save: browser storage is unavailable"); } };
        if (now) write(); else saveTimer = setTimeout(write, 250);
    }

    // ------------------------------------------------------------------ progress
    function counted(sid) { return (BY_SECTION[sid] || []).filter(function (i) { return i.counts; }); }
    function itemDone(i) { return i.review ? !!(S.reviews[i.id] && S.reviews[i.id].everSolved) : !!S.checks[i.id]; }
    function secProgress(sid) {
        var list = counted(sid), done = 0;
        list.forEach(function (i) { if (itemDone(i)) done++; });
        return { done: done, total: list.length };
    }
    function isDone(sid) { var p = secProgress(sid); return p.total > 0 && p.done === p.total; }
    function groupProgress(gid) {
        var done = 0, total = 0;
        sections.forEach(function (s) { if (s.group === gid) { var p = secProgress(s.id); done += p.done; total += p.total; } });
        return { done: done, total: total };
    }
    function inPlan(s) { return !(PLAN && s.group && S.settings.off.indexOf(s.group) !== -1); }
    function overall() {
        var done = 0, total = 0;
        ITEMS.forEach(function (i) { if (i.counts && inPlan(SECTION[i.section])) { total++; if (itemDone(i)) done++; } });
        return { done: done, total: total };
    }

    // ------------------------------------------------------------------ ordering and dates
    function ordered() {
        if (!PLAN) return sections.slice();
        var seq = [], order = phases.length ? phases.map(function (p) { return p.id; }) : [null];
        order.forEach(function (ph) {
            var gs = groups.filter(function (g) { return (ph === null || g.phase === ph) && S.settings.off.indexOf(g.id) === -1; });
            var lists = gs.map(function (g) { return sections.filter(function (s) { return s.group === g.id; }); });
            if (S.settings.order === "serial") lists.forEach(function (l) { seq.push.apply(seq, l); });
            else {
                var max = Math.max.apply(null, [0].concat(lists.map(function (l) { return l.length; })));
                for (var i = 0; i < max; i++) lists.forEach(function (l) { if (l[i]) seq.push(l[i]); });
            }
        });
        sections.forEach(function (s) { if (!s.group) seq.push(s); });
        return seq;
    }
    function dated() {
        var seq = ordered(), start = new Date(S.settings.start + "T00:00:00"), hpw = Math.max(1, +S.settings.hpw || 10), cum = 0;
        return seq.map(function (s) {
            var h = +s.h || 0;
            var d0 = Math.floor(cum / hpw * 7); cum += h;
            var d1 = Math.max(d0, Math.ceil(cum / hpw * 7) - 1);
            return { s: s, from: addDays(start, d0), to: addDays(start, d1) };
        });
    }
    function upNext() {
        var seq = ordered();
        for (var i = 0; i < seq.length; i++) {
            var p = secProgress(seq[i].id);
            if (p.total && p.done < p.total) return seq[i];
        }
        return null;
    }

    // ------------------------------------------------------------------ routing
    var view = "overview", current = null, query = "";
    function route() {
        var h = decodeURIComponent((location.hash || "").slice(1));
        if (h && SECTION[h]) { view = "section"; current = SECTION[h]; }
        else if (h === "library" && hasResources) { view = "library"; current = null; }
        else if (h === "today" && REVIEW) { view = "today"; current = null; }
        else { view = "overview"; current = null; }
        if (current && current.group) S.ui.open[current.group] = true;
        renderAll();
        window.scrollTo(0, 0);
    }
    function go(id) {
        if (location.hash === "#" + id) route(); else location.hash = id;
    }

    // ------------------------------------------------------------------ chrome
    function itemBtn(opts) {
        return '<a href="#' + esc(opts.href) + '" class="tk-item' + (opts.sub ? " tk-sub-item" : "") + (opts.active ? " is-active" : "") + (opts.done ? " ap-done" : "") + '"' +
            (opts.active ? ' aria-current="page"' : "") + ' data-view="' + esc(opts.href) + '"' + (opts.title ? ' data-title="' + esc(opts.title) + '"' : "") + (opts.style ? ' style="' + opts.style + '"' : "") + ">" +
            '<span class="tk-item-main"><span class="tk-item-label">' + esc(opts.label) + "</span>" +
            (opts.subtext ? '<span class="tk-item-sub">' + esc(opts.subtext) + "</span>" : "") + "</span>" +
            (opts.count != null ? '<span class="tk-item-count">' + opts.count + "</span>" : "") +
            (opts.bar != null ? '<span class="tk-item-bar"><span style="width:' + opts.bar + '%"></span></span>' : "") + "</a>";
    }

    function renderShell() {
        app.innerHTML =
            '<a class="skip-link" href="#ap-main">Skip to content</a>' +
            '<nav class="tk-site" aria-label="Site"><div class="tk-site-inner"><a href="/" class="tk-site-name">Utkarsh Tripathi</a>' +
            '<div class="tk-site-links"><a href="/projects/">Work</a><a href="/about/">About</a><a href="/learn/" aria-current="page">Learn</a><a href="/cv/Utkarsh-Tripathi-Resume.pdf">Resume</a></div></div></nav>' +
            '<header class="tk-mbar"><div class="tk-mbar-text"><a href="/learn/" class="tk-kicker">&larr; Learn</a><div class="tk-mbar-title" data-tk-title></div></div>' +
            '<button type="button" class="tk-btn" data-tk-open aria-controls="tkSide" aria-expanded="false">&#9776; ' + esc(labels.sections) + "</button></header>" +
            '<div class="tk-backdrop" data-tk-close></div>' +
            '<div class="tk-layout">' +
            '<aside class="tk-side" id="tkSide" aria-label="' + esc(labels.sections) + '"><div class="tk-side-scroll" id="apSide"></div>' +
            '<div class="tk-side-foot"><button type="button" class="tk-btn" data-tk-theme>Dark mode</button>' +
            '<details class="tk-menu"><summary class="tk-btn">Data &amp; export</summary><div class="tk-menu-panel">' +
            '<button type="button" data-action="csv">Download progress (.csv)</button>' +
            '<button type="button" data-action="backup">Back up progress (.json)</button>' +
            '<button type="button" data-action="restore">Restore backup&hellip;</button>' +
            '<button type="button" data-action="reset" class="tk-danger">Reset all progress</button>' +
            '</div></details><input type="file" id="apRestore" accept=".json,application/json" hidden></div></aside>' +
            '<div class="tk-main"><div class="tk-head" id="apHead"></div>' +
            '<main class="tk-content" id="ap-main" tabindex="-1"></main>' +
            '<footer class="tk-foot"><span>' + esc(meta.footnote || "Progress is saved in this browser only · back it up from Data & export") + '</span><a href="/learn/">All study trackers</a></footer></div></div>' +
            '<div class="ap-toast" id="apToast" role="status" aria-live="polite"></div>' +
            (REVIEW ? '<div class="ap-attempt" id="apAttempt" role="region" aria-label="Current attempt" hidden></div>' : "");
        if (window.TK) TK.applyTheme();
    }

    function renderSide() {
        var box = $("#apSide"); if (!box) return;
        var keep = box.scrollTop;
        var o = overall();
        var html =
            '<div class="tk-brand tk-grid-bg"><div class="tk-brand-top"><a href="/learn/" class="tk-kicker">&larr; Learn &middot; ' + esc(meta.kicker || "") + "</a>" +
            '<button type="button" class="tk-btn tk-close" data-tk-close aria-label="Close">&times;</button></div>' +
            '<h1 class="tk-title">' + esc(meta.title || "") + (meta.mark ? ' <span class="tk-mark">' + esc(meta.mark) + "</span>" : "") + "</h1>" +
            (meta.sub ? '<p class="tk-sub">' + esc(meta.sub) + "</p>" : "") +
            '<div class="tk-progress"><div class="tk-progress-top"><span>Progress</span><span>' + o.done + " / " + o.total + " &middot; " + pct(o.done, o.total) + "%</span></div>" +
            '<div class="tk-bar"><span style="width:' + pct(o.done, o.total) + '%"></span></div></div></div>';

        html += '<nav class="tk-nav" aria-label="' + esc(labels.sections) + '">';
        if (REVIEW) html += itemBtn({ href: "today", label: "Today", subtext: "Reviews due and new " + labels.items, active: view === "today", count: todayCount() || null });
        html += itemBtn({ href: "overview", label: "Overview", subtext: PLAN ? "Dated plan and pace" : "Everything at a glance", active: view === "overview" });
        if (hasResources) html += itemBtn({ href: "library", label: "Library", subtext: "Every resource in one list", active: view === "library" });

        var lastPhase = null;
        var renderGroup = function (g) {
            var gp = groupProgress(g.id);
            var open = !!S.ui.open[g.id];
            var off = PLAN && S.settings.off.indexOf(g.id) !== -1;
            html += '<button type="button" class="tk-item ap-group' + (off ? " ap-off" : "") + '" data-tk-keep data-group-toggle="' + esc(g.id) + '" aria-expanded="' + open + '" style="--ap-c:' + COLORS[g.color || (PHASE[g.phase] || {}).color] + '">' +
                '<span class="tk-item-main"><span class="tk-item-label"><span class="ap-caret" aria-hidden="true">&#9656;</span> ' + esc(g.label) + "</span>" +
                (g.sub ? '<span class="tk-item-sub">' + esc(g.sub) + "</span>" : "") + "</span>" +
                '<span class="tk-item-count">' + gp.done + "/" + gp.total + "</span>" +
                '<span class="tk-item-bar"><span style="width:' + pct(gp.done, gp.total) + '%"></span></span></button>';
            if (open) {
                sections.forEach(function (s) {
                    if (s.group !== g.id) return;
                    var p = secProgress(s.id);
                    html += itemBtn({ href: s.id, label: s.label, subtext: s.sub, sub: true, active: current === s, title: titleOf(s),
                        count: p.total ? p.done + "/" + p.total : null, done: p.total && p.done === p.total });
                });
            }
        };
        groups.forEach(function (g) {
            if (g.phase && g.phase !== lastPhase) { html += '<div class="tk-nav-h">' + esc((PHASE[g.phase] || {}).label || g.phase) + "</div>"; lastPhase = g.phase; }
            renderGroup(g);
        });
        var loose = sections.filter(function (s) { return !s.group; });
        if (loose.length) {
            html += '<div class="tk-nav-h">' + esc(C.looseLabel || "More") + "</div>";
            loose.forEach(function (s) {
                var p = secProgress(s.id);
                html += itemBtn({ href: s.id, label: s.label, subtext: s.sub, active: current === s, title: titleOf(s), count: p.total ? p.done + "/" + p.total : null, bar: p.total ? pct(p.done, p.total) : null });
            });
        }
        html += "</nav>";

        var next = upNext();
        html += '<div class="tk-block"><p class="tk-block-h">Up next</p>' +
            (next ? '<a class="ap-next" href="#' + esc(next.id) + '"><span>' + esc((groupOf(next) || {}).short ? groupOf(next).short + " · " : "") + esc(titleOf(next)) + '</span><span aria-hidden="true">&rarr;</span></a>'
                  : '<p class="ap-muted">Everything is ticked off. Nice work.</p>') + "</div>";

        if (PLAN) {
            html += '<div class="tk-block"><p class="tk-block-h">Your plan</p><div class="ap-plan">' +
                '<label>Start date<input type="date" data-setting="start" value="' + esc(S.settings.start) + '"></label>' +
                '<label>Hours per week<span class="ap-hpw"><input type="range" min="3" max="40" step="1" data-setting="hpw" value="' + Math.min(40, +S.settings.hpw) + '" aria-label="Hours per week">' +
                '<input type="number" min="1" max="80" step="1" data-setting="hpw" value="' + esc(S.settings.hpw) + '" aria-label="Hours per week"></span></label>' +
                '<label>Order<select data-setting="order"><option value="parallel"' + (S.settings.order === "parallel" ? " selected" : "") + ">Side by side within a " + esc((PLAN.phaseNoun || "phase").toLowerCase()) + "</option>" +
                '<option value="serial"' + (S.settings.order === "serial" ? " selected" : "") + ">One " + esc((PLAN.groupNoun || "group").toLowerCase()) + " at a time</option></select></label></div></div>";
        }
        if (REVIEW) {
            html += '<div class="tk-block"><p class="tk-block-h">Your pace</p><div class="ap-plan"><label>New ' + esc(labels.items) + " per day" +
                '<select data-setting="dailyNew">' + [1, 2, 3, 4, 5, 6, 8].map(function (n) { return "<option" + (+S.settings.dailyNew === n ? " selected" : "") + ">" + n + "</option>"; }).join("") +
                "</select></label></div></div>";
        }
        if (TIMER) {
            html += '<div class="tk-block"><p class="tk-block-h">Focus timer</p><div class="ap-timer"><span class="ap-clock" id="apClock">' + clockText() + "</span>" +
                TIMER.map(function (m) { return '<button type="button" class="tk-btn" data-timer="' + m + '">' + m + "m</button>"; }).join("") +
                '<button type="button" class="tk-btn" data-timer="pause" id="apPause">' + (timer.paused ? "Resume" : "Pause") + "</button>" +
                '<button type="button" class="tk-btn" data-timer="reset" aria-label="Reset timer">&#8634;</button></div></div>';
        }
        box.innerHTML = html;
        box.scrollTop = keep;
    }

    function renderHead() {
        var h = $("#apHead"); if (!h) return;
        var title, kicker = "", sub = "";
        if (view === "section") {
            var g = groupOf(current);
            kicker = g ? gTitle(g) : (C.looseLabel || "");
            title = titleOf(current);
            sub = subOf(current);
        } else if (view === "library") { title = "Library"; sub = "Every resource, grouped by type"; }
        else if (view === "today" && !query) { title = "Today"; sub = "Reviews first, then new " + labels.items; }
        else { title = query ? "Search" : "Overview"; sub = query ? "" : (meta.overviewSub || ""); }
        h.innerHTML = '<div class="ap-head-text">' + (kicker ? '<p class="ap-kicker" style="--ap-c:' + color(current) + '">' + esc(kicker) + "</p>" : "") +
            '<h2 class="tk-head-title">' + esc(title) + "</h2>" + (sub ? '<p class="tk-head-sub">' + esc(sub) + "</p>" : "") + "</div>" +
            '<div class="tk-tools"><input type="search" class="ap-search" id="apSearch" placeholder="Search everything (press /)" aria-label="Search" value="' + esc(query) + '">' +
            (view === "overview" && !query ? '<button type="button" class="tk-btn" data-action="hide-done" aria-pressed="' + !!S.ui.hideDone + '">' + (S.ui.hideDone ? "Show finished" : "Hide finished") + "</button>" : "") + "</div>";
        $$("[data-tk-title]").forEach(function (el) { el.textContent = title; });
        document.title = (view === "section" ? titleOf(current) + " · " : "") + (meta.title || "") + (meta.mark ? " " + meta.mark : "") + " · Learn";
    }

    // ------------------------------------------------------------------ blocks
    function checkRow(it, b, resource) {
        var on = !!S.checks[it.id];
        var r = it.ref ? library[it.ref] || {} : {};
        var title = it.title || r.title || it.text || "";
        var href = it.href || r.href;
        var kind = it.kind || r.kind;
        var k = KINDS[kind] || null;
        var main = resource
            ? (k ? '<span class="ap-kind ' + k[1] + '">' + k[0] + "</span>" : "") +
              (href ? '<a class="ap-res" href="' + esc(href) + '" target="_blank" rel="noopener">' + esc(title) + "</a>" : '<span class="ap-res">' + esc(title) + "</span>") +
              ((it.acct || r.acct) ? '<span class="ap-tag">free acct</span>' : "") + (it.first ? '<span class="ap-tag ap-first">start here</span>' : "") +
              (r.by ? '<span class="ap-sub">' + esc(r.by) + "</span>" : "") + (it.note ? '<span class="ap-sub ap-note-text">' + esc(it.note) + "</span>" : "")
            : (it.tag ? '<span class="ap-tag">' + esc(it.tag) + "</span>" : "") + '<span class="ap-text">' + (it.html || esc(it.text)) + "</span>" +
              (it.sub ? '<span class="ap-sub">' + esc(it.sub) + "</span>" : "");
        var note = it.noteField ? '<input type="text" class="ap-inline-note" data-note="' + esc(it.noteField.id) + '" placeholder="' + esc(it.noteField.placeholder || "Notes") + '" value="' + esc(S.notes[it.noteField.id] || "") + '">' : "";
        return '<li class="ap-check' + (on ? " is-on" : "") + '" data-item="' + esc(it.id) + '"><label><input type="checkbox" data-check="' + esc(it.id) + '"' + (on ? " checked" : "") + ">" +
            '<span class="ap-check-body">' + main + "</span></label>" + note + "</li>";
    }
    function blockHtml(b) {
        var head = b.title ? '<h3 class="ap-block-h">' + esc(b.title) + (b.hint ? ' <span class="ap-hint">' + esc(b.hint) + "</span>" : "") + "</h3>" : "";
        switch (b.type) {
            case "text":
                return '<section class="ap-block">' + head + '<div class="ap-prose">' + b.html + "</div></section>";
            case "callout":
                return '<section class="ap-block ap-callout ap-' + esc(b.tone || "note") + '">' + head + '<div class="ap-prose">' + b.html + "</div></section>";
            case "cards":
                return '<section class="ap-block">' + head + '<div class="ap-cards">' + b.items.map(function (c) {
                    return '<div class="ap-card">' + (c.label ? '<p class="ap-card-label">' + esc(c.label) + "</p>" : "") + (c.title ? '<p class="ap-card-title">' + esc(c.title) + "</p>" : "") +
                        '<div class="ap-prose">' + (c.html || esc(c.body || "")) + "</div></div>";
                }).join("") + "</div></section>";
            case "checklist":
                return '<section class="ap-block">' + head + '<ul class="ap-checks">' + b.items.map(function (it) { return checkRow(it, b, false); }).join("") + "</ul></section>";
            case "resources":
                return '<section class="ap-block">' + head + '<ul class="ap-checks ap-resources">' + b.items.map(function (it) { return checkRow(it, b, true); }).join("") + "</ul></section>";
            case "note":
                return '<section class="ap-block">' + (head || '<h3 class="ap-block-h">' + esc(b.label || "Notes") + "</h3>") +
                    '<textarea class="ap-textarea" data-note="' + esc(b.id) + '" rows="' + (b.rows || 4) + '" placeholder="' + esc(b.placeholder || "") + '">' + esc(S.notes[b.id] || "") + "</textarea></section>";
            case "select":
                var val = S.values[b.id] || (b.options[0] || {}).value;
                return '<section class="ap-block ap-inline">' + '<label class="ap-select-label">' + esc(b.label || "") +
                    '<select data-value="' + esc(b.id) + '">' + b.options.map(function (o) { return '<option value="' + esc(o.value) + '"' + (o.value === val ? " selected" : "") + ">" + esc(o.label) + "</option>"; }).join("") +
                    "</select></label></section>";
            case "table":
                return '<section class="ap-block">' + head + '<div class="ap-table-wrap"><table class="ap-table"><thead><tr>' + b.head.map(function (h) { return "<th>" + esc(h) + "</th>"; }).join("") +
                    "</tr></thead><tbody>" + b.rows.map(function (r) { return "<tr>" + r.map(function (c) { return "<td>" + c + "</td>"; }).join("") + "</tr>"; }).join("") + "</tbody></table></div></section>";
            case "reference":
                return '<section class="ap-block ap-ref">' + '<div class="ap-ref-head"><h3 class="ap-block-h">' + esc(b.title) + "</h3>" + (b.tag ? '<span class="ap-tag">' + esc(b.tag) + "</span>" : "") + "</div>" +
                    b.entries.map(function (e) {
                        return '<div class="ap-ref-entry"><p class="ap-ref-name">' + esc(e.name) + "</p>" + (e.desc ? '<p class="ap-sub">' + esc(e.desc) + "</p>" : "") +
                            (e.code ? '<div class="ap-code"><button type="button" class="ap-copy" data-copy>Copy</button><pre><code>' + esc(e.code) + "</code></pre></div>" : "") + "</div>";
                    }).join("") + "</section>";
            case "list":
                return '<section class="ap-block">' + head + '<ul class="ap-list">' + b.items.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></section>";
            case "problems":
                return '<section class="ap-block">' + head + '<div class="ap-probs">' + b.items.map(function (it) { return probRow(it.id, { note: true }); }).join("") + "</div></section>";
            case "code":
                return '<section class="ap-block">' + head + '<div class="ap-code"><button type="button" class="ap-copy" data-copy>Copy</button><pre><code>' + esc(b.code) + "</code></pre></div></section>";
        }
        return "";
    }

    // ------------------------------------------------------------------ views
    function statsHtml() {
        var o = overall();
        var complete = ordered().filter(function (s) { return isDone(s.id); }).length;
        var withItems = ordered().filter(function (s) { return secProgress(s.id).total; }).length;
        var cells = [
            ["Done", o.done + ' <small>/ ' + o.total + "</small>", '<div class="tk-bar"><span style="width:' + pct(o.done, o.total) + '%"></span></div>'],
            [labels.sections + " complete", complete + ' <small>/ ' + withItems + "</small>", ""]
        ];
        if (PLAN) {
            var D = dated(), total = 0, doneH = 0;
            D.forEach(function (x) { var p = secProgress(x.s.id); total += +x.s.h || 0; doneH += p.total ? (+x.s.h || 0) * p.done / p.total : 0; });
            var hpw = Math.max(1, +S.settings.hpw || 10), start = new Date(S.settings.start + "T00:00:00");
            var expected = Math.min(total, Math.max(0, (today() - start) / (7 * 864e5) * hpw));
            var diff = Math.round((doneH - expected) / hpw * 7), pace = "Not started", cls = "";
            if (today() < start) pace = "Starts " + fmt(start);
            else if (Math.abs(diff) <= 2) { pace = "On track"; cls = "ok"; }
            else if (diff > 0) { pace = diff + " days ahead"; cls = "ok"; }
            else { pace = (-diff) + " days behind"; cls = "late"; }
            cells.push(["Study time left", Math.round(total - doneH) + ' h <small>of ' + Math.round(total) + "</small>", ""]);
            cells.push(["Planned finish", D.length ? fmtY(D[D.length - 1].to) : "&ndash;", ""]);
            cells.push(["Against the plan", '<span class="ap-' + cls + '">' + pace + "</span>", ""]);
        } else {
            var next = upNext();
            cells.push(["Up next", next ? '<a href="#' + esc(next.id) + '">' + esc(titleOf(next)) + " &rarr;</a>" : "All done", ""]);
        }
        return '<div class="ap-stats">' + cells.map(function (c) {
            return '<div class="ap-stat"><p class="ap-stat-label">' + esc(c[0]) + '</p><p class="ap-stat-value">' + c[1] + "</p>" + c[2] + "</div>";
        }).join("") + "</div>";
    }

    function rowHtml(s, rail) {
        var p = secProgress(s.id), g = groupOf(s), done = p.total && p.done === p.total;
        return '<a class="ap-row' + (done ? " is-done" : "") + (s === upNext() ? " is-next" : "") + '" href="#' + esc(s.id) + '" style="--ap-c:' + color(s) + '">' +
            (rail ? '<span class="ap-rail">' + rail + "</span>" : "") +
            '<span class="ap-row-main">' + (g && (rail || PLAN) ? '<span class="ap-row-group">' + esc(g.short || g.label) + "</span>" : "") +
            '<span class="ap-row-title">' + esc(titleOf(s)) + "</span>" +
            (subOf(s) ? '<span class="ap-row-sub">' + esc(subOf(s)) + "</span>" : "") + "</span>" +
            (p.total ? '<span class="ap-row-count">' + p.done + "/" + p.total + "</span>" : "") +
            (p.total ? '<span class="ap-row-bar"><span style="width:' + pct(p.done, p.total) + '%"></span></span>' : "") + "</a>";
    }

    function overviewHtml() {
        var html = statsHtml();
        if (PLAN) {
            html += '<section class="ap-block ap-plan-groups"><h3 class="ap-block-h">' + esc(PLAN.groupNoun ? PLAN.groupNoun + "s in the plan" : "In the plan") +
                ' <span class="ap-hint">Turn off any you aren\'t taking</span></h3>';
            var lastPhase = null;
            groups.forEach(function (g) {
                if (g.phase !== lastPhase) { html += (lastPhase !== null ? "</div>" : "") + '<div class="ap-chip-row"><span class="ap-chip-label">' + esc((PHASE[g.phase] || {}).label || g.phase || "") + "</span>"; lastPhase = g.phase; }
                var on = S.settings.off.indexOf(g.id) === -1;
                html += '<button type="button" class="ap-chip" data-plan-group="' + esc(g.id) + '" aria-pressed="' + on + '" title="' + esc(gTitle(g)) + '" style="--ap-c:' + COLORS[g.color || (PHASE[g.phase] || {}).color] + '">' +
                    '<span class="ap-dot"></span>' + esc(g.short || g.label) + (g.sub ? '<span class="ap-chip-name">' + esc(g.sub) + "</span>" : "") + "</button>";
            });
            html += (lastPhase !== null ? "</div>" : "") + "</section>";

            var month = "", next = upNext();
            dated().forEach(function (x) {
                if (S.ui.hideDone && isDone(x.s.id)) return;
                var m = x.from.toLocaleDateString(undefined, { month: "long", year: "numeric" });
                if (m !== month) { html += '<h3 class="ap-month">' + esc(m) + "</h3>"; month = m; }
                var rail = "<b>" + fmt(x.from) + (iso(x.to) !== iso(x.from) ? " – " + fmt(x.to) : "") + "</b>" + (x.s.h ? x.s.h + " h" : "") + (x.s === next ? ' · <em>up next</em>' : "");
                html += rowHtml(x.s, rail);
            });
        } else {
            groups.forEach(function (g) {
                var list = sections.filter(function (s) { return s.group === g.id && !(S.ui.hideDone && isDone(s.id)); });
                if (!list.length) return;
                var gp = groupProgress(g.id);
                html += '<section class="ap-group-block" style="--ap-c:' + COLORS[g.color || (PHASE[g.phase] || {}).color] + '"><div class="ap-group-head"><h3>' + esc(gTitle(g)) + "</h3>" +
                    '<span class="ap-row-count">' + gp.done + "/" + gp.total + "</span></div>" + (g.intro ? '<p class="ap-group-intro">' + esc(g.intro) + "</p>" : "") +
                    list.map(function (s) { return rowHtml(s); }).join("") + "</section>";
            });
            var loose = sections.filter(function (s) { return !s.group; });
            if (loose.length) html += '<section class="ap-group-block"><div class="ap-group-head"><h3>' + esc(C.looseLabel || "More") + "</h3></div>" + loose.map(function (s) { return rowHtml(s); }).join("") + "</section>";
        }
        if (meta.note) html += '<p class="ap-footnote">' + esc(meta.note) + "</p>";
        return html;
    }

    function sectionHtml(s) {
        var p = secProgress(s.id), g = groupOf(s), html = "";
        var info = [];
        if (PLAN) { var x = dated().filter(function (d) { return d.s === s; })[0]; if (x) info.push(fmt(x.from) + (iso(x.to) !== iso(x.from) ? " – " + fmt(x.to) : "")); }
        if (s.h) info.push(s.h + " h");
        if (p.total) info.push(p.done + " of " + p.total + " " + labels.items + " done");
        var tickable = counted(s.id).some(function (i) { return !i.review; });
        html += '<div class="ap-sec-bar" style="--ap-c:' + color(s) + '"><span class="ap-sec-info">' + esc(info.join(" · ")) + "</span>" +
            (tickable ? '<button type="button" class="tk-btn" data-mark-all="' + esc(s.id) + '">' + (p.done === p.total ? "Untick all" : "Tick all") + "</button>" : "") + "</div>";
        if (g && g.intro && sections.filter(function (x) { return x.group === g.id; })[0] === s) html += '<p class="ap-group-intro">' + esc(g.intro) + "</p>";
        html += (s.blocks || []).map(blockHtml).join("");
        var seq = ordered(), i = seq.indexOf(s);
        var prev = i > 0 ? seq[i - 1] : null, nxt = i >= 0 && i < seq.length - 1 ? seq[i + 1] : null;
        html += '<nav class="ap-pager" aria-label="Previous and next">' +
            (prev ? '<a href="#' + esc(prev.id) + '"><small>&larr; Previous</small>' + esc(titleOf(prev)) + "</a>" : "<span></span>") +
            (nxt ? '<a href="#' + esc(nxt.id) + '" class="ap-pager-next"><small>Next &rarr;</small>' + esc(titleOf(nxt)) + "</a>" : "<span></span>") + "</nav>";
        return html;
    }

    function libraryHtml() {
        var seen = {}, uses = {};
        sections.forEach(function (s) {
            (s.blocks || []).forEach(function (b) {
                if (b.type !== "resources") return;
                b.items.forEach(function (it) {
                    var r = it.ref ? library[it.ref] || {} : it;
                    var key = it.ref || r.href || r.title;
                    if (!key) return;
                    if (!seen[key]) seen[key] = { title: it.title || r.title, href: it.href || r.href, kind: it.kind || r.kind || "link", by: r.by, acct: it.acct || r.acct };
                    var g = groupOf(s); var tag = g ? (g.short || g.label) : titleOf(s);
                    (uses[key] = uses[key] || {})[tag] = 1;
                });
            });
        });
        var html = "";
        KIND_ORDER.forEach(function (k) {
            var keys = Object.keys(seen).filter(function (x) { return seen[x].kind === k[0]; }).sort(function (a, b) { return String(seen[a].title).localeCompare(seen[b].title); });
            if (!keys.length) return;
            html += '<section class="ap-block"><h3 class="ap-block-h">' + esc(k[1]) + ' <span class="ap-hint">' + keys.length + '</span></h3><ul class="ap-lib">' + keys.map(function (x) {
                var r = seen[x];
                return "<li>" + (r.href ? '<a class="ap-res" href="' + esc(r.href) + '" target="_blank" rel="noopener">' + esc(r.title) + "</a>" : '<span class="ap-res">' + esc(r.title) + "</span>") +
                    (r.acct ? '<span class="ap-tag">free acct</span>' : "") + (r.by ? '<span class="ap-sub">' + esc(r.by) + "</span>" : "") +
                    '<span class="ap-uses">' + esc(Object.keys(uses[x]).join(", ")) + "</span></li>";
            }).join("") + "</ul></section>";
        });
        return html || '<p class="ap-muted">No resources in this tracker.</p>';
    }

    function searchHtml(q) {
        var needle = q.toLowerCase(), bySec = {}, count = 0;
        sections.forEach(function (s) {
            var secHit = (titleOf(s) + " " + (s.sub || "") + " " + s.label).toLowerCase().indexOf(needle) !== -1;
            (s.blocks || []).forEach(function (b) {
                if (b.type !== "checklist" && b.type !== "resources" && b.type !== "problems") return;
                b.items.forEach(function (it) {
                    var r = it.ref ? library[it.ref] || {} : {};
                    var hay = [it.text, it.title, it.sub, it.note, it.tag, it.num, r.title, r.by, S.notes[it.id]].join(" ").toLowerCase();
                    if (secHit || hay.indexOf(needle) !== -1) { (bySec[s.id] = bySec[s.id] || { b: [], res: [], pr: [] })[b.type === "resources" ? "res" : b.type === "problems" ? "pr" : "b"].push(it); count++; }
                });
            });
            if (secHit && !bySec[s.id]) bySec[s.id] = { b: [], res: [], pr: [] };
        });
        var ids = Object.keys(bySec);
        if (!ids.length) return '<p class="ap-muted">Nothing matches &ldquo;' + esc(q) + "&rdquo;.</p>";
        var html = '<p class="ap-muted">' + count + " " + (count === 1 ? labels.item : labels.items) + " in " + ids.length + " " + labels.sections.toLowerCase() + "</p>";
        ids.slice(0, 120).forEach(function (id) {
            var s = SECTION[id], hit = bySec[id];
            html += '<section class="ap-block ap-hit" style="--ap-c:' + color(s) + '"><h3 class="ap-block-h"><a href="#' + esc(id) + '">' + esc(((groupOf(s) || {}).short ? groupOf(s).short + " · " : "") + titleOf(s)) + " &rarr;</a></h3>" +
                (hit.b.length ? '<ul class="ap-checks">' + hit.b.map(function (it) { return checkRow(it, null, false); }).join("") + "</ul>" : "") +
                (hit.res.length ? '<ul class="ap-checks ap-resources">' + hit.res.map(function (it) { return checkRow(it, null, true); }).join("") + "</ul>" : "") +
                (hit.pr.length ? '<div class="ap-probs">' + hit.pr.map(function (it) { return probRow(it.id); }).join("") + "</div>" : "") + "</section>";
        });
        return html;
    }

    function renderMain() {
        var m = $("#ap-main"); if (!m) return;
        if (query) m.innerHTML = searchHtml(query);
        else if (view === "section") m.innerHTML = sectionHtml(current);
        else if (view === "library") m.innerHTML = libraryHtml();
        else if (view === "today") m.innerHTML = todayHtml();
        else m.innerHTML = overviewHtml();
    }
    function renderAll() {
        renderSide(); renderHead(); renderMain();
        if (REVIEW) renderAttempt();
        if (window.TK) { TK.applyTheme(); TK.setActive(view === "section" ? current.id : view); }
    }
    // After a tick: refresh counts without rebuilding the page the reader is working in.
    function refreshAfterChange() {
        renderSide();
        if ((view === "overview" || view === "today") && !query) { renderMain(); return; }
        if (view === "section") {
            var p = secProgress(current.id), bar = $(".ap-sec-info"), btn = $("[data-mark-all]");
            var info = bar ? bar.textContent.replace(/\d+ of \d+ \S+ done$/, p.done + " of " + p.total + " " + labels.items + " done") : "";
            if (bar) bar.textContent = info;
            if (btn) btn.textContent = p.done === p.total ? "Untick all" : "Tick all";
        }
    }


    // ------------------------------------------------------------------ spaced reviews (modes.review)
    // SM-2-style: again = saw the solution, hard = needed hints, good = solved solo, easy = solo and easy.
    var GRADES = { again: "Saw solution", hard: "Needed hints", good: "Solved solo", easy: "Easy" };
    var STATUS = { "new": "New", learning: "Learning", solved: "Solved", mastered: "Mastered" };
    function ymdAdd(days) { return iso(addDays(today(), days)); }
    function dayGap(a, b) { return Math.round((new Date(b + "T00:00:00") - new Date(a + "T00:00:00")) / 864e5); }
    function fmtD(s) { return fmt(new Date(s + "T00:00:00")); }
    function rv(id) { return S.reviews[id] || (S.reviews[id] = { attempts: [], reps: 0, interval: 0, ease: 2.5, due: null, everSolved: false }); }
    function scheduleReview(r, g) {
        if (g === "again") { r.reps = 0; r.interval = 1; r.ease = Math.max(1.3, r.ease - 0.2); }
        else if (g === "hard") { r.interval = r.reps === 0 ? 1 : Math.max(1, Math.round(r.interval * 1.2)); r.ease = Math.max(1.3, r.ease - 0.15); }
        else {
            r.reps += 1;
            if (r.reps === 1) r.interval = g === "easy" ? 3 : 1;
            else if (r.reps === 2) r.interval = g === "easy" ? 7 : 3;
            else r.interval = Math.round(r.interval * r.ease * (g === "easy" ? 1.3 : 1));
            if (g === "easy") r.ease = Math.min(3.0, r.ease + 0.15);
            r.everSolved = true;
        }
        r.interval = Math.min(r.interval, 120);
        r.due = ymdAdd(r.interval);
    }
    function statusOf(id) {
        var r = S.reviews[id];
        if (!r || !r.attempts.length) return "new";
        if (r.reps >= 3 && r.interval >= 14) return "mastered";
        var last = r.attempts[r.attempts.length - 1].g;
        return last === "good" || last === "easy" ? "solved" : "learning";
    }
    function isDue(id) { var r = S.reviews[id]; return !!(r && r.due && r.due <= iso(today())); }
    function dueList() {
        return REVIEW_ITEMS.filter(function (i) { return isDue(i.id); })
            .sort(function (a, b) { return S.reviews[a.id].due.localeCompare(S.reviews[b.id].due) || ITEMS.indexOf(a) - ITEMS.indexOf(b); });
    }
    function newToday() {
        var t = iso(today());
        var started = REVIEW_ITEMS.filter(function (i) { var r = S.reviews[i.id]; return r && r.attempts.length && r.attempts[0].d === t; });
        var left = Math.max(0, (+S.settings.dailyNew || 4) - started.length);
        var fresh = REVIEW_ITEMS.filter(function (i) { return statusOf(i.id) === "new"; }).slice(0, left);
        return { started: started, fresh: fresh };
    }
    function todayCount() { if (!REVIEW) return 0; return dueList().length + newToday().fresh.length; }
    function solvedCount() { return REVIEW_ITEMS.filter(function (i) { return S.reviews[i.id] && S.reviews[i.id].everSolved; }).length; }
    function streak() {
        var days = {};
        Object.keys(S.reviews).forEach(function (k) { (S.reviews[k].attempts || []).forEach(function (a) { days[a.d] = 1; }); });
        var n = 0, d = 0;
        if (!days[ymdAdd(0)]) d = -1;
        while (days[ymdAdd(d)]) { n++; d--; }
        return n;
    }
    function planWeek() {
        if (!S.settings.startDate) return 0;
        return Math.min(REVIEW.weeks || 8, Math.max(1, Math.floor(dayGap(S.settings.startDate, iso(today())) / 7) + 1));
    }
    function weakest() {
        return sections.map(function (sec) {
            var tot = 0, bad = 0;
            (BY_SECTION[sec.id] || []).forEach(function (i) { var r = S.reviews[i.id]; if (r) r.attempts.forEach(function (a) { tot++; if (a.g === "again" || a.g === "hard") bad++; }); });
            return { s: sec, tot: tot, rate: tot ? bad / tot : 0 };
        }).filter(function (x) { return x.tot >= 2 && x.rate > 0; }).sort(function (a, b) { return b.rate - a.rate; }).slice(0, 3);
    }

    function probRow(id, opt) {
        opt = opt || {};
        var i = ITEM[id], it = i.src, r = S.reviews[id], st = statusOf(id), due = isDue(id);
        var target = (REVIEW.targetMinutes || {})[it.diff];
        var meta = [];
        if (opt.section) meta.push(esc(SECTION[i.section].label));
        if (r && r.attempts.length) { var last = r.attempts[r.attempts.length - 1]; meta.push("last: " + GRADES[last.g].toLowerCase() + " · " + fmtD(last.d)); }
        var best = r ? r.attempts.filter(function (a) { return a.g === "good" || a.g === "easy"; }).reduce(function (m, a) { return Math.min(m, a.m); }, Infinity) : Infinity;
        if (best !== Infinity) meta.push("best " + best + "m" + (target ? " / " + target + "m" : ""));
        if (r && r.due) meta.push(due ? "review today" : "next review " + fmtD(r.due));
        var active = S.active && S.active.id === id;
        return '<div class="ap-prob' + (active ? " is-active" : "") + (st !== "new" && !due ? " is-" + st : "") + '">' +
            '<span class="ap-prob-num">' + (it.num != null ? "#" + esc(it.num) : "") + "</span>" +
            '<span class="ap-prob-main"><a class="ap-res" href="' + esc(it.href) + '" target="_blank" rel="noopener">' + esc(it.title) + "</a>" +
            (meta.length ? '<span class="ap-sub">' + meta.join(" · ") + "</span>" : "") +
            (opt.note ? '<input type="text" class="ap-inline-note ap-prob-note" data-note="' + esc(id) + '" placeholder="Key insight in one line…" value="' + esc(S.notes[id] || "") + '" aria-label="Note">' : "") + "</span>" +
            '<span class="ap-prob-chips">' + (it.diff ? '<span class="ap-diff d-' + esc(it.diff) + '"' + (target ? ' title="Target ' + target + ' min"' : "") + ">" + esc((REVIEW.difficulty || {})[it.diff] || it.diff) + "</span>" : "") +
            '<span class="ap-status s-' + (due ? "due" : st) + '">' + (due ? "Review due" : STATUS[st]) + "</span></span>" +
            '<button type="button" class="tk-btn' + (active ? "" : " ap-primary") + '" data-start="' + esc(id) + '"' + (active ? " disabled" : "") + ">" +
            (active ? "In progress" : r && r.attempts.length ? "Re-solve" : "Start") + "</button></div>";
    }

    function todayHtml() {
        var due = dueList(), nt = newToday(), solved = solvedCount();
        var mastered = REVIEW_ITEMS.filter(function (i) { return statusOf(i.id) === "mastered"; }).length;
        var wk = planWeek(), weeks = REVIEW.weeks || groups.length, st = streak();
        var mockCfg = REVIEW.mock || { count: 3, minutes: 75, day: 6 };
        var mock = S.mock && S.mock.date === iso(today()) ? S.mock : null;
        var wkGroup = wk ? groups[wk - 1] : null;
        var html = '<div class="ap-stats">' +
            '<div class="ap-stat"><p class="ap-stat-label">Solved solo</p><p class="ap-stat-value">' + solved + " <small>/ " + REVIEW_ITEMS.length + '</small></p><div class="tk-bar"><span style="width:' + pct(solved, REVIEW_ITEMS.length) + '%"></span></div></div>' +
            '<div class="ap-stat"><p class="ap-stat-label">Mastered</p><p class="ap-stat-value">' + mastered + '</p><p class="ap-sub">3+ solo reviews, 2-week gap</p></div>' +
            '<div class="ap-stat"><p class="ap-stat-label">Reviews due</p><p class="ap-stat-value' + (due.length ? " ap-late" : "") + '">' + due.length + "</p></div>" +
            '<div class="ap-stat"><p class="ap-stat-label">Streak</p><p class="ap-stat-value">' + st + " <small>day" + (st === 1 ? "" : "s") + "</small></p></div>" +
            '<div class="ap-stat"><p class="ap-stat-label">Plan week</p><p class="ap-stat-value">' + (wk || "&ndash;") + " <small>/ " + weeks + '</small></p><p class="ap-sub">' + (wkGroup ? esc(wkGroup.sub || wkGroup.label) : "Starts with your first attempt") + "</p></div></div>";
        html += '<div class="ap-today">';
        html += '<div><section class="ap-block"><h3 class="ap-block-h">1. Reviews due <span class="ap-hint">re-solve from a blank editor before anything new</span></h3>' +
            (due.length ? '<div class="ap-probs">' + due.map(function (i) { return probRow(i.id, { section: true }); }).join("") + "</div>"
                        : '<p class="ap-empty">Nothing due. Reviews appear 1, 3, then 7+ days after each solve, spaced further apart as you keep getting them right.</p>') + "</section>";
        html += '<section class="ap-block"><h3 class="ap-block-h">2. New ' + esc(labels.items) + ' <span class="ap-hint">' + nt.started.length + " started today · daily target " + S.settings.dailyNew + " (change under Your pace)</span></h3>";
        var list = nt.started.concat(nt.fresh);
        html += list.length ? '<div class="ap-probs">' + list.map(function (i) { return probRow(i.id, { section: true }); }).join("") + "</div>"
            : '<p class="ap-empty">' + (REVIEW_ITEMS.every(function (i) { return statusOf(i.id) !== "new"; }) ? "Everything has been attempted. Keep clearing reviews and run mocks." : "Today's allowance of new " + esc(labels.items) + " is used. Clear reviews or run a mock.") + "</p>";
        html += "</section></div><div>";
        var isMockDay = new Date().getDay() === mockCfg.day;
        html += '<section class="ap-block ap-panel"><h3 class="ap-block-h">3. Interleaved mock <span class="ap-hint">' + (isMockDay ? "today is mock day" : "best on Saturdays") + "</span></h3>" +
            '<p class="ap-prose">' + mockCfg.count + " " + esc(labels.items) + " you have already solved, from <strong>different " + esc(labels.sections.toLowerCase()) + "</strong>, back to back in about " + mockCfg.minutes +
            " minutes. Mixing them trains you to recognise which one applies, which is the part interviews actually test.</p>" +
            (mock ? '<div class="ap-probs">' + mock.ids.filter(function (id) { return ITEM[id]; }).map(function (id) { return probRow(id, { section: true }); }).join("") + "</div>" : "") +
            '<p><button type="button" class="tk-btn' + (mock ? "" : " ap-primary") + '" data-action="mock"' + (solved < mockCfg.count ? " disabled" : "") + ">" + (mock ? "Draw a new set" : "Draw " + mockCfg.count + " mixed " + esc(labels.items)) + "</button>" +
            (solved < mockCfg.count ? ' <span class="ap-hint">unlocks after ' + mockCfg.count + " solo solves</span>" : "") + "</p></section>";
        var weak = weakest();
        html += '<section class="ap-block ap-panel"><h3 class="ap-block-h">Weakest ' + esc(labels.sections.toLowerCase()) + ' <span class="ap-hint">share of attempts needing hints or the solution</span></h3>' +
            (weak.length ? weak.map(function (w) {
                return '<a class="ap-row" href="#' + esc(w.s.id) + '" style="--ap-c:' + color(w.s) + '"><span class="ap-row-main"><span class="ap-row-title">' + esc(titleOf(w.s)) + '</span><span class="ap-row-sub">' +
                    Math.round(w.rate * 100) + "% of " + w.tot + ' attempts</span></span><span class="ap-row-count">Practise &rarr;</span></a>';
            }).join("") : '<p class="ap-empty">Shows up once you have a few graded attempts.</p>') + "</section></div></div>";
        return html;
    }

    var attemptClock = null;
    function renderAttempt() {
        var bar = $("#apAttempt"); if (!bar) return;
        clearInterval(attemptClock);
        if (!S.active || !ITEM[S.active.id]) { bar.hidden = true; document.body.classList.remove("ap-attempting"); return; }
        var it = ITEM[S.active.id].src, r = S.reviews[S.active.id], target = (REVIEW.targetMinutes || {})[it.diff] || 0;
        bar.hidden = false; document.body.classList.add("ap-attempting");
        bar.innerHTML = '<div class="ap-attempt-inner"><div class="ap-attempt-info"><p class="ap-attempt-label">' + (r && r.attempts.length ? "Re-solving from a blank editor" : "Solving from scratch") + "</p>" +
            '<p class="ap-attempt-title">' + (it.num != null ? "#" + esc(it.num) + " " : "") + esc(it.title) + "</p></div>" +
            '<p class="ap-attempt-clock" id="apAttemptClock"></p><div class="ap-grades" role="group" aria-label="Grade this attempt">' +
            '<button type="button" data-grade="again" title="You needed to read the solution">Saw solution</button>' +
            '<button type="button" data-grade="hard" title="You solved it with hints or a nudge">Needed hints</button>' +
            '<button type="button" data-grade="good" class="ap-good" title="You wrote a working solution yourself">Solved solo</button>' +
            '<button type="button" data-grade="easy" title="Solo, within the target time, felt easy">Easy</button>' +
            '<button type="button" data-grade="cancel" title="Discard this attempt">Cancel</button></div>' +
            '<p class="ap-attempt-hint">Grade honestly: "Solved solo" means a working solution with no hints. The grade sets when this comes back for review.</p></div>';
        var tick = function () {
            if (!S.active) return;
            var sec = Math.floor((Date.now() - S.active.start) / 1000), c = $("#apAttemptClock");
            if (c) { c.innerHTML = String(Math.floor(sec / 60)).padStart(2, "0") + ":" + String(sec % 60).padStart(2, "0") + (target ? " <small>/ " + target + ":00</small>" : ""); c.classList.toggle("over", target && sec > target * 60); }
        };
        tick(); attemptClock = setInterval(tick, 1000);
    }
    function startAttempt(id) {
        if (S.active && S.active.id !== id) { toast("Finish or cancel the current attempt first"); return; }
        S.active = { id: id, start: Date.now() };
        if (!S.settings.startDate) S.settings.startDate = iso(today());
        save(true); renderAll();
        window.open(ITEM[id].src.href, "_blank", "noopener");
    }
    function finishAttempt(g) {
        if (!S.active) return;
        var id = S.active.id, start = S.active.start;
        S.active = null;
        if (g !== "cancel") {
            var mins = Math.max(1, Math.round((Date.now() - start) / 60000)), r = rv(id);
            r.attempts.push({ d: iso(today()), g: g, m: mins });
            scheduleReview(r, g);
            toast(ITEM[id].src.title + ": " + GRADES[g].toLowerCase() + " in " + mins + "m · next review " + fmtD(r.due));
        }
        save(true); renderAll();
    }
    function drawMock() {
        var cfg = REVIEW.mock || { count: 3 };
        var pool = REVIEW_ITEMS.filter(function (i) { return S.reviews[i.id] && S.reviews[i.id].everSolved; }).sort(function () { return Math.random() - 0.5; });
        var picked = [], used = {};
        pool.forEach(function (i) { if (picked.length < cfg.count && !used[i.section]) { picked.push(i); used[i.section] = 1; } });
        pool.forEach(function (i) { if (picked.length < cfg.count && picked.indexOf(i) === -1) picked.push(i); });
        S.mock = { date: iso(today()), ids: picked.map(function (i) { return i.id; }) };
        save(true); renderAll();
    }

    // ------------------------------------------------------------------ timer
    var timer = { left: 0, total: 0, id: null, paused: false };
    function clockText() { var s = Math.max(0, timer.left); return String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0"); }
    function tick() {
        timer.left--;
        var c = $("#apClock"); if (c) c.textContent = clockText();
        if (timer.left <= 0) { clearInterval(timer.id); timer.id = null; toast("Block finished. Take a break."); }
    }
    function timerAction(a) {
        if (a === "reset") { clearInterval(timer.id); timer = { left: 0, total: 0, id: null, paused: false }; }
        else if (a === "pause") {
            if (!timer.left) return;
            if (timer.id) { clearInterval(timer.id); timer.id = null; timer.paused = true; }
            else { timer.paused = false; timer.id = setInterval(tick, 1000); }
        } else {
            clearInterval(timer.id); timer.left = timer.total = (+a) * 60; timer.paused = false; timer.id = setInterval(tick, 1000);
        }
        var c = $("#apClock"); if (c) c.textContent = clockText();
        var p = $("#apPause"); if (p) p.textContent = timer.paused ? "Resume" : "Pause";
    }

    // ------------------------------------------------------------------ data tools
    var toastT;
    function toast(msg) { var t = $("#apToast"); if (!t) return; t.textContent = msg; t.classList.add("show"); clearTimeout(toastT); toastT = setTimeout(function () { t.classList.remove("show"); }, 2600); }
    function download(name, text, type) {
        var a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([text], { type: type })); a.download = name; a.click();
        setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
    }
    var resetArmed = null;
    function action(a, btn) {
        var menu = btn.closest("details"); if (menu && a !== "reset") menu.open = false;
        if (a === "mock") return drawMock();
        if (a === "hide-done") { S.ui.hideDone = !S.ui.hideDone; save(); renderHead(); renderMain(); return; }
        if (a === "csv") {
            var rows = [["Group", "Section", "Item", "Done", "Counts"]];
            ITEMS.forEach(function (i) { var s = SECTION[i.section]; rows.push([gTitle(groupOf(s)), titleOf(s), i.text, itemDone(i) ? "yes" : "no", i.counts ? "yes" : "no"]); });
            download(C.id + "-progress.csv", rows.map(function (r) { return r.map(function (c) { return '"' + String(c).replace(/"/g, '""') + '"'; }).join(","); }).join("\n"), "text/csv");
            return toast("Downloaded CSV");
        }
        if (a === "backup") {
            download(C.id + "-backup.json", JSON.stringify({ app: "learn", tracker: C.id, exported: new Date().toISOString(), checks: S.checks, notes: S.notes, values: S.values, reviews: S.reviews, mock: S.mock, settings: S.settings }, null, 2), "application/json");
            return toast("Backup downloaded");
        }
        if (a === "restore") return $("#apRestore").click();
        if (a === "reset") {
            if (!resetArmed) { btn.textContent = "Click again to erase everything"; resetArmed = setTimeout(function () { resetArmed = null; btn.textContent = "Reset all progress"; }, 3500); return; }
            clearTimeout(resetArmed); resetArmed = null; S = fresh(); save(true); menu.open = false; renderAll(); toast("Progress reset");
        }
    }

    // ------------------------------------------------------------------ events
    document.addEventListener("change", function (e) {
        var t = e.target;
        if (t.dataset.check) {
            if (t.checked) S.checks[t.dataset.check] = 1; else delete S.checks[t.dataset.check];
            $$('[data-check="' + t.dataset.check + '"]').forEach(function (x) { x.checked = t.checked; var li = x.closest(".ap-check"); if (li) li.classList.toggle("is-on", t.checked); });
            save(); refreshAfterChange(); return;
        }
        if (t.dataset.value) { S.values[t.dataset.value] = t.value; save(); toast("Saved"); return; }
        if (t.dataset.setting) {
            var k = t.dataset.setting, v = t.value;
            if (k === "hpw") v = Math.max(1, Math.min(80, Math.round(+v || 10)));
            if (k === "dailyNew") v = Math.max(1, Math.min(12, +v || 4));
            if (k === "start" && !v) return;
            S.settings[k] = v; save(); renderAll(); return;
        }
        if (t.id === "apRestore") {
            var f = t.files[0]; t.value = ""; if (!f) return;
            f.text().then(function (txt) {
                var data = JSON.parse(txt);
                if (!data || typeof data !== "object") throw new Error("bad");
                S = adopt(data); save(true); renderAll(); toast("Progress restored");
            }).catch(function () { toast("That file isn't a backup for this tracker"); });
        }
    });
    document.addEventListener("input", function (e) {
        var t = e.target;
        if (t.dataset.note) { S.notes[t.dataset.note] = t.value; save(); return; }
        if (t.id === "apSearch") {
            clearTimeout(t._q);
            t._q = setTimeout(function () {
                query = t.value.trim();
                renderMain();
                var h = $(".tk-head-title"); if (h) h.textContent = query ? "Search" : (view === "section" ? titleOf(current) : view === "library" ? "Library" : view === "today" ? "Today" : "Overview");
            }, 160);
        }
        if (t.dataset.setting === "hpw" && t.type === "range") { var n = $('input[type=number][data-setting="hpw"]'); if (n) n.value = t.value; }
    });
    document.addEventListener("click", function (e) {
        var t = e.target.closest("button, a"); if (!t) return;
        if (t.dataset.groupToggle) { var id = t.dataset.groupToggle; S.ui.open[id] = !S.ui.open[id]; save(); renderSide(); return; }
        if (t.dataset.planGroup) {
            var off = S.settings.off, g = t.dataset.planGroup, i = off.indexOf(g);
            if (i === -1) off.push(g); else off.splice(i, 1);
            save(); renderAll(); return;
        }
        if (t.dataset.markAll) {
            var list = counted(t.dataset.markAll).filter(function (x) { return !x.review; }), all = list.every(function (x) { return S.checks[x.id]; });
            list.forEach(function (x) { if (all) delete S.checks[x.id]; else S.checks[x.id] = 1; });
            save(); renderAll(); return;
        }
        if (t.dataset.timer) return timerAction(t.dataset.timer);
        if (t.dataset.start) return startAttempt(t.dataset.start);
        if (t.dataset.grade) return finishAttempt(t.dataset.grade);
        if (t.dataset.action) return action(t.dataset.action, t);
        if (t.hasAttribute("data-copy")) {
            var code = t.parentNode.querySelector("code").textContent;
            (navigator.clipboard ? navigator.clipboard.writeText(code) : Promise.reject()).then(function () { toast("Copied"); }, function () { toast("Copy failed; select the text instead"); });
            return;
        }
        // Clicking a link to the current hash should still clear search and re-render.
        if (t.tagName === "A" && t.getAttribute("href") && t.getAttribute("href").charAt(0) === "#" && query) {
            query = ""; var sbox = $("#apSearch"); if (sbox) sbox.value = "";
        }
    });
    document.addEventListener("keydown", function (e) {
        var typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName);
        if (e.key === "/" && !typing) { e.preventDefault(); var s = $("#apSearch"); if (s) s.focus(); }
        if (e.key === "Escape" && document.activeElement.id === "apSearch" && query) { query = ""; document.activeElement.value = ""; renderAll(); }
    });
    window.addEventListener("hashchange", function () { query = ""; route(); });

    // ------------------------------------------------------------------ boot
    renderShell();
    var first = (location.hash || "").slice(1);
    if (!first && C.start) history.replaceState(null, "", "#" + C.start);
    route();
})();
