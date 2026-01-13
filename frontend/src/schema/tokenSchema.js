import { getErrorMessage } from '@/lib/utils';
import { z } from 'zod';

export const tokenSchema = z.object({
    patientName: z
        .string()
        .min(1, getErrorMessage())
        .regex(/^[A-Za-z\s]+$/, 'Only alphabets are allowed'),
    phoneNumber: z.string()
});

export const defaultValues = {
    patientName: '',
    phoneNumber: ''
};