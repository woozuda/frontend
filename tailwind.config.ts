// @ts-expect-error 타입 추론이 필요하지 않음
import scrollbarHide from "tailwind-scrollbar-hide";
import type { Config } from "tailwindcss";
import animatePlugin from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        auth: "url('/assets/images/background.png')",
        retrospect: "url('/assets/images/star.png')",
      },
      fontSize: {
        h1: ["24px", { lineHeight: "100%", fontWeight: 700 }],
        h2: ["22px", { lineHeight: "100%", fontWeight: 700 }],
        h3: ["20px", { lineHeight: "100%", fontWeight: 700 }],
        sub1: ["20px", { lineHeight: "100%", fontWeight: 600 }],
        sub2: ["18px", { lineHeight: "100%", fontWeight: 700 }],
        sub3: ["18px", { lineHeight: "100%", fontWeight: 600 }],
        sub4: ["16px", { lineHeight: "100%", fontWeight: 700 }],
        sub5: ["14px", { lineHeight: "100%", fontWeight: 700 }],
        body1: ["18px", { lineHeight: "150%", fontWeight: 400 }],
        body2: ["16px", { lineHeight: "150%", fontWeight: 400 }],
        body3: ["14px", { lineHeight: "150%", fontWeight: 400 }],
        cap1: ["12px", { lineHeight: "160%", fontWeight: 400 }],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        app: {
          primary: {
            "100": "#0A2162",
            "200": "#1C306A",
            "300": "#566797",
            "400": "#425BA3",
          },
          gray: {
            "100": "#F5F7FA",
            "200": "#F0F2F7",
            "300": "#E9ECF5",
            "400": "#DFE4F0",
            "500": "#CCD3E0",
            "600": "#BCC3D1",
            "700": "#A0ABBD",
            "800": "#8A909E",
            "900": "#606570",
            "1000": "#2F3441",
            "1100": "#171B24",
            "1200": "#020305",
          },
          border: {
            "100": "#DADADA",
            "200": "#D6D6D6",
          },
          blue: {
            "100": "#5AC6F4",
            "200": "#062271",
          },
          pink: {
            "100": "#FFC3DF",
          },
          red: {
            "100": "#E62828",
          },
          dim: "#000000",
        },
        gradient: {
          "01": {
            "100": "#5AC6F4",
            "200": "#FFC3DF",
          },
          "02": {
            "100": "rgba(90, 198, 244, 0.7)",
            "200": "rgba(255, 195, 223, 0.7)",
          },
          "03": {
            "100": "#334E98",
            "200": "#041135",
            "300": "#062271",
          },
        },
        kpt: "#DAF7FF",
        pmi: "#E3F1FF",
        fs: "#E5E4FF",
        scs: "#FFDCEC",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        hans: ['"Black Han Sans"'],
        start: ['"Press Start 2P"'],
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  safelist: ["bg-kpt", "bg-pmi", "bg-fs", "bg-scs"],
  plugins: [animatePlugin, scrollbarHide],
};
export default config;
