import { useAuthStore } from "@/stores/useAuthStore";
import routesJson from "@/router/routeConfig.json";

// --- Normalize path (remove trailing slash, strip query/hash) ---
function normalize(path) {
  return path.replace(/\/+$/, "").split("?")[0].split("#")[0] || "/";
}

// --- Get route config by slug ---
function getRouteBySlug(path) {
  const cleanPath = normalize(path);
  let route = routesJson.find(
    (route) =>
      normalize(route.slug) === cleanPath ||
      (route.dynamicRoute &&
        route.slug.includes("/:") &&
        cleanPath.match(new RegExp(route.slug.replace(/:[^/]+/g, "[^/]+"))))
  );

  // Inherit config from parent (like dashboard)
  if (route?.inheritConfigFromParent) {
    const parentRoute = routesJson.find((r) => r.slug === "/dashboard");
    route = {
      ...parentRoute,
      ...route,
      requiresAuth: parentRoute.requiresAuth,
      redirectIfNotAuth: parentRoute.redirectIfNotAuth,
    };
  }
  return route;
}

// --- Get dependencies from parent routes ---
function getParentRouteDeps(path) {
  const segments = normalize(path).split("/");
  const parents = [];
  while (segments.length > 1) {
    segments.pop();
    const parentPath = segments.join("/") || "/";
    const parent = getRouteBySlug(parentPath);
    if (parent?.inheritConfigFromParent) {
      parents.push(parent);
    }
  }
  return parents.reverse();
}

// --- Main Route Guard ---
export default function routeGuard(to, from, next) {
  const auth = useAuthStore();
  const user = auth.simulate || auth.currentUser;
  if (!user) {
    try {
      const sim = localStorage.getItem("simulate");
      if (sim) user = JSON.parse(sim);
    } catch (e) {
      /* ignore */
    }
  }
  console.log(`[GUARD] Navigation request to "${to.path}" from "${from.path}"`);

  const route = getRouteBySlug(to.path);

  // 0. Enabled/Disabled check
  if (route && route.enabled === false) {
    console.warn(`[GUARD] Route "${to.path}" is disabled → redirect to /404`);
    return next("/404");
  }

  // 1. Route existence check
  if (!route) {
    console.error(`[GUARD] No matching route for "${to.path}" → redirect to /404`);
    return next("/404");
  }

  // 2. Token expiration check
  const now = Math.floor(Date.now() / 1000);
  if (user?.raw?.exp && now >= user.raw.exp) {
    console.log("[GUARD] Token expired -> logging out & redirect to /log-in");
    auth.logout();
    return next("/log-in");
  }

  // 3. Auth checks
  if (route?.requiresAuth) {
    console.log(`[GUARD] Route ${to.path} requires auth`);
    if (!user) {
      console.warn(
        `[GUARD] No user session -> redirect to ${route.redirectIfNotAuth || "/log-in"}`
      );
      return next(route.redirectIfNotAuth || "/log-in");
    }
    console.log(`[GUARD] Auth check passed → user logged in:`, user);
  } else {
    console.log(`[GUARD] Route does not require auth`);
  }

  // 4. Redirect if logged in
  if (route?.redirectIfLoggedIn && user) {
    console.warn(
      `[GUARD] User already logged in -> redirect to ${route.redirectIfLoggedIn}`
    );
    return next(route.redirectIfLoggedIn);
  }

  // 5. Role-based restrictions
  if (
    route.supportedRoles?.length &&
    !["any", "all"].includes(route.supportedRoles[0])
  ) {
    if (!user?.role) {
      console.warn(`[GUARD] User role undefined → redirect to /404`);
      return next("/404");
    }
    console.log(`[GUARD] Route supports roles: ${route.supportedRoles.join(", ")}`);
    if (!route.supportedRoles.includes(user.role)) {
      console.warn(
        `[GUARD] User role "${user.role}" not allowed → redirect to /404`
      );
      return next("/404"); // FIX: redirect to /404 not dashboard anymore
    }
  }

  // 6. Dependencies (parent + self)
  const parentDeps = getParentRouteDeps(to.path);
  const allDeps = [...parentDeps, route];

  for (const r of allDeps) {
    const deps = r.dependencies || {};
    const roleDeps = deps.roles?.[user?.role] || {};

    console.log(
      `[GUARD] 🔎 Checking dependencies for route "${r.slug}" with role="${user?.role}"`
    );

    // Role-based deps
    for (const [key, val] of Object.entries(roleDeps)) {
      const userValue = user?.[key];
      if (val?.required) {
        if (userValue) {
          console.log(
            `[GUARD][PASS] Role-based dep "${key}" required=true, user.${key}=${userValue}`
          );
        } else {
          console.warn(
            `[GUARD][FAIL] Role-based dep "${key}" required=true but missing → redirect to ${val.fallbackSlug || "/404"}`
          );
          if (val.fallbackSlug === to.path || from.path === to.path) {
            console.error("[GUARD] Infinite loop detected → redirect to /404");
            return next("/404");
          }
          return next(val.fallbackSlug || "/404");
        }
      }
    }

    // General deps
    for (const [key, val] of Object.entries(deps)) {
      if (key === "roles") continue;
      const userValue = user?.[key];
      if (val?.required) {
        if (userValue) {
          console.log(
            `[GUARD][PASS] General dep "${key}" required=true, user.${key}=${userValue}`
          );
        } else {
          console.warn(
            `[GUARD][FAIL] General dep "${key}" required=true but missing → redirect to ${val.fallbackSlug || "/404"}`
          );
          if (val.fallbackSlug === to.path || from.path === to.path) {
            console.error("[GUARD] Infinite loop detected → redirect to /404");
            return next("/404");
          }
          return next(val.fallbackSlug || "/404");
        }
      }
    }
  }

  // 7. Infinite loop prevention (generic)
  if (to.path === from.path) {
    console.error(
      `[GUARD] Infinite loop detected when redirecting from "${from.path}" to "${to.path}"`
    );
    return next("/404");
  }

  // 8. Allow navigation
  console.log(`[GUARD] ✅ All checks passed → allow navigation to "${to.path}"`);
  next();
}
