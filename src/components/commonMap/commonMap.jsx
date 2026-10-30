
import { Map, MapPinned, Navigation } from "lucide-react";
import { useState } from "react";

const CommonMap = ({
  google_map_embed,
  street_view_embed,
  loading = false,
}) => {
  const [showStreetView, setShowStreetView] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const mapUrl = google_map_embed?.trim();
  const streetUrl = street_view_embed?.trim();

  const currentMap = showStreetView
    ? streetUrl
    : mapUrl;

  const isValidUrl = (url) => {
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

  const handleViewChange = (streetView) => {
    setShowStreetView(streetView);
    setIframeLoaded(false);
  };

  return (
    <section className="w-full mb-20 bg-background py-10 md:py-20">
      <div className="max-w-7xl mx-auto  sm:px-6 lg:px-8">

        {/* Header */}
        <div className="hidden md:inline text-center">
          <span className="text-sm font-semibold tracking-widest uppercase text-primary">
            My Location
          </span>
        </div>

        {/* Map Frame */}
        <div className="overflow-hidden mt-4 rounded-xl  bg-card md:shadow-lg">

          {/* Top Bar */}
          <div className="min-h-14 flex flex-wrap items-center justify-between gap-3 px-4 md:px-6 py-3 ">

            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="w-3 h-3 rounded-full bg-green-500" />
              </div>

              <span className="text-sm font-medium text-muted-foreground">
                {showStreetView ? "Street View" : "Google Maps"}
              </span>
            </div>

            {/* Toggle Buttons */}
            <div className="flex items-center gap-1 rounded-lg bg-muted p-1">
              <button
                type="button"
                onClick={() => handleViewChange(false)}
                disabled={loading || !mapUrl}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors disabled:opacity-40 ${
                  !showStreetView
                    ? "bg-primary text-primary-foreground md:shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Map size={16} />
                Map View
              </button>

              <button
                type="button"
                onClick={() => handleViewChange(true)}
                disabled={loading || !streetUrl}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors disabled:opacity-40 ${
                  showStreetView
                    ? "bg-primary text-primary-foreground md:shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <MapPinned size={16} />
                Street View
              </button>
            </div>
          </div>

          {/* Map Content */}
          <div className="relative w-full h-[350px] sm:h-[450px] md:h-[550px] bg-muted/30">

            {loading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="w-10 h-10  rounded-full animate-spin" />

                <p className="text-sm text-muted-foreground">
                  Loading map data...
                </p>
              </div>
            ) : !currentMap || !isValidUrl(currentMap) ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
                <Navigation
                  size={32}
                  className="text-muted-foreground"
                />

                <p className="text-muted-foreground">
                  {showStreetView
                    ? "Street View URL is unavailable or invalid."
                    : "Google Maps URL is unavailable or invalid."}
                </p>
              </div>
            ) : (
              <>
                {!iframeLoaded && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10 bg-muted/30 pointer-events-none">
                    <div className="w-10 h-10  rounded-full animate-spin" />

                    <p className="text-sm text-muted-foreground">
                      Loading {showStreetView ? "Street View" : "Map"}...
                    </p>
                  </div>
                )}

                <iframe
                  key={currentMap}
                  src={currentMap}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="eager"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={
                    showStreetView
                      ? "Google Maps Street View"
                      : "Google Maps Location"
                  }
                  onLoad={() => setIframeLoaded(true)}
                  className="absolute inset-0 w-full h-full"
                />
              </>
            )}
          </div>

          {/* Bottom Bar */}
          <div className="flex items-center justify-between gap-3 px-4 md:px-6 py-3  bg-muted/30">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              MAP: ACTIVE
            </div>

            <span className="text-xs text-muted-foreground">
              {showStreetView ? "STREET VIEW" : "MAP VIEW"} · GOOGLE MAPS
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CommonMap;
