import { Heading, Container } from "@chakra-ui/react"

export const Header = () => {
    return (
        <Container>
            <Heading
                pt={6}
                fontSize="30px"
                as="h1">
                The Metropolitan Museum of Art
            </Heading>
        </Container>
    )
}

