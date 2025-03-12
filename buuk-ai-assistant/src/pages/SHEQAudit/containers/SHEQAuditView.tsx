import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import axios from 'axios';

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
            }
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
};
    
  return (
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
      <Button label="Add Row" onClick={addRow} className="p-mb-4"/>
      <Button label="Submit" onClick={submitForm} className="p-mr-2" severity="success"/>
    </div>
  );
};

export default SHEQAuditView;