import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, Volume2, VolumeX, X, ExternalLink, Clock } from 'lucide-react';

// Pre-roll Video Ad (plays before main content)
export function PrerollVideoAd({ onAdComplete }: { onAdComplete: () => void }) {
  const [countdown, setCountdown] = useState(15);
  const [canSkip, setCanSkip] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev === 1) {
          onAdComplete();
          return 0;
        }
        if (prev === 10) {
          setCanSkip(true);
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [onAdComplete]);
  
  const handleSkip = () => {
    onAdComplete();
  };
  
  return (
    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
      {/* Ad Content */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
          <div className="text-4xl mb-4">🎯</div>
          <h2 className="text-3xl font-bold mb-4 text-center">Master Programming</h2>
          <p className="text-xl mb-6 text-center opacity-90">
            Join 100K+ developers learning advanced concepts
          </p>
          <Button className="bg-white text-purple-900 hover:bg-gray-100 text-lg px-8 py-3">
            <ExternalLink className="mr-2" size={20} />
            Start Free Trial
          </Button>
        </div>
      </div>
      
      {/* Ad Controls Top Bar */}
      <div className="absolute top-0 left-0 right-0 bg-black bg-opacity-50 p-4">
        <div className="flex items-center justify-between text-white">
          <Badge className="bg-yellow-500 text-black px-3 py-1">
            Advertisement
          </Badge>
          <div className="flex items-center space-x-4">
            <span className="text-sm">
              {canSkip ? 'Skippable' : `Skip in ${countdown}s`}
            </span>
            {canSkip && (
              <Button 
                onClick={handleSkip}
                variant="secondary" 
                size="sm"
                className="bg-gray-600 hover:bg-gray-500 text-white"
              >
                Skip Ad
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {/* Video Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4">
        <div className="flex items-center space-x-4 text-white">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
          
          <div className="flex-1">
            <Progress 
              value={(15 - countdown) / 15 * 100} 
              className="h-2 bg-white bg-opacity-30"
            />
          </div>
          
          <span className="text-sm">
            0:{countdown.toString().padStart(2, '0')} / 0:15
          </span>
        </div>
      </div>
    </div>
  );
}

// Mid-roll Ad (appears during content)
export function MidrollVideoAd({ onAdComplete }: { onAdComplete: () => void }) {
  const [countdown, setCountdown] = useState(10);
  const [isMinimized, setIsMinimized] = useState(false);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev === 1) {
          onAdComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [onAdComplete]);
  
  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-2xl border-2 border-blue-500 z-50">
        <div className="relative">
          <div className="aspect-video bg-gradient-to-r from-green-500 to-blue-500 rounded-t-lg flex items-center justify-center text-white">
            <div className="text-center">
              <div className="text-2xl mb-2">🚀</div>
              <div className="text-sm font-semibold">Course Preview</div>
            </div>
          </div>
          <div className="p-3">
            <div className="text-sm font-medium mb-1">Advanced React Course</div>
            <div className="text-xs text-gray-600 mb-2">Ad closes in {countdown}s</div>
            <Button 
              size="sm" 
              className="w-full bg-blue-500 hover:bg-blue-600 text-white text-xs py-1"
            >
              Learn More
            </Button>
          </div>
          <button 
            onClick={() => setIsMinimized(false)}
            className="absolute top-2 left-2 bg-black bg-opacity-50 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
          >
            ⤢
          </button>
          <button 
            onClick={onAdComplete}
            className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
          >
            <X size={12} />
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative w-full max-w-2xl aspect-video bg-white rounded-lg overflow-hidden shadow-2xl">
        {/* Ad Content */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-blue-600">
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
            <div className="text-3xl mb-4">📚</div>
            <h3 className="text-2xl font-bold mb-3">Advanced React Masterclass</h3>
            <p className="text-center mb-6 opacity-90">
              Learn Hooks, Context, Redux, and advanced patterns
            </p>
            <Button className="bg-white text-green-600 hover:bg-gray-100 px-6 py-2">
              Enroll Today - 50% Off
            </Button>
          </div>
        </div>
        
        {/* Controls */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <Badge className="bg-red-500 text-white">
            <Clock className="mr-1" size={12} />
            Ad • {countdown}s remaining
          </Badge>
          <div className="flex space-x-2">
            <Button 
              onClick={() => setIsMinimized(true)}
              variant="secondary" 
              size="sm"
              className="bg-black bg-opacity-50 text-white hover:bg-opacity-70"
            >
              Minimize
            </Button>
            <Button 
              onClick={onAdComplete}
              variant="secondary" 
              size="sm"
              className="bg-black bg-opacity-50 text-white hover:bg-opacity-70"
            >
              <X size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Overlay Banner Ad (appears over video content)
export function VideoOverlayAd({ onClose }: { onClose: () => void }) {
  const [timeLeft, setTimeLeft] = useState(8);
  const [isExpanded, setIsExpanded] = useState(false);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev === 1) {
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [onClose]);
  
  if (isExpanded) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
        <div className="relative w-full max-w-4xl aspect-video bg-white rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white flex flex-col items-center justify-center p-8">
            <div className="text-4xl mb-6">💎</div>
            <h2 className="text-4xl font-bold mb-4">Premium Coding Course</h2>
            <p className="text-xl text-center mb-8 opacity-90">
              Master Full-Stack Development with our comprehensive program
            </p>
            <div className="flex space-x-4">
              <Button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 text-lg">
                Start Learning
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setIsExpanded(false)}
                className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3 text-lg"
              >
                Close
              </Button>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full w-10 h-10 flex items-center justify-center"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="absolute bottom-4 left-4 right-4 z-40">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-2xl">🎓</span>
            </div>
            <div>
              <div className="font-semibold text-gray-900">JavaScript Bootcamp</div>
              <div className="text-sm text-gray-600">Learn modern JS in 30 days</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button 
              onClick={() => setIsExpanded(true)}
              size="sm" 
              className="bg-orange-500 hover:bg-orange-600 text-white px-4"
            >
              Learn More
            </Button>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <X size={16} />
            </button>
          </div>
        </div>
        
        <div className="mt-2 text-xs text-gray-500">
          Ad closes in {timeLeft}s
        </div>
      </div>
    </div>
  );
}

// Companion Banner (appears alongside video)
export function CompanionBannerAd() {
  return (
    <div className="w-full bg-white rounded-lg border border-gray-200 shadow-sm p-4">
      <div className="flex items-center justify-between mb-3">
        <Badge variant="outline" className="text-xs">
          Sponsored
        </Badge>
        <button className="text-gray-400 hover:text-gray-600">
          <X size={14} />
        </button>
      </div>
      
      <div className="aspect-[4/3] bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg mb-3 flex items-center justify-center text-white">
        <div className="text-center">
          <div className="text-3xl mb-2">⚡</div>
          <div className="font-bold text-lg">Fast Track</div>
          <div className="text-sm opacity-90">Web Development</div>
        </div>
      </div>
      
      <h3 className="font-semibold text-gray-900 mb-1">
        Become a Web Developer in 6 Months
      </h3>
      <p className="text-sm text-gray-600 mb-3">
        Intensive program with job guarantee. Learn HTML, CSS, JavaScript, React, and Node.js.
      </p>
      
      <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm">
        Apply Now - Limited Spots
      </Button>
      
      <div className="text-xs text-gray-500 mt-2 text-center">
        ⭐ 4.8/5 rating • 2,000+ graduates
      </div>
    </div>
  );
}

// Interactive Video Ad with CTAs
export function InteractiveVideoAd({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [userChoices, setUserChoices] = useState<string[]>([]);
  
  const steps = [
    {
      question: "What's your coding experience?",
      options: ["Beginner", "Intermediate", "Advanced"]
    },
    {
      question: "Which technology interests you most?",
      options: ["Frontend", "Backend", "Full-Stack"]
    },
    {
      question: "What's your learning goal?",
      options: ["Career Change", "Skill Upgrade", "Personal Project"]
    }
  ];
  
  const handleChoice = (choice: string) => {
    setUserChoices([...userChoices, choice]);
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Show personalized recommendation
      setTimeout(onComplete, 3000);
    }
  };
  
  if (currentStep >= steps.length) {
    return (
      <div className="w-full aspect-video bg-gradient-to-br from-green-600 to-blue-600 rounded-lg flex items-center justify-center text-white">
        <div className="text-center">
          <div className="text-4xl mb-4">🎯</div>
          <h3 className="text-2xl font-bold mb-4">Perfect Match Found!</h3>
          <p className="text-lg mb-6">
            Based on your choices, we recommend our {userChoices[1]} {userChoices[0]} Course
          </p>
          <Button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3">
            View Recommended Course
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-full aspect-video bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center text-white p-8">
      <div className="text-center max-w-md">
        <div className="text-3xl mb-4">🤔</div>
        <h3 className="text-2xl font-bold mb-6">{steps[currentStep].question}</h3>
        <div className="space-y-3">
          {steps[currentStep].options.map((option, index) => (
            <Button
              key={index}
              onClick={() => handleChoice(option)}
              className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white border border-white border-opacity-30"
            >
              {option}
            </Button>
          ))}
        </div>
        <div className="mt-6">
          <div className="text-sm opacity-75">Step {currentStep + 1} of {steps.length}</div>
          <Progress value={(currentStep + 1) / steps.length * 100} className="mt-2 bg-white bg-opacity-20" />
        </div>
      </div>
    </div>
  );
}