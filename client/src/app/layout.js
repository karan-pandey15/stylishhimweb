 
import { Inter } from 'next/font/google';
import Prvider from '@/Redux/Prvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'stylishhim.com',
  description: 'Your Online Care Shop'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Prvider>
          <ToastContainer />
          {children}
        </Prvider>
      </body>
    </html>
  );
}
