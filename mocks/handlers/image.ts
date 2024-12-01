import { http, HttpResponse } from "msw";

const handlers = [
  http.post("/api/image/upload", () => {
    return HttpResponse.json(
      {
        url: "https://picsum.photos/400/400",
      },
      { status: 200 }
    );
  }),
  http.delete("/api/image/delete", () => {
    return HttpResponse.json({}, { status: 200 });
  }),
  http.delete("/api/images/delete", () => {
    return HttpResponse.json({}, { status: 200 });
  }),
];

export { handlers };
