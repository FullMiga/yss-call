import { api } from "@/lib/axios";
import { buildNextAuthOption } from "@/pages/api/auth/[...nextauth].api";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Avatar,
  Button,
  Heading,
  MultiStep,
  Text,
  TextArea,
} from "@isz-dsystem/react";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import z from "zod";
import { Container, Header } from "../styles";
import { FormAnnotation, ProfileBox } from "./styles";

const updateProfileSchema = z.object({
  bio: z.string(),
});

type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;

export default function UpdateProfile() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
  });

  const session = useSession();
  const router = useRouter();

  async function handleUpdateProfile(data: UpdateProfileFormData) {
    await api.put("/users/profile", {
      bio: data.bio,
    });

    await router.push(`/schedule/${session.data?.user.username}`);
  }

  return (
    <>
      <NextSeo title="Atualize seu perfil | Yss Call" noindex />
      <Container>
        <Header>
          <Heading as="strong">Defina sua disponibilidade</Heading>
          <Text>Por último, uma breve descrição e uma foto de perfil.</Text>
          <MultiStep size={4} currentStep={4} />
        </Header>

        <ProfileBox as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
          <label>
            <Text>Foto de perfil</Text>
            <Avatar
              src={session.data?.user.avatar_url}
              alt={session.data?.user.name}
            />
          </label>
          <label>
            <Text size="sm">Sobre você</Text>
            <TextArea {...register("bio")} />
            <FormAnnotation size="sm">
              Fale um pouco sobre você. Isto será exibido em sua página pessoal.
            </FormAnnotation>
          </label>
          <Button type="submit" disabled={isSubmitting}>
            Finalizar
          </Button>
        </ProfileBox>
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(
    req,
    res,
    buildNextAuthOption(req, res)
  );

  return {
    props: {
      session,
    },
  };
};
