import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();
  const { colorMode, toggleColorMode } = useColorMode();
  const friendlyAdjectiveArr = [
    "O indigno",
    "O vassal",
    "A meretriz",
    "O cansado",
    "O despojado",
    "O inútil",
    "O mertil",
    "O derrubado",
    "O humilhado",
  ];
  const [adjective, setAdjective] = useState("O humilhado");

  useEffect(() => {
    setAdjective(friendlyAdjectiveArr[(Math.random() * 8).toFixed()]);
  }, []);

  let fullName;

  if (session) {
    fullName = session.user?.name?.split(" ");
  }

  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Box>HexaZone</Box>

        <Flex alignItems={"center"}>
          <Stack direction={"row"} spacing={3}>
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
            {session ? (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={
                      session.user?.image ??
                      "https://avatars.dicebear.com/api/male/username.svg"
                    }
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      src={
                        session.user?.image ??
                        "https://avatars.dicebear.com/api/male/username.svg"
                      }
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>
                      {fullName ? fullName[0] : ""} - {adjective}
                    </p>
                  </Center>
                </MenuList>
              </Menu>
            ) : (
              <Button
                display={{ base: "inline-flex", md: "inline-flex" }}
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"green.400"}
                as={"a"}
                _hover={{
                  bg: "green.500",
                }}
                href={"auth/entrar"}
              >
                Juntar-se a seleção
              </Button>
            )}
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}
