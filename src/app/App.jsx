import { ChakraProvider, Container } from "@chakra-ui/react"
import { Provider } from "react-redux";
import { store } from "./Store";

import { Header } from "../components/Header";
import { ResultDetail } from "../features/Result/ResultDetail";
import { ResultGallery } from "../features/Result/ResultGallery";
import { ResultStatus } from "../features/Result/ResultStatus";
import { SearchComponent } from "../features/Search/SearchComponent";

function App() {
  return (
    <ChakraProvider>
      <Provider store={store} >
          <Container margin="0 auto" minWidth="1000px" >
            <Header />
            <SearchComponent />
            <ResultStatus />
            <ResultGallery />
            <ResultDetail />
          </Container>
      </Provider>
    </ChakraProvider>
  )
}

export default App
