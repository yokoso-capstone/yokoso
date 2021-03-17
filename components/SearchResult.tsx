import {
	Box, 
	Image, 
	Grid,
	GridItem,
	Stack
} from "@chakra-ui/react";
import {
	Body1, 
	Caption, 
} from "@/components/core/Text";

interface ResultProps {
    id: string;
    imageUrl: string;
    title: string;
    numBeds: string;
    numBath: string;
    location: string;
    price: string;
}

function SearchResult(props: ResultProps){
	const{ 
		imageUrl, 
		title, 
		numBeds, 
		numBath, 
		location, 
		price
	}= props;

	return(
		<Box maxW="2xl" borderRadius="lg" p="5">
			<Grid templateColumns="repeat(6, 1fr)" gap={4}>
				<GridItem colSpan={2}>
					<Box w="100%" h="100%" maxWidth="200px">
						<Image src={imageUrl} borderRadius="lg"/>
					</Box>
				</GridItem>
				<GridItem colSpan={4}>
					<Box pt="3" pr="3">
						<Stack spacing={2}>
							<Box>
								<Caption fontSize="14px">{location}</Caption>
								<Body1 fontSize="18px">{title}</Body1>
							</Box>
							<Box>
								<Caption fontSize="14px">{numBeds} Bedrooms · {numBath} Bathrooms</Caption>
							</Box>
							<Box>
								<Body1 textAlign="right" fontweight="300">{price} /month</Body1>
							</Box>
						</Stack>
					</Box>
				</GridItem>
			</Grid>
		</Box>
	)
}

export default SearchResult;