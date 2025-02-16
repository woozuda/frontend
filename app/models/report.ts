export enum RetrospectEnums {
  FOUR_F_S = "FOUR_F_S",
  KPT = "KPT",
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
  type: RetrospectEnums.FOUR_F_S;
  startDate: string;
  endDate: string;
  id: number;
  pattern_analysis: string;
  positive_behavior: string;
  improvement_suggest: string;
  utilization_tips: string;
}

export interface ReportKPT {
  type: RetrospectEnums.KPT;
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

export enum AiCreationEnums {
  POETRY = "poetry",
  WRITING = "writing",
  IMAGE = "image",
}

export interface AiCreation {
  start_date: string;
  end_date: string;
  image_url: string;
  text: string;
  id: number;
}

export interface SharedAiCreation {
  total: number;
  sharedAiCreations: [
    {
      start_date: string;
      aiCreations: [
        {
          creationType: string;
          aiCreation: {
            ai_creation_id: number;
            creationType: string;
            start_date: string;
            end_date: string;
            image_url: string;
            text: string;
          };
        }
      ];
    }
  ];
}
