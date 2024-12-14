export class HTMLLibs {
  static createDocument(content: string) {
    const doc = document.createElement("html");
    doc.innerHTML += content;

    return doc;
  }
  static reduceElements(doc: HTMLElement) {
    const children = doc.querySelector("body")?.children;
    if (children) {
      const htmlContent = Array.from(children).reduce((content, element) => {
        if (element.outerHTML.trim().length === 0) {
          return content;
        }
        if (element.outerHTML.includes("script")) {
          return content;
        }
        content += element.outerHTML;
        return content;
      }, "");
      return htmlContent;
    }
  }

  static findThumbnail(doc: HTMLElement) {
    return doc.querySelector("img")?.src;
  }
}
