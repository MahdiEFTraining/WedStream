import React, { useState, useRef } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./components/ui/card";
import { Alert, AlertDescription } from "./components/ui/alert";
import { Badge } from "./components/ui/badge";
import { Separator } from "./components/ui/separator";

export default function BroadcasterPanel({ onBack, onStreamCreated }) {
  const [channelName, setChannelName] = useState("");
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const clientRef = useRef(null);
  const localVideoRef = useRef(null);
  const localTracksRef = useRef([]);

  const startStream = async () => {
    const channel = channelName.trim();
    if (!channel) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/config");
      const { appId } = await res.json();

      const client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });
      await client.setClientRole("host");
      clientRef.current = client;

      const [audioTrack, videoTrack] =
        await AgoraRTC.createMicrophoneAndCameraTracks(
          {},
          { facingMode: "environment" },
        );
      localTracksRef.current = [audioTrack, videoTrack];

      await client.join(appId, channel, null, null);
      await client.publish([audioTrack, videoTrack]);

      setIsLive(true);
      setTimeout(() => {
        videoTrack.play(localVideoRef.current);
      }, 300);
      onStreamCreated({ channelName: channel });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const stopStream = async () => {
    localTracksRef.current.forEach((t) => {
      t.stop();
      t.close();
    });
    await clientRef.current?.leave();
    setIsLive(false);
  };

  const copyChannel = () => {
    navigator.clipboard.writeText(channelName.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
              Broadcast
            </span>
          </div>
          {isLive && (
            <Badge className="bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse">
              🔴 LIVE
            </Badge>
          )}
        </div>
      </header>

      <main className="flex-1 container py-10 max-w-2xl mx-auto space-y-6">
        <div>
          <h2 className="form-title mb-2">Broadcast Setup</h2>
          <p className="text-[#9095A1]">
            Enter a channel name, go live, then share it with viewers.
          </p>
        </div>

        {error && (
          <Alert className="bg-red-500/10 border-red-500/30 text-red-400">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!isLive ? (
          <Card className="bg-[#141414] border-[#30333A]">
            <CardHeader>
              <CardTitle className="text-[#CCDADC] text-lg">
                Create a channel
              </CardTitle>
              <CardDescription className="text-[#9095A1]">
                Pick a channel name — viewers will use this to watch you.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <label className="form-label">Channel name</label>
                <input
                  className="form-input w-full"
                  placeholder="e.g. my-wedding-stream"
                  value={channelName}
                  onChange={(e) => setChannelName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && startStream()}
                />
              </div>
              <Button
                className="yellow-btn w-full"
                onClick={startStream}
                disabled={loading || !channelName.trim()}
              >
                {loading ? "Starting…" : "🎥 Go Live"}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Live preview */}
            <Card className="bg-[#141414] border-[#30333A] overflow-hidden">
              <CardContent className="p-0">
                <div className="relative w-full aspect-video bg-[#0a0a0a]">
                  <div
                    ref={localVideoRef}
                    className="w-full h-full"
                    style={{ minHeight: "200px" }}
                  />{" "}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-white text-xs font-semibold">
                      LIVE
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Share channel */}
            <Card className="bg-[#141414] border-[#30333A]">
              <CardHeader>
                <CardTitle className="text-[#CCDADC] text-lg">
                  Share with viewers
                </CardTitle>
                <CardDescription className="text-[#9095A1]">
                  Give this channel name to anyone who wants to watch.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-12 px-3 flex items-center bg-[#212328] border border-[#30333A] rounded-lg">
                    <code className="text-[#CCDADC] text-sm">
                      {channelName}
                    </code>
                  </div>
                  <Button
                    variant="outline"
                    onClick={copyChannel}
                    className="h-12 px-4 border-[#30333A] bg-[#212328] text-[#9095A1] hover:bg-[#30333A] hover:text-[#FDD458]"
                  >
                    {copied ? "✓ Copied" : "Copy"}
                  </Button>
                </div>
                <Button
                  onClick={stopStream}
                  className="w-full h-12 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 rounded-lg font-medium"
                >
                  ⏹ Stop Stream
                </Button>
              </CardContent>
            </Card>
          </>
        )}
      </main>
    </div>
  );
}
