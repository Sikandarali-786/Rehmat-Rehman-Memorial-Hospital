import Heading from '@/components/Heading/Heading'
import React, { useState } from 'react'
import Button from '@/components/Button/Button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { tokenSummarySchema, tokenSummaryDefaultValues } from '@/schema/tokenSchema'
import { getTokensByDate } from '@/api/TokenApi'
import { toast } from 'sonner'
import { Form } from '@/components/ui/form'
import { useQuery } from '@tanstack/react-query'
import TextInput from '@/components/Form/Input'

const TokenSummary = () => {
  const [filters, setFilters] = useState(null)

  const form = useForm({
    resolver: zodResolver(tokenSummarySchema),
    defaultValues: tokenSummaryDefaultValues
  });


  const { data, isLoading, refetch } = useQuery({
    queryKey: ['token-summary'],
    queryFn: () => getTokensByDate(filters.startDate, filters.endDate),
    enabled: false,
    onSuccess: (res) => {
      if (res.success) {
        toast.success("Token Summary fetched successfully!");
      } else {
        toast.error(res.message);
      }
    },
    onError: (error) => {
      toast.error(`Error: ${error.message || 'Failed to fetch token summary.'}`);
    }
  });

  const onSubmit = (data) => {
    const filterData = {
      startDate: data.startDate,
      endDate: data.endDate
    };
    setFilters(filterData);
    refetch();
  };

  return (
    <div className='p-6 grid grid-cols-1 gap-6'>
      <Heading title="Token Summary" />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='bg-white p-6 rounded-2xl shadow'>
          <div className='bg-white p-6 rounded-2xl shadow'>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <TextInput type='date' name='startDate' label='Start Date' control={form.control} required />
                  <TextInput type='date' name='endDate' label='End Date' control={form.control} required />
                </div>
                <Button label='Get Summary' type='submit' />
              </form>
            </Form>
          </div>
          {data?.success && (<div className="bg-white rounded-xl p-4 shadow"> <p className="font-semibold"> Total Tokens: {data.data.length} </p> </div>)}
        </div>
      </div>
    </div>
  );
};

export default TokenSummary;