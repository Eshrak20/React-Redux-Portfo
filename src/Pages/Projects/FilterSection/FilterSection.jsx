
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { Filter, RotateCcw, X } from "lucide-react";

const FilterFields = ({
    type,
    filters,
    updateFilter,
    handleReset,
    categories,
    projectTypes,
    projectCategories,
    idPrefix,
}) => {
    const selectStyles =
        "h-12 w-full appearance-none rounded-xl border border-border bg-background px-4 text-sm text-foreground shadow-sm outline-none transition-all duration-200 hover:border-primary/40 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20";

    const labelStyles =
        "text-xs font-semibold uppercase tracking-wider text-muted-foreground";

    const renderSelect = (key, label, options, defaultLabel) => {
        const id = `${idPrefix}-${key}`;

        return (
            <div className="flex flex-col gap-2" key={key}>
                <label htmlFor={id} className={labelStyles}>
                    {label}
                </label>

                <select
                    id={id}
                    className={selectStyles}
                    value={filters[key] ?? ""}
                    onChange={(event) =>
                        updateFilter(key, event.target.value)
                    }
                >
                    <option value="">{defaultLabel}</option>

                    {options.map((option) => (
                        <option key={option.id} value={option.id}>
                            {option.name}
                        </option>
                    ))}
                </select>
            </div>
        );
    };

    return (
        <>
            {type === "blog" ? (
                <>
                    {renderSelect(
                        "status",
                        "Status",
                        [
                            { id: "published", name: "Published" },
                            { id: "draft", name: "Draft" },
                        ],
                        "All statuses",
                    )}

                    {renderSelect(
                        "category",
                        "Category",
                        categories,
                        "All categories",
                    )}
                </>
            ) : (
                <>
                    {renderSelect(
                        "project_type",
                        "Project Type",
                        projectTypes,
                        "All types",
                    )}

                    {renderSelect(
                        "project_category",
                        "Project Category",
                        projectCategories,
                        "All categories",
                    )}
                </>
            )}

            {renderSelect(
                "sort",
                "Sort By",
                [
                    { id: "latest", name: "Latest" },
                    { id: "oldest", name: "Oldest" },
                    { id: "featured", name: "Featured" },
                    { id: "not_featured", name: "Not Featured" },
                ],
                "Latest",
            )}

            <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                className="h-12 w-full gap-2 rounded-xl border-border text-sm transition-colors hover:border-primary hover:text-primary"
            >
                <RotateCcw className="h-4 w-4" />
                Reset filters
            </Button>
        </>
    );
};

const FilterSection = ({
    type = "blog",
    filters,
    setFilters,
    categories = [],
    projectTypes = [],
    projectCategories = [],
}) => {
    const updateFilter = (key, value) => {
        setFilters((previous) => ({
            ...previous,
            [key]: value,
        }));
    };

    const handleReset = () => {
        setFilters(
            type === "blog"
                ? {
                      status: "",
                      category: "",
                      sort: "latest",
                  }
                : {
                      project_type: "",
                      project_category: "",
                      sort: "latest",
                  },
        );
    };

    const activeFilterCount =
        type === "blog"
            ? Number(Boolean(filters.status)) +
              Number(Boolean(filters.category))
            : Number(Boolean(filters.project_type)) +
              Number(Boolean(filters.project_category));

    const sharedFields = {
        type,
        filters,
        updateFilter,
        handleReset,
        categories,
        projectTypes,
        projectCategories,
    };

    return (
        <section className="relative z-30 px-4 py-3 sm:px-6 md:-mt-24 md:py-0">
            <div className="mx-auto max-w-5xl">

                {/* Mobile Filter */}
                <div className="mb-5 flex items-center justify-between gap-4 md:hidden">
                    <p className="text-sm text-muted-foreground">
                        Find the right{" "}
                        {type === "blog" ? "article" : "project"}
                    </p>

                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                type="button"
                                variant="outline"
                                className="relative h-11 gap-2 rounded-xl border-border px-5 shadow-sm transition-all hover:border-primary hover:text-primary"
                            >
                                <Filter className="h-4 w-4" />
                                Filters

                                {activeFilterCount > 0 && (
                                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-bold text-primary-foreground">
                                        {activeFilterCount}
                                    </span>
                                )}
                            </Button>
                        </SheetTrigger>

                        <SheetContent
                            side="right"
                            className="flex h-dvh w-[min(90vw,400px)] flex-col gap-0 border-l border-border bg-background p-0 sm:max-w-[400px]"
                        >
                            {/* Header */}
                            <SheetHeader className="shrink-0 border-b border-border px-6 py-6 text-left">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1.5">
                                        <SheetTitle className="text-xl font-bold">
                                            Filter{" "}
                                            {type === "blog"
                                                ? "Articles"
                                                : "Projects"}
                                        </SheetTitle>

                                        <SheetDescription className="text-sm">
                                            Choose options to narrow down
                                            your results.
                                        </SheetDescription>
                                    </div>

                                    <SheetClose asChild>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="h-9 w-9 shrink-0 rounded-full hover:bg-muted"
                                            aria-label="Close filters"
                                        >
                                            <X className="h-5 w-5" />
                                        </Button>
                                    </SheetClose>
                                </div>
                            </SheetHeader>

                            {/* Scrollable Filters */}
                            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-6">
                                <div className="space-y-6">
                                    <FilterFields
                                        {...sharedFields}
                                        idPrefix="mobile-filter"
                                    />
                                </div>
                            </div>

                            {/* Sticky Footer */}
                            <SheetFooter className="shrink-0 border-t border-border bg-background p-5">
                                <SheetClose asChild>
                                    <Button
                                        type="button"
                                        className="h-12 w-full rounded-xl font-semibold shadow-sm transition-all"
                                    >
                                        Show Results
                                        {activeFilterCount > 0 &&
                                            ` (${activeFilterCount})`}
                                    </Button>
                                </SheetClose>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
                </div>

                {/* Desktop Filter */}
                <div className="hidden border border-border bg-card p-6 shadow-lg shadow-black/5 md:block md:p-8">
                    <div className="grid items-end gap-5 md:grid-cols-4">
                        <FilterFields
                            {...sharedFields}
                            idPrefix="desktop-filter"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FilterSection;
