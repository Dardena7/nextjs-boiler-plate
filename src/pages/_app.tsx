import type { AppProps } from "next/app";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { QueryClientProvider, QueryClient } from "react-query";
import "@/styles/globals.css";
import { ThemeProvider } from "@mui/material";
import theme from "@/styles/theme";
import { appWithTranslation } from "next-i18next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const App = ({ Component, pageProps }: AppProps) => {
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
          <ToastContainer />
        </ThemeProvider>
      </UserProvider>
    </QueryClientProvider>
  );
};

export default appWithTranslation(App);
