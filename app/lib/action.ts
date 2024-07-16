'use server';

import { z } from 'zod'
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';  //to check if the error is an instance of AuthError class


export type State = {
    errors?: {
        customerId?: string[];
        amount?: string[];
        status?: string[];
    };
    message?: string | null;
};

const InvoiceSchema = z.object({
    id: z.string(),
    customerId: z.string({
        invalid_type_error: "Please select a customer"
    }),
    amount: z.coerce.number().gt(0, { message: "The amount must be greater 0 " }),
    status: z.enum(['pending', 'paid'], {
        invalid_type_error: "Please select a valid invoice status"
    }),
    date: z.string()
})

const CreateInvoice = InvoiceSchema.omit({ id: true, date: true })
const UpdateInvoice = InvoiceSchema.omit({ id: true, date: true });



export const createInvoice = async (prevState: State, formData: FormData) => {

    const rawFormData = Object.fromEntries(formData)
    const result = CreateInvoice.safeParse(rawFormData)
    const date = new Date().toISOString().split('T')[0]

    //Handle failed validations before sending data to database
    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors,
            message: "Missing fields. Failed to create invoice "
        }
    }

    const { customerId, amount, status } = result.data
    try {
        const result = await sql`
          INSERT INTO invoices
              (customer_id, amount, status, date) 
          VALUES 
              (${customerId}, ${amount}, ${status}, ${date})
      `
        console.log(result.rows)
    } catch (error) {
        console.log("Error creating a new invoice ", error)
        return { message: "Database Error: Failed to create an invoice " }
    }
    revalidatePath('/dashboard/invoices', 'page')
    redirect('/dashboard/invoices')
}


export const updateInvoice = async (id: string, prevState: State, formdata: FormData) => {
    const rawFormData = Object.fromEntries(formdata)
    const result = UpdateInvoice.safeParse(rawFormData)
    const date = new Date().toISOString().split('T')[0]

    //Handle failed validations before sending data to DB
    if (!result.success) {
        return {
            message: "Missing Fields: Failed to update the invoice",
            errors: result.error.flatten().fieldErrors
        }
    }

    const { customerId, amount, status } = result.data
    try {
        const invoice = await sql`
     UPDATE invoices
     SET customer_id = ${customerId}, amount = ${amount.toFixed(0)}, status = ${status}
     WHERE id = ${id}
   `;
        console.log("Invoice found in DB ", invoice.rows)
    } catch (error) {
        console.log("Error updating the invoice ", error)
        return { message: "Error updating the invoice " }
    }
    revalidatePath('/dashboard/invoices', 'page')
    redirect('/dashboard/invoices')
}

export const deleteInvoice = async (id: string) => {
    try {
        const result = await sql`
            DELETE FROM invoices WHERE id=${id}
        `
        console.log(result.rows)
        revalidatePath('/dashboard/invoices', 'page')
    } catch (error) {
        console.log("Error deleting the invoice ", error)
        return { message: "Error deleting the invoice " }
    }
}

export const authenticate = async (prevState: string | undefined, formData: FormData) => {

    try {
        await signIn('credentials', formData)   //directly pass the formdata to this function
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }

}