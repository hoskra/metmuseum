import { ChakraProvider } from "@chakra-ui/react"
import { Provider } from "react-redux";
import { store } from "./Store";

import { Header, Footer, Content } from "../components";

function App() {
  return (
    <ChakraProvider>
      <Provider store={store} >
        <main>
          <Header />
          <Content />
          <Footer />
        </main>
      </Provider>
    </ChakraProvider>
  )
}

export default App
