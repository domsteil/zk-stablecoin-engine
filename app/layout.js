/* eslint-disable @next/next/no-head-element */
import { ClerkProvider } from "@clerk/nextjs/app-beta";

// Root Layout
export default function RootLayout({ children }) {

  return (
      <ClerkProvider frontendApi={process.env.NEXT_PUBLIC_CLERK_FRONTEND_API}>
        <html>
          <head></head>
          <body>{children}</body>
        </html>
      </ClerkProvider>
  );
}
