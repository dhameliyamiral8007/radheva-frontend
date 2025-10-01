import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./Components/config/hooks/ThemeContext.jsx";
import { Provider } from "react-redux";
import store from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </Provider>
);