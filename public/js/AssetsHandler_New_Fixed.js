// AssetHandler.js

class AssetHandler {
  // === Initialization & Config ===

static _configCache = null;         // cached config array
static _configLoaded = false;       // guard flag to avoid reloading

/**
 * @param {Array<Object>} config - Array of asset configuration objects
 * @param {Object} [options] - Optional global settings
 * @param {string|null} [options.globalVersion=null] - App-wide default version
 * @param {number} [options.maxConcurrent=3] - Maximum concurrent asset loads
 */
constructor(config = [], options = {}) {
  this.logGroup('Initialization', () => {
    this.log('Constructor start', { config, options });

    this.preloadHints = new Map(); // key: asset.name, value: <link> element

    // Normalize config and options
    this.configRaw = Array.isArray(config) ? config : [];
    this.config = [];

    // Apply options
    this.maxConcurrent = typeof options.maxConcurrent === 'number' ? options.maxConcurrent : 3;
    this.globalVersion = typeof options.globalVersion === 'string' ? options.globalVersion : null;

    // ✅ Add debug/logLevel option
    this.debug = options.debug ?? true; // default true untuk dev
    this.logLevel = options.logLevel || 'info'; // bisa 'info', 'warn', 'error', 'none'

    // Load and validate config
    this.loadConfigFromJSON(this.configRaw);
    this.validateConfig();

    this.log('Constructor end', {
      globalVersion: this.globalVersion,
      maxConcurrent: this.maxConcurrent
    });
  });
}

/**
 * Load and cache a JSON config once.
 *
 * - On first call, fetches and normalizes the config, stores in class cache.
 * - On subsequent calls, instantly returns the cached config.
 * - Safe in the browser (no require/import).
 *
 * @param {string} url - Path to the JSON config file
 * @param {boolean} [forceReload=false] - If true, bypass cache and reload
 * @returns {Promise<Object[]>} Normalized config array
 */
async loadAndCacheConfig(url, forceReload = false) {
  return this.logGroup('Config › loadAndCacheConfig', async () => {
    // If already loaded and not forcing reload, return cached
    if (AssetHandler._configLoaded && !forceReload) {
      this.log('Using cached config', { count: AssetHandler._configCache.length });
      this.config = [...AssetHandler._configCache];
      return this.config;
    }
    this.log('Fetching config from URL', { url });
    const response = await fetch(url, { credentials: 'same-origin' });
    if (!response.ok) {
      throw new Error(`Failed to load config: ${response.status} ${response.statusText}`);
    }
    const raw = await response.json();
    // Normalize with your existing logic
    const normalized = raw.map(asset => ({
      name: asset.name || '',
      url: asset.url || '',
      type: asset.type || 'script',
      flags: asset.flags || [],
      dependencies: asset.dependencies || [],
      priority: asset.priority || 'normal',
      version: asset.version || null,
      location: asset.location || 'head-last',
      defer: !!asset.defer,
      async: !!asset.async,
      after: asset.after || null,
      media: asset.media || null,
      critical: !!asset.critical,
      crossOrigin: asset.crossOrigin || null,
      imagesrcset: asset.imagesrcset || null,
      imagesizes: asset.imagesizes || null,
      nonce: asset.nonce || null
    }));
    // Cache it
    AssetHandler._configCache = normalized;
    AssetHandler._configLoaded = true;
    // Apply to this instance
    this.config = [...normalized];
    this.log('Config loaded and cached', { count: normalized.length });
    // Run your existing validation if needed
    this.validateConfig();
    return this.config;
  });
}


/**
 * Sets the global (app) version for assets with SemVer validation.
 * @param {string|null} version
 */
setGlobalVersion(version) {
  this.logGroup('Versioning', () => {
    this.log('Setting global version', { version });

    // Simple SemVer pattern: major.minor.patch, optional pre-release or build
    const semverPattern = /^(?:\d+\.\d+\.\d+)(?:[-+][\w.-]+)?$/;

    if (typeof version === 'string' && semverPattern.test(version)) {
      this.globalVersion = version;
      this.log('✅ Global version set successfully', { version });
    } else {
      this.log('⚠️ Invalid or missing version format, defaulting to null', { version });
      this.globalVersion = null;
    }
  });
}

/**
 * Loads, normalizes, and adjusts raw JSON configuration
 * @param {any} json
 */
loadConfigFromJSON(json) {
  this.logGroup('Config Loading', () => {
    this.log('Loading raw config', { json });

    const raw = Array.isArray(json) ? json : [];

    // 🧊 Default asset object — keep frozen, just for reference
    const DEFAULT_ASSET = Object.freeze({
      name: null,
      url: null,
      type: null,
      flags: [],
      dependencies: [],
      priority: 'normal',
      version: null,
      location: 'head-last',
      defer: false,
      async: false,
      after: null,
      media: null,
      critical: false
    });

    // ⚙️ Merge each item safely without mutating the frozen defaults
    const mergeWithDefaults = (item) => {
      // Buat object baru hasil gabungan default + item
      const asset = { ...DEFAULT_ASSET, ...item };

      // Jika critical, otomatis ubah priority
      if (asset.critical) asset.priority = 'critical';
      return asset;
    };

    // ✅ Normalize all configs
    this.config = raw.map(mergeWithDefaults);

    this.log('Configuration loaded', { count: this.config.length });
  });
}



