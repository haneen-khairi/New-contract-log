"use client";

import { Box, Button, Card, CardBody, Divider, Flex, FormControl, Grid, Heading, Input, Modal, ModalContent, ModalHeader, ModalOverlay, Select, useDisclosure, Text, useToast, ModalBody, ModalFooter, ModalCloseButton } from '@chakra-ui/react'

import { FormEvent, useEffect, useRef, useState } from "react";
import React from "react";
import FileInput from "../common/FileInput";
import { useSession } from "next-auth/react";
import TagsForm from './TagsForm';
import { CustomAxios } from '@/utils/CustomAxios';
import ArrowIconContractImport from './ArrowIconContractImport';

interface ImportFormProps {
  onClose: () => void;
}

export default function ImportForm({ onClose }: ImportFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session } = useSession();
  const toast = useToast();
  const {
    isOpen: isCreateModalOpen,
    onOpen: onOpenModalTags,
    onClose: onCloseModalTags,
  } = useDisclosure();
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("file", selectedFile!);
    formData.append("access", session?.tokens?.access || "");

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const jsonRes = await response.json();
      console.log("=== jsonRes ===", jsonRes)
      toast({
        description: jsonRes.Message,
        position: "top",
        status: jsonRes.status === 201 ? "success" : "error",
        duration: 3000,
        isClosable: false,
      });

      if (jsonRes.status < 299) {
        setSelectedFile(null);
        formRef.current?.reset();
        onClose()
        onOpenModalTags()
      }
    } else {
      toast({
        description: "Error uploading file.",
        position: "top",
        status: "error",
        duration: 3000,
        isClosable: false,
      });
    }

    setIsSubmitting(false);
  };
  async function getCustomTags(){
    const responseTags = await CustomAxios(`get`, `${process.env.NEXT_PUBLIC_API_KEY}contract/upload/tags-options`, {
      'Authoprization': `Bearer ${session?.tokens?.access}`
    })
    console.log("responseTags", responseTags)
  }
  useEffect(() => {
    if(session?.tokens?.access){
      getCustomTags()
    }

    return () => {
      
    }
  }, [session?.tokens?.access])
  
  // console.log("session", session?.tokens?.access)
  return (
    <form style={{ display: "contents" }} ref={formRef} onSubmit={onSubmit}>
      <ModalBody py={{ lg: "37px", base: "25px" }}>
        <FileInput
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
        />
      </ModalBody>
      <Divider orientation="horizontal" />

      <ModalFooter gap={"12px"}>
        <Button fontWeight={"400"} variant={"outline"} onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant={"prime"}
          isDisabled={!selectedFile}
          isLoading={isSubmitting}
          type="submit"
          fontWeight={"400"}
          p={"0 16px"}
        >
          Submit
        </Button>
      </ModalFooter>
      <Modal onClose={onCloseModalTags} isOpen={true} isCentered>
        <ModalOverlay />
        <ModalContent borderRadius={"16px"} w={"95%"} maxW={"520px"}>
          <ModalHeader>
            <Text fontSize={"18"} fontWeight={"700"}>
              Import Contract
            </Text>
            <Text fontSize={"13"} fontWeight={"400"}>
              Select a file to import to your repository
            </Text>
            <Flex gap={'8px'} alignItems={'center'}>
              <Text fontSize={"14px"} fontWeight={"600"} color={'#287AE0'}>
                Import
              </Text>
              <ArrowIconContractImport />
              <Text fontSize={"14px"} fontWeight={"600"} color={'#287AE0'}>
                Tags
              </Text>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <Divider orientation="horizontal" />
          
          <TagsForm tags={[]} onClose={onCloseModalTags} />
        </ModalContent>
      </Modal>
    </form>
  );
}
