import React, { useEffect, useState } from 'react';
import { BarChart, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Bar } from '@mui/x-charts';

const MyCharts = () => {
    const [mostCommonRisk, setMostCommonRisk] = useState(null);
    const [posNegRatio, setPosNegRatio] = useState([]);
    const [biggestRootIssue, setBiggestRootIssue] = useState(null);

    useEffect(() => {
        // Fetch data from your backend
        fetch('/api/data')
            .then(response => response.json())
            .then(data => {
                setMostCommonRisk(data.mostCommonRisk);
                setPosNegRatio(data.posNegRatio);
                setBiggestRootIssue(data.biggestRootIssue);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            {mostCommonRisk && (
                <BarChart
                    dataset={[
                        {
                            label: 'Most Common Risk',
                            data: [mostCommonRisk.Count],
                        },
                    ]}
                    xAxis={[{ scaleType: 'band', data: [mostCommonRisk.Risk] }]}
                    series={[{ dataKey: 'data' }]}
                    width={500}
                    height={300}
                />
            )}

            {posNegRatio.length > 0 && (
                <PieChart>
                    <Pie
                        data={[
                            posNegRatio.map(item => ({ id: item.VEChoice, value: item.Count })),
                        ]}
                        innerRadius="45%"
                        outerRadius="60%"
                    >
                        {posNegRatio.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.VEChoice === 'Positive' ? '#8884d8' : '#ff6347'} />
                        ))}
                    </Pie>
                </PieChart>
            )}

            {biggestRootIssue && (
                <BarChart
                    dataset={[
                        {
                            label: 'Biggest Root Issue',
                            data: [biggestRootIssue.Count],
                        },
                    ]}
                    xAxis={[{ scaleType: 'band', data: [biggestRootIssue.RootCause] }]}
                    series={[{ dataKey: 'data' }]}
                    width={500}
                    height={300}
                />
            )}
        </div>
    );
};

export default MyCharts;