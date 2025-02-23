"use client"; 

import React, { useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

export function Provider({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
