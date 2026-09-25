"use client";

import { useEffect } from "react";
import { APP_MARKUP } from "./markup";
import { bootApp } from "../lib/boot";

export default function Page() {
  useEffect(() => {
    bootApp();
  }, []);

  return <div id="mw-root" dangerouslySetInnerHTML={{ __html: APP_MARKUP }} />;
}
