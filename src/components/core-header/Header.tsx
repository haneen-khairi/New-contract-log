"use client";

import {
  Avatar,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import { RiMenuFoldLine, RiMenuUnfoldLine } from "react-icons/ri";
import { SlCloudUpload } from "react-icons/sl";
import NavigationLink from "../common/NavigationLink";
import { FaChevronDown } from "react-icons/fa6";
import { ImportForm } from "../import-form";
import AccordionNavigationLink from "../common/ContractsNavigationLink";

export default function Header() {
  const { data: session } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();

  return (
    <>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        p={{ lg: "16px 48px", md: "16px 36px", sm: "12px 20px" }}
        bg={"white"}
      >
        <IconButton
          variant="ghost"
          icon={<RiMenuUnfoldLine fontSize={"24px"} />}
          onClick={onOpen}
          display={{ lg: "none", md: "none", base: "flex" }}
          aria-label={"menu"}
          color={"#287AE0"}
        />

        <Spacer />
        <Flex gap={{ lg: "24px", base: "18px" }} alignItems={"center"}>
          <Button
            p={{ sm: "12px", md: "14px 16px" }}
            variant={"prime"}
            fontSize={"16px"}
            fontWeight={"300"}
            h={"fit-content"}
            borderRadius={"8px"}
            leftIcon={<SlCloudUpload fontSize={"24px"} />}
            onClick={onOpenModal}
          >
            New Contract
          </Button>
          <Flex alignItems={"center"}>
            <Avatar
              mr={"16px"}
              w={"40px"}
              h={"40px"}
              name={session?.user?.name}
              src=""
            />
            <Text display={{ base: "none", md: "initial" }} fontWeight={"500"}>
              {session?.user?.name}
            </Text>
            <Menu>
              <Button
                color={"#EE7C21"}
                variant={"none"}
                p={"12px"}
                as={MenuButton}
              >
                <FaChevronDown />
              </Button>
              <MenuList>
                <MenuItem isDisabled>Profile</MenuItem>
                <MenuItem
                  onClick={() => {
                    signOut();
                  }}
                  color={"#e6584a"}
                >
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Flex>

      <Modal onClose={onCloseModal} isOpen={isOpenModal} isCentered>
        <ModalOverlay />
        <ModalContent borderRadius={"16px"} w={"95%"} maxW={"520px"}>
          <ModalHeader>
            <Text fontSize={"18"} fontWeight={"700"}>
              Import Contract
            </Text>
            <Text fontSize={"13"} fontWeight={"400"}>
              Select a file to import to your repository
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <Divider orientation="horizontal" />
          <ImportForm onClose={onCloseModal} />
        </ModalContent>
      </Modal>

      <Drawer isOpen={isOpen} onClose={onClose} placement="left" size="sm">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth={1}>
            <Flex justifyContent={"space-between"} alignItems={"center"}>
              <Image
                w={"118px"}
                src={"/images/core-logo.svg"}
                alt="core-logo"
                transition={"linear 0.3s"}
              />
              <IconButton
                color={"#287AE0"}
                fontSize={"24px"}
                icon={<RiMenuFoldLine />}
                onClick={onClose}
                aria-label="Collapse sidebar"
                variant="ghost"
                size="md"
              />
            </Flex>
          </DrawerHeader>
          <DrawerBody>
            <Flex direction={"column"} gap={"24px"} p={"12px 0"}>
              <AccordionNavigationLink
                icon={"/icons/sidebar-contract.svg"}
                text="Contracts"
                link={"/en/dashboard/contracts"}
                p={"8px"}
              />
              <NavigationLink
                icon={"/icons/sidebar-file.svg"}
                text="Invoices"
                link={"/en/dashboard/invoices"}
                linkKey={"invoices"}
                p={"8px"}
              />
              <NavigationLink
                icon={"/icons/sidebar-sign.svg"}
                text="E-Signatures"
                link={"signatures"}
                p={"8px"}
              />
              <NavigationLink
                icon={"/icons/sidebar-chart.svg"}
                text="Insights & Reports"
                link={"/en/dashboard/insights"}
                linkKey={"insights"}
                p={"8px"}
              />
              <NavigationLink
                icon={"/icons/sidebar-clients.svg"}
                text="Permissions"
                link={"/en/dashboard/permissions/contracts"}
                linkKey={"permissions"}
                p={"8px"}
              />
              <NavigationLink
                icon={"/icons/sidebar-help.svg"}
                text="Help & Support"
                link={"help"}
                p={"8px"}
              />
              <NavigationLink
                icon={"/icons/sidebar-user.svg"}
                text="Account"
                link={"account"}
                p={"8px"}
              />
              <NavigationLink
                icon={"/icons/sidebar-billing.svg"}
                text="Billing"
                link={"billing"}
                p={"8px"}
              />
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