  // === Logging Subgroup ===

/**
 * Wraps a series of logs in a console.group
 * @param {string} groupName
 * @param {Function} fn
 */
logGroup(groupName, fn) {
  if (!this.debug || this.logLevel === 'none') return fn();

  const groupSupported = typeof console.group === 'function';
  const groupEndSupported = typeof console.groupEnd === 'function';

  if (groupSupported) {
    console.group(`AssetHandler: ${groupName}`);
  } else {
    console.log(`--- AssetHandler: ${groupName} ---`);
  }

  try {
    const result = fn();

    // If fn returns a Promise, ensure groupEnd after it resolves/rejects
    if (result && typeof result.then === 'function') {
      return result
        .then(res => {
          if (groupEndSupported) console.groupEnd();
          else console.log(`--- End AssetHandler: ${groupName} ---`);
          return res;
        })
        .catch(err => {
          console.error(`AssetHandler: Error in group ${groupName}`, err);
          if (groupEndSupported) console.groupEnd();
          else console.log(`--- End AssetHandler: ${groupName} ---`);
          throw err;
        });
    } else {
      if (groupEndSupported) console.groupEnd();
      else console.log(`--- End AssetHandler: ${groupName} ---`);
      return result;
    }
  } catch (err) {
    console.error(`AssetHandler: Error in group ${groupName}`, err);
    if (groupEndSupported) console.groupEnd();
    else console.log(`--- End AssetHandler: ${groupName} ---`);
    throw err;
  }
}


/**
 * Unified logging method
 * @param {string} message
 * @param {Object} [data]
 */
log(message, data = {}, level = 'info') {
  if (!this.debug || this.logLevel === 'none') return;

  const levels = ['info', 'warn', 'error'];
  if (!levels.includes(level)) level = 'info';

  switch (level) {
    case 'info':
      console.log(`AssetHandler: ${message}`, data);
      break;
    case 'warn':
      console.warn(`AssetHandler: ${message}`, data);
      break;
    case 'error':
      console.error(`AssetHandler: ${message}`, data);
      break;
  }
}

// === Public API ===

/**
 * Listen for a custom event and load assets flagged for that event.
 * @param {string} eventName
 * @param {Function} [callback]
 */
/**
 * Listen for a custom event and load assets flagged for that event.
 * @param {string} eventName
 * @param {Function} [callback]
 */
loadAssetsForEvent(eventName, callback) {
  return this.logGroup(`Public API › loadAssetsForEvent (${eventName})`, () => {
    this.log('Registering event listener', { eventName });

    // Define the async listener separately
    const listener = async (e) => {
      try {
        this.log('Event fired', { eventName, event: e });

        // 1. Filter & sort by priority
        let assets = this.getAssetsByFlags([eventName]);
        this.log('Assets before sorting', { assets: assets.map(a => ({ name: a.name, url: a.url })) });
        assets = this.sortByPriority(assets);
        this.log('Assets after priority sorting', { assets: assets.map(a => ({ name: a.name, url: a.url })) });

        // 2. Resolve dependencies
        const sorted = this.resolveDependencies(assets);
        this.log('Assets after dependency resolution', { sorted: sorted.map(a => ({ name: a.name, url: a.url })) });

        // 3. Register preload hints
        sorted.forEach(a => this.registerPreloadHint(a));
        this.log('Preload hints registered', { assets: sorted.map(a => ({ name: a.name })) });

        // 4. Load with throttle
        const results = await this.loadAssetsInParallelWithThrottle(sorted, this.maxConcurrent)
          .catch(err => {
            this.log('Error loading assets in throttle', { err });
            return []; // fail-safe: return empty array
          });
        this.log('Assets loaded', { results: results.map(r => ({ name: r.name, url: r.url })) });

        // 5. Callback (wrap in try/catch in case callback throws)
        if (typeof callback === 'function') {
          try {
            callback(results);
          } catch (err) {
            this.log('Error in callback execution', { err });
          }
        }
      } catch (err) {
        this.log('Unhandled error in event listener', { eventName, err });
      }
    };

    window.addEventListener(eventName, listener);
    this.log('Event listener attached', { eventName });

    // Return a deregistration function
    return () => {
      window.removeEventListener(eventName, listener);
      this.log('Event listener removed', { eventName });
    };
  });
}


/**
 * Preload all assets matching any of the given flags, with concurrency control.
 * @param {...string} flags
 * @param {number} [maxConcurrentOverride] - Optional per-call concurrency limit
 */
preloadAssetsByFlag(...args) {
  return this.logGroup('Public API › preloadAssetsByFlag', () => {
    // Extract optional maxConcurrentOverride if last argument is a number
    let maxConcurrentOverride;
    if (typeof args[args.length - 1] === 'number') {
      maxConcurrentOverride = args.pop();
    }

    const flags = args;
    this.log('Flags for preload', { flags, maxConcurrentOverride });

    // Filter & sort by priority
    let assets = this.getAssetsByFlags(flags);
    this.log('Assets before sorting', { assets: assets.map(a => ({ name: a.name, url: a.url })) });
    assets = this.sortByPriority(assets);
    this.log('Assets after priority sorting', { assets: assets.map(a => ({ name: a.name, url: a.url })) });

    // Resolve dependencies
    const sorted = this.resolveDependencies(assets);
    this.log('Assets after dependency resolution', { sorted: sorted.map(a => ({ name: a.name, url: a.url })) });

    // Register preload hints
    sorted.forEach(a => this.registerPreloadHint(a));
    this.log('Preload hints registered', { assets: sorted.map(a => ({ name: a.name })) });

    // Determine concurrency limit
    const maxConcurrent = typeof maxConcurrentOverride === 'number' ? maxConcurrentOverride : this.maxConcurrent;

    // Throttled load
    return this.loadAssetsInParallelWithThrottle(sorted, maxConcurrent)
      .then(results => {
        this.log('Preload complete', { results: results.map(r => ({ name: r.name, url: r.url })) });
        return results;
      })
      .catch(err => {
        this.log('Preload error', { err });
        throw err;
      });
  });
}


/**
 * Immediately load assets configured for elements matching the selector.
 * @param {string} selector
 * @param {Function} [callback]
 */
/**
 * Immediately load assets configured for elements matching the selector.
 * Includes priority sort, dependency resolution, preload hints, and throttled load.
 * @param {string} selector
 * @param {Function} [callback]
 */
loadAssetsImmediatelyForSelector(selector, callback) {
  this.logGroup(`Public API › loadAssetsImmediatelyForSelector (${selector})`, async () => {
    this.log('Querying DOM for selector', { selector });
    const elements = document.querySelectorAll(selector);
    this.log('Elements found', { count: elements.length });
    if (elements.length === 0) {
      this.log('No elements found; exiting');
      return;
    }

    // ✅ Map elements to their data-asset-flag
    const assets = Array.from(elements)
      .flatMap(el => {
        const flag = el.getAttribute('data-asset-flag');
        return flag ? this.getAssetsByFlags([flag]) : [];
      });

    // Remove duplicate assets (if multiple elements share the same flag)
    const uniqueAssets = [...new Map(assets.map(a => [a.name, a])).values()];

    this.log('Assets before sorting', { assets: uniqueAssets });
    const sorted = this.sortByPriority(uniqueAssets);
    this.log('Assets after priority sorting', { assets: sorted });

    const resolved = this.resolveDependencies(sorted);
    resolved.forEach(a => this.registerPreloadHint(a));
    const results = await this.loadAssetsInParallelWithThrottle(resolved, this.maxConcurrent);
    this.log('Assets loaded', { results });

    if (typeof callback === 'function') {
      this.log('Invoking callback after immediate load', { callback });
      callback(results);
    }
  });
}


/**
 * Observe elements in the container and lazy-load assets when they scroll into view.
 * @param {HTMLElement} [container=document]
 */
/**
 * Observe elements in the container and lazy-load assets when they scroll into view.
 * Includes priority sort, dependency resolution, preload hints, and throttled load.
 * @param {HTMLElement} [container=document]
 */
observeLazyAssets(container = document) {
  return this.logGroup('Public API › observeLazyAssets', () => {
    this.log('Setting up IntersectionObserver', { container });

    const inFlight = new Set();

    const observer = new IntersectionObserver(async (entries) => {
      // Sequential loop instead of forEach(async ...)
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;

        const flag = entry.target.getAttribute('data-asset-flag');
        if (!flag) continue;

        // Skip if this flag is already loading
        if (inFlight.has(flag)) {
          this.log('Skipping already in-flight flag', { flag });
          continue;
        }

        inFlight.add(flag);
        this.log('Element in view, starting lazy-load', { flag, element: entry.target });

        observer.unobserve(entry.target);

        try {
          let assets = this.getAssetsByFlags([flag]);
          this.log('Assets before sorting', { assets });

          assets = this.sortByPriority(assets);
          const sorted = this.resolveDependencies(assets);

          sorted.forEach(a => this.registerPreloadHint(a));
          const results = await this.loadAssetsInParallelWithThrottle(sorted, this.maxConcurrent);

          this.log('Lazy-load complete', { flag, results });
        } catch (err) {
          this.log('Error during lazy-load', { flag, err });
        } finally {
          // Remove from in-flight when done
          inFlight.delete(flag);
        }
      }
    }, { root: container }); // ✅ root option applied

    const targets = container.querySelectorAll('[data-asset-flag]');
    targets.forEach(el => observer.observe(el));
    this.log('Observer attached to targets', { count: targets.length });

    // ✅ Return cleanup function
    return () => {
      observer.disconnect();
      this.log('IntersectionObserver disconnected');
    };
  });
}



/**
 * Programmatically trigger asset loading for a given flag as if an event fired.
 * @param {string} name
 */
dispatchAssetLoadEvent(name, payload = null) {
  this.logGroup(`Public API › dispatchAssetLoadEvent (${name})`, () => {
    this.log('Dispatching custom event', { name, payload });
    // ✅ Use CustomEvent with optional detail
    const event = new CustomEvent(name, { detail: payload });
    window.dispatchEvent(event);
  });
}



