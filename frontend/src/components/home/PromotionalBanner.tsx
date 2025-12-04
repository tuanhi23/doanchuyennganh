interface PromotionalBannerProps {
  discount?: string;
  message?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

const PromotionalBanner = ({
  discount = "-50%",
  message = "Giảm giá cực sốc",
  ctaText = "MUA NGAY",
  onCtaClick,
}: PromotionalBannerProps) => {
  return (
    <div className="bg-red-600 text-white text-center py-2 text-sm font-medium">
      <span className="font-bold">{discount}</span> {message} -{" "}
      <span
        className="underline cursor-pointer hover:opacity-80 transition"
        onClick={onCtaClick}
      >
        {ctaText}
      </span>
    </div>
  );
};

export default PromotionalBanner;

