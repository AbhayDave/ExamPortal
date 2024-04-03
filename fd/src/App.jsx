import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoute from "./routing/ProtectedRoute";
import Layout from "./components/Layout";
import AllExam from "./pages/AllExam";
import CreateExam from "./pages/CreateExam";
import QuestionHut from "./pages/QuestionHut";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="all-exams"
            element={
              <ProtectedRoute>
                <AllExam />
              </ProtectedRoute>
            }
          />
          <Route
            path="create-exam"
            element={
              <ProtectedRoute>
                <CreateExam />
              </ProtectedRoute>
            }
          />
          <Route
            path="question-hut"
            element={
              <ProtectedRoute>
                <QuestionHut />
              </ProtectedRoute>
            }
          />
          {/* Features parent */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
