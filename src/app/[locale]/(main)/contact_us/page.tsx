
"use client"
import { Button, FormControl, Grid, Input, Textarea } from '@chakra-ui/react'
import Image from 'next/image';
import React from 'react'
import { useForm } from 'react-hook-form';

export default function Page() {
    const {
        register,
        formState: {errors, isValid},
        reset,
        handleSubmit
    } = useForm({
        mode: "onChange"
    })
    async function submitContactUs(data: any){

    }
    return <section className='contact'>
        <Grid templateColumns='repeat(2, 1fr)'>
            <div className="contact__form">
                <h4 className="contact__form--header">Get in Touch</h4>
                <p className="contact__form--paragraph">Whether you have questions, feedback, or partnership proposals, we're here to listen and assist. Use the form below to reach out to the CaDas team</p>
                <form onSubmit={handleSubmit(submitContactUs)}>
                    <Grid templateColumns='repeat(2, 1fr)' gap={'16px'} mb={'16px'}>
                        <FormControl flexGrow="1">
                            <Input
                                type="text"
                                {...register("firstName", { required: true })}
                                bgColor="white"
                                className='input--main'
                                borderColor="#c4cfe5"
                                placeholder="First name"
                                borderRadius={"8px"}
                            />
                        </FormControl>
                        <FormControl flexGrow="1">
                        <Input
                                type="text"
                                {...register("lastName", { required: true })}
                                bgColor="white"
                                className='input--main'
                                borderColor="#c4cfe5"
                                placeholder="Last name"
                                borderRadius={"8px"}
                            />
                        </FormControl>

                    </Grid>
                    <FormControl flexGrow="1" mb={'16px'}>
                            <Input
                                type="text"
                                {...register("messageTitle", { required: true })}
                                bgColor="white"
                                className='input--main'
                                borderColor="#c4cfe5"
                                placeholder="Message title"
                                borderRadius={"8px"}
                            />
                        </FormControl>
                    <FormControl mb={'16px'} flexGrow="1">
                        <Textarea
                            {...register("messageDescription", { required: true })}
                            bgColor="white"
                            borderColor="#c4cfe5"
                            placeholder="Message Description"
                            borderRadius={"8px"}
                        />
                    </FormControl>
                    <Button variant={'prime'} type='submit' size={''}>Send</Button>
                </form>
            </div>
            <Image src={'/images/contact_us_image.webp'} className='w-full contact__form--image' width={250} height={700} alt='contact us image' />
        </Grid>
    </section>
}
