export enum RetrospectEnums {
  FOUR_FS = "4FS",
  KTP = "KTP",
  PMI = "PMI",
  SCS = "SCS",
}

export interface ReportDiary {
  startDate: string;
  endDate: string;
  id: number;
  place: string;
  activity: string;
  emotion: string;
  weather: string;
  weekendAt: number;
  weekendend: number;
  positive: number;
  denial: number;
  suggestion: string;
}

export interface Report4FS {
  type: RetrospectEnums.FOUR_FS;
  startDate: string;
  endDate: string;
  id: number;
  pattern_analysis: string;
  positive_behavior: string;
  improvement_suggest: string;
  utilization_tips: string;
}

export interface ReportKTP {
  type: RetrospectEnums.KTP;
  startDate: string;
  endDate: string;
  id: number;
  strength_analysis: string;
  improvement: string;
  scalability: string;
}

export interface ReportPMI {
  type: RetrospectEnums.PMI;
  startDate: string;
  endDate: string;
  id: number;
  report_id: string;
  positive: string;
  minus: string;
  interesting: string;
  created_at: string;
}

export interface ReportSCS {
  type: RetrospectEnums.SCS;
  startDate: string;
  endDate: string;
  id: number;
  start_summary: string;
  start_strength: string;
  start_suggestion: string;
  continue_summary: string;
  continue_strength: string;
  continue_suggestion: string;
}
