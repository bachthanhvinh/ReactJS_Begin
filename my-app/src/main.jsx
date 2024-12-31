import Modal from "react-modal";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

Modal.setAppElement("#root");

createRoot(document.getElementById("root")).render(<App />);
