import { ReactElement } from "react";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
} from "next";
import HeaderWhite from "@/components/sections/HeaderWhite";
import { ContainerPrimary } from "@/components/core/Layout";
import ImageCarousel from "@/components/sections/ImageCarousel";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  if (!context.params) {
    const result: GetServerSidePropsResult<undefined> = { notFound: true };
    return result;
  }

  // @ts-ignore
  const { id } = context.params;
  // TODO: database lookup based on id (return notFound if doesn't exist)

  const props = {
    title: "Beautiful apartment with great view",
    city: "Kanata",
    price: 1000,
    poster: {
      name: "Emad Fadel",
      joined: 123456789,
    },
    details: {
      numBedrooms: 1,
      numBeds: 1,
      numBaths: 1,
    },
    images: [
      "https://placekitten.com/1000/600",
      "https://placekitten.com/400/600",
      "https://placekitten.com/800/600",
      "https://placekitten.com/1200/300",
    ],
  };
  const result: GetServerSidePropsResult<typeof props> = { props };

  return result;
};

function ListingPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
): ReactElement {
  const { images } = props;

  return (
    <>
      <HeaderWhite />
      <ImageCarousel images={images} />
      <ContainerPrimary>{JSON.stringify(props)}</ContainerPrimary>
    </>
  );
}

export default ListingPage;
