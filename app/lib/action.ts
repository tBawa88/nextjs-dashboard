'use server';

import { z } from 'zod'
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation';

const InvoiceSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    amount: z.coerce.number(),
    status: z.enum(['pending', 'paid']),
    date: z.string()
})

const CreateInvoice = InvoiceSchema.omit({ id: true, date: true })
const UpdateInvoice = InvoiceSchema.omit({ id: true, date: true });

export const createInvoice = async (formData: FormData) => {

    const rawFormData = Object.fromEntries(formData)
    const { customerId, amount, status } = CreateInvoice.parse(rawFormData)
    const date = new Date().toISOString().split('T')[0]

    //Handle failed validations before sending data to database

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
        return { message: "Error creating an invoice " }
    }
    revalidatePath('/dashboard/invoices', 'page')
    redirect('/dashboard/invoices')
}


export const updateInvoice = async (id: string, formdata: FormData) => {
    const rawFormData = Object.fromEntries(formdata)
    const { customerId, amount, status } = UpdateInvoice.parse(rawFormData)
    const date = new Date().toISOString().split('T')[0]

    //Handle failed validations before sending data to DB

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