export interface ReportActiveProps {
  color: {
    from: string;
    to: string;
  };
}

const ReportActiveSvg = (props: ReportActiveProps) => {
  const { color } = props;

  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.3335 8C2.3335 7.44772 2.78121 7 3.3335 7H6.8335C7.38578 7 7.8335 7.44772 7.8335 8V21C7.8335 21.5523 7.38578 22 6.8335 22H3.3335C2.78121 22 2.3335 21.5523 2.3335 21V8Z"
        fill="url(#paint0_linear_287_3000)"
      />
      <path
        d="M9.5835 3C9.5835 2.44772 10.0312 2 10.5835 2H14.0835C14.6358 2 15.0835 2.44772 15.0835 3V21C15.0835 21.5523 14.6358 22 14.0835 22H10.5835C10.0312 22 9.5835 21.5523 9.5835 21V3Z"
        fill="url(#paint1_linear_287_3000)"
      />
      <path
        d="M16.8335 11C16.8335 10.4477 17.2812 10 17.8335 10H21.3335C21.8858 10 22.3335 10.4477 22.3335 11V21C22.3335 21.5523 21.8858 22 21.3335 22H17.8335C17.2812 22 16.8335 21.5523 16.8335 21V11Z"
        fill="url(#paint2_linear_287_3000)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_287_3000"
          x1="2.3335"
          y1="2"
          x2="23.4769"
          y2="6.78202"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color.from} />
          <stop offset="1" stopColor={color.to} />
        </linearGradient>
        <linearGradient
          id="paint1_linear_287_3000"
          x1="2.3335"
          y1="2"
          x2="23.4769"
          y2="6.78202"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color.from} />
          <stop offset="1" stopColor={color.to} />
        </linearGradient>
        <linearGradient
          id="paint2_linear_287_3000"
          x1="2.3335"
          y1="2"
          x2="23.4769"
          y2="6.78202"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color.from} />
          <stop offset="1" stopColor={color.to} />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default ReportActiveSvg;
