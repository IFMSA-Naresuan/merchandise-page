import "./globals.css";

export const metadata = {
  title: "IFMSA-NU Merchandise Catalog",
  description: "Responsive merchandise catalog page for IFMSA",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
