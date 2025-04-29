import Navbar from "./components/NavBar";
import ProductListPage from "./pages/ProductListPage"
import "./App.css";
import { useState } from "react";
import { Option } from "./types/filters.type";
import { Route, Routes } from "react-router-dom";
import ProductView from "./pages/ProductView";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const [activeFilter, setActiveFilter] = useState<Option>({label:"All", option:"all"});
  const handleFilterClick = (filter:Option) => {
    setActiveFilter(filter);
  };
  return (
  <div className="w-full h-screen bg-zinc-200 flex flex-col gap-[30px] ">
    <Navbar activeFilter={activeFilter} onFilterClick={handleFilterClick} />
    <Routes>
      <Route path="/" element={<ProductListPage activeFilter={activeFilter} />} />
      <Route path="/product/:id" element={<ProductView />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </div>
  )
}

export default App
