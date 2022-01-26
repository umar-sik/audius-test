import { BrowserRouter } from "react-router-dom";
import { ContainerRegister } from "./context/container";
import PageRoutes from "./Navigation/PageRoutes";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from "@mui/lab/AdapterLuxon";

const App = () => {
  return (
    <div>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <ContainerRegister.Provider>
          <BrowserRouter>
            <PageRoutes />
          </BrowserRouter>
        </ContainerRegister.Provider>
      </LocalizationProvider>
    </div>
  );
};

export default App;
