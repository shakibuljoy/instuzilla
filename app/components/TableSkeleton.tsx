
import { Skeleton, SVGSkeleton } from "./Skeleton";

export default function TableSkeleton(){
    return (
        <>
   <div className="w-full">
     <div className="flex items-center py-4">
       <div className="flex h-10 w-full border border-input px-3 py-2 file:border-0 max-w-sm">
         <Skeleton className="w-[128px] max-w-full" />
       </div>
       <div className="inline-flex items-center justify-center transition-colors border border-input h-10 px-4 py-2 ml-auto">
         <Skeleton className="w-[64px] max-w-full" />
         <SVGSkeleton className="ml-2 w-[24px] h-[24px]" />
       </div>
     </div>
     <div className="border">
       <div className="relative w-full overflow-auto">
         <table className="w-full caption-bottom">
           <thead className="[&amp;_tr]:border-b">
             <tr className="border-b transition-colors">
               <th className="h-12 px-4 text-left align-middle [&amp;:has([role=checkbox])]:pr-0">
                 <div className="h-4 w-4 shrink-0 border border-primary"></div>
               </th>
               <th className="h-12 px-4 text-left align-middle [&amp;:has([role=checkbox])]:pr-0">
                 <Skeleton className="w-[48px] max-w-full" />
               </th>
               <th className="h-12 px-4 text-left align-middle [&amp;:has([role=checkbox])]:pr-0">
                 <div className="inline-flex items-center justify-center transition-colors h-10 px-4 py-2">
                   <Skeleton className="w-[40px] max-w-full" />
                   <SVGSkeleton className="lucide-arrow-up-down ml-2 w-[24px] h-[24px]" />
                 </div>
               </th>
               <th className="h-12 px-4 text-left align-middle [&amp;:has([role=checkbox])]:pr-0">
                 <div className="text-right">
                   <Skeleton className="w-[48px] max-w-full" />
                 </div>
               </th>
               <th className="h-12 px-4 text-left align-middle [&amp;:has([role=checkbox])]:pr-0"></th>
             </tr>
           </thead>
           <tbody className="[&amp;_tr:last-child]:border-0">
             <tr className="border-b transition-colors">
               <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                 <div className="h-4 w-4 shrink-0 border border-primary"></div>
               </td>
               <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                 <div>
                   <Skeleton className="w-[56px] max-w-full" />
                 </div>
               </td>
               <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                 <div>
                   <Skeleton className="w-[120px] max-w-full" />
                 </div>
               </td>
               <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                 <div className="text-right">
                   <Skeleton className="w-[56px] max-w-full" />
                 </div>
               </td>
               <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                 <div className="inline-flex items-center justify-center transition-colors h-8 w-8 p-0">
                   <SVGSkeleton className="w-[24px] h-[24px]" />
                 </div>
               </td>
             </tr>
             <tr className="border-b transition-colors">
               <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                 <div className="h-4 w-4 shrink-0 border border-primary"></div>
               </td>
               <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                 <div>
                   <Skeleton className="w-[56px] max-w-full" />
                 </div>
               </td>
               <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                 <div>
                   <Skeleton className="w-[120px] max-w-full" />
                 </div>
               </td>
               <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                 <div className="text-right">
                   <Skeleton className="w-[56px] max-w-full" />
                 </div>
               </td>
               <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                 <div className="inline-flex items-center justify-center transition-colors h-8 w-8 p-0">
                   <SVGSkeleton className="w-[24px] h-[24px]" />
                 </div>
               </td>
             </tr>
             <tr className="border-b transition-colors">
               <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                 <div className="h-4 w-4 shrink-0 border border-primary"></div>
               </td>
               <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                 <div>
                   <Skeleton className="w-[80px] max-w-full" />
                 </div>
               </td>
               <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                 <div>
                   <Skeleton className="w-[168px] max-w-full" />
                 </div>
               </td>
               <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                 <div className="text-right">
                   <Skeleton className="w-[56px] max-w-full" />
                 </div>
               </td>
               <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                 <div className="inline-flex items-center justify-center transition-colors h-8 w-8 p-0">
                   <SVGSkeleton className="w-[24px] h-[24px]" />
                 </div>
               </td>
             </tr>
             <tr className="border-b transition-colors">
               <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                 <div className="h-4 w-4 shrink-0 border border-primary"></div>
               </td>
               <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                 <div>
                   <Skeleton className="w-[56px] max-w-full" />
                 </div>
               </td>
               <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                 <div>
                   <Skeleton className="w-[136px] max-w-full" />
                 </div>
               </td>
               <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                 <div className="text-right">
                   <Skeleton className="w-[56px] max-w-full" />
                 </div>
               </td>
               <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                 <div className="inline-flex items-center justify-center transition-colors h-8 w-8 p-0">
                   <SVGSkeleton className="w-[24px] h-[24px]" />
                 </div>
               </td>
             </tr>
             <tr className="border-b transition-colors">
               <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                 <div className="h-4 w-4 shrink-0 border border-primary"></div>
               </td>
               <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                 <div>
                   <Skeleton className="w-[48px] max-w-full" />
                 </div>
               </td>
               <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                 <div>
                   <Skeleton className="w-[160px] max-w-full" />
                 </div>
               </td>
               <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                 <div className="text-right">
                   <Skeleton className="w-[56px] max-w-full" />
                 </div>
               </td>
               <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                 <div className="inline-flex items-center justify-center transition-colors h-8 w-8 p-0">
                   <SVGSkeleton className="w-[24px] h-[24px]" />
                 </div>
               </td>
             </tr>
           </tbody>
         </table>
       </div>
     </div>
     <div className="flex items-center justify-end space-x-2 py-4">
       <div className="flex-1">
         <Skeleton className="w-[184px] max-w-full" />
       </div>
       <div className="space-x-2">
         <div className="inline-flex items-center justify-center transition-colors border border-input h-9 px-3">
           <Skeleton className="w-[64px] max-w-full" />
         </div>
         <div className="inline-flex items-center justify-center transition-colors border border-input h-9 px-3">
           <Skeleton className="w-[32px] max-w-full" />
         </div>
       </div>
     </div>
   </div>
 </>
   )
};


