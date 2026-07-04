const FilterSection = ({
  type = "blog",
  filters,
  setFilters,
  categories = [],
  projectTypes = [],
  projectCategories = [],
}) => {
  const selectStyles =
    "w-full bg-gray-50 dark:bg-slate-900 border-none ring-1 ring-gray-200 dark:ring-slate-800 focus:ring-2 focus:ring-primary rounded-none px-4 py-4 text-sm transition-all outline-none appearance-none cursor-pointer text-gray-900 dark:text-white";

  return (
    <div className="relative z-30 -mt-24 px-6">
      <div className="mx-auto max-w-5xl border border-gray-100 bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:border-slate-800 dark:bg-slate-950 dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] md:p-12">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4 items-end">

          {type === "blog" ? (
            <>
              {/* Status */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  Status
                </label>

                <select
                  className={selectStyles}
                  value={filters.status}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      status: e.target.value,
                    })
                  }
                >
                  <option value="">All</option>
                  <option value="published">Published</option>
                </select>
              </div>

              {/* Blog Category */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  Category
                </label>

                <select
                  className={selectStyles}
                  value={filters.category}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      category: e.target.value,
                    })
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
            </>
          ) : (
            <>
              {/* Project Type */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  Project Type
                </label>

                <select
                  className={selectStyles}
                  value={filters.type}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      type: e.target.value,
                    })
                  }
                >
                  <option value="">All Types</option>

                  {projectTypes.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Project Category */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  Project Category
                </label>

                <select
                  className={selectStyles}
                  value={filters.category}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      category: e.target.value,
                    })
                  }
                >
                  <option value="">All Categories</option>

                  {projectCategories.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {/* Sort */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
              Sort By
            </label>

            <select
              className={selectStyles}
              value={filters.sort}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  sort: e.target.value,
                })
              }
            >
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>

          <button
            onClick={() =>
              setFilters(
                type === "blog"
                  ? {
                      status: "",
                      category: "",
                      sort: "latest",
                    }
                  : {
                      type: "",
                      category: "",
                      sort: "latest",
                    }
              )
            }
            className="h-14 bg-primary text-xs font-bold uppercase tracking-widest text-white transition hover:bg-primary/80"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;