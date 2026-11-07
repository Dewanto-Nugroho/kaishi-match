/* Sistem poin & pelacakan waktu untuk Cocokkan Kata / Kuis Kaishi.
   Dipakai bersama oleh index.html dan kuis.html.
   Data disimpan di localStorage (per perangkat). */
(function () {
  'use strict';

  var KEY = 'kaishi.stats.v1';
  var DAILY_CAP = 3000;          // batas poin per hari
  var WORD_DAILY_LIMIT = 3;      // satu kata maksimal 3x memberi poin per hari
  var IDLE_MS = 90000;           // dianggap berhenti setelah 90 detik tanpa aktivitas
  var TICK_MS = 5000;

  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function dayKey(d) {
    d = d || new Date();
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }
  function shiftDay(key, delta) {
    var p = key.split('-');
    var d = new Date(+p[0], +p[1] - 1, +p[2]);
    d.setDate(d.getDate() + delta);
    return dayKey(d);
  }

  /* ---------------- state ---------------- */
  var S = load();

  function blank() {
    return {
      v: 1,
      total: 0,
      seconds: 0,
      days: {},
      words: {},
      streak: { cur: 0, best: 0, last: null },
      badges: {},
      first: Date.now(),
      last: Date.now()
    };
  }

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return blank();
      var s = JSON.parse(raw);
      if (!s || s.v !== 1) return blank();
      s.days = s.days || {};
      s.words = s.words || {};
      s.streak = s.streak || { cur: 0, best: 0, last: null };
      s.badges = s.badges || {};
      return s;
    } catch (e) { return blank(); }
  }

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {}
  }

  function day(k) {
    k = k || dayKey();
    if (!S.days[k]) S.days[k] = { p: 0, s: 0, c: 0, w: 0, q: 0, m: 0 };
    return S.days[k];
  }

  /* ---------------- streak ---------------- */
  function touchStreak() {
    var t = dayKey();
    if (S.streak.last === t) return;
    var yesterday = shiftDay(t, -1);
    S.streak.cur = (S.streak.last === yesterday) ? (S.streak.cur + 1) : 1;
    S.streak.last = t;
    if (S.streak.cur > S.streak.best) S.streak.best = S.streak.cur;
    // bonus konsistensi: 10 poin per hari berturut, maksimal 50
    var bonus = Math.min(50, 10 * S.streak.cur);
    if (S.streak.cur >= 2) addPoints(bonus, { silent: true, noCap: true });
  }

  /* ---------------- poin ---------------- */
  var listeners = [];
  function notify() {
    save();
    for (var i = 0; i < listeners.length; i++) {
      try { listeners[i](S); } catch (e) {}
    }
    render();
  }

  function addPoints(n, opt) {
    n = Math.round(n);
    if (!n) return 0;
    opt = opt || {};
    var d = day();
    if (!opt.noCap && d.p >= DAILY_CAP) return 0;
    if (!opt.noCap && d.p + n > DAILY_CAP) n = Math.max(0, DAILY_CAP - d.p);
    if (!n) return 0;
    d.p += n;
    S.total += n;
    S.last = Date.now();
    if (!opt.silent) notify();
    return n;
  }

  // poin untuk satu kata/soal, dibatasi 3x per hari per kata
  function wordPoints(wordId, base) {
    var t = dayKey();
    var w = S.words[String(wordId)];
    if (!w || w.d !== t) { w = { d: t, n: 0 }; S.words[String(wordId)] = w; }
    if (w.n >= WORD_DAILY_LIMIT) return 0;
    w.n++;
    var factor = 1;
    if (w.n === 2) factor = 0.6;
    if (w.n === 3) factor = 0.35;
    return Math.round(base * factor);
  }

  /* ---------------- waktu ---------------- */
  var lastActivity = Date.now();
  function markActive() { lastActivity = Date.now(); }

  function track(sec) {
    sec = sec || 0;
    if (!sec) return;
    day().s += sec;
    S.seconds += sec;
    notify();
  }

  function startTracking() {
    setInterval(function () {
      if (document.visibilityState !== 'visible') return;
      if (Date.now() - lastActivity > IDLE_MS) return;
      track(TICK_MS / 1000);
    }, TICK_MS);
    ['pointerdown', 'keydown', 'touchstart', 'scroll', 'input'].forEach(function (ev) {
      document.addEventListener(ev, markActive, { passive: true, capture: true });
    });
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'visible') markActive();
    });
  }

  /* ---------------- level & badge ---------------- */
  function levelInfo(total) {
    var lv = 0, need = 0;
    while (true) {
      var next = 50 * (lv + 1) * (lv + 2);
      if (total < need + next) {
        return { level: lv + 1, cur: total - need, need: next, pct: Math.min(100, Math.round((total - need) / next * 100)) };
      }
      need += next;
      lv++;
    }
  }

  var BADGES = [
    { id: 'first', name: 'Langkah pertama', desc: 'Selesaikan satu sesi', test: function () { return sessions() >= 1; } },
    { id: 'streak3', name: 'Konsisten 3 hari', desc: 'Belajar 3 hari berturut-turut', test: function () { return S.streak.best >= 3; } },
    { id: 'streak7', name: 'Seminggu penuh', desc: 'Belajar 7 hari berturut-turut', test: function () { return S.streak.best >= 7; } },
    { id: 'streak30', name: 'Sebulan penuh', desc: 'Belajar 30 hari berturut-turut', test: function () { return S.streak.best >= 30; } },
    { id: 'acc90', name: 'Nyaris sempurna', desc: 'Satu sesi dengan akurasi ≥ 90% (min. 20 soal)', test: function () { return S._acc90 === true; } },
    { id: 'p1000', name: '1.000 poin', desc: 'Kumpulkan 1.000 poin', test: function () { return S.total >= 1000; } },
    { id: 'p5000', name: '5.000 poin', desc: 'Kumpulkan 5.000 poin', test: function () { return S.total >= 5000; } },
    { id: 'p20000', name: '20.000 poin', desc: 'Kumpulkan 20.000 poin', test: function () { return S.total >= 20000; } },
    { id: 't60', name: 'Sejam pertama', desc: 'Total waktu belajar 60 menit', test: function () { return S.seconds >= 3600; } },
    { id: 't600', name: 'Sepuluh jam', desc: 'Total waktu belajar 10 jam', test: function () { return S.seconds >= 36000; } },
    { id: 'lvl5', name: 'Level 5', desc: 'Capai level 5', test: function () { return levelInfo(S.total).level >= 5; } },
    { id: 'lvl10', name: 'Level 10', desc: 'Capai level 10', test: function () { return levelInfo(S.total).level >= 10; } }
  ];

  function sessions() {
    var n = 0;
    for (var k in S.days) if (S.days.hasOwnProperty(k)) n += (S.days[k].q || 0) + (S.days[k].m || 0);
    return n;
  }

  function checkBadges() {
    var fresh = [];
    BADGES.forEach(function (b) {
      if (S.badges[b.id]) return;
      var ok = false;
      try { ok = b.test(); } catch (e) {}
      if (ok) {
        S.badges[b.id] = Date.now();
        fresh.push(b);
      }
    });
    return fresh;
  }

  /* ---------------- API ---------------- */
  var API = {
    // Kuis: satu soal dijawab
    quizAnswer: function (o) {
      touchStreak();
      var d = day();
      if (o.correct) {
        d.c++;
        var base = o.base || 8;
        var pts = wordPoints(o.wordId != null ? o.wordId : 'q' + Date.now(), base);
        if (o.level && o.level >= 1 && o.level <= 5) {
          var mult = { 5: 1, 4: 1.05, 3: 1.1, 2: 1.2, 1: 1.35 }[o.level] || 1;
          pts = Math.round(pts * mult);
        }
        addPoints(pts, { silent: true });
      } else {
        d.w++;
      }
      checkBadges();
      notify();
      return pts || 0;
    },

    // Kuis: sesi selesai
    quizDone: function (o) {
      var d = day();
      d.q = (d.q || 0) + 1;
      touchStreak();
      var total = (o.correct || 0) + (o.wrong || 0);
      var acc = total ? o.correct / total : 0;
      if (total >= 20 && acc >= 0.9) S._acc90 = true;
      var bonus = 20 + Math.round(acc * 60);
      var got = addPoints(bonus, { silent: true });
      var fresh = checkBadges();
      notify();
      showToast('+' + got + ' poin · sesi selesai', fresh);
      return got;
    },

    // Cocokkan kata: satu pasangan
    matchPair: function (o) {
      touchStreak();
      var d = day();
      if (o.correct) {
        d.c++;
        var base = 10;
        if (o.isNew) base = 15;          // kata yang belum pernah dipelajari di Anki
        var pts = wordPoints(o.wordId != null ? o.wordId : 'm' + Date.now(), base);
        addPoints(pts, { silent: true });
        notify();
        return pts;
      }
      d.w++;
      notify();
      return 0;
    },

    // Cocokkan kata: ronde selesai tepat waktu
    matchRound: function () {
      return addPoints(15, { silent: true });
    },

    // Cocokkan kata: sesi selesai
    matchDone: function (o) {
      var d = day();
      d.m = (d.m || 0) + 1;
      touchStreak();
      var total = (o.correct || 0) + (o.wrong || 0);
      var acc = total ? o.correct / total : 0;
      var bonus = 20 + Math.round(acc * 40);
      var got = addPoints(bonus, { silent: true });
      var fresh = checkBadges();
      notify();
      showToast('+' + got + ' poin · sesi selesai', fresh);
      return got;
    },

    summary: function () {
      var d = day();
      var lv = levelInfo(S.total);
      var week = [];
      for (var i = 6; i >= 0; i--) {
        var k = shiftDay(dayKey(), -i);
        var dd = S.days[k] || { p: 0, s: 0 };
        week.push({ day: k, points: dd.p || 0, seconds: dd.s || 0 });
      }
      return {
        total: S.total, level: lv, today: d, streak: S.streak,
        seconds: S.seconds, badges: S.badges, week: week, cap: DAILY_CAP,
        wordsToday: Object.keys(S.words).filter(function (k) { return S.words[k].d === dayKey(); }).length
      };
    },

    onChange: function (fn) { listeners.push(fn); },

    reset: function () { S = blank(); notify(); }
  };

  /* ---------------- UI ---------------- */
  var STYLE = ''
    + '.poin-modal{position:fixed;inset:0;background:rgba(24,22,36,.45);display:none;align-items:center;justify-content:center;z-index:200;padding:16px}'
    + '.poin-modal.show{display:flex}'
    + '.poin-card{background:#fff;border-radius:20px;max-width:520px;width:100%;max-height:86vh;overflow:auto;padding:22px;box-shadow:0 24px 60px rgba(20,18,40,.28);font-family:"Inter","Segoe UI",system-ui,sans-serif;color:#1c1a2b}'
    + '.poin-card h2{margin:0 0 2px;font-size:20px}'
    + '.poin-sub{color:#7c7a92;font-size:13px;margin:0 0 16px}'
    + '.poin-lvl{display:flex;align-items:center;gap:12px;margin-bottom:14px}'
    + '.poin-lvlnum{width:52px;height:52px;border-radius:15px;background:linear-gradient(180deg,#8b6bff,#6f4df5);color:#fff;display:grid;place-items:center;font-weight:800;font-size:19px;flex:none}'
    + '.poin-bar{height:8px;border-radius:99px;background:#f1eefa;overflow:hidden;margin-top:6px}'
    + '.poin-bar i{display:block;height:100%;background:linear-gradient(90deg,#8b6bff,#6f4df5)}'
    + '.poin-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin:14px 0}'
    + '.poin-tile{background:#fbfaff;border:1px solid #eae7f4;border-radius:13px;padding:11px 13px}'
    + '.poin-tile b{display:block;font-size:19px}'
    + '.poin-tile small{color:#7c7a92;font-size:12px}'
    + '.poin-week{display:flex;gap:6px;align-items:flex-end;height:64px;margin:8px 0 4px}'
    + '.poin-week div{flex:1;background:#e9e3ff;border-radius:5px 5px 0 0;min-height:3px}'
    + '.poin-week span{flex:1;text-align:center;font-size:10px;color:#9a95ab}'
    + '.poin-badges{display:flex;flex-wrap:wrap;gap:7px;margin-top:6px}'
    + '.poin-b{font-size:11.5px;border-radius:8px;padding:5px 9px;background:#f1f0f6;color:#8b879e}'
    + '.poin-b.on{background:#e4f7ee;color:#1e7d4e;font-weight:600}'
    + '.poin-x{position:absolute;top:14px;right:16px;border:0;background:#f1f0f6;border-radius:50%;width:30px;height:30px;cursor:pointer;font-size:15px;color:#5c5a72}'
    + '.poin-toast{position:fixed;left:50%;bottom:96px;transform:translateX(-50%) translateY(10px);background:#24222f;color:#fff;padding:11px 16px;border-radius:13px;font-size:13.5px;opacity:0;transition:.25s;z-index:210;pointer-events:none;font-family:"Inter",system-ui,sans-serif;max-width:80vw;text-align:center}'
    + '.poin-toast.show{opacity:1;transform:translateX(-50%) translateY(0)}'
    + '.badge-poin{cursor:pointer;border:0;font-family:inherit;font-size:12px;font-weight:700;'
    + 'padding:5px 11px;border-radius:999px;line-height:1.2;'
    + 'background:linear-gradient(180deg,#f4efff,#ece4ff);color:#5a3fd6;white-space:nowrap}'
    + '.badge-poin:hover{filter:brightness(.97)}'
    + '@media(max-width:720px){.badge-poin{font-size:11px;padding:4px 9px}}';

  var modalEl, toastEl, toastTimer;

  function fmtTime(sec) {
    sec = Math.max(0, Math.round(sec));
    var h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60);
    if (h) return h + 'j ' + m + 'm';
    if (m) return m + 'm';
    return sec + 'd';
  }

  function buildModal() {
    if (modalEl) return;
    var st = document.createElement('style');
    st.textContent = STYLE;
    document.head.appendChild(st);

    modalEl = document.createElement('div');
    modalEl.className = 'poin-modal';
    modalEl.innerHTML = '<div class="poin-card" style="position:relative">'
      + '<button class="poin-x" aria-label="Tutup">✕</button>'
      + '<div id="poinBody"></div></div>';
    document.body.appendChild(modalEl);
    modalEl.addEventListener('click', function (e) { if (e.target === modalEl) hide(); });
    modalEl.querySelector('.poin-x').addEventListener('click', hide);

    toastEl = document.createElement('div');
    toastEl.className = 'poin-toast';
    document.body.appendChild(toastEl);
  }

  function showToast(msg, freshBadges) {
    buildModal();
    var extra = (freshBadges && freshBadges.length)
      ? ' · 🏅 ' + freshBadges.map(function (b) { return b.name; }).join(', ')
      : '';
    toastEl.textContent = msg + extra;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, 2600);
  }

  function hide() { if (modalEl) modalEl.classList.remove('show'); }
  function show() {
    buildModal();
    if (toastEl) toastEl.classList.remove('show');
    renderModal();
    modalEl.classList.add('show');
  }

  function renderModal() {
    if (!modalEl) return;
    var sm = API.summary();
    var lv = sm.level;
    var week = sm.week;
    var maxP = Math.max.apply(null, week.map(function (w) { return w.points; }).concat([1]));
    var bars = week.map(function (w) {
      var h = Math.round(w.points / maxP * 100);
      return '<div style="height:' + Math.max(3, h) + '%" title="' + w.points + ' poin"></div>';
    }).join('');
    var labels = week.map(function (w) {
      var d = w.day.split('-');
      return '<span>' + d[2] + '</span>';
    }).join('');
    var badges = BADGES.map(function (b) {
      return '<span class="poin-b' + (S.badges[b.id] ? ' on' : '') + '" title="' + b.desc + '">'
        + (S.badges[b.id] ? '🏅 ' : '🔒 ') + b.name + '</span>';
    }).join('');

    modalEl.querySelector('#poinBody').innerHTML =
      '<h2>Progres belajar</h2>'
      + '<p class="poin-sub">Poin dari sesi Cocokkan Kata dan Kuis. Maksimal ' + sm.cap + ' poin/hari.</p>'
      + '<div class="poin-lvl"><div class="poin-lvlnum">' + lv.level + '</div>'
      + '<div style="flex:1"><div style="display:flex;justify-content:space-between;font-size:13px">'
      + '<b>' + sm.total + ' poin</b><span style="color:#7c7a92">' + lv.cur + '/' + lv.need + ' ke level ' + (lv.level + 1) + '</span></div>'
      + '<div class="poin-bar"><i style="width:' + lv.pct + '%"></i></div></div></div>'
      + '<div class="poin-grid">'
      + '<div class="poin-tile"><b>' + (sm.today.p || 0) + '</b><small>poin hari ini</small></div>'
      + '<div class="poin-tile"><b>' + fmtTime(sm.today.s || 0) + '</b><small>waktu hari ini</small></div>'
      + '<div class="poin-tile"><b>🔥 ' + sm.streak.cur + '</b><small>streak hari (terbaik ' + sm.streak.best + ')</small></div>'
      + '<div class="poin-tile"><b>' + fmtTime(sm.seconds) + '</b><small>total waktu belajar</small></div>'
      + '<div class="poin-tile"><b>' + sm.wordsToday + '</b><small>kata hari ini</small></div>'
      + '<div class="poin-tile"><b>' + ((sm.today.q || 0) + (sm.today.m || 0)) + '</b><small>sesi hari ini</small></div>'
      + '</div>'
      + '<div style="display:flex;justify-content:space-between;font-size:11.5px;color:#7c7a92;margin-top:2px">'
      + '<span>Batas poin harian</span><span>' + (sm.today.p || 0) + ' / ' + sm.cap + '</span></div>'
      + '<div class="poin-bar" style="margin-top:4px"><i style="width:'
      + Math.min(100, Math.round((sm.today.p || 0) / sm.cap * 100)) + '%;background:linear-gradient(90deg,#7fd8a8,#1e9d63)"></i></div>'
      + '<div style="font-size:12.5px;color:#7c7a92;margin-top:14px">7 hari terakhir</div>'
      + '<div class="poin-week">' + bars + '</div>'
      + '<div style="display:flex;gap:6px;margin-bottom:12px">' + labels + '</div>'
      + '<div style="font-size:12.5px;color:#7c7a92">Pencapaian</div>'
      + '<div class="poin-badges">' + badges + '</div>'
      + '<div style="text-align:center;margin-top:16px">'
      + '<button id="poinReset" style="border:1px solid #eae7f4;background:#fff;color:#8b879e;'
      + 'border-radius:10px;padding:7px 14px;font-size:12px;cursor:pointer;font-family:inherit">'
      + 'Reset data poin</button></div>';

    var rst = modalEl.querySelector('#poinReset');
    if (rst) {
      rst.addEventListener('click', function () {
        if (confirm('Hapus semua poin, level, dan riwayat waktu? Tindakan ini tidak bisa dibatalkan.')) {
          API.reset();
          renderModal();
        }
      });
    }
  }

  function render() {
    var el = document.getElementById('poinBadge');
    if (!el) return;
    var sm = API.summary();
    el.innerHTML = '<span style="opacity:.75">★</span> ' + sm.total.toLocaleString('id-ID')
      + ' <span style="opacity:.6">· Lv ' + sm.level.level + '</span>';
  }

  function mount() {
    buildModal();
    var el = document.getElementById('poinBadge');
    if (el) {
      el.addEventListener('click', function (e) { e.preventDefault(); show(); });
      el.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') show(); });
    }
    render();
    API.onChange(render);
  }

  /* ---------------- init ---------------- */
  window.KaishiStats = API;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { mount(); startTracking(); });
  } else {
    mount();
    startTracking();
  }
})();
