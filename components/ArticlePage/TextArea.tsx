"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { AiOutlineBulb, AiOutlineInfoCircle } from "react-icons/ai";
import { Blog } from "@/types/blog";

type BlogToEditT = {
  blogToEdit: Blog | null;
};

const TextArea = ({ blogToEdit }: BlogToEditT) => {
  const [text, setText] = useState<string>(
    blogToEdit ? blogToEdit.content : ""
  );
  const [suggestion, setSuggestion] = useState<string>("");
  const [autoSuggestEnabled, setAutoSuggestEnabled] = useState<boolean>(true);
  const [counter, setCounter] = useState<number>(5);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchSuggestion = async (input: string) => {
    if (!autoSuggestEnabled || !input.trim()) {
      setSuggestion("");
      return;
    }

    try {
      const sentences = input.split(". ").slice(-2).join(". ");
      const response = await fetch("/api/suggestion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: sentences }),
      });

      const data = await response.json();

      if (data.choices && data.choices.length > 0) {
        const newSuggestion = data.choices[0].message.content.trim();
        setSuggestion(newSuggestion.replace(new RegExp(`^${input}`), ""));
        setStatus("success");
      } else {
        setSuggestion("");
        setStatus("error");
      }
    } catch (error) {
      console.error("Error fetching suggestion:", error);
      setSuggestion("");
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setText(value);

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setCounter(5);
    setStatus("idle");

    debounceTimeoutRef.current = setTimeout(() => {
      fetchSuggestion(value);
    }, 5000);

    if (autoSuggestEnabled) {
      intervalRef.current = setInterval(() => {
        setCounter((prevCounter) => {
          if (prevCounter > 1) {
            return prevCounter - 1;
          } else {
            clearInterval(intervalRef.current!);
            return 0;
          }
        });
      }, 1000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab" && suggestion) {
      e.preventDefault();
      setCounter(5);
      setText(text + suggestion);
      setSuggestion("");
      setStatus("idle");
    }

    if (e.key === " " && autoSuggestEnabled) {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      setCounter(5);
      setStatus("idle");

      debounceTimeoutRef.current = setTimeout(() => {
        fetchSuggestion(text);
      }, 5000);

      intervalRef.current = setInterval(() => {
        setCounter((prevCounter) => {
          if (prevCounter > 1) {
            return prevCounter - 1;
          } else {
            clearInterval(intervalRef.current!);
            return 0;
          }
        });
      }, 1000);
    }
  };

  const handleSuggestionClick = () => {
    setText(text + suggestion);
    setSuggestion("");
    setStatus("idle");
  };

  const toggleAutoSuggestion = () => {
    setAutoSuggestEnabled((prev) => !prev);
    setCounter(5);
    setStatus("idle");
  };

  useEffect(() => {
    if (!text.trim()) {
      setSuggestion("");
      setStatus("idle");
    }
  }, [text]);

  return (
    <div className="relative flex flex-col items-center min-h-screen w-full">
      <motion.button
        type="button"
        onClick={toggleAutoSuggestion}
        className="mb-4 px-4 py-2 bg-white bg-opacity-30 border border-white rounded-xl shadow-md transition duration-200 ease-in-out transform hover:scale-105 active:scale-95 flex items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AiOutlineBulb className="text-white mr-2" />
        {autoSuggestEnabled ? "Disable" : "Enable"} Auto Suggestion
      </motion.button>
      <div className="relative w-full">
        <textarea
          id="content"
          className="h-96 w-full px-4 py-2 bg-white bg-opacity-30 border border-white rounded-xl shadow-md caret-current transition duration-200 ease-in-out resize-none"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={text}
          placeholder="Start typing to get suggestions..."
        />
        {suggestion && (
          <motion.div
            className="absolute top-full mt-2 left-0 w-full p-2 bg-white bg-opacity-80 border border-white rounded-xl shadow-md pointer-events-none"
            onClick={handleSuggestionClick}
            style={{ pointerEvents: "auto", cursor: "pointer" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="whitespace-pre-wrap opacity-80">{suggestion}</span>
          </motion.div>
        )}
      </div>
      <div className="mt-4 text-center text-white/80">
        <AiOutlineInfoCircle className="inline mr-2 text-white" />
        Type your text, wait {counter} seconds for an auto-suggestion. If
        auto-suggest doesn&apos;t work, trigger it by removing a letter or
        adding one.
      </div>
      <div className="mt-2 text-center">
        <span
          className={`inline-block w-3 h-3 rounded-full ${
            status === "idle"
              ? "bg-gray-300"
              : status === "success"
              ? "bg-green-500"
              : "bg-red-500"
          }`}
        />
      </div>
    </div>
  );
};

export default TextArea;
