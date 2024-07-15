import Search from '@/app/ui/search';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';

// this seems a bit hackish, idk :p
const loading = () => {
    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between mb-20">
                <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
            </div>
            <InvoicesTableSkeleton />
        </div>
    )
}
export default loading