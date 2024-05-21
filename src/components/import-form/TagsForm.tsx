import { Button, Divider, Flex, FormControl, Input, ModalBody, ModalFooter, Text, useToast } from '@chakra-ui/react';
import React, { useState } from 'react'
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useForm } from 'react-hook-form';
import CloseIcon from './CloseIcon';
import { CustomAxios } from '@/utils/CustomAxios';
interface TagsFormProps {
    onClose: () => void;
    onSuccess?: () => void;
    tags: any[];
    keyAttachment: string;
    sessionKey: string;
}
export default function TagsForm({ onClose, onSuccess, tags, keyAttachment, sessionKey }: TagsFormProps) {
    const animatedComponents = makeAnimated();
    const [selectedTags, setSelectedTags] = useState<any>([])
    const [customTag, setCustomTag] = useState<any>('')
    const [customTags, setCustomTags] = useState<any[]>([])
    const toast = useToast()
    const options = [
        { value: "Aaaaaa", label: "Amr Tarek" },
        { value: "B", label: "Mohamed Mossalam" },
        { value: "C", label: "Omar Emad" }
    ];
    const { handleSubmit, register, reset } = useForm();
    function onSubmitTags(data: any) {
        const tagsList = [...selectedTags]
        let tagsMergedToArrayOfString = tagsList.map((tag: string) => ({
            name: tag,
            uniqueId: Math.random().toString() 
        }));
        uploadConfirmation(tagsMergedToArrayOfString)
        // console.log("key =====>>>", keyAttachment)
    }
    async function uploadConfirmation(tagsMergedToArrayOfString: any[]) {
        const fileResponse = await CustomAxios(`post`, `${process.env.NEXT_PUBLIC_API_KEY}contract/upload/confirmation`, {
            'Authorization': `Bearer ${sessionKey}`
        }, {
            key: keyAttachment,
            tags: customTags.concat(tagsMergedToArrayOfString)
        })
        // console.log("==== upload confirmation ===", fileResponse);
        if(fileResponse.data){
            toast({
                description: "Contract created successfullt and assigned to tags",
                position: "top",
                status: "success",
                duration: 3000,
                isClosable: false,
            });
            onClose()
        }

    }
    const handleAddCustomTag = () => {
        if (customTag.trim() !== '') { // Prevent adding empty tags
            setCustomTags([
                ...customTags,
                { name: customTag, uniqueId: Math.random().toString() },
            ]);
            setCustomTag(''); // Clear the input field
        }
    };
    const handleRemoveCustomTag = (uniqueId: number) => {
        setCustomTags(customTags.filter(tag => tag.uniqueId !== uniqueId));
    };

    const handleCustomTagChange = (event: any) => {
        setCustomTag(event.target.value);
    };
    return <form style={{ display: "contents" }} onSubmit={handleSubmit(onSubmitTags)}>

        <ModalBody >
            <FormControl flexGrow="1" mb={'25px'}>
                <label htmlFor="tags">Choose Tag</label>

                {/* <Select
                    {...register("tags")}
                    id={'tags'}
                    bgColor="white"
                    borderColor="#c4cfe5"
                    placeholder="Type"
                    borderRadius={"8px"}
                >
                    {tags.map((tag) => {
                        return (
                            <option key={tag.id} value={tag.id}>
                                {tag.name}
                            </option>
                        );
                    })}
                </Select> */}
                <div className="flex flex-col w-full py-[4px]">
                    <Select
                        id={"tags"}
                        styles={{
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                height: '50px',
                                border: "1px solid #D0D5DD",
                                borderRadius: '8px',
                                outline: state.isFocused ? "var(--primary-color-500)" : "",
                            }),

                            menu: (baseStyles: any) => ({
                                ...baseStyles,
                                zIndex: 99999999999,
                            }),
                            option: (baseStyles: any, state: any) => ({
                                ...baseStyles,
                                padding: "10px 12px 10px 24px",
                                backgroundColor: state.isSelected ? "var(--neutral-200)" : "",
                                ":hover": {
                                    backgroundColor: "var(--neutral-200)",
                                },
                            }),

                        }}
                        onChange={setSelectedTags}
                        placeholder="Tags"
                        className="text-black"
                        classNames={{
                            multiValue: (state: any) =>
                                !state.isSelected ? 'select__multiple--selected' : '',
                            multiValueLabel: (state: any) => !state.isSelected ? 'select__multiple--selected-label' : '',

                        }}

                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        defaultValue={[]}
                        isMulti
                        // onChange={getValueBack}
                        options={options}


                    />
                </div>
                <Flex gap={'12px'}>
                    {customTags?.length ? customTags.map(tag => (
                        <Flex borderRadius={'30px'} border={'1px solid #E0E3E6'} gap={'8px'} padding={'6px 12px'} key={tag.uniqueId}>
                            <Text fontSize={'14px'} fontWeight={'600'}>{tag.name}</Text>
                            <Button size="xs" onClick={() => handleRemoveCustomTag(tag.uniqueId)}>
                                <CloseIcon />
                            </Button>
                        </Flex>
                    )) : ""}
                </Flex>
            </FormControl>
            <FormControl flexGrow="1">
                <label htmlFor="custom_tag">New Custom Tag</label>
                <Input
                    type="text"
                    height={'50px'}
                    // {...register("custom_tag", { required: true })}
                    value={customTag}
                    onChange={handleCustomTagChange}
                    bgColor="white"
                    id='custom_tag'
                    borderColor="#c4cfe5"
                    placeholder="Ticket Subject"
                    borderRadius={"8px"}
                />
            </FormControl>
        </ModalBody>
        <Divider orientation="horizontal" />

        <ModalFooter gap={"12px"}>
            <Flex justifyContent={'space-between'}>
                <Button fontWeight={"400"} variant={"outline"} bgColor={'#FFF4EB'} onClick={handleAddCustomTag}>
                    <Text color="#EE7C21" fontSize={'14px'} fontWeight={'500'}>+ New</Text>
                </Button>
                <div className="">
                    <Button fontWeight={"400"} variant={"outline"} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        variant={"prime"}
                        type="submit"
                        fontWeight={"400"}
                        p={"0 16px"}
                    >
                        Submit
                    </Button>
                </div>
            </Flex>
        </ModalFooter>
    </form>
}
