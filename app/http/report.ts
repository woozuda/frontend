import { Http } from "../lib/http";

export class ReportAPI {
  http: Http;
  constructor(http: Http) {
    this.http = http;
  }

  async getReportDiary(start: string, end: string) {
    const searchParams = new URLSearchParams();
    searchParams.set("startDate", start);
    searchParams.set("endDate", end);
    const url = `api/report/diary?${searchParams}`;

    const response = await this.http.get(url);
    return response;
  }

  async getReport4FS(start: string, end: string) {
    const searchParams = new URLSearchParams();
    searchParams.set("startDate", start);
    searchParams.set("endDate", end);
    const url = `api/report/recall/4FS?${searchParams}`;

    const response = await this.http.get(url);
    return response;
  }

  async getReportKPT(start: string, end: string) {
    const searchParams = new URLSearchParams();
    searchParams.set("startDate", start);
    searchParams.set("endDate", end);
    const url = `api/report/recall/KTP?${searchParams}`;

    const response = await this.http.get(url);
    return response;
  }

  async getReportPMI(start: string, end: string) {
    const searchParams = new URLSearchParams();
    searchParams.set("startDate", start);
    searchParams.set("endDate", end);
    const url = `api/report/recall/PMI?${searchParams}`;

    const response = await this.http.get(url);
    return response;
  }

  async getReportSCS(start: string, end: string) {
    const searchParams = new URLSearchParams();
    searchParams.set("startDate", start);
    searchParams.set("endDate", end);
    const url = `api/report/recall/SCS?${searchParams}`;

    const response = await this.http.get(url);
    return response;
  }

  async createReportDiary(start: string, end: string) {
    const searchParams = new URLSearchParams();
    searchParams.set("startDate", start);
    searchParams.set("endDate", end);
    const url = `api/report/diary/analyze?${searchParams}`;

    const response = await this.http.post(url);
    return response.ok;
  }

  async createReport4FS(start: string, end: string) {
    const searchParams = new URLSearchParams();
    searchParams.set("startDate", start);
    searchParams.set("endDate", end);
    const url = `api/report/recall/analyze/4FS?${searchParams}`;

    const response = await this.http.post(url);
    return response.ok;
  }

  async createReportKPT(start: string, end: string) {
    const searchParams = new URLSearchParams();
    searchParams.set("startDate", start);
    searchParams.set("endDate", end);
    const url = `api/report/recall/analyze/KTP?${searchParams}`;

    const response = await this.http.post(url);
    return response.ok;
  }

  async createReportPMI(start: string, end: string) {
    const searchParams = new URLSearchParams();
    searchParams.set("startDate", start);
    searchParams.set("endDate", end);
    const url = `api/report/recall/analyze/PMI?${searchParams}`;

    const response = await this.http.post(url);
    return response.ok;
  }

  async createReportSCS(start: string, end: string) {
    const searchParams = new URLSearchParams();
    searchParams.set("startDate", start);
    searchParams.set("endDate", end);
    const url = `api/report/recall/analyze/SCS?${searchParams}`;

    const response = await this.http.post(url);
    return response.ok;
  }
}
