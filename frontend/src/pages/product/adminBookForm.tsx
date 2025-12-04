/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { booksApi } from "../../services/books.service";
import { categoriesApi } from "../../services/categories.service";
import { authorsApi } from "../../services/authors.service";
import { publishersApi } from "../../services/publishers.service";
import { bookCategoriesApi } from "../../services/book_categories.service";
import { bookAuthorsApi } from "../../services/book_authors.service";

type BookFormValues = {
  title: string;
  description?: string;
  price: number;
  stock_quantity: number;
  category_ids: string[];
  author_ids: string[];
  publisher_id: string;
  published_date?: string;
  language?: string;
  cover_image?: File | null;
};

const AdminBookForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const { register, handleSubmit, setValue, reset } = useForm<BookFormValues>();
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [selectedAuthorIds, setSelectedAuthorIds] = useState<string[]>([]);

  // Fetch dropdown data
  const { data: categories } = useQuery(["categories"], categoriesApi.getAll);
  const { data: authors } = useQuery(["authors"], authorsApi.getAll);
  const { data: publishers } = useQuery(["publishers"], publishersApi.getAll);

  // Load existing book data
  const { data: book, isLoading } = useQuery(
    ["admin-book", id],
    () => booksApi.getByID(id as string),
    {
      enabled: isEdit,
    }
  );

  // Load existing categories and authors when editing
  const { data: existingCategories } = useQuery(
    ["book-categories", id],
    () => bookCategoriesApi.getByBook(id as string),
    { enabled: isEdit && !!id }
  );

  const { data: existingAuthors } = useQuery(
    ["book-authors", id],
    () => bookAuthorsApi.getByBook(id as string),
    { enabled: isEdit && !!id }
  );

  // Reset form when book data loads
  useEffect(() => {
    if (book && isEdit) {
      const catIds = existingCategories?.map((c: any) => c.category_id) || [];
      const authIds = existingAuthors?.map((a: any) => a.author_id) || [];

      reset({
        title: book.title || "",
        description: book.description || "",
        price: book.price || 0,
        stock_quantity: book.stock_quantity || 0,
        category_ids: catIds,
        author_ids: authIds,
        publisher_id: book.publisher_id || "",
        published_date: book.published_date
          ? book.published_date.split("T")[0]
          : "",
        language: book.language || "",
      });
      setSelectedCategoryIds(catIds);
      setSelectedAuthorIds(authIds);
      setPreview(book.cover_image || null);
    }
  }, [book, isEdit, reset, existingCategories, existingAuthors]);

  // Handle image upload preview
  const handleImageSelect = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setValue("cover_image", file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle category selection
  const handleCategoryToggle = (categoryId: string) => {
    const newIds = selectedCategoryIds.includes(categoryId)
      ? selectedCategoryIds.filter((id) => id !== categoryId)
      : [...selectedCategoryIds, categoryId];
    setSelectedCategoryIds(newIds);
    setValue("category_ids", newIds);
  };

  // Handle author selection
  const handleAuthorToggle = (authorId: string) => {
    const newIds = selectedAuthorIds.includes(authorId)
      ? selectedAuthorIds.filter((id) => id !== authorId)
      : [...selectedAuthorIds, authorId];
    setSelectedAuthorIds(newIds);
    setValue("author_ids", newIds);
  };

  const mutation = useMutation(
    async (data: any) => {
      const { category_ids = [], author_ids = [], ...bookData } = data;

      // Validation
      if (!category_ids || category_ids.length === 0) {
        throw new Error("Vui lòng chọn ít nhất một danh mục!");
      }

      if (!author_ids || author_ids.length === 0) {
        throw new Error("Vui lòng chọn ít nhất một tác giả!");
      }

      let bookId: string;

      if (isEdit) {
        // Update book
        await booksApi.update(id as string, bookData);
        bookId = id as string;

        // Remove old relationships
        try {
          const oldCategories = await bookCategoriesApi.getByBook(bookId);
          const oldAuthors = await bookAuthorsApi.getByBook(bookId);

          if (oldCategories && Array.isArray(oldCategories)) {
            for (const cat of oldCategories) {
              try {
                await bookCategoriesApi.unlink({
                  book_id: bookId,
                  category_id: cat.category_id,
                });
              } catch (e) {
                console.warn("Failed to unlink category:", e);
              }
            }
          }

          if (oldAuthors && Array.isArray(oldAuthors)) {
            for (const auth of oldAuthors) {
              try {
                await bookAuthorsApi.unlink({
                  book_id: bookId,
                  author_id: auth.author_id,
                });
              } catch (e) {
                console.warn("Failed to unlink author:", e);
              }
            }
          }
        } catch (e) {
          console.warn("Failed to fetch old relationships:", e);
        }
      } else {
        // Create book
        const created = await booksApi.create(bookData);
        bookId = created?.book_id || created?.id || created?.data?.book_id;

        if (!bookId) {
          throw new Error("Không thể lấy ID sách sau khi tạo");
        }
      }

      // Link new categories
      for (const categoryId of category_ids) {
        try {
          await bookCategoriesApi.link({
            book_id: bookId,
            category_id: categoryId,
          });
        } catch (e) {
          console.warn(`Failed to link category ${categoryId}:`, e);
        }
      }

      // Link new authors
      for (const authorId of author_ids) {
        try {
          await bookAuthorsApi.link({
            book_id: bookId,
            author_id: authorId,
          });
        } catch (e) {
          console.warn(`Failed to link author ${authorId}:`, e);
        }
      }

      return { bookId };
    },
    {
      onSuccess: () => {
        navigate("/admin/books");
      },
      onError: (error: any) => {
        alert(error?.message || "Có lỗi xảy ra khi lưu sách.");
      },
    }
  );

  const onSubmit = handleSubmit((data) => mutation.mutate(data));

  if (isEdit && isLoading) {
    return <div>Đang tải thông tin sách...</div>;
  }

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white p-6 rounded-xl shadow max-w-2xl mx-auto"
    >
      <h2 className="font-bold text-lg mb-4">
        {isEdit ? "Cập nhật sách" : "Thêm sách"}
      </h2>

      <div className="space-y-4">
        {/* TITLE */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Tên sách <span className="text-red-500">*</span>
          </label>
          <input
            className="border rounded w-full px-3 py-2 text-sm"
            {...register("title", { required: "Không được bỏ trống" })}
          />
        </div>

        {/* CATEGORIES - Multiple Selection */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Danh mục <span className="text-red-500">*</span> (có thể chọn nhiều)
          </label>
          <div className="border rounded-lg p-3 max-h-40 overflow-y-auto bg-gray-50">
            {categories && categories.length > 0 ? (
              <div className="space-y-2">
                {categories.map((c: any) => (
                  <label
                    key={c.category_id}
                    className="flex items-center gap-2 cursor-pointer hover:bg-white p-2 rounded"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategoryIds.includes(c.category_id)}
                      onChange={() => handleCategoryToggle(c.category_id)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm">{c.name}</span>
                  </label>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">Chưa có danh mục nào</p>
            )}
          </div>
          {selectedCategoryIds.length > 0 && (
            <p className="text-xs text-gray-600 mt-1">
              Đã chọn {selectedCategoryIds.length} danh mục
            </p>
          )}
        </div>

        {/* AUTHORS - Multiple Selection */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Tác giả <span className="text-red-500">*</span> (có thể chọn nhiều)
          </label>
          <div className="border rounded-lg p-3 max-h-40 overflow-y-auto bg-gray-50">
            {authors && authors.length > 0 ? (
              <div className="space-y-2">
                {authors.map((a: any) => (
                  <label
                    key={a.author_id}
                    className="flex items-center gap-2 cursor-pointer hover:bg-white p-2 rounded"
                  >
                    <input
                      type="checkbox"
                      checked={selectedAuthorIds.includes(a.author_id)}
                      onChange={() => handleAuthorToggle(a.author_id)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm">{a.name}</span>
                  </label>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">Chưa có tác giả nào</p>
            )}
          </div>
          {selectedAuthorIds.length > 0 && (
            <p className="text-xs text-gray-600 mt-1">
              Đã chọn {selectedAuthorIds.length} tác giả
            </p>
          )}
        </div>

        {/* PUBLISHER */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Nhà xuất bản <span className="text-red-500">*</span>
          </label>
          <select
            className="border rounded w-full px-3 py-2 text-sm"
            {...register("publisher_id", { required: true })}
          >
            <option value="">-- Chọn --</option>
            {publishers?.map((p: any) => (
              <option key={p.publisher_id} value={p.publisher_id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        {/* PRICE & STOCK */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Giá <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              className="border rounded w-full px-3 py-2 text-sm"
              {...register("price", { required: true, valueAsNumber: true })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Tồn kho <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              className="border rounded w-full px-3 py-2 text-sm"
              {...register("stock_quantity", {
                required: true,
                valueAsNumber: true,
              })}
            />
          </div>
        </div>

        {/* DATE & LANGUAGE */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Ngày xuất bản
            </label>
            <input
              type="date"
              className="border rounded w-full px-3 py-2 text-sm"
              {...register("published_date")}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Ngôn ngữ</label>
            <input
              type="text"
              className="border rounded w-full px-3 py-2 text-sm"
              {...register("language")}
            />
          </div>
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block text-sm font-medium mb-1">Mô tả</label>
          <textarea
            className="border rounded w-full px-3 py-2 text-sm"
            rows={3}
            {...register("description")}
          />
        </div>

        {/* COVER IMAGE */}
        <div>
          <label className="block text-sm font-medium mb-1">Ảnh bìa</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="border rounded w-full px-3 py-2 text-sm"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-40 object-cover rounded mt-2 shadow"
            />
          )}
        </div>

        {/* BUTTONS */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
          >
            {isEdit ? "Lưu thay đổi" : "Thêm mới"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/books")}
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded text-sm"
          >
            Hủy
          </button>
        </div>
      </div>
    </form>
  );
};

export default AdminBookForm;
