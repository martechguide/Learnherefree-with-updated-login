import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Share2, MessageCircle, ExternalLink, Play, Pause, Volume2, VolumeX, X } from 'lucide-react';

// Instagram-style Story Ad
export function InstagramStoryAd() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  
  return (
    <div className="relative w-full max-w-sm mx-auto bg-black rounded-2xl overflow-hidden shadow-2xl">
      {/* Story Header */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full p-0.5">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-gray-800">AD</span>
            </div>
          </div>
          <span className="text-white text-sm font-medium">Sponsored</span>
        </div>
        <Button variant="ghost" size="sm" className="text-white p-1">
          <X size={16} />
        </Button>
      </div>
      
      {/* Video Content Area */}
      <div className="relative aspect-[9/16] bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
          <div className="text-2xl font-bold mb-2">🎓 Learn Coding</div>
          <div className="text-lg mb-4 text-center">Master Programming Skills</div>
          <div className="text-sm opacity-90 text-center mb-6">
            Join 50,000+ students learning to code
          </div>
          <Button className="bg-white text-black hover:bg-gray-100 rounded-full px-8">
            Learn More
          </Button>
        </div>
        
        {/* Play/Pause Control */}
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute bottom-20 left-4 text-white bg-black bg-opacity-50 rounded-full p-2"
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>
        
        {/* Mute Control */}
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className="absolute bottom-20 right-4 text-white bg-black bg-opacity-50 rounded-full p-2"
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>
      
      {/* Story Actions */}
      <div className="absolute bottom-4 right-4 flex flex-col space-y-3">
        <button className="text-white flex flex-col items-center">
          <Heart size={24} />
          <span className="text-xs mt-1">1.2K</span>
        </button>
        <button className="text-white flex flex-col items-center">
          <MessageCircle size={24} />
          <span className="text-xs mt-1">89</span>
        </button>
        <button className="text-white flex flex-col items-center">
          <Share2 size={24} />
          <span className="text-xs mt-1">Share</span>
        </button>
      </div>
    </div>
  );
}

