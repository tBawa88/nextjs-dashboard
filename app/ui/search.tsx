'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useDebouncedCallback } from 'use-debounce'
import { useSearchParams } from 'next/navigation';
import { useRouter, usePathname } from 'next/navigation'


export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  //this debounce the execution of this function 
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)  // URLSearchParams is a web api, let's you create a new searchparam instance and manipulate it's keys
    if (term.trim() !== '') {
      params.set('query', term.trim())
      params.set('page', '1')      //resetting page to 1 after every search
    } else {
      params.delete('query')
    }

    //updates the url without loading, using client side routing form Next
    replace(`${pathname}?${params.toString()}`)

  }, 350)


  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        onChange={(e) => handleSearch(e.target.value)}
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        defaultValue={searchParams.get('query')?.toString()}    //to make sure input and searchParams are linked. searchParams is acting like state here to keep track of input value 
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
