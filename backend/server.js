const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Finance Tracker API is running' });
});

// API endpoint for monthly data
app.get('/api/monthly-data/:monthIndex', (req, res) => {
  const monthIndex = parseInt(req.params.monthIndex) || 0;
  const monthlyData = [
    { // January
      balance: '₹3,45,680.50',
      balanceChange: '+2.5%',
      balanceDirection: 'positive',
      incomeGoal: { current: 42500, target: 50000 },
      notifications: [
        { title: 'Electricity Bill', due: 'Due in 3 days', amount: '₹2,450', icon: 'fa-bolt' },
        { title: 'Internet Bill', due: 'Due in 5 days', amount: '₹1,200', icon: 'fa-wifi' },
        { title: 'Mobile Recharge', due: 'Due in 7 days', amount: '₹599', icon: 'fa-mobile-alt' }
      ],
      incomeSources: [
        { name: 'Salary', amount: '₹35,000', iconClass: 'salary', icon: 'fa-briefcase' },
        { name: 'Freelance', amount: '₹7,500', iconClass: 'freelance', icon: 'fa-laptop' },
        { name: 'Investment', amount: '₹5,000', iconClass: 'investment', icon: 'fa-piggy-bank' }
      ],
      spendingCategories: [
        { name: 'Housing', amount: '₹12,000', categoryClass: 'housing', icon: 'fa-home' },
        { name: 'Personal', amount: '₹8,500', categoryClass: 'personal', icon: 'fa-user' },
        { name: 'Transportation', amount: '₹5,200', categoryClass: 'transportation', icon: 'fa-car' }
      ]
    },
    { // February
      balance: '₹3,78,920.75',
      balanceChange: '+3.2%',
      balanceDirection: 'positive',
      incomeGoal: { current: 48000, target: 50000 },
      notifications: [
        { title: 'Credit Card', due: 'Due in 2 days', amount: '₹5,400', icon: 'fa-credit-card' },
        { title: 'Water Bill', due: 'Due in 4 days', amount: '₹850', icon: 'fa-tint' }
      ],
      incomeSources: [
        { name: 'Salary', amount: '₹38,000', iconClass: 'salary', icon: 'fa-briefcase' },
        { name: 'Freelance', amount: '₹8,000', iconClass: 'freelance', icon: 'fa-laptop' },
        { name: 'Investment', amount: '₹2,000', iconClass: 'investment', icon: 'fa-piggy-bank' }
      ],
      spendingCategories: [
        { name: 'Housing', amount: '₹12,000', categoryClass: 'housing', icon: 'fa-home' },
        { name: 'Personal', amount: '₹9,200', categoryClass: 'personal', icon: 'fa-user' },
        { name: 'Transportation', amount: '₹5,800', categoryClass: 'transportation', icon: 'fa-car' }
      ]
    },
    { // March
      balance: '₹3,56,420.30',
      balanceChange: '-1.2%',
      balanceDirection: 'negative',
      incomeGoal: { current: 36000, target: 50000 },
      notifications: [
        { title: 'Insurance Premium', due: 'Due in 5 days', amount: '₹8,500', icon: 'fa-shield-alt' },
        { title: 'Internet Bill', due: 'Due in 7 days', amount: '₹1,200', icon: 'fa-wifi' }
      ],
      incomeSources: [
        { name: 'Salary', amount: '₹36,000', iconClass: 'salary', icon: 'fa-briefcase' },
        { name: 'Freelance', amount: '₹0', iconClass: 'freelance', icon: 'fa-laptop' },
        { name: 'Investment', amount: '₹0', iconClass: 'investment', icon: 'fa-piggy-bank' }
      ],
      spendingCategories: [
        { name: 'Housing', amount: '₹12,000', categoryClass: 'housing', icon: 'fa-home' },
        { name: 'Personal', amount: '₹10,500', categoryClass: 'personal', icon: 'fa-user' },
        { name: 'Transportation', amount: '₹6,200', categoryClass: 'transportation', icon: 'fa-car' }
      ]
    },
    { // April
      balance: '₹4,12,350.80',
      balanceChange: '+5.8%',
      balanceDirection: 'positive',
      incomeGoal: { current: 50000, target: 50000 },
      notifications: [
        { title: 'Electricity Bill', due: 'Due in 3 days', amount: '₹2,750', icon: 'fa-bolt' },
        { title: 'Mobile Recharge', due: 'Due in 5 days', amount: '₹599', icon: 'fa-mobile-alt' }
      ],
      incomeSources: [
        { name: 'Salary', amount: '₹40,000', iconClass: 'salary', icon: 'fa-briefcase' },
        { name: 'Freelance', amount: '₹8,000', iconClass: 'freelance', icon: 'fa-laptop' },
        { name: 'Investment', amount: '₹2,000', iconClass: 'investment', icon: 'fa-piggy-bank' }
      ],
      spendingCategories: [
        { name: 'Housing', amount: '₹12,000', categoryClass: 'housing', icon: 'fa-home' },
        { name: 'Personal', amount: '₹7,500', categoryClass: 'personal', icon: 'fa-user' },
        { name: 'Transportation', amount: '₹4,500', categoryClass: 'transportation', icon: 'fa-car' }
      ]
    },
    { // May
      balance: '₹4,38,760.45',
      balanceChange: '+3.1%',
      balanceDirection: 'positive',
      incomeGoal: { current: 52000, target: 50000 },
      notifications: [
        { title: 'Credit Card', due: 'Due in 2 days', amount: '₹6,200', icon: 'fa-credit-card' },
        { title: 'Water Bill', due: 'Due in 6 days', amount: '₹850', icon: 'fa-tint' }
      ],
      incomeSources: [
        { name: 'Salary', amount: '₹42,000', iconClass: 'salary', icon: 'fa-briefcase' },
        { name: 'Freelance', amount: '₹8,000', iconClass: 'freelance', icon: 'fa-laptop' },
        { name: 'Investment', amount: '₹2,000', iconClass: 'investment', icon: 'fa-piggy-bank' }
      ],
      spendingCategories: [
        { name: 'Housing', amount: '₹12,000', categoryClass: 'housing', icon: 'fa-home' },
        { name: 'Personal', amount: '₹9,000', categoryClass: 'personal', icon: 'fa-user' },
        { name: 'Transportation', amount: '₹5,000', categoryClass: 'transportation', icon: 'fa-car' }
      ]
    },
    { // June
      balance: '₹4,65,890.20',
      balanceChange: '+2.8%',
      balanceDirection: 'positive',
      incomeGoal: { current: 42500, target: 50000 },
      notifications: [
        { title: 'Electricity Bill', due: 'Due in 3 days', amount: '₹2,950', icon: 'fa-bolt' },
        { title: 'Internet Bill', due: 'Due in 5 days', amount: '₹1,200', icon: 'fa-wifi' },
        { title: 'Mobile Recharge', due: 'Due in 7 days', amount: '₹599', icon: 'fa-mobile-alt' }
      ],
      incomeSources: [
        { name: 'Salary', amount: '₹35,000', iconClass: 'salary', icon: 'fa-briefcase' },
        { name: 'Freelance', amount: '₹7,500', iconClass: 'freelance', icon: 'fa-laptop' },
        { name: 'Investment', amount: '₹0', iconClass: 'investment', icon: 'fa-piggy-bank' }
      ],
      spendingCategories: [
        { name: 'Housing', amount: '₹12,000', categoryClass: 'housing', icon: 'fa-home' },
        { name: 'Personal', amount: '₹8,500', categoryClass: 'personal', icon: 'fa-user' },
        { name: 'Transportation', amount: '₹5,200', categoryClass: 'transportation', icon: 'fa-car' }
      ]
    }
  ];

  const selectedMonthData = monthlyData[monthIndex] || monthlyData[0];
  res.json(selectedMonthData);
});

