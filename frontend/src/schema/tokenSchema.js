import { getErrorMessage } from '@/lib/utils';
import { z } from 'zod';

export const tokenSchema = z.object({
    patientName: z
        .string()
        .min(1, getErrorMessage())
        .regex(/^[A-Za-z\s]+$/, 'Only alphabets are allowed'),
        phoneNumber : z.string().min(1, getErrorMessage()).regex(/^03[0-9]{9}$/, "Please enter a valid Pakistani mobile number"),
});

export const defaultValues = {
    patientName: '',
    phoneNumber: '',
}; 

export const tokenSummarySchema = z.object({
    startDate: z.string().min(1, getErrorMessage()),
    endDate: z.string().min(1, getErrorMessage()),
});

export const tokenSummaryDefaultValues = {
    startDate: '',
    endDate: '',
};