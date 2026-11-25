const METRIKA_ID = 98549190;
const METRIKA_SCRIPT_SRC = "https://mc.yandex.ru/metrika/tag.js";

/**
 * Dynamically loads and initializes Yandex.Metrika strictly after cookie consent.
 */
export function initYandexMetrika() {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return;
  }

  if (window.__ymInitialized) {
    return;
  }
  window.__ymInitialized = true;

  window.ym =
    window.ym ||
    function () {
      (window.ym.a = window.ym.a || []).push(arguments);
    };
  window.ym.l = 1 * new Date();

  const alreadyLoaded = Array.from(document.scripts).some(
    (s) => s.src === METRIKA_SCRIPT_SRC
  );

  if (!alreadyLoaded) {
    const script = document.createElement("script");
    script.async = true;
    script.src = METRIKA_SCRIPT_SRC;
    const firstScript = document.getElementsByTagName("script")[0];
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    } else {
      document.head.appendChild(script);
    }
  }

  window.ym(METRIKA_ID, "init", {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true,
  });
}

/**
 * Sends a Yandex.Metrika reachGoal event if user accepted cookies & Metrika is active.
 */
export function trackGoal(goalName, params) {
  if (
    typeof window !== "undefined" &&
    window.__ymInitialized &&
    typeof window.ym === "function"
  ) {
    window.ym(METRIKA_ID, "reachGoal", goalName, params);
  }
}

export function setCookie(name, value, days = 365) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

export function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}
