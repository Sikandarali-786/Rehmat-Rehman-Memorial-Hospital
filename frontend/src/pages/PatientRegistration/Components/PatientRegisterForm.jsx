import React from 'react'
import TextInput from '../../../components/Form/Input'
import { useFormContext } from 'react-hook-form'
import Dropdown from '../../../components/Form/Dropdown'
import CheckBoxField from '../../../components/Form/CheckBoxField'
import { Gender, MaritalStatus, PatientType } from '../../../mocks/dropdownMock'
import CNICInput from '@/components/Form/CNICInput'
import PhoneInput from '@/components/Form/PhoneInput'
import BloodPressureInput from '@/components/Form/BloodPressureInput'

const PatientRegisterForm = ({ tokenData, refetch }) => {
    const form = useFormContext();
    const patientType = form.watch("patientType");
    const isFetched = !!tokenData;
    const tokenHasLastName =
        tokenData?.patientName?.split(" ").length > 1;

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <TextInput label="MRID" control={form.control} name="mrid" placeholder='Enter MRID' onBlur={() => refetch()} />
                <TextInput label="Name" placeholder="Enter Name" control={form.control} name="firstName" disabled={isFetched} />
                <TextInput label="Father/Husband Name" placeholder="Enter Father/Husband Name" control={form.control} name='lastName' disabled={isFetched && tokenHasLastName} />
                <Dropdown label="Gender" name="gender" options={Gender} control={form.control} />
                <TextInput label="Age" placeholder="Enter Age" control={form.control} name='age' type='number' />
                <Dropdown label="Marital Status" name="maritalStatus" options={MaritalStatus} control={form.control} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-2">
                <CNICInput control={form.control} name="CNIC" />
                <PhoneInput control={form.control} name="phone" disabled={isFetched} />
                <Dropdown label="Patient Type" name="patientType" options={PatientType} control={form.control} />
            </div>


            {patientType === "Indoor Patient" && (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 pt-3">
                    <TextInput label='Operation' control={form.control} placeholder='Operation Name' name='operation' />
                    {/* <TextInput label='Serial No' control={form.control} placeholder='Serial No' name='serialNo' /> */}
                    <TextInput label='Date of Admission' placeholder='Date of Admission' type='date' name='admitDate' />
                    <TextInput label='Date of Operation' placeholder='Date of Operation' type='date' name='operationDate' />
                    <TextInput label='Date of Discharge' placeholder='Date of Discharge' type='date' name='dischargeDate' />
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 pt-3">
                <TextInput type="number" label="Temperatue" placeholder="Enter Temperatue" control={form.control} name="temperature" />
                <BloodPressureInput control={form.control} name="bloodPressure" label="Blood Pressure" />
                <TextInput label="SpO2" placeholder="Enter SpO2" control={form.control} name="spo2" />
                <TextInput type="number" label="Pulse Rate" placeholder="Enter Pulse Rate" control={form.control} name="pulseRate" />
                <TextInput label="Allergy" placeholder="Enter Allergy" control={form.control} name="allergy" />
                <TextInput label="Any Other Disease" placeholder="Enter Any Other Disease" control={form.control} name="otherDisease" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-1 py-3">
                <CheckBoxField control={form.control} label="DM" name="dm" />
                <CheckBoxField control={form.control} label="HTN" name="htn" />
                <CheckBoxField control={form.control} label="IHD" name="ihd" />
                <CheckBoxField control={form.control} label="Asthma" name="asthma" />
            </div>
        </>
    )
}

export default PatientRegisterForm
