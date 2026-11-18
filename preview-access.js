/**
 * Acesso temporário à prévia — Spartta Cursos
 *
 * IMPORTANTE: controle local por navegador, não é bloqueio seguro.
 * Cada navegador/dispositivo possui sua própria contagem.
 * Para expiração global, use Cloudflare Worker ou backend.
 */
(function () {
  'use strict';

  const PREVIEW = Object.freeze({
    enabled: true,
    durationHours: 24,
    redirectUrl: 'https://kaykodevcontato-afk.github.io/OrcamentoKG/',
    storageKey: 'devkayko_spartta_preview_start_v1',
  });

  if (!PREVIEW.enabled) return;

  const durationMs = PREVIEW.durationHours * 60 * 60 * 1000;
  const now = Date.now();
  let startedAt = now;

  try {
    const saved = Number(localStorage.getItem(PREVIEW.storageKey));
    if (Number.isFinite(saved) && saved > 0 && saved <= now) {
      startedAt = saved;
    } else {
      localStorage.setItem(PREVIEW.storageKey, String(now));
    }
  } catch (error) {
    // Navegadores sem armazenamento permitem apenas uma contagem por página.
    console.warn('Prévia: armazenamento local indisponível.', error);
  }

  const expiresAt = startedAt + durationMs;

  function checkExpiration() {
    if (Date.now() >= expiresAt) {
      window.location.replace(PREVIEW.redirectUrl);
      return true;
    }
    return false;
  }

  // Checagem antecipada, antes de renderizar o conteúdo.
  if (checkExpiration()) {
    document.documentElement.style.visibility = 'hidden';
    return;
  }

  // Se a página permanecer aberta, redireciona ao atingir o prazo.
  setTimeout(checkExpiration, Math.max(0, expiresAt - now));
  // Revalida após voltar à aba ou usar o histórico do navegador.
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) checkExpiration();
  });
  window.addEventListener('pageshow', checkExpiration);
})();
