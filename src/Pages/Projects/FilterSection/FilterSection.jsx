import React from "react";
import { useLocation } from "react-router";

const FilterSection = ({ filters, setFilters, categories = [] }) => {
  const location = useLocation();

  const filterTitle = location.pathname.startsWith("/projects")
    ? "Projects"
    : "Blogs";

  const selectStyles =
    "w-full bg-gray-50 dark:bg-slate-900 border-none ring-1 ring-gray-200 dark:ring-slate-800 focus:ring-2 focus:ring-primary rounded-none px-4 py-4 text-sm transition-all outline-none appearance-none cursor-pointer text-gray-900 dark:text-white";

  return (
    <div className="relative z-30 -mt-24 px-6">
      <div className="max-w-5xl mx-auto bg-white dark:bg-slate-950 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-8 md:p-12 border border-gray-100 dark:border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
          
          {/* Status Filter */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 dark:text-gray-500">
              Status
            </label>

            <select
              className={selectStyles}
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
            >
              <option value="">All</option>
              <option value="published">Published</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 dark:text-gray-500">
              Category
            </label>

            <select
              className={selectStyles}
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
              }
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Filter */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 dark:text-gray-500">
              Sort By
            </label>

            <select
              className={selectStyles}
              value={filters.sort}
              onChange={(e) =>
                setFilters({ ...filters, sort: e.target.value })
              }
            >
              <option value="latest">Latest {filterTitle}</option>
              <option value="oldest">Oldest {filterTitle}</option>
            </select>
          </div>

          {/* Reset Button */}
          <button
            onClick={() =>
              setFilters({
                status: "",
                category: "",
                sort: "latest",
              })
            }
            className="h-[56px] bg-primary text-white text-xs uppercase tracking-widest font-bold hover:bg-primary/80 dark:hover:bg-primary/90 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;