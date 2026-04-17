/**
 * WoW Stream Overlay — Utilitaires Partagés
 * Charge config.js + paramètres URL et applique tout
 */

(function () {

  // ── MERGE URL PARAMS OVER CONFIG ──────────────────────────
  // Les paramètres URL écrasent la config (pour le dashboard)
  function applyUrlParams(cfg) {
    const p = new URLSearchParams(window.location.search);
    if (!p.toString()) return cfg;

    const map = {
      // streamer
      pseudo:             ['streamer','pseudo'],
      guilde:             ['streamer','guilde'],
      serveur:            ['streamer','serveur'],
      classe:             ['streamer','classe'],
      faction:            ['streamer','faction'],
      contenu:            ['streamer','contenu'],
      // socials
      twitch:             ['socials','twitch'],
      discord:            ['socials','discord'],
      twitter:            ['socials','twitter'],
      youtube:            ['socials','youtube'],
      tiktok:             ['socials','tiktok'],
      // overlays.debut
      debut_titre:        ['overlays','debut','titre'],
      debut_sousTitre:    ['overlays','debut','sousTitre'],
      debut_tagline:      ['overlays','debut','tagline'],
      debut_badge:        ['overlays','debut','badge'],
      // overlays.enjeu
      enjeu_obj1:         ['overlays','enjeu','objectifLigne1'],
      enjeu_obj2:         ['overlays','enjeu','objectifLigne2'],
      enjeu_cmd1:         ['overlays','enjeu','commandes',0],
      enjeu_cmd2:         ['overlays','enjeu','commandes',1],
      enjeu_cmd3:         ['overlays','enjeu','commandes',2],
      enjeu_cmd4:         ['overlays','enjeu','commandes',3],
      // overlays.pause
      pause_sousTitre:    ['overlays','pause','sousTitre'],
      pause_message:      ['overlays','pause','message'],
      pause_contenu:      ['overlays','pause','contenuCarte'],
      // overlays.fin
      fin_titre:          ['overlays','fin','titre'],
      fin_sousTitre:      ['overlays','fin','sousTitre'],
      fin_message:        ['overlays','fin','message'],
      fin_cta:            ['overlays','fin','cta'],
      // theme
      gold:               ['theme','gold'],
      accent:             ['theme','accent'],
    };

    for (const [param, path] of Object.entries(map)) {
      const val = p.get(param);
      if (!val) continue;
      let ref = cfg;
      for (let i = 0; i < path.length - 1; i++) ref = ref[path[i]];
      ref[path[path.length - 1]] = val;
    }
    return cfg;
  }

  // ── APPLY CONFIG TO DOM ELEMENTS ──────────────────────────
  function applyConfig(cfg) {
    // Apply CSS vars from theme
    const root = document.documentElement;
    if (cfg.theme.gold)   root.style.setProperty('--gold', cfg.theme.gold);
    if (cfg.theme.accent) root.style.setProperty('--purple', cfg.theme.accent);
    if (cfg.theme.hordeColor)    root.style.setProperty('--horde', cfg.theme.hordeColor);
    if (cfg.theme.allianceColor) root.style.setProperty('--alliance', cfg.theme.allianceColor);

    // Inject particles
    if (cfg.theme.particles) spawnParticles(cfg.theme.particleCount || 40);

    // Set text by data-cfg attribute
    document.querySelectorAll('[data-cfg]').forEach(el => {
      const key = el.getAttribute('data-cfg');
      const val = resolvePath(cfg, key);
      if (val !== undefined && val !== null && val !== '') {
        if (el.tagName === 'INPUT') el.value = val;
        else el.textContent = val;
      }
    });

    // data-cfg-html for innerHTML
    document.querySelectorAll('[data-cfg-html]').forEach(el => {
      const key = el.getAttribute('data-cfg-html');
      const val = resolvePath(cfg, key);
      if (val !== undefined && val !== '') el.innerHTML = val;
    });

    // data-cfg-href for links
    document.querySelectorAll('[data-cfg-href]').forEach(el => {
      const key = el.getAttribute('data-cfg-href');
      const val = resolvePath(cfg, key);
      if (val) el.href = (val.startsWith('http') ? '' : 'https://') + val;
    });

    // data-cfg-show: show/hide if value is truthy
    document.querySelectorAll('[data-cfg-show]').forEach(el => {
      const key = el.getAttribute('data-cfg-show');
      const val = resolvePath(cfg, key);
      if (!val) el.style.display = 'none';
    });

    // data-faction: apply faction class
    document.querySelectorAll('[data-faction]').forEach(el => {
      el.classList.add('faction-' + (cfg.streamer.faction || 'horde'));
    });

    // Dispatch ready event
    document.dispatchEvent(new CustomEvent('configReady', { detail: cfg }));
  }

  function resolvePath(obj, path) {
    return path.split('.').reduce((acc, key) => {
      if (acc === null || acc === undefined) return undefined;
      // support array index like commandes.0
      return acc[isNaN(key) ? key : parseInt(key)];
    }, obj);
  }

  // ── PARTICLES ─────────────────────────────────────────────
  function spawnParticles(count) {
    const body = document.body;
    const colors = ['#ffd700', '#c8920a', '#9060ff', '#ffffff'];
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() * 3 + 1;
      p.style.cssText = `
        left: ${Math.random() * 100}%;
        width: ${size}px; height: ${size}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        animation-duration: ${Math.random() * 14 + 9}s;
        animation-delay: ${Math.random() * 12}s;
        opacity: 0;
      `;
      body.appendChild(p);
    }
  }

  // ── CORNER SVG HELPER ─────────────────────────────────────
  window.renderCorners = function () {
    const svg = `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0 L72 0 L72 3 L3 3 L3 72 L0 72 Z" fill="#c8920a" opacity="0.8"/>
      <path d="M0 0 L44 0 L44 1.5 L1.5 1.5 L1.5 44 L0 44 Z" fill="#ffd700" opacity="0.5"/>
      <circle cx="3" cy="3" r="2.5" fill="#ffd700" opacity="0.95"/>
      <line x1="18" y1="0" x2="18" y2="10" stroke="#c8920a" stroke-width="0.8" opacity="0.5"/>
      <line x1="0" y1="18" x2="10" y2="18" stroke="#c8920a" stroke-width="0.8" opacity="0.5"/>
    </svg>`;
    document.querySelectorAll('.corner').forEach(el => el.innerHTML = svg);
  };

  // ── BOOT ──────────────────────────────────────────────────
  window.addEventListener('DOMContentLoaded', function () {
    if (typeof CONFIG === 'undefined') {
      console.warn('[WoW Overlay] CONFIG non chargé');
      return;
    }
    const cfg = applyUrlParams(CONFIG);
    applyConfig(cfg);
    if (window.renderCorners) renderCorners();
    window.STREAM_CONFIG = cfg;
  });

})();
