import React from 'react';
import { Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const PhoneInput = ({ control, name, label = 'Phone Number', placeholder = 'Enter Phone Number', className = '', disabled = false }) => {
  return (
    <div className={`space-y-1 ${className}`}>
      {label && <Label htmlFor={name}>{label}</Label>}
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium pointer-events-none">
          +92
        </div>
        
        <Controller
          control={control}
          name={name}
          render={({ field, fieldState }) => {
            const { value, onChange, ...rest } = field;

            const handleChange = (e) => {
              const digits = e.target.value.replace(/\D/g, '').slice(0, 10)      
              const formValue = digits ? '0' + digits : '';              
              onChange(formValue);
            };

            const displayValue = value && value.startsWith('03') ? value.slice(1) : '';

            return (
              <>
                <Input
                  id={name}
                  {...rest}
                  value={displayValue || ''}
                  onChange={handleChange}
                  placeholder={placeholder}
                  inputMode="numeric"
                  type="tel"
                  className={`pl-12 ${fieldState.error ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                  disabled={disabled}
                />
                {fieldState.error && (
                  <p className="text-sm text-red-500">{fieldState.error.message}</p>
                )}
              </>
            );
          }}
        />
      </div>
    </div>
  );
};

export default PhoneInput;