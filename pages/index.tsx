import Head from "next/head";
import React, {useEffect, useState} from "react";
import {Box, Text, useToast} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import useFetch from "use-http";
import {serverUrl} from "../src/constants";

const Home = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const toast = useToast();
  const [phone, setPhone] = useState<string>();
  const {post, data = undefined, error} = useFetch(serverUrl);

  useEffect(() => {
    const p = localStorage.getItem("phone");
    if (p) setPhone(p);
  }, []);

  useEffect(() => {
    if (Object.keys(errors).length !== 0) {
      if (errors.phone.pattern) {
        toast({
          status: "error",
          title: "Phone must be 9163174484 format!",
        });
      } else {
        toast({
          status: "error",
          title: "Invalid form!",
        });
      }
    }
  }, [errors]);

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      console.log(data);
      toast({
        status: "success",
        title: "RSVP Confirmed",
      });
      setPhone(data.phone);
      localStorage.setItem("phone", data.phone);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast({
        status: "error",
        title: "Error registering!",
        description: "Note you can only signup once per phone",
      });
    }
  }, [error]);

  const onSubmit = async (data: any) => {
    await post("/register", data);
  };

  return (
    <div>
      <Head>
        <title>Flare - Find Berkeley Parties</title>
        <meta name="title" content="Flare - Find Berkeley Parties"/>
        <meta name="description"
              content="Flare makes it easy to find and host awesome parties in Berkeley. Join today for exclusive access to great parties near you. "/>

        <meta property="og:type" content="website"/>
        <meta property="og:url" content="https://beta.flaresocial.app/"/>
        <meta property="og:title" content="Flare - Find Berkeley Parties"/>
        <meta property="og:description"
              content="Flare makes it easy to find and host awesome parties in Berkeley. Join today for exclusive access to great parties near you. "/>
        <meta property="og:image"
              content="https://i.imgur.com/fp2QjfP.png"/>

        <meta property="twitter:card" content="summary_large_image"/>
        <meta property="twitter:url" content="https://beta.flaresocial.app/"/>
        <meta property="twitter:title" content="Flare - Find Berkeley Parties"/>
        <meta property="twitter:description"
              content="Flare makes it easy to find and host awesome parties in Berkeley. Join today for exclusive access to great parties near you. "/>
        <meta property="twitter:image"
              content="https://i.imgur.com/fp2QjfP.png"/>
        <link rel="icon" href="/favicon.ico"/>
        <link
          href="https://fonts.googleapis.com/css?family=Roboto Mono"
          rel="stylesheet"
        />
      </Head>

      <main>
        <Box
          height="100vh"
          backgroundImage="url('./bg.svg')"
          backgroundSize="cover"
          justifyContent="center"
          alignItems="center"
          display={{base: "block", md: "flex"}}
          flexDirection="row"
          padding={4}
          paddingTop={{base: 14, md: 4}}
        >
          <Box
            flex={1}
            display="flex"
            alignItems={{base: undefined, md: "center"}}
            justifyContent={{md: "center"}}
          >
            <Text
              as="h1"
              fontSize={{base: "4xl", md: "148px"}}
              color={{base: "gray.700,", md: "white"}}
              transform={{base: undefined, md: "rotate(-90deg)"}}
              fontWeight="bold"
              letterSpacing="widest"
            >
              FLARE
            </Text>
          </Box>
          <Box flex={1}>
            <Text
              as="h1"
              fontWeight="bold"
              fontSize="3xl"
              color={{base: "gray.700", md: "#F49D37"}}
            >
              June 26th
            </Text>
            <Text
              as="h1"
              fontWeight="bold"
              fontSize="3xl"
              color={{base: "gray.700", md: "#F49D37"}}
            >
              Berkeley, CA
            </Text>
            <Box
              as="ul"
              style={{listStylePosition: "inside", color: "#958E86"}}
              mt={2}
            >
              <Text as="li"/>Jungle Juice</Text>
            <Text as="li"/>Music</Text>
          <Text as="li"/>One big ass house</Text>
        <Text as="li"/>Addy dropped 8PM
      </Text>
    </Box>
  {
    phone ? (
      <Box mt={4}>
        <Text fontSize="lg" color="green.500"/>
        Registered under {phone}
      </Text>
  </Box>
  ) : (
  <Box
  as="form"
  onSubmit={handleSubmit(onSubmit)}
  maxWidth={{ base: undefined, md: "300px" }}
  >
  <Text fontSize="xs" mt={4}>
  Name
  </Text>
  <Input
  placeholder="Caelin Sutch"
  type="text"
  border="2px solid #979797"
  borderColor="#979797"
  _hover={{ color: "#777777" }}
  _placeholder={{ color: "#979797" }}
  mt={2}
  {...register("name", {
  required: true,
  })}
  />

  <Text fontSize="xs" mt={4}>
  Phone
  </Text>

  <Input
  placeholder="9163174484"
  type="text"
  border="2px solid #979797"
  borderColor="#979797"
  _hover={{ color: "#777777" }}
  _placeholder={{ color: "#979797" }}
  mt={2}
  {...register("phone", {
  required: true,
  pattern: /^[0-9]*$/i,
  })}
  />
  <Text fontSize="xs" mt={4}>
  IG Handle
  </Text>
  <Input
  placeholder="@caelinsutch"
  type="text"
  border="2px solid #979797"
  borderColor="#979797"
  _hover={{ color: "#777777" }}
  _placeholder={{ color: "#979797" }}
  mt={2}
  {...register("instagram", {
  required: true,
  })}
  />
  <Input
  as="input"
  type="submit"
  borderColor="transparent"
  backgroundColor="#F49D37"
  color="white"
  mt={4}
  value="RSVP"
  />
  </Box>
  )}
  </Box>
  </Box>
  </main>
  </div>
  );
  };

  export default Home;
