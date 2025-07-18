import { Heading, Text } from "@isz-dsystem/react";
import { Container, Hero, Preview } from "./styles";

import { NextSeo } from "next-seo";
import Image from "next/image";
import previewImage from "../../assets/app-preview.png";
import { ClaimUsernameForm } from "./components/ClaimUsernameForm";

export default function Home() {
  return (
    <>
      <NextSeo
        title="Descomplique sua vida | Yss Call"
        description="Conecte seu calendario e permita que as pessoas marquem agendamentos no sem tempo livre."
      />
      <Container>
        <Hero>
          <Heading size="3xl">Agendamento descomplicado</Heading>
          <Text size="xl">
            Conecte seu calendário e permita que as pessoas marquem agendamentos
            no seu tempo livre.
          </Text>
          <ClaimUsernameForm />
        </Hero>
        <Preview>
          <Image
            src={previewImage}
            width={827}
            height={442}
            alt="Image of application preview"
          />
        </Preview>
      </Container>
    </>
  );
}
