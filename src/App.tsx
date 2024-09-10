import "./App.css";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Home from "./pages/Home";
import Encrypt from "./pages/Encrypt";
import Decrypt from "./pages/Decrypt";
import NotFound from "./pages/NotFound";
import { Link } from "react-router-dom";

function App() {
  const AppLayout = ({ children }: { children: JSX.Element }) => {
    return (
      <>
        <nav
          className="bg-blue-800 w-screen flex justify-between items-center p-4"
        >
          <Link to="/" children="Home" />

          <Link to="/encrypt" children="Encrypt" />

          <img
            src="../public/cryptship-icon.png"
            alt="logo"
            width={50}
            height={50}
          />
        </nav>
        <main>{children}</main>
      </>
    );
  };

  return (
    <Router>
      <AppLayout
        children={
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/encrypt" Component={Encrypt} />
            <Route path="/decrypt/:id" Component={Decrypt} />
            <Route path="/*" Component={NotFound} />
          </Routes>
        }
      />
    </Router>
  );
}

export default App;
