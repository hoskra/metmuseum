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
    },
    breakpoints: {
        sm: '320px',
        md: '768px',
        lg: '960px',
        xl: '1200px',
        '2xl': '1536px',
      }
      
})

export default theme