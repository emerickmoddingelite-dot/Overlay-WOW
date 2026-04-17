/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║          WoW STREAM OVERLAY — FICHIER DE CONFIG          ║
 * ║   Modifie uniquement ce fichier pour tout personnaliser  ║
 * ╚══════════════════════════════════════════════════════════╝
 */

const CONFIG = {

  // ── IDENTITÉ ────────────────────────────────────────────────
  streamer: {
    pseudo:       "",
    guilde:       "",                   // Ex: "Les Gardiens d'Azeroth" — laisser vide pour masquer
    serveur:      "",
    classe:       "",          // Classe WoW affichée
    faction:      "",              // "horde" ou "alliance"
    contenu:      "",      // Contenu du jour
  },

  // ── RÉSEAUX SOCIAUX ─────────────────────────────────────────
  socials: {
    twitch:   "",
    discord:  "",
    twitter:  "@",
    youtube:  "",
    tiktok:   "",                       // Laisser vide pour masquer
  },

  // ── TEXTES DES OVERLAYS ─────────────────────────────────────
  overlays: {

    debut: {
      titre:      "",
      sousTitre:  "",
      tagline:    "",
      badge:      "",
    },

    enjeu: {
      objectifTitre:  "",
      objectifLigne1: "",
      objectifLigne2: "",
      commandes: ["", "", "", ""],
    },

    pause: {
      titre:      "",
      sousTitre:  "",
      message:    "",
      contenuCarte: "",
    },

    fin: {
      titre:      "",
      sousTitre:  "",
      message:    "",
      cta:        "",
    },

  },

  // ── THÈME VISUEL ────────────────────────────────────────────
  theme: {
    // Couleurs principales
    gold:         "#ffd700",
    goldDark:     "#c8920a",
    goldDim:      "#7a5500",
    accent:       "#9060ff",            // Couleur d'accent (violet par défaut)
    
    // Couleurs de faction
    hordeColor:   "#cc2200",
    allianceColor:"#0055cc",

    // Particules
    particles:    true,                 // Activer les particules flottantes
    particleCount: 45,
  },

};

// Export pour les overlays
if (typeof module !== 'undefined') module.exports = CONFIG;
