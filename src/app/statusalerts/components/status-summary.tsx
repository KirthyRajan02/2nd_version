interface StatusData {
  category: string;
  count: number;
  percentage: number;
}

export function StatusSummary({ data }: { data: StatusData[] }) {
  // Ensure data is an array and find category
  const findCategory = (categoryName: string) => {
    if (!Array.isArray(data)) return { count: 0, percentage: 0 };
    
    return data.find(item => item.category === categoryName) || { count: 0, percentage: 0 };
  };

  // Define categories for better maintenance
  const categories = [
    { id: 'delayed', label: 'Delayed Cases' },
    { id: 'critical', label: 'Critical Issues' },
    { id: 'pending', label: 'Pending Actions' },
    { id: 'risk', label: 'Risk Indicators' }
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {categories.map(({ id, label }) => (
        <div key={id} className="bg-[#004D47] p-4 rounded-lg border border-[#005C54]">
          <div className="text-4xl font-bold text-[#40E0D0]">
            {findCategory(label).count}
          </div>
          <div className="text-[#40E0D0]">{label}</div>
          <div className="text-[#40E0D0]">{findCategory(label).percentage}%</div>
        </div>
      ))}
    </div>
  );
} 