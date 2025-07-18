import { Button, Heading, MultiStep, Text } from "@isz-dsystem/react";
import { ArrowRight, Check } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { Container, Header } from "../styles";
import { AuthError, ConnectBox, ConnectItem } from "./styles";

export default function ConnectCalendar() {
  const session = useSession();
  const router = useRouter();

  const hasAuthError = !!router.query.error;
  const isSignedIn = session.status === "authenticated";

  async function handleSignIn() {
    await signIn("google");
  }

  async function handleNavigateToNextStep() {
    await router.push("/register/time-intervals");
  }

  return (
    <>
      <NextSeo title="Conecte seu Calendario do Google | Yss Call" noindex />
      <Container>
        <Header>
          <Heading as="strong">Conecte sua agenda!</Heading>
          <Text>
            Conecte o seu calendário para verificar automaticamente as horas
            ocupadas e os novos eventos à medida em que são agendados.
          </Text>
          <MultiStep size={4} currentStep={2} />
        </Header>

        <ConnectBox>
          <ConnectItem>
            <Text>Google Calendar</Text>
            {isSignedIn ? (
              <Button variant="secondary" size="sm" disabled>
                Connected
                <Check />
              </Button>
            ) : (
              <Button variant="secondary" size="sm" onClick={handleSignIn}>
                Connect <ArrowRight />
              </Button>
            )}
          </ConnectItem>
          {hasAuthError && (
            <AuthError size="sm">
              Falha ao conectar ao Google, verifique se voce habilitou as
              permissoes de acesso ao Google Calendar.
            </AuthError>
          )}

          <Button
            type="submit"
            disabled={!isSignedIn}
            onClick={handleNavigateToNextStep}
          >
            Next step <ArrowRight />
          </Button>
        </ConnectBox>
      </Container>
    </>
  );
}
