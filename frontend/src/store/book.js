import {create} from "zustand";

export const useBookStore = create((set) => ({
    books: [],
    featuredBook: null,
    loading: false,
    error: null,
    setFeaturedBook: (book) => set({ featuredBook: book }),
    setBooks: (books) => set({ books }),
    createBook: async (newBook) => {
        if (!newBook.name || !newBook.image || !newBook.price) {
            return {success: false, message: "All fields are required"};
        }
        const res = await fetch("/api/books/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newBook)
        })
        const data = await res.json();
        set((state) => ({books:[...state.books, data.data]}))
        return { success: true, message: "Book created successfully." };
    },

    fetchBooks: async () => {
    const res = await fetch("/api/books/library");
    const data = await res.json();
    set({books: data.data});
    },

    deleteBook: async (id) => {
        const res = await fetch(`/api/books/${id}`, {
            method: "DELETE"
        });
        const data = await res.json();
        if (!data.success) return {success: false, message: data.message};

        set((state) => ({ // update ui immediately without refreshing
            books: state.books.filter((book) => book._id !== id),
        }));
        return {success: true, message: data.message};
    },

    updateBook: async (id, updatedBook) => {
        const res = await fetch(`/api/books/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedBook),
        });
        const data = await res.json();
        if (!data.success) return {success: false, message: data.message};

        set((state) => ({ // update ui immediately without refreshing
            books: state.books.map((book) => (book._id === id ? data.data : book)),
        }));
        return {success: true, message: data.message};
    },

    fetchFeaturedBook: async () => {
        set({ loading: true, error: null });
        try {
            const res = await fetch("/api/books");
            const data = await res.json();
            
            if (!res.ok) {
                throw new Error(data.message || "Failed to fetch books");
            }

            // Select first book as featured (or implement your own logic)
            const featured = data.data;
            
            set({ 
                featuredBook: featured,
                loading: false 
            });
        } catch (error) {
            console.error("Fetch error:", error);
            set({ 
                error: error.message,
                loading: false,
                featuredBook: null
            });
        }
    }
}))
