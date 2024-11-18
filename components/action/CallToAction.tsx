import { CTAEnumLibs, CTAType } from "@/app/lib/cta";
import { cn } from "@/lib/utils";

export interface CallToActionProps {
  text?: string;
  type?: CTAType;

  className?: string;
}

const CallToAction = (props: CallToActionProps) => {
  const { text, type = "default" } = props;

  const className = cn(
    props.className,
    "h-[50px] w-full flex justify-center items-center rounded-md",
    CTAEnumLibs.toBackground(type)
  );
  return (
    <div className={className}>
      <p className="text-white font-normal text-base">{text}</p>
    </div>
  );
};

export default CallToAction;
