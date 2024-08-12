import React from "react";
import Root from "./routes/Root";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();
function App() {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Root />
        <ToastContainer
          position="bottom-right"
          theme="light"
          pauseOnHover
          autoClose={2500}
        />
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
