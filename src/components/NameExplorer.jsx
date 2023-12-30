import React, { useState, useMemo, useRef } from "react";
import 'chartjs-adapter-moment';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, registerables } from 'chart.js';
import { Line } from "react-chartjs-2";
import { Box, Input, Button, Flex, Tag, TagLabel, TagCloseButton } from "@chakra-ui/react";
import transformedData from "../transformed_interval_data.json";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, ...registerables);

const NameExplorer = () => {
  const [genderFilter, setGenderFilter] = useState('both');
  const [nameFilter, setNameFilter] = useState([]);
  const chartRef = useRef(null);

  const handleGenderChange = newGender => {
    // Convert the button gender values to match the data structure
    const genderValue = newGender === 'M' ? 'male' : (newGender === 'F' ? 'female' : 'both');
    setGenderFilter(genderValue);
  };

  const handleNameChange = event => {
    if (event.key === 'Enter' && event.target.value) {
      setNameFilter([...nameFilter, event.target.value.trim().toLowerCase()]);
      event.target.value = '';
    }
  };
  const handleRemoveName = nameToRemove => setNameFilter(nameFilter.filter(name => name !== nameToRemove));

  const chartData = useMemo(() => {
    // Define colors for male and female names
    const maleColor = 'rgba(255, 255, 255, 0.52)';
    const maleFillColor = 'rgba(80, 145, 255, 0.2)'; // Lighter color with opacity
    const femaleColor = 'rgba(255, 255, 255, 0.52)';
    const femaleFillColor = 'rgba(255, 179, 218, 0.3)'; // Lighter color with opacity
  
    let datasets = [];
  
    // Process female names
    if (genderFilter === 'both' || genderFilter === 'female') {
      Object.entries(transformedData['female']).forEach(([name, intervals]) => {
        if (nameFilter.length === 0 || nameFilter.includes(name.toLowerCase())) {
          datasets.push({
            label: name,
            data: intervals.map(interval => ({
              x: interval['interval'],
              y: interval['count'],
              rank: interval['rank'] // Include rank here
            })),
            borderColor: femaleColor,
            backgroundColor: femaleFillColor, // Set fill color with opacity
            fill: true,
            lineTension: 0.1,
          });
        }
      });
    }
  
    // Process male names
    if (genderFilter === 'both' || genderFilter === 'male') {
      Object.entries(transformedData['male']).forEach(([name, intervals]) => {
        if (nameFilter.length === 0 || nameFilter.includes(name.toLowerCase())) {
          datasets.push({
            label: name,
            data: intervals.map(interval => ({
              x: interval['interval'],
              y: interval['count'],
              rank: interval['rank'] // Include rank here, ensure it exists in your data
            })),
            borderColor: maleColor,
            backgroundColor: maleFillColor, // Set fill color with opacity
            fill: true,
            lineTension: 0.1,
          });
        }
      });
    }
  
    return { datasets };
  }, [genderFilter, nameFilter]);
  

  const options = {
    scales: {
      x: {
        type: 'linear', // Changed from 'time' to 'linear'
        position: 'bottom',
        title: {
          display: true,
          text: '10 Year Interval'
        },
        ticks: {
          callback: function(value, index, values) {
            return value; // Display the numerical year value
          }
        }
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Birth Count' }
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          title: function(context) {
            // Assuming the first item in context array contains the year value
            const year = context[0]?.raw.x;
            if (year !== undefined) {
              return `Decade: ${year}s`; // Format as 'Decade: 1950s'
            }
            return ''; // Default title if year is not defined
          },
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ', ';
            }
  
            if (context.parsed.y !== null) {
              label += `Births: ${context.parsed.y}`;
            }
            // Access rank from context.raw
            const rank = context.raw.rank;
            if (rank !== undefined) {
              label += `, Rank: ${rank}`;
            }
            return label;
          }
        }
      }
    },
    // ... other options
  };
  

  return (
    <Box>
      <Flex mb="4">
      <Button colorScheme="blue" variant={genderFilter === 'male' ? 'solid' : 'outline'} onClick={() => handleGenderChange('M')}>Male</Button>
      <Button ml="2" colorScheme="pink" variant={genderFilter === 'female' ? 'solid' : 'outline'} onClick={() => handleGenderChange('F')}>Female</Button>
      <Button ml="2" colorScheme="teal" variant={genderFilter === 'both' ? 'solid' : 'outline'} onClick={() => handleGenderChange('both')}>Both</Button>
      </Flex>
      <Input onKeyPress={handleNameChange} placeholder="Enter a name" />
      <Box mb="4">
        {nameFilter.map(name => (
          <Tag size="lg" key={name} borderRadius="full" variant="solid" colorScheme="gray" m="1">
            <TagLabel>{name}</TagLabel>
            <TagCloseButton onClick={() => handleRemoveName(name)} />
          </Tag>
        ))}
      </Box>
      <Line ref={chartRef} data={chartData} options={options} />
    </Box>
  );
};

export default NameExplorer;
