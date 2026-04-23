import React, { useState } from "react";
import "./MemoSection.scss";
import useStore from "../Store/store";

const MemoSection = ({ isbn }) => {
  // textarea에 적은 value값이 text에 저장
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);

  // 스토어에서 해당 함수들 가져오기
  const { booksList, addMemo, removeMemo } = useStore();

  // find 함수는 주어진 배열에서 콜백 함수의 조건을 만족하는 첫 번째 요소를 반환
  // 즉 props로 받아온 isbn값이 store의 서재에 있는지 확인하고 있으면 currentBook에 담는다.
  const currentBook = booksList.find((b) => b.isbn === isbn);

  // currentBook에 즉 서재에 책이(isbn) 담겨있으면 거기서 memos 배열을 불러오고 아니면 빈배열
  // store에 booksList배열 속에 객체로 책의 정보가 담겨있고 객체속 memos라는 배열 속에 memo가 있다.
  const memos = currentBook ? currentBook.memos : [];

  const handleSave = () => {
    // text 즉 내용이 비어있다면 중단
    if (!text.trim()) return;

    if (!currentBook) {
      alert("먼저 '내 서재에 담기'를 눌러주세요.");
      return;
    }

    addMemo(isbn, editingId, text);
    setEditingId(null);
    setText("");
  };

  const handleEditInit = (memo) => {
    setEditingId(memo.id);
    setText(memo.content);
  };

  const handleCancel = () => {
    setEditingId(null);
    setText("");
  };

  const handleDelete = (id) => {
    if (window.confirm("메모를 정말 삭제하시겠습니까?")) {
      removeMemo(isbn, id);

      if (editingId === id) {
        setEditingId(null);
        setText("");
      }
    }
  };

  return (
    <div className="memo-wrapper">
      <div className="memo-container">
        <h3 className="sub-title">독서 메모</h3>
        <textarea
          className="text-area"
          placeholder="이 책에 대한 생각을 자유롭게 남겨보세요."
          value={text}
          onChange={(e) => setText(e.target.value)}
          // booksList에 없으면 비활성화
          disabled={!currentBook}
        />
        <div className="btn-box">
          {editingId && (
            <button className="cancel-btn" onClick={handleCancel}>
              취소
            </button>
          )}
          <button className="save-btn" onClick={handleSave}>
            {editingId ? "메모 수정 완료" : "메모 저장하기"}
          </button>
        </div>

        <ul className="memo-list">
          {memos.length === 0 ? (
            <li className="empty-msg">작성된 메모가 없습니다.</li>
          ) : (
            memos.map((m) => (
              <li key={m.id} className="memo-item">
                <span className="memo-content">{m.content}</span>
                <div className="action-btns">
                  <button
                    className="edit-btn"
                    onClick={() => handleEditInit(m)}
                  >
                    수정
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(m.id)}
                  >
                    삭제
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default MemoSection;
