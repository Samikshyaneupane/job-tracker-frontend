import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const STATUS_COLORS = {
  Applied: "#a8bce0",
  OA: "#a0cfe0",
  Interview: "#f0cf7a",
  Offer: "#8fd0a8",
  Rejected: "#f0a8ba",
};

const StatusChart = ({ stats }) => {
  const data = stats.map((s) => ({ status: s._id, count: s.count }));

  if (data.length === 0) {
    return <p className="empty-state">No applications yet — add one to see your stats.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data}>
        <XAxis dataKey="status" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="count" radius={[4, 4, 0, 0]}>
          {data.map((entry, index) => (
            <Cell key={index} fill={STATUS_COLORS[entry.status] || "#6b7280"} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StatusChart;
