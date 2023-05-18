import { BrowserRouter } from "react-router-dom";
import RenderRouters from "./routes";

const App = () => {
  return <BrowserRouter>
    <RenderRouters />
  </BrowserRouter>
}

export default App;
