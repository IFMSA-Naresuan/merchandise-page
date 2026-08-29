import "./globals.css";

export const metadata = {
  title: "Merchandise Catalog Wireframe",
  description: "Responsive merchandise catalog wireframe",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
