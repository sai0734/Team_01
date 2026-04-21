import React, { useState } from "react";

const styles = {
  memoWrapper: {
    maxWidth: "1000px", // 상세페이지 폭과 동일
    margin: "40px auto",
    padding: "0 20px",
    fontFamily: "'Pretendard', sans-serif",
    boxSizing: "border-box",
  },
  memoContainer: {
    backgroundColor: "#f8f9fa",
    padding: "30px",
    borderRadius: "15px",
    border: "1px solid #eee",
  },
  subTitle: {
    fontSize: "1.4rem",
    fontWeight: "700",
    borderLeft: "6px solid #000",
    paddingLeft: "15px",
    marginBottom: "25px",
  },
  textArea: {
    width: "100%",
    minHeight: "120px",
    padding: "15px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    fontSize: "1rem",
    fontFamily: "inherit",
    boxSizing: "border-box",
    marginBottom: "15px",
    resize: "vertical",
  },
  btnBox: {
    textAlign: "right",
  },
  saveBtn: {
    backgroundColor: "#000",
    color: "#fff",
    padding: "12px 25px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "600",
  },
  memoList: {
    listStyle: "none",
    padding: 0,
    marginTop: "30px",
  },
  memoItem: {
    backgroundColor: "#fff",
    padding: "15px",
    borderRadius: "8px",
    border: "1px solid #eee",
    marginBottom: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
  },
  actionBtns: {
    display: "flex",
    gap: "8px",
  },
  editBtn: {
    backgroundColor: "#eee",
    color: "#333",
    border: "none",
    padding: "6px 12px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
  deleteBtn: {
    backgroundColor: "#ff4d4f",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
};

const MemoSection = () => {
  const [text, setText] = useState("");
  const [memos, setMemos] = useState([]);
  const [editingId, setEditingId] = useState(null); // 현재 수정 중인 메모의 ID

  // 저장 및 수정 실행
  const handleSave = () => {
    if (editingId) {
      // 수정 모드
      setMemos(
        memos.map((m) => (m.id === editingId ? { ...m, content: text } : m)),
      );
      setEditingId(null);
    } else {
      // 일반 저장 모드
      setMemos([...memos, { id: Date.now(), content: text }]);
    }
    setText(""); // 입력창 초기화
  };

  // 수정 모드 진입
  const handleEditInit = (memo) => {
    setEditingId(memo.id);
    setText(memo.content); // 기존 내용을 입력창에 채움
  };

  // 삭제 실행
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
    <div style={styles.memoWrapper}>
      <div style={styles.memoContainer}>
        <h3 style={styles.subTitle}>독서 메모</h3>
        <textarea
          style={styles.textArea}
          placeholder="이 책에 대한 생각을 자유롭게 남겨보세요."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div style={styles.btnBox}>
          <button style={styles.saveBtn} onClick={handleSave}>
            {editingId ? "메모 수정 완료" : "메모 저장하기"}
          </button>
        </div>

        <ul style={styles.memoList}>
          {memos.length === 0 && (
            <li style={{ textAlign: "center", color: "#999", padding: "20px" }}>
              작성된 메모가 없습니다.
            </li>
          )}
          {memos.map((m) => (
            <li key={m.id} style={styles.memoItem}>
              <span style={{ flex: 1, marginRight: "20px" }}>{m.content}</span>
              <div style={styles.actionBtns}>
                <button
                  style={styles.editBtn}
                  onClick={() => handleEditInit(m)}
                >
                  수정
                </button>
                <button
                  style={styles.deleteBtn}
                  onClick={() => handleDelete(m.id)}
                >
                  삭제
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MemoSection;
