import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Member, SAVINGS_TIERS, SavingsTier } from "@/types/savings";
import { toast } from "sonner";
import { Coins } from "lucide-react";

interface RegistrationFormProps {
  onRegister: (member: Member) => void;
  currentWeek: number;
}

export function RegistrationForm({ onRegister, currentWeek }: RegistrationFormProps) {
  const [name, setName] = useState("");
  const [selectedTier, setSelectedTier] = useState<SavingsTier | null>(null);
  const [amount, setAmount] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (!selectedTier) {
      toast.error("Please select a savings tier");
      return;
    }

    const enteredAmount = parseFloat(amount);
    if (isNaN(enteredAmount) || enteredAmount !== selectedTier.amount) {
      toast.error(`Please enter exactly ₦${selectedTier.amount.toLocaleString()} for ${selectedTier.name}`);
      return;
    }

    const newMember: Member = {
      id: Date.now().toString(),
      name: name.trim(),
      tier: selectedTier,
      joinedWeek: currentWeek,
      totalContribution: selectedTier.amount,
      accumulatedInterest: (selectedTier.amount * selectedTier.interestRate) / 100,
    };

    onRegister(newMember);
    toast.success(`Welcome ${name}! You've joined ${selectedTier.name}`);
    
    // Reset form
    setName("");
    setSelectedTier(null);
    setAmount("");
  };

  const weeklyInterest = selectedTier
    ? (selectedTier.amount * selectedTier.interestRate) / 100
    : 0;
  const totalWithdrawal = selectedTier
    ? selectedTier.amount + weeklyInterest
    : 0;

  return (
    <Card className="shadow-card animate-fade-in">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gradient-primary">
            <Coins className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <CardTitle>Join Savings Group</CardTitle>
            <CardDescription>Register to start saving and earning interest</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="transition-all duration-200 focus:shadow-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tier">Savings Tier</Label>
            <Select
              value={selectedTier?.id.toString()}
              onValueChange={(value) => {
                const tier = SAVINGS_TIERS.find((t) => t.id.toString() === value);
                setSelectedTier(tier || null);
                setAmount("");
              }}
            >
              <SelectTrigger id="tier" className="transition-all duration-200">
                <SelectValue placeholder="Select a tier" />
              </SelectTrigger>
              <SelectContent>
                {SAVINGS_TIERS.map((tier) => (
                  <SelectItem key={tier.id} value={tier.id.toString()}>
                    <div className="flex items-center justify-between w-full">
                      <span>{tier.name}</span>
                      <span className="ml-4 text-muted-foreground">
                        ₦{tier.amount.toLocaleString()} • {tier.interestRate}% interest
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Savings Amount (₦)</Label>
            <Input
              id="amount"
              type="number"
              placeholder={selectedTier ? `Enter ${selectedTier.amount.toLocaleString()}` : "Select tier first"}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={!selectedTier}
              className="transition-all duration-200 focus:shadow-sm"
            />
            {selectedTier && (
              <p className="text-sm text-muted-foreground">
                Required amount: ₦{selectedTier.amount.toLocaleString()}
              </p>
            )}
          </div>

          {selectedTier && (
            <div className="p-4 rounded-lg bg-secondary space-y-2 animate-scale-in">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Weekly Interest:</span>
                <span className="font-semibold text-success">
                  +₦{weeklyInterest.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Withdrawal (Week 1):</span>
                <span className="font-bold text-foreground">
                  ₦{totalWithdrawal.toLocaleString()}
                </span>
              </div>
            </div>
          )}

          <Button type="submit" className="w-full" size="lg">
            Join Group
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
