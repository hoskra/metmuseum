import { defineStyleConfig } from '@chakra-ui/react'

const Container = defineStyleConfig({
    baseStyle: {
        fontWeight: 'bold',
    },
})

export const theme = extendTheme({
    components: {
        Container,
    },
})