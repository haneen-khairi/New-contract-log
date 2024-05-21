import { Button, Divider, FormControl, Input, ModalBody, ModalFooter } from '@chakra-ui/react';
import React, { useState } from 'react'
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useForm } from 'react-hook-form';
interface TagsFormProps {
    onClose: () => void;
    onSuccess?: () => void;
    tags: any[]
}
export default function TagsForm({ onClose, onSuccess, tags }: TagsFormProps) {
    const animatedComponents = makeAnimated();
    const [selectedTags, setSelectedTags] = useState<any>([])
    const options = [
        { value: "Aaaaaa", label: "Amr Tarek" },
        { value: "B", label: "Mohamed Mossalam" },
        { value: "C", label: "Omar Emad"}
      ];
    const { handleSubmit, register, reset } = useForm();
    function onSubmitTags(data: any) {

    }
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
            </FormControl>
            <FormControl flexGrow="1">
                <label htmlFor="custom_tag">New Custom Tag</label>
                <Input
                    type="text"
                    height={'50px'}
                    {...register("custom_tag", { required: true })}
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
        </ModalFooter>
    </form>
}
