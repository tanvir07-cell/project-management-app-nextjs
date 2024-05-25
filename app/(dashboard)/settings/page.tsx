import dynamic from "next/dynamic";

const DarkMode = dynamic(() => import("@/components/DarkMode"), {
  ssr: false,
});

const SettingsPage = () => {
  return (
    <>
      <DarkMode />
    </>
  );
};

export default SettingsPage;
