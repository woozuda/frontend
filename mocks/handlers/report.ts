import { http, HttpResponse } from "msw";
import { MockReportLibs } from "../libs/report";

export const handlers = [
  http.get("api/report/diary/analysis", () => {
    return HttpResponse.json(MockReportLibs.createDiaryReport(), {
      status: 200,
    });
  }),
  http.post("api/report/diary/analysis", () => {
    return HttpResponse.json({});
  }),

  http.get("api/report/recall/4fs", () => {
    return HttpResponse.json(MockReportLibs.createReport4FS(), { status: 200 });
  }),
  http.post("api/report/recall/4fs", () => {
    return HttpResponse.json({});
  }),

  http.get("api/report/recall/kpt", () => {
    return HttpResponse.json(MockReportLibs.createReportKPT(), { status: 200 });
  }),
  http.post("api/report/recall/kpt", () => {
    return HttpResponse.json({});
  }),

  http.get("api/report/recall/pmi", () => {
    return HttpResponse.json(MockReportLibs.createReportPMI(), { status: 200 });
  }),
  http.post("api/report/recall/pmi", () => {
    return HttpResponse.json({});
  }),

  http.get("api/report/recall/scs", () => {
    return HttpResponse.json(MockReportLibs.createReportSCS(), { status: 200 });
  }),
  http.post("api/report/recall/scs", () => {
    return HttpResponse.json({});
  }),
];
