import React, { useEffect } from "react";
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
import { generateToken, messaging } from "./notification/firebase";
import { onMessage } from "firebase/messaging";

function App() {
  useEffect(() => {
    generateToken();
    onMessage(messaging, (poyload) => {
      console.log(poyload);
    });
  }, []);
  // useEffect(() => {
  //   if ("serviceWorker" in navigator) {
  //     navigator.serviceWorker
  //       .register("/firebase-messaging-sw.js")
  //       .then((registration) => {
  //         console.log("✅ Service Worker registered:", registration);
  //       })
  //       .catch((err) => {
  //         console.error("❌ Service Worker registration failed:", err);
  //       });
  //   }

  //   generateToken();

  //   onMessage(messaging, (payload) => {
  //     console.log("📥 Foreground message received:", payload);
  //   });
  // }, []);

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
