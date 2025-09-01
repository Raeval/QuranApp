export function scrollToTop(
    selector: string | Element = "body",
    smooth: boolean = false
  ) {
    let el: Element | null;
  
    if (typeof selector === "string") {
      el = document.querySelector(selector);
    } else {
      el = selector;
    }
  
    if (el instanceof HTMLElement) {
      el.scrollTo({
        top: 0,
        behavior: smooth ? "smooth" : "auto",
      });
    } else if (selector === "body") {
      window.scrollTo({
        top: 0,
        behavior: smooth ? "smooth" : "auto",
      });
    }
}