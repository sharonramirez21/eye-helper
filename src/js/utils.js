export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
} 

export async function loadTemplate(path) {
    const response = await fetch(path);
    const template = await response.text();
    return template;
}

export async function loadHeaderFooter() {
  const currentPath = window.location.pathname.replace(/\\/g, "/");
  const afterSrc = currentPath.split("/src/")[1];

  if (!afterSrc) {
    const headerTem = await loadTemplate(`/assets/partials/header.html`);
    const footerTem = await loadTemplate(`/assets/partials/footer.html`);
  
    renderWithTemplate(headerTem, document.querySelector("#header-content"));
    renderWithTemplate(footerTem, document.querySelector("#footer"));
    document.dispatchEvent(new Event("headerLoaded"));
    return;
  }

  const parts = afterSrc.split("/");  
  const depth = parts.length - 1;      

  const prefix = depth === 1 ? "./" : "../".repeat(depth - 1);

  const headerTem = await loadTemplate(`${prefix}assets/partials/header.html`);
  const footerTem = await loadTemplate(`${prefix}assets/partials/footer.html`);

  renderWithTemplate(headerTem, document.querySelector("#header-content"));
  renderWithTemplate(footerTem, document.querySelector("#footer"));

  document.dispatchEvent(new Event("headerLoaded"));
}
