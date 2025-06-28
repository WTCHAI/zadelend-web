import React from "react";
import Image from "next/image";
import ZeadlendImage from "/public/zeadlend-calidraw.png"; // Make sure this path is correct!

export default function Page() {
  return (
    <div className="relative h-screen w-full">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="relative h-full w-full bg-link-backgroundlight [&>div]:absolute [&>div]:h-full [&>div]:w-full [&>div]:bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [&>div]:[background-size:16px_16px] [&>div]:[mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]">
          <div></div>
        </div>
      </div>

      {/* Centered Image */}
      <div className="relative z-10 flex h-full w-full items-center justify-center">
        <div className="overflow-hidden rounded-3xl border border-gray-300 shadow-lg">
          <Image
            src={ZeadlendImage}
            alt="Zeadlend Calidraw"
            width={1048}
            height={720}
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}