import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "Page 1",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page 2",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page 3",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page 4",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page 5",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page 6",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page 7",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function Overtime() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="pv"
          fill="#8884d8"
          activeBar={<Rectangle fill="pink" stroke="blue" />}
        />
        <Bar
          dataKey="uv"
          fill="#82ca9d"
          activeBar={<Rectangle fill="gold" stroke="purple" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
