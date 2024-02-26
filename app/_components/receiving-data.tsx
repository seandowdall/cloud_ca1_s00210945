"use client";

import { Button } from "@/components/ui/button";
import React from "react";

async function getData() {
  const url = process.env.NEXT_PUBLIC_URL || ""; // You might want to handle this more gracefully

  const res = await fetch(url);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const ReceivingData = () => {
  return (
    <div>
      <Button onClick={getData}> Push for the data</Button>
    </div>
  );
};

export default ReceivingData;
