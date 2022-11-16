/* eslint-disable @next/next/no-page-custom-font */
import { Container, Heading, Text } from "@chakra-ui/react";
import Head from "next/head";
import Footer from "../src/components/Footer";
import GameCard from "../src/components/GameCard";
import Header from "../src/components/Header";
import prisma from "../lib/prismadb";
import { GetStaticProps } from "next";
import { GameCardProps } from "../src/components/GameCard/types";

export default function Home({ gamesResponse }: any) {
  return (
    <>
      <Head>
        <title>HomeZone - Copa Edition</title>
      </Head>
      <Header />
      <Container
        maxW={"7xl"}
        minH={"100%"}
        p={7}
        display="flex"
        gap={5}
        mt={7}
        justifyContent="center"
      >
        <Heading
          fontWeight={600}
          textAlign="center"
          fontSize={{ base: "5xl", sm: "4xl", md: "6xl" }}
          fontFamily={"Caveat"}
          lineHeight={"110%"}
        >
          Central oficial dos jogos da copa <br />
          <Text as={"span"} color={"green.400"}>
            HomeZone
          </Text>
        </Heading>
      </Container>

      <Container
        maxW={"7xl"}
        p={4}
        display="flex"
        flexWrap="wrap"
        gap={5}
        justifyContent="space-between"
      >
        {gamesResponse?.reverse().map((game: GameCardProps) => (
          <GameCard
            key={game.id}
            id={game.id}
            homeTeam={game.homeTeam}
            awayTeam={game.awayTeam}
            location={game.location}
            time={game.time}
          />
        ))}
      </Container>
      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const gamesResponse = await prisma.game.findMany();

  return {
    props: { gamesResponse },
  };
};
