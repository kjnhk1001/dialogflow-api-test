"use server";

import { revalidatePath } from "next/cache";
import { fetchAiAgent } from "../api/aiAgent";
import { fetchDialogflow } from "../api/daialogflow";

type Message = {
  id: number;
  content: string;
  sender: "user" | "bot";
};

let messages: Message[] = [];
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

    // AI Agent API
    // const aiMessage = await fetchAiAgent(message);
    // Dialogflow API
    const aiMessage = await fetchDialogflow(message);

    if (aiMessage) {
      messages.push({
        id: id++,
        content: aiMessage[0],
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
  // console.log(messages);
  return messages;
}
