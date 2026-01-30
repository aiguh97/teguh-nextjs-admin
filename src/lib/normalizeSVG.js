export function normalizeSvg(svgString) {
  if (!svgString) return "";

  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, "image/svg+xml");
  const svg = doc.querySelector("svg");

  if (!svg) return svgString;

  // Paksa size
  svg.setAttribute("width", "25");
  svg.setAttribute("height", "25");

  // Kalau tidak ada viewBox, bikin dari width/height lama
  if (!svg.getAttribute("viewBox")) {
    const w = svg.getAttribute("width") || 25;
    const h = svg.getAttribute("height") || 25;
    svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
  }

  // Hapus atribut aneh (opsional tapi recommended)
  svg.removeAttribute("style");

  // Convert balik ke string
  return svg.outerHTML;
}
