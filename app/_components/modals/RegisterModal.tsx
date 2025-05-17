"use client";

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Heading from "@/app/_components/Heading";
import Input from "@/app/_components/inputs/Inputs";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "@/app/_components/modals/Modal";
import toast from "react-hot-toast";
import Button from "@/components/ui/Button";
import useLoginModal from "@/app/hooks/useLoginModal";

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);
    const loginModal = useLoginModal();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
      defaultValues: {
          name: '',
          email: '',
          password: ''
      }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('api/register', data)
            .then(() => {
                toast.success('Account created successfully!');
                registerModal.onClose(); // Close the modal
            })
            .catch((error) => {
                toast.error('Please validate fields.');
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const toggle = useCallback(() => {
        loginModal.onOpen();
        registerModal.onClose();
    }, [loginModal, registerModal]);

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading
                title='Welcome to ZENBooks'
                subtitle='Create an account'
            />
            <Input
                id='email'
                label='Email'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id='name'
                label='Name'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id='password'
                type='password'
                label='Password'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <Button
                outline
                label='Continue With Google'
                icon={FcGoogle}
                onClick={handleSubmit(onSubmit)}
            />
            <Button
                outline
                label='Continue With Github'
                icon={AiFillGithub}
                onClick={handleSubmit(onSubmit)}
            />
            <div
                className='
                    text-neutral-500
                    text-center
                    mt-4
                    font-light
                '
                >
                <div className='justify-center flex flex-row items-center gap-2'>
                    <div>
                    Already have an account?
                </div>
                <div
                    onClick={toggle}
                    className='text-neutral-800
                    cursor-pointer
                    hover:underline'
                >
                    Log in
                    </div>
                </div>
            </div>
        </div>
    )
    return (
        <Modal
            disabled={isLoading}
            title="Register"
            isOpen={registerModal.isOpen}
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel="Continue"
            body={bodyContent}
            footer={footerContent}
            />

    );
}

export default RegisterModal;
