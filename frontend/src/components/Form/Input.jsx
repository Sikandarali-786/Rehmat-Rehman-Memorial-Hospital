import * as React from "react"
import { Input } from "@/components/ui/input"
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription
} from "@/components/ui/form"

const TextInput = ({
  name = "",
  label = "",
  description = "",
  placeholder = "",
  className = '',
  type = "text",
  rules = {},
  control,
  required,
  disabled = false,
  ...props
}) => {
  return (
    <FormField
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <FormItem>
          {label && (<FormLabel>{label} {required && <span className="text-destructive ml-1">*</span>}</FormLabel>)}
          <FormControl>
            <Input
              {...field}
              id={name}
              placeholder={placeholder}
              type={type}
              className={`${className}`}
              disabled={disabled}
              {...props}
            />
          </FormControl>
          {description && (
            <FormDescription>{description}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default TextInput