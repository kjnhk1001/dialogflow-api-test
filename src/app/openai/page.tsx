import { BarChart } from "@/components/BarChart";
import { BubbleChart } from "@/components/BubbleChart";
import { DoughnutChart } from "@/components/DoughnutChart";
import { LineChart } from "@/components/LineChart";
import { PieChart } from "@/components/PieChart";
import { PolarAreaChart } from "@/components/PolarAreaChart";
import { RadarChart } from "@/components/RadarChart";
import SalesChart from "@/components/ReactCode";
import { getMessages, sendMessage } from "@/lib/actions/openai";

export default async function Home() {
  const messages = await getMessages();
  return (
    <main className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Azure OpenAI</h1>

      <div className="bg-gray-100 p-4 rounded-lg mb-4 h-[50rem] overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`relative mb-4 p-4  rounded-lg ${
              message.sender === "user"
                ? "bg-gray-200 text-right ml-auto max-w-xs md:max-w-md"
                : "w-full bg-gray-100"
            }`}
          >
            <p>{message.content}</p>
          </div>
        ))}
        <BarChart />
        <LineChart />
        <PieChart />
        <DoughnutChart />
        <RadarChart />
        <PolarAreaChart />
        <BubbleChart />
        {/* <SalesChart /> */}
      </div>

      <form action={sendMessage} className="relative flex items-center">
        <input
          type="text"
          name="message"
          placeholder="AIに聞きたいことを書いてください"
          className="flex-grow p-2 pr-10 border rounded-lg focus:border-gray-400 focus:outline-none"
          required
        />
        <button
          type="submit"
          className="absolute right-2 text-gray-400 px-3 py-2 my-6 rounded-full hover:bg-gray-200"
        >
          ↑
        </button>
      </form>
    </main>
  );
}
