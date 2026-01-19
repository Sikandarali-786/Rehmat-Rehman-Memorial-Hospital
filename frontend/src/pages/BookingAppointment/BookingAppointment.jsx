import Button from '../../components/Button/Button';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { addAppointment } from '../../api/AppointmentApi';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookingAppointmentSchema, defaultValues } from '@/schema/bookingAppointmentSchema';
import Heading from '@/components/Heading/Heading';
import { Form } from '@/components/ui/form';
import BookingAppointmentForm from './Components/BookingAppointmentForm';
import { toast } from 'sonner';
import { useState } from 'react';
import { FiCalendar } from 'react-icons/fi';


const BookingAppointment = () => {
  const [patientInfo, setPatientInfo] = useState(null);
  
  const form = useForm({
    resolver: zodResolver(bookingAppointmentSchema),
    defaultValues
  })

  const { mutate, isPending } = useMutation({
    mutationFn: addAppointment,
    onSuccess: () => {
      toast.success("Appointment booked successfully!");
      form.reset();
      setPatientInfo(null)
    },
    onError: (error) => {
      toast.error(`Error: ${error.message || 'Failed to Appointment.'}`);
    },
  });

  const onSubmit = (data) => {
    if (!patientInfo) {
      return toast.error("Please Search patient first")
    }

    const payload = {
      patient: patientInfo._id,
      mrid: patientInfo.mrid,
      department: data.department,
      doctor: data.doctor,
      date: data.date,
      timeSlot: data.timeSlot,
      status: data.status || 'pending'
    }
    mutate(payload);
  };


  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-2xl shadow">
        <Heading title={<><FiCalendar size={28} />Book Appointment</>} className='pb-4 flex items-center gap-2' />
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <BookingAppointmentForm setPatientInfo={setPatientInfo} patientInfo={patientInfo} />
            <Button type='submit' variant='blue' label={isPending ? 'Submitting...' : 'Submit'} />
          </form>
        </Form>
      </div>
      <div>
        {/* <AppointmentList data={data} isFetching={isFetching} /> */}
      </div>
    </div>
  );
}


export default BookingAppointment