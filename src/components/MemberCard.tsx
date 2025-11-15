import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Member } from "@/types/savings";
import { User, TrendingUp, Wallet, LogOut } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface MemberCardProps {
  member: Member;
  onWithdraw: (memberId: string) => void;
  currentWeek: number;
}

export function MemberCard({ member, onWithdraw, currentWeek }: MemberCardProps) {
  const weeksInGroup = currentWeek - member.joinedWeek + 1;
  const totalWithInterest = member.totalContribution + member.accumulatedInterest;

  return (
    <Card className="shadow-card hover:shadow-elevated transition-all duration-300 animate-fade-in">
      <CardContent className="p-5">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{member.name}</h3>
                <Badge variant="secondary" className="mt-1">
                  {member.tier.name}
                </Badge>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onWithdraw(member.id)}
              className="hover:bg-destructive hover:text-destructive-foreground transition-colors"
            >
              <LogOut className="h-4 w-4 mr-1" />
              Withdraw
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Wallet className="h-3 w-3" />
                <span>Contribution</span>
              </div>
              <p className="text-lg font-bold text-foreground">
                ₦{member.totalContribution.toLocaleString()}
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3" />
                <span>Interest Earned</span>
              </div>
              <p className="text-lg font-bold text-success">
                +₦{member.accumulatedInterest.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-border">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total Withdrawal</span>
              <span className="text-xl font-bold text-primary">
                ₦{totalWithInterest.toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {weeksInGroup} {weeksInGroup === 1 ? "week" : "weeks"} in group
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
