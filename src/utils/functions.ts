import { signOut } from "next-auth/react";
import { UseToastOptions } from "@chakra-ui/react";

interface ApiResponse {
  error: string;
}

export const handleEditPermissionResponse = (
  res: ApiResponse,
  clear: () => void,
  toast: (options?: UseToastOptions | undefined) => void
) => {
  if (res.error === "Unauthorized") {
    toast({
      description: "Login token expired please login again",
      position: "top",
      status: "error",
      duration: 3000,
      isClosable: false,
    });
    signOut();
  } else if (res.error !== "") {
    toast({
      description: `Request failed, ${res.error}`,
      position: "top",
      status: "error",
      duration: 3000,
      isClosable: false,
    });
  } else {
    toast({
      description: "Request sent successfully",
      position: "top",
      status: "success",
      duration: 3000,
      isClosable: false,
    });
    clear();
  }
};
