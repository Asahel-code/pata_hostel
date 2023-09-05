import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./utils/routes";
import { QueryClient, QueryClientProvider } from "react-query";
import Page404Screen from "./screens/Page404Screen";
import Aos from "aos";
import "aos/dist/aos.css"


function App() {

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const queryClient = new QueryClient();

  return (
    <>
     <Router>
        <QueryClientProvider client={queryClient}>
          <Routes>
            {/* Checking if routes exsits in the array and map them out */}
            {routes &&
              routes.map((r) => (
                <Route exact key={r.path} path={r.path} element={r.element} />
              ))
            }
            <Route path='*' element={<Page404Screen />} />
          </Routes>
        </QueryClientProvider>
      </Router> 
    </>
  )
}

export default App
