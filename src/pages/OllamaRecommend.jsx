import useStore from "./Store/store";

export async function getRecommendation(booksList, concern) {
  const formatBooksForAI = (booksList) => {
    return booksList.map((book, index) => {
      const notesText = book.memos
        .map((memo, i) => `- (${memo.id}) "${memo.content}"`)
        .join("\n");

      return `
        [책 ${index + 1}]
        제목: ${book.title}
        
        노트:
        ${notesText}
        `;
    });
  };
  const prompt = `
    너는 개인 맞춤 독서 큐레이터다.

    사용자의 책과 노트는 다음과 같다:

    ${formatBooksForAI(booksList)}

    사용자 고민:
    ${concern}

    이 노트들을 기반으로 사용자의 사고 패턴을 분석하고,
    가장 적합한 책 1~3권을 추천해라.

    반드시 다음 규칙:
    - 노트 내용을 근거로 추천할 것
    - JSON으로만 출력
    - 이미 읽은 책은 제외하고 추천할 것
    `;

  const res = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "llama3",
      prompt: prompt,
      stream: false,
    }),
  });

  const data = await res.json();
  return data.response;
}
