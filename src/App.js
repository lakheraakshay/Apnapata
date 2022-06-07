import { ThemeProvider } from "@material-ui/core";
import { BrowserRouter as Router } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { Provider as ReduxProvider } from "react-redux";

import Routes from "./routes";
import theme from "./theme";
import store from "./store";

export default function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | Apna Pata" defaultTitle="Apna Pata" />
      <ReduxProvider store={store}>
        <Router>
          <ThemeProvider theme={theme}>
            <Routes />
          </ThemeProvider>
        </Router>
      </ReduxProvider>
    </HelmetProvider>
  );
}
