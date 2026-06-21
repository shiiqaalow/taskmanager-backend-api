import { Card } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import {
  LayoutDashboard,
  BarChart3,
  Users,
  ShieldCheck,
  FileText,
  Settings,
  HelpCircle,
  Search,
  Bell,
  Plus,
  Filter,
  MoreHorizontal,
} from 'lucide-react'

const users = [
  { id: '6a1b760a', name: 'shiiqaalow', email: 'shiiqaalow@gmail.com', role: 'admin', status: 'active', joined: 'Mar 12, 2026' },
  { id: '6a1b7766', name: 'shiiqaalow2', email: 'shiiqaalow2@gmail.com', role: 'user', status: 'active', joined: 'Mar 14, 2026' },
  { id: '6a1d70ac', name: 'user3', email: 'user3@gmail.com', role: 'user', status: 'offline', joined: 'Apr 2, 2026' },
  { id: '6a2f078d', name: 'shiiqaalow5', email: 'shiiqaalow5@gmail.com', role: 'user', status: 'active', joined: 'May 20, 2026' },
  { id: '6a2f0799', name: 'shiiqaalow6', email: 'shiiqaalow6@gmail.com', role: 'user', status: 'offline', joined: 'May 21, 2026' },
]

const navSections = [
  {
    label: 'overview',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', active: true },
      { icon: BarChart3, label: 'Analytics' },
    ],
  },
  {
    label: 'manage',
    items: [
      { icon: Users, label: 'Users', count: users.length },
      { icon: ShieldCheck, label: 'Roles' },
      { icon: FileText, label: 'Reports' },
    ],
  },
  {
    label: 'system',
    items: [
      { icon: Settings, label: 'Settings' },
      { icon: HelpCircle, label: 'Help' },
    ],
  },
]

const stats = [
  { label: 'Total users', value: users.length, delta: '+2 this month', icon: Users, up: true },
  { label: 'Admins', value: users.filter(u => u.role === 'admin').length, delta: 'No change', icon: ShieldCheck },
  { label: 'Active today', value: users.filter(u => u.status === 'active').length, delta: '+1 vs yesterday', icon: Bell, up: true },
  { label: 'Pending invites', value: 0, delta: 'All accepted', icon: FileText },
]

function initials(name) {
  return name.slice(0, 2).toUpperCase()
}

