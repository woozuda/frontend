"use client";

import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";

export interface LogoutButtonProps {
  text?: string;
}

export default function LogoutButton(props: LogoutButtonProps) {
  const { text = "Logout" } = props;
  const queryClient = useQueryClient();
  const logout = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/logout`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Logout failed");
      }
      await queryClient.setQueryData(["AUTHORIZATION"], () => {
        return false;
      });
      console.log("Login successful:");
    } catch (error) {
      console.error("Logout Error", error);
    }
  };
  return (
    <div className="w-[81px] h-[30px]">
      <Button
        className="w-full h-full p-0 flex items-center justify-center border-app-gray-700 border rounded-[20px] bg-transparent"
        onClick={logout}
        variant="outline"
      >
        {text}
      </Button>
    </div>
  );
}
