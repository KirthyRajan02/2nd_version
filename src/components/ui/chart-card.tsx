import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, XAxis, YAxis, Tooltip } from "recharts";

interface ChartData {
  [key: string]: string | number;  // Allows for dynamic key-value pairs
}

interface ChartCardProps {
  title: string;
  chart: "line" | "bar" | "area" | "pie";
  data: ChartData[];
  layout?: "vertical" | "horizontal";
  margin?: { top: number; right: number; bottom: number; left: number };
}

export function ChartCard({ title, chart, data, layout = "horizontal", margin }: ChartCardProps) {
  if (!data || data.length === 0) {
    return (
      <Card className="p-4 bg-[#082525] border-[#6D988B]">
        <h3 className="text-white mb-4">{title}</h3>
        <div className="h-[300px] flex items-center justify-center text-white">
          No data available
        </div>
      </Card>
    );
  }

  const keys = Object.keys(data[0]);
  const dataKey = keys[0];
  const valueKey = keys[1];

  const renderChart = () => {
    switch (chart) {
      case "line":
        return (
          <LineChart data={data} margin={margin}>
            <XAxis dataKey={dataKey} />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey={valueKey} stroke="#82D9BF" />
          </LineChart>
        );
      case "bar":
        return (
          <BarChart data={data} layout={layout} margin={margin}>
            <XAxis type={layout === "vertical" ? "number" : "category"} dataKey={dataKey} />
            <YAxis type={layout === "vertical" ? "category" : "number"} />
            <Tooltip />
            <Bar dataKey={valueKey} fill="#82D9BF" />
          </BarChart>
        );
      case "area":
        return (
          <AreaChart data={data} margin={margin}>
            <XAxis dataKey={dataKey} />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey={valueKey} fill="#82D9BF" />
          </AreaChart>
        );
      case "pie":
        return (
          <PieChart margin={margin}>
            <Pie data={data} dataKey="value" nameKey="name" fill="#82D9BF" />
            <Tooltip />
          </PieChart>
        );
    }
  };

  return (
    <Card className="bg-[#082525] border-[#6D988B]">
      <CardHeader>
        <CardTitle className="text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          {renderChart()}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
} 