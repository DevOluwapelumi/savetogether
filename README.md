# SaveTogether - A Community Savings Group Web Application.

A beautiful, modern web application for managing community savings groups with tier-based contributions and weekly interest calculations.

![SaveTogether](https://img.shields.io/badge/Built%20with-React%20%2B%20TypeScript-blue)
![Tailwind CSS](https://img.shields.io/badge/Styled%20with-Tailwind%20CSS-38B2AC)

## 🌟 Features

### Core Functionality:
- **Student/Member Registration**: Users can register with their name and choose from three savings tiers
- **Tier-Based Savings**: Three tiers with different contribution amounts and interest rates:
  - Tier 1: ₦10,000 (5% weekly interest)
  - Tier 2: ₦20,000 (7% weekly interest)
  - Tier 3: ₦30,000 (10% weekly interest)
- **Real-Time Dashboard**: Displays total savings, member count, accumulated interest, and current week
- **Weekly Progress**: Simulate weekly advancement with automatic interest calculation
- **Withdrawal System**: Members can withdraw their savings plus interest, freeing up spots for new members
- **Input Validation**: Ensures correct tier amounts are entered and validates all user inputs
- **Data Persistence**: Uses localStorage to save all data between sessions

### User Experience:
- **Modern UI**: Clean, professional design with emerald/teal color scheme
- **Smooth Animations**: All elements feature smooth transitions and animations
- **Responsive Design**: Fully responsive layout that works on mobile, tablet, and desktop
- **Interactive Cards**: Member cards with hover effects and detailed information
- **Toast Notifications**: Real-time feedback for all user actions
- **Help Dialog**: Built-in tutorial explaining how the app works

## 🚀 Getting Started

### Prerequisites:
- Node.js 16+ and npm installed ([install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating))

### Installation:

1. Clone the repository:
```bash
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

## 📖 How to Use

### For New Users:

1. **Join the Group**
   - Enter your full name in the registration form
   - Select a savings tier (Tier 1, 2, or 3)
   - Enter the exact amount for your chosen tier
   - Click "Join Group" to register
   - You'll see your weekly interest and total withdrawal amount

2. **View Dashboard**
   - See total group savings at the top
   - View statistics including member count, total savings, and interest
   - Check the current week number

3. **Track Your Savings**
   - Your member card shows your contribution, interest earned, and total withdrawal
   - See how many weeks you've been in the group
   - Your interest updates automatically each week

4. **Advance Weeks**
   - Click "Advance to Week X" to simulate weekly progress
   - Interest is calculated and added for all members
   - Watch your savings grow!

5. **Withdraw Funds**
   - Click the "Withdraw" button on your member card
   - You'll receive your contribution plus all accumulated interest
   - Your spot opens up for a new member to join

### Understanding the Tiers

| Tier | Contribution | Interest Rate | Week 1 Interest | Week 1 Total |
|------|-------------|---------------|-----------------|--------------|
| Tier 1 | ₦10,000 | 5% | ₦500 | ₦10,500 |
| Tier 2 | ₦20,000 | 7% | ₦1,400 | ₦21,400 |
| Tier 3 | ₦30,000 | 10% | ₦3,000 | ₦33,000 |

*Interest compounds weekly on the original contribution amount.*

## 🛠️ Technology Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe code
- **Tailwind CSS** - Utility-first styling
- **Shadcn UI** - High-quality component library
- **Vite** - Fast build tool and dev server
- **Sonner** - Beautiful toast notifications
- **Lucide React** - Modern icon library

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components (Shadcn)
│   ├── Dashboard.tsx    # Statistics and overview
│   ├── MemberCard.tsx   # Individual member display
│   └── RegistrationForm.tsx  # New member registration
├── types/
│   └── savings.ts       # TypeScript type definitions
├── pages/
│   └── Index.tsx        # Main application page
├── index.css            # Design system and global styles
└── App.tsx              # Application root
```

## 🎨 Design System

The application uses a comprehensive design system with:
- **Color Palette**: Emerald green primary, teal accents, semantic color tokens
- **Gradients**: Professional linear gradients for important elements
- **Shadows**: Layered shadow system for depth
- **Animations**: Smooth fade, scale, and slide animations
- **Typography**: Clear hierarchy with proper font weights
- **Spacing**: Consistent spacing throughout

## 💾 Data Persistence

All data is automatically saved to browser localStorage:
- Member list with all details
- Current week number
- Accumulated interest for each member

Data persists between sessions and browser refreshes.

## 🔒 Input Validation

The app validates:
- Non-empty name fields
- Tier selection before amount entry
- Exact tier amount matching
- Numeric inputs for amounts

## 🎯 Future Enhancements

Potential features for future versions:
- User authentication and multi-group support
- Export data to CSV/PDF
- Email notifications for weekly updates
- Payment integration for real money transfers
- Admin dashboard for group management
- Historical data and analytics charts
- Mobile app version

## 🤝 Contributing

This is an educational project. Feel free to:
1. Fork the repository
2. Create a feature branch
3. Make your improvements
4. Submit a pull request

## 📝 License

This project is open source and available for educational purposes.

## 🙋 Support

For questions or issues:
1. Check the "How it Works" dialog in the app
2. Review this README
3. Check the code comments
4. Open an issue in the repository

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Shadcn UI](https://ui.shadcn.com/)

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
