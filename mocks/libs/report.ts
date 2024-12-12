import {
  Report4FS,
  ReportDiary,
  ReportKTP,
  ReportPMI,
  ReportSCS,
} from "@/app/models/report";

export class MockReportLibs {
  static createDiaryReport(): ReportDiary {
    return {
      startDate: "2024-12-08",
      endDate: "2024-12-08",
      id: 1,
      place: "주요 장소",
      activity: "주요 활동",
      emotion: "주요감정",
      weather: "주요 날씨에 대한 내 감정",
      weekendAt: 0.0,
      weekendend: 100.0,
      positive: 80.0,
      denial: 20.0,
      suggestion: "제안",
    };
  }

  static createReport4FS(): Omit<Report4FS, "type"> {
    return {
      startDate: "2024-12-08",
      endDate: "2024-12-08",
      id: 1,
      pattern_analysis: "패턴분석",
      positive_behavior: "행동 긍정적",
      improvement_suggest: "개선 제안",
      utilization_tips: "활용 팁",
    };
  }

  static createReportKTP(): Omit<ReportKTP, "type"> {
    return {
      startDate: "2024-12-08",
      endDate: "2024-12-08",
      id: 1,
      strength_analysis: "강점 분석",
      improvement: "개선 사항",
      scalability: "확장 가능성",
    };
  }

  static createReportPMI(): Omit<ReportPMI, "type"> {
    return {
      startDate: "2024-12-08",
      endDate: "2024-12-08",
      id: 1,
      report_id: "레포트 id",
      positive: "긍정 분석 내용",
      minus: "부정 분석 내용",
      interesting: "흥미로운 분석 내용",
      created_at: "2024-11-29T10:00:00",
    };
  }

  static createReportSCS(): Omit<ReportSCS, "type"> {
    return {
      startDate: "2024-12-08",
      endDate: "2024-12-08",
      id: 1,
      start_summary: "summary value",
      start_strength: "strength value",
      start_suggestion: "suggestion value",
      continue_summary: "continue summary value",
      continue_strength: "continue strength value",
      continue_suggestion: "continue suggestion value",
    };
  }
}