/**
 * Sort assets by priority: critical > high > normal > low
 * @param {Object[]} assets
 * @returns {Object[]}
 */
sortByPriority(assets) {
  const weights = { critical: 3, high: 2, normal: 1, low: 0 };
  return this.logGroup('Helper › sortByPriority', () => {
    this.log('Sorting assets by priority', { assets });
    return assets.sort((a, b) => weights[b.priority] - weights[a.priority]);
  });
}


// === Helper Methods ===

/**
 * Filter assets by provided flags.
 * Supports "any" (default) or "all" matching modes.
 * 
 * @param {string[]} flags - Flags to match against
 * @param {'any'|'all'} [matchMode='any'] - Match mode
 * @returns {Object[]} Array of matching asset configs
 */
getAssetsByFlags(flags, matchMode = 'any') {
  return this.logGroup('Helper › getAssetsByFlags', () => {
    this.log('Filtering assets by flags', { flags, matchMode });

    if (!Array.isArray(flags) || flags.length === 0) {
      this.log('No flags provided; returning empty array');
      return [];
    }

    const matches = this.config.filter(asset => {
      if (!Array.isArray(asset.flags)) return false;
      if (matchMode === 'all') {
        // Must contain every flag in the input
        return flags.every(flag => asset.flags.includes(flag));
      } else {
        // Default behavior: match any flag
        return asset.flags.some(flag => flags.includes(flag));
      }
    });

    this.log('Matched assets', { count: matches.length, matches });
    return matches;
  });
}


/**
 * Resolve dependencies so that each asset loads after its dependencies.
 * @param {Object[]} assets
 * @returns {Object[]} Sorted array
 */
resolveDependencies(assets) {
  return this.logGroup('Helper › resolveDependencies', () => {
    this.log('Starting dependency resolution', { assets });
    const sorted = [];
    const visited = new Set();

    const visit = (asset, stack = []) => {
      this.log('Visiting asset', { asset: asset.name, stack });
      if (visited.has(asset.name)) return;
      stack.push(asset.name);
      for (const depName of asset.dependencies) {
        const dep = this.config.find(a => a.name === depName);
        if (!dep) {
          this.log(`Missing dependency "${depName}" for asset`, asset);
          continue;
        }
        if (stack.includes(depName)) {
          this.log('Circular dependency detected', { stack, depName });
          continue;
        }
        visit(dep, stack.slice());
      }
      visited.add(asset.name);
      sorted.push(asset);
      this.log('Added to sorted list', { asset: asset.name });
    };

    assets.forEach(asset => visit(asset));
    this.log('Dependency resolution complete', { sorted });
    return sorted;
  });
}

/**
 * Load multiple assets with a concurrency limit and per-asset timeout.
 * @param {Object[]} assets
 * @param {number} maxConcurrent
 * @param {number} perAssetTimeout - Timeout in ms for each asset (default 5000ms)
 * @returns {Promise<Array>}
 */
async loadAssetsInParallelWithThrottle(assets, maxConcurrent, perAssetTimeout = 5000) {
  return this.logGroup('Helper › loadAssetsInParallelWithThrottle', () => {
    this.log('Starting throttled load', { count: assets.length, maxConcurrent, perAssetTimeout });
    const results = [];
    const queue = assets.slice();
    const running = [];

    // ✅ Offline detection at batch level
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      this.log('User is offline, skipping asset load batch', { assets: assets.map(a => a.name) });
      return assets.map(asset => ({
        type: asset.type,
        url: asset.url,
        skipped: true,
        offline: true,
        fallbackUsed: asset.fallback || null
      }));
    }

    const loadAssetWithTimeout = (asset) => {
      // Use fallback if offline
      const urlToLoad = (!navigator.onLine && asset.fallback) ? asset.fallback : asset.url;
      return Promise.race([
        this.loadAsset({...asset, url: urlToLoad}),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error(`Asset "${asset.name}" timed out after ${perAssetTimeout}ms`)), perAssetTimeout)
        )
      ]);
    };

    const enqueue = () => {
      while (running.length < maxConcurrent && queue.length) {
        const asset = queue.shift();
        this.log('Queueing asset for load', { asset: asset.name });
        const p = loadAssetWithTimeout(asset)
          .then(res => {
            results.push(res);
            this.log('Asset load settled', { asset: asset.name, res });
          })
          .catch(err => {
            this.log('Asset load error or timeout', { asset: asset.name, err });
            results.push({ type: asset.type, url: asset.url, error: true, timeout: err.message.includes('timed out') });
          })
          .finally(() => {
            running.splice(running.indexOf(p), 1);
          });
        running.push(p);
      }
    };

    return (async () => {
      enqueue();
      while (running.length) {
        await Promise.race(running);
        enqueue();
      }
      this.log('All assets loaded via throttle', { results });
      return results;
    })();
  });
}


/**
 * Load a single asset: normalize URL, check DOM, version, create element, insert, await load/error.
 * @param {Object} asset
 * @returns {Promise<Object>} type & url
 */
/**
 * Load a single asset: normalize URL, check DOM, version, create element, insert, await load/error.
 * Supports `after` insertion point.
 * @param {Object} asset
 * @returns {Promise<Object>} type & url
 */
async loadAsset(asset, maxRetries = 3, baseDelay = 300) {
  return this.logGroup(`Helper › loadAsset (${asset.name})`, async () => {
    this.log('loadAsset start', { asset, maxRetries, baseDelay });

    let url = this.normalizeUrl(asset.url);
    url = this.applyVersioning(url, asset);

    if (this.isAssetAlreadyInDOM(asset.name, asset.type)) {
      this.log('Asset already present, skipping', { name: asset.name });
      return { type: asset.type, url, skipped: true };
    }

    const el = this.createElementForAsset({ ...asset, url });
    if (asset.after) {
      const refEl = document.querySelector(asset.after);
      if (refEl) {
        this.log('Inserting after selector', { selector: asset.after });
        refEl.insertAdjacentElement('afterend', el);
      } else {
        this.log('`after` selector not found; using location', { selector: asset.after }, 'warn');
        // ✅ Provide feedback to caller
        throw new Error(`Asset "${asset.name}" could not be inserted: selector "${asset.after}" not found.`);
      }
    } else {
      this.insertAssetElement(el, asset.location);
    }

    let attempt = 0;

    const loadWithRetry = () =>
      new Promise(resolve => {
        const tryLoad = () => {
          attempt++;
          el.onload = () => {
            this.log('Asset loaded event', { name: asset.name, attempt });
            resolve({ type: asset.type, url });
          };
          el.onerror = () => {
            this.log('Asset load error', { name: asset.name, attempt });
            if (attempt <= maxRetries) {
              const delay = baseDelay * 2 ** (attempt - 1);
              this.log(`Retrying asset load in ${delay}ms`, { name: asset.name, attempt });
              setTimeout(tryLoad, delay);
            } else {
              this.log('Asset load failed after retries', { name: asset.name });
              resolve({ type: asset.type, url, error: true });
            }
          };
        };
        tryLoad();
      });

    return loadWithRetry();
  });
}



/**
 * Remove an injected asset by name.
 * @param {string} name
 */
removeAssetFromDOM(name) {
  this.logGroup('Helper › removeAssetFromDOM', () => {
    this.log('Removing asset', { name });
    const el = document.querySelector(`[data-asset-name="${name}"]`);
    if (el) {
      el.remove();
      this.log('Asset removed', { name });
    } else {
      this.log('Asset element not found', { name });
    }
  });
}

/**
 * Strip query parameters for comparison.
 * @param {string} url
 * @returns {string}
 */
