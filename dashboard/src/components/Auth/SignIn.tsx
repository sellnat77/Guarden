"use client";
import Alert from "@mui/material/Alert";
import { SignInPage } from "@toolpad/core/SignInPage";
import { Navigate, useNavigate } from "react-router";
import { useSession, type Session } from "../../SessionContext";
import auth from "../../api/auth";

function DemoInfo() {
  return (
    <Alert severity="info">
      You can use <strong>maria@email.com</strong> with the password{" "}
      <strong>guess</strong> to test
    </Alert>
  );
}

export default function SignIn() {
  const { session, setSession } = useSession();
  const navigate = useNavigate();

  if (session) {
    return <Navigate to="/" />;
  }

  return (
    <SignInPage
      providers={[{ id: "credentials", name: "Email and Password" }]}
      signIn={async (provider, formData, callbackUrl) => {
        try {
          const email = formData?.get("email") as string;
          const password = formData?.get("password") as string;

          if (!email || !password) {
            return { error: "Email and password are required" };
          }

          const { data: result } = await auth.login(email, password);

          if (result) {
            // Convert Firebase user to Session format
            const userSession: Session = {
              user: {
                name: "testName", // || "",
                email: "testEmail", // || "",
                image: "test", //result.user.photoURL || "",
                token: "myToken",
              },
            };
            setSession(userSession);
            navigate(callbackUrl || "/", { replace: true });
            return {};
          }
          return { error: result?.error || "Failed to sign in" };
        } catch (error) {
          return {
            error: error instanceof Error ? error.message : "An error occurred",
          };
        }
      }}
      slots={{ subtitle: DemoInfo }}
      slotProps={{
        emailField: {
          defaultValue: "maria@email.com",
        },
        passwordField: {
          defaultValue: "guess",
        },
      }}
    />
  );
}
