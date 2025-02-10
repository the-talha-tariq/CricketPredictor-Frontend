import React, { useEffect, useState } from "react";
import axios from "axios";

const Teams = () => {
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch rankings from the API
  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/ranking/");
        const sortedRanking = response.data.sort((a, b) => a.pos - b.pos);
        setRankings(sortedRanking);
        console.log(response.data)
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch rankings.");
        setLoading(false);
      }
    };

    fetchRankings();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Team Rankings</h1>
      {loading ? (
        <p>Loading rankings...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse border border-gray-300 w-full text-left">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Position</th>
                <th className="border border-gray-300 px-4 py-2">Team</th>
                <th className="border border-gray-300 px-4 py-2">Played</th>
                <th className="border border-gray-300 px-4 py-2">Won</th>
                <th className="border border-gray-300 px-4 py-2">Lost</th>
                <th className="border border-gray-300 px-4 py-2">Drawn</th>
                <th className="border border-gray-300 px-4 py-2">Points</th>
                <th className="border border-gray-300 px-4 py-2">PCT (%)</th>
                <th className="border border-gray-300 px-4 py-2">Matches Left</th>
              </tr>
            </thead>
            <tbody>
              {rankings.map((team) => (
                <tr key={team._id}>
                  <td className="border border-gray-300 px-4 py-2">{team.pos}</td>
                  <td className="border border-gray-300 px-4 py-2">{team.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{team.played}</td>
                  <td className="border border-gray-300 px-4 py-2">{team.won}</td>
                  <td className="border border-gray-300 px-4 py-2">{team.lost}</td>
                  <td className="border border-gray-300 px-4 py-2">{team.drawn}</td>
                  <td className="border border-gray-300 px-4 py-2">{team.points}</td>
                  <td className="border border-gray-300 px-4 py-2">{team.percentagePoints}</td>
                  <td className="border border-gray-300 px-4 py-2">{team.matchesLeft}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Teams;
