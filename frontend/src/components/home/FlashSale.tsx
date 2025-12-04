import { useState, useEffect } from "react";
import { AiOutlineRight } from "react-icons/ai";

interface Book {
  book_id: string;
  title: string;
  price: number;
  cover_image: string;
}

interface FlashSaleProps {
  books: Book[];
  onAddToCart: (book: Book) => void;
  discountPercent?: number;
}

const FlashSale = ({
  books,
  onAddToCart,
  discountPercent = 30,
}: FlashSaleProps) => {
  const [flashSaleTime, setFlashSaleTime] = useState({
    hours: 2,
    minutes: 30,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setFlashSaleTime((prev) => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!books || books.length === 0) return null;

  return (
    <section className="bg-white py-6 w-full">
      <div className="w-full">
        <div className="flex items-center justify-between mb-4 max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3">
            <div className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold">
              FLASH SALE
            </div>
            <div className="flex items-center gap-2 text-red-600 font-bold">
              <span className="bg-red-100 px-2 py-1 rounded">
                {String(flashSaleTime.hours).padStart(2, "0")}
              </span>
              <span>:</span>
              <span className="bg-red-100 px-2 py-1 rounded">
                {String(flashSaleTime.minutes).padStart(2, "0")}
              </span>
              <span>:</span>
              <span className="bg-red-100 px-2 py-1 rounded">
                {String(flashSaleTime.seconds).padStart(2, "0")}
              </span>
            </div>
          </div>
          <button className="text-red-600 hover:text-red-700 flex items-center gap-1">
            Xem thêm <AiOutlineRight />
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide w-full px-4">
          {books.map((book) => (
            <div
              key={book.book_id}
              className="min-w-[200px] bg-white border-2 border-red-200 rounded-lg p-4 hover:border-red-400 transition"
            >
              <div className="relative mb-3">
                <img
                  src={book.cover_image || "/no-image.jpg"}
                  alt={book.title}
                  className="w-full h-48 object-cover rounded"
                />
                <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                  -{discountPercent}%
                </div>
              </div>
              <h3 className="text-sm font-semibold mb-2 line-clamp-2">
                {book.title}
              </h3>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-red-600 font-bold">
                  {Math.round(book.price * (1 - discountPercent / 100)).toLocaleString()}đ
                </span>
                <span className="text-gray-400 text-xs line-through">
                  {book.price.toLocaleString()}đ
                </span>
              </div>
              <button
                onClick={() => onAddToCart(book)}
                className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition text-sm font-medium"
              >
                MUA NGAY
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FlashSale;

