## Next.js App Router Course - Starter

This is the starter template for the Next.js App Router Course. It contains the starting code for the dashboard application.

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.
### Chapter 2 - CSS and styling
1. To add global css to the project, import the global.css file into the root layout.tsx file. This allows tailwing utility classes to be applied to our entire app.
2. Another way applying styles is to use CSS modules. Classes created in one module.css files are given unique identifiers to prevent conflicts. 
3. **clsx** is a package which helps in conditionally applying classess to the className props. 
```tsx
    className={clsx(
     'inline-flex items-center rounded-full px-2 py-1 text-xs',
     {
       'bg-gray-100 text-gray-500': status === 'pending',
       'bg-green-500 text-white': status === 'paid',
     },
   )}
// The clsx() function takes in multiple arguments. We can pass classname strings as object keys, and their values being boolean which decides whether the class gets applied or not
```
### Chapter 3 - Fonts
1. Next comes with google fonts pre installed. At build time, Nextjs downloads all the fonts and serves them as static assets so as to prevent extra network requests.
2. To use a font, create a single font.ts file. Import the font from `import {Inter} from 'next/font/google`
```ts
    export const inter = Inter({subsets : ['latin']})
```
**Image optimization with `<Image>`** 
    - Prevents layoutshifts when the image is being loaded
    - Lazy loading of images that are out of user's viewport
    - Uses mordern extensions like .webp, which are more efficient than the traditional extensions
Note: All the images that are in public folder will be statically served therfore they can be referenced directly 

### Chapter - 4 "Layouts" and Pages
- **Layout.tsx** : They're used to wrap all the pages in a single route and provide them a common layout. For eg, `/dashboard   /dashboard/customers   /dasboard/invoiced` 
- Export a react component and make it accept a **children** prop. We can use this feature to make multiple pages share a common navigation component. 
- One benefit of layouts is that on navigation, only the page content is re-renderd while the layout itself remains unchaged
- This is also called **Partial rendering**
- The layout.tsx file that is on the topmost level of /app is called root layout. It is used to modify the tags like html, body and add metadata for better SEO

## Chapter - 5 Links 
- `import Link from 'next/link`
- This component is used to give the website a SPA feel. (no full page refresh between routes)
- Next does something called code splitting by route segements. Meaning each page becomes isolated. 
- In production, whenever a <Link> component comes into viewport, Nextjs **pre-fetches** the data of that page in background. Which makes the page transition 'near instant' 
**Showing active links** : `import {usePathname} from 'next/navigation `
    - `const pathname = usePathname()` The value returned by this hook can be compared with the href value of each link tag, to apply conditional classes to it