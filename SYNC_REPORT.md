# BÁO CÁO ĐỒNG BỘ DỮ LIỆU: Frontend - Backend - book.sql

## 📋 TỔNG QUAN

Đã kiểm tra sự đồng bộ giữa:
- **Database Schema** (book.sql)
- **Backend Models** (Node.js/Express)
- **Frontend Types & Services** (TypeScript/React)

---

## ✅ CÁC PHẦN ĐỒNG BỘ ĐÚNG

### 1. **Books (Sách)**
- ✅ Database: `book_id`, `title`, `isbn`, `description`, `price`, `stock_quantity`, `publisher_id`, `published_date`, `language`, `cover_image`
- ✅ Backend Model: Khớp với database
- ✅ Frontend: Sử dụng đúng các trường trong BookCard, BookDetail, Home

### 2. **Authors (Tác giả)**
- ✅ Database: `author_id`, `name`, `bio`, `birth_date`, `country`
- ✅ Backend Model: Khớp với database
- ✅ Frontend: Service và components sử dụng đúng

### 3. **Categories (Danh mục)**
- ✅ Database: `category_id`, `name`, `description`
- ✅ Backend Model: Khớp với database
- ✅ Frontend: Service và components sử dụng đúng

### 4. **Publishers (Nhà xuất bản)**
- ✅ Database: `publisher_id`, `name`, `address`, `email`, `phone`
- ✅ Backend Model: Khớp với database
- ✅ Frontend: Service và components sử dụng đúng

### 5. **Orders (Đơn hàng)**
- ✅ Database: `order_id`, `customer_id`, `order_date`, `status`, `total_amount`, `payment_method`
- ✅ Backend Model: Khớp với database

### 6. **Order Items (Chi tiết đơn hàng)**
- ✅ Database: `order_item_id`, `order_id`, `book_id`, `quantity`, `price`
- ✅ Backend Model: Khớp với database

### 7. **Customers (Khách hàng)**
- ✅ Database: `customer_id`, `name`, `email`, `phone`, `address`, `created_at`
- ✅ Backend Model: Khớp với database

### 8. **Reviews (Đánh giá)**
- ✅ Database: `review_id`, `book_id`, `customer_id`, `rating`, `comment`, `created_at`
- ✅ Backend Model: Khớp với database

### 9. **Book_Authors (Quan hệ sách-tác giả)**
- ✅ Database: `book_id`, `author_id`
- ✅ Backend Model: Khớp với database

### 10. **Book_Categories (Quan hệ sách-danh mục)**
- ✅ Database: `book_id`, `category_id`
- ✅ Backend Model: Khớp với database

---

## ❌ CÁC VẤN ĐỀ KHÔNG ĐỒNG BỘ

### 🔴 **VẤN ĐỀ NGHIÊM TRỌNG 1: Users Model - Thiếu trường `address`**

**Vị trí:** `backend/src/models/users.js`

**Vấn đề:**
- Backend model đang cố gắng sử dụng trường `address` trong các hàm:
  - `getAll()`: SELECT bao gồm `address` (dòng 7)
  - `create()`: INSERT bao gồm `address` (dòng 41)
  - `update()`: UPDATE bao gồm `address` (dòng 54, 62)

**Database Schema (book.sql):**
```sql
CREATE TABLE `users` (
  `id_user` char(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  ...
)
```
❌ **KHÔNG có trường `address` trong bảng `users`**

**Hậu quả:**
- Lỗi SQL khi gọi `getAll()` - cột `address` không tồn tại
- Lỗi SQL khi `create()` user với `address`
- Lỗi SQL khi `update()` user với `address`

**Giải pháp:** Xóa tất cả tham chiếu đến `address` trong `users.js` hoặc thêm cột `address` vào bảng `users` trong database.

---

### 🟡 **VẤN ĐỀ 2: Frontend types.ts - Không liên quan đến Book Store**

**Vị trí:** `frontend/src/types.ts`

**Vấn đề:**
- File `types.ts` chứa các type cho hệ thống **hotel booking** (UserType, StoreType, BookingType, PaymentIntentResponse, RoomType)
- **KHÔNG có** các type cho Book Store như:
  - `Book`
  - `Author`
  - `Category`
  - `Publisher`
  - `Order`
  - `Customer`
  - `Review`
  - `User`

**Hiện trạng:**
- Frontend đang định nghĩa các interface trực tiếp trong components (BookCard.tsx, BookDetail.tsx, Home.tsx)
- Không có file type tập trung cho Book Store