function Sidebar() {
  return (
    <aside className="w-56 shrink-0 bg-sidebar border-r border-sidebar-border p-4 flex flex-col">
      <div className="flex items-center gap-2 px-2 pb-5">
        <div className="w-7 h-7 rounded-md bg-sidebar-primary text-sidebar-primary-foreground flex items-center justify-center text-sm font-semibold">
          A
        </div>
        <span className="text-sm font-semibold">Adminly</span>
      </div>

      <nav className="space-y-4">
        {navSections.map((section) => (
          <div key={section.label}>
            <p className="text-[11px] text-muted-foreground px-2 pb-1.5 tracking-wide">
              {section.label}
            </p>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.label}
                    href="#"
                    className={
                      item.active
                        ? "flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm bg-sidebar-primary text-sidebar-primary-foreground"
                        : "flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    }
                  >
                    <Icon className={item.active ? "w-4 h-4" : "w-4 h-4 text-muted-foreground"} />
                    {item.label}
                    {item.count !== undefined && (
                      <span
                        className={
                          item.active
                            ? "ml-auto text-[11px] bg-white/20 text-sidebar-primary-foreground px-1.5 py-0.5 rounded-full"
                            : "ml-auto text-[11px] bg-sidebar-accent text-sidebar-accent-foreground px-1.5 py-0.5 rounded-full"
                        }
                      >
                        {item.count}
                      </span>
                    )}
                  </a>
                )
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  )
}

function Topbar() {
  return (
    <div className="h-15 flex items-center justify-between px-6 border-b border-border">
      <div className="flex items-center gap-2 bg-card border border-border rounded-md px-3 py-1.5 w-72 text-sm text-muted-foreground">
        <Search className="w-4 h-4" />
        Search users, roles...
      </div>
      <div className="flex items-center gap-4">
        <button className="relative w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:bg-secondary">
          <Bell className="w-[18px] h-[18px]" />
          <span className="absolute top-1.5 right-2 w-1.5 h-1.5 rounded-full bg-destructive" />
        </button>
        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold">
          SH
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value, delta, icon: Icon, up }) {
  return (
    <Card className="p-4 border-border bg-card">
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-xs text-muted-foreground">{label}</span>
        <div className="w-7 h-7 rounded-md bg-accent text-accent-foreground flex items-center justify-center">
          <Icon className="w-3.5 h-3.5" />
        </div>
      </div>
      <div className="text-2xl font-semibold">{value}</div>
      <div className={up ? "text-xs mt-1 text-green-600 dark:text-green-400" : "text-xs mt-1 text-muted-foreground"}>
        {delta}
      </div>
    </Card>
  )
}

function StatusBadge({ status }) {
  return (
    <Badge variant="secondary" className="gap-1.5 font-medium">
      <span
        className={
          status === 'active'
            ? "w-1.5 h-1.5 rounded-full bg-green-500"
            : "w-1.5 h-1.5 rounded-full bg-muted-foreground"
        }
      />
      {status === 'active' ? 'Active' : 'Offline'}
    </Badge>
  )
}

function RoleBadge({ role }) {
  if (role === 'admin') {
    return (
      <Badge className="gap-1.5 font-medium">
        <ShieldCheck className="w-3 h-3" />
        Admin
      </Badge>
    )
  }
  return <Badge variant="secondary" className="font-medium">User</Badge>
}

export const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />

      <div className="flex-1 min-w-0">
        <Topbar />

        <div className="p-6">
          <div className="flex items-baseline justify-between mb-5">
            <div>
              <h1 className="text-lg font-semibold">Users</h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Manage who has access to your workspace
              </p>
            </div>
            <Button className="gap-1.5">
              <Plus className="w-4 h-4" />
              Add user
            </Button>
          </div>

          <div className="grid grid-cols-4 gap-3.5 mb-6">
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>

          <Card className="border-border bg-card overflow-hidden">
            <div className="flex items-center justify-between px-4.5 py-4 border-b border-border">
              <h3 className="text-sm font-semibold">All users</h3>
              <button className="flex items-center gap-1.5 text-xs text-muted-foreground border border-border rounded-full px-3 py-1.5">
                <Filter className="w-3 h-3" />
                Role: all
              </button>
            </div>

            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left text-[11px] text-muted-foreground font-medium px-4.5 py-2.5 border-b border-border tracking-wide">Name</th>
                  <th className="text-left text-[11px] text-muted-foreground font-medium px-4.5 py-2.5 border-b border-border tracking-wide">Role</th>
                  <th className="text-left text-[11px] text-muted-foreground font-medium px-4.5 py-2.5 border-b border-border tracking-wide">Status</th>
                  <th className="text-left text-[11px] text-muted-foreground font-medium px-4.5 py-2.5 border-b border-border tracking-wide">Joined</th>
                  <th className="px-4.5 py-2.5 border-b border-border"></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="last:border-b-0">
                    <td className="px-4.5 py-3 border-b border-border last:border-b-0">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7.5 h-7.5 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-[11px] font-semibold shrink-0">
                          {initials(user.name)}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4.5 py-3 border-b border-border">
                      <RoleBadge role={user.role} />
                    </td>
                    <td className="px-4.5 py-3 border-b border-border">
                      <StatusBadge status={user.status} />
                    </td>
                    <td className="px-4.5 py-3 border-b border-border text-sm text-muted-foreground">
                      {user.joined}
                    </td>
                    <td className="px-4.5 py-3 border-b border-border">
                      <button className="text-muted-foreground hover:text-foreground">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </div>
    </div>
  )
}