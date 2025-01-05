import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css"; 
import { Navbar,Home,Features,FAQ,Contact,Login,ResetPass,Signup, VerifyAcc,ChooseUsernameSignUp,Deals } from "./components";


const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Home />
            <Features />
            <FAQ />
            <Contact />
          </>
        } />
        <Route path="/deals" element={<Deals />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPass />} />
        <Route path="/verifyacc" element={<VerifyAcc />} />
        <Route path="/chooseusername" element={<ChooseUsernameSignUp />} />
        
      </Routes>
    </Router>
  );
};

export default App


