"use client";
import { usePathname } from "next/navigation";
import React from "react";

const Page = () => {
  const pathname = usePathname();
  const segments = pathname ? pathname.split("/") : [];
  const path = segments[4] || ""; // prevents "undefined" if path is shorter

  return (
    <div className="p-5">
      <p className="text-lg font-semibold">{path || "No path segment found"}</p>
    </div>
  );
};

export default Page;
