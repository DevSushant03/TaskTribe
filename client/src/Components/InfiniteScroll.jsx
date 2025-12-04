import React from "react";

function InfiniteScroll() {
  const items = Array(10).fill("/src/assets/icon.jpeg");

  return (
    <div className="w-full overflow-hidden py-4">
      <div className="scroll-track">
        {/* Loop twice for perfect infinite effect */}
        {[...items, ...items].map((src, index) => (
          <div key={index} className="mx-4 w-[300px] h-[130px] rounded-full bg-white">
            {/* <img
              src={src}
              alt=""
              className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] object-contain"
            /> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default InfiniteScroll;
