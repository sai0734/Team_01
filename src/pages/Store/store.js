import { create } from "zustand";
import axios from "axios";

const useStore = create((set, get) => ({
  // 1. 상태 (state)
  booksList: [],

  // 2. 상태 변경 함수 (Actions)

  // 서재에 담기 (기본 별점을 0으로 설정해서 저장)
  addBook: (book) =>
    set((state) => {
      // some() 함수는 boolean 타입의 값을 리턴하며 배열의 요소들중 특정 조건을 만족하는 요소가 하나 이상 있는지 확인하는 배열 함수
      // isExist 변수에 bookList배열 속 객체의 isbn값을 외부에서 입력받은 책의 isbn값과 비교하여 trun or false로 반환
      const isExist = state.booksList.some((item) => item.isbn === book.isbn);
      // true면 즉 동일한 책이 있다면 원래 데이터를 반환
      if (isExist) return state;

      // 동일 책이 없다면 booklist에 기존에 담겨있는 책과 + 전달받은 책을 추가하는데 이때 status와 readDate와 rating과 memos(배열)의 기본값을 추가한다
      return {
        booksList: [
          ...state.booksList,
          { ...book, status: "안 읽은 책", readDate: "", rating: 0, memos: [] },
        ],
      };
    }),

  // 서재에서 삭제
  // 전달받은 책의 isbn값을 store의 bookList를 filter함수로 돌면서 하나씩 같은지 비교한다.
  // 동일한 isbn을 가진 책이 있다면 그 책의(객체)를 빼고 다시 bookList를 생성
  removeBook: (isbn) =>
    set((state) => ({
      booksList: state.booksList.filter((book) => book.isbn !== isbn),
    })),

  // 책 상태 변경
  // 전달받은 책의 isbn값이 bookList에 있다면 즉 책이 담겨 있다면 status의 값을 변경하여 bookList를 생성
  bookState: (isbn, newState) =>
    set((state) => ({
      booksList: state.booksList.map((book) =>
        book.isbn === isbn ? { ...book, status: newState } : book,
      ),
    })),

  // 읽은 날짜 기록
  // 전달받은 책의 isbn값이 bookList에 있다면 즉 책이 담겨 있다면 date의 값을 변경하여 bookList를 생성
  readbook: (isbn, date) =>
    set((state) => ({
      booksList: state.booksList.map((book) =>
        book.isbn === isbn ? { ...book, readDate: date } : book,
      ),
    })),

  // 별점 기록 함수
  // 전달받은 책의 isbn값이 bookList에 있다면 즉 책이 담겨 있다면 rating의 값을 변경하여 bookList를 생성
  updateRating: (isbn, newRating) =>
    set((state) => ({
      booksList: state.booksList.map((book) =>
        book.isbn === isbn ? { ...book, rating: newRating } : book,
      ),
    })),

  // 메모 관련 함수 시작

  // 메모 추가
  // 전달받은 책의 isbn이 기존 booksList에 있는 책과 동일하지 않다면 변경없이 그대로 반환
  // isEditing이라는 변수에 전달받은 memo의 memoId와 booksList의 id가 동일한지 비교한다. 이때 동일한 책이 있다면 isEditing은 true 없으면 false
  // 내부 삼항연산자로 isEditing이 true일때 전달받은 책의 id와 서재 책의 id가 동일하면 전달받은 content를 추가하며 다시 memos를(배열) 생성하고 id가 다르면 기존 memos 그대로 반환
  // isEditing이 false이면 기존 memos와 id는 현 시간의 값을, 전달받은 content값을 추가한다.
  addMemo: (isbn, memoId, content) =>
    set((state) => ({
      booksList: state.booksList.map((book) => {
        // 전달받은 책의 isbn이 map함수로 순회하여 담긴 책과 다르면 변경 없이 그대로 반환
        if (book.isbn !== isbn) return book;
        // 수정하려는 메모의 memoId가 map으로 순회중이 memos에 있는지 확인 (true 또는 false)
        const isEditing = book.memos.some((m) => m.id === memoId);
        // true 즉 동일한 id를 가진 메모가 있다면 기존 meme에 content만 교체
        // false 즉 동일한 id를 가진 메모가 없다면 id를 현재시간으로 부여하고 content를 추가
        const updateMemos = isEditing
          ? book.memos.map((m) => (m.id === memoId ? { ...m, content } : m))
          : [...book.memos, { id: Date.now(), content }];

        return { ...book, memos: updateMemos };
      }),
    })),

  // 메모 삭제
  // 전달받은 책의 isbn과 동일한 책을 booksList에서 찾는데 있다면 기존의 booksList에 있던 책을 그대로 놔두고
  // memoId가 같지 않을 경우 filter함수를 이용하여 해당 memoId와 다른 메모만 골라내어 다시 생성 즉 삭제
  removeMemo: (isbn, memoId) =>
    set((state) => ({
      booksList: state.booksList.map((book) =>
        book.isbn === isbn
          ? { ...book, memos: book.memos.filter((m) => m.id !== memoId) }
          : book,
      ),
    })),

  // AI와의 대화 (제미나이님이 만들어 주심)
}));

export default useStore;