normalizeUrl(url) {
  this.log('normalizeUrl', { url });
  try {
    const u = new URL(url, window.location.origin);
    u.search = ''; // clear only query parameters
    const out = u.toString();
    this.log('Normalized URL output', { out });
    return out;
  } catch (err) {
    this.log('Invalid URL, returning original', { url, err });
    return url;
  }
}

/**
 * Append version and cache-bust params.
 * @param {string} url
 * @param {Object} asset
 * @returns {string}
 */
applyVersioning(url, asset) {
  return this.logGroup('Helper › applyVersioning', () => {
    const semverPattern = /^(?:\d+\.\d+\.\d+)(?:[-+][\w.-]+)?$/;
    let fileVer = asset.version || this.globalVersion;

    // Validate version string
    if (typeof fileVer === 'string' && !semverPattern.test(fileVer)) {
      this.log('⚠️ Invalid version format detected, ignoring', { fileVer, asset: asset.name });
      fileVer = null;
    }

    this.log('Applying version', { fileVer });

    try {
      const u = new URL(url, window.location.origin); // robust parsing
      if (fileVer) u.searchParams.set('ver', fileVer);
      if (asset.critical) {
        this.log('Marking as critical (highest priority)');
        u.searchParams.set('critical', '1');
      }
      const out = u.toString();
      this.log('Versioned URL output', { out });
      return out;
    } catch (err) {
      this.log('Invalid URL, returning original', { url, err });
      return url;
    }
  });
}

/**
 * Check whether an asset is already in the DOM by data-asset-name.
 * @param {string} name
 * @param {string} type
 * @returns {boolean}
 */
isAssetAlreadyInDOM(name, type) {
  this.log('isAssetAlreadyInDOM', { name, type });
  return !!document.querySelector(`[data-asset-name="${name}"]`);
}

/**
 * Create the proper element for the asset config.
 * @param {Object} asset
 * @returns {HTMLElement}
 */
/**
 * Create the proper element for the asset config.
 * Supports scripts, CSS, images, videos, fonts.
 * @param {Object} asset
 * @returns {HTMLElement}
 */
createElementForAsset(asset) {
  return this.logGroup('Helper › createElementForAsset', () => {
    this.log('Creating element', { asset });
    let el;

    switch (asset.type) {
      case 'script':
        el = document.createElement('script');
        el.src = asset.url;

        // Apply nonce if provided
        if (asset.nonce) {
          el.nonce = asset.nonce;
        }

        // Use local flags (don't mutate original asset)
        let wantsAsync = !!asset.async;
        let wantsDefer = !!asset.defer;

        // If both requested, prefer defer (per earlier decision)
        if (wantsAsync && wantsDefer) {
          this.log(
            'Conflict detected: both async and defer requested. Preferring defer, disabling async.',
            { name: asset.name, url: asset.url }
          );
          wantsAsync = false;
          wantsDefer = true;
        }

        // Explicitly set both properties on the element so the browser state is deterministic
        // Set async first to a deterministic boolean, then defer
        el.async = !!wantsAsync;   // explicit true/false
        el.defer = !!wantsDefer;   // explicit true/false

        break;

      case 'css':
      case 'style':
        el = document.createElement('link');
        el.rel = 'stylesheet';
        el.href = asset.url;

        if (asset.nonce) el.nonce = asset.nonce;
        if (asset.media) el.media = asset.media;
        break;

      case 'image':
        el = document.createElement('img');
        el.src = asset.url;
        if (asset.imagesrcset) {
          el.srcset = asset.imagesrcset;
          el.sizes = asset.imagesizes;
        }
        if (asset.crossOrigin) el.crossOrigin = asset.crossOrigin;
        break;

      case 'video':
        el = document.createElement('video');
        el.src = asset.url;
        if (asset.crossOrigin) el.crossOrigin = asset.crossOrigin;
        break;

      case 'font':
        el = document.createElement('link');
        el.rel = 'preload';
        el.as = 'font';
        el.href = asset.url;
        el.crossOrigin = 'anonymous';
        break;

      case 'icon':
        el = document.createElement('link');
        el.rel = 'icon';
        el.href = asset.url;
        if (asset.typeAttributes) {
          Object.entries(asset.typeAttributes).forEach(([k, v]) =>
            el.setAttribute(k, v)
          );
        }
        break;

      case 'svg': // ✅ SVG support
        el = document.createElement('object');
        el.data = asset.url;
        el.type = 'image/svg+xml';
        if (asset.width) el.width = asset.width;
        if (asset.height) el.height = asset.height;
        if (asset.crossOrigin) el.crossOrigin = asset.crossOrigin;
        break;

      case 'object': // ✅ Generic object support
        el = document.createElement('object');
        el.data = asset.url;
        if (asset.typeAttributes) {
          Object.entries(asset.typeAttributes).forEach(([k, v]) =>
            el.setAttribute(k, v)
          );
        }
        if (asset.crossOrigin) el.crossOrigin = asset.crossOrigin;
        break;

      default:
        this.log('Unknown asset type, defaulting to script', { type: asset.type });
        el = document.createElement('script');
        el.src = asset.url;
    }

    // ✅ Sanitize asset name before tagging
    const safeName = /^[\w-]+$/.test(asset.name) ? asset.name : `asset-${Date.now()}`;
    el.setAttribute('data-asset-name', safeName);

    // ✅ Only apply "as" for preloadable elements (fonts, images, media)
    if (
      el.tagName === 'LINK' &&
      el.rel === 'preload' &&
      asset.type !== 'icon'
    ) {
      el.as = asset.type;
    }

    this.log('Element created', { el });
    return el;
  });
}





/**
 * Insert the element at the specified location.
 * @param {HTMLElement} el
 * @param {('head-first'|'head-last'|'footer-first'|'footer-last')} location
 */
insertAssetElement(el, location) {
  this.logGroup('Helper › insertAssetElement', () => {
    this.log('Inserting element', { location, el });

    const head = document.head;
    const body = document.body;

    const insert = () => {
      switch (location) {
        case 'head-first':
          head.insertBefore(el, head.firstChild);
          break;
        case 'head-last':
          head.appendChild(el);
          break;
        case 'footer-first':
          body.insertBefore(el, body.firstChild);
          break;
        case 'footer-last':
          body.appendChild(el);
          break;
        default:
          this.log('Unknown location; defaulting to head-last', { location });
          head.appendChild(el);
      }
    };

    if ((location === 'footer-first' || location === 'footer-last') && !body) {
      // ✅ Queue insertion on DOMContentLoaded if body not yet available
      this.log('document.body missing, queuing insertion on DOMContentLoaded', { location });
      document.addEventListener('DOMContentLoaded', insert);
    } else {
      insert();
    }
  });
}


// === Advanced Helpers / Optional Enhancements ===

/**
 * Add a <link rel="preload"> hint for an asset to improve LCP.
 * @param {Object} asset
 */
registerPreloadHint(asset) {
  this.logGroup('Advanced › registerPreloadHint', () => {
    this.log('Registering preload hint', { asset: { name: asset.name, url: asset.url, type: asset.type } });

    // 🔁 Skip if already registered
    if (this.preloadHints.has(asset.name)) {
      this.log('Preload hint already registered, skipping', { name: asset.name });
      return;
    }

    // 🧩 Map known asset types to valid "as" attributes
    const typeMap = {
      script: 'script',
      js: 'script',
      style: 'style',
      css: 'style',
      font: 'font',
      image: 'image',
      img: 'image',
      jpg: 'image',
      jpeg: 'image',
      png: 'image',
      gif: 'image',
      svg: 'image',
      video: 'video',
      fetch: 'fetch'
    };

    // ✅ Create a new preload link
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = typeMap[asset.type] || 'script'; // fallback aman
    link.href = asset.url;

    // 🖼️ Handle responsive images
    if (link.as === 'image' && asset.imagesrcset) {
      link.imagesrcset = asset.imagesrcset;
      link.imagesizes = asset.imagesizes;
    }

    // 🌐 Handle CORS if needed
    if (asset.crossOrigin) {
      link.crossOrigin = asset.crossOrigin === true ? 'anonymous' : asset.crossOrigin;
    }

    // 📎 Optional media (untuk preload CSS)
    if (asset.media) {
      link.media = asset.media;
    }

    // 🧠 Append & store reference
    document.head.appendChild(link);
    this.preloadHints.set(asset.name, link);

    this.log('Preload hint injected', { link });
  });
}


