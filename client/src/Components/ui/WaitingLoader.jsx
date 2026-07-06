import React from "react";

export default function WaitingLoader() {
  return (
    <div class="text-center w-screen h-screen flex flex-col justify-center items-center">
      <div class="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-orange-500 mx-auto"></div>
      <h2 class="text-zinc-900 dark:text-white mt-4">Loading...</h2>
      <p class="text-zinc-600 dark:text-zinc-400">
        Your adventure is about to begin
      </p>
    </div>
  );
}
