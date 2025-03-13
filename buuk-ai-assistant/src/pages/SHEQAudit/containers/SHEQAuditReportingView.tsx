import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { dummyRootCauses, dummyVEChoices, dummyFindings } from '../../../data/dummyData';

const SHEQAuditReportingView: React.FC = () => {
  // Prepare data for RootCause Bar Chart
  const rootCauseData = dummyRootCauses.map(rc => ({
    id: rc.id,
    value: dummyFindings.filter(finding => finding.rootCauseId === rc.id).length,
    label: rc.rootCause,
  }));

  // Prepare data for VEChoice PieChart
  const veChoiceCounts = dummyVEChoices.reduce((acc, choice) => {
    acc[choice.veChoice] = dummyFindings.filter(finding => finding.veChoiceId === choice.id).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      {/* Root Cause Bar Chart */}
      <div>
        <h2>Root Causes Distribution</h2>
        <BarChart
          xAxis={[{ scaleType: 'band', data: rootCauseData.map(data => data.label) }]}
          series={[{ data: rootCauseData.map(data => data.value), label: 'Occurrences' }]}
          width={600}
          height={400}
        />
      </div>

      {/* VEChoice Pie Chart */}
      <div>
        <h2>VE Choice Distribution</h2>
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: veChoiceCounts['Positive'], label: 'Positive' },
                { id: 1, value: veChoiceCounts['Reactive'], label: 'Reactive' },
              ],
              highlightScope: { fade: 'global', highlight: 'item' },
              faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
            },
          ]}
          slotProps={{ legend: { hidden: true } }}
          width={350}
          height={300}
        />
      </div>
    </div>
  );
};

export default SHEQAuditReportingView;