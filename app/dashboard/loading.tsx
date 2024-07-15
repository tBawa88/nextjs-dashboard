import { lusitana } from '@/app/ui/fonts'

const Loading = () => {
    return (
        <div className="flex items-center ">
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Loading ...
            </h1>
        </div>

    )
}
export default Loading