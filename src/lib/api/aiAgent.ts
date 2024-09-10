type ResponseMessage = {
  text: {
    text: string[];
  };
};

type DiagnosticInfo = {
  "Session Id": string;
  "Response Id": string;
};

type Match = {
  confidence: number;
};

type QueryResult = {
  text: string;
  languageCode: string;
  responseMessages: ResponseMessage[];
  intentDetectionConfidence: number;
  diagnosticInfo: DiagnosticInfo;
  match: Match;
  advancedSettings: {
    loggingSettings: Record<string, any>;
  };
};

type ApiResponse = {
  responseId: string;
  queryResult: QueryResult;
  responseType: string;
};

export const fetchAiAgent = async (message: string) => {
  const accessToken =
    "ya29.a0AcM612z73qO_4G-pP-xOGLlx-QqCrhtkBo4b-K8N0isQTJyKByShjnkAHQ24tNu3lY1a_5zXfP8HQwRoTrYG5WzQvY_AyHvRmF5Sk02-28USzQjrCrQ86Opc_UC9Buht9H9-ucjOEzkOkurO3lkM3OFY0criWUQZszNr2JRtT-N_OIIaCgYKATcSARASFQHGX2MiSEml7EmVGcLACv6NDlbNvA0182"; // gcloud auth print-access-tokenで取得したトークンをここに設定
  const projectId = "omni-workspace-develop"; // 実際のプロジェクトIDを設定
  const regionId = "global"; // 実際のリージョンIDを設定
  const subRegionId = "global"; // 実際のリージョンIDを設定
  const agentId = "1ad40483-c080-4aa0-b5fa-75448767516c"; // 実際のエージェントIDを設定
  const sessionId = "12341234"; // 実際のセッションIDを設定

  const response = await fetch(
    `https://${subRegionId}-dialogflow.googleapis.com/v3/projects/${projectId}/locations/${regionId}/agents/${agentId}/sessions/${sessionId}:detectIntent`,
    {
      method: "POST", // POSTリクエストを指定
      headers: {
        Authorization: `Bearer ${accessToken}`, // アクセストークンを設定
        "x-goog-user-project": projectId, // プロジェクトIDをヘッダーに追加
        "Content-Type": "application/json; charset=utf-8", // JSON形式を指定
      },
      body: JSON.stringify({
        queryInput: {
          text: {
            text: message,
          },
          languageCode: "ja",
        },
        queryParams: {
          timeZone: "America/Los_Angeles",
        },
      }),
    }
  );

  const data: ApiResponse = await response.json();
  console.log(
    "AIレスポンス",
    data.queryResult.responseMessages[0].text.text[0]
  );
  return data.queryResult.responseMessages[0].text.text[0];
};
