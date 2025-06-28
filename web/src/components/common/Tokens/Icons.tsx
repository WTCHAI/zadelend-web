// import Image from "next/image";

// Token and network icons (you can replace these with actual URLs)
export const USDT_ICON = "https://tether.to/images/logoCircle.png";
export const ETH_ICON =
  "https://cdn.worldvectorlogo.com/logos/ethereum-eth.svg";
export const SCROLL_ICON = "/chain-light.svg";

export const TokenIcon = ({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) => (
  <div className={`size-6 overflow-hidden ${className}`}>
    <img src={src} alt={alt} className="w-full h-full" />
  </div>
);

export const TokenPairIcon = ({
  baseIcon,
  overlayIcon,
  size = 30,
}: {
  baseIcon: string;
  overlayIcon: string;
  size?: number;
}) => {
  const overlaySize = size * 0.6;

  return (
    <div className="relative rounded-full h-[30px] w-[35px]">
      <img
        src={baseIcon}
        alt="Base Token"
        className="w-full h-full rounded-full object-cover"
      />
      <div
        className="absolute -bottom-1 -right-1 border-2 border-white rounded-full overflow-hidden"
        style={{ width: overlaySize, height: overlaySize }}
      >
        <img
          src={overlayIcon}
          alt="Overlay Token"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};
