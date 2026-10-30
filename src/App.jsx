import { Outlet } from "react-router";
import Navbar from "./shared/Navbar/Navbar";
import PageLoader from "./components/pageLoader/pageLoader";
import Footer from "./shared/Footer/Footer";
import { useGetSettingsDataQuery, useGetSocialLinksQuery } from "./redux/api/homeApi";

const App = () => {
  const { data: footerData, isLoading: footerLoading, isError: footerError } =
    useGetSettingsDataQuery();
  const { data: socialLinksData } = useGetSocialLinksQuery();

  const data = footerData?.data?.[0] || {};
  // console.log(data);

  return (
    <div className="mx-auto flex min-h-screen flex-col pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-0">
      {/* GLOBAL PAGE LOADER */}
      {/* <PageLoader /> */}

      <Navbar  socialLinksData={socialLinksData} settingData={data}  />

      {/* MAIN CONTENT */}
      <main className="flex-1">
        <Outlet />
      </main>

      <Footer
        data={data}
        socialLinksData={socialLinksData}
        isLoading={footerLoading}
        isError={footerError}
      />
    </div>
  );
};

export default App;
