interface SmallPromoBannersProps {
  count?: number;
}

const SmallPromoBanners = ({ count = 4 }: SmallPromoBannersProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-lg p-4 border-2 border-red-200 hover:border-red-400 transition cursor-pointer"
        >
          <div className="text-center">
            <div className="text-red-600 font-bold text-lg mb-1">33%</div>
            <div className="text-xs text-gray-600">Giảm giá</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SmallPromoBanners;

