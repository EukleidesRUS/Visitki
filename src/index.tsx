import ReactDOM from "react-dom/client";
import App from "./components/App/App";
import "./vendor/fonts/fonts.css";
import { BrowserRouter as Router } from "react-router-dom";
import { YMaps } from "@pbe/react-yandex-maps";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Router>
    <YMaps
      query={{
        lang: "ru_RU",
        apikey: "04277aa1-f5ec-4444-81ee-4e0b6eafdcaa",
      }}
    >
      <App />
    </YMaps>
  </Router>
);
