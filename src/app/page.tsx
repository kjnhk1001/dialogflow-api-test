import { getMessages, sendMessage } from "@/lib/actions/gcp";

export default async function Home() {
  const messages = await getMessages();
  return (
    <main className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">GCP</h1>

      <div className="bg-gray-100 p-4 rounded-lg mb-4 h-96 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-2 p-2 rounded-lg ${
              message.sender === "user"
                ? "bg-blue-200 text-right"
                : "bg-green-200"
            }`}
          >
            {message.content}
          </div>
        ))}
      </div>

      <form action={sendMessage} className="flex gap-2">
        <input
          type="text"
          name="message"
          placeholder="メッセージを入力..."
          className="flex-grow p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          送信
        </button>
      </form>
    </main>
  );
}
