interface TraineeData {
  id: string;
  name: string;
  program: string;
  startDate: string;
  status: 'On Track' | 'Delayed' | string;
  deadline: string;
  progress: number;
}

export function TraineeTable({ data }: { data: TraineeData[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-[#005C54]">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-[#003A36] text-left text-xs font-medium text-[#40E0D0] uppercase tracking-wider">
              Trainee ID
            </th>
            <th className="px-6 py-3 bg-[#003A36] text-left text-xs font-medium text-[#40E0D0] uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 bg-[#003A36] text-left text-xs font-medium text-[#40E0D0] uppercase tracking-wider">
              Program
            </th>
            <th className="px-6 py-3 bg-[#003A36] text-left text-xs font-medium text-[#40E0D0] uppercase tracking-wider">
              Start Date
            </th>
            <th className="px-6 py-3 bg-[#003A36] text-left text-xs font-medium text-[#40E0D0] uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 bg-[#003A36] text-left text-xs font-medium text-[#40E0D0] uppercase tracking-wider">
              Deadline
            </th>
            <th className="px-6 py-3 bg-[#003A36] text-left text-xs font-medium text-[#40E0D0] uppercase tracking-wider">
              Progress
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
                {item.program}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-[#40E0D0]">
                {item.startDate}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                  ${item.status === 'On Track' ? 'bg-green-100 text-green-800' : 
                    item.status === 'Delayed' ? 'bg-red-100 text-red-800' : 
                    'bg-blue-100 text-blue-800'}`}>
                  {item.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-[#40E0D0]">
                {item.deadline}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="w-full bg-[#003A36] rounded-full h-2.5">
                  <div 
                    className="bg-[#40E0D0] h-2.5 rounded-full" 
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 