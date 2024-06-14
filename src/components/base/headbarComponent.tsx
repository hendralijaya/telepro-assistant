import React from "react";
import Link from "next/link";

const HeadbarComponent = () => {
  return (
    <div className="flex h-full px-16 items-center justify-between border-b">
      <div className="flex gap-8 items-center">
        <Link
          href="/"
          className="cursor-pointer"
        >
          Telepro Assistant
        </Link>
      </div>
    </div>
  );
};

export default HeadbarComponent;
