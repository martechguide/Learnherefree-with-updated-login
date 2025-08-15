import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { 
  Settings, 
  Edit, 
  Save, 
  Trash2, 
  Plus, 
  Eye, 
  EyeOff, 
  TrendingUp,
  DollarSign,
  Users,
  PlayCircle
} from 'lucide-react';

// Mock data for current ads configuration
const initialAdsConfig = {
  banner: {
    desktop: {
      enabled: true,
      publisherId: 'demo-publisher-id',
      width: 728,
      height: 90,
      position: 'top',
      cpm: 8.50,
      title: 'Desktop Leaderboard Banner',
      description: 'Top banner for desktop users'
    },
    mobile: {
      enabled: true,
      publisherId: 'demo-publisher-id',
      width: 320,
      height: 50,
      position: 'top',
      cpm: 4.20,
      title: 'Mobile Banner Ad',
      description: 'Mobile optimized banner'
    },
    sidebar: {
      enabled: true,
      publisherId: 'demo-publisher-id',
      width: 300,
      height: 250,
      position: 'right',
      cpm: 6.80,
      title: 'Sidebar Rectangle',
      description: 'Medium rectangle for sidebar'
    }
  },
  social: {
    instagram: {
      enabled: true,
      adType: 'story',
      title: 'Master Programming Skills',
      description: 'Join 50,000+ students learning to code',
      ctaText: 'Learn More',
      targetingAge: '18-45',
      cpm: 12.30
    },
    facebook: {
      enabled: true,
      adType: 'feed',
      title: 'Become a Web Developer in 6 Months',
      description: 'Intensive program with job guarantee',
      ctaText: 'Apply Now',
      targetingInterests: 'Programming, Tech',
      cpm: 9.60
    },
    youtube: {
      enabled: true,
      adType: 'preroll',
      title: 'Premium Course Preview',
      description: 'Learn Full Stack Development',
      skipAfter: 5,
      duration: 15,
      cpm: 15.40
    }
  },
  streaming: {
    preroll: {
      enabled: true,
      duration: 15,
      skipAfter: 5,
      title: 'Advanced Programming Course',
      description: 'Master advanced concepts with expert guidance',
      ctaText: 'Start Free Trial',
      cpm: 25.80
    },
    midroll: {
      enabled: false,
      frequency: 300, // seconds
      duration: 10,
      title: 'React Masterclass',
      description: 'Learn Hooks, Context, Redux patterns',
      ctaText: 'Enroll Today',
      cpm: 18.90
    },
    overlay: {
      enabled: true,
      duration: 8,
      position: 'bottom',
      title: 'JavaScript Bootcamp',
      description: 'Learn modern JS in 30 days',
      ctaText: 'Learn More',
      cpm: 7.20
    }
  }
};

