import { useContext } from "react";
import React from "react";
import { UpdateContext } from "@repo/libs";

export function useUpdateContext() {
  const context = useContext(UpdateContext);

  if (!context) {
    throw new Error("useUpdateContext must be used within a UpdateProvider");
  }

  return React.useContext(UpdateContext);
}
