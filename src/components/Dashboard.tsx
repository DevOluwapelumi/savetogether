import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Member } from "@/types/savings";
import { Users, TrendingUp, Wallet, Calendar } from "lucide-react";

interface DashboardProps {
  members: Member[];
  currentWeek: number;
}

export function Dashboard({ members, currentWeek }: DashboardProps) {
  const totalSavings = members.reduce((sum, member) => sum + member.totalContribution, 0);
  const totalInterest = members.reduce((sum, member) => sum + member.accumulatedInterest, 0);
  const totalValue = totalSavings + totalInterest;

  const stats = [
    {
      title: "Total Members",
      value: members.length,
      icon: Users,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      title: "Total Savings",
      value: `₦${totalSavings.toLocaleString()}`,
      icon: Wallet,
      color: "text-accent",
      bg: "bg-accent/10",
    },
    {
      title: "Total Interest",
      value: `₦${totalInterest.toLocaleString()}`,
      icon: TrendingUp,
      color: "text-success",
      bg: "bg-success/10",
    },
    {
      title: "Current Week",
      value: currentWeek,
      icon: Calendar,
      color: "text-warning",
      bg: "bg-warning/10",
    },
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-primary text-primary-foreground shadow-elevated animate-fade-in">
        <CardHeader>
          <CardTitle className="text-2xl">Group Summary</CardTitle>
          <CardDescription className="text-primary-foreground/80">
            Total value including interest earnings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-5xl font-bold">₦{totalValue.toLocaleString()}</div>
          <p className="mt-2 text-primary-foreground/90">
            {members.length} active {members.length === 1 ? "member" : "members"}
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card
            key={stat.title}
            className="shadow-card hover:shadow-elevated transition-all duration-300 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bg}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
