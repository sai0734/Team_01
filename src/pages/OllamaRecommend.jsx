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
    당신은 사용자의 고민과 메모를 분석하여 "책 검색 키워드"를 생성하는 AI입니다.

    규칙:
    1. 반드시 한국어 한 단어만 출력합니다.
    2. 공백, 문장, 조사, 설명, 문장부호를 절대 포함하지 않습니다.
    3. 감정 표현(예: 슬픔, 힘듦, 우울) 대신 "책 검색에 적합한 주제 키워드"를 사용합니다.
    4. 반드시 실제 책 검색에 자주 사용되는 일반적인 카테고리 단어를 선택합니다.

    허용 키워드 범위 (이 중에서 선택하거나 유사한 수준으로만 출력):
    자기계발, 심리학, 인간관계, 불안, 번아웃, 동기부여, 습관, 성공, 감정, 치유, 스트레스, 집중력, 생산성, 커리어, 리더십

    금지:
    - 두 단어 이상 출력
    - 문장 형태 출력
    - 너무 추상적인 단어 (예: 삶, 생각, 고민)
    - 특수문자 포함
    - 한자

    출력 형식:
    반드시 한글 단어 하나만 출력

    [사용자 고민]
    ${concern}

    [사용자 메모 및 노트]
    ${formatBooksForAI(booksList)}

    위 정보를 바탕으로 규칙에 맞는 키워드를 생성하세요.
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
