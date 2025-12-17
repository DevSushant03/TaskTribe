import React from "react";

export default function CircularLoader() {
  return (
    <div class="flex-col gap-4 w-full flex items-center justify-center">
      <div class="w-10 h-10 border-3 border-transparent text-black text-4xl animate-spin flex items-center justify-center border-t-black rounded-full">
        <div class="w-8 h-8 border-3 border-transparent text-white text-2xl animate-spin flex items-center justify-center border-t-white rounded-full"></div>
      </div>
    </div>
  );
}
