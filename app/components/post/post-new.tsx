"use client";

import { KeyboardEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "../supabase-provider";

export default function PostNew() {
  const { supabase } = useSupabase();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");

  const onSubmit = async () => {
    if (prompt) {
      try {
        const { data: insertData, error: insertError } = await supabase
          .from("posts")
          .insert({
            prompt,
          })
          .select();

        if (insertError) {
          alert(insertError.message);
          return;
        }

        setPrompt("");

        router.refresh();

        setLoading(true);

        const body = JSON.stringify({ prompt });
        const response = await fetch("/api/openai", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body,
        });

        const responseData = await response.json();

        const { error: updateError } = await supabase
          .from("posts")
          .update({
            content: responseData.text,
          })
          .eq("id", insertData[0].id);

        if (updateError) {
          alert(updateError.message);
          setLoading(false);
          return;
        }

        router.refresh();
      } catch (e) {
        alert(e);
      }
      setLoading(false);
    }
  };

  const enterPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key == "Enter" && e.shiftKey == false) {
      e.preventDefault();
      onSubmit();
    }
  };
  return (
    <div className="fixed bottom-0 left-2 right-2 h-40 flex flex-col justify-end items-center bg-[#7494C0] pb-5">
      {loading && (
        <div className="flex items-center justify-center space-x-3 my-2">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-yello-500 border-t-transparent"></div>
          <div className="text-white font-bold">GPT is thinking!!!!!</div>
        </div>
      )}

      <textarea
        className="w-full max-w-screen-md bg-gray-50 rounded py-3 px-3 ontline-none focus:bg-white"
        name="prompt"
        id="prompt"
        placeholder="How are you?"
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={(e) => enterPress(e)}
        value={prompt}
        cols={30}
        rows={3}
        required
      ></textarea>

      <div className="text-white text-sm mt-2">Shift+Enter: 改行, Enter: 送信</div>
    </div>
  );
}
