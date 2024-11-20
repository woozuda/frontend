export enum CTAType {
  DEFAULT = "default",
  DISABLED = "disabled",
  HOVER = "hover",
}

export class CTAEnumLibs {
  static toBackground(type: CTAEnumLibs) {
    switch (type) {
      case CTAType.DEFAULT: {
        return "bg-app-gray-1200";
      }
      case CTAType.DISABLED: {
        return "bg-app-gray-800";
      }
      case CTAType.HOVER: {
        return "bg-app-gray-1300";
      }
    }
  }
}
