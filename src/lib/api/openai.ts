import jsonData from "@/data/sales/electronics-weekly.json";

type OpenAIResponse = {
  id: string;
  object: string;
  created: number;
  model: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  choices: {
    message: {
      role: "assistant" | "system" | "user";
      content: string;
    };
    finish_reason: string;
    index: number;
  }[];
};

export const fetchOpenAI = async (message: string) => {
  const content = createContent(message);
  const azureUrl =
    "https://debug-aoai-us-east2.openai.azure.com/openai/deployments/gpt-4o-mini/chat/completions?api-version=2024-02-01";
  const response = await fetch(azureUrl, {
    method: "POST", // POSTメソッドを指定
    headers: {
      "Content-Type": "application/json", // リクエストのコンテンツタイプを設定
      "api-key": process.env.AZURE_OPENAI_API_KEY || "", // 環境変数からAPIキーを取得して設定
    },
    body: JSON.stringify({
      messages: [
        {
          role: "system",
          content:
            "あなたは小売業界の分析者です。商品売上分析や在庫管理を行います。", // システムメッセージ
        },
        {
          role: "user",
          content: content, // ユーザーのリクエスト内容
        },
      ],
    }),
  });

  const result: OpenAIResponse = await response.json(); // レスポンスをJSON形式で取得
  console.log("リクエストメッセージ😮", content);
  console.log("Azure結果😌", result?.choices[0]?.message.content);
  return result?.choices[0]?.message.content;
};

// jsonデータと分析したい内容を統合する
const createContent = (analysisReq: string) => {
  const jsonString = JSON.stringify(jsonData, null, 2);
  const content = `
  ①jsonデータと②分析したい内容から結果を回答してください。結果は回答フォーマットに従ってください\n\n

  ①jsonデータ\n
  ${jsonString}\n
  -------\n
  ②分析したい内容\n
  ${analysisReq}
  -------\n
  以下回答フォーマット。
  -------\n
  分析結果\n
  （分析結果を回答）\n\n

  表やグラフ\n
  （Reactのコードを返却する）\n
  -------\n
  `;
  return content;
};