// API endpoint for chart data
app.get('/api/chart-data/:monthIndex', (req, res) => {
  const monthIndex = parseInt(req.params.monthIndex) || 0;
  const chartData = [
    { // January
      income: [35000, 38000, 36000, 40000, 42000, 42500],
      expenses: [25000, 26000, 28000, 24000, 27000, 26000]
    },
    { // February
      income: [38000, 39000, 40000, 41000, 42000, 48000],
      expenses: [26000, 27000, 25000, 28000, 26000, 27000]
    },
    { // March
      income: [36000, 37000, 35000, 38000, 36000, 36000],
      expenses: [28000, 29000, 30000, 27000, 28000, 29000]
    },
    { // April
      income: [40000, 41000, 42000, 43000, 44000, 50000],
      expenses: [24000, 23000, 25000, 26000, 24000, 25000]
    },
    { // May
      income: [42000, 43000, 44000, 45000, 46000, 52000],
      expenses: [27000, 26000, 28000, 29000, 27000, 28000]
    },
    { // June
      income: [42500, 43000, 42000, 44000, 43000, 42500],
      expenses: [26000, 27000, 25000, 28000, 26000, 27000]
    }
  ];

  const selectedChartData = chartData[monthIndex] || chartData[0];
  res.json(selectedChartData);
});

// Serve frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
