export interface DiaryActiveProps {
  color: {
    from: string;
    to: string;
  };
}

const DiaryActiveSvg = (props: DiaryActiveProps) => {
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
        d="M4.66675 4C4.66675 3.44772 5.11446 3 5.66675 3H7.66675V21H5.66675C5.11446 21 4.66675 20.5523 4.66675 20V4Z"
        fill="url(#paint0_linear_287_3038)"
      />
      <path
        d="M8.66675 3H18.6667C19.7713 3 20.6667 3.89543 20.6667 5V19C20.6667 20.1046 19.7713 21 18.6667 21H8.66675V3Z"
        fill="url(#paint1_linear_287_3038)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_287_3038"
          x1="4.66675"
          y1="3"
          x2="21.756"
          y2="6.43564"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color={color.from} />
          <stop offset="1" stop-color={color.to} />
        </linearGradient>
        <linearGradient
          id="paint1_linear_287_3038"
          x1="4.66675"
          y1="3"
          x2="21.756"
          y2="6.43564"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color={color.from} />
          <stop offset="1" stop-color={color.to} />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default DiaryActiveSvg;
