import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
    fonts: {
        heading: `'Yeseva One', serif`,
        body: `'Lato', sans-serif`,
    },
    colors: {
        metmusem: {
            gray: "#303030"
        }
    }
})

export default theme