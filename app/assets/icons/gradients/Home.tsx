export interface HomeActiveProps {
  color: {
    from: string;
    to: string;
  };
}

const HomeActiveSvg = (props: HomeActiveProps) => {
  const { color } = props;
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 9.9557C3 9.65289 3.13337 9.36776 3.36 9.18608L11.46 2.69241C11.78 2.43586 12.22 2.43586 12.54 2.69241L20.64 9.18608C20.8666 9.36776 21 9.65289 21 9.9557V20.538C21 21.0693 20.5971 21.5 20.1 21.5H14.25C13.7529 21.5 13.35 21.0693 13.35 20.538V15.7278C13.35 14.9309 12.7456 14.2848 12 14.2848C11.2544 14.2848 10.65 14.9309 10.65 15.7278V20.538C10.65 21.0693 10.2471 21.5 9.75 21.5H3.9C3.40294 21.5 3 21.0693 3 20.538V9.9557Z"
        fill="url(#paint0_linear_287_2981)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_287_2981"
          x1="3"
          y1="2.5"
          x2="22.1244"
          y2="6.59774"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color={color.from} />
          <stop offset="1" stop-color={color.to} />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default HomeActiveSvg;
