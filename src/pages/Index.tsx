import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RegistrationForm } from "@/components/RegistrationForm";
import { Dashboard } from "@/components/Dashboard";
import { MemberCard } from "@/components/MemberCard";
import { Member } from "@/types/savings";
import { toast } from "sonner";
import { Coins, Play, Info, Users } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Index = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [currentWeek, setCurrentWeek] = useState(1);

  // Load data from localStorage
  useEffect(() => {
    const savedMembers = localStorage.getItem("savingsMembers");
    const savedWeek = localStorage.getItem("currentWeek");
    
    if (savedMembers) {
      setMembers(JSON.parse(savedMembers));
    }
    if (savedWeek) {
      setCurrentWeek(parseInt(savedWeek));
    }
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem("savingsMembers", JSON.stringify(members));
    localStorage.setItem("currentWeek", currentWeek.toString());
  }, [members, currentWeek]);

  const handleRegister = (newMember: Member) => {
    setMembers([...members, newMember]);
  };

  const handleWithdraw = (memberId: string) => {
    const member = members.find((m) => m.id === memberId);
    if (!member) return;

    const totalWithdrawal = member.totalContribution + member.accumulatedInterest;
    
    setMembers(members.filter((m) => m.id !== memberId));
    toast.success(
      `${member.name} withdrew ₦${totalWithdrawal.toLocaleString()}. A new member can now join!`
    );
  };

  const handleAdvanceWeek = () => {
    const updatedMembers = members.map((member) => {
      const weeklyInterest = (member.tier.amount * member.tier.interestRate) / 100;
      return {
        ...member,
        accumulatedInterest: member.accumulatedInterest + weeklyInterest,
      };
    });

    setMembers(updatedMembers);
    setCurrentWeek(currentWeek + 1);
    toast.success(`Advanced to Week ${currentWeek + 1}! Interest updated for all members.`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 animate-fade-in">
              <div className="p-2 rounded-lg bg-gradient-primary">
                <Coins className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">SaveTogether</h1>
                <p className="text-sm text-muted-foreground">Community Savings Group</p>
              </div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Info className="h-4 w-4 mr-2" />
                  How it Works
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>How SaveTogether Works</DialogTitle>
                  <DialogDescription className="space-y-3 pt-4">
                    <p>
                      <strong>1. Join a Tier:</strong> Choose from three savings tiers based on your budget.
                      Each tier has different contribution amounts and interest rates.
                    </p>
                    <p>
                      <strong>2. Save Weekly:</strong> Your initial contribution earns interest every week.
                      Watch your savings grow automatically!
                    </p>
                    <p>
                      <strong>3. Track Progress:</strong> View the dashboard to see total group savings,
                      your contributions, and accumulated interest.
                    </p>
                    <p>
                      <strong>4. Withdraw Anytime:</strong> When ready, withdraw your savings plus interest.
                      This opens up a spot for a new member to join.
                    </p>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Dashboard Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-foreground">Dashboard</h2>
              <p className="text-muted-foreground">Overview of group savings and performance</p>
            </div>
            <Button
              onClick={handleAdvanceWeek}
              size="lg"
              className="shadow-lg hover:shadow-xl transition-all"
              disabled={members.length === 0}
            >
              <Play className="h-5 w-5 mr-2" />
              Advance to Week {currentWeek + 1}
            </Button>
          </div>
          <Dashboard members={members} currentWeek={currentWeek} />
        </section>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Registration Form */}
          <div className="lg:col-span-1">
            <RegistrationForm onRegister={handleRegister} currentWeek={currentWeek} />
          </div>

          {/* Members List */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Active Members</h2>
                <p className="text-muted-foreground">
                  {members.length === 0
                    ? "No members yet. Be the first to join!"
                    : `${members.length} ${members.length === 1 ? "member" : "members"} currently saving`}
                </p>
              </div>

              {members.length === 0 ? (
                <div className="flex items-center justify-center h-64 rounded-lg border-2 border-dashed border-border animate-fade-in">
                  <div className="text-center">
                    <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No members in the group yet</p>
                  </div>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {members.map((member) => (
                    <MemberCard
                      key={member.id}
                      member={member}
                      onWithdraw={handleWithdraw}
                      currentWeek={currentWeek}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>SaveTogether - Building financial futures together</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
