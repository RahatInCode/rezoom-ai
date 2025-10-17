"use client";
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Search, Bell, User, Home, Users, FileText, Video, Shield, Activity, Settings, LogOut, ChevronDown, Edit, Trash2, Eye, Download, Flag, Ban, MessageSquare, CheckCircle, AlertTriangle } from 'lucide-react';

// Types
type UserRole = 'main_admin' | 'security_admin';
type UserPlan = 'free' | 'pro';
type UserStatus = 'active' | 'banned' | 'muted';
type IssueStatus = 'pending' | 'reviewed' | 'handled' | 'escalated';

interface AdminUser {
  role: UserRole;
  name: string;
  email: string;
}

interface AppUser {
  _id: string;
  username: string;
  email: string;
  plan: UserPlan;
  joinDate: string;
  lastActivity: string;
  status: UserStatus;
}

interface Resume {
  id: string;
  name: string;
  username: string;
  createdDate: string;
  lastEdited: string;
  status: string;
}

interface Simulation {
  id: string;
  username: string;
  date: string;
  score: number;
  aiModel: string;
}

interface Issue {
  id: string;
  username: string;
  description: string;
  status: IssueStatus;
  assignedTo: string;
  lastUpdated: string;
}

interface ActivityLog {
  id: string;
  action: string;
  performedBy: string;
  affectedUser: string;
  timestamp: string;
}

// Dummy Data
const userGrowthData = [
  { month: 'Jan', users: 120 },
  { month: 'Feb', users: 180 },
  { month: 'Mar', users: 250 },
  { month: 'Apr', users: 340 },
  { month: 'May', users: 480 },
  { month: 'Jun', users: 620 }
];

const resumeData = [
  { week: 'Week 1', resumes: 45 },
  { week: 'Week 2', resumes: 62 },
  { week: 'Week 3', resumes: 78 },
  { week: 'Week 4', resumes: 91 }
];

const simulationData = [
  { name: 'Excellent', value: 35 },
  { name: 'Good', value: 45 },
  { name: 'Average', value: 15 },
  { name: 'Poor', value: 5 }
];

const COLORS = ['#8b5cf6', '#6366f1', '#3b82f6', '#ef4444'];





const dummyResumes: Resume[] = [
  { id: '1', name: 'Software Engineer Resume', username: 'john_doe', createdDate: '2024-06-01', lastEdited: '2024-06-15', status: 'Active' },
  { id: '2', name: 'Marketing Manager CV', username: 'jane_smith', createdDate: '2024-05-20', lastEdited: '2024-06-10', status: 'Active' },
  { id: '3', name: 'Data Analyst Resume', username: 'mike_wilson', createdDate: '2024-06-05', lastEdited: '2024-06-12', status: 'Active' }
];

const dummySimulations: Simulation[] = [
  { id: '1', username: 'john_doe', date: '2024-06-15', score: 85, aiModel: 'GPT-4' },
  { id: '2', username: 'jane_smith', date: '2024-06-14', score: 72, aiModel: 'GPT-4' },
  { id: '3', username: 'mike_wilson', date: '2024-06-13', score: 90, aiModel: 'GPT-4' }
];

const dummyIssues: Issue[] = [
  { id: '1', username: 'john_doe', description: 'Unable to generate resume', status: 'pending', assignedTo: 'Security Admin', lastUpdated: '2024-06-15 10:30' },
  { id: '2', username: 'jane_smith', description: 'Inappropriate content reported', status: 'reviewed', assignedTo: 'Security Admin', lastUpdated: '2024-06-14 15:20' }
];

const dummyActivityLogs: ActivityLog[] = [
  { id: '1', action: 'User Banned', performedBy: 'Main Admin', affectedUser: 'sarah_connor', timestamp: '2024-06-15 14:30' },
  { id: '2', action: 'Plan Upgraded', performedBy: 'Main Admin', affectedUser: 'john_doe', timestamp: '2024-06-15 12:15' },
  { id: '3', action: 'Issue Resolved', performedBy: 'Security Admin', affectedUser: 'mike_wilson', timestamp: '2024-06-15 09:45' }
];

