"use client";

import {
  Button,
  Divider,
  ModalBody,
  ModalFooter,
  useToast,
} from "@chakra-ui/react";
import { FormEvent, useRef, useState } from "react";
import React from "react";
import FileInput from "../common/FileInput";
import { useSession } from "next-auth/react";

interface ImportFormProps {
  onClose: () => void;
}

export default function ImportForm({ onClose }: ImportFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session } = useSession();
  const toast = useToast();

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
    </form>
  );
}
