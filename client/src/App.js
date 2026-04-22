import React, { useState } from "react";
import BroadcasterPanel from "./BroadcasterPanel";
import ViewerPanel from "./ViewerPanel";
import { Badge } from "./components/ui/badge";

export default function App() {
  const [view, setView] = useState("home");
  const [streamData, setStreamData] = useState(null);

  if (view === "broadcast") {
    return <BroadcasterPanel onBack={() => setView("home")} onStreamCreated={setStreamData} />;
  }
  if (view === "watch") {
    return <ViewerPanel onBack={() => setView("home")} initialStream={streamData} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <header className="header">
        <div className="header-wrapper container">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_#FF495B]" />
            <span className="text-gray-400 font-semibold tracking-widest text-sm uppercase">LiveCast</span>
          </div>
          <Badge variant="outline" className="border-gray-600 text-gray-500 text-xs">
            Powered by Mux
          </Badge>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center container py-16 gap-6">
        <div className="flex flex-col items-center text-center gap-4 max-w-xl">
          <Badge className="bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 mb-2">
            📡 Live Streaming Platform
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-400 leading-tight">
            Stream from your phone.<br />
            <span className="text-yellow-400">Reach the world.</span>
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-md">
            Go live in minutes. Share your Playback ID with viewers — no account needed.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl mt-4">
          <button
            onClick={() => setView("broadcast")}
            className="group bg-gray-800 border border-gray-600 hover:border-yellow-500/60 hover:bg-gray-700 rounded-xl p-6 text-left transition-all duration-200 cursor-pointer"
          >
            <div className="text-3xl mb-3">📡</div>
            <div className="text-gray-400 font-bold text-lg mb-1 group-hover:text-yellow-400 transition-colors">Broadcast</div>
            <p className="text-gray-500 text-sm">Create a stream & go live from Larix Broadcaster on your phone.</p>
            <div className="mt-4 text-yellow-500 text-sm font-medium group-hover:translate-x-1 transition-transform inline-block">Set up stream →</div>
          </button>

          <button
            onClick={() => setView("watch")}
            className="group bg-gray-800 border border-gray-600 hover:border-blue-600/60 hover:bg-gray-700 rounded-xl p-6 text-left transition-all duration-200 cursor-pointer"
          >
            <div className="text-3xl mb-3">🎬</div>
            <div className="text-gray-400 font-bold text-lg mb-1 group-hover:text-blue-400 transition-colors">Watch Live</div>
            <p className="text-gray-500 text-sm">Enter a Playback ID to watch an active live stream right now.</p>
            <div className="mt-4 text-blue-400 text-sm font-medium group-hover:translate-x-1 transition-transform inline-block">Watch stream →</div>
          </button>
        </div>

        {/* How it works */}
        <div className="w-full max-w-xl mt-8 bg-gray-800 border border-gray-600 rounded-xl p-5">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">How it works</p>
          <div className="flex flex-col md:flex-row gap-4">
            {[
              { step: "1", label: "Create Stream", desc: "Generate your RTMP URL & stream key" },
              { step: "2", label: "Go Live", desc: "Connect Larix Broadcaster on your phone" },
              { step: "3", label: "Share", desc: "Give viewers your Playback ID to watch" },
            ].map(({ step, label, desc }) => (
              <div key={step} className="flex items-start gap-3 flex-1">
                <div className="w-6 h-6 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{step}</div>
                <div>
                  <p className="text-gray-400 text-sm font-medium">{label}</p>
                  <p className="text-gray-500 text-xs">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="container py-4 text-center text-xs text-gray-700 border-t border-gray-800">
        LiveCast · Built with React, Node.js & Mux
      </footer>
    </div>
  );
}
