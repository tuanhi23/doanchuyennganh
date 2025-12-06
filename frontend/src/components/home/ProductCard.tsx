import { AiOutlineHeart, AiFillHeart, AiOutlineStar } from "react-icons/ai";
import { Book } from "../../types";


interface ProductCardProps {
  book: Book;
  isFavorite?: boolean;
  discountPercent?: number;
  showRating?: boolean;
  onToggleFavorite?: () => void;
  onAddToCart?: () => void;
  onViewDetail?: () => void;
}

const ProductCard = ({
  book,
  isFavorite = false,
  discountPercent = 20,
  showRating = true,
  onToggleFavorite,
  onAddToCart,
  onViewDetail,
}: ProductCardProps) => {
  const discountedPrice = Math.round(book.price * (1 - discountPercent / 100));

  return (
    <div
      className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer"
      onClick={onViewDetail}
    >
      <div className="relative">
        <img
          src={book.cover_image || "/no-image.jpg"}
          alt={book.title}
          className="w-full h-64 object-cover"
        />
        {onToggleFavorite && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite();
            }}
            className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-red-50 transition"
          >
            {isFavorite ? (
              <AiFillHeart className="text-xl text-red-500" />
            ) : (
              <AiOutlineHeart className="text-xl text-gray-600" />
            )}
          </button>
        )}
        {discountPercent > 0 && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
            -{discountPercent}%
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="text-sm font-semibold mb-2 line-clamp-2 min-h-[40px]">
          {book.title}
        </h3>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-red-600 font-bold text-lg">
            {discountedPrice.toLocaleString()}đ
          </span>
          {discountPercent > 0 && (
            <span className="text-gray-400 text-xs line-through">
              {book.price.toLocaleString()}đ
            </span>
          )}
        </div>
        {showRating && (
          <div className="flex items-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <AiOutlineStar
                key={star}
                className={`text-sm ${
                  star <= 4 ? "text-yellow-400 fill-current" : "text-gray-300"
                }`}
              />
            ))}
          </div>
        )}
        {onAddToCart && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart();
            }}
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition text-sm font-medium"
          >
            Thêm vào giỏ
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;

