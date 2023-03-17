import type { AppProps } from "next/app";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { QueryClientProvider, QueryClient } from "react-query";
import "@/styles/globals.css";
import { createMuiTheme, ThemeProvider } from "@mui/material";
import theme from "@/styles/theme";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // don't fetch when window is focused
        retry: false, // if it fails don't retry (you can configure this on a specific resource)
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}
