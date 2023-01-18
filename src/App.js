import "./assets/styles/styles.scss";
import { Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Register from './pages/Register';
import NotFound from "./pages/NotFound";
import List from "./pages/List";
import CustomNavbar from "./components/CustomNavbar";
import Search from "./pages/Search";

export default function App() {
  return (
    <div className="App">
      <CustomNavbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/list" element={<List/>} />
        <Route path="/search" element={<Search/>} />
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </div>
  );
}
