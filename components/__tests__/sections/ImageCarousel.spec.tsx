import React from "react";
import { shallow } from "enzyme";
import { Box } from "@chakra-ui/react";
// import styled from "@emotion/styled";
// import Slider from "react-slick";
import ImageCarousel from "../../sections/ImageCarousel";

describe("ImageCarousel Test", () => {
  // TODO: Handle image carousel using mock data and scroll through images
  const wrapper = shallow(<ImageCarousel images={[]} />);
  // const Carousel = styled(Slider)`
  //   min-height: 6in;

  //   .slick-dots {
  //     button::before {
  //       font-size: 12px;
  //       color: white !important;
  //     }
  //   }
  // `;

  it("Base Box Exist", () => {
    const base = wrapper.find(Box);
    expect(base.length).toBe(1);
  });
});
