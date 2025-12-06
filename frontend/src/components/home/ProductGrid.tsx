import ProductCard from "./ProductCard";
import { Book } from "../../types";

interface ProductGridProps {
  books: Book[];
  favorites?: Book[];
  discountPercent?: number;
  columns?: {
    default?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  onToggleFavorite?: (book: Book) => void;
  onAddToCart?: (book: Book) => void;
  onViewDetail?: (id: string) => void;
}

const ProductGrid = ({
  books,
  favorites = [],
  discountPercent = 20,
  columns = { default: 2, sm: 3, md: 4, lg: 5 },
  onToggleFavorite,
  onAddToCart,
  onViewDetail,
}: ProductGridProps) => {
  if (!books || books.length === 0) return null;

  // Map columns to Tailwind classes
  const colMap: { [key: number]: string } = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
  };

  const defaultCols = colMap[columns.default || 2] || "grid-cols-2";
  const smCols = colMap[columns.sm || 3] || "sm:grid-cols-3";
  const mdCols = colMap[columns.md || 4] || "md:grid-cols-4";
  const lgCols = colMap[columns.lg || 5] || "lg:grid-cols-5";

  return (
    <div className={`grid ${defaultCols} ${smCols} ${mdCols} ${lgCols} gap-4`}>
      {books.map((book) => (
        <ProductCard
          key={book.book_id}
          book={book}
          isFavorite={favorites.some((f) => f.book_id === book.book_id)}
          discountPercent={discountPercent}
          onToggleFavorite={
            onToggleFavorite ? () => onToggleFavorite(book) : undefined
          }
          onAddToCart={onAddToCart ? () => onAddToCart(book) : undefined}
          onViewDetail={
            onViewDetail ? () => onViewDetail(book.book_id) : undefined
          }
        />
      ))}
    </div>
  );
};

export default ProductGrid;

