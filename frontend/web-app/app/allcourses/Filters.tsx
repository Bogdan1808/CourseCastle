import { useParamsStore } from "@/hooks/useParamsStore";
import { Button, ButtonGroup } from "flowbite-react";
import { AiOutlineSortDescending } from "react-icons/ai";
import { BsArrowDown, BsArrowUp, BsFillStopCircleFill } from "react-icons/bs";

const pageSizeButtons = [6, 9, 12, 15];
const orderButtons = [
  { label: 'Alphabetical', icon: AiOutlineSortDescending, value: 'courseTitle' },
  { label: 'Recently Added', icon: BsFillStopCircleFill, value: 'new' },
  { label: 'Duration Asc', icon: BsArrowUp, value: 'durationAsc' },
  { label: 'Duration Desc', icon: BsArrowDown, value: 'durationDesc' }
]

export default function Filters() {
  const pageSize = useParamsStore(state => state.pageSize);
  const setParams = useParamsStore(state => state.setParams);
  const orderBy = useParamsStore(state => state.orderBy);

  return (
    <div className="flex justify-between items-center mb-4">
      <div>
        <span className="uppercase text-sm text-amber-300 mr-2">Order by</span>
        <ButtonGroup className="gap-1">
          {orderButtons.map(({label, icon: Icon, value}) => (
            <Button
              key={value}
              onClick={() => setParams({orderBy: value})}
              className={`px-3 py-1 text-sm rounded-md transition-colors focus:ring-0
                ${orderBy === value 
                  ? 'bg-amber-600 text-white font-semibold' 
                  : 'bg-stone-800 border-2 border-amber-400 text-amber-300 hover:bg-amber-400 hover:text-stone-900 font-semibold'
                }`}
            >
              <span className="flex items-center gap-1">
                <Icon/>
                {label}
              </span>
            </Button>
          ))}
        </ButtonGroup>
      </div>

      
      <div>
        <span className="uppercase text-sm text-amber-300 mr-2">Page Size</span>
        <ButtonGroup className="gap-1">
          {pageSizeButtons.map((value) => (
            <Button
              key={value}
              onClick={() => setParams({pageSize: value})}
              className={`px-3 py-1 text-sm rounded-md transition-colors focus:ring-0
                ${pageSize === value 
                  ? 'bg-amber-600 text-white font-semibold' 
                  : 'bg-stone-800 border-2 border-amber-400 text-amber-300 hover:bg-amber-400 hover:text-stone-900 font-semibold'
                }`}
            >
              {value}
            </Button>
          ))}
        </ButtonGroup>
      </div>
    </div>
  );
}