
import { Outlet } from "react-router";
import { useGetSettingsDataQuery, useGetSocialLinksQuery } from "./redux/api/homeApi";

import Footer from "./shared/Footer/Footer";
import Navbar from "./shared/Navbar/Navbar";

const App = () => {
  const {
    data: footerData,
    isLoading: footerLoading,
    isError: footerError,
  } = useGetSettingsDataQuery();

  const { data: socialLinksData } = useGetSocialLinksQuery();

  const settings = footerData?.data?.[0] ?? {};

  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-clip bg-background">

      {/* Global Navbar */}
      <Navbar
        settingData={settings}
        socialLinksData={socialLinksData}
      />

      {/* Main Content */}
      <main className="min-w-0 w-full flex-1">
        <Outlet />
      </main>

      {/* Global Footer */}
      <Footer
        data={settings}
        socialLinksData={socialLinksData}
        isLoading={footerLoading}
        isError={footerError}
      />

    </div>
  );
};

export default App;
