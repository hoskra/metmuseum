import { Heading, Container } from "@chakra-ui/react"

export const Header = () => {
    return (
        <Container
        w={{sm:'400px', md:'760px', lg:'950px', xl:'1200px'}}
        
        >
            <Heading
                pt={6}
                fontSize="30px"
                as="h1">
                The Metropolitan Museum&nbsp;of&nbsp;Art
            </Heading>
        </Container>
    )
}

