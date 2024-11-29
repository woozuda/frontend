export class GNBLibs {
  static getItemStyle(pathname: string, href?: string) {
    if (pathname === href) {
      return {
        background:
          "bg-clip-text bg-gradient-to-r from-primary-01-100 to-primary-01-200 inline-flex",
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
