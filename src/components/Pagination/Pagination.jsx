import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({
                        pagination,
                        setPage,
                        isFetching = false,
                        label = "blogs",
                    }) => {
    if (!pagination || pagination.total === 0) {
        return null;
    }

    const {
        current_page: currentPage,
        last_page: lastPage,
        per_page: perPage,
        total,
    } = pagination;

    const start = (currentPage - 1) * perPage + 1;

    const end = Math.min(
        currentPage * perPage,
        total
    );

    const hasPreviousPage = currentPage > 1;
    const hasNextPage = currentPage < lastPage;

    const handlePageChange = (newPage) => {
        if (
            newPage < 1 ||
            newPage > lastPage ||
            newPage === currentPage
        ) {
            return;
        }

        setPage(newPage);

        window.scrollTo({
            top: 500,
            behavior: "smooth",
        });
    };

    const getPageNumbers = () => {
        const pages = [];

        if (lastPage <= 7) {
            return Array.from(
                { length: lastPage },
                (_, index) => index + 1
            );
        }

        pages.push(1);

        if (currentPage > 4) {
            pages.push("left-ellipsis");
        }

        const startPage = Math.max(
            2,
            currentPage - 1
        );

        const endPage = Math.min(
            lastPage - 1,
            currentPage + 1
        );

        for (
            let page = startPage;
            page <= endPage;
            page++
        ) {
            pages.push(page);
        }

        if (currentPage < lastPage - 3) {
            pages.push("right-ellipsis");
        }

        pages.push(lastPage);

        return pages;
    };

    return (
        <div className="mt-10 border-t border-border pt-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                {/* Pagination Info */}
                <div className="text-center text-sm text-muted-foreground sm:text-left">
                    Showing{" "}
                    <span className="font-semibold text-foreground">
                        {start}
                    </span>
                    {" – "}
                    <span className="font-semibold text-foreground">
                        {end}
                    </span>
                    {" of "}
                    <span className="font-semibold text-foreground">
                        {total}
                    </span>{" "}
                    {label}
                </div>

                {/* Pagination Controls */}
                {lastPage > 1 && (
                    <div className="flex items-center justify-center gap-1.5">

                        {/* Previous */}
                        <button
                            type="button"
                            onClick={() =>
                                handlePageChange(
                                    currentPage - 1
                                )
                            }
                            disabled={
                                !hasPreviousPage ||
                                isFetching
                            }
                            aria-label="Previous page"
                            className="
                                inline-flex h-9 items-center justify-center
                                gap-1 rounded-md border border-border
                                bg-background px-2.5 text-sm font-medium
                                text-foreground shadow-sm
                                transition-colors
                                hover:bg-primary hover:text-white
                                disabled:pointer-events-none
                                disabled:opacity-50
                            "
                        >
                            <ChevronLeft className="h-4 w-4" />

                            <span className="hidden md:inline">
                                Previous
                            </span>
                        </button>

                        {/* Page Numbers */}
                        <div className="flex items-center gap-1">
                            {getPageNumbers().map(
                                (pageNumber, index) => {
                                    if (
                                        typeof pageNumber !==
                                        "number"
                                    ) {
                                        return (
                                            <span
                                                key={`${pageNumber}-${index}`}
                                                className="
                                                    flex h-9 w-9
                                                    items-center justify-center
                                                    text-sm text-muted-foreground
                                                "
                                            >
                                                ...
                                            </span>
                                        );
                                    }

                                    const isActive =
                                        currentPage ===
                                        pageNumber;

                                    return (
                                        <button
                                            key={pageNumber}
                                            type="button"
                                            onClick={() =>
                                                handlePageChange(
                                                    pageNumber
                                                )
                                            }
                                            disabled={
                                                isFetching
                                            }
                                            aria-label={`Go to page ${pageNumber}`}
                                            aria-current={
                                                isActive
                                                    ? "page"
                                                    : undefined
                                            }
                                            className={`
                                                h-9 min-w-9 rounded-md
                                                border px-2.5 text-sm
                                                font-medium shadow-sm
                                                transition-colors
                                                disabled:pointer-events-none
                                                disabled:opacity-50

                                                ${
                                                isActive
                                                    ? "border-primary bg-primary text-primary-foreground hover:bg-primary/90"
                                                    : "border-border bg-background text-foreground hover:bg-primary hover:text-accent-foreground"
                                            }
                                            `}
                                        >
                                            {pageNumber}
                                        </button>
                                    );
                                }
                            )}
                        </div>

                        {/* Next */}
                        <button
                            type="button"
                            onClick={() =>
                                handlePageChange(
                                    currentPage + 1
                                )
                            }
                            disabled={
                                !hasNextPage ||
                                isFetching
                            }
                            aria-label="Next page"
                            className="
                                inline-flex h-9 items-center justify-center
                                gap-1 rounded-md border border-border
                                bg-background px-2.5 text-sm font-medium
                                text-foreground shadow-sm
                                transition-colors
                                hover:bg-primary hover:text-white
                                disabled:pointer-events-none
                                disabled:opacity-50
                            "
                        >
                            <span className="hidden md:inline">
                                Next
                            </span>

                            <ChevronRight className="h-4 w-4" />
                        </button>

                    </div>
                )}
            </div>
        </div>
    );
};

export default Pagination;