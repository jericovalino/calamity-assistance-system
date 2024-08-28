'use client';

import { z } from 'zod';

import { createForm } from '@/utils/forms';
import { TownLogo } from '@/components/informationals';
import { HiOutlineIdentification } from 'react-icons/hi2';
import { Button } from '@/components/input_controls';
import Link from 'next/link';

const {
  forwardFormContext,
  FormInput,
  FormMobileNumber,
  FormTextArea,
  FormID,
} = createForm({
  zodSchema: z.object({
    first_name: z.string().min(1, 'Required'),
    middle_name: z.string().optional(),
    last_name: z.string().min(1, 'Required'),
    mobile_number: z.string().min(1, 'Required'),
    address_name: z.string().min(1, 'Required'),
    proof_of_residency: z.string().min(1, 'Required'),
    attachments: z.string().min(1, 'Required'),
    details: z.string().min(1, 'Required'),
  }),
});

const Campaign = forwardFormContext((_, ctx) => {
  return (
    <div
      className="h-screen overflow-x-hidden overflow-y-scroll bg-gray-500"
      style={{
        perspective: '10px',
      }}
    >
      <section className="relative -z-10 h-60 w-full origin-top">
        <img
          alt=""
          className="absolute left-0 right-0 top-0 h-full w-full object-cover brightness-50"
          src="https://images.unsplash.com/photo-1641648543489-0f0ce87bea80?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHR5cGhvb24lMjBzaGVsdGVyfGVufDB8fDB8fHww"
        />
        <div className="isolate z-10">
          <header className="sticky top-0 z-10 flex items-center bg-gradient-to-r from-white/70 via-blue-500/50 to-transparent p-2">
            <Link href="/">
              <TownLogo className="w-16" />
            </Link>
            <h1 className="ml-4 font-semibold sm:text-2xl sm:leading-7">
              Calamity Assistance <br /> Request and Monitoring System
            </h1>
          </header>
          <div className="mt-10 flex flex-col justify-center space-y-2 text-center text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            <h2 className="text-3xl font-bold tracking-tighter">
              Para sa Bagyong Aghon
            </h2>
            <p className="muted-foreground">
              Layong matulungan ang mga San Luisenyong naapektuhan ng bagyang
              Aghon
            </p>
          </div>
        </div>
      </section>
      <section className="relative isolate w-full overflow-hidden bg-white py-12 md:py-24 lg:py-32">
        <TownLogo className="absolute inset-0 -z-10 w-full opacity-10" />
        <form
          className="container mx-auto px-4"
          onSubmit={ctx.handleSubmit(() => {})}
        >
          <div className="grid gap-4 sm:grid-cols-3">
            <FormInput
              label="First Name"
              name="first_name"
              placeholder="Enter your first name"
            />
            <FormInput
              label="Middle Name"
              name="middle_name"
              placeholder="Enter your middle name"
              optional
            />
            <FormInput
              label="Last Name"
              name="last_name"
              placeholder="Enter your last name"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormInput
              label="Address"
              name="address_name"
              placeholder="Enter your address"
            />
            <FormMobileNumber
              label="Mobile Number"
              name="mobile_number"
              errorDescription="We'll use this to send you a notification later"
            />
          </div>
          <FormTextArea
            label="Details"
            name="details"
            placeholder="Describe what happened"
            optional
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <FormID
              label="Proof of Residency (e.g. Valid ID, BirthCerth, etc.)"
              name="proof_of_residency"
              icon={HiOutlineIdentification}
            />
          </div>
          <Button asSubmit theme="primary" className="w-full" size="large">
            Submit Application
          </Button>
        </form>
      </section>
    </div>
  );
});

export default Campaign;
