import React, { useState, useRef, useEffect } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Badge } from "./components/ui/badge";
import { Card, CardContent } from "./components/ui/card";
import { Alert, AlertDescription } from "./components/ui/alert";
import { Separator } from "./components/ui/separator";

export default function ViewerPanel({ onBack, initialStream }) {
  const [channelName, setChannelName] = useState(
    initialStream?.channelName || "",
  );
  const [inputName, setInputName] = useState(initialStream?.channelName || "");
  const [isWatching, setIsWatching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const clientRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const joinStream = async () => {
    const channel = inputName.trim();
    if (!channel) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/config");
      const { appId } = await res.json();

      const client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });
      await client.setClientRole("audience");
      clientRef.current = client;

      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        if (mediaType === "video") {
          user.videoTrack.play(remoteVideoRef.current);
          setIsWatching(true);
        }
        if (mediaType === "audio") {
          user.audioTrack.play();
        }
      });

      client.on("user-unpublished", () => {
        setIsWatching(false);
      });

      await client.join(appId, channel, null, null);
      setChannelName(channel);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const leaveStream = async () => {
    await clientRef.current?.leave();
    setIsWatching(false);
    setChannelName("");
  };

  useEffect(() => {
    return () => {
      clientRef.current?.leave();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col">
      <header className="header">
        <div className="header-wrapper container">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-[#9095A1] hover:text-[#CCDADC] hover:bg-[#212328] h-8 px-3 text-sm"
            >
              ← Back
            </Button>
            <Separator orientation="vertical" className="h-5 bg-[#30333A]" />
            <span className="text-[#CCDADC] font-semibold tracking-widest text-sm uppercase">
              Watch Live
            </span>
          </div>
          {isWatching && (
            <Badge className="bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse">
              🔴 LIVE
            </Badge>
          )}
        </div>
      </header>

      <main className="flex-1 container py-10 max-w-3xl mx-auto space-y-6">
        <div>
          <h2 className="form-title mb-2">Watch Live</h2>
          <p className="text-[#9095A1]">
            Enter the channel name to join the stream.
          </p>
        </div>

        <div className="flex gap-2">
          <Input
            className="form-input flex-1"
            placeholder="Enter channel name…"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && joinStream()}
            disabled={!!channelName}
          />
          {!channelName ? (
            <Button
              className="yellow-btn px-6"
              onClick={joinStream}
              disabled={!inputName.trim() || loading}
            >
              {loading ? "Joining…" : "Watch"}
            </Button>
          ) : (
            <Button
              onClick={leaveStream}
              className="h-12 px-6 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 rounded-lg"
            >
              Leave
            </Button>
          )}
        </div>

        {error && (
          <Alert className="bg-red-500/10 border-red-500/30 text-red-400">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Card className="bg-[#141414] border-[#30333A] overflow-hidden">
          <CardContent className="p-0">
            <div className="relative w-full aspect-video bg-[#0a0a0a]">
              {!channelName && !loading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-[#30333A]">
                  <span style={{ fontSize: 48 }}>🎬</span>
                  <p className="text-sm text-[#9095A1]">
                    Enter a channel name above to watch
                  </p>
                </div>
              )}
              {loading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <div className="w-8 h-8 border-2 border-[#30333A] border-t-[#FDD458] rounded-full animate-spin" />
                  <p className="text-sm text-[#9095A1]">Joining stream…</p>
                </div>
              )}
              {channelName && !isWatching && !loading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <div className="w-8 h-8 border-2 border-[#30333A] border-t-[#FDD458] rounded-full animate-spin" />
                  <p className="text-sm text-[#9095A1]">
                    Waiting for broadcaster…
                  </p>
                </div>
              )}
              <div ref={remoteVideoRef} className="w-full h-full" />
              {isWatching && (
                <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-white text-xs font-semibold">LIVE</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {channelName && (
          <p className="text-xs text-[#30333A] text-center">
            Channel: <code className="text-[#9095A1]">{channelName}</code>
          </p>
        )}
      </main>
    </div>
  );
}
