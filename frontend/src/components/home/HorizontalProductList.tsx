import ProductCard from "./ProductCard";
import SectionHeader from "./SectionHeader";
import { Book } from "../../types";


interface HorizontalProductListProps {
  title: string;
  subtitle?: string;
  books: Book[];
  favorites?: Book[];
  discountPercent?: number;
  showRating?: boolean;
  onToggleFavorite?: (book: Book) => void;
  onAddToCart?: (book: Book) => void;
  onViewDetail?: (id: string) => void;
  bgColor?: string;
}

const HorizontalProductList = ({
  title,
  subtitle,
  books,
  favorites = [],
  discountPercent = 0,
  showRating = false,
  onToggleFavorite,
  onAddToCart,
  onViewDetail,
  bgColor = "bg-gray-50",
}: HorizontalProductListProps) => {
  if (!books || books.length === 0) return null;

  return (
    <section className={`${bgColor} py-8 w-full`}>
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-4 mb-6">
          <SectionHeader title={title} subtitle={subtitle} />
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide w-full px-4">
          {books.map((book) => (
            <div key={book.book_id} className="min-w-[180px]">
              <ProductCard
                book={book}
                isFavorite={favorites.some((f) => f.book_id === book.book_id)}
                discountPercent={discountPercent}
                showRating={showRating}
                onToggleFavorite={
                  onToggleFavorite ? () => onToggleFavorite(book) : undefined
                }
                onAddToCart={
                  onAddToCart ? () => onAddToCart(book) : undefined
                }
                onViewDetail={
                  onViewDetail ? () => onViewDetail(book.book_id) : undefined
                }
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HorizontalProductList;

