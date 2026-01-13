import { addToken } from "@/api/TokenApi";
import { tokenSchema, defaultValues } from "@/schema/tokenSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Heading from "../Heading/Heading";
import { Form } from '@/components/ui/form';
import Button from '@/components/Button/Button';
import { PDFDownloadLink } from '@react-pdf/renderer';
import TokenSlipPDF from '@/components/PatientPDF/TokenSlipPDF';
import TextInput from '@/components/Form/Input';
import PhoneInput from "../Form/PhoneInput";


const TokenModal = ({ onClose }) => {
    const [tokenData, setTokenData] = useState(null);
    const [showDownload, setShowDownload] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    
    const form = useForm({
        resolver: zodResolver(tokenSchema),
        defaultValues
    });

    const patientName = form.watch("patientName");

    const { mutate, isPending } = useMutation({
        mutationFn: addToken,
        onSuccess: (res) => {
            toast.success("Token Added successfully!");
            setTokenData(res);
            setShowDownload(true);
            setButtonDisabled(true);
            form.reset();
        },
        onError: (error) => {
            toast.error(`Error: ${error.message || 'Failed to add token.'}`);
        },
    });

    const onSubmit = async (values) => {
        mutate(values);
    };
    const handleDownloadClick = () => {
        setTimeout(() => {
            setShowDownload(false);
        }, 1000);
    };

    useEffect(() => {
        setButtonDisabled(!patientName);
        if (patientName) setShowDownload(false);
    }, [patientName]);

    const handleInput = (e) => {
        const value = e.target.value.replace(/[^A-Za-z\s]/g, '');
        form.setValue('patientName', value);
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 relative">
                <button onClick={onClose} className="absolute top-4 right-4 cursor-pointer text-gray-400 hover:text-red-500"> ✕</button>
                <Heading title="Token Generate" className="pb-6 text-center" />
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 gap-4 items-end">
                            <TextInput
                                type="text"
                                label="Token of Patient"
                                placeholder="Enter Patient Name"
                                control={form.control}
                                name="patientName"
                                onChange={handleInput}
                            />
                            <PhoneInput control={form.control} name="phoneNumber" />
                            <div className="flex gap-2">
                                {!showDownload && (
                                    <Button
                                        type="submit"
                                        variant="blue"
                                        size="lg"
                                        label={isPending ? "Printing..." : "Token"}
                                        disabled={buttonDisabled}
                                        className="w-full h-12"
                                    />
                                )}

                                {tokenData && showDownload && (
                                    <PDFDownloadLink
                                        document={<TokenSlipPDF data={tokenData} />}
                                        fileName={`Token-${tokenData.tokenNo}.pdf`}
                                    >
                                        {({ loading }) => (
                                            <Button
                                                label={loading ? "Preparing PDF..." : "Print Token Slip"}
                                                variant="outline"
                                                className="w-full h-12"
                                                onClick={handleDownloadClick}
                                            />
                                        )}
                                    </PDFDownloadLink>
                                )}
                            </div>

                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default TokenModal;