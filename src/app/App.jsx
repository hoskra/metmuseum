import '@fontsource/yeseva-one/400.css'
import '@fontsource/lato/700.css'
import '@fontsource/lato/300.css'

import theme from './Theme'
import { ChakraProvider } from "@chakra-ui/react"
import { Provider } from "react-redux";
import { store } from "./Store";

import { Header, Footer, Content } from "../components";

function App() {
  return (
    <ChakraProvider theme={theme}>
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
