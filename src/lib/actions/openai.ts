"use server";

import { revalidatePath } from "next/cache";
import { fetchOpenAI } from "../api/openai";

type Message = {
  id: number;
  content: string;
  sender: "user" | "bot";
};

let messages: Message[] = [
  {
    id: 0,
    content: "スマートフォンの売上を分析して",
    sender: "user",
  },
  {
    id: 1,
    content:
      '分析結果\n\nスマートフォンの売上は、2024年9月1日から9月7日までの1週間で安定した成長を見せました。具体的なデータは以下の通りです：\n\n- **総販売台数**: 915台\n- **総収益**: 915,000円\n- **最高販売日**: 2024年9月7日（150台、150,000円）\n- **最低販売日**: 2024年9月1日（100台、100,000円）\n- **売上の成長率**: \n  - 9月1日から9月7日までの総販売台数の増加は50台（100台→150台）で、50%の成長。\n  \nこのデータから、スマートフォンカテゴリの需要は週半ばから週末にかけて増加する傾向にあります。また、販売台数の増加に伴い、収益も直線的に増加しました。\n\n表やグラフ\n\n```jsx\nimport React from "react";\nimport { Bar } from "react-chartjs-2";\n\nconst SalesChart = () => {\n  const data = {\n    labels: [\n      "2024-09-01",\n      "2024-09-02",\n      "2024-09-03",\n      "2024-09-04",\n      "2024-09-05",\n      "2024-09-06",\n      "2024-09-07",\n    ],\n    datasets: [\n      {\n        label: "Units Sold",\n        data: [100, 120, 110, 115, 130, 140, 150],\n        backgroundColor: "rgba(75, 192, 192, 0.6)",\n        borderColor: "rgba(75, 192, 192, 1)",\n        borderWidth: 2,\n      },\n    ],\n  };\n\n  const options = {\n    scales: {\n      y: {\n        beginAtZero: true,\n        title: {\n          display: true,\n          text: "Units Sold",\n        },\n      },\n    },\n  };\n\n  return <Bar data={data} options={options} />;\n};\n\nexport default SalesChart;\n```',
    sender: "bot",
  },
];
let id = 0;

export async function sendMessage(formData: FormData) {
  const message = formData.get("message") as string;
  console.log("メッセージ", message);

  if (message.trim()) {
    messages.push({
      id: id++,
      content: message,
      sender: "user",
    });

    //   // OpenAI API
    const aiMessage = await fetchOpenAI(message);
    console.log("aiMessage", aiMessage);

    if (aiMessage) {
      messages.push({
        id: id++,
        content: aiMessage,
        sender: "bot",
      });
    } else {
      messages.push({
        id: id++,
        content: "エラーが発生しました。",
        sender: "bot",
      });
    }
  }
  revalidatePath("/");
}

export async function getMessages() {
  console.log(messages);
  return messages;
}
