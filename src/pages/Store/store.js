import { create } from "zustand";

const useStore = create((set) => ({
  // 1. 상태 (state)
  booksList: [],

  // 2. 상태 변경 함수 (Actions)

  // 서재에 담기 (기본 별점을 0으로 설정해서 저장)
  addBook: (book) =>
    set((state) => {
      const isExist = state.booksList.some((item) => item.isbn === book.isbn);
      if (isExist) return state;

      return {
        booksList: [
          ...state.booksList,
          { ...book, status: "안 읽은 책", readDate: "", rating: 0 },
        ],
      };
    }),

  // 서재에서 삭제
  removeBook: (isbn) =>
    set((state) => ({
      booksList: state.booksList.filter((book) => book.isbn !== isbn),
    })),

  // 책 상태 변경
  bookState: (isbn, newState) =>
    set((state) => ({
      booksList: state.booksList.map((book) =>
        book.isbn === isbn ? { ...book, status: newState } : book,
      ),
    })),

  // 읽은 날짜 기록
  readbook: (isbn, date) =>
    set((state) => ({
      booksList: state.booksList.map((book) =>
        book.isbn === isbn ? { ...book, readDate: date } : book,
      ),
    })),

  // 별점 기록 함수
  updateRating: (isbn, newRating) =>
    set((state) => ({
      booksList: state.booksList.map((book) =>
        book.isbn === isbn ? { ...book, rating: newRating } : book,
      ),
    })),
}));

export default useStore;
