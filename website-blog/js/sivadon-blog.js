/* Sivadon news templates — small, dependency-free behaviours.
   Each block no-ops if its markup isn't on the page. */
(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* Mobile menu */
  var burger = $('.sv-burger');
  if (burger) burger.addEventListener('click', function () {
    var h = burger.closest('.sv-header');
    var open = h.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  /* Language preview — in WordPress this is Polylang's switcher (real links).
     Here it swaps headline strings so the layout can be checked with TH / 中文. */
  var originals = new Map();
  function setLang(code) {
    document.documentElement.lang = code === 'en' ? 'en' : code === 'th' ? 'th' : 'zh-CN';
    $$('[data-th]').forEach(function (el) {
      if (!originals.has(el)) originals.set(el, el.innerHTML);
      el.innerHTML = code === 'en' ? originals.get(el) : (el.getAttribute('data-' + code) || originals.get(el));
    });
    $$('.sv-lang button').forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.lang === code ? 'true' : 'false'); });
  }
  $$('.sv-lang button').forEach(function (b) { b.addEventListener('click', function () { setLang(b.dataset.lang); }); });

  /* Catalogue filter (All / Our news / Press) */
  var tabs = $$('.sv-tabs [role="tab"]');
  if (tabs.length) {
    var items = $$('[data-kind]');
    var empty = $('#sv-empty');
    var counts = { all: items.length };
    items.forEach(function (i) { counts[i.dataset.kind] = (counts[i.dataset.kind] || 0) + 1; });
    tabs.forEach(function (t) { var n = $('.sv-tabs__n', t); if (n) n.textContent = counts[t.dataset.filter] || 0; });
    tabs.forEach(function (t) {
      t.addEventListener('click', function () {
        var f = t.dataset.filter, shown = 0;
        tabs.forEach(function (o) { o.setAttribute('aria-selected', o === t ? 'true' : 'false'); });
        items.forEach(function (i) { var hit = f === 'all' || i.dataset.kind === f; i.hidden = !hit; if (hit) shown++; });
        $$('[data-group]').forEach(function (g) { g.hidden = !$$('[data-kind]', g).some(function (i) { return !i.hidden; }); });
        if (empty) empty.hidden = shown !== 0;
      });
    });
  }

  /* TOC — follows the reader: active section + reading progress */
  var article = $('.sv-prose');
  var tocLinks = $$('.sv-toc a, .sv-toc-mobile a');
  if (article && tocLinks.length) {
    var ids = Array.from(new Set(tocLinks.map(function (a) { return a.getAttribute('href').slice(1); })));
    var heads = ids.map(function (id) { return document.getElementById(id); }).filter(Boolean);
    var bars = $$('.sv-toc__progress span');
    var current = $('.sv-toc-mobile [data-current]');
    var ticking = false;
    function update() {
      ticking = false;
      var offset = (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sv-header-h')) || 80) + 48;
      var active = heads[0];
      heads.forEach(function (h) { if (h.getBoundingClientRect().top - offset <= 0) active = h; });
      tocLinks.forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('href') === '#' + active.id); if (a.classList.contains('is-active')) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current'); });
      if (current) current.textContent = active.textContent;
      var r = article.getBoundingClientRect();
      var p = Math.min(1, Math.max(0, (offset - r.top) / (r.height - window.innerHeight + offset)));
      bars.forEach(function (b) { b.style.width = (p * 100).toFixed(1) + '%'; });
    }
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    window.addEventListener('resize', update);
    $$('.sv-toc-mobile a').forEach(function (a) { a.addEventListener('click', function () { a.closest('details').open = false; }); });
    update();
  }

  /* Copy link */
  $$('[data-copy-link]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var done = function () { var t = btn.parentNode.querySelector('.sv-share__toast'); if (t) { t.hidden = false; setTimeout(function () { t.hidden = true; }, 1800); } };
      if (navigator.clipboard) navigator.clipboard.writeText(location.href).then(done, done); else done();
    });
  });
})();
