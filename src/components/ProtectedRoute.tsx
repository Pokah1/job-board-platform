// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useAuth } from "@/context/AuthContext";

// const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
//   const { token } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!token) {
//       router.push("/login");
//     }
//   }, [token, router]);

//   if (!token) {
//     return null; //I will work on including a loader effect here.
//   }
//   return <>{children}</>;
// };

// export default ProtectedRoute;
