import "./assets/styles/styles.scss";
import { Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Register from './pages/Register';
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </div>
  );
}
