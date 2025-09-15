import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth";

type Props = { children?: React.ReactNode };

export default function Protected({ children }: Props) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children ? <>{children}</> : <Outlet />;
}
