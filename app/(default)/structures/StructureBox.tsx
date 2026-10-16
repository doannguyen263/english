"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "sentence-structures";

type SentenceStructure = {
  id: string;
  pattern: string;
  explanation: string;
  examples: string[];
};

export function StructureBox() {
  const [pattern, setPattern] = useState("");
  const [explanation, setExplanation] = useState("");
  const [examplesText, setExamplesText] = useState("");
  const [items, setItems] = useState<SentenceStructure[]>([]);

  const [ ready, setReady] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    setReady(true);

    if (raw) {
        try {
            const parsed = JSON.parse(raw) as SentenceStructure[];
            if(Array.isArray(parsed)) {
                setItems(parsed);
            }
        } catch (error) {
            console.error("Error parsing sentence structures from localStorage:", error);
        }
    }
  }, []);

  useEffect(() => {
    if (!ready) { 
        return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, ready]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const examples = examplesText
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    if (!pattern.trim() || !explanation.trim()) {
      return;
    }

    setItems((current) => [
      {
        id: crypto.randomUUID(),
        pattern: pattern.trim(),
        explanation: explanation.trim(),
        examples,
      },
      ...current,
    ]);

    setPattern("");
    setExplanation("");
    setExamplesText("");
  }

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label className="flex flex-col gap-1 text-sm">
          Cấu trúc
          <input
            value={pattern}
            onChange={(event) => setPattern(event.target.value)}
            className="rounded-md border border-black/15 px-3 py-2 text-base dark:border-white/20"
            placeholder="S + have/has + been + V-ing"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Giải thích
          <textarea
            value={explanation}
            onChange={(event) => setExplanation(event.target.value)}
            rows={3}
            className="rounded-md border border-black/15 px-3 py-2 text-base dark:border-white/20"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Ví dụ, mỗi dòng một câu
          <textarea
            value={examplesText}
            onChange={(event) => setExamplesText(event.target.value)}
            rows={4}
            className="rounded-md border border-black/15 px-3 py-2 text-base dark:border-white/20"
          />
        </label>
        <button
          type="submit"
          className="h-11 rounded-md bg-black px-4 text-white dark:bg-white dark:text-black"
        >
          Lưu
        </button>
      </form>

      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li
            key={item.id}
            className="rounded-lg border border-black/10 px-4 py-3 dark:border-white/15"
          >
            <p className="font-medium">{item.pattern}</p>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {item.explanation}
            </p>
            <ul className="mt-2 list-disc pl-5 text-sm">
              {item.examples.map((example) => (
                <li key={example}>{example}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}