import { useEffect, FunctionComponent } from "react";
import { useRouter } from "next/router";
import RoutePath from "@/src/routes";
import { auth } from "@/src/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import LoadingScreen from "@/components/LoadingScreen";

function withAuth(
  MyComponent: FunctionComponent,
  redirectTo?: RoutePath
): FunctionComponent {
  const AuthRouter = (props: any) => {
    const router = useRouter();
    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
      if (error || (!loading && !user)) {
        router.push(redirectTo || "/");
      }
    }, [router, user, loading, error]);

    if (loading || error || !user) {
      return <LoadingScreen />;
    }

    return <MyComponent {...props} />;
  };

  return AuthRouter;
}

export default withAuth;
