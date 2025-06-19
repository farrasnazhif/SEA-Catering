import { APP_NAME } from "@/lib/constants";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t">
      <div className="p-3 flex justify-between items-center wrapper">
        <p className="text-sm">
          © {APP_NAME} {currentYear}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
