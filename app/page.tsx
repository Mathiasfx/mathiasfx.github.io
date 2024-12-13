import MyPresentation from "./components/myPresentation";
import ThemeSwitch from "./components/themeSwitch";

export default function Home() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-start">
      <ThemeSwitch />
      <MyPresentation />
    </div>
  );
}
