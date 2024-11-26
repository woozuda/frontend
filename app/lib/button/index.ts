export enum AppButtonType {
  DEFAULT = "default",
  DISABLED = "disabled",
  HOVER = "hover",
  PRESSED = "pressed",
}

export class AppButtonEnumLibs {
  static getStyle(type?: AppButtonType) {
    switch (type) {
      case AppButtonType.DEFAULT: {
        return "bg-app-primary-100 text-white";
      }
      case AppButtonType.DISABLED: {
        return "bg-app-primary-300 text-app-gray-600";
      }
      case AppButtonType.HOVER:
      case AppButtonType.PRESSED: {
        return "bg-app-primary-200 text-white";
      }
    }
  }
}
