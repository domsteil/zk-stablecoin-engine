/* eslint-disable @next/next/no-head-element */
/* eslint-disable react/display-name */

import React from "react"
import { ClerkProvider } from "@clerk/nextjs/app-beta";

// Root Layout
export default function RootLayout({ children }) {

  return (
      <ClerkProvider frontendApi={process.env.NEXT_PUBLIC_CLERK_FRONTEND_API}>
      <html lang="en">
        <head>
          <title>zk-stablecoin-engine</title>
        </head>
        <body>{children}</body>
      </html>
      </ClerkProvider>
  );
}
