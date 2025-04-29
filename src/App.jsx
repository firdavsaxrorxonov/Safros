import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MainLayout from "./layout/MainLayout";
import Qarzlar from "./pages/Qarzlar";
import Eslatmalar from "./pages/Eslatmalar";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import AddDebt from "./pages/AddDebt";
import UserDetail from "./pages/UserDetail";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/addDebt" element={<AddDebt />} />
        <Route path="/user-detail/:id" element={<UserDetail />} />
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Qarzlar />} />
          <Route path="/eslatmalar" element={<Eslatmalar />} />
          <Route path="/sozlamalar" element={<Settings />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