// YouTube Pre-roll Ad Sample
export function YouTubePrerollAd() {
  const [countdown, setCountdown] = useState(5);
  const [canSkip, setCanSkip] = useState(false);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev === 1) {
          setCanSkip(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
      {/* Ad Content */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-3xl font-bold mb-4">🚀 Premium Course</div>
          <div className="text-xl mb-6">Learn Full Stack Development</div>
          <Button className="bg-white text-red-600 hover:bg-gray-100 text-lg px-8 py-3">
            Start Learning Now
          </Button>
        </div>
      </div>
      
      {/* Skip Button */}
      <div className="absolute top-4 right-4">
        {canSkip ? (
          <Button variant="secondary" size="sm" className="bg-gray-800 text-white border-gray-600">
            Skip Ad
          </Button>
        ) : (
          <div className="bg-gray-800 text-white px-3 py-1 rounded text-sm">
            Ad • Skip in {countdown}s
          </div>
        )}
      </div>
      
      {/* YouTube Ad Label */}
      <div className="absolute bottom-4 left-4">
        <Badge variant="secondary" className="bg-yellow-500 text-black">
          Ad • youtube.com
        </Badge>
      </div>
    </div>
  );
}

// Facebook Feed Ad
export function FacebookFeedAd() {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(127);
  
  return (
    <Card className="w-full max-w-lg mx-auto shadow-md">
      <CardContent className="p-0">
        {/* Post Header */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">TC</span>
              </div>
              <div>
                <div className="font-semibold">TechCorp Learning</div>
                <div className="text-sm text-gray-500">Sponsored • 2h</div>
              </div>
            </div>
            <Button variant="ghost" size="sm">•••</Button>
          </div>
          
          <div className="mt-3">
            <p className="text-gray-800">
              🎯 Want to become a developer? Join our intensive bootcamp and land your dream job in tech! 
              <span className="text-blue-600">#LearnTech #WebDevelopment</span>
            </p>
          </div>
        </div>
        
        {/* Ad Image/Video */}
        <div className="relative aspect-video bg-gradient-to-br from-purple-500 to-blue-600">
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
            <div className="text-2xl font-bold mb-3">💻 Full Stack Developer</div>
            <div className="text-lg mb-4">12-Week Intensive Course</div>
            <div className="text-sm opacity-90 mb-6">
              HTML, CSS, JavaScript, React, Node.js, MongoDB
            </div>
            <Button className="bg-white text-purple-600 hover:bg-gray-100 rounded-lg px-6">
              Enroll Now - $299
            </Button>
          </div>
          
          {/* Video Play Button */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
              <Play className="text-purple-600 ml-1" size={24} />
            </div>
          </div>
        </div>
        
        {/* Engagement Actions */}
        <div className="p-4">
          <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
            <div>👍 {likes} people like this</div>
            <div>45 comments • 12 shares</div>
          </div>
          
          <div className="flex items-center justify-around border-t pt-3">
            <button 
              onClick={() => {
                setLiked(!liked);
                setLikes(prev => liked ? prev - 1 : prev + 1);
              }}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                liked ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Heart className={liked ? 'fill-current' : ''} size={20} />
              <span>Like</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <MessageCircle size={20} />
              <span>Comment</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <Share2 size={20} />
              <span>Share</span>
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// LinkedIn Sponsored Content
export function LinkedInSponsoredAd() {
  return (
    <Card className="w-full max-w-lg mx-auto shadow-md border-l-4 border-blue-600">
      <CardContent className="p-0">
        {/* Header */}
        <div className="p-4 bg-blue-50 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">LD</span>
              </div>
              <div>
                <div className="font-semibold text-gray-900">LinkedIn Learning</div>
                <div className="text-sm text-blue-600">Promoted</div>
              </div>
            </div>
            <Button variant="outline" size="sm" className="border-blue-600 text-blue-600">
              Follow
            </Button>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2">
            🎓 Advance Your Career with Professional Certifications
          </h3>
          <p className="text-gray-600 mb-4">
            Master in-demand skills with courses from industry experts. Get certified and stand out in your field.
          </p>
          
          {/* Course Preview */}
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-2xl">🚀</span>
              </div>
              <div className="flex-1">
                <div className="font-medium">JavaScript Essential Training</div>
                <div className="text-sm text-gray-500">By Morten Rand-Hendriksen</div>
                <div className="text-sm text-green-600 font-medium">6.2M+ learners</div>
              </div>
            </div>
          </div>
          
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            <ExternalLink size={16} className="mr-2" />
            Start Free Trial
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// TikTok Style Ad
export function TikTokStyleAd() {
  const [isPlaying, setIsPlaying] = useState(true);
  
  return (
    <div className="relative w-full max-w-sm mx-auto aspect-[9/16] bg-black rounded-2xl overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-600 via-purple-600 to-indigo-600">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
          <div className="text-3xl mb-4">🎵</div>
          <div className="text-xl font-bold text-center mb-3">Learn to Code</div>
          <div className="text-sm text-center opacity-90 mb-6">
            From zero to hero in 30 days! 💻✨
          </div>
          <Button className="bg-white text-black rounded-full px-6 py-2 font-bold">
            Join Now
          </Button>
        </div>
      </div>
      
      {/* TikTok UI Elements */}
      <div className="absolute top-4 right-4">
        <Badge className="bg-red-500 text-white text-xs px-2 py-1">
          Ad
        </Badge>
      </div>
      
      {/* Side Actions */}
      <div className="absolute bottom-20 right-4 flex flex-col space-y-4">
        <div className="text-center">
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-1">
            <Heart className="text-white" size={20} />
          </div>
          <span className="text-white text-xs">24.5K</span>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-1">
            <MessageCircle className="text-white" size={20} />
          </div>
          <span className="text-white text-xs">1.2K</span>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-1">
            <Share2 className="text-white" size={20} />
          </div>
          <span className="text-white text-xs">Share</span>
        </div>
      </div>
      
      {/* Bottom Info */}
      <div className="absolute bottom-4 left-4 right-16">
        <div className="text-white">
          <div className="font-semibold">@CodeMaster</div>
          <div className="text-sm opacity-90">Ready to change your career? #coding #tech</div>
        </div>
      </div>
      
      {/* Play/Pause Button */}
      <button 
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        {!isPlaying && (
          <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
            <Play className="text-black ml-1" size={24} />
          </div>
        )}
      </button>
    </div>
  );
}