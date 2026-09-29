'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { FB_PIXEL_ID, FB_SECONDARY_PIXEL_ID, pageview } from '@/lib/fpixel';

function PixelEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (FB_PIXEL_ID || FB_SECONDARY_PIXEL_ID) {
      pageview();
    }
  }, [pathname, searchParams]);

  return null;
}

export default function MetaPixel() {
  if (!FB_PIXEL_ID && !FB_SECONDARY_PIXEL_ID) {
    return null;
  }

  return (
    <>
      <Script
        id="meta-pixel-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            ${FB_PIXEL_ID ? `fbq('init', '${FB_PIXEL_ID}');` : ''}
            ${FB_SECONDARY_PIXEL_ID ? `fbq('init', '${FB_SECONDARY_PIXEL_ID}');` : ''}
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {FB_PIXEL_ID && (
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${encodeURIComponent(FB_PIXEL_ID)}&ev=PageView&noscript=1`}
            alt="Meta Pixel"
          />
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {FB_SECONDARY_PIXEL_ID && (
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${encodeURIComponent(FB_SECONDARY_PIXEL_ID)}&ev=PageView&noscript=1`}
            alt="Meta Pixel Secondary"
          />
        )}
      </noscript>
      <Suspense fallback={null}>
        <PixelEvents />
      </Suspense>
    </>
  );
}
