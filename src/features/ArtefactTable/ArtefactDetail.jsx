import { List, ListItem, Heading, Grid, Box, Card, GridItem, HStack, Image, Link, Tag, Text } from "@chakra-ui/react"
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { useDispatch } from "react-redux";

import { searchQuery, setSearchedTerm, resetSearch, setOption } from './../Search/SearchSlice';

import './styles.css'

const DataRecordText = ({ text, data, search }) => {
    if (data !== "") {
        return search ?
            <Text mb={1.5} fontSize="sm"><strong>{text}: </strong>
                <Link mr={1} onClick={(e) => search(data)}> {data}</Link>
            </Text>
            :
            <Text mb={1.5} fontSize="sm"><strong>{text}:</strong><span> {data}</span></Text>
    }

}

const DataRecordLink = ({ data }) => {
    const links = data.filter(item => item.data != "")

    if (links)
        return <Box mb={1.5}>
            <Text mb={1.5} display="inline" fontSize="sm"><strong>Links: </strong></Text>
            {
                links.map((link, i) =>
                    <Link key={i} mb={1.5} mr={1} display="inline" fontSize="sm" href={link.data} isExternal>{link.text}
                        <ExternalLinkIcon mb={1} ml={0.4} />
                    </Link>
                )
            }
        </Box>
}

const DataRecordTag = ({ text, data, searchTag }) => {
    if (data) {
        return (
            <>
                <Text mb={1.5} fontSize="sm" display="inline"><strong>{text}: </strong></Text>
                <HStack display="inline-block">
                    {data.map((tag, i) =>
                        <Link key={i} className="tags" onClick={(e) => searchTag(tag.term)}>
                            <Tag key={i} mb={1} variant='solid' className="tags" colorScheme='teal'>
                                {tag.term}
                            </Tag>
                        </Link>
                    )}
                </HStack>
            </>
        )
    }
}

export const ArtefactDetail = ({ data }) => {
    const dispatch = useDispatch();

    const searchArtist = e => {
        dispatch(resetSearch);
        dispatch(setOption(1));
        dispatch(setSearchedTerm(e));
        dispatch(searchQuery("artistOrCulture", e));
    }

    const searchTag = e => {
        dispatch(resetSearch);
        dispatch(setOption(3));
        dispatch(setSearchedTerm(e));
        dispatch(searchQuery("tags", e));
    }

    return (
        <Card ml={7} mr={1} mb={3} p={4} >
            <Grid gridTemplateColumns="1fr 1fr" minHeight="110px" gap={1} mx="auto" minWidth="100%">
                <GridItem my="auto">
                    <List>
                        <ListItem>
                            <Heading as="h5" size="sm">{data.title}</Heading>
                        </ListItem>
                        <ListItem fontWeight="bold" color="gray">{data.objectDate}</ListItem>
                        <ListItem fontSize="sm">
                            <Link mr={1} onClick={(e) => searchArtist(data.artistDisplayName)}>
                                {data.artistDisplayName}
                            </Link>
                            {data.artistNationality}
                        </ListItem>
                        {data.isHighlight &&
                            <ListItem mt={1}>
                                <Tag colorScheme='green' minWidth="68px" maxHeight="22px" variant='solid' >highlited</Tag>
                            </ListItem>
                        }
                    </List>
                </GridItem>
                <GridItem>
                    {data.primaryImageSmall &&
                        <div maxHeight="300px" width="100%" m="auto">
                            <Image
                                src={data.primaryImageSmall}
                                alt={data.title}
                                mx="auto"
                                my={2}
                                maxHeight="300px"
                            />
                        </div>
                    }
                </GridItem>
            </Grid>

            <Box display="block" className="artefactDetailCard">
                <DataRecordText text={"Department"} data={data.department} />
                <DataRecordText text={"Culture"} data={data.culture} search={searchArtist} />
                <DataRecordText text={"Country"} data={data.country} />
                <DataRecordText text={"City"} data={data.city} />
                <DataRecordText text={"Medium"} data={data.medium} />
                <DataRecordText text={"Credit line"} data={data.creditLine} />
                <DataRecordText text={"Period"} data={data.period} />
                <DataRecordLink data={[{ text: "Object", data: data.objectURL }, { text: "Artist", data: data.artistWikidata_URL }]} />
                <DataRecordTag text={"Tags"} data={data.tags} searchTag={searchTag} />
            </Box>

        </Card>
    )
}