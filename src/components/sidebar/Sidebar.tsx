"use client";

import { Box, Flex, IconButton, VStack, Image } from "@chakra-ui/react";
import { RiMenuFoldLine, RiMenuUnfoldLine } from "react-icons/ri";
import { useState } from "react";
import { motion } from "framer-motion";
import NavigationLink from "../common/NavigationLink";
import AccordionNavigationLink from "../common/ContractsNavigationLink";

const MotionBox = motion(Box);

export default function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <MotionBox
            display={{ base: "none", md: "initial" }}
            w={isCollapsed ? "60px" : "295px"}
            p={isCollapsed ? "24px 16px" : "24px"}
            bg="white"
            h="100%"
            minH={"100vh"}
            overflowX={isCollapsed ? "hidden" : "auto"}
            initial={{ width: "295px", padding: "24px" }}
            animate={{
                width: isCollapsed ? "60px" : "295px",
                padding: isCollapsed ? "24px 16px" : "24px",
            }}
            transition={{ duration: 0.3 }}
        >
            <Flex direction={"column"} gap={{ base: "20px", md: "24px" }}>
                <Image
                    w={"fit-content"}
                    src={"/icons/dots.svg"}
                    alt="feature-logo"
                />
                <Flex justifyContent={"space-between"} alignItems={"center"}>
                    <Image
                        w={isCollapsed ? 0 : "118px"}
                        src={"/images/core-logo.svg"}
                        alt="feature-logo"
                        transition={"linear 0.3s"}
                    />
                    <IconButton
                        color={"#287AE0"}
                        fontSize={"24px"}
                        icon={
                            isCollapsed ? (
                                <RiMenuUnfoldLine />
                            ) : (
                                <RiMenuFoldLine />
                            )
                        }
                        onClick={toggleCollapse}
                        aria-label="Collapse sidebar"
                        variant="ghost"
                        size="md"
                        minW={isCollapsed ? "unset" : "40px"}
                    />
                </Flex>

                <VStack
                    transition={"linear 0.3s"}
                    p={isCollapsed ? "12px 0" : "12px"}
                    gap={"36px"}
                    align="stretch"
                >
                    <AccordionNavigationLink
                        icon={"/icons/sidebar-contract.svg"}
                        text="Contracts"
                        link={"/en/dashboard/contracts"}
                    />
                    <NavigationLink
                        icon={"/icons/sidebar-file.svg"}
                        text="Invoices"
                        link={"/en/dashboard/invoices"}
                        linkKey={"invoices"}
                    />
                    <NavigationLink
                        icon={"/icons/sidebar-sign.svg"}
                        text="E-Signatures"
                        link={"signatures"}
                    />
                    <NavigationLink
                        icon={"/icons/sidebar-chart.svg"}
                        text="Insights & Reports"
                        link={"/en/dashboard/insights"}
                        linkKey={"insights"}
                    />
                    <NavigationLink
                        icon={"/icons/sidebar-clients.svg"}
                        text="Permissions"
                        link={"/en/dashboard/permissions/contracts"}
                        linkKey={"permissions"}
                    />
                    <NavigationLink
                        icon={"/icons/sidebar-help.svg"}
                        text="Help & Support"
                        link={"help"}
                    />
                    <NavigationLink
                        icon={"/icons/sidebar-user.svg"}
                        text="Account"
                        link={"/en/dashboard/account"}
                    />
                    <NavigationLink
                        icon={"/icons/sidebar-billing.svg"}
                        text="Billing"
                        link={"billing"}
                    />
                </VStack>
            </Flex>
        </MotionBox>
    );
}
