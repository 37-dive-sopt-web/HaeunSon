import "./styles/reset.css.ts";
import "./styles/global.css.ts";
import AppRouterProvider from "./providers/AppRouterProvider";
import AppThemeProvider from "./providers/AppThemeProvider";

function App() {
  return (
    <AppThemeProvider>
      <AppRouterProvider />
    </AppThemeProvider>
  );
}

export default App;
