import React, { useState } from "react";
import "./MemoSection.scss";

const MemoSection = () => {
  const [text, setText] = useState("");
  const [memos, setMemos] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const handleSave = () => {
    if (!text.trim()) return;

    if (editingId) {
      setMemos(
        memos.map((m) => (m.id === editingId ? { ...m, content: text } : m)),
      );
      setEditingId(null);
    } else {
      setMemos([...memos, { id: Date.now(), content: text }]);
    }
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
    if (window.confirm("메모를 삭제하시겠습니까?")) {
      setMemos(memos.filter((m) => m.id !== id));
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
