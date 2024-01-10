export const metadata = {
  title: "Not Found do Boi",
  description: "Eu não achei a página que você queria, desculpa.",
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <body>{children}</body>
      </html>
    </>
  );
}
