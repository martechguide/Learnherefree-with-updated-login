import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, ExternalLink } from 'lucide-react';

// Social Media Ads
import { 
  InstagramStoryAd, 
  YouTubePrerollAd, 
  FacebookFeedAd, 
  LinkedInSponsoredAd,
  TikTokStyleAd 
} from '@/components/ads/social-media-ads';

// Video Stream Ads
import { 
  PrerollVideoAd, 
  MidrollVideoAd, 
  VideoOverlayAd,
  CompanionBannerAd,
  InteractiveVideoAd 
} from '@/components/ads/video-stream-ads';

// Banner Ads
import { 
  DesktopBannerAd, 
  MobileBannerAd, 
  SidebarBannerAd, 
  BottomStickyBannerAd 
} from '@/components/ads/banner-ads';

export default function AdsShowcase() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  const socialAds = [
    {
      title: "Instagram Story Ad",
      description: "Vertical video ad format perfect for mobile users with interactive elements",
      cpm: "$8-15",
      component: <InstagramStoryAd />
    },
    {
      title: "YouTube Pre-roll Ad", 
      description: "Skippable video ad that plays before content with countdown timer",
      cpm: "$6-12",
      component: <YouTubePrerollAd />
    },
    {
      title: "Facebook Feed Ad",
      description: "Native social media ad with engagement buttons and video preview",
      cpm: "$7-14",
      component: <FacebookFeedAd />
    },
    {
      title: "LinkedIn Sponsored Content",
      description: "Professional network ad targeting career-focused audience",
      cpm: "$12-25",
      component: <LinkedInSponsoredAd />
    },
    {
      title: "TikTok Style Ad",
      description: "Vertical short-form video ad with trending music and effects",
      cpm: "$10-20",
      component: <TikTokStyleAd />
    }
  ];

  const streamingAds = [
    {
      title: "Pre-roll Video Ad",
      description: "Plays before main video content with skip option after countdown",
      cpm: "$15-30",
      component: <PrerollVideoAd onAdComplete={() => setActiveDemo(null)} />
    },
    {
      title: "Mid-roll Video Ad", 
      description: "Appears during content break with minimize option",
      cpm: "$12-25",
      component: <MidrollVideoAd onAdComplete={() => setActiveDemo(null)} />
    },
    {
      title: "Video Overlay Ad",
      description: "Non-intrusive banner overlay on video player",
      cpm: "$5-12",
      component: <VideoOverlayAd onClose={() => setActiveDemo(null)} />
    },
    {
      title: "Companion Banner",
      description: "Static banner displayed alongside video content",
      cpm: "$3-8",
      component: <CompanionBannerAd />
    },
    {
      title: "Interactive Video Ad",
      description: "Engaging quiz-style ad with personalized recommendations",
      cpm: "$20-40",
      component: <InteractiveVideoAd onComplete={() => setActiveDemo(null)} />
    }
  ];

  const bannerAds = [
    {
      title: "Desktop Banner (728x90)",
      description: "Standard leaderboard banner for desktop screens",
      cpm: "$2-8",
      component: <DesktopBannerAd />
    },
    {
      title: "Mobile Banner (320x50)",
      description: "Responsive mobile banner optimized for small screens", 
      cpm: "$1-5",
      component: <MobileBannerAd />
    },
    {
      title: "Sidebar Banner (300x250)",
      description: "Medium rectangle ad perfect for sidebars",
      cpm: "$3-10",
      component: <SidebarBannerAd />
    },
    {
      title: "Sticky Bottom Banner",
      description: "Mobile sticky banner with close button",
      cpm: "$4-12",
      component: <BottomStickyBannerAd />
    }
  ];

  const AdCard = ({ 
    title, 
    description, 
    cpm, 
    component, 
    demoKey 
  }: { 
    title: string; 
    description: string; 
    cpm: string; 
    component: React.ReactNode;
    demoKey: string;
  }) => (
    <Card className="shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            {cpm} CPM
          </Badge>
        </div>
        <p className="text-sm text-gray-600">{description}</p>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          {component}
        </div>
        <Button 
          onClick={() => setActiveDemo(activeDemo === demoKey ? null : demoKey)}
          className="w-full"
          variant={activeDemo === demoKey ? "secondary" : "default"}
        >
          <Play className="mr-2" size={16} />
          {activeDemo === demoKey ? "Hide Demo" : "Live Demo"}
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎯 Advanced Ad Showcase & Examples
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete collection of video streaming ads, social media ads, and responsive banner ads 
            with real-world examples and revenue potential.
          </p>
        </div>

        {/* Revenue Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">$30-60</div>
              <div className="text-sm text-gray-600">Per 1K Views</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">5+</div>
              <div className="text-sm text-gray-600">Ad Networks</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-purple-600">95%</div>
              <div className="text-sm text-gray-600">Mobile Optimized</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-red-600">24/7</div>
              <div className="text-sm text-gray-600">Auto Optimization</div>
            </CardContent>
          </Card>
        </div>

        {/* Ads Showcase Tabs */}
        <Tabs defaultValue="social" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="social" className="text-lg">
              📱 Social Media Ads
            </TabsTrigger>
            <TabsTrigger value="streaming" className="text-lg">
              🎥 Video Stream Ads
            </TabsTrigger>
            <TabsTrigger value="banner" className="text-lg">
              🎯 Banner Ads
            </TabsTrigger>
          </TabsList>

          <TabsContent value="social">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Social Media Advertisement Examples</h2>
              <p className="text-gray-600">
                High-engagement social media ad formats optimized for different platforms and user behaviors.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {socialAds.map((ad, index) => (
                <AdCard 
                  key={index}
                  title={ad.title}
                  description={ad.description}
                  cpm={ad.cpm}
                  component={ad.component}
                  demoKey={`social-${index}`}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="streaming">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Video Streaming Advertisement Examples</h2>
              <p className="text-gray-600">
                Advanced video ad formats for streaming platforms with interactive features and user controls.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {streamingAds.map((ad, index) => (
                <AdCard 
                  key={index}
                  title={ad.title}
                  description={ad.description}
                  cpm={ad.cpm}
                  component={ad.component}
                  demoKey={`streaming-${index}`}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="banner">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Responsive Banner Advertisement Examples</h2>
              <p className="text-gray-600">
                Fully responsive banner ads that adapt to all screen sizes with optimal placement strategies.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bannerAds.map((ad, index) => (
                <AdCard 
                  key={index}
                  title={ad.title}
                  description={ad.description}
                  cpm={ad.cpm}
                  component={ad.component}
                  demoKey={`banner-${index}`}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Implementation Guide */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">🚀 Implementation Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-bold text-lg mb-3">1. Setup Ad Networks</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Register with Adsterra</li>
                  <li>• Configure ad placements</li>
                  <li>• Add publisher domains</li>
                  <li>• Set revenue goals</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-3">2. Choose Ad Formats</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Pre-roll for high CPM</li>
                  <li>• Banner ads for steady income</li>
                  <li>• Social ads for engagement</li>
                  <li>• Interactive ads for conversion</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-3">3. Monitor Performance</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Track CTR and conversion</li>
                  <li>• A/B test ad placements</li>
                  <li>• Optimize for mobile users</li>
                  <li>• Analyze revenue metrics</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Demo Overlay */}
        {activeDemo && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="relative max-w-2xl w-full mx-4">
              <Button 
                onClick={() => setActiveDemo(null)}
                className="absolute -top-12 right-0 bg-white text-black hover:bg-gray-100"
              >
                Close Demo
              </Button>
              {/* Demo content would be rendered here based on activeDemo */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}