export default function AdminAdsManagement() {
  const [adsConfig, setAdsConfig] = useState(initialAdsConfig);
  const [selectedAd, setSelectedAd] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  const updateAdConfig = (category: string, adType: string, field: string, value: any) => {
    setAdsConfig(prev => ({
      ...prev,
      [category]: {
        ...(prev as any)[category],
        [adType]: {
          ...(prev as any)[category][adType],
          [field]: value
        }
      }
    }));
  };

  const toggleAdStatus = (category: string, adType: string) => {
    const currentStatus = (adsConfig as any)[category][adType].enabled;
    updateAdConfig(category, adType, 'enabled', !currentStatus);
  };

  const AdConfigCard = ({ 
    category, 
    adType, 
    config 
  }: { 
    category: string; 
    adType: string; 
    config: any; 
  }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center">
              {config.title}
              {config.enabled ? (
                <Badge className="ml-2 bg-green-100 text-green-800">Active</Badge>
              ) : (
                <Badge variant="secondary" className="ml-2">Inactive</Badge>
              )}
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">{config.description}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              checked={config.enabled}
              onCheckedChange={() => toggleAdStatus(category, adType)}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedAd({ category, adType, config });
                setIsEditing(true);
              }}
            >
              <Edit size={14} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <Label className="text-gray-500">CPM Rate</Label>
            <div className="font-semibold text-green-600">
              ${config.cpm ? config.cpm.toFixed(2) : 'N/A'}
            </div>
          </div>
          <div>
            <Label className="text-gray-500">Format</Label>
            <div className="font-medium">
              {config.width && config.height 
                ? `${config.width}x${config.height}`
                : config.adType || 'Custom'
              }
            </div>
          </div>
          {config.publisherId && (
            <div className="col-span-2">
              <Label className="text-gray-500">Publisher ID</Label>
              <div className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                {config.publisherId}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const EditAdModal = () => {
    if (!selectedAd || !isEditing) return null;

    const { category, adType, config } = selectedAd;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
          <CardHeader>
            <CardTitle>Edit {config.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={config.title}
                onChange={(e) => updateAdConfig(category, adType, 'title', e.target.value)}
              />
            </div>
            
            <div>
              <Label>Description</Label>
              <Textarea
                value={config.description}
                onChange={(e) => updateAdConfig(category, adType, 'description', e.target.value)}
              />
            </div>

            {config.publisherId && (
              <div>
                <Label>Publisher ID</Label>
                <Input
                  value={config.publisherId}
                  onChange={(e) => updateAdConfig(category, adType, 'publisherId', e.target.value)}
                />
              </div>
            )}

            {config.width && config.height && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Width (px)</Label>
                  <Input
                    type="number"
                    value={config.width}
                    onChange={(e) => updateAdConfig(category, adType, 'width', parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Height (px)</Label>
                  <Input
                    type="number"
                    value={config.height}
                    onChange={(e) => updateAdConfig(category, adType, 'height', parseInt(e.target.value))}
                  />
                </div>
              </div>
            )}

            {config.cpm && (
              <div>
                <Label>CPM Rate ($)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={config.cpm}
                  onChange={(e) => updateAdConfig(category, adType, 'cpm', parseFloat(e.target.value))}
                />
              </div>
            )}

            {config.ctaText && (
              <div>
                <Label>Call to Action Text</Label>
                <Input
                  value={config.ctaText}
                  onChange={(e) => updateAdConfig(category, adType, 'ctaText', e.target.value)}
                />
              </div>
            )}

            {config.duration && (
              <div>
                <Label>Duration (seconds)</Label>
                <Input
                  type="number"
                  value={config.duration}
                  onChange={(e) => updateAdConfig(category, adType, 'duration', parseInt(e.target.value))}
                />
              </div>
            )}

            {config.skipAfter && (
              <div>
                <Label>Skip After (seconds)</Label>
                <Input
                  type="number"
                  value={config.skipAfter}
                  onChange={(e) => updateAdConfig(category, adType, 'skipAfter', parseInt(e.target.value))}
                />
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Switch
                checked={config.enabled}
                onCheckedChange={(checked) => updateAdConfig(category, adType, 'enabled', checked)}
              />
              <Label>Enable this ad</Label>
            </div>

            <div className="flex justify-end space-x-2 pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  setSelectedAd(null);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  // Save configuration here
                  setIsEditing(false);
                  setSelectedAd(null);
                }}
              >
                <Save className="mr-2" size={16} />
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  // Calculate total revenue
  const calculateTotalRevenue = () => {
    let total = 0;
    Object.values(adsConfig).forEach(category => {
      Object.values(category).forEach((ad: any) => {
        if (ad.enabled && ad.cpm) {
          total += ad.cpm;
        }
      });
    });
    return total;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🎯 Ads Management Dashboard
          </h1>
          <p className="text-gray-600">
            Complete control over all advertisement formats and configurations
          </p>
        </div>

        {/* Revenue Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total CPM</p>
                  <p className="text-2xl font-bold text-green-600">
                    ${calculateTotalRevenue().toFixed(2)}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Ads</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {Object.values(adsConfig).reduce((total, category) => 
                      total + Object.values(category).filter((ad: any) => ad.enabled).length, 0
                    )}
                  </p>
                </div>
                <PlayCircle className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Networks</p>
                  <p className="text-2xl font-bold text-purple-600">5+</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Reach</p>
                  <p className="text-2xl font-bold text-red-600">100K+</p>
                </div>
                <Users className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ads Configuration Tabs */}
        <Tabs defaultValue="banner" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="banner">Banner Ads</TabsTrigger>
            <TabsTrigger value="social">Social Media Ads</TabsTrigger>
            <TabsTrigger value="streaming">Video Streaming Ads</TabsTrigger>
          </TabsList>

          <TabsContent value="banner" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Banner Advertisement Management</h2>
              <Button>
                <Plus className="mr-2" size={16} />
                Add New Banner
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {Object.entries(adsConfig.banner).map(([adType, config]) => (
                <AdConfigCard
                  key={adType}
                  category="banner"
                  adType={adType}
                  config={config}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="social" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Social Media Advertisement Management</h2>
              <Button>
                <Plus className="mr-2" size={16} />
                Add New Social Ad
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {Object.entries(adsConfig.social).map(([adType, config]) => (
                <AdConfigCard
                  key={adType}
                  category="social"
                  adType={adType}
                  config={config}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="streaming" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Video Streaming Advertisement Management</h2>
              <Button>
                <Plus className="mr-2" size={16} />
                Add New Video Ad
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {Object.entries(adsConfig.streaming).map(([adType, config]) => (
                <AdConfigCard
                  key={adType}
                  category="streaming"
                  adType={adType}
                  config={config}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Global Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Global Advertisement Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <Save className="mr-2" size={16} />
                Save All Changes
              </Button>
              <Button variant="outline">
                <Eye className="mr-2" size={16} />
                Preview All Ads
              </Button>
              <Button variant="outline" className="text-blue-600 border-blue-600">
                <TrendingUp className="mr-2" size={16} />
                View Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Modal */}
      <EditAdModal />
    </div>
  );
}