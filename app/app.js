function qs(sel, root = document) {
  return root.querySelector(sel);
}
function qsa(sel, root = document) {
  return Array.from(root.querySelectorAll(sel));
}

function go(path) {
  window.location.href = path;
}

function bindBackButtons() {
  qsa('[data-back]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (window.history.length > 1) window.history.back();
      else go('index.html');
    });
  });
}

function bindLanguageToggle() {
  const seg = qs('[data-segmented]');
  if (!seg) return;
  const buttons = qsa('button', seg);
  buttons.forEach((b) => {
    b.addEventListener('click', () => {
      buttons.forEach((x) => x.setAttribute('aria-pressed', 'false'));
      b.setAttribute('aria-pressed', 'true');
    });
  });
}

function bindOtpInputs() {
  const wrap = qs('[data-otp]');
  if (!wrap) return;
  const inputs = qsa('input.otp', wrap);
  inputs.forEach((inp, idx) => {
    inp.addEventListener('input', () => {
      inp.value = (inp.value || '').replace(/\D/g, '').slice(0, 1);
      if (inp.value && inputs[idx + 1]) inputs[idx + 1].focus();
    });
    inp.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !inp.value && inputs[idx - 1]) {
        inputs[idx - 1].focus();
      }
    });
    inp.addEventListener('paste', (e) => {
      const text = (e.clipboardData || window.clipboardData).getData('text') || '';
      const digits = text.replace(/\D/g, '').slice(0, inputs.length).split('');
      if (!digits.length) return;
      e.preventDefault();
      digits.forEach((d, i) => {
        if (inputs[i]) inputs[i].value = d;
      });
      const next = inputs[Math.min(digits.length, inputs.length) - 1];
      if (next) next.focus();
    });
  });
}

function bindNavActive() {
  const page = document.body.getAttribute('data-page') || '';
  qsa('.nav-item').forEach((a) => {
    if (a.getAttribute('data-nav') === page) a.classList.add('active');
  });
}

function bindSimpleRoutes() {
  qsa('[data-go]').forEach((el) => {
    el.addEventListener('click', (e) => {
      const to = el.getAttribute('data-go');
      if (!to) return;
      e.preventDefault();
      go(to);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  bindBackButtons();
  bindLanguageToggle();
  bindOtpInputs();
  bindNavActive();
  bindSimpleRoutes();
});

