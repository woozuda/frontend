import { Http, HttpLibs } from "../lib/http";
import {
  Report4FS,
  ReportDiary,
  ReportKTP,
  ReportPMI,
  ReportSCS,
  RetrospectEnums,
} from "../models/report";

export class ReportAPI {
  http: Http;
  constructor(http: Http) {
    this.http = http;
  }

  async getDiaryAnalysis(start: string, end: string) {
    const searchParams = new URLSearchParams();
    searchParams.set("startDate", start);
    searchParams.set("endDate", end);
    const url = `api/report/diary/analysis?${searchParams}`;

    const response = await this.http.get(url);
    return HttpLibs.toJson<ReportDiary>(response);
  }

  async getReport4FS(start: string, end: string) {
    const searchParams = new URLSearchParams();
    searchParams.set("startDate", start);
    searchParams.set("endDate", end);
    const url = `api/report/recall/4fs?${searchParams}`;

    const response = await this.http.get(url);
    const data = await HttpLibs.toJson<Report4FS>(response);
    data.type = RetrospectEnums.FOUR_FS;

    return data;
  }

  async getReportKTP(start: string, end: string) {
    const searchParams = new URLSearchParams();
    searchParams.set("startDate", start);
    searchParams.set("endDate", end);
    const url = `api/report/recall/ktp?${searchParams}`;

    const response = await this.http.get(url);
    const data = await HttpLibs.toJson<ReportKTP>(response);
    data.type = RetrospectEnums.KPT;

    return data;
  }

  async getReportPMI(start: string, end: string) {
    const searchParams = new URLSearchParams();
    searchParams.set("startDate", start);
    searchParams.set("endDate", end);
    const url = `api/report/recall/pmi?${searchParams}`;

    const response = await this.http.get(url);
    const data = await HttpLibs.toJson<ReportPMI>(response);
    data.type = RetrospectEnums.PMI;

    return data;
  }

  async getReportSCS(start: string, end: string) {
    const searchParams = new URLSearchParams();
    searchParams.set("startDate", start);
    searchParams.set("endDate", end);
    const url = `api/report/recall/scs?${searchParams}`;

    const response = await this.http.get(url);
    const data = await HttpLibs.toJson<ReportSCS>(response);
    data.type = RetrospectEnums.SCS;

    return data;
  }
}
