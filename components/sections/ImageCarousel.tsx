import { useRef, useState, ReactElement } from "react";
import styled from "@emotion/styled";
import { Box, IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = styled(Slider)`
  .slick-dots {
    button::before {
      font-size: 12px;
      color: white !important;
    }
  }
`;

interface ArrowButtonProps {
  ariaLabel: string;
  pos: "left" | "right";
  icon: ReactElement;
  faded: boolean;
  clickFunc: () => any;
}

const ArrowButton = ({
  ariaLabel,
  pos,
  icon,
  faded,
  clickFunc,
}: ArrowButtonProps) => (
  <IconButton
    aria-label={ariaLabel}
    icon={icon}
    {...{ [pos]: "32px" }}
    opacity={faded ? 0.5 : 1}
    onClick={clickFunc}
    rounded="full"
    zIndex={1}
    position="absolute"
    top="50%"
    transform="translateY(-50%)"
    color="text.primary"
    fontSize="24px"
    background="common.light"
    borderWidth="1px"
    borderStyle="solid"
    borderColor="common.dark_hover"
    _hover={{ background: "common.light_hover" }}
    _active={{ background: "common.light_active" }}
  />
);

interface ImageCarouselProps {
  images: string[];
}

function ImageCarousel({ images }: ImageCarouselProps): ReactElement {
  const carouselRef = useRef<Slider>(null);
  const [isMouseOut, setMouseOut] = useState(true);

  return (
    <Box
      background="white"
      onMouseOver={() => setMouseOut(false)}
      onMouseOut={() => setMouseOut(true)}
    >
      <Carousel
        ref={carouselRef}
        dots
        infinite
        fade
        speed={100}
        prevArrow={
          <ArrowButton
            ariaLabel="Previous"
            pos="left"
            icon={<ChevronLeftIcon />}
            faded={isMouseOut}
            clickFunc={() => carouselRef.current?.slickPrev()}
          />
        }
        nextArrow={
          <ArrowButton
            ariaLabel="Next"
            pos="right"
            icon={<ChevronRightIcon />}
            faded={isMouseOut}
            clickFunc={() => carouselRef.current?.slickNext()}
          />
        }
        appendDots={(dots) => (
          <Box
            bottom="16px"
            width="max-content"
            left="50%"
            transform="translateX(-50%)"
          >
            {dots}
          </Box>
        )}
      >
        {images.map((image, index) => (
          <Box key={`${index}-${image}`} height="6in">
            <Box
              zIndex={1}
              position="absolute"
              width="100%"
              height="100%"
              backgroundImage={`url(${image})`}
              backgroundRepeat="no-repeat"
              backgroundPosition="center"
              backgroundSize="contain"
            />
            <Box
              position="absolute"
              width="100%"
              height="100%"
              backgroundImage={`url(${image})`}
              backgroundRepeat="no-repeat"
              backgroundPosition="center"
              backgroundSize="cover"
              filter="blur(16px) brightness(1.1) opacity(0.75)"
              transform="scale(1.1)"
            />
          </Box>
        ))}
      </Carousel>
    </Box>
  );
}

export default ImageCarousel;
