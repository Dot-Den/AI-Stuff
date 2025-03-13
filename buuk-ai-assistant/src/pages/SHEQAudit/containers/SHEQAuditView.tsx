import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import axios from 'axios';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { dummyRootCauses, dummyVEChoices, dummyFindings } from '../../../data/dummyData';
import { ProgressSpinner } from 'primereact/progressspinner'; // Import ProgressSpinner component
import 'primereact/resources/themes/lara-light-indigo/theme.css';  // theme
import 'primereact/resources/primereact.min.css';                  // core css
import 'primeicons/primeicons.css';  

interface Finding {
  finding: string;
  reason: string;
  rootCause: string;
  veChoice: string;
  risk: string;
  percentageCertainty: number;
}

const SHEQAuditView = () => {
  const [findings, setFindings] = useState<Finding[]>([
    { 
      finding: '',
      reason: '',
      rootCause: '',
      veChoice: '',
      risk: '',
      percentageCertainty: 0,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
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

  const addRow = () => {
    setFindings([...findings, { 
      finding: '',
      reason: '',
      rootCause: '',
      veChoice: '',
      risk: '',
      percentageCertainty: 0,
    }]);
  };

  const handleInputChange = (index: number, field: keyof Finding, value: any) => {
    setFindings(findings.map((finding, idx) =>
      index === idx ? { ...finding, [field]: value } : finding
    ));
  };

  const submitForm = async () => {
    setLoading(true);
    try {
        const findingsList = findings.map(finding => finding.finding).join(', ');
        const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ5OGIzNzA5LTc2YTQtNGE2YS04YzZmLTJhZGQwYTM0NjE1ZSJ9.7hh5ffKyB4ZB5tidroQlQgQAt_e2BOwYku23Zb3zkAM'; // Use your actual API key or environment variable
        const url = 'https://server03.hackathonservices.co.uk/api/chat/completions'; 
        const response = await axios.post(
            url,
            {
                title: "deniz-test-model",
                model: 'deniz-test-model', // Replace with the actual model name you are using
                provider: "ollama",
                messages: [
                        {
                          role: 'system',
                          content: 'Make sure the columns included are Findings (which is the initial sent text), Reason, Root Cause,  VeChoice, risk and only give the field value and show me a percentage of how certain you are of the correct answer as its own column. Do not respond with anything apart from a json list of each of the rows.',
                        },
                        {
                          role: 'user',
                          content: findingsList,
                        }
                ],
            },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json', // Make sure the Content-Type is set
                },
            },
            
        );

// Parse the API response content from JSON string to JavaScript array
const apiResponseContent = JSON.parse(response.data.choices[0].message.content);

// Transform API response to match Finding interface
const transformedFindings: Finding[] = apiResponseContent.map((apiFinding: any) => ({
    finding: apiFinding.Findings,
    reason: apiFinding.Reason,
    rootCause: apiFinding['Root Cause'],
    veChoice: apiFinding.VEChoice,
    risk: apiFinding.Risk,
    percentageCertainty: parseInt(apiFinding.Certainty.replace('%', ''), 10),
}));

setFindings(transformedFindings);
} catch (error) {
console.error('Error submitting the form', error);
}
setLoading(false);
};
    
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height:'100vh', overflow: 'autoCan'}}>
    <div>
      {findings.map((finding, index) => (
        <div key={index} className="p-grid p-justify-between" style={{ marginBottom: '1rem' }}>
          <InputText 
            value={finding.finding} 
            onChange={(e) => handleInputChange(index, 'finding', e.target.value)} 
            placeholder="Finding"
            className="p-mr-2"
          />
          <InputText 
            value={finding.reason} 
            onChange={(e) => handleInputChange(index, 'reason', e.target.value)} 
            placeholder="Reason"
            className="p-mr-2"
          />
          <InputText 
            value={finding.rootCause} 
            onChange={(e) => handleInputChange(index, 'rootCause', e.target.value)} 
            placeholder="Root Cause"
            className="p-mr-2"
          />
          <InputText 
            value={finding.veChoice} 
            onChange={(e) => handleInputChange(index, 'veChoice', e.target.value)} 
            placeholder="VE Choice"
            className="p-mr-2"
          />
          <InputText 
            value={finding.risk} 
            onChange={(e) => handleInputChange(index, 'risk', e.target.value)} 
            placeholder="Risk"
            className="p-mr-2"
          />
          {/* <InputText 
            type="number" 
            value={finding.percentageCertainty} 
            onChange={(e) => handleInputChange(index, 'percentageCertainty', Number(e.target.value))} 
            placeholder="Percentage Certainty (%)"
          /> */}
        </div>
      ))}
              <div>
            {loading && <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="4" fill="#EEEEEE" animationDuration=".5s" />}
            {!loading && data && (
                <div>
                    {/* Render your fetched data here */}
                    <h1>Data Loaded:</h1>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
            )}
        </div>
      <Button label="Add Row" onClick={addRow} className="p-mb-4"/>
      <Button label="Submit" onClick={submitForm} className="p-mr-2" severity="success"/>
    </div>
    <div style={{ marginTop:'150px', display: 'flex', gap: '20px' }}>
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
    </div>
  );
};

export default SHEQAuditView;