"use client";
import React, { useState } from 'react';
import { Edit3, FileText, Mic, Brain, Settings, Shield, LogOut, Crown, Activity, Clock, TrendingUp } from 'lucide-react';

const MyAccount = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const userData = {
    name: "Sarah Anderson",
    email: "sarah.anderson@email.com",
    avatar: "SA",
    plan: "Pro",
    resumeCount: 12,
    lastSimulation: "2 days ago",
    aiScore: 87,
    memberSince: "Jan 2024"
  };

  const recentActivity = [
    { action: "Resume edited", item: "Senior Developer Resume", time: "2 hours ago", icon: FileText },
    { action: "Interview simulation", item: "Technical Interview", time: "2 days ago", icon: Mic },
    { action: "AI Analysis completed", item: "Resume optimization", time: "3 days ago", icon: Brain }
  ];

  const featureCards = [
    {
      id: 'resumes',
      title: 'My Resumes',
      value: userData.resumeCount,
      label: 'Total Resumes',
      icon: FileText,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-500/10 to-cyan-500/10'
    },
    {
      id: 'simulator',
      title: 'Interview Simulator',
      value: userData.lastSimulation,
      label: 'Last Simulation',
      icon: Mic,
      gradient: 'from-violet-500 to-purple-500',
      bgGradient: 'from-violet-500/10 to-purple-500/10'
    },
    {
      id: 'insights',
      title: 'AI Insights',
      value: `${userData.aiScore}%`,
      label: 'Performance Score',
      icon: Brain,
      gradient: 'from-emerald-500 to-teal-500',
      bgGradient: 'from-emerald-500/10 to-teal-500/10'
    },
    {
      id: 'settings',
      title: 'Account Settings',
      value: 'Manage',
      label: 'Security & Preferences',
      icon: Settings,
      gradient: 'from-orange-500 to-pink-500',
      bgGradient: 'from-orange-500/10 to-pink-500/10'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              My Account
            </h1>
            <p className="text-slate-600 mt-1">Manage your profile and track your progress</p>
          </div>
        </div>

        {/* Subscription Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-600 p-6 shadow-xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">
                  {userData.plan} Plan
                </h3>
                <p className="text-white/80 text-sm">
                  Member since {userData.memberSince}
                </p>
              </div>
            </div>
            <button className="px-6 py-2.5 bg-white text-violet-600 font-semibold rounded-xl hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
              Upgrade Plan
            </button>
          </div>
        </div>

        {/* Profile Card */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-violet-400 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
          <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="relative">
                <div className="w-28 h-28 bg-gradient-to-br from-blue-500 to-violet-600 rounded-3xl flex items-center justify-center text-white text-3xl font-bold shadow-2xl">
                  {userData.avatar}
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl font-bold text-slate-800 mb-2">
                  {userData.name}
                </h2>
                <p className="text-slate-600 mb-4 flex items-center justify-center md:justify-start gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                  {userData.email}
                </p>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <button className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2 hover:scale-105">
                    <Edit3 className="w-4 h-4" />
                    Edit Profile
                  </button>
                  <button className="px-5 py-2.5 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-all duration-300 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Security
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="relative group cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-500`}></div>
                <div className={`relative bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/50 transition-all duration-500 ${
                  hoveredCard === card.id ? 'transform scale-105 shadow-2xl' : ''
                }`}>
                  <div className={`w-14 h-14 bg-gradient-to-br ${card.bgGradient} rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 ${
                    hoveredCard === card.id ? 'rotate-6 scale-110' : ''
                  }`}>
                    <Icon className={`w-7 h-7 bg-gradient-to-br ${card.gradient} bg-clip-text text-transparent`} style={{
                      WebkitTextFillColor: 'transparent',
                      WebkitBackgroundClip: 'text'
                    }} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">
                    {card.title}
                  </h3>
                  <p className="text-3xl font-bold bg-gradient-to-br from-slate-800 to-slate-600 bg-clip-text text-transparent mb-1">
                    {card.value}
                  </p>
                  <p className="text-sm text-slate-600">
                    {card.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-blue-400 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
          <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800">Recent Activity</h3>
            </div>
            
            <div className="space-y-4">
              {recentActivity.map((activity, idx) => {
                const ActivityIcon = activity.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-blue-50/50 hover:from-blue-50 hover:to-violet-50 transition-all duration-300 border border-slate-100 hover:border-blue-200 hover:shadow-md cursor-pointer group/item"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500/10 to-violet-500/10 rounded-xl flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
                      <ActivityIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-800">
                        {activity.action}
                      </p>
                      <p className="text-sm text-slate-600">
                        {activity.item}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Clock className="w-4 h-4" />
                      {activity.time}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Logout Section */}
        <div className="flex justify-center">
          <button className="px-6 py-3 bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-600 font-semibold rounded-xl transition-all duration-300 flex items-center gap-2 hover:shadow-lg border border-slate-200 hover:border-red-200">
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>

      </div>
    </div>
  );
};

export default MyAccount;