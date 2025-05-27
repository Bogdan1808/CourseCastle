import Link from "next/link";

type Props = {
  pageSize: number;
  currentPage: number;
};

const pageSizeButtons = [6, 9, 12, 15];

export default function Filters({ pageSize, currentPage }: Props) {
  return (
    <div className="flex justify-between items-center mb-4 ">
      <div>
        <span className="uppercase text-sm text-amber-300 mr-2">Page Size:</span>
        <div className="inline-flex gap-1">
          {pageSizeButtons.map(size => (
            <Link
              key={size}
              href={`?page=1&pageSize=${size}`}
              className={`px-3 py-1 text-sm rounded-md transition-colors
                ${pageSize === size 
                  ? 'bg-amber-600 text-white font-semibold' 
                  : 'bg-stone-800 border-2 border-amber-400 text-amber-300 hover:bg-amber-400 hover:text-stone-900 font-semibold'
                }`}
            >
              {size}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
