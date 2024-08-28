import { z, ZodIssueCode } from "zod";
import { createInstance } from "react-geek-form";

import {
  FormLogo,
  FormInput,
  FormSelect,
  FormPassword,
  FormQuantity,
  FilterSelect,
  FilterSearch,
  FormMobileNumber,
  FormTextArea,
  FormID,
} from "@/components/input_controls";
import { phMobileNumberRegex } from "../regexs";

const { createForm: cF } = createInstance({
  FormID,
  FormLogo,
  FormInput,
  FormSelect,
  FormPassword,
  FormQuantity,
  FilterSelect,
  FilterSearch,
  FormTextArea,
  FormMobileNumber,
});

export const createForm = cF;

export const fieldValidationSchema = {
  password: z
    .string()
    .min(1, "Required")
    .min(8, "Must be at least 8 characters")
    .max(16, "Must not be more than 16 characters")
    .regex(/[a-z]/, "Must have at least one lowercase letter")
    .regex(/[A-Z]/, "Must have at least one uppercase letter")
    .regex(/^\S+$/, "Must not contain space")
    .regex(/^(?=.*\d).+$/, "Must have at least one number")
    .regex(
      /^(?=.*[!@#$%^&*()_+=\-[\]{}|\\:;"'<>,.?/~])/,
      "Must have at least one special characters"
    ),
  mobile_number: z.string().superRefine((value, ctx) => {
    const rawValue = value.trim();
    if (["", "+63"].includes(rawValue)) {
      ctx.addIssue({
        code: ZodIssueCode.too_small,
        inclusive: true,
        minimum: 1,
        type: "string",
        message: "Required",
      });
      return;
    }
    if (!phMobileNumberRegex.test(rawValue)) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: "Invalid",
      });
    }
  }),
};
