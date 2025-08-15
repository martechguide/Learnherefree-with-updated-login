import React from 'react';
import AdsterraBanner from './adsterra-banner';
import '../../styles/responsive-ads.css';

// Strategic Banner Ad Placements for Maximum Revenue
export default function BannerAds() {
  return (
    <div className="banner-ads-container">
      {/* Top Navigation Banner - High Visibility */}
      <div className="top-banner mb-4">
        <AdsterraBanner
          publisherId="demo-publisher-id"
          width={728}
          height={90}
          format="iframe"
          className="mx-auto"
        />
      </div>
    </div>
  );
}

// Fully Responsive Mobile Banner
export function MobileBannerAd() {
  return (
    <div className="mobile-banner md:hidden mb-4 w-full">
      <div className="responsive-ad-container w-full max-w-full overflow-hidden">
        <AdsterraBanner
          publisherId="demo-publisher-id"
          width={320}
          height={50}
          format="iframe"
          className="w-full h-auto responsive-banner"
          style={{ 
            minHeight: '50px',
            height: 'clamp(40px, 12vw, 80px)',
            maxWidth: '100%'
          }}
        />
      </div>
    </div>
  );
}

// Fully Responsive Desktop Banner
export function DesktopBannerAd() {
  return (
    <div className="desktop-banner hidden md:block mb-6 w-full">
      <div className="responsive-ad-container w-full max-w-full overflow-hidden">
        <AdsterraBanner
          publisherId="demo-publisher-id"
          width={728}
          height={90}
          format="iframe"
          className="w-full h-auto max-w-full responsive-banner"
          style={{ 
            minHeight: '60px',
            height: 'clamp(60px, 8vw, 120px)',
            maxWidth: '100%'
          }}
        />
      </div>
    </div>
  );
}

// Responsive Sidebar Banner
export function SidebarBannerAd() {
  return (
    <div className="sidebar-banner mb-4 w-full">
      <div className="responsive-ad-container w-full max-w-full overflow-hidden">
        <AdsterraBanner
          publisherId="demo-publisher-id"
          width={300}
          height={250}
          format="iframe"
          className="w-full h-auto responsive-banner"
          style={{ 
            minHeight: '200px',
            height: 'clamp(150px, 25vw, 300px)',
            maxWidth: '100%',
            aspectRatio: '6/5'
          }}
        />
      </div>
    </div>
  );
}

// Responsive Bottom Sticky Banner for Mobile
export function BottomStickyBannerAd() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg md:hidden">
      <div className="relative w-full">
        <AdsterraBanner
          publisherId="demo-publisher-id"
          width={320}
          height={50}
          format="iframe"
          className="w-full"
          style={{ 
            minHeight: '50px',
            height: 'clamp(40px, 12vw, 60px)',
            maxWidth: '100%'
          }}
        />
        <button 
          className="absolute top-1 right-1 bg-gray-800 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center hover:bg-gray-700 transition-colors"
          onClick={(e) => {
            const banner = e.currentTarget.parentElement?.parentElement;
            if (banner) banner.style.display = 'none';
          }}
          aria-label="Close Advertisement"
        >
          ×
        </button>
      </div>
    </div>
  );
}

// Content Separator Banner
export function ContentSeparatorBannerAd() {
  return (
    <div className="content-separator-banner my-8 py-4 bg-gray-50 rounded-lg">
      <div className="text-center mb-2">
        <span className="text-xs text-gray-500 uppercase tracking-wide">Advertisement</span>
      </div>
      <DesktopBannerAd />
      <MobileBannerAd />
    </div>
  );
}