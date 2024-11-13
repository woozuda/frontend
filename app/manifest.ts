import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "우주다 Woozuda",
    short_name: "Woozuda",
    start_url: "/",
    display: "standalone",
    theme_color: "#062271",
    background_color: "#000000",
    icons: [
      {
        src: "assets/icons/icon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "assets/icons/icon-180x180.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "assets/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "assets/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
