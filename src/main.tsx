import React from "react";
import ReactDOM from "react-dom/client";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

import "./shared/styles/globals.css";

const router = createRouter({ 
  routeTree,
  basepath: '/react-18-19-playground/',
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

// type UiItem = {
//   id?: string;
//   title?: string;
//   subtitle?: string;
//   icon?: string;
//   href?: string;
//   meta?: string;
// };

// type Mapping<TOut, TRaw> = Partial<Record<keyof TOut, keyof TRaw>>;

// function mapType<TRaw extends Record<string, unknown>>(
//   mapping: Mapping<UiItem, TRaw>,
//   raw: TRaw
// ): UiItem {
//   const out: UiItem = {};

//   // entries() -> [string, unknown], nên phải cast để TS hiểu đúng key type
//   for (const [uiKey, rawKey] of Object.entries(mapping) as Array<
//     [keyof UiItem, keyof TRaw]
//   >) {
//     const v = raw[rawKey];
//     out[uiKey] = v == null ? "" : String(v); // ép về string cho chắc
//   }

//   return out;
// }

// // demo
// const testJson = {
//   type: "abc",
//   name: "xyz",
//   altName: "123",
//   avt: "none",
//   link: "google",
//   additional: "test",
// };

// const mapping: Mapping<UiItem, typeof testJson> = {
//   id: "type",
//   title: "name",
//   subtitle: "altName",
//   icon: "avt",
//   href: "link",
//   meta: "additional",
// };

// console.log(mapType(mapping, testJson));