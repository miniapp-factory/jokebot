"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Joke() {
  const [topic, setTopic] = useState<string>("");
  const [joke, setJoke] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchJoke = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://v2.jokeapi.dev/joke/${topic || "Any"}?type=single`
      );
      const data = await res.json();
      if (data && data.joke) {
        setJoke(data.joke);
      } else {
        setJoke("No joke found for this topic.");
      }
    } catch (e) {
      setJoke("Error fetching joke.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <input
        type="text"
        placeholder="Enter a topic (e.g., programming, animals)"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="border rounded px-2 py-1"
      />
      <Button onClick={fetchJoke} disabled={loading}>
        {loading ? "Loading…" : "Get Joke"}
      </Button>
      {joke && <p className="mt-4 text-center">{joke}</p>}
    </div>
  );
}
