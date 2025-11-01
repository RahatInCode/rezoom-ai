"use client";
import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend,
  PieLabelRenderProps
} from 'recharts';
import { 
  Search, 
  Bell, 
  User, 
  Home, 
  Users, 
  FileText, 
  Video, 
  Shield, 
  Activity, 
  Settings, 
  LogOut, 
  ChevronDown, 
  Edit, 
  Trash2, 
  Eye, 
  Download, 
  Flag, 
  Ban, 
  MessageSquare, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp, 
  Award, 
  Zap,
  LucideIcon
} from 'lucide-react';

// ============================================
// TYPE DEFINITIONS
// ============================================
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

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: string;
}

interface ChartDataItem {
  month?: string;
  week?: string;
  users?: number;
  active?: number;
  resumes?: number;
  templates?: number;
  [key: string]: string | number | undefined;
}

// FIXED: Proper type for Recharts PieChart data
interface SimulationDataItem {
  name: string;
  value: number;
  [key: string]: string | number;
}

// ============================================
// DATA
// ============================================
const userGrowthData: ChartDataItem[] = [
  { month: 'Jan', users: 1200, active: 980 },
  { month: 'Feb', users: 1850, active: 1520 },
  { month: 'Mar', users: 2650, active: 2180 },
  { month: 'Apr', users: 3420, active: 2890 },
  { month: 'May', users: 4850, active: 4120 },
  { month: 'Jun', users: 6240, active: 5380 }
];

const resumeData: ChartDataItem[] = [
  { week: 'Week 1', resumes: 456, templates: 234 },
  { week: 'Week 2', resumes: 628, templates: 312 },
  { week: 'Week 3', resumes: 789, templates: 445 },
  { week: 'Week 4', resumes: 912, templates: 523 }
];

const simulationData: SimulationDataItem[] = [
  { name: 'Excellent (90-100)', value: 35 },
  { name: 'Good (75-89)', value: 45 },
  { name: 'Average (60-74)', value: 15 },
  { name: 'Needs Work (<60)', value: 5 }
];

const COLORS = ['#10b981', '#14b8a6', '#f59e0b', '#ef4444'];

const dummyUsers: AppUser[] = [
  { _id: '1', username: 'john_doe', email: 'john@example.com', plan: 'pro', joinDate: '2024-01-15', lastActivity: '2024-06-20', status: 'active' },
  { _id: '2', username: 'jane_smith', email: 'jane@example.com', plan: 'free', joinDate: '2024-02-10', lastActivity: '2024-06-19', status: 'active' },
  { _id: '3', username: 'mike_wilson', email: 'mike@example.com', plan: 'pro', joinDate: '2024-03-05', lastActivity: '2024-06-18', status: 'active' },
  { _id: '4', username: 'sarah_connor', email: 'sarah@example.com', plan: 'free', joinDate: '2024-04-12', lastActivity: '2024-06-15', status: 'banned' },
  { _id: '5', username: 'alex_turner', email: 'alex@example.com', plan: 'pro', joinDate: '2024-05-08', lastActivity: '2024-06-20', status: 'active' },
];

const dummyResumes: Resume[] = [
  { id: '1', name: 'Software Engineer Resume', username: 'john_doe', createdDate: '2024-06-01', lastEdited: '2024-06-15', status: 'Active' },
  { id: '2', name: 'Marketing Manager CV', username: 'jane_smith', createdDate: '2024-05-20', lastEdited: '2024-06-10', status: 'Active' },
  { id: '3', name: 'Data Analyst Resume', username: 'mike_wilson', createdDate: '2024-06-05', lastEdited: '2024-06-12', status: 'Active' },
  { id: '4', name: 'Product Manager Resume', username: 'alex_turner', createdDate: '2024-06-10', lastEdited: '2024-06-18', status: 'Active' },
  { id: '5', name: 'UX Designer Portfolio', username: 'sarah_connor', createdDate: '2024-05-28', lastEdited: '2024-06-08', status: 'Flagged' }
];

