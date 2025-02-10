import React, { useEffect, useState } from "react";
import axios from "axios";

const AllMatches = () => {
  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("")
  const [pendingOnly, setPendingOnly] = useState(false)
  const [selectedTeam, setSelectedTeam] = useState("")


  // Fetch matches data from the API
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/matches");
        setMatches(response.data); // Set the fetched matches data
        setLoading(false); // Disable loading
      } catch (err) {
        setError("Failed to fetch matches.");
        setLoading(false); // Disable loading
      }
    };

    fetchMatches();
  }, []);

  useEffect(()=>{
    let filtered = matches;

    if(searchQuery)
    {
      filtered = filtered.filter(
        (match) =>
          match.teamA.toLowerCase().includes(searchQuery.toLowerCase()) ||
          match.teamB.toLowerCase().includes(searchQuery.toLowerCase()) ||
          match.result.toLowerCase().includes(searchQuery.toLowerCase()) ||
          match.date.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if(pendingOnly)
    {
      filtered = filtered.filter(
        (match) => !match.result || match.result === "Pending"
      );
    }
    if(selectedTeam)
    {
      filtered = filtered.filter(
        (match) => match.teamA === selectedTeam || match.teamB === selectedTeam
      );
    }
    
    setFilteredMatches(filtered);

  },[searchQuery, pendingOnly, selectedTeam, matches])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Matches</h1>
      {loading ? (
        <p>Loading matches...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search by team or result..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/3"
            />

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={pendingOnly}
                onChange={(e) => setPendingOnly(e.target.checked)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span>Show Pending Matches Only</span>
            </label>

            <select
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/3"
            >
              <option value="">Filter by Team</option>
              {[
                ...new Set(
                  matches.flatMap((match) => [match.teamA, match.teamB])
                ),
              ].map((team) => (
                <option key={team} value={team}>
                  {team}
                </option>
              ))}
            </select>

        </div>
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse border border-gray-300 w-full text-left">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Date</th>
                <th className="border border-gray-300 px-4 py-2">Team A</th>
                <th className="border border-gray-300 px-4 py-2">Team B</th>
                <th className="border border-gray-300 px-4 py-2">Result</th>
              </tr>
            </thead>
            <tbody>
              {filteredMatches.map((match) => (
                <tr key={match._id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(match.date).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{match.teamA}</td>
                  <td className="border border-gray-300 px-4 py-2">{match.teamB}</td>
                  <td className="border border-gray-300 px-4 py-2">{match.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </>
      )}
    </div>
  );
};

export default AllMatches;
