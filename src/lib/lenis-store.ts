import type Lenis from "lenis";

/** Shared reference to the active Lenis instance (set by <SmoothScroll/>). */
let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  instance = l;
};

export const getLenis = () => instance;
