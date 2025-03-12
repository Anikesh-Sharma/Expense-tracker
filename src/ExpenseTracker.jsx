import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ShoppingCart, Bus, Home, Coffee, Film, Plus, MoreHorizontal } from 'lucide-react';

const ExpenseTracker = () => {
  // Sample data for the chart
  const chartData = Array.from({ length: 25 }, (_, i) => ({
    date: i + 1,
    amount: Math.floor(Math.random() * 100000) + 50000,
    highlighted: i === 20, // Highlight one bar (the blue one)
  }));

  // Categories with their totals
  const categories = [
    { name: 'Food and Drinks', amount: 872400, progress: 60 },
    { name: 'Shopping', amount: 1378200, progress: 80 },
    { name: 'Housing', amount: 928500, progress: 65 },
    { name: 'Transportation', amount: 420700, progress: 40 },
    { name: 'Vehicle', amount: 520000, progress: 50 },
  ];

  // Today's transactions
  const todayTransactions = [
    { 
      id: 1, 
      category: 'Grocery', 
      time: '5:12 pm', 
      description: 'Belanja di pasar', 
      amount: -326800,
      icon: <ShoppingCart className="text-white" size={20} />,
      color: 'bg-blue-400'
    },
    { 
      id: 2, 
      category: 'Transportation', 
      time: '5:12 pm', 
      description: 'Naik bus umum', 
      amount: -15000,
      icon: <Bus className="text-white" size={20} />,
      color: 'bg-purple-500'
    },
    { 
      id: 3, 
      category: 'Housing', 
      time: '5:12 pm', 
      description: 'Bayar listrik', 
      amount: -185750,
      icon: <Home className="text-white" size={20} />,
      color: 'bg-orange-500'
    },
  ];

  // Monday's transactions
  const mondayTransactions = [
    { 
      id: 4, 
      category: 'Food and Drink', 
      time: '5:12 pm', 
      description: 'Makan Steak', 
      amount: -156000,
      icon: <Coffee className="text-white" size={20} />,
      color: 'bg-red-500'
    },
    { 
      id: 5, 
      category: 'Entertainment', 
      time: '5:12 pm', 
      description: 'Nonton Bioskop', 
      amount: -35200,
      icon: <Film className="text-white" size={20} />,
      color: 'bg-green-500'
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - reduced width to 25% with centered content */}
      <div className="w-1/4 bg-black text-white py-12 px-8">
        <div className="flex flex-col items-center mb-12">
          <div className="relative mb-3">
            <img
              src="/api/placeholder/60/60"
              alt="Profile"
              className="w-12 h-12 rounded-lg"
            />
            <div className="absolute -top-1 -right-1 bg-red-500 w-5 h-5 rounded-full flex items-center justify-center text-xs">
              4
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold">Samantha</h2>
            <p className="text-sm text-gray-400">samantha@email.com</p>
          </div>
        </div>

        <nav className="flex flex-col items-center space-y-8">
          <div className="text-gray-500 hover:text-white cursor-pointer text-lg">Dashboard</div>
          <div className="text-white font-bold cursor-pointer text-lg">Expenses</div>
          <div className="text-gray-500 hover:text-white cursor-pointer text-lg">Wallets</div>
          <div className="text-gray-500 hover:text-white cursor-pointer text-lg">Summary</div>
          <div className="text-gray-500 hover:text-white cursor-pointer text-lg">Accounts</div>
          <div className="text-gray-500 hover:text-white cursor-pointer text-lg">Settings</div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column - Chart & Transactions */}
          <div className="w-full lg:w-2/3">
            <div className="max-w-2xl">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">Expenses</h1>
                <div className="flex items-center space-x-2">
                  <img src="/api/placeholder/32/32" alt="User 1" className="w-8 h-8 rounded-full" />
                  <img src="/api/placeholder/32/32" alt="User 2" className="w-8 h-8 rounded-full" />
                  <img src="/api/placeholder/32/32" alt="User 3" className="w-8 h-8 rounded-full" />
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <Plus size={16} className="text-gray-500" />
                  </div>
                </div>
              </div>

              <p className="text-gray-500 mb-6">01 - 25 March, 2020</p>

              {/* Chart - reduced height */}
              <div className="mb-6 h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="date" hide />
                    <YAxis hide />
                    <Bar 
                      dataKey="amount" 
                      fill={(entry) => entry.highlighted ? '#3b82f6' : '#dbeafe'} 
                      radius={[4, 4, 4, 4]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Transactions */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Today</h2>
                <MoreHorizontal className="text-gray-400" />
              </div>

              <div className="space-y-4 mb-8">
                {todayTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center">
                    <div className={`${transaction.color} w-10 h-10 rounded-full flex items-center justify-center mr-4`}>
                      {transaction.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{transaction.category}</h3>
                        <span className="font-medium">{transaction.amount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>{transaction.time} • {transaction.description}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Monday, 23 March 2020</h2>
                <MoreHorizontal className="text-gray-400" />
              </div>

              <div className="space-y-4">
                {mondayTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center">
                    <div className={`${transaction.color} w-10 h-10 rounded-full flex items-center justify-center mr-4`}>
                      {transaction.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{transaction.category}</h3>
                        <span className="font-medium">{transaction.amount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>{transaction.time} • {transaction.description}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Categories with light gray background */}
          <div className="w-full lg:w-1/3">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-lg font-medium mb-4">Where your money go?</h2>
              
              <div className="space-y-6">
                {categories.map((category, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{category.name}</span>
                      <span>{category.amount.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-teal-400 h-2 rounded-full" 
                        style={{ width: `${category.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg relative mt-6">
              <div className="flex mb-4">
                <div className="w-16 h-16 bg-blue-100 border-b-4 border-blue-400"></div>
                <div className="w-16 h-16 bg-orange-400 border-b-4 border-orange-500"></div>
              </div>
              
              <h3 className="text-lg font-medium mb-1">Save more money</h3>
              <p className="text-sm text-gray-500 mb-6">eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.</p>
              
              <button className="bg-black text-white w-full py-3 rounded-lg font-medium">
                VIEW TIPS
              </button>
              
              <div className="absolute right-6 top-6">
                <img 
                  src="/api/placeholder/80/80" 
                  alt="Plant decoration" 
                  className="opacity-50"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;