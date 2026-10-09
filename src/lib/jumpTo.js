// Scroll straight to a position, skipping the page's smooth scrolling (set in
// CSS for in-page anchors). `behavior: "instant"` alone is not reliable across
// browsers, so smooth scrolling is switched off while the jump happens and put
// back a couple of frames later.
export default function jumpTo(top) {
  const root = document.documentElement;
  const previous = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  window.scrollTo(0, top);
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      root.style.scrollBehavior = previous;
    }),
  );
}
