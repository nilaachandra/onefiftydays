import { Link } from "next-view-transitions";
import React, { FC } from "react";
interface DaysProps {
  day: string | number;
  title: string;
  createdAt: string | any;
  views: number;
  slug: string;
}

const Days: FC<DaysProps> = ({ day, title, createdAt, views, slug }) => {
  return (
    <Link href={slug}>
      <div className="hover:bg-[#d6d4c7] w-full p-1 rounded-md transition-all duration-200 cursor-pointer leading-tight">
        <div className="grid grid-cols-5 py-2">
          <p className="col-span-1">Day {day}</p>
          <p className="col-span-4 text-right">{title}</p>
        </div>
        <div className="flex gap-4 justify-between">
          <p>{views} views</p>
          <p>{createdAt}</p>
        </div>
      </div>
    </Link>
  );
};

export default Days;
