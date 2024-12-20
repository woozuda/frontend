import { Http } from "../lib/http";
import { ReportLibs } from "../lib/report";
import { RetrospectEnums } from "../models/report";

export interface AiCreationPoetryResponse {
  generatedPoetry: string;
  status: string;
  message: string;
}

export interface AiCreationTextResponse {
  generatedText: string;
  status: string;
  message: string;
}

export interface AiCreationImageResponse {
  generatedImageUrl: string;
  status: string;
  message: string;
}

export class ReportAPI {
  http: Http;
  constructor(http: Http) {
    this.http = http;
  }

  async getReportDiary(start: string, end: string) {
    const searchParams = new URLSearchParams();
    searchParams.set("start_date", start);
    searchParams.set("end_date", end);
    const url = `api/report/diary?${searchParams}`;

    const response = await this.http.get(url);
    return response;
  }

  async getReport4FS(start: string, end: string) {
    const searchParams = new URLSearchParams();
    searchParams.set("start_date", start);
    searchParams.set("end_date", end);
    const url = `api/report/recall/4FS?${searchParams}`;

    const response = await this.http.get(url);
    return response;
  }

  async getReportKPT(start: string, end: string) {
    const searchParams = new URLSearchParams();
    searchParams.set("start_date", start);
    searchParams.set("end_date", end);
    const url = `api/report/recall/KTP?${searchParams}`;

    const response = await this.http.get(url);
    return response;
  }

  async getReportPMI(start: string, end: string) {
    const searchParams = new URLSearchParams();
    searchParams.set("start_date", start);
    searchParams.set("end_date", end);
    const url = `api/report/recall/PMI?${searchParams}`;

    const response = await this.http.get(url);
    return response;
  }

  async getReportSCS(start: string, end: string) {
    const searchParams = new URLSearchParams();
    searchParams.set("start_date", start);
    searchParams.set("end_date", end);
    const url = `api/report/recall/SCS?${searchParams}`;

    const response = await this.http.get(url);
    return response;
  }

  async getAiCreation(start: string, end: string) {
    const searchParams = new URLSearchParams();
    searchParams.set("start_date", start);
    searchParams.set("end_date", end);
    const url = `api/creation?${searchParams}`;

    const response = await this.http.get(url);
    return response;
  }

  async createReportDiary(start: string, end: string) {
    const searchParams = new URLSearchParams();
    searchParams.set("start_date", start);
    searchParams.set("end_date", end);
    const url = `api/report/diary/analyze?${searchParams}`;

    const response = await this.http.post(url);
    return response.ok;
  }

  async createReport4FS(start: string, end: string) {
    const searchParams = new URLSearchParams();
    searchParams.set("start_date", start);
    searchParams.set("end_date", end);
    const url = `api/report/recall/analyze/4FS?${searchParams}`;

    const response = await this.http.post(url);
    return response.ok;
  }

  async createReportKPT(start: string, end: string) {
    const searchParams = new URLSearchParams();
    searchParams.set("start_date", start);
    searchParams.set("end_date", end);
    const url = `api/report/recall/analyze/KTP?${searchParams}`;

    const response = await this.http.post(url);
    return response.ok;
  }

  async createReportPMI(start: string, end: string) {
    const searchParams = new URLSearchParams();
    searchParams.set("start_date", start);
    searchParams.set("end_date", end);
    const url = `api/report/recall/analyze/PMI?${searchParams}`;

    const response = await this.http.post(url);
    return response.ok;
  }

  async createReportSCS(start: string, end: string) {
    const searchParams = new URLSearchParams();
    searchParams.set("start_date", start);
    searchParams.set("end_date", end);
    const url = `api/report/recall/analyze/SCS?${searchParams}`;

    const response = await this.http.post(url);
    return response.ok;
  }

  async createAiCreationPoetry(start: string, end: string) {
    const searchParams = new URLSearchParams();
    searchParams.set("start_date", start);
    searchParams.set("end_date", end);
    const url = `api/diary/creation/poetry?${searchParams}`;

    const response = await this.http.post(url);
    return response.ok;
  }

  async createAiCreationWriting(start: string, end: string) {
    const searchParams = new URLSearchParams();
    searchParams.set("start_date", start);
    searchParams.set("end_date", end);
    const url = `api/diary/creation/writing?${searchParams}`;

    const response = await this.http.post(url);
    return response.ok;
  }

  async createAiCreationImage(start: string, end: string) {
    const searchParams = new URLSearchParams();
    searchParams.set("start_date", start);
    searchParams.set("end_date", end);
    const url = `api/diary/creation/picture?${searchParams}`;

    const response = await this.http.post(url);
    return response.ok;
  }

  async getReportCount(start: string, end: string, type: RetrospectEnums) {
    const searchParams = new URLSearchParams();
    searchParams.set("start_date", start);
    searchParams.set("end_date", end);
    const api = `/api/report/recall/${ReportLibs.getApiPath(
      type
    )}/count?${searchParams}`;

    const response = await this.http.get(api);
    const text = await response.text();
    return Number(text.trim());
  }
}
