// /src/utils/assetsLibraryHandler/index.ts
// Simplified: NO env, NO locale. Wait on CONFIG (assets.json), not network asset.
import rawAssets from "./assets.json";
export type AssetType = "icon" | "image" | "video" | "script" | "font" | "link";
type AssetItem = {
  name: string;
  type: AssetType;
  path: string; // flat path only
};
// Cached registry from static import (module system caches this once).
const ASSETS: AssetItem[] = (rawAssets as AssetItem[]) || [];
// Cache for resolved absolute URLs (speeds up repeated lookups).
const CACHE = new Map<string, string>();
function getBase(): string {
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin.replace(/\/$/, "");
  }
  return "https://website.com";
}
function getVersion(): string {
  // Optional cache-buster; keep if you want (?v=...)
  const v: unknown = (typeof window !== "undefined" && (window as any).__ASSET_VERSION__) || "";
  return typeof v === "string" ? v : "";
}
function isExternal(u: string): boolean {
  return /^https?:\/\//i.test(u);
}
function normalizeLeadingSlash(p: string): string {
  return p.startsWith("/") ? p : `/${p}`;
}
function withVersion(url: string, version: string): string {
  if (!version) return url;
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}v=${encodeURIComponent(version)}`;
}
/** :white_check_mark: Returns absolute URL (or "" if not found). */
export function getAsset(name: string, type: AssetType): string {
  const base = getBase();
  const version = getVersion();
  const key = JSON.stringify({ name, type, base, version });
  const hit = CACHE.get(key);
  if (hit) return hit;
  const entry = ASSETS.find(a => a.name === name && a.type === type);
  if (!entry || !entry.path) return "";
  const raw = entry.path;
  if (type === "link") {
    if (isExternal(raw)) {
      CACHE.set(key, raw);
      return raw;
    }
    const absolute = `${base}${normalizeLeadingSlash(raw)}`;
    CACHE.set(key, absolute);
    return absolute;
  }
  if (isExternal(raw)) {
    const externalUrl = withVersion(raw, version);
    CACHE.set(key, externalUrl);
    return externalUrl;
  }
  const absoluteAsset = withVersion(`${base}${normalizeLeadingSlash(raw)}`, version);
  CACHE.set(key, absoluteAsset);
  return absoluteAsset;
}
/** Exists in registry? */
export function hasAsset(name: string, type: AssetType): boolean {
  return ASSETS.some(a => a.name === name && a.type === type);
}
/** Asset or fallback. */
export function getAssetOr(name: string, type: AssetType, fallback = ""): string {
  const u = getAsset(name, type);
  return u || fallback;
}
/** :large_green_square: CONFIG readiness (assets.json is already imported and cached). */
export function assetsConfigReady(): boolean {
  return Array.isArray(ASSETS) && ASSETS.length > 0;
}