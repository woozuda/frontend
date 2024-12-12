export class GNBLibs {
  static getItemStyle(pathname: string, href?: string) {
    if (href && pathname.includes(href)) {
      return {
        background:
          "bg-clip-text bg-gradient-to-r from-gradient-01-100 to-gradient-01-200 text-transparent",
        text: "text-white text-cap1",
      };
    } else {
      return {
        background: "bg-app-gray-900 bg-clip-text",
        text: "text-app-gray-900 text-cap1",
      };
    }
  }
}
