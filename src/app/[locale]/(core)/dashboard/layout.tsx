import type { Metadata } from "next";
import { Header } from "@/components/core-header";
import { Sidebar } from "@/components/sidebar";
import { Flex } from "@chakra-ui/react";

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Flex minH={"100vh"}>
                <Sidebar />
                <Flex
                    flex={1}
                    direction={"column"}
                    bg={"whitesmoke"}
                    w={"calc(100vw - 300px)"}
                >
                    <Header />
                    {children}
                </Flex>
            </Flex>
        </>
    );
}
