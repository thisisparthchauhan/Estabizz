"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

type Message = { role: "user" | "assistant"; content: string };

export default function ChatWidget() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content: "Hi! I'm Estabizz AI. Ask me anything about RBI, SEBI, IRDAI, FEMA licenses or fintech compliance in India. How can I help you today?",
        },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, open]);

    const send = async () => {
        const text = input.trim();
        if (!text || loading) return;

        const userMsg: Message = { role: "user", content: text };
        const updated = [...messages, userMsg];
        setMessages(updated);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: updated.map((m) => ({ role: m.role, content: m.content })),
                }),
            });
            const data = await res.json();
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: data.reply || "Sorry, I couldn't respond. Please try again." },
            ]);
        } catch {
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "Connection error. Please try again." },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleKey = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
    };

    // Format message — detect /contact link and turn into clickable
    const formatMsg = (text: string) => {
        const contactPattern = /(\/contact)/;
        return text.split(contactPattern).map((part, i) =>
            part === "/contact" ? (
                <Link key={i} href="/contact" className="underline font-semibold text-[#0096D6] hover:text-[#0077B6]" onClick={() => setOpen(false)}>
                    book a free consultation
                </Link>
            ) : part
        );
    };

    return (
        <>
            {/* Floating button */}
            <button
                onClick={() => setOpen((v) => !v)}
                aria-label="Open AI chat"
                className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                style={{ background: "linear-gradient(135deg, #0096D6, #0a1628)" }}
            >
                {open ? (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                )}
                {/* Pulse ring */}
                {!open && (
                    <span className="absolute w-full h-full rounded-full animate-ping opacity-30" style={{ background: "#0096D6" }} />
                )}
            </button>

            {/* Chat panel */}
            {open && (
                <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-1.5rem)] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-blue-100"
                    style={{ height: "480px", background: "#fff" }}>

                    {/* Header */}
                    <div className="flex items-center gap-3 px-4 py-3 text-white flex-shrink-0"
                        style={{ background: "linear-gradient(135deg, #0096D6, #0a1628)" }}>
                        <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm flex-shrink-0">AI</div>
                        <div className="min-w-0">
                            <p className="font-bold text-sm leading-tight">Estabizz AI</p>
                            <p className="text-blue-100 text-xs">Regulatory Compliance Assistant</p>
                        </div>
                        <div className="ml-auto flex items-center gap-1.5 flex-shrink-0">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            <span className="text-xs text-blue-100">Live</span>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-[#f8faff]">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                {msg.role === "assistant" && (
                                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#0096D6] to-[#0a1628] flex items-center justify-center text-white text-[10px] font-bold mr-2 flex-shrink-0 mt-0.5">AI</div>
                                )}
                                <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                                    msg.role === "user"
                                        ? "bg-[#0096D6] text-white rounded-tr-sm"
                                        : "bg-white text-[#0a1628] shadow-sm border border-gray-100 rounded-tl-sm"
                                }`}>
                                    {msg.role === "assistant" ? formatMsg(msg.content) : msg.content}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#0096D6] to-[#0a1628] flex items-center justify-center text-white text-[10px] font-bold mr-2 flex-shrink-0">AI</div>
                                <div className="bg-white border border-gray-100 shadow-sm rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1 items-center">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] animate-bounce" style={{ animationDelay: "0ms" }} />
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] animate-bounce" style={{ animationDelay: "150ms" }} />
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] animate-bounce" style={{ animationDelay: "300ms" }} />
                                </div>
                            </div>
                        )}
                        <div ref={bottomRef} />
                    </div>

                    {/* Quick questions */}
                    {messages.length === 1 && (
                        <div className="px-4 pb-2 bg-[#f8faff] flex flex-wrap gap-1.5">
                            {["NBFC registration?", "SEBI AIF license?", "Insurance broker?", "FEMA compliance?"].map((q) => (
                                <button key={q} onClick={() => setInput(q)}
                                    className="px-2.5 py-1 bg-white border border-blue-100 text-[#0096D6] rounded-full text-xs font-medium hover:bg-blue-50 transition-colors">
                                    {q}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Input */}
                    <div className="px-3 py-3 border-t border-gray-100 bg-white flex gap-2 flex-shrink-0">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKey}
                            placeholder="Ask about licenses, compliance..."
                            className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#0096D6] focus:ring-2 focus:ring-blue-50 transition-all min-w-0"
                        />
                        <button
                            onClick={send}
                            disabled={!input.trim() || loading}
                            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90"
                            style={{ background: "linear-gradient(135deg, #0096D6, #0a1628)" }}
                        >
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
