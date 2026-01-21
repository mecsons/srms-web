import {
    defaultValues,
    loginSchema,
    type LoginSchemaType,
} from '@/modules/auth/lib/validation/login.ts'
import {useForm} from 'react-hook-form'
import {useRouter} from '@tanstack/react-router'
import {zodResolver} from '@hookform/resolvers/zod'
import {useNotifyToast} from '@/hooks/use-notify.ts'
import {useAuthStore} from '@/modules/auth/lib/hooks/use-auth-store.ts'

export function useLoginForm() {
    const {navigate} = useRouter()
    const {login} = useAuthStore()
    const {errorToast} = useNotifyToast()

    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: defaultValues,
    })

    const onSubmit = form.handleSubmit(async (data: LoginSchemaType) => {
        try {
            await login(data)
            await navigate({to: '/', replace: true})
        } catch (error) {
            errorToast(error)
        }
    });

    return {
        form,
        onSubmit,
    }
}