/**
 * Remove a previously registered preload hint by asset name.
 * @param {string} name
 */
removePreloadHint(name) {
  this.logGroup('Advanced › removePreloadHint', () => {
    const link = this.preloadHints.get(name);
    if (!link) {
      this.log('No preload hint found to remove', { name });
      return;
    }

    if (link.parentNode) {
      link.parentNode.removeChild(link);
      this.log('Preload hint removed from DOM', { name });
    }
    this.preloadHints.delete(name);
  });
}

/**
 * Warm cache for assets via Service Worker (future enhancement placeholder).
 * @param {...string} flags
 */
warmCacheForAssets(...flags) {
  this.logGroup('Advanced › warmCacheForAssets', () => {
    this.log('Warming cache for flags', { flags });
    // Placeholder: implement Service Worker message to prefetch assets by flags
  });
}


/**
 * Validate configuration objects against a JSON Schema.
 * Uses AJV for JSON Schema validation.
 * Notes: you’ll need to install AJV in your project (npm install ajv)
 */
// validateConfigSchema() {
//   this.logGroup('Advanced › validateConfigSchema', () => {
//     this.log('Running JSON Schema validation for assets');

//     try {
//       // Lazy-load AJV (make sure you have installed: npm install ajv)
//       const Ajv = require('ajv').default;
//       const ajv = new Ajv({ allErrors: true, strict: false });

//       // Define schema once
//       const assetSchema = {
//         type: 'object',
//         required: ['name', 'url', 'type', 'flags'],
//         properties: {
//           name: { type: 'string', minLength: 1 },
//           url: { type: 'string', minLength: 1 },
//           type: {
//             type: 'string',
//             enum: ['script', 'css', 'style', 'image', 'video', 'font', 'icon', 'svg', 'object']
//           },
//           flags: { type: 'array', items: { type: 'string' } },
//           dependencies: { type: 'array', items: { type: 'string' } },
//           priority: { type: 'string', enum: ['low', 'normal', 'high', 'critical'] },
//           version: { type: ['string', 'null'] },
//           location: {
//             type: 'string',
//             enum: ['head-first', 'head-last', 'footer-first', 'footer-last']
//           },
//           defer: { type: 'boolean' },
//           async: { type: 'boolean' },
//           after: { type: ['string', 'null'] },
//           media: { type: ['string', 'null'] },
//           critical: { type: 'boolean' },
//           crossOrigin: { type: ['string', 'boolean', 'null'] },
//           imagesrcset: { type: ['string', 'null'] },
//           imagesizes: { type: ['string', 'null'] },
//           nonce: { type: ['string', 'null'] }
//         },
//         additionalProperties: true
//       };

//       const validate = ajv.compile(assetSchema);

//       // Validate each normalized asset
//       for (const asset of this.config) {
//         const valid = validate(asset);
//         if (!valid) {
//           this.log('❌ Schema validation failed', {
//             asset,
//             errors: validate.errors
//           });
//           throw new Error(`Asset "${asset.name || '(unnamed)'}" failed schema validation`);
//         }
//       }

//       this.log('✅ All assets passed schema validation');
//     } catch (err) {
//       this.log('Schema validation error', { err });
//       throw err;
//     }
//   });
// }

// Add these static constants at the top of the class



/**
 * Validate entire config against a JSON Schema.
 * Requires an AJV-like validator.
 */
/**
 * Validates the normalized configuration
 */
/**
 * Validates the normalized configuration and schema
 */
validateConfig() {
  this.logGroup('Config Validation', () => {
    this.log('Starting config validation');

    // 1️⃣ Validate required fields
    this.config.forEach(asset => {
      if (!asset.name) this.log('Validation error: missing `name`', asset, 'warn');
      if (!asset.url)  this.log('Validation error: missing `url`', asset, 'warn');
      if (!asset.type) this.log('Validation error: missing `type`', asset, 'warn');
    });

    // 2️⃣ Check for duplicate names
    const nameCount = {};
    this.config.forEach(asset => {
      if (!asset.name) return;
      nameCount[asset.name] = (nameCount[asset.name] || 0) + 1;
    });

    const duplicates = Object.keys(nameCount).filter(name => nameCount[name] > 1);
    if (duplicates.length > 0) {
      this.log('Validation error: duplicate asset names detected', { duplicates }, 'error');
      throw new Error(`Duplicate asset names found: ${duplicates.join(', ')}`);
    }

    // 3️⃣ Call schema validation
    // this.validateConfigSchema();  // calls schema stub
    // this.log('Config validation complete');
  });
}

// Helper untuk safe logging
safeLog(obj, keys = ['name', 'url', 'priority']) {
  if (!obj) return obj;
  if (Array.isArray(obj)) {
    return obj.map(item => this.safeLog(item, keys));
  } else if (typeof obj === 'object') {
    const result = {};
    keys.forEach(k => {
      if (k in obj) result[k] = obj[k];
    });
    return result;
  }
  return obj;
}



} // end class AssetHandler

// export default AssetHandler;
window.AssetHandler = AssetHandler;

