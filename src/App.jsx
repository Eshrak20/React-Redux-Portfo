import { Outlet } from "react-router";
import Navbar from "./shared/Navbar/Navbar";
import PageLoader from "./components/pageLoader/pageLoader";
import Footer from "./shared/Footer/Footer";
import { useGetSettingsDataQuery, useGetSocialLinksQuery } from "./redux/api/homeApi";

const App = () => {
  const { data: footerData, isLoading: footerLoading } =
    useGetSettingsDataQuery();
  const { data: socialLinksData, isLoading: socialLinksLoading } =
    useGetSocialLinksQuery();

  const data = footerData?.data[0] || [];
  // console.log(data);

  return (
    <div className="mx-auto min-h-screen flex flex-col ">
      {/* GLOBAL PAGE LOADER */}
      {/* <PageLoader /> */}

      <Navbar  socialLinksData={socialLinksData} settingData={data}  />

      {/* MAIN CONTENT */}
      <main className="flex-1">
        <Outlet />
      </main>

      <Footer data={data} socialLinksData={socialLinksData} />
    </div>
  );
};

export default App;
