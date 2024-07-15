import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/invoices/table';
import { fetchInvoicesPages } from '@/app/lib/data';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';


export default async function Page({
    searchParams    //searchParams is a page prop, makes the current params available to the current page component
}: {
    searchParams?: {
        query?: string
        page?: string
    }
}) {
    const query = searchParams?.query || ''
    const currentPage = Number(searchParams?.page) || 1
    //getting the latest searchParams to fetch total pages
    const totalPages = await fetchInvoicesPages(query)

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Suspense fallback={<div>Fetching url..</div>}>
                    <Search placeholder="Search invoices..." />
                </Suspense>
                <CreateInvoice />
            </div>
            <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
                <Table query={query} currentPage={currentPage} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
}