const dummySimulations: Simulation[] = [
  { id: '1', username: 'john_doe', date: '2024-06-15', score: 85, aiModel: 'GPT-4' },
  { id: '2', username: 'jane_smith', date: '2024-06-14', score: 72, aiModel: 'GPT-4' },
  { id: '3', username: 'mike_wilson', date: '2024-06-13', score: 94, aiModel: 'GPT-4' },
  { id: '4', username: 'alex_turner', date: '2024-06-12', score: 88, aiModel: 'GPT-4' },
  { id: '5', username: 'john_doe', date: '2024-06-10', score: 91, aiModel: 'GPT-4' }
];

const dummyIssues: Issue[] = [
  { id: '1', username: 'john_doe', description: 'Unable to generate resume with template #5', status: 'pending', assignedTo: 'Security Admin', lastUpdated: '2024-06-15 10:30' },
  { id: '2', username: 'jane_smith', description: 'Inappropriate content reported in resume', status: 'reviewed', assignedTo: 'Security Admin', lastUpdated: '2024-06-14 15:20' },
  { id: '3', username: 'sarah_connor', description: 'Spam activity detected', status: 'handled', assignedTo: 'Main Admin', lastUpdated: '2024-06-13 09:15' }
];

const dummyActivityLogs: ActivityLog[] = [
  { id: '1', action: 'User Banned', performedBy: 'Main Admin', affectedUser: 'sarah_connor', timestamp: '2024-06-15 14:30' },
  { id: '2', action: 'Plan Upgraded to Pro', performedBy: 'System', affectedUser: 'john_doe', timestamp: '2024-06-15 12:15' },
  { id: '3', action: 'Issue Resolved', performedBy: 'Security Admin', affectedUser: 'mike_wilson', timestamp: '2024-06-15 09:45' },
  { id: '4', action: 'Resume Flagged', performedBy: 'Security Admin', affectedUser: 'jane_smith', timestamp: '2024-06-14 16:20' },
  { id: '5', action: 'User Muted', performedBy: 'Security Admin', affectedUser: 'alex_turner', timestamp: '2024-06-14 11:10' }
];

const statsData = {
  totalUsers: 6240,
  proUsers: 2486,
  freeUsers: 3754,
  activeUsers: 5380,
  resumesCreated: 2785,
  simulations: 1456,
  avgScore: 85,
  issuesPending: 8
};

