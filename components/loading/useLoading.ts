"use client";

import { useContext } from "react";
import LoadingContext from "./LoadingContext";

export default function useLoading() {
  const ctx = useContext(LoadingContext);
  if (ctx === undefined) {
    throw new Error("useLoading must be used with a LoadingProvider");
  }
  return ctx;
}
