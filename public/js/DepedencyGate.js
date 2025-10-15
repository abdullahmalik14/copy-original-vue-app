/* Vue 3 DependencyGate — CLEAN + BASIC
   - Shows a Spinner first.
   - Waits ONLY for deps explicitly listed in `waitFor` (others are ignored).
   - Uses YOUR AssetHandler_New_Fixed.js and apiLoader.js when relevant.
   - Minimal placeholders for icons/media/components.
   - Console logs everywhere.
*/
(function () {
  // expect Vue 3 already loaded by you
  const { createApp, defineComponent, ref, h, onMounted } = window.Vue;
  // ---- tiny fallback spinner (use your own via `spinner` prop if you want) ----
  const FallbackSpinner = defineComponent({
    name: 'GateSpinner',
    props: { text: { type: String, default: 'Loading…' } },
    setup(p) { return () => h('div', { style: 'display:flex;gap:8px;align-items:center;justify-content:center;padding:12px' }, [
      h('div', { style: 'width:16px;height:16px;border-radius:50%;border:3px solid #ccc;border-top-color:#666;animation:gateSpin .8s linear infinite' }),
      h('span', p.text)
    ]); }
  });
  (function(){ const s=document.createElement('style'); s.textContent='@keyframes gateSpin{to{transform:rotate(360deg)}}'; document.head.appendChild(s); })();
  // ------------------ INDIVIDUAL, TINY WAITERS ------------------
  // Assets: scripts/stylesheets/media/svg/icons via YOUR AssetHandler.
  async function waitAssets(cfg) {
    console.log('[Gate] assets: start', cfg);
    if (!cfg || !Array.isArray(cfg.items) || cfg.items.length === 0) { console.log('[Gate] assets: none'); return; }
    if (!window.AssetHandler) { console.log('[Gate] assets: AssetHandler missing -> skip'); return; }
    const flag = cfg.flag || 'gate';
    const normalized = cfg.items.map((a, i) => ({
      name: a.name || `${flag}-${(a.type||'asset')}-${i}`,
      url: a.url,
      type: a.type || 'script',                          // supports script|css|image|video|font|icon|svg|object
      flags: Array.isArray(a.flags) ? Array.from(new Set([flag, ...a.flags])) : [flag],
      dependencies: a.dependencies || [],
      location: a.location || (a.type === 'script' ? 'footer-last' : 'head-last'),
      defer: a.defer ?? (a.type === 'script'),
      async: a.async ?? false,
      priority: a.priority || 'normal',
      version: a.version ?? null,
      media: a.media ?? null,
      after: a.after ?? null,
      critical: !!a.critical,
      imagesrcset: a.imagesrcset,
      imagesizes: a.imagesizes,
      crossOrigin: a.crossOrigin,
      nonce: a.nonce,
      typeAttributes: a.typeAttributes,
      fallback: a.fallback
    }));
    const handler = new window.AssetHandler(normalized, { debug: true, logLevel: 'info' });
    await handler.preloadAssetsByFlag(flag);
    console.log('[Gate] assets: done');
  }
  // API loaded: waits for your event OR times out.
  function waitApiLoaded(cfg) {
    if (!cfg) { console.log('[Gate] apiLoaded: none'); return Promise.resolve(); }
    const eventName = cfg.event || 'madlinks-api-loaded';
    const timeoutMs = Number(cfg.timeoutMs ?? 10000);
    console.log('[Gate] apiLoaded: waiting for event', eventName);
    return new Promise((resolve) => {
      let to = null;
      const done = (reason) => { console.log('[Gate] apiLoaded:', reason); cleanup(); resolve(); };
      const handler = () => done('event received');
      const cleanup = () => { window.removeEventListener(eventName, handler); if (to) clearTimeout(to); };
      window.addEventListener(eventName, handler);
      if (timeoutMs > 0) to = setTimeout(() => done('timeout'), timeoutMs);
    });
  }
  // Media: wait for IMG elements in provided container element (if given).
  async function waitMedia(cfg) {
    if (!cfg) { console.log('[Gate] media: none'); return; }
    const container = cfg.container; // MUST be an HTMLElement if you pass it
    if (!(container instanceof HTMLElement)) { console.log('[Gate] media: no container HTMLElement -> skip'); return; }
    const imgs = Array.from(container.querySelectorAll('img'));
    if (!imgs.length) { console.log('[Gate] media: no <img> -> done'); return; }
    console.log('[Gate] media: waiting for', imgs.length, 'image(s)');
    await Promise.all(imgs.map(img => {
      if (img.complete && img.naturalWidth > 0) return Promise.resolve();
      return new Promise(r => {
        const done = () => { img.removeEventListener('load', done); img.removeEventListener('error', done); r(); };
        img.addEventListener('load', done); img.addEventListener('error', done);
      });
    }));
    console.log('[Gate] media: done');
  }
  // Icons: placeholder — you can pass a check() if you have one; otherwise resolves.
  async function waitIcons(cfg) {
    if (!cfg) { console.log('[Gate] icons: none'); return; }
    if (typeof cfg.check === 'function') {
      console.log('[Gate] icons: running custom check()');
      try { await Promise.resolve(cfg.check()); console.log('[Gate] icons: check passed'); }
      catch (e) { console.warn('[Gate] icons: check failed (continuing)', e); }
    } else {
      console.log('[Gate] icons: no check() -> done');
    }
  }
  // Components: NOT on window; use your on-demand async check() (e.g., registry ready).
  async function waitComponents(cfg) {
    if (!cfg) { console.log('[Gate] components: none'); return; }
    const check = cfg.check;
    const timeoutMs = Number(cfg.timeoutMs ?? 8000);
    if (typeof check !== 'function') { console.log('[Gate] components: no check() -> done'); return; }
    console.log('[Gate] components: running check()');
    try {
      const first = await Promise.resolve(check());
      if (first) { console.log('[Gate] components: ready'); return; }
    } catch (e) {
      console.warn('[Gate] components: check() threw — continuing', e);
      return;
    }
    // simple polling until timeout
    const start = Date.now();
    await new Promise((res) => {
      const tick = async () => {
        try { if (await Promise.resolve(check())) { console.log('[Gate] components: ready (polled)'); return res(); } }
        catch { return res(); }
        if (Date.now() - start >= timeoutMs) { console.warn('[Gate] components: timeout -> continue'); return res(); }
        setTimeout(tick, 80);
      };
      tick();
    });
  }
  // ------------------ VUE COMPONENT ------------------
  const DependencyGate = defineComponent({
    name: 'DependencyGate',
    props: {
      // REQUIRED: an HTMLElement to mount *content* into? No. We mount this component normally.
      // You pass your container for media via deps.media.container if you need it.
      spinner: { type: [Object, String], default: null },
      // CONFIG:
      // waitFor: array of keys to wait on (runs ONLY these)
      // Supported keys: 'assets', 'apiLoaded', 'media', 'icons', 'components'
      // assets: { flag?, items: [...] }
      // apiLoaded: { event?, timeoutMs? }
      // media: { container: HTMLElement }
      // icons: { check?: async ()=>void }
      // components: { check: async ()=>boolean, timeoutMs? }
      config: { type: Object, required: true },
      // When ready, render this function OR the default slot
      renderWhenReady: { type: Function, default: null }
    },
    setup(props, { slots }) {
      const ready = ref(false);
      const Spinner = props.spinner || FallbackSpinner;
      const run = async () => {
        const cfg = props.config || {};
        const order = Array.isArray(cfg.waitFor) ? cfg.waitFor : [];
        console.log('[Gate] waitFor:', order);
        // map names -> waiters (ONLY call ones present in waitFor)
        const tasks = [];
        for (const key of order) {
          if (key === 'assets') tasks.push(waitAssets(cfg.assets));
          else if (key === 'apiLoaded') tasks.push(waitApiLoaded(cfg.apiLoaded));
          else if (key === 'media') tasks.push(waitMedia(cfg.media));
          else if (key === 'icons') tasks.push(waitIcons(cfg.icons));
          else if (key === 'components') tasks.push(waitComponents(cfg.components));
          else console.log('[Gate] unknown key in waitFor ->', key, '(ignored)');
        }
        await Promise.all(tasks);
        console.log('[Gate] all configured waits done');
        ready.value = true;
      };
      onMounted(run);
      return () => !ready.value
        ? h('div', { 'data-gate': 'loading' }, [ h(Spinner, { text: 'Preparing…' }) ])
        : h('div', { 'data-gate': 'ready' },
            typeof props.renderWhenReady === 'function'
              ? [props.renderWhenReady()]
              : (slots.default ? slots.default() : [])
          );
    }
  });
  // helper to mount into a DIV you give us (HTMLElement only, per your ask)
  function createDependencyGate({ el, spinner = null, config = {}, renderWhenReady = null } = {}) {
    if (!(el instanceof HTMLElement)) { console.error('[Gate] create: "el" must be an HTMLElement'); return null; }
    const app = createApp(DependencyGate, { spinner, config, renderWhenReady });
    app.mount(el);
    return app;
  }
  // expose
  window.DependencyGate = DependencyGate;
  window.createDependencyGate = createDependencyGate;
})();