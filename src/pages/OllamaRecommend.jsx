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
    책을 추천할건데
    너가 키워드를 하나 뱉어내면
    그걸 kakao api에 검색해서 검색 결과 상위 3개를 추천할거야
    이 노트들을 기반으로 사용자의 사고 패턴을 분석해서 
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
