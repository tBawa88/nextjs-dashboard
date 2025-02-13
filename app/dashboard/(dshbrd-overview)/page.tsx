import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { RevenueChartSkeleton, LatestInvoicesSkeleton, CardSkeleton } from '@/app/ui/skeletons'
import CardWrapper from '@/app/ui/dashboard/cards';

//PPR
export const experimental_ppr = true
//now all the static content, including the fallback content inside Suspense will  be pre rendred as static content
// and dynamic content will be rendered when the user requests them 

const Page = async () => {

    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Dashboard
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

                <Suspense fallback={<CardSkeleton />}>
                    <CardWrapper />
                </Suspense>

            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">

                <Suspense fallback={<RevenueChartSkeleton />}>
                    <RevenueChart />
                </Suspense>

                <Suspense fallback={<LatestInvoicesSkeleton />}>
                    <LatestInvoices />
                </Suspense>

            </div>
        </main>
    )
}
export default Page