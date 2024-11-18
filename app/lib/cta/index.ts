export enum CTAType {
  DEFAULT = "default",
  DISABLED = "disabled",
  HOVER = "hover",
}

export class CTAEnumLibs {
  static toBackground(type: CTAEnumLibs) {
    switch (type) {
      case CTAType.DEFAULT: {
        return "bg-gray-800";
      }
      case CTAType.DISABLED: {
        return "bg-gray-800";
      }
      case CTAType.HOVER: {
        return "bg-gray-900";
      }
    }
  }
}
