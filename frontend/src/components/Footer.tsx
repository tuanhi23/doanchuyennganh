import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaGithub, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 border-t border-orange-200 pt-14 pb-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* BRAND */}
        <div>
          <h2 className="text-3xl font-extrabold text-orange-600 mb-4">
            Bookstore
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Kho tri thức – nơi những cuốn sách trở thành giá trị.
          </p>

          {/* SOCIAL */}
          <div className="flex gap-4 mt-6">
            {[FaFacebookF, FaInstagram, FaTwitter, FaGithub].map((Icon, i) => (
              <a
                key={i}
                className="p-2 bg-orange-100 rounded-full hover:bg-orange-200 transition text-orange-600"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* LINKS */}
        <div>
          <h3 className="text-xl font-bold text-orange-600 mb-4">Danh mục</h3>
          <ul className="space-y-2">
            <li><Link to="/books" className="hover:text-orange-600">Sách mới</Link></li>
            <li><Link to="/categories" className="hover:text-orange-600">Thể loại</Link></li>
            <li><Link to="/authors" className="hover:text-orange-600">Tác giả nổi bật</Link></li>
            <li><Link to="/best-seller" className="hover:text-orange-600">Bán chạy</Link></li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h3 className="text-xl font-bold text-orange-600 mb-4">Hỗ trợ</h3>
          <ul className="space-y-2">
            <li><Link to="/privacy-policy" className="hover:text-orange-600">Chính sách bảo mật</Link></li>
            <li><Link to="/terms-of-service" className="hover:text-orange-600">Điều khoản</Link></li>
            <li><Link to="/faq" className="hover:text-orange-600">Câu hỏi thường gặp</Link></li>
            <li><Link to="/contact" className="hover:text-orange-600">Liên hệ hỗ trợ</Link></li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div>
          <h3 className="text-xl font-bold text-orange-600 mb-4">
            Nhận thông báo sách mới
          </h3>
          <p className="text-gray-600 mb-3">
            Đăng ký để nhận tin sách giảm giá & ra mắt.
          </p>

          <div className="flex">
            <input
              type="email"
              placeholder="Email của bạn..."
              className="px-4 py-2 w-full bg-white border border-orange-300 text-gray-900 rounded-l-lg outline-none"
            />
            <button className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-r-lg text-white font-semibold transition">
              Gửi
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-6 border-t border-orange-200 text-center text-gray-500">
        © {new Date().getFullYear()} Bookstore của Nhân Tuấn — Made with ❤️.
      </div>
    </footer>
  );
};

export default Footer;
