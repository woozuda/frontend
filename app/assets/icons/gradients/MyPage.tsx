export interface MyPageActiveProps {
  color: {
    from: string;
    to: string;
  };
}

const MyPageActiveSvg = (props: MyPageActiveProps) => {
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
        d="M12 2C10.9391 2 9.92172 2.42143 9.17157 3.17157C8.42143 3.92172 8 4.93913 8 6C8 7.06087 8.42143 8.07828 9.17157 8.82843C9.92172 9.57857 10.9391 10 12 10C13.0609 10 14.0783 9.57857 14.8284 8.82843C15.5786 8.07828 16 7.06087 16 6C16 4.93913 15.5786 3.92172 14.8284 3.17157C14.0783 2.42143 13.0609 2 12 2ZM17 12H7C6.20435 12 5.44129 12.3161 4.87868 12.8787C4.31607 13.4413 4 14.2044 4 15C4 17.232 4.918 19.02 6.424 20.23C7.906 21.42 9.894 22 12 22C14.106 22 16.094 21.42 17.576 20.23C19.08 19.02 20 17.232 20 15C20 14.2044 19.6839 13.4413 19.1213 12.8787C18.5587 12.3161 17.7956 12 17 12Z"
        fill="url(#paint0_linear_287_3057)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_287_3057"
          x1="4"
          y1="2"
          x2="21.2163"
          y2="5.11507"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color={color.from} />
          <stop offset="1" stop-color={color.to} />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default MyPageActiveSvg;
