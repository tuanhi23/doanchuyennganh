import { AiOutlineRight } from "react-icons/ai";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  showViewMore?: boolean;
  viewMoreText?: string;
  onViewMore?: () => void;
}

const SectionHeader = ({
  title,
  subtitle,
  showViewMore = true,
  viewMoreText = "Xem thêm",
  onViewMore,
}: SectionHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        {subtitle && (
          <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
        )}
      </div>
      {showViewMore && (
        <button
          onClick={onViewMore}
          className="text-red-600 hover:text-red-700 flex items-center gap-1"
        >
          {viewMoreText} <AiOutlineRight />
        </button>
      )}
    </div>
  );
};

export default SectionHeader;

