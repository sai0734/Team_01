import { create } from "zustand";
import axios from "axios";

const useStore = create((set, get) => ({
  // 1. 상태 (state)
  users: [
    {
      userName: "이젠아카데미",
      Id: "qwer",
      Pw: "1234",
      currentLoginState: false,
    },
  ],

  booksList: [
    {
      authors: ["정미나"],
      contents:
        "유튜브 선생님에게 배우는 유·선·배, 〈유선배 SQL개발자 과외노트〉와 함께 2023년 SQLD 합격의 주인공이 되어 보세요!  Step 1. 유튜브 무료 동영상 강의 제공 유튜브에서 ‘SQL전문가 정미나’를 검색해보세요! 저자 직강의 동영상 강의를 무료로 제공합니다. 혼자 공부하기 어려워 도움이 필요할 때, 체계적인 커리큘럼으로 공부하고 싶을 때, 온라인 강의를 무료로 듣고 싶을 때 유선배와 함께 해요!  Step 2. [부록] 시험 전에 꼭",
      datetime: "2023-01-05T00:00:00.000+09:00",
      isbn: "113833409X 9791138334099",
      price: 23000,
      publisher: "시대고시기획",
      sale_price: 20700,
      status: "정상판매",
      thumbnail:
        "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6203728%3Ftimestamp%3D20240424162445",
      title: "2023 유선배 SQL개발자(SQLD) 과외노트",
      translators: [],
      url: "https://search.daum.net/search?w=bookpage&bookId=6203728&q=2023+%EC%9C%A0%EC%84%A0%EB%B0%B0+SQL%EA%B0%9C%EB%B0%9C%EC%9E%90%28SQLD%29+%EA%B3%BC%EC%99%B8%EB%85%B8%ED%8A%B8",
      status: "안 읽은 책",
      readDate: "",
      rating: 4,
      memos: [{ id: 1, content: "잘 모르겠다" }],
    },
    {
      authors: ["길벗알앤디", "김정준"],
      contents:
        "2025 시나공 정보처리기사 필기 기본서는 기출문제를 면밀히 분석함으로써 출제 경향을 완벽하게 반영한 책으로, 매년 개정을 통해 최신 기출문제를 수록하고 있습니다. NCS 학습 모듈을 가이드 삼아 이론에 대한 자세한 설명과 충분한 예제를 더한 후, 기초가 없는 수험생도 이해할 수 있도록 최대한 쉽게 설명했습니다.  ■ 〈시나공〉에서만 만날 수 있는 합격 비법 - 꼼꼼하고 확실한 개념 정리: 철저한 분석으로 출제 개념을 구성하여 확실한 시험 대비",
      datetime: "2024-11-11T00:00:00.000+09:00",
      isbn: "114071144X 9791140711444",
      price: 35000,
      publisher: "길벗",
      sale_price: 31500,
      status: "정상판매",
      thumbnail:
        "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6755420%3Ftimestamp%3D20260317123415",
      title: "2025 시나공 정보처리기사 필기 기본서",
      translators: [],
      url: "https://search.daum.net/search?w=bookpage&bookId=6755420&q=2025+%EC%8B%9C%EB%82%98%EA%B3%B5+%EC%A0%95%EB%B3%B4%EC%B2%98%EB%A6%AC%EA%B8%B0%EC%82%AC+%ED%95%84%EA%B8%B0+%EA%B8%B0%EB%B3%B8%EC%84%9C",
      status: "읽고 있는 책",
      readDate: "",
      rating: 5,
      memos: [
        { id: 1, content: "이론 정리가 잘 되있는거 같다." },
        { id: 2, content: "근데 생각보다 문제는 빈약한거 같기도?" },
      ],
    },
    {
      authors: ["양미석"],
      contents:
        "시시각각 변하는 도쿄를 가장 생생하고 정확하게 담아낸 《리얼 도쿄》의 귀환! 겉핥기식의 내용은 가라! 20여 년간 도쿄를 속속들이 누벼온 저자의 여행 감각과 노하우, 그리고 여행자에게 꼭 필요한 실용적인 정보를 쏙쏙 골라내 한 권의 책으로 빚어냈다. 도쿄가 처음인 사람에게는 더없이 알찬 정보로, 도쿄 좀 여행 한다 싶은 사람에게는 새롭고 신선한 정보로 가득하다. 하지만 많이 소개한다고, 그저 두꺼워진다고 능사가 아니다. 기존 장소들을 철저히 검증",
      datetime: "2024-02-26T00:00:00.000+09:00",
      isbn: "1193080258 9791193080252",
      price: 21000,
      publisher: "한빛라이프",
      sale_price: 18900,
      status: "정상판매",
      thumbnail:
        "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6568557%3Ftimestamp%3D20250201153448",
      title: "리얼 도쿄(2024~2025)",
      translators: [],
      url: "https://search.daum.net/search?w=bookpage&bookId=6568557&q=%EB%A6%AC%EC%96%BC+%EB%8F%84%EC%BF%84%282024%7E2025%29",
      status: "읽은 책",
      readDate: "2026-04-15",
      rating: 1,
      memos: [
        { id: 1, content: "없어진 집들이 너무 많다." },
        { id: 2, content: "얼마 지나지 않았는데 가격도 전부 다른데?" },
        { id: 3, content: "지금은 참고가 안되는 책인거 같음" },
      ],
    },
  ],

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
          {
            ...book,
            status: "안 읽은 책",
            readDate: "",
            rating: null,
            memos: [],
          },
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

  // 회원가입 함수
  addMembership: (userId, userPw, userName) => {
    set((state) => {
      // some() 함수에서 결과를 바로 리턴하려면 중괄호를 빼거나 return을 써야 합니다.
      const isUser = state.users.some((user) => user.Id === userId);

      if (isUser) {
        return state;
      } else {
        return {
          users: [
            ...state.users,
            {
              userName: userName,
              Id: userId,
              Pw: userPw,
              currentLoginState: false,
            },
          ],
        };
      }
    });
  },
}));

export default useStore;
