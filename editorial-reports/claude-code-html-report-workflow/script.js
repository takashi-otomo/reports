/* =========================================================
   編集会議レポート テンプレート — script.js
   ========================================================= */
(function () {
  "use strict";

  /* ---------- 1. Table of contents: scroll spy ---------- */
  function initToc() {
    var links = document.querySelectorAll(".toc a[href^='#']");
    if (!links.length) return;
    var map = {};
    links.forEach(function (a) {
      var id = a.getAttribute("href").slice(1);
      var el = document.getElementById(id);
      if (el) map[id] = { link: a, el: el };
    });
    var ids = Object.keys(map);
    function onScroll() {
      var y = window.scrollY + 80;
      var current = ids[0];
      ids.forEach(function (id) {
        if (map[id].el.offsetTop <= y) current = id;
      });
      ids.forEach(function (id) {
        map[id].link.classList.toggle("active", id === current);
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- 1b. Mobile ToC: close menu after navigating ---------- */
  function initTocMenu() {
    var nav = document.querySelector("nav.toc");
    if (!nav) return;
    var timer = null;
    nav.querySelectorAll("a[href^='#']").forEach(function (a) {
      a.addEventListener("click", function () {
        // 折りたたみメニューを強制的に閉じる（sticky-hover / :focus-within 対策）
        nav.classList.add("is-closing");
        if (typeof a.blur === "function") a.blur();
        if (document.activeElement && document.activeElement.blur) {
          document.activeElement.blur();
        }
        clearTimeout(timer);
        timer = setTimeout(function () {
          nav.classList.remove("is-closing");
        }, 800);
      });
    });
    // 再びメニューに触れたら即座に開ける状態へ戻す
    nav.addEventListener("pointerenter", function () {
      clearTimeout(timer);
      nav.classList.remove("is-closing");
    });
  }

  /* ---------- 2. Copy buttons (slug, command) ---------- */
  function initCopy() {
    document.querySelectorAll("[data-copy]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var text = btn.getAttribute("data-copy");
        try {
          navigator.clipboard.writeText(text);
        } catch (e) {
          // fallback
          var ta = document.createElement("textarea");
          ta.value = text;
          document.body.appendChild(ta);
          ta.select();
          try { document.execCommand("copy"); } catch (_) {}
          document.body.removeChild(ta);
        }
        var orig = btn.textContent;
        btn.textContent = "コピー済";
        btn.disabled = true;
        setTimeout(function () {
          btn.textContent = orig;
          btn.disabled = false;
        }, 1400);
      });
    });
  }

  /* ---------- 3. Line chart (GA daily traffic) ---------- */
  /* Reads JSON from script[data-chart]; renders SVG. */
  function renderLineCharts() {
    document.querySelectorAll("[data-chart='line']").forEach(function (host) {
      var raw = host.querySelector("script[type='application/json']");
      if (!raw) return;
      var data;
      try { data = JSON.parse(raw.textContent); } catch (e) { return; }
      var values = data.values || [];
      var labels = data.labels || [];
      var annotations = data.annotations || [];
      if (!values.length) return;

      var W = 600, H = 180, pad = { l: 36, r: 12, t: 16, b: 22 };
      var iw = W - pad.l - pad.r, ih = H - pad.t - pad.b;
      var max = Math.max.apply(null, values) * 1.1;
      var min = 0;
      var xs = function (i) { return pad.l + (iw * i) / (values.length - 1); };
      var ys = function (v) { return pad.t + ih - (ih * (v - min)) / (max - min); };

      var path = "";
      values.forEach(function (v, i) {
        path += (i === 0 ? "M" : "L") + xs(i).toFixed(1) + "," + ys(v).toFixed(1);
      });
      var area = path + " L" + xs(values.length - 1).toFixed(1) + "," + (pad.t + ih) + " L" + xs(0).toFixed(1) + "," + (pad.t + ih) + " Z";

      var grid = "";
      for (var g = 0; g <= 3; g++) {
        var y = pad.t + (ih * g) / 3;
        grid += "<line class='grid-line' x1='" + pad.l + "' x2='" + (W - pad.r) + "' y1='" + y + "' y2='" + y + "'/>";
        var v = max - (max * g) / 3;
        grid += "<text class='tick' x='" + (pad.l - 6) + "' y='" + (y + 3) + "' text-anchor='end'>" + Math.round(v) + "</text>";
      }

      var xticks = "";
      var tickStep = Math.max(1, Math.floor(labels.length / 6));
      labels.forEach(function (l, i) {
        if (i % tickStep === 0 || i === labels.length - 1) {
          xticks += "<text class='tick' x='" + xs(i) + "' y='" + (H - 6) + "' text-anchor='middle'>" + l + "</text>";
        }
      });

      var annots = "";
      annotations.forEach(function (a) {
        var i = a.index;
        if (i < 0 || i >= values.length) return;
        annots += "<line class='annot-line' x1='" + xs(i) + "' x2='" + xs(i) + "' y1='" + pad.t + "' y2='" + (pad.t + ih) + "'/>";
        annots += "<circle class='dot' cx='" + xs(i) + "' cy='" + ys(values[i]) + "' r='3' fill='var(--warn)'/>";
        annots += "<text class='annot' x='" + xs(i) + "' y='" + (pad.t + 12) + "' text-anchor='middle'>" + (a.label || "") + "</text>";
      });

      var svg =
        "<svg viewBox='0 0 " + W + " " + H + "' preserveAspectRatio='xMidYMid meet'>" +
          grid +
          "<path class='area' d='" + area + "'/>" +
          "<path class='line' d='" + path + "'/>" +
          xticks +
          annots +
        "</svg>";

      var holder = host.querySelector(".chart-body");
      if (holder) holder.innerHTML = svg;
    });
  }

  /* ---------- 4. Donut chart (channel breakdown) ---------- */
  function renderDonuts() {
    document.querySelectorAll("[data-chart='donut']").forEach(function (host) {
      var raw = host.querySelector("script[type='application/json']");
      if (!raw) return;
      var data;
      try { data = JSON.parse(raw.textContent); } catch (e) { return; }
      var items = data.items || [];
      var total = items.reduce(function (s, it) { return s + (it.value || 0); }, 0);
      if (!total) return;

      var size = 140, r = 56, cx = size / 2, cy = size / 2, stroke = 22;
      var c = 2 * Math.PI * r;
      var offset = 0;
      var segs = items.map(function (it) {
        var frac = it.value / total;
        var len = c * frac;
        var seg =
          "<circle r='" + r + "' cx='" + cx + "' cy='" + cy + "'" +
          " fill='none' stroke='" + it.color + "' stroke-width='" + stroke + "'" +
          " stroke-dasharray='" + len.toFixed(2) + " " + (c - len).toFixed(2) + "'" +
          " stroke-dashoffset='" + (-offset).toFixed(2) + "'" +
          " transform='rotate(-90 " + cx + " " + cy + ")'/>";
        offset += len;
        return seg;
      }).join("");

      var center =
        "<text x='" + cx + "' y='" + (cy - 2) + "' text-anchor='middle' font-family='var(--ff-mono)' font-size='9' fill='var(--ink-4)' letter-spacing='0.1em'>TOTAL</text>" +
        "<text x='" + cx + "' y='" + (cy + 16) + "' text-anchor='middle' font-family='var(--ff-mono)' font-size='17' font-weight='700' fill='var(--ink)'>" + total.toLocaleString() + "</text>";

      var svg = "<svg viewBox='0 0 " + size + " " + size + "' width='" + size + "' height='" + size + "'>" + segs + center + "</svg>";
      var donutEl = host.querySelector(".donut");
      if (donutEl) donutEl.innerHTML = svg;

      var legendEl = host.querySelector(".legend");
      if (legendEl) {
        legendEl.innerHTML = items.map(function (it) {
          var pct = ((it.value / total) * 100).toFixed(1) + "%";
          return "<div class='row'><span class='sw' style='background:" + it.color + "'></span>" +
            "<span>" + it.label + "</span><span class='pct'>" + pct + "</span></div>";
        }).join("");
      }
    });
  }

  /* ---------- 5. Init ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    initToc();
    initTocMenu();
    initCopy();
    renderLineCharts();
    renderDonuts();
  });
})();
