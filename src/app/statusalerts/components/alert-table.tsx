interface AlertData {
  id: string;
  name: string;
  country: string;
  branch: string;
  issue: string;
  status: 'Completed' | 'Pending' | 'Critical' | string;
  date: string;
}

export function AlertTable({ data }: { data: AlertData[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-[#005C54]">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-[#003A36] text-left text-xs font-medium text-[#40E0D0] uppercase tracking-wider">
              Issue ID
            </th>
            <th className="px-6 py-3 bg-[#003A36] text-left text-xs font-medium text-[#40E0D0] uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 bg-[#003A36] text-left text-xs font-medium text-[#40E0D0] uppercase tracking-wider">
              Country
            </th>
            <th className="px-6 py-3 bg-[#003A36] text-left text-xs font-medium text-[#40E0D0] uppercase tracking-wider">
              Branch
            </th>
            <th className="px-6 py-3 bg-[#003A36] text-left text-xs font-medium text-[#40E0D0] uppercase tracking-wider">
              Issue
            </th>
            <th className="px-6 py-3 bg-[#003A36] text-left text-xs font-medium text-[#40E0D0] uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 bg-[#003A36] text-left text-xs font-medium text-[#40E0D0] uppercase tracking-wider">
              Date
            </th>
          </tr>
        </thead>
        <tbody className="bg-[#004D47] divide-y divide-[#005C54]">
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-[#005C54] transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-[#40E0D0]">
                {item.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-[#40E0D0]">
                {item.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-[#40E0D0]">
                {item.country}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-[#40E0D0]">
                {item.branch}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-[#40E0D0]">
                {item.issue}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                  ${item.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                    item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                    item.status === 'Critical' ? 'bg-red-100 text-red-800' : 
                    'bg-blue-100 text-blue-800'}`}>
                  {item.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-[#40E0D0]">
                {item.date}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 