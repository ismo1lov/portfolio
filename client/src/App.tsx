import { ThemeProvider } from "next-themes";
import Home from "./pages/Home";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" attribute="data-theme">
      <Home />
    </ThemeProvider>
  );
}
