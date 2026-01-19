import React from 'react'
import AuthBackGroundTemplate from './components/AuthBackGroundTemplate'
import { useForm } from 'react-hook-form'
import { loginSchema, defaultValues } from '@/schema/loginSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import TextInput from '@/components/Form/Input'
import Heading from '@/components/Heading/Heading'
import Button from '@/components/Button/Button'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/providers/AuthProvider'
import { toast } from 'sonner'
import Logo from '../../../public/images/logoRRH.png'

const Login = () => {
    const { login } = useAuth()
    const navigate = useNavigate()
    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues,
    })
    const onSubmit = async (data) => {
        const success = await login(data.username, data.password)
        if (success) {
            toast.success('Login successfully!')
            navigate('/')
        } else {
            toast.error('Invalid username or password!')
        }
    }

    return (
        <AuthBackGroundTemplate>
            <section className="relative p-3 flex flex-col items-center justify-center bg-transparent md:!h-[600px] w-full md:w-[70%]">
                <img src={Logo} className='w-52'/>
                <Heading title="Login" className='!text-3xl'/>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-md py-4">
                        <TextInput label='User Name' placeholder='Enter User Name' control={form.control} name="username" className='my-2'/>
                        <TextInput label='Password' placeholder='Enter Password' control={form.control} name="password" type="password" className='mt-2'/>
                        <Button type='submit' variant='blue' label={'Login'} className="w-full mt-4" />
                    </form>
                </Form>
            </section>
        </AuthBackGroundTemplate>
    )
}

export default Login