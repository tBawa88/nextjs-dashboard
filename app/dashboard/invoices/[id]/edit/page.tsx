import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers, fetchInvoiceById } from '@/app/lib/data';
import { notFound } from 'next/navigation'


export default async function Page({ params: { id } }: { params: { id: string } }) {
  // const customers = await fetchCustomers()
  // const invoice = await fetchInvoiceById(id)
  const [customers, invoice] = await Promise.all([
    fetchCustomers(),
    fetchInvoiceById(id)
  ])

  //if invoice is not found as a result of invalid/fake uuid, redner the not-found UI
  if (!invoice)
    notFound()

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}