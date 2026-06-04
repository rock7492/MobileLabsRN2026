import { Redirect, Stack } from "expo-router";
import { useAuth } from "../../context/AuthContext";

export default function AdminLayout() {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return <Redirect href="/" />;
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#FFFFFF",
        },
        headerTitleStyle: {
          color: "#111827",
          fontWeight: "800",
        },
        headerTintColor: "#2563EB",
        contentStyle: {
          backgroundColor: "#F4F6FA",
        },
      }}
    />
  );
}
