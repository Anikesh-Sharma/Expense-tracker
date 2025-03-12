import React, { useState, useEffect } from 'react';
import { ShoppingCart, Bus, Home, Coffee, Film, Plus, MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ExpenseTracker = () => {
  const navigate = useNavigate();
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await fetch('https://pokeapi.co/api/v2/pokemon/ditto');
        if (!res.ok) throw new Error('Failed to fetch data');
        setPokemonData(await res.json());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Custom bar chart data generation
  const generateChartData = () => {
    // Create an array of 20 bar values with varying heights
    return Array.from({ length: 20 }, (_, i) => ({
      value: Math.floor(Math.random() * 60) + 20, // Random heights between 20-80%
      highlighted: i === 18, // Highlight the 19th bar (index 18)
    }));
  };

  const generateCategories = () => {
    if (!pokemonData?.abilities)
      return [
        { name: 'Food and Drinks', amount: 872400, progress: 60 },
        { name: 'Shopping', amount: 1378200, progress: 80 },
        { name: 'Housing', amount: 928500, progress: 65 },
        { name: 'Transportation', amount: 420700, progress: 40 },
        { name: 'Vehicle', amount: 520000, progress: 50 },
      ];
    const categories = pokemonData.abilities.map((ab, i) => ({
      name: ab.ability.name.charAt(0).toUpperCase() + ab.ability.name.slice(1),
      amount: 500000 + i * 200000,
      progress: 40 + i * 30,
    }));
    if (pokemonData.forms?.length)
      categories.push({
        name: pokemonData.forms[0].name.charAt(0).toUpperCase() + pokemonData.forms[0].name.slice(1),
        amount: 800000,
        progress: 75,
      });
    if (pokemonData.stats)
      pokemonData.stats.slice(0, 3).forEach(stat =>
        categories.push({
          name: stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1).replace('-', ' '),
          amount: 400000 + stat.base_stat * 10000,
          progress: 30 + stat.base_stat,
        })
      );
    return categories.slice(0, 5);
  };

  const generateTransactions = (count, offset = 0) => {
    if (!pokemonData?.game_indices)
      return [
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
      ];
    const icons = [
      { icon: <ShoppingCart className="text-white" size={20} />, color: 'bg-blue-400' },
      { icon: <Bus className="text-white" size={20} />, color: 'bg-purple-500' },
      { icon: <Home className="text-white" size={20} />, color: 'bg-orange-500' },
      { icon: <Coffee className="text-white" size={20} />, color: 'bg-red-500' },
      { icon: <Film className="text-white" size={20} />, color: 'bg-green-500' },
    ];
    return Array.from({ length: count }, (_, i) => {
      const idx = i + offset;
      const gameData = pokemonData.game_indices[idx];
      const iconInfo = icons[i % icons.length];
      return {
        id: idx + 1,
        category: gameData.version.name.charAt(0).toUpperCase() + gameData.version.name.slice(1).replace('-', ' '),
        time: `${Math.floor(Math.random() * 12) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')} ${Math.random() > 0.5 ? 'am' : 'pm'}`,
        description: `Game Index: ${gameData.game_index}`,
        amount: -gameData.game_index * 1000,
        icon: iconInfo.icon,
        color: iconInfo.color,
      };
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="text-xl font-medium">Loading expense data...</div>
      </div>
    );
  if (error)
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="text-xl font-medium text-red-500">Error: {error}</div>
      </div>
    );

  const chartData = generateChartData();
  const categories = generateCategories();
  const todayTransactions = generateTransactions(3, 0);
  const mondayTransactions = generateTransactions(2, 3);

  // Custom Bar Chart Component
  const CustomBarChart = ({ data }) => (
    <div className="w-full h-44 flex items-end space-x-1">
      {data.map((item, index) => (
        <div
          key={index}
          className={`flex-1 ${item.highlighted ? 'bg-blue-600' : 'bg-blue-100'} rounded-t`}
          style={{ height: `${item.value}%` }}
        />
      ))}
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-1/4 bg-black text-white py-8 px-8">
        <div className="flex flex-col items-center mb-16">
          <div className="relative mb-4">
            <img
              src={pokemonData?.sprites?.front_default || "/api/placeholder/60/60"}
              alt="Profile"
              className="w-14 h-14 rounded-lg bg-white"
            />
            <div className="absolute -top-1 -right-1 bg-red-500 w-5 h-5 rounded-full flex items-center justify-center text-xs">
              {pokemonData?.id || 4}
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-1">
              {pokemonData ? pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1) : 'Samantha'}
            </h2>
            <p className="text-sm text-gray-400">
              {pokemonData ? `#${pokemonData.id} • ${pokemonData.weight/10}kg` : 'samantha@email.com'}
            </p>
            <button onClick={handleLogout} className="mt-2 text-sm text-gray-400 hover:text-white">
              Log out
            </button>
          </div>
        </div>
        <nav className="flex flex-col space-y-8">
          {['Dashboard', 'Expenses', 'Wallets', 'Summary', 'Accounts', 'Settings'].map((item, i) => (
            <div key={i} className={`${i === 1 ? 'text-white font-bold' : 'text-gray-500 hover:text-white'} cursor-pointer text-lg`}>
              {item}
            </div>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-10 overflow-y-auto">
        <div className="flex flex-col lg:flex-row gap-10">
          <section className="w-full lg:w-2/3">
            <div className="max-w-3xl">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-4xl font-bold text-gray-800">Expenses</h1>
                <div className="flex items-center space-x-2">
                  {pokemonData?.sprites ? (
                    <>
                      <img src={pokemonData.sprites.front_default} alt="User 1" className="w-9 h-9 rounded-full bg-gray-200" />
                      <img src={pokemonData.sprites.back_default} alt="User 2" className="w-9 h-9 rounded-full bg-gray-200" />
                      <img src={pokemonData.sprites.front_shiny} alt="User 3" className="w-9 h-9 rounded-full bg-gray-200" />
                    </>
                  ) : (
                    <>
                      <img src="/api/placeholder/36/36" alt="User 1" className="w-9 h-9 rounded-full" />
                      <img src="/api/placeholder/36/36" alt="User 2" className="w-9 h-9 rounded-full" />
                      <img src="/api/placeholder/36/36" alt="User 3" className="w-9 h-9 rounded-full" />
                    </>
                  )}
                  <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center">
                    <Plus size={18} className="text-gray-500" />
                  </div>
                </div>
              </div>
              <p className="text-gray-500 mb-8">
                {pokemonData ? `Base Experience: ${pokemonData.base_experience} • Height: ${pokemonData.height/10}m` : '01 - 25 March, 2020'}
              </p>
              <div className="mb-10">
                {/* Replace Recharts with our custom bar chart */}
                <CustomBarChart data={chartData} />
              </div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-800">Today</h2>
                <MoreHorizontal className="text-gray-400" />
              </div>
              <div className="space-y-6 mb-10">
                {todayTransactions.map(tx => (
                  <div key={tx.id} className="flex items-center">
                    <div className={`${tx.color} w-12 h-12 rounded-full flex items-center justify-center mr-5`}>{tx.icon}</div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{tx.category}</h3>
                        <span className="font-medium">{tx.amount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-500 mt-1">
                        <span>{tx.time} • {tx.description}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-800">Monday, 23 March 2020</h2>
                <MoreHorizontal className="text-gray-400" />
              </div>
              <div className="space-y-6">
                {mondayTransactions.map(tx => (
                  <div key={tx.id} className="flex items-center">
                    <div className={`${tx.color} w-12 h-12 rounded-full flex items-center justify-center mr-5`}>{tx.icon}</div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{tx.category}</h3>
                        <span className="font-medium">{tx.amount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-500 mt-1">
                        <span>{tx.time} • {tx.description}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <aside className="w-full lg:w-1/3">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-6 text-gray-800">Where your money go?</h2>
              <div className="space-y-6">
                {categories.map((cat, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-700">{cat.name}</span>
                      <span className="font-medium">{cat.amount.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-teal-400 h-2 rounded-full" style={{ width: `${cat.progress}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl relative mt-6 shadow-sm overflow-hidden">
              <div className="flex mb-6">
                <div className="w-16 h-16 bg-blue-100 border-b-4 border-blue-400"></div>
                <div className="w-16 h-16 bg-orange-400 border-b-4 border-orange-500"></div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Pokémon Stats</h3>
              {pokemonData?.stats ? (
                <p className="text-sm text-gray-500 mb-6">
                  HP: {pokemonData.stats[0].base_stat} • Attack: {pokemonData.stats[1].base_stat} • Defense: {pokemonData.stats[2].base_stat}
                </p>
              ) : (
                <p className="text-sm text-gray-500 mb-6">
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.
                </p>
              )}
              <button className="bg-black text-white w-full py-3 rounded-lg font-medium">VIEW DETAILS</button>
              <div className="absolute right-2 bottom-2 opacity-40">
                <img src={pokemonData?.sprites?.front_default || "/api/placeholder/100/100"} alt="Pokémon" className="w-24 h-24" />
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default ExpenseTracker;