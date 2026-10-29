// SEO Facts — small shared behaviours
(function () {
  // Mobile navigation
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', nav.classList.contains('open') ? 'true' : 'false');
    });
  }

  // Copy citation / dataset buttons
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = document.querySelector(btn.getAttribute('data-copy'));
      if (!target) return;
      var text = target.innerText || target.textContent || '';
      navigator.clipboard.writeText(text).then(function () {
        var old = btn.textContent;
        btn.textContent = 'Copied';
        setTimeout(function () { btn.textContent = old; }, 1600);
      }).catch(function () {});
    });
  });

  // Ledger filter (statistics hub)
  var filters = document.querySelectorAll('[data-filter]');
  var rows = document.querySelectorAll('[data-cat]');
  if (filters.length && rows.length) {
    filters.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var cat = btn.getAttribute('data-filter');
        filters.forEach(function (b) { b.classList.toggle('on', b === btn); });
        rows.forEach(function (row) {
          var show = cat === 'all' || row.getAttribute('data-cat') === cat;
          row.classList.toggle('hidden', !show);
        });
      });
    });
  }
})();
