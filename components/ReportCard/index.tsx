import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

export interface ReportTitleProps {
  className?: string;
  title?: string;
}

const ReportTitle = (props: ReportTitleProps) => {
  const { title } = props;
  const className = "text-app-gray-100 text-sub3 " + props.className;

  return <h3 className={className}>{title}</h3>;
};

const ReportSubTitle = (props: ReportTitleProps) => {
  const { title } = props;
  const className = "text-sub4 text-app-gray-100 " + props.className;

  return <h4 className={className}>{title}</h4>;
};

export interface ReportContentProps {
  className?: string;
  text?: string;
}

const ReportContent = (props: ReportContentProps) => {
  const { text } = props;
  const className = cn("text-body2 text-app-gray-500", props.className);

  return <p className={className}>{text}</p>;
};

export interface ReportChipProps {
  className?: string;
  text?: string;
}

const ReportChip = (props: ReportChipProps) => {
  const { text } = props;
  const className = cn(
    "bg-gradient-to-r from-gradient-02-100 to-gradient-02-200 rounded-xl flex justify-center items-center",
    props.className
  );

  return (
    <div className={className}>
      <p className="font-extrabold text-app-gray-1100">{text}</p>
    </div>
  );
};

export interface ReportSuggestionProps {
  suggestions?: { type: string; content: string }[];
  className?: string;
}

const ReportSuggestion = (props: ReportSuggestionProps) => {
  const { suggestions } = props;
  const className = cn("flex flex-col gap-y-4", props.className);

  return (
    <div className={className}>
      {suggestions?.map((suggestion) => {
        return (
          <div key={suggestion.type} className="flex flex-col gap-y-2">
            <div className="flex items-center gap-x-2 h-4">
              <div className="w-0.5 h-full bg-white"></div>
              <h4 className="text-sub4 text-app-gray-300">{suggestion.type}</h4>
            </div>
            <p className="text-body2 text-app-gray-500">{suggestion.content}</p>
          </div>
        );
      })}
    </div>
  );
};

export interface ReportExampleProps {
  className?: string;
  text?: string;
}

const ReportExample = (props: ReportExampleProps) => {
  const { text } = props;
  const className = cn("text-body2 text-app-gray-500", props.className);

  return (
    <p className={className}>
      <span className="text-white rounded-[20px] bg-app-primary-300">예시</span>
      {text}
    </p>
  );
};

export interface ReportProps extends PropsWithChildren {
  className?: string;
}

const ReportContainer = (props: ReportProps) => {
  const { children } = props;
  const className = cn(
    "flex flex-col rounded-xl p-4 bg-app-dim bg-opacity-20 gap-y-3",
    props.className
  );
  return <div className={className}>{children}</div>;
};

const ReportCard = Object.assign(ReportContainer, {
  Title: ReportTitle,
  SubTitle: ReportSubTitle,
  Content: ReportContent,
  Chip: ReportChip,
  Suggestion: ReportSuggestion,
  Example: ReportExample,
});

export default ReportCard;
