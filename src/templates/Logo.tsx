import { AppConfig } from '@/utils/AppConfig';

type ILogoProps = {
  xl?: boolean;
};

const Logo = (props: ILogoProps) => {
  // const size = props.xl ? '44' : '32';
  const fontStyle = props.xl
    ? 'font-semibold text-3xl'
    : 'font-semibold text-xl';

  return (
    <span className={`inline-flex items-center text-gray-900 ${fontStyle}`}>
      <svg
        className="fill-primary-500 "
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        width="44"
        height="44"
        viewBox="0 0 323.000000 272.000000"
        preserveAspectRatio="xMidYMid meet"
      >
        <g transform="translate(0.000000,272.000000) scale(0.100000,-0.100000)">
          <path d="M1485 2475 c-400 -77 -729 -343 -875 -709 -62 -154 -74 -224 -74 -416 0 -147 3 -189 21 -262 110 -434 424 -754 848 -863 33 -8 112 -21 176 -27 265 -27 559 57 779 223 449 339 592 925 347 1424 -166 338 -487 574 -860 635 -85 14 -278 11 -362 -5z m429 -210 c360 -91 634 -376 708 -735 26 -126 21 -328 -12 -439 -131 -453 -563 -754 -1019 -709 -120 11 -203 34 -310 84 -123 58 -202 115 -297 217 -274 293 -339 727 -163 1079 146 292 413 482 741 528 93 13 247 2 352 -25z" />
          <path d="M1310 1345 l0 -765 90 0 90 0 0 765 0 765 -90 0 -90 0 0 -765z" />
          <path d="M1570 1345 l0 -765 240 0 240 0 0 85 0 85 -150 0 -150 0 0 680 0 680 -90 0 -90 0 0 -765z" />
        </g>
      </svg>
      {AppConfig.site_name}
    </span>
  );
};

export { Logo };
