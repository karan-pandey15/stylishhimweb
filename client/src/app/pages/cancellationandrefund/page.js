// pages/cancellationandrefund.js
import Footer from '@/app/components/footer/page';
import Navbar from '@/app/components/navbar/page';
import Head from 'next/head';

const CancellationAndRefund = () => {
  return (
    <>
    <Navbar />
    <div style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        padding: '20px',
        maxWidth: '800px',
        margin: '60px auto',
        lineHeight: '1.6'
    }}>
      <Head>
        <title>Cancellation and Refund Policy</title>
        <meta name="description" content="Cancellation and Refund Policy of our service." />
      </Head>
       
      <main> 
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Cancellation and Refund Policy</h1>
        <section style={{ marginBottom: '20px' }}>
          <h2>Cancellation Policy</h2>
          <p>
            If you need to cancel your booking, please contact us at least 24 hours in advance. Cancellations made less than 24 hours before the scheduled service may be subject to a cancellation fee.
          </p>
        </section>
        <section style={{ marginBottom: '20px' }}>
          <h2>Refund Policy</h2>
          <p>
            Refunds are processed within 5-7 business days. If you are not satisfied with our service, please contact our support team within 30 days of your purchase to request a refund. All refunds are subject to review and approval.
          </p>
        </section>
      </main>
    </div>
      <Footer />

        </>
  );
}; 
export default CancellationAndRefund;
