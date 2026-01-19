import { useMutation, useQuery } from '@tanstack/react-query';
import { addPatient } from '../../api/PatientApi';
import { useForm } from "react-hook-form";
import PatientRegisterForm from './Components/PatientRegisterForm';
import Heading from '../../components/Heading/Heading';
import { Form } from '@/components/ui/form';
import { patientSchema, defaultValues } from '@/schema/patientSchema';
import { zodResolver } from "@hookform/resolvers/zod";
import Button from '@/components/Button/Button';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PatientPDF from '../../components/PatientPDF/PatientPDF';
import { getTokenByMRID } from '@/api/TokenApi';

const PatientRegistration = () => {
  const [submittedData, setSubmittedData] = useState(null);
  const [showDownload, setShowDownload] = useState(false);
  const form = useForm({
    resolver: zodResolver(patientSchema),
    defaultValues
  });

  const mrid = form.watch("mrid");

  const { mutate, isPending } = useMutation({
    mutationFn: addPatient,
    onSuccess: (_, data) => {
      toast.success('Patient Register Successfully');
      setSubmittedData(data);
      setShowDownload(true)
      form.reset();
      // refetch();
    },
    onError: (error) => {
      toast.error(`Error: ${error.message || 'Failed to register patient.'}`);
    },
  });

  const { data: tokenData, refetch } = useQuery({
    queryKey: ["token", mrid],
    queryFn: () => getTokenByMRID(mrid),
    enabled: false,
  });

  useEffect(() => {
    if (tokenData?.patientName) {
      const nameParts = tokenData.patientName.split(" ");
      form.setValue("firstName", nameParts[0] || "");
      form.setValue("lastName", nameParts.slice(1).join(" ") || "");
      form.setValue("phone", tokenData.phoneNumber || "");
    }
  }, [tokenData, form]);

  const onSubmit = (data) => {
    const payload = {
      ...data,
      diseases: {
        dm: data.dm,
        htn: data.htn,
        ihd: data.ihd,
        asthma: data.asthma,
      },
    }
    mutate(payload);
  };

  const handleDownloadClick = () => {
    setTimeout(() => {
      setShowDownload(false);
    }, 1000);
  };

  return (
    <div className="p-6 grid grid-cols-1 gap-6">
      <div className="bg-white p-6 rounded-2xl shadow">
        <Heading title="+ New Patient Form" className='pb-4' />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <PatientRegisterForm tokenData={tokenData} refetch={refetch} />
            <div className='flex justify-center md:justify-end items-center gap-x-2'>
              <Button
                label={isPending ? 'Submitting...' : 'Submit'}
                type="submit"
                variant="default"
                size="lg"
                className="md:!w-32"
              />
              {submittedData && showDownload && (
                <PDFDownloadLink
                  document={<PatientPDF data={submittedData} />}
                  fileName="patient-details.pdf"
                >
                  {({ loading }) => (
                    <Button
                      label={loading ? "Preparing PDF..." : "Download PDF"}
                      variant="outline"
                      size="lg"
                      onClick={handleDownloadClick}
                    />
                  )}
                </PDFDownloadLink>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default PatientRegistration;