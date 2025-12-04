export type UserType = {
    _id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  };
  
  export type StoreType = {
    store_id: string;
    _id: string;
    store_name: string;  
    user_id: string;     
    address: string;     
    image: string;      
    description: string;
    lastUpdated: Date;
  };
  
  export type BookingType = {
    storeId: string;
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    adultCount: number;
    childCount: number;
    checkIn: Date;
    checkOut: Date;
    totalCost: number;
  };
  
  
  export type PaymentIntentResponse = {
    paymentIntentId: string;
    clientSecret: string;
    totalCost: number;
  };

  export type RoomType = {
    
  }

  // ============================================
  // BOOK STORE TYPES
  // ============================================

  export type Book = {
    book_id: string;
    title: string;
    isbn?: string;
    description?: string;
    price: number;
    stock_quantity?: number;
    publisher_id?: string;
    published_date?: string;
    language?: string;
    cover_image?: string;
  };

  export type Author = {
    author_id: string;
    name: string;
    bio?: string;
    birth_date?: string;
    country?: string;
  };

  export type Category = {
    category_id: string;
    name: string;
    description?: string;
  };

  export type Publisher = {
    publisher_id: string;
    name: string;
    address?: string;
    email?: string;
    phone?: string;
  };

  export type User = {
    id_user: string;
    name: string;
    email: string;
    phone?: string;
    role: 'user' | 'admin';
    created_at?: string;
  };

  export type Customer = {
    customer_id: string;
    name: string;
    email: string;
    phone?: string;
    address?: string;
    created_at?: string;
  };

  export type Order = {
    order_id: string;
    customer_id: string;
    order_date?: string;
    status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
    total_amount: number;
    payment_method: 'cash' | 'credit_card' | 'paypal' | 'bank_transfer';
  };

  export type OrderItem = {
    order_item_id: string;
    order_id: string;
    book_id: string;
    quantity: number;
    price: number;
  };

  export type Review = {
    review_id: string;
    book_id: string;
    customer_id: string;
    rating: number;
    comment?: string;
    created_at?: string;
  };

  export type BookAuthor = {
    book_id: string;
    author_id: string;
  };

  export type BookCategory = {
    book_id: string;
    category_id: string;
  };