// ============================================
// MAIN COMPONENT
// ============================================
const AdminDashboard: React.FC = () => {
  const [currentAdmin] = useState<AdminUser>({ 
    role: 'main_admin', 
    name: 'Admin User', 
    email: 'admin@rezoom.ai' 
  });
  const [currentPage, setCurrentPage] = useState<string>('dashboard');
  const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Navigation Items
  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'resumes', label: 'Resumes', icon: FileText },
    { id: 'simulations', label: 'Interview Simulations', icon: Video },
    { id: 'security', label: 'Security Admin Panel', icon: Shield },
    { id: 'logs', label: 'Activity Logs', icon: Activity },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  // FIXED: Proper label renderer for PieChart using PieLabelRenderProps
  const renderPieLabel = (props: PieLabelRenderProps): string => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, name, percent } = props;
    
    if (!cx || !cy || !midAngle || !innerRadius || !outerRadius || !percent) {
      return '';
    }

    const radius = Number(innerRadius) + (Number(outerRadius) - Number(innerRadius)) * 0.5;
    const x = Number(cx) + radius * Math.cos(-Number(midAngle) * RADIAN);
    const y = Number(cy) + radius * Math.sin(-Number(midAngle) * RADIAN);

    return `${name}: ${(Number(percent) * 100).toFixed(0)}%`;
  };

  // ============================================
  // STAT CARD COMPONENT
  // ============================================
  const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, icon, trend }) => (
    <div className="group bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100 hover:border-emerald-200 hover:shadow-2xl hover:shadow-emerald-100/50 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-400/10 to-teal-400/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform duration-300">
            <div className="text-white">
              {icon}
            </div>
          </div>
          {trend && (
            <div className="flex items-center gap-1 text-emerald-600 text-sm font-bold bg-emerald-50 px-3 py-1 rounded-full">
              <TrendingUp size={16} />
              {trend}
            </div>
          )}
        </div>
        <h3 className="text-slate-600 text-sm font-bold mb-2 uppercase tracking-wide">{title}</h3>
        <p className="text-4xl font-extrabold text-[#0f172a] mb-2">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </p>
        {subtitle && <p className="text-sm text-slate-500 font-medium">{subtitle}</p>}
      </div>
    </div>
  );

  // ============================================
  // DASHBOARD PAGE
  // ============================================
  const DashboardPage = () => (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={statsData.totalUsers}
          subtitle={`${statsData.proUsers} Pro, ${statsData.freeUsers} Free`}
          icon={<Users size={28} />}
          trend="+23%"
        />
        <StatCard
          title="Resumes Created"
          value={statsData.resumesCreated}
          subtitle="+912 this week"
          icon={<FileText size={28} />}
          trend="+18%"
        />
        <StatCard
          title="Simulations"
          value={statsData.simulations}
          subtitle={`${statsData.avgScore}% avg score`}
          icon={<Video size={28} />}
          trend="+12%"
        />
        <StatCard
          title="Active Users"
          value={statsData.activeUsers}
          subtitle="Last 7 days"
          icon={<Activity size={28} />}
          trend="+8%"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-extrabold text-[#0f172a] mb-2">User Growth</h3>
              <p className="text-slate-500 font-medium">Total & Active Users</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
              <TrendingUp className="text-white" size={24} />
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#64748b" style={{ fontSize: '12px', fontWeight: 600 }} />
              <YAxis stroke="#64748b" style={{ fontSize: '12px', fontWeight: 600 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '2px solid #10b981', 
                  borderRadius: '12px',
                  boxShadow: '0 10px 15px -3px rgba(16, 185, 129, 0.1)'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '14px', fontWeight: 600 }} />
              <Line type="monotone" dataKey="users" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 5 }} name="Total Users" />
              <Line type="monotone" dataKey="active" stroke="#14b8a6" strokeWidth={3} dot={{ fill: '#14b8a6', r: 5 }} name="Active Users" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Resumes Per Week Chart */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-extrabold text-[#0f172a] mb-2">Resumes Created</h3>
              <p className="text-slate-500 font-medium">Weekly Performance</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
              <FileText className="text-white" size={24} />
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={resumeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="week" stroke="#64748b" style={{ fontSize: '12px', fontWeight: 600 }} />
              <YAxis stroke="#64748b" style={{ fontSize: '12px', fontWeight: 600 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '2px solid #10b981', 
                  borderRadius: '12px',
                  boxShadow: '0 10px 15px -3px rgba(16, 185, 129, 0.1)'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '14px', fontWeight: 600 }} />
              <Bar dataKey="resumes" fill="#10b981" radius={[12, 12, 0, 0]} name="Resumes" />
              <Bar dataKey="templates" fill="#14b8a6" radius={[12, 12, 0, 0]} name="Templates Used" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Simulation Performance & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Simulation Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-extrabold text-[#0f172a] mb-2">Simulation Performance</h3>
              <p className="text-slate-500 font-medium">Score Distribution</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
              <Award className="text-white" size={24} />
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={simulationData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderPieLabel}
                outerRadius={100}
                dataKey="value"
              >
                {simulationData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-8 shadow-lg text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="relative z-10">
            <h3 className="text-2xl font-extrabold mb-6">Quick Actions</h3>
            <div className="space-y-3">
              <button 
                onClick={() => setCurrentPage('users')}
                className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 rounded-xl p-4 text-left transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <Users size={20} />
                  <span className="font-bold">View All Users</span>
                </div>
              </button>
              <button 
                onClick={() => setCurrentPage('security')}
                className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 rounded-xl p-4 text-left transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <Shield size={20} />
                  <span className="font-bold">Security Issues</span>
                </div>
              </button>
              <button 
                onClick={() => setCurrentPage('settings')}
                className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 rounded-xl p-4 text-left transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <Settings size={20} />
                  <span className="font-bold">System Settings</span>
                </div>
              </button>
              <button 
                onClick={() => setCurrentPage('logs')}
                className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 rounded-xl p-4 text-left transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <Activity size={20} />
                  <span className="font-bold">View Activity Logs</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ============================================
  // USERS PAGE
  // ============================================
  const UsersPage = () => (
    <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100">
      <div className="p-8 border-b-2 border-gray-100 bg-gradient-to-r from-emerald-50 to-teal-50">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-extrabold text-[#0f172a] mb-2">User Management</h2>
            <p className="text-slate-600 font-medium">Manage all registered users and their accounts</p>
          </div>
          <div className="flex gap-3">
            <button className="bg-white border-2 border-emerald-200 text-emerald-600 px-6 py-3 rounded-xl font-bold hover:bg-emerald-50 transition-all duration-300 hover:scale-105 shadow-md">
              Export CSV
            </button>
            <button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-xl font-bold hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 hover:scale-105 shadow-lg shadow-emerald-500/30">
              Add User
            </button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b-2 border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-extrabold text-slate-700 uppercase tracking-wider">Username</th>
              <th className="px-6 py-4 text-left text-xs font-extrabold text-slate-700 uppercase tracking-wider">Email</th>
              <th className="px-6 py-4 text-left text-xs font-extrabold text-slate-700 uppercase tracking-wider">Plan</th>
              <th className="px-6 py-4 text-left text-xs font-extrabold text-slate-700 uppercase tracking-wider">Join Date</th>
              <th className="px-6 py-4 text-left text-xs font-extrabold text-slate-700 uppercase tracking-wider">Last Activity</th>
              <th className="px-6 py-4 text-left text-xs font-extrabold text-slate-700 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-extrabold text-slate-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {dummyUsers.map((user) => (
              <tr key={user._id} className="hover:bg-emerald-50/50 transition-colors duration-200">
                <td className="px-6 py-5 text-sm font-bold text-gray-900">{user.username}</td>
                <td className="px-6 py-5 text-sm text-slate-600 font-medium">{user.email}</td>
                <td className="px-6 py-5">
                  <span
                    className={`px-4 py-2 text-xs font-extrabold rounded-full ${
                      user.plan === "pro"
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {user.plan.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-5 text-sm text-slate-600 font-medium">{user.joinDate}</td>
                <td className="px-6 py-5 text-sm text-slate-600 font-medium">{user.lastActivity}</td>
                <td className="px-6 py-5">
                  <span
                    className={`px-4 py-2 text-xs font-extrabold rounded-full ${
                      user.status === "active"
                        ? "bg-emerald-100 text-emerald-700 border-2 border-emerald-200"
                        : "bg-red-100 text-red-700 border-2 border-red-200"
                    }`}
                  >
                    {user.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-emerald-100 rounded-lg transition-all duration-200 hover:scale-110" title="View">
                      <Eye size={18} className="text-emerald-600" />
                    </button>
                    <button className="p-2 hover:bg-blue-100 rounded-lg transition-all duration-200 hover:scale-110" title="Edit">
                      <Edit size={18} className="text-blue-600" />
                    </button>
                    <button className="p-2 hover:bg-red-100 rounded-lg transition-all duration-200 hover:scale-110" title="Delete">
                      <Trash2 size={18} className="text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // ============================================
  // RESUMES PAGE
  // ============================================
  const ResumesPage = () => (
    <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100">
      <div className="p-8 border-b-2 border-gray-100 bg-gradient-to-r from-emerald-50 to-teal-50">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-extrabold text-[#0f172a] mb-2">Resume Management</h2>
            <p className="text-slate-600 font-medium">View and manage all generated resumes</p>
          </div>
          <button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-xl font-bold hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 hover:scale-105 shadow-lg shadow-emerald-500/30">
            Export All
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b-2 border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-extrabold text-slate-700 uppercase tracking-wider">Resume Name</th>
              <th className="px-6 py-4 text-left text-xs font-extrabold text-slate-700 uppercase tracking-wider">User</th>
              <th className="px-6 py-4 text-left text-xs font-extrabold text-slate-700 uppercase tracking-wider">Created Date</th>
              <th className="px-6 py-4 text-left text-xs font-extrabold text-slate-700 uppercase tracking-wider">Last Edited</th>
              <th className="px-6 py-4 text-left text-xs font-extrabold text-slate-700 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-extrabold text-slate-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {dummyResumes.map((resume) => (
              <tr key={resume.id} className="hover:bg-emerald-50/50 transition-colors duration-200">
                <td className="px-6 py-5 text-sm font-bold text-gray-900">{resume.name}</td>
                <td className="px-6 py-5 text-sm text-slate-600 font-medium">{resume.username}</td>
                <td className="px-6 py-5 text-sm text-slate-600 font-medium">{resume.createdDate}</td>
                <td className="px-6 py-5 text-sm text-slate-600 font-medium">{resume.lastEdited}</td>
                <td className="px-6 py-5">
                  <span className={`px-4 py-2 text-xs font-extrabold rounded-full ${
                    resume.status === 'Active' 
                      ? 'bg-emerald-100 text-emerald-700 border-2 border-emerald-200'
                      : 'bg-yellow-100 text-yellow-700 border-2 border-yellow-200'
                  }`}>
                    {resume.status}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-emerald-100 rounded-lg transition-all duration-200 hover:scale-110" title="View">
                      <Eye size={18} className="text-emerald-600" />
                    </button>
                    <button className="p-2 hover:bg-blue-100 rounded-lg transition-all duration-200 hover:scale-110" title="Download">
                      <Download size={18} className="text-blue-600" />
                    </button>
                    <button className="p-2 hover:bg-yellow-100 rounded-lg transition-all duration-200 hover:scale-110" title="Flag">
                      <Flag size={18} className="text-yellow-600" />
                    </button>
                    <button className="p-2 hover:bg-red-100 rounded-lg transition-all duration-200 hover:scale-110" title="Delete">
                      <Trash2 size={18} className="text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // ============================================
  // SIMULATIONS PAGE
  // ============================================
  const SimulationsPage = () => (
    <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100">
      <div className="p-8 border-b-2 border-gray-100 bg-gradient-to-r from-emerald-50 to-teal-50">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-extrabold text-[#0f172a] mb-2">Interview Simulations</h2>
            <p className="text-slate-600 font-medium">Track interview simulation performance</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white border-2 border-emerald-200 px-6 py-3 rounded-xl">
              <span className="text-slate-600 font-bold text-sm">Avg Score: </span>
              <span className="text-emerald-600 font-extrabold text-2xl">{statsData.avgScore}%</span>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b-2 border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-extrabold text-slate-700 uppercase tracking-wider">Simulation ID</th>
              <th className="px-6 py-4 text-left text-xs font-extrabold text-slate-700 uppercase tracking-wider">User</th>
              <th className="px-6 py-4 text-left text-xs font-extrabold text-slate-700 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-left text-xs font-extrabold text-slate-700 uppercase tracking-wider">Score</th>
              <th className="px-6 py-4 text-left text-xs font-extrabold text-slate-700 uppercase tracking-wider">AI Model</th>
              <th className="px-6 py-4 text-left text-xs font-extrabold text-slate-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {dummySimulations.map((sim) => (
              <tr key={sim.id} className="hover:bg-emerald-50/50 transition-colors duration-200">
                <td className="px-6 py-5 text-sm font-bold text-gray-900">{sim.id}</td>
                <td className="px-6 py-5 text-sm text-slate-600 font-medium">{sim.username}</td>
                <td className="px-6 py-5 text-sm text-slate-600 font-medium">{sim.date}</td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <span className={`px-4 py-2 text-xs font-extrabold rounded-full ${
                      sim.score >= 90 ? 'bg-emerald-100 text-emerald-700 border-2 border-emerald-200' :
                      sim.score >= 75 ? 'bg-teal-100 text-teal-700 border-2 border-teal-200' :
                      sim.score >= 60 ? 'bg-yellow-100 text-yellow-700 border-2 border-yellow-200' :
                      'bg-red-100 text-red-700 border-2 border-red-200'
                    }`}>
                      {sim.score}%
                    </span>
                    {sim.score >= 90 && <Zap size={16} className="text-emerald-600" />}
                  </div>
                </td>
                <td className="px-6 py-5 text-sm text-slate-600 font-medium">{sim.aiModel}</td>
                <td className="px-6 py-5">
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-emerald-100 rounded-lg transition-all duration-200 hover:scale-110" title="View">
                      <Eye size={18} className="text-emerald-600" />
                    </button>
                    <button className="p-2 hover:bg-yellow-100 rounded-lg transition-all duration-200 hover:scale-110" title="Flag">
                      <Flag size={18} className="text-yellow-600" />
                    </button>
                    <button className="p-2 hover:bg-red-100 rounded-lg transition-all duration-200 hover:scale-110" title="Delete">
                      <Trash2 size={18} className="text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // ============================================
  // SECURITY PAGE
  // ============================================
  const SecurityPage = () => (
    <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100">
      <div className="p-8 border-b-2 border-gray-100 bg-gradient-to-r from-red-50 to-orange-50">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-extrabold text-[#0f172a] mb-2">Security Admin Panel</h2>
            <p className="text-slate-600 font-medium">Handle user reports and moderation tasks</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-red-100 border-2 border-red-200 px-6 py-3 rounded-xl">
              <span className="text-red-700 font-bold text-sm">Pending Issues: </span>
              <span className="text-red-600 font-extrabold text-2xl">{statsData.issuesPending}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b-2 border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-extrabold text-slate-700 uppercase tracking-wider">Issue ID</th>
              <th className="px-6 py-4 text-left text-xs font-extrabold text-slate-700 uppercase tracking-wider">User</th>
              <th className="px-6 py-4 text-left text-xs font-extrabold text-slate-700 uppercase tracking-wider">Description</th>
              <th className="px-6 py-4 text-left text-xs font-extrabold text-slate-700 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-extrabold text-slate-700 uppercase tracking-wider">Assigned To</th>
              <th className="px-6 py-4 text-left text-xs font-extrabold text-slate-700 uppercase tracking-wider">Last Updated</th>
              <th className="px-6 py-4 text-left text-xs font-extrabold text-slate-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {dummyIssues.map((issue) => (
              <tr key={issue.id} className="hover:bg-slate-50 transition-colors duration-200">
                <td className="px-6 py-5 text-sm font-bold text-gray-900">{issue.id}</td>
                <td className="px-6 py-5 text-sm text-slate-600 font-medium">{issue.username}</td>
                <td className="px-6 py-5 text-sm text-slate-600 font-medium max-w-xs truncate">{issue.description}</td>
                <td className="px-6 py-5">
                  <span className={`px-4 py-2 text-xs font-extrabold rounded-full ${
                    issue.status === 'pending' ? 'bg-yellow-100 text-yellow-700 border-2 border-yellow-200' :
                    issue.status === 'reviewed' ? 'bg-blue-100 text-blue-700 border-2 border-blue-200' :
                    issue.status === 'handled' ? 'bg-emerald-100 text-emerald-700 border-2 border-emerald-200' :
                    'bg-red-100 text-red-700 border-2 border-red-200'
                  }`}>
                    {issue.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-5 text-sm text-slate-600 font-medium">{issue.assignedTo}</td>
                <td className="px-6 py-5 text-sm text-slate-600 font-medium">{issue.lastUpdated}</td>
                <td className="px-6 py-5">
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-orange-100 rounded-lg transition-all duration-200 hover:scale-110" title="Mute User">
                      <MessageSquare size={18} className="text-orange-600" />
                    </button>
                    <button className="p-2 hover:bg-red-100 rounded-lg transition-all duration-200 hover:scale-110" title="Ban User">
                      <Ban size={18} className="text-red-600" />
                    </button>
                    <button className="p-2 hover:bg-emerald-100 rounded-lg transition-all duration-200 hover:scale-110" title="Mark as Handled">
                      <CheckCircle size={18} className="text-emerald-600" />
                    </button>
                    <button className="p-2 hover:bg-yellow-100 rounded-lg transition-all duration-200 hover:scale-110" title="Escalate">
                      <AlertTriangle size={18} className="text-yellow-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // ============================================
  // ACTIVITY LOGS PAGE
  // ============================================
  const ActivityLogsPage = () => (
    <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100">
      <div className="p-8 border-b-2 border-gray-100 bg-gradient-to-r from-emerald-50 to-teal-50">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-extrabold text-[#0f172a] mb-2">Activity Logs</h2>
            <p className="text-slate-600 font-medium">View all admin and user activities</p>
          </div>
          <button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-xl font-bold hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 hover:scale-105 shadow-lg shadow-emerald-500/30">
            Export Logs
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b-2 border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-extrabold text-slate-700 uppercase tracking-wider">Action</th>
              <th className="px-6 py-4 text-left text-xs font-extrabold text-slate-700 uppercase tracking-wider">Performed By</th>
              <th className="px-6 py-4 text-left text-xs font-extrabold text-slate-700 uppercase tracking-wider">Affected User</th>
              <th className="px-6 py-4 text-left text-xs font-extrabold text-slate-700 uppercase tracking-wider">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {dummyActivityLogs.map((log) => (
              <tr key={log.id} className="hover:bg-emerald-50/50 transition-colors duration-200">
                <td className="px-6 py-5">
                  <span className={`px-4 py-2 text-xs font-extrabold rounded-full ${
                    log.action.includes('Banned') ? 'bg-red-100 text-red-700' :
                    log.action.includes('Upgraded') ? 'bg-emerald-100 text-emerald-700' :
                    log.action.includes('Resolved') ? 'bg-blue-100 text-blue-700' :
                    log.action.includes('Flagged') ? 'bg-yellow-100 text-yellow-700' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {log.action}
                  </span>
                </td>
                <td className="px-6 py-5 text-sm text-slate-600 font-medium">{log.performedBy}</td>
                <td className="px-6 py-5 text-sm font-bold text-gray-900">{log.affectedUser}</td>
                <td className="px-6 py-5 text-sm text-slate-600 font-medium">{log.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // ============================================
  // SETTINGS PAGE
  // ============================================
  const SettingsPage = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100">
        <h2 className="text-2xl font-extrabold text-[#0f172a] mb-6">System Settings</h2>
        <div className="space-y-6">
          <div>
            <label htmlFor="siteName" className="block text-sm font-bold text-slate-700 mb-3">Site Name</label>
            <input 
              id="siteName"
              type="text" 
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 outline-none transition-all font-medium" 
              defaultValue="Rezoom.AI" 
            />
          </div>
          <div>
            <label htmlFor="contactEmail" className="block text-sm font-bold text-slate-700 mb-3">Contact Email</label>
            <input 
              id="contactEmail"
              type="email" 
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 outline-none transition-all font-medium" 
              defaultValue="admin@rezoom.ai" 
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100">
        <h2 className="text-2xl font-extrabold text-[#0f172a] mb-6">Plan Configuration</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-6 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl border-2 border-slate-200">
            <span className="font-bold text-slate-700">Free Plan - Resume Limit</span>
            <input 
              type="number" 
              className="w-24 px-4 py-3 border-2 border-gray-200 rounded-xl font-bold text-center focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500" 
              defaultValue="3" 
            />
          </div>
          <div className="flex items-center justify-between p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border-2 border-emerald-200">
            <span className="font-bold text-emerald-700">Pro Plan - Resume Limit</span>
            <input 
              type="number" 
              className="w-24 px-4 py-3 border-2 border-emerald-200 rounded-xl font-bold text-center focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500" 
              defaultValue="50" 
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100">
        <h2 className="text-2xl font-extrabold text-[#0f172a] mb-6">API Configuration</h2>
        <div className="space-y-6">
          <div>
            <label htmlFor="apiKey" className="block text-sm font-bold text-slate-700 mb-3">OpenAI API Key</label>
            <input 
              id="apiKey"
              type="password" 
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 outline-none transition-all font-medium" 
              placeholder="sk-..." 
            />
          </div>
          <div>
            <label htmlFor="firebaseConfig" className="block text-sm font-bold text-slate-700 mb-3">Firebase Config</label>
            <textarea 
              id="firebaseConfig"
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 outline-none transition-all font-medium" 
              rows={4} 
              placeholder="Firebase configuration JSON..." 
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100">
        <h2 className="text-2xl font-extrabold text-[#0f172a] mb-6">Maintenance Mode</h2>
        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl border-2 border-slate-200">
          <div>
            <p className="font-bold text-slate-900 mb-1">Enable Maintenance Mode</p>
            <p className="text-sm text-slate-500 font-medium">Temporarily disable access for system updates</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-emerald-500 peer-checked:to-teal-500 shadow-inner"></div>
          </label>
        </div>
      </div>

      <div className="flex gap-4">
        <button className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-bold hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 hover:scale-105 shadow-lg shadow-emerald-500/30">
          Save Changes
        </button>
        <button className="px-8 py-4 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-all duration-300">
          Cancel
        </button>
      </div>
    </div>
  );

  // ============================================
  // RENDER PAGE LOGIC
  // ============================================
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

  // ============================================
  // MAIN RENDER
  // ============================================
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/30">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-72 bg-white border-r-2 border-gray-200 z-20 shadow-xl">
        <div className="p-8 border-b-2 border-gray-200 bg-gradient-to-r from-emerald-500 to-teal-500">
          <h1 className="text-3xl font-extrabold text-white mb-2">
            Rezoom.AI
          </h1>
          <p className="text-sm text-emerald-50 font-bold uppercase tracking-wide">
            {currentAdmin.role.replace('_', ' ')}
          </p>
        </div>

        <nav className="p-5 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            if (item.id === 'security' && currentAdmin.role !== 'security_admin' && currentAdmin.role !== 'main_admin') {
              return null;
            }
            
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-300 font-bold ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30 scale-105'
                    : 'text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 hover:scale-102'
                }`}
              >
                <Icon size={22} />
                <span className="text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="ml-72">
        {/* Top Navbar */}
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl border-b-2 border-gray-200 shadow-lg">
          <div className="flex items-center justify-between px-8 py-5">
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="Search users, resumes, or activities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 outline-none transition-all font-medium"
                />
              </div>
            </div>

            <div className="flex items-center gap-5">
              <button className="relative p-3 text-slate-600 hover:bg-emerald-50 rounded-xl transition-all duration-300 hover:scale-110">
                <Bell size={22} />
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white"></span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-4 p-3 hover:bg-emerald-50 rounded-xl transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
                    <User size={20} className="text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-gray-900">{currentAdmin.name}</p>
                    <p className="text-xs text-slate-500 font-medium">{currentAdmin.email}</p>
                  </div>
                  <ChevronDown size={18} className="text-slate-600" />
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border-2 border-gray-200 py-2">
                    <button className="w-full px-5 py-3 text-left text-sm font-bold text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 flex items-center gap-3 transition-all">
                      <User size={18} />
                      Profile
                    </button>
                    <button className="w-full px-5 py-3 text-left text-sm font-bold text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 flex items-center gap-3 transition-all">
                      <Settings size={18} />
                      Change Password
                    </button>
                    <hr className="my-2 border-gray-200" />
                    <button className="w-full px-5 py-3 text-left text-sm font-bold text-red-600 hover:bg-red-50 flex items-center gap-3 transition-all">
                      <LogOut size={18} />
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
          <div className="mb-8">
            <h2 className="text-4xl font-extrabold text-[#0f172a] mb-2">
              {navItems.find(item => item.id === currentPage)?.label}
            </h2>
            <p className="text-slate-600 font-medium text-lg">
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