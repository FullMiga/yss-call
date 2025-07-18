import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Text, TextInput } from "@isz-dsystem/react";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import z from "zod";
import { Form, FormAnnotation } from "./styles";

// interface Props { }

const claimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be more than 3 characters" })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'Usernames must contain only letters "a-Z and "-"',
    })
    .transform((username) => username.toLowerCase()),
});

type ClaimUsernamFormData = z.infer<typeof claimUsernameFormSchema>;

export function ClaimUsernameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClaimUsernamFormData>({
    resolver: zodResolver(claimUsernameFormSchema),
    defaultValues: {
      username: "",
    },
  });

  const router = useRouter();

  async function handleClaimUsername(data: ClaimUsernamFormData) {
    const { username } = data;

    await router.push(`/register?username=${username}`);
  }

  return (
    <>
      <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
        <TextInput
          prefix="yss.com/"
          placeholder="username"
          {...register("username")}
        />
        <Button size="md" type="submit" disabled={isSubmitting}>
          Get username
          <ArrowRight />
        </Button>
      </Form>
      <FormAnnotation>
        <Text size="sm">
          {errors.username
            ? errors.username.message
            : "Enter your desired username"}
        </Text>
      </FormAnnotation>
    </>
  );
}
