import { Box, Card, Heading, Image, List, ListItem, Spinner } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { NotAllowedIcon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux"
import axios from 'axios'

import { printIfAvailable } from '../../utils/index'
import { fetchDetail } from './ResultSlice'
import './styles.css'

export const ResultGalleryItem = ({ objectID }) => {
    const [data, setData] = useState(null);
    const [fetching, setFetching] = useState(false);
    const dispatch = useDispatch();
    
    useEffect(()=>{
        const fetchPreview = async () => {
            try {
                const url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
                const { data } = await axios.get(url)

                setData({ ...data });
                setFetching(false);
            } catch (e) {
                console.log(e);
            }
            };
            fetchPreview();
    }, [objectID])

    const handleClick = () => dispatch(fetchDetail(objectID))

    if(data == null) return <></>
    if(fetching) return <Spinner size='xs' />

    return (
        <Card p={2}
            _hover={{ background: "#e1e1e1" }}
            width="200px"
            display="flex"
            height="100%"
            onClick={handleClick}
        >
            <div height="100px" width="100%">
                {data.primaryImage ?
                    <Image
                        src={data.primaryImage}
                        alt={data.title}
                        height="100px"
                        mx="auto"
                        pb={2}
                    />
                    :
                    <Box height="100px" display="flex">
                        <NotAllowedIcon w={10} h={10} color="#d7d7d7" className="not-allowed-icon" />
                    </Box>
                }
            </div>
            <List>
                <ListItem className="trim3">
                    <Heading as="h6" fontSize={16}>{data.title}</Heading>
                </ListItem>
                <ListItem className="trim2">{printIfAvailable(data.artistDisplayName)}</ListItem>
            </List>
        </Card>
    )
}