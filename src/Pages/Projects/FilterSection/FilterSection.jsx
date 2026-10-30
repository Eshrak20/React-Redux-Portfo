import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Filter, RotateCcw } from "lucide-react";

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
        "h-12 w-full appearance-none rounded-lg border border-border bg-background px-4 text-sm text-foreground shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-primary";
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
                    onChange={(event) => updateFilter(key, event.target.value)}
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
                className="h-12 gap-2 rounded-lg border-border text-sm"
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
                ? { status: "", category: "", sort: "latest" }
                : { project_type: "", project_category: "", sort: "latest" },
        );
    };

    const activeFilterCount =
        type === "blog"
            ? Number(Boolean(filters.status)) + Number(Boolean(filters.category))
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
        <div className="relative z-30 px-4 py-2 sm:px-6 md:-mt-24 md:py-0">
            <div className="mx-auto max-w-5xl">
                <div className="mb-5 flex items-center justify-between md:hidden">
                    <p className="text-sm text-muted-foreground">
                        Find the right {type === "blog" ? "article" : "project"}
                    </p>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button type="button" className="relative gap-2 rounded-lg">
                                <Filter className="h-4 w-4" />
                                Filters
                                {activeFilterCount > 0 && (
                                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary-foreground px-1 text-xs font-bold text-primary">
                                        {activeFilterCount}
                                    </span>
                                )}
                            </Button>
                        </DialogTrigger>

                        <DialogContent
                            showCloseButton={false}
                            className="fixed inset-y-0 right-0 left-auto top-0 z-50 flex h-dvh w-[min(90vw,24rem)] max-w-none translate-x-0 translate-y-0 flex-col gap-0 rounded-none border-y-0 border-r-0 border-l border-border bg-background p-0 shadow-2xl data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-none md:hidden"
                        >
                            <DialogHeader className="border-b border-border px-6 py-5 text-left">
                                <DialogTitle className="text-xl">
                                    Filter {type === "blog" ? "articles" : "projects"}
                                </DialogTitle>
                                <DialogDescription>
                                    Choose options to narrow down the results.
                                </DialogDescription>
                            </DialogHeader>

                            <div className="flex-1 space-y-5 overflow-y-auto px-6 py-6">
                                <FilterFields
                                    {...sharedFields}
                                    idPrefix="mobile-filter"
                                />
                            </div>

                            <DialogFooter className="border-t border-border p-5">
                                <DialogClose asChild>
                                    <Button type="button" className="w-full">
                                        Show results
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="hidden border border-border bg-card p-6 shadow-lg shadow-black/5 md:block md:p-8">
                    <div className="grid items-end gap-5 md:grid-cols-4">
                        <FilterFields
                            {...sharedFields}
                            idPrefix="desktop-filter"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterSection;