**Giải pháp:** 
- Tạo các type definitions đúng cho Book Store trong `types.ts`
- Hoặc tạo file mới `book-store.types.ts`

---

### 🟡 **VẤN ĐỀ 3: Users Model - Tham số không khớp trong create()**

**Vị trí:** `backend/src/models/users.js` - Hàm `create()`

**Vấn đề:**
```javascript
create: async (data) => {
  const sql = `
    INSERT INTO users (id_user, name, email, password, phone, role)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const [result] = await db.execute(sql, [
    data.id_user,
    data.name,
    data.email,
    data.password,
    data.phone || null,
    data.address || null,  // ❌ Tham số thứ 6 là address nhưng SQL không có
    data.role || "user",   // ❌ Tham số thứ 7 nhưng SQL chỉ có 6 placeholder
  ]);
  return result;
}
```

**SQL có 6 placeholder nhưng truyền 7 tham số:**
- SQL: `(id_user, name, email, password, phone, role)` = 6 trường
- Params: `[id_user, name, email, password, phone, address, role]` = 7 giá trị

**Hậu quả:** Lỗi SQL khi tạo user mới.

---

## 📊 TÓM TẮT

| Thành phần | Trạng thái | Ghi chú |
|------------|-----------|---------|
| Books | ✅ Đồng bộ | Hoàn toàn khớp |
| Authors | ✅ Đồng bộ | Hoàn toàn khớp |
| Categories | ✅ Đồng bộ | Hoàn toàn khớp |
| Publishers | ✅ Đồng bộ | Hoàn toàn khớp |
| Orders | ✅ Đồng bộ | Hoàn toàn khớp |
| Order Items | ✅ Đồng bộ | Hoàn toàn khớp |
| Customers | ✅ Đồng bộ | Hoàn toàn khớp |
| Reviews | ✅ Đồng bộ | Hoàn toàn khớp |
| Book_Authors | ✅ Đồng bộ | Hoàn toàn khớp |
| Book_Categories | ✅ Đồng bộ | Hoàn toàn khớp |
| **Users** | ❌ **KHÔNG ĐỒNG BỘ** | **Có lỗi nghiêm trọng** |
| Frontend Types | ⚠️ **Thiếu** | Cần định nghĩa types cho Book Store |

---

## 🔧 KHUYẾN NGHỊ SỬA LỖI

### Ưu tiên cao (Critical):
1. **Sửa `backend/src/models/users.js`:**
   - Xóa tất cả tham chiếu đến `address` trong SELECT, INSERT, UPDATE
   - Sửa hàm `create()` để số tham số khớp với SQL

### Ưu tiên trung bình:
2. **Tạo types cho Frontend:**
   - Thêm các type definitions cho Book Store vào `types.ts`
   - Hoặc tạo file `book-store.types.ts` mới

---

## 📝 CHI TIẾT LỖI Users Model

### File: `backend/src/models/users.js`

**Dòng 7:** 
```javascript
"SELECT id_user, name, email, phone, address, role, created_at FROM users"
```
❌ Cột `address` không tồn tại trong database

**Dòng 32-43 (create function):**
```javascript
const sql = `
  INSERT INTO users (id_user, name, email, password, phone, role)
  VALUES (?, ?, ?, ?, ?, ?)
`;
const [result] = await db.execute(sql, [
  data.id_user,
  data.name,
  data.email,
  data.password,
  data.phone || null,
  data.address || null,  // ❌ Tham số thứ 6 sai
  data.role || "user",   // ❌ Tham số thứ 7 nhưng SQL chỉ có 6 placeholder
]);
```
❌ SQL có 6 placeholder nhưng truyền 7 tham số

**Dòng 48-66 (update function):**
```javascript
const sql = `
  UPDATE users
  SET name = COALESCE(?, name),
      email = COALESCE(?, email),
      phone = COALESCE(?, phone),
       address = COALESCE(?, address),  // ❌ Cột không tồn tại
      role = COALESCE(?, role)
  WHERE id_user = ?
`;
const [result] = await db.execute(sql, [
  data.name ?? null,
  data.email ?? null,
  data.phone ?? null,
  data.address ?? null,  // ❌ Tham số không cần thiết
  data.role ?? null,
  id,
]);
```
❌ Cố gắng UPDATE cột `address` không tồn tại

---

**Ngày kiểm tra:** $(date)
**Phiên bản:** 1.0

