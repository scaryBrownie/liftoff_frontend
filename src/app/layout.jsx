// app/layout.jsx
import Navbar from "./components/common/navbar";
import AuthProvider from "./context/UserContext";
import "./globals.css";

export const metadata = {
   title: "LIFTOFF",
   description: "LIFTOFF Telegram Web App",
};

export default function RootLayout({ children }) {
   return (
      <html lang="en">
         <head>
            <script src="https://telegram.org/js/telegram-web-app.js" async />
         </head>
         <body
            className={`layout bg-black w-screen h-screen max-w-[500px] max-h-[1200px] mb-[10px] flex flex-col relative`}
         >
            <AuthProvider>
               <div className="main-part h-full flex-1 w-full pb-[80px]">
                  {children}
               </div>
               <Navbar />
            </AuthProvider>
         </body>
      </html>
   );
}
