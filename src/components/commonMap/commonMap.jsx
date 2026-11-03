import { Map, MapPinned, Navigation } from "lucide-react";
import { useState } from "react";

const isValidMapUrl = (url) => {
  if (!url) return false;
  try {
    const parsedUrl = new URL(url);
    return (
      parsedUrl.protocol === "https:" &&
      parsedUrl.hostname === "www.google.com" &&
      parsedUrl.pathname === "/maps/embed"
    );
  } catch {
    return false;
  }
};

const CommonMap = ({
  google_map_embed,
  street_view_embed,
  loading = false,
}) => {
  const [showStreetView, setShowStreetView] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const mapUrl = google_map_embed?.trim();
  const streetUrl = street_view_embed?.trim();
  const currentMap = showStreetView ? streetUrl : mapUrl;

  const handleViewChange = (streetView) => {
    setShowStreetView(streetView);
    setIframeLoaded(false);
  };

  return (
    <section className="bg-background px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Find me
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Location
            </h2>
          </div>

          <div
            role="group"
            aria-label="Map display"
            className="flex w-full border border-border sm:w-auto"
          >
            <button
              type="button"
              onClick={() => handleViewChange(false)}
              disabled={loading || !mapUrl}
              aria-pressed={!showStreetView}
              className={`inline-flex min-h-11 flex-1 items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none ${
                !showStreetView
                  ? "bg-primary text-primary-foreground"
                  : "bg-background text-muted-foreground hover:text-foreground"
              }`}
            >
              <Map aria-hidden="true" size={16} />
              Map
            </button>
            <button
              type="button"
              onClick={() => handleViewChange(true)}
              disabled={loading || !streetUrl}
              aria-pressed={showStreetView}
              className={`inline-flex min-h-11 flex-1 items-center justify-center gap-2 border-s border-border px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none ${
                showStreetView
                  ? "bg-primary text-primary-foreground"
                  : "bg-background text-muted-foreground hover:text-foreground"
              }`}
            >
              <MapPinned aria-hidden="true" size={16} />
              Street view
            </button>
          </div>
        </div>

        <div className="relative aspect-[4/3] min-h-64 overflow-hidden border border-border bg-muted sm:aspect-[16/8] lg:aspect-[16/7]">
          {loading ? (
            <div
              role="status"
              className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6"
            >
              <span className="h-1 w-20 bg-primary/70" />
              <p className="text-sm text-muted-foreground">
                Loading map details…
              </p>
            </div>
          ) : !currentMap || !isValidMapUrl(currentMap) ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
              <Navigation
                aria-hidden="true"
                size={28}
                className="text-muted-foreground"
              />
              <p className="max-w-md text-sm leading-6 text-muted-foreground">
                {showStreetView
                  ? "Street View is not available."
                  : "A map location is not available yet."}
              </p>
            </div>
          ) : (
            <>
              {!iframeLoaded && (
                <div
                  role="status"
                  className="absolute inset-0 z-10 flex items-center justify-center bg-muted"
                >
                  <span className="text-sm text-muted-foreground">
                    Loading {showStreetView ? "Street View" : "map"}…
                  </span>
                </div>
              )}
              <iframe
                key={currentMap}
                src={currentMap}
                title={
                  showStreetView
                    ? "Google Maps Street View"
                    : "Google Maps location"
                }
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                onLoad={() => setIframeLoaded(true)}
                className="absolute inset-0 h-full w-full border-0"
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default CommonMap;
