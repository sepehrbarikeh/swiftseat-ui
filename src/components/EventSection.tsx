import { Concert } from "../types/concert";
import ConcertCard from "./concertCard";

interface Props {
  title : string;
  concert : Concert[]
}

export default function EventSection({title,concert}: Props) {
return(
  <>
         <section className="relative mx-8 my-4 py-10 px-4 sm:px-6 lg:px-10 rounded-2xl overflow-hidden bg-linear-to-br from-white via-slate-50 to-violet-50">
  
            
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-yellow-500/10 blur-3xl rounded-full" />
  
        
            <div className="relative flex items-end justify-between mb-10">
  
              <h2 className="text-3xl font-bold text-slate-900">
                <span className="text-yellow-400"></span>{title}
              </h2>
  
            </div>
  
            {/* Grid */}
            <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {concert.map((c: Concert) => (
                <ConcertCard key={c.id} concert={c} />
              ))}
            </div>
  
          </section>
  
  </>
)

}