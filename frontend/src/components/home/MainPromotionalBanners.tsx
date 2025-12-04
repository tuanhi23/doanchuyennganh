import { AiOutlineBook, AiOutlineStar } from "react-icons/ai";

interface Banner {
  title: string;
  subtitle: string;
  badge: string;
  badgeText: string;
  buttonText: string;
  gradientFrom: string;
  gradientTo: string;
  textColor: string;
  buttonBg: string;
  buttonTextColor: string;
  icon: React.ReactNode;
}

const MainPromotionalBanners = () => {
  const banners: Banner[] = [
    {
      title: "SÁCH HOT THÁNG NÀY",
      subtitle: "Giảm giá lên đến 50%",
      badge: "49%",
      badgeText: "Chỉ từ 120K",
      buttonText: "MUA NGAY",
      gradientFrom: "from-red-600",
      gradientTo: "to-red-700",
      textColor: "text-white",
      buttonBg: "bg-white",
      buttonTextColor: "text-red-600",
      icon: <AiOutlineBook className="w-32 h-32 text-white" />,
    },
    {
      title: "SÁCH MỚI NHẤT",
      subtitle: "Cập nhật hàng tuần",
      badge: "GIẢM 50K",
      badgeText: "",
      buttonText: "XEM NGAY",
      gradientFrom: "from-green-600",
      gradientTo: "to-green-700",
      textColor: "text-white",
      buttonBg: "bg-white",
      buttonTextColor: "text-green-600",
      icon: <AiOutlineStar className="w-32 h-32 text-white" />,
    },
  ];

  return (
    <section className="bg-gradient-to-r from-red-50 to-orange-50 border-y-4 border-red-200 py-8 w-full">
      <div className="w-full px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4 max-w-7xl mx-auto">
          {banners.map((banner, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${banner.gradientFrom} ${banner.gradientTo} rounded-xl p-6 ${banner.textColor} relative overflow-hidden`}
            >
              <div className="relative z-10">
                <div className="text-xs uppercase mb-2 opacity-90">
                  Khuyến mãi đặc biệt
                </div>
                <h2 className="text-2xl font-bold mb-2">{banner.title}</h2>
                <p className="text-sm mb-4 opacity-90">{banner.subtitle}</p>
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className={`${banner.buttonBg} ${banner.buttonTextColor} px-3 py-1 rounded font-bold`}
                  >
                    {banner.badge}
                  </span>
                  {banner.badgeText && (
                    <span className="text-sm">{banner.badgeText}</span>
                  )}
                </div>
                <button
                  className={`${banner.buttonBg} ${banner.buttonTextColor} px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition`}
                >
                  {banner.buttonText}
                </button>
              </div>
              <div className="absolute right-0 top-0 opacity-20">
                {banner.icon}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MainPromotionalBanners;