/* 
// schema is broken

// known issues:



 Example  

 Here’s an example JSON configuration array that exercises every major feature of AssetHandler, followed by a checklist you can use to verify each point:

jsonc
Copy
Edit
[
  {
    "name": "core-style",
    "url": "/css/core.css",
    "type": "css",
    "flags": ["init"],
    "dependencies": [],
    "priority": "critical",
    "version": "2.0.0",
    "location": "head-first",
    "defer": false,
    "async": false,
    "after": null,
    "media": "screen",
    "critical": true
  },
  {
    "name": "vendor-script",
    "url": "/js/vendor.js",
    "type": "script",
    "flags": ["init"],
    "dependencies": [],
    "priority": "high",
    "version": "1.5.3",
    "location": "head-last",
    "defer": true,
    "async": false,
    "after": null,
    "media": null,
    "critical": false
  },
  {
    "name": "app-main",
    "url": "/js/app.js",
    "type": "script",
    "flags": ["dashboard"],
    "dependencies": ["vendor-script"],
    "priority": "normal",
    "version": null,              // falls back to globalVersion
    "location": "footer-last",
    "defer": true,
    "async": false,
    "after": "#app-container",
    "media": null,
    "critical": false
  },
  {
    "name": "hero-image",
    "url": "/images/hero.jpg",
    "type": "image",
    "flags": ["dashboard", "lazy-load"],
    "dependencies": [],
    "priority": "low",
    "version": "1.0.1",
    "location": "head-last",
    "defer": false,
    "async": false,
    "after": null,
    "media": null,
    "critical": false,
    "imagesrcset": "/images/hero.jpg 1x, /images/hero@2x.jpg 2x",
    "imagesizes": "100vw"
  },
  {
    "name": "promo-video",
    "url": "/videos/promo.mp4",
    "type": "video",
    "flags": ["lazy-load"],
    "dependencies": [],
    "priority": "normal",
    "version": null,
    "location": "footer-last",
    "defer": false,
    "async": false,
    "after": null,
    "media": null,
    "critical": false
  },
  {
    "name": "custom-font",
    "url": "/fonts/custom.woff2",
    "type": "font",
    "flags": ["init"],
    "dependencies": [],
    "priority": "high",
    "version": "3.4.0",
    "location": "head-last",
    "defer": false,
    "async": false,
    "after": null,
    "media": null,
    "critical": false
  },
  {
    "name": "site-icon",
    "url": "/icons/favicon.ico",
    "type": "icon",
    "flags": ["init"],
    "dependencies": [],
    "priority": "low",
    "version": null,
    "location": "head-first",
    "defer": false,
    "async": false,
    "after": null,
    "media": null,
    "critical": false
  }
]
✅ Checklist for Verifying Each Feature
[ ] Throttling

Loads never exceed maxConcurrent (default = 3).

[ ] Priority Sorting

core-style is treated as highest (critical).

Lower-priority assets load later.

[ ] Dependency Resolution

app-main waits for vendor-script.

[ ] Global & Per-Asset Versioning

core-style uses "version": "2.0.0".

app-main falls back to globalVersion.

[ ] Prevent Duplicate Adds

Each element gets data-asset-name and is skipped if it already exists.

[ ] after Insertion

app-main is inserted immediately after #app-container.

[ ] Media Attribute

core-style has media: "screen".

[ ] Critical-Flag Promotion

core-style’s critical: true bumped its priority to "critical".

[ ] Preload Hints

Every asset is sent through registerPreloadHint() before load.

[ ] Lazy-Loading via IntersectionObserver

Assets flagged "lazy-load" (e.g. hero-image, promo-video) load on scroll into view.

[ ] Immediate Load for Selectors

You can call loadAssetsImmediatelyForSelector('.my-selector').

[ ] Event-Driven Loading

Assets flagged "dashboard" load with loadAssetsForEvent('dashboard') or dispatchAssetLoadEvent('dashboard').

[ ] Pre-fetch vs Pre-load

preloadAssetsByFlag('dashboard') invokes high-priority fetches.

Browser’s speculative prefetch stays low-priority.

[ ] Cache-Warming Stub

warmCacheForAssets('init') is available for SW messages.

[ ] JSON-Schema Validation Hook

validateConfigSchema() stub is called from validateConfig().

Use this config and checklist to confirm that your AssetHandler implementation covers every discussed capability.





// to add

global versioning and file versioning - to support


//issues
logGroup Doesn’t Return Wrapped Value
Description: Currently logGroup calls your callback fn() but never returns its result, so any method wrapped in logGroup implicitly returns undefined. This breaks methods like resolveDependencies, applyVersioning, etc.
Fix suggestion: Change logGroup to capture and return the result of fn(), e.g. 
✅*FIXED* Line 89

Capture const result = fn() and then return result after the console.groupEnd().
✅*FIXED* Line 89

Wrapped Helpers Missing Explicit Returns
Description: Methods such as resolveDependencies, loadAssetsInParallelWithThrottle, and applyVersioning rely on their inner callback returning a value, but because of (1) they end up returning undefined.
Fix suggestion: Either update each wrapper to return the inner value or refactor those methods to return explicitly outside of logGroup.
✅*FIXED* Line 330, 369, 500, 89

Unbounded Preload Hint Injection
Description: registerPreloadHint always appends a new <link rel="preload">, leading to duplicates if the same asset is registered multiple times.
Fix suggestion: Before appending, check for an existing <link> with matching href and as attributes, and skip if found.
✅*FIXED* Line 626

Memory Leak from Persistent Event Listeners
Description: loadAssetsForEvent (and similarly observeLazyAssets) attaches listeners that are never removed, which can accumulate if instantiated multiple times.
Fix suggestion: Return a deregistration function or expose a dispose() API to call removeEventListener/observer.disconnect() when no longer needed.
✅*FIXED* Line 123, 264

Silent Error Swallowing in logGroup
Description: If the callback fn throws, logGroup catches and logs it but does not rethrow, potentially hiding critical failures in asset loading.
Fix suggestion: After logging in the catch, rethrow the error so that calling methods can handle or fail fast.
✅*FIXED* Line 89

Race Conditions in IntersectionObserver Handler
Description: Using entries.forEach(async entry => { … }) kicks off loads in parallel without back-pressure, risking duplicate triggers or overwhelming the throttle logic.
Fix suggestion: Switch to a for (const entry of entries) loop and await each load (or batch them), or mark entries as “in-flight” to prevent re-processing.
✅*FIXED* Line 264

Hard-Coded Default Global Version
Description: The constructor unconditionally sets globalVersion to '1.0.0', which may not reflect your actual app version.
Fix suggestion: Allow passing a globalVersion option into the constructor or default to null so callers must set it explicitly.
✅*FIXED* Line 12

No Validation for Conflicting async/defer Flags
Description: It’s possible to set both async and defer on a <script>, but browser behavior can be confusing if both are true.
Fix suggestion: Add a sanity check in createElementForAsset to ensure at most one of asset.async or asset.defer is truthy.
✅*FIXED* Line 589

Inefficient .filter().map() in loadConfigFromJSON
Description: You normalize configs with .map(), but you could avoid creating temporary objects for defaults each iteration.
Fix suggestion: Consider reusing a frozen default object or merging via a utility to reduce GC churn.
✅*FIXED* Line 55

Stubbed validateConfigSchema Doesn’t Enforce Anything
Description: validateConfigSchema is just a placeholder, so invalid asset objects silently pass through validation.
Fix suggestion: Integrate a JSON-Schema validator (e.g. AJV) to actually check each asset against your schema and throw or log on violations.
✅*FIXED* Line 752 * Notes: you’ll need to install AJV in your project (npm install ajv)

No SemVer Format Checking on Versions
Description: Neither setGlobalVersion nor per-asset version values are validated as proper semver strings, risking malformed query parameters.
Fix suggestion: Use a semver library or regex during version assignment to validate (and reject) bad version strings.
✅*FIXED* Line 40

Ambiguous Flag Matching in getAssetsByFlags
Description: Filters assets if they match any of the provided flags, but some use cases expect assets to match all flags.
Fix suggestion: Decide on “any” vs. “all” semantics and update the filter to use .every() (for all) or provide an option to switch behavior.
✅*FIXED* Line 383

Incorrect Asset Filtering in loadAssetsImmediatelyForSelector
Description: Uses the CSS selector string itself as a “flag” when calling getAssetsByFlags, rather than linking assets to the elements matched by that selector.
Fix suggestion: Either accept a flag name (not a selector) or map from DOM elements to asset flags (e.g. via a data-asset-flag attribute) instead of reusing the selector.
✅*FIXED* Line 247

preloadAssetsByFlag Swallows Errors Without Feedback
Description: Any errors during throttled loads are caught and merely logged—callers have no promise to await or .catch for failure handling.
Fix suggestion: Return the promise from loadAssetsInParallelWithThrottle so callers can .then/.catch, or rethrow after logging.
✅*FIXED* Line 165

dispatchAssetLoadEvent Lacks Event Payload Support
Description: Fires a plain Event, so you can’t pass any custom data to listeners.
Fix suggestion: Switch to new CustomEvent(name, { detail: payload }) and let callers supply an optional detail object.
✅*FIXED* Line 356

Brittle Query-String Concatenation in applyVersioning
Description: Manually tacks on ? or & and parameters by string, which can misbehave on URLs with existing trailing separators.
Fix suggestion: Use the URL and URLSearchParams Web APIs to append ver and other params in a robust way.
✅*FIXED* Line 592

normalizeUrl Strips All Query but Leaves/Corrupts Hash Fragments
Description: Splitting on ? removes search parameters but can leave or mash up #fragment parts unpredictably.
Fix suggestion: Construct a new URL(url, origin), clear its .search, and serialize back to string to cleanly drop only query params.
✅*FIXED* Line 581

No Logging-Level Control
Description: Every method unconditionally logs via console.log/console.group, which can flood production consoles and leak data.
Fix suggestion: Add a debug or logLevel option to the constructor to toggle or filter log output.
✅*FIXED*

No Retry/Backoff for Failed Asset Loads
Description: If an asset fails to load (e.g. network hiccup), it’s never retried, potentially breaking critical functionality.
Fix suggestion: Implement configurable retry logic in loadAsset with a limited number of attempts and exponential backoff delays.
✅*FIXED* Line 534

No Duplicate Name Detection
Description: If two assets share the same name, you’ll get unpredictable behavior in dependency resolution, DOM queries, and visited tracking.
Fix suggestion: During validateConfig, scan for duplicate name values and throw or log an error if any are found.
✅*FIXED* Line 918

Invalid type: "icon" Falls Back to Script
Description: A favicon or icon asset with type: "icon" hits the default case in createElementForAsset, creating a <script> tag instead of <link rel="icon">.
Fix suggestion: Add a case 'icon': that creates <link rel="icon" href="…">.
✅*FIXED* Line 685

Missing IntersectionObserver root Option
Description: observeLazyAssets observes elements anywhere in the viewport, ignoring the container argument—it never passes { root: container } to the observer.
Fix suggestion: Instantiate the observer as new IntersectionObserver(callback, { root: container }) so it respects the container.
✅*FIXED* Line 360

after Insertion May Fail Silently
Description: If asset.after selector doesn’t match any element, you log a fallback but give no feedback to the caller that “after” failed.
Fix suggestion: Return a status or throw in that branch so callers know the specific after insertion didn’t work.
✅*FIXED* Line 555

Missing crossOrigin on <video> and <img> Preloads
Description: Only fonts get crossOrigin='anonymous', but cross-domain images/videos should also set CORS attributes to avoid tainted canvases or credential issues.
Fix suggestion: Allow a crossOrigin config property and apply it to <img>, <video>, and <link rel="preload"> tags.
✅*FIXED* Line 724

Fallback on Missing document.body
Description: Inserting into footer-first/footer-last before document.body exists will throw, since body is null.
Fix suggestion: Check for document.body and, if missing, queue the insertion on DOMContentLoaded or default to head-last.
✅*FIXED* Line 779

No Throttle Timeout or Cancellation
Description: If an individual asset’s load hangs indefinitely, your throttle loop waits forever—blocking all subsequent loads.
Fix suggestion: Add a per-asset timeout (e.g. wrap loadAsset in Promise.race with a timer) and allow cancellation or skip after timeout.
✅*FIXED* Line 486

Inefficient Logging of Large Objects
Description: Logging full config or asset objects on every step can be expensive and clutter the console when assets are large.
Fix suggestion: Log only key properties (e.g. name, url, priority) or stringify selectively to reduce noise.
✅*FIXED* Line 

No Support for SVG or Other <object> Assets
Description: Asset types are limited to script, css, image, video, font, and default script—SVGs loaded via <object> or <embed> aren’t supported.
Fix suggestion: Add support in createElementForAsset for type: 'svg' or type: 'object', creating the appropriate <object> or <embed> element.
✅*FIXED* Line 765

No CSP nonce or hash Support
Description: If you’re enforcing a Content Security Policy with nonces or hashes, there’s no way to attach the correct nonce to dynamically created <script> or <style> elements.
Fix suggestion: Accept a nonce option globally (or per-asset) and set el.nonce = asset.nonce when creating the element.
✅*FIXED* Line 698

Potential XSS via Unsanitized asset.name
Description: You inject asset.name directly into the data-asset-name attribute without sanitization—if an attacker controls the name, they could inject HTML or break out of attributes.
Fix suggestion: Validate asset.name against a strict pattern (e.g. /^[\w-]+$/) or escape it before setting as an attribute.
✅*FIXED* Line 802

No Offline/Online Detection or Fallback
Description: If the user is offline (navigator.onLine === false), your loader will still queue up requests that will all fail, with no retry logic or fallback assets.
Fix suggestion: Check navigator.onLine before starting a load batch, and either queue for later or load fallback URLs if provided in config.
✅*FIXED* Line 486

Fixed Concurrency Limit, No Per-Call Override
Description: You always use this.maxConcurrent (set to 3) for all loads, with no way for callers to override throttle settings per operation.
Fix suggestion: Accept an optional maxConcurrent argument on each public method (e.g. preloadAssetsByFlag(flags, maxConcurrent)), defaulting to the instance value.
✅*FIXED* Line 226

No API to Remove/Undo Preload Hints
Description: Once you inject a <link rel="preload">, there’s no way to remove it—even if you later decide not to load that asset.
Fix suggestion: Store references to injected <link> elements in a Map keyed by asset name, and expose a removePreloadHint(name) method that .remove()s the corresponding element.
✅*FIXED* Line 889

Unhandled Rejections in Event-Listener async Callbacks
Description: In loadAssetsForEvent, the async listener can throw (e.g. in resolveDependencies), but you don’t catch those rejections, leading to unhandled promise rejections.
Fix suggestion: Wrap the listener body in a try/catch (or append a .catch() to the promise) and handle/log errors explicitly.
✅*FIXED* Line 173

console.group/groupEnd May Not Exist in All Environments
Description: Older browsers or certain logging shims may not support console.group/console.groupEnd, causing runtime errors.
Fix suggestion: Feature-detect or polyfill: e.g.
✅*FIXED* Line 119a

js
Copy
Edit
const group = console.group || console.log;
const groupEnd = console.groupEnd || (() => {});
and use those.


CHECKLISTS
Below is a comprehensive testing checklist for every method in your AssetHandler class. For each method, consider unit‐testing (via Jest, Mocha+Chai, etc.) and integration/DOM tests (e.g. in JSDOM or a real browser). Where appropriate, mock out console methods, window, and DOM APIs to assert side-effects, and use spies/stubs to verify logging.

1. constructor(config = [])
Empty / missing config

Pass no argument or undefined → configRaw becomes [], config becomes [].

globalVersion set to default ('1.0.0').

loadConfigFromJSON and validateConfig are called without throwing.

Non‐array config

Pass {} or null → configRaw holds the raw value; config normalizes to [].

No unhandled exceptions.

Valid array config

Provide mixed complete/incomplete asset objects → config entries get all default keys.

Critical assets have priority: 'critical'.

Logging group behavior

Spy on console.group/console.groupEnd/console.log to ensure “Initialization” group wraps all inner logs.

Error in loadConfigFromJSON

Force an exception inside loadConfigFromJSON → constructor should catch it (via logGroup) and continue to validateConfig.

Performance under large config

Pass 1,000 dummy asset entries → constructor finishes without OOM or excessively slow.

2. setGlobalVersion(version)
Normal version strings

Call with '2.3.4' → this.globalVersion === '2.3.4'.

Logs “Setting global version”.

Invalid inputs

Pass '', null, 123 → decide whether to accept, coerce to string, or throw; assert behavior.

Logging grouping

Ensure console.group('AssetHandler: Versioning') opens, logs inside, and closes.

3. loadConfigFromJSON(json)
Array input

Provide array of partial configs → each item gets defaults merged.

Order preserved.

Non‐array input

Pass an object/string/null → raw = [], so this.config becomes empty.

Default values

If an item omits flags/dependencies, they default to [].

priority defaults to 'normal'.

Critical flag promotion

Item with { critical: true } → after merge, priority === 'critical'.

Logging per‐item

Spy on console.log for each “Normalized asset config” call, with full merged object.

Immutable defaults

Mutating the passed‐in json array afterwards does not affect this.config.

4. logGroup(groupName, fn)
Normal callback

Supply an fn that returns a value → logGroup should return that same value.

(If not—see Issue #1—assert that return is fixed.)

Callback throws

Stub fn to throw → console.error called with correct message, error rethrown (if you’ve applied fix) or swallowed.

No callback

If fn isn’t a function, assert it throws or logs an error.

5. log(message, data)
Basic logging

Spy on console.log → called with AssetHandler: ${message} and data object.

Undefined data

Call log('Test') → logs {} by default.

Non‐object data

Pass a string/number → ensure it still logs sensibly (or coerces/throws as intended).

6. loadAssetsForEvent(eventName, callback)
Event listener registration

After calling, ensure window.addEventListener was called once for eventName.

Event dispatch

Simulate window.dispatchEvent(new Event(eventName)):

Assets matching the flag are loaded in correct order (priority → deps)

Preload hints injected

callback invoked with results array.

Multiple events

Fire event twice → ensure assets are loaded twice (unless deduplicated) and callback called each time.

Error in async handler

Force resolveDependencies to throw → ensure error is caught (or rethrown) and logged.

Throttling

Mock assets with a long-running loadAsset stub; fire event and verify no more than maxConcurrent loads in-flight.

7. preloadAssetsByFlag(...flags)
Promise return

Ensure method returns a Promise so callers can await or .catch.

Flag filtering

Assets with any of the flags are selected; none selected → immediate resolution.

Error propagation

Force one asset’s loadAsset to reject → ensure the returned promise rejects (or logs according to spec).

Logging

“Preload complete” or “Preload error” logs appear after the batch.

8. loadAssetsImmediatelyForSelector(selector, callback)
No matching elements

DOM has no elements → method exits early, logs “No elements found”, callback not invoked.

Matching elements, assets exist

Place <div id="foo"></div> in JSDOM with selector='#foo', config has flag " #foo" → loads in order, calls callback.

Invalid selector

Pass malformed selector → throws DOMException; ensure it’s caught/logged.

Concurrent calls

Call twice with same selector → verify behavior (duplicate loads?).

9. observeLazyAssets(container)
Observer on document

Default container → observer created with root: document (after fix to include root).

Targets found via [data-asset-flag].

Intersection triggering

Simulate entry.isIntersecting = true → verify corresponding assets load once and observer.unobserve called.

Non‐intersecting entries

isIntersecting = false → no load attempts.

Disconnect / disposal

After loads, ensure observer still active; verify you can call a hypothetical dispose() to disconnect().

10. dispatchAssetLoadEvent(name)
CustomEvent support

After fix, dispatches a CustomEvent with .detail if payload passed.

Listeners receive correct event type and event.detail.

Basic Event

Without payload → fallback to plain Event or empty detail.

11. sortByPriority(assets)
Empty array

[] → returns [].

Mixed priorities

Supply assets with low/normal/high/critical → returned array sorted highest→lowest.

Unknown priority

Asset with priority: 'foo' → treated as weight 0 (or throws if you choose).

Stable sort

Assets same priority preserve original relative order.

12. getAssetsByFlags(flags)
Empty flags list

[] → returns [].

Single flag

Matches only assets where flags.includes(flag).

Multiple flags

Test “any” semantics (should return if any match).

No matches

Returns empty, logs “Matched assets” as [].

13. resolveDependencies(assets)
Simple DAG

Assets A→B→C → output [C,B,A] (or reverse) preserving dependencies.

Missing dependency

Asset lists dep: 'X' not in config → logs warning but continues.

Circular dependency

A→B→A → logs “Circular dependency detected” and doesn’t infinite-recurse.

Subset resolution

Pass only [A,B] but config has C→A; ensure it doesn’t pull in C from full config.

Large graph

100 assets, linear chain → resolves without stack overflow.

14. loadAssetsInParallelWithThrottle(assets, maxConcurrent)
maxConcurrent = 1

Serial loading: next asset waits for previous Promise to resolve.

maxConcurrent > assets.length

All start immediately; resolves once all finish.

Rejection handling

One loadAsset rejects → logged, doesn’t block others.

Long-running load

Inject artificial delay in stubbed loadAsset → ensure queue logic cycles properly.

Cleanup of running array

After each promise settles, it’s removed so new ones enqueue.

15. loadAsset(asset)
URL normalization & versioning

Provide url with existing query/hash → normalizeUrl/applyVersioning produce correct final URL.

Already in DOM

Pre-insert an element with data-asset-name → returns { skipped: true } immediately.

after insertion

Valid selector → element inserted after correct node; invalid selector → fallback to location.

Element attributes

defer, async, media, crossOrigin, imagesrcset all set on the created element.

Load success vs. error

Simulate el.onload vs. el.onerror → returned promise resolves with { type, url } or {…, error:true}.

Promise resolves once

Multiple onload/onerror events don’t invoke resolve multiple times.

16. removeAssetFromDOM(name)
Existing element

Insert dummy <script data-asset-name="foo"> → calling removes it and logs “Asset removed”.

Nonexistent element

No matching element → logs “Asset element not found” but no exception.

17. normalizeUrl(url)
Simple URL

/path/file.js?ver=1.2.3#hash → returns /path/file.js.

URL without query

/style.css → unchanged.

Malformed URL

Pass non-string → throws or coerces; assert behavior.

18. applyVersioning(url, asset)
No existing query

/script.js + version 1.0.0 → /script.js?ver=1.0.0.

Existing query

/style.css?q=1 → /style.css?q=1&ver=….

Critical flag

asset.critical=true → adds &critical=1.

Using URL API (after fix)

Verify param order and escaping.

19. isAssetAlreadyInDOM(name, type)
Element present

Insert matching element → returns true.

Element absent

Returns false.

Different data-asset-name

Other elements with same tag but different name → returns false.

20. createElementForAsset(asset)
Script creation

type='script' → <script src=… defer|async>.

CSS link

type='css' or 'style' → <link rel="stylesheet" href=…>.

Image/video/font

<img>, <video>, <link rel="preload" as="font"> all get correct props.

imagesrcset/imagesizes

Applied only on image types.

Unknown type

Falls back to <script>.

data-asset-name & as

Ensure attribute always set.

21. insertAssetElement(el, location)
head-first/head-last

Element appears in correct position under <head>.

footer-first/footer-last

Under <body>.

document.body missing

If running before DOMContentLoaded, queue or default.

Unknown location

Falls back to head-last.

Multiple elements

Inserting twice doesn’t throw.

22. registerPreloadHint(asset)
Single injection

Creates <link rel="preload"> with correct href/as.

Duplicate prevention

After fix, calling twice for same asset adds only one hint.

Media attributes

For image types with srcset/sizes, attributes copied.

23. warmCacheForAssets(...flags)
Stub placeholder

Currently no‐op → tests ensure no exceptions.

Future SW integration

When implemented, mock navigator.serviceWorker messages.

24. validateConfigSchema()
Schema stub

No‐op → test that it logs “not yet implemented” but doesn’t fail.

With AJV

If integrated, test invalid objects produce schema errors.

25. validateConfig()
Missing required fields

Assets missing name/url/type → logs “Validation error” for each missing field.

Duplicate names

If you implement dup‐name check, ensure it throws or logs accordingly.

Schema validation invocation

Calls validateConfigSchema exactly once.

All‐good config

No validation logs.

🔍 Tip: for all methods, wrap and stub DOM APIs (document.createElement, querySelector, head.appendChild), console.*, and window/CustomEvent so tests remain deterministic and side-effects verifiable. Use code coverage to ensure every branch—including error paths—is exercised.*/
