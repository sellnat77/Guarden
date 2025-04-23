import { Outlet } from "react-router";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import { Account } from "@toolpad/core";
import { useSession } from "../SessionContext";
import { LinearProgress } from "@mui/material";
import { Navigate } from "react-router";

function CustomAccount() {
  return (
    <Account
      slotProps={{
        preview: { slotProps: { avatarIconButton: { sx: { border: "0" } } } },
      }}
    />
  );
}

export default function Layout() {
  const { session, loading } = useSession();

  if (loading) {
    return (
      <div style={{ width: "100%" }}>
        <LinearProgress />
      </div>
    );
  }

  if (!session) {
    // Add the `callbackUrl` search parameter
    const redirectTo = `/sign-in`;

    return <Navigate to={redirectTo} replace />;
  }
  return (
    <DashboardLayout slots={{ toolbarAccount: CustomAccount }}>
      <PageContainer>
        <Outlet />
      </PageContainer>
    </DashboardLayout>
  );
}