const AdminDashboard: React.FC = () => {
  const [currentAdmin] = useState<AdminUser>({ role: 'main_admin', name: 'Admin User', email: 'admin@example.com' });
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Navigation Items
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'resumes', label: 'Resumes', icon: FileText },
    { id: 'simulations', label: 'Interview Simulations', icon: Video },
    { id: 'security', label: 'Security Admin Panel', icon: Shield },
    { id: 'logs', label: 'Activity Logs', icon: Activity },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  // Components
  const StatCard: React.FC<{ title: string; value: string | number; subtitle?: string; icon: React.ReactNode }> = ({ title, value, subtitle, icon }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-3 rounded-lg">
          {icon}
        </div>
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
      {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
    </div>
  );

  // Page Components
  const DashboardPage = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Users" value="620" subtitle="120 Pro, 500 Free" icon={<Users className="text-purple-600" size={24} />} />
        <StatCard title="Resumes Created" value="1,234" subtitle="+78 this week" icon={<FileText className="text-blue-600" size={24} />} />
        <StatCard title="Simulations" value="892" subtitle="85% avg score" icon={<Video className="text-indigo-600" size={24} />} />
        <StatCard title="Active Users" value="340" subtitle="Last 7 days" icon={<Activity className="text-green-600" size={24} />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">User Growth</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#8b5cf6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Resumes Per Week</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={resumeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="resumes" fill="#6366f1" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Simulation Performance</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={simulationData} cx="50%" cy="50%" labelLine={false} label={(entry) => entry.name} outerRadius={80} fill="#8884d8" dataKey="value">
                {simulationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Recent Admin Activities</h3>
          <div className="space-y-3">
            {dummyActivityLogs.slice(0, 5).map((log) => (
              <div key={log.id} className="flex justify-between items-start p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-sm text-gray-900">{log.action}</p>
                  <p className="text-xs text-gray-500">By {log.performedBy} • {log.affectedUser}</p>
                </div>
                <span className="text-xs text-gray-400">{log.timestamp.split(' ')[1]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

 



const UsersPage = () => {
  const [users, setUsers] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("http://localhost:5000/users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  if (loading)
    return (
      <div className="p-6 text-center text-gray-500">Loading users...</div>
    );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-bold">User Management</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Username</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plan</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Join Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Activity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.username}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      user.plan === "pro"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {user.plan.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{user.joinDate}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{user.lastActivity}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      user.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Eye size={16} className="text-gray-600" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Edit size={16} className="text-blue-600" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Trash2 size={16} className="text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && (
          <p className="p-6 text-center text-gray-500">No users found.</p>
        )}
      </div>
    </div>
  );
};


  const ResumesPage = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-bold">Resume Management</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Resume Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Edited</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {dummyResumes.map((resume) => (
              <tr key={resume.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{resume.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{resume.username}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{resume.createdDate}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{resume.lastEdited}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">{resume.status}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="p-1 hover:bg-gray-100 rounded"><Eye size={16} className="text-gray-600" /></button>
                    <button className="p-1 hover:bg-gray-100 rounded"><Download size={16} className="text-blue-600" /></button>
                    <button className="p-1 hover:bg-gray-100 rounded"><Flag size={16} className="text-yellow-600" /></button>
                    <button className="p-1 hover:bg-gray-100 rounded"><Trash2 size={16} className="text-red-600" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const SimulationsPage = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-bold">Interview Simulations</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Simulation ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Score</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">AI Model</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {dummySimulations.map((sim) => (
              <tr key={sim.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{sim.id}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{sim.username}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{sim.date}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${sim.score >= 80 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {sim.score}%
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{sim.aiModel}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="p-1 hover:bg-gray-100 rounded"><Eye size={16} className="text-gray-600" /></button>
                    <button className="p-1 hover:bg-gray-100 rounded"><Flag size={16} className="text-yellow-600" /></button>
                    <button className="p-1 hover:bg-gray-100 rounded"><Trash2 size={16} className="text-red-600" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const SecurityPage = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-bold">Security Admin Panel</h2>
        <p className="text-sm text-gray-500 mt-1">Handle user reports and moderation tasks</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Issue ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assigned To</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Updated</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {dummyIssues.map((issue) => (
              <tr key={issue.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{issue.id}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{issue.username}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{issue.description}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    issue.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    issue.status === 'reviewed' ? 'bg-blue-100 text-blue-700' :
                    issue.status === 'handled' ? 'bg-green-100 text-green-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {issue.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{issue.assignedTo}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{issue.lastUpdated}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="p-1 hover:bg-gray-100 rounded" title="Mute User"><MessageSquare size={16} className="text-orange-600" /></button>
                    <button className="p-1 hover:bg-gray-100 rounded" title="Ban User"><Ban size={16} className="text-red-600" /></button>
                    <button className="p-1 hover:bg-gray-100 rounded" title="Mark as Handled"><CheckCircle size={16} className="text-green-600" /></button>
                    <button className="p-1 hover:bg-gray-100 rounded" title="Escalate"><AlertTriangle size={16} className="text-yellow-600" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const ActivityLogsPage = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-bold">Activity Logs</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Performed By</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Affected User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {dummyActivityLogs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{log.action}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{log.performedBy}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{log.affectedUser}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{log.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const SettingsPage = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold mb-4">System Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" defaultValue="Resume Builder Pro" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
            <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" defaultValue="admin@resumebuilder.com" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold mb-4">Plan Configuration</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <span className="font-medium">Free Plan - Resume Limit</span>
            <input type="number" className="w-24 px-3 py-2 border border-gray-300 rounded-lg" defaultValue="3" />
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <span className="font-medium">Pro Plan - Resume Limit</span>
            <input type="number" className="w-24 px-3 py-2 border border-gray-300 rounded-lg" defaultValue="50" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold mb-4">API Configuration</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">OpenAI API Key</label>
            <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="sk-..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Firebase Config</label>
            <textarea className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" rows={4} placeholder="Firebase configuration JSON..." />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold mb-4">Maintenance Mode</h2>
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="font-medium">Enable Maintenance Mode</p>
            <p className="text-sm text-gray-500">Temporarily disable access for system updates</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
          </label>
        </div>
      </div>

      <div className="flex gap-4">
        <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">Save Changes</button>
        <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">Cancel</button>
      </div>
    </div>
  );

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'users':
        return <UsersPage />;
      case 'resumes':
        return <ResumesPage />;
      case 'simulations':
        return <SimulationsPage />;
      case 'security':
        return <SecurityPage />;
      case 'logs':
        return <ActivityLogsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 z-20">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Admin Panel
          </h1>
          <p className="text-sm text-gray-500 mt-1">{currentAdmin.role.replace('_', ' ').toUpperCase()}</p>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            // Hide security panel if not security or main admin
            if (item.id === 'security' && currentAdmin.role !== 'security_admin' && currentAdmin.role !== 'main_admin') {
              return null;
            }
            
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="ml-64">
        {/* Top Navbar */}
        <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between px-8 py-4">
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search users, resumes, or activities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900">{currentAdmin.name}</p>
                    <p className="text-xs text-gray-500">{currentAdmin.email}</p>
                  </div>
                  <ChevronDown size={16} className="text-gray-600" />
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                      <User size={16} />
                      Profile
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                      <Settings size={16} />
                      Change Password
                    </button>
                    <hr className="my-2 border-gray-200" />
                    <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900">
              {navItems.find(item => item.id === currentPage)?.label}
            </h2>
            <p className="text-gray-600 mt-1">
              {currentPage === 'dashboard' && 'Monitor your system health and activity'}
              {currentPage === 'users' && 'Manage all registered users and their accounts'}
              {currentPage === 'resumes' && 'View and manage all generated resumes'}
              {currentPage === 'simulations' && 'Track interview simulation performance'}
              {currentPage === 'security' && 'Handle security issues and user moderation'}
              {currentPage === 'logs' && 'View all admin and user activities'}
              {currentPage === 'settings' && 'Configure system settings and preferences'}
            </p>
          </div>

          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;