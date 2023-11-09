import { ToastContainer } from "react-toastify";
import Main from "./pages/Main/Main";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Main />
    </div>
  );
}

export default App;
