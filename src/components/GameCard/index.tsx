import {
  Avatar,
  Box,
  Text,
  Stack,
  Button,
  useColorModeValue,
  Flex,
  Wrap,
  WrapItem,
  Tooltip,
  ToastProps,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import Image from "next/image";
import { GameCardProps } from "./types";
import brazilFlag from "./flags/brazil-flag.png";
import serbiaFlag from "./flags/serbia.png";
import switzerlandFlag from "./flags/switzerland.png";
import cameroonFlag from "./flags/cameroon.png";
import fifaFlag from "./flags/fifa.png";

import { CloseIcon } from "@chakra-ui/icons";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import useSWR from "swr";

const handleFlag = (team: string) => {
  switch (team) {
    case "Brasil":
      return brazilFlag;
    case "Sérvia":
      return serbiaFlag;
    case "Suíça":
      return switzerlandFlag;
    case "Camarões":
      return cameroonFlag;
    default:
      return fifaFlag;
  }
};

export default function GameCard({
  id,
  homeTeam,
  awayTeam,
  location,
  time,
}: GameCardProps) {
  const fetcher = (url: RequestInfo | URL) => fetch(url).then((r) => r.json());

  const { data: session, status } = useSession();
  const {
    data: gameInfo,
    isValidating,
    mutate,
  } = useSWR(`/api/game?id=${id}`, fetcher);

  const toast = useToast();
  const router = useRouter();

  let alreadyRegister = false;

  function Toast({
    title,
    description,
    status,
    duration = 3000,
    isClosable,
  }: ToastProps) {
    return toast({
      title,
      description,
      status,
      duration,
      isClosable,
    });
  }

  const handleClick = async () => {
    if (status !== "authenticated") {
      Toast({
        title: "Você precisa estar na seleção para isso",
        description: "Não seja um gabigol, venha fazer parte da seleção",
        status: "warning",
      });

      setTimeout(() => {
        router.push("/auth/entrar");
      }, 500);
    } else {
      try {
        const body = {
          id: id,
          email: session?.user?.email,
          userName: session?.user?.name,
          userPhoto: session?.user?.image,
        };

        const res = await fetch(`/api/post`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (res.status !== 200) {
          return Toast({
            title: "Ocorreu um erro ao confirmar presença",
            description: "Mas não desista, comunique isso ao dev preguiçoso!",
            status: "error",
          });
        }
        mutate();
      } catch (error) {}
    }
  };

  if (gameInfo && gameInfo.length) {
    gameInfo.map((info: any) => {
      if (info.userMail === session?.user?.email) {
        alreadyRegister = true;
      }
    });
  }

  return (
    <Box
      maxW={"400px"}
      w={"full"}
      bg={useColorModeValue("gray.50", "blue.900")}
      boxShadow={"2xl"}
      rounded={"lg"}
      p={6}
      textAlign={"center"}
    >
      <Flex
        width="100%"
        justifyContent="space-evenly"
        alignItems="center"
        pb={5}
      >
        <Image
          alt={homeTeam}
          src={handleFlag(homeTeam)}
          width={70}
          height={70}
          style={{
            borderRadius: "100%",
          }}
        />
        <CloseIcon />
        <Image
          alt={awayTeam}
          src={handleFlag(awayTeam)}
          width={70}
          height={70}
          style={{
            borderRadius: "100%",
          }}
        />
      </Flex>
      <Flex
        width="100%"
        justifyContent="center"
        alignItems="center"
        pb={1}
        fontWeight={400}
      >
        <FaMapMarkerAlt
          color={useColorModeValue("#48BB78", "#48BB78")}
          style={{ marginRight: "0.5rem" }}
        />{" "}
        {location}
      </Flex>
      <Flex
        width="100%"
        justifyContent="center"
        alignItems="center"
        fontWeight={400}
      >
        <FaCalendarAlt
          color={useColorModeValue("#48BB78", "#48BB78")}
          style={{ marginRight: "0.5rem" }}
        />{" "}
        {time}
      </Flex>

      <Text w="100%" fontFamily={"body"} fontWeight={700} mt={7} mb={2}>
        Jogadores confirmados
      </Text>
      <Flex
        width="100%"
        justifyContent="left"
        alignItems="center"
        fontWeight={600}
      >
        {isValidating ? (
          <Wrap w="100%" fontFamily={"body"} fontWeight={300} mt={6}>
            <Spinner />
          </Wrap>
        ) : gameInfo && gameInfo.length ? (
          gameInfo.map((user: any) => (
            <Wrap key={user.id} ml={1}>
              <WrapItem>
                <Tooltip label={user.userName} placement="top">
                  <Avatar name={user.userName} src={user.userPhoto} />
                </Tooltip>
              </WrapItem>
            </Wrap>
          ))
        ) : (
          <Text w="100%" fontFamily={"body"} fontWeight={300} mt={6}>
            Seleção vazia por enquanto
          </Text>
        )}
      </Flex>

      <Stack mt={8} direction={"row"} spacing={4}>
        {isValidating ? (
          <Button
            flex={1}
            fontSize={"sm"}
            rounded={"full"}
            bg={"green.400"}
            color={"white"}
            _hover={{
              bg: "green.500",
            }}
            _focus={{
              bg: "green.500",
            }}
          >
            <Spinner />
          </Button>
        ) : alreadyRegister ? (
          <Button
            flex={1}
            fontSize={"sm"}
            rounded={"full"}
            bg={"green.400"}
            color={"white"}
            _hover={{
              bg: "green.500",
            }}
            _focus={{
              bg: "green.500",
            }}
            disabled
          >
            Presença confirmada!
          </Button>
        ) : (
          <Button
            flex={1}
            fontSize={"sm"}
            rounded={"full"}
            bg={"blue.400"}
            color={"white"}
            boxShadow={
              "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
            }
            _hover={{
              bg: "blue.500",
            }}
            _focus={{
              bg: "blue.500",
            }}
            onClick={handleClick}
          >
            Confirmar presença
          </Button>
        )}
      </Stack>
    </Box>
  );
}
