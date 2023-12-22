import UpdateForm from "./components/UpdateForm";
import UserTable from "./components/UserTable";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css"


function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<UserTable />} />
      <Route path="/update" element={<UpdateForm />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
