import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Box, Heading, Text, Grid, GridItem } from "@chakra-ui/react";
import LineChart from "./LineChart";

const NamePage = () => {
  const { name } = useParams();
  const location = useLocation();
  const selectedNameData = location.state.selectedNameData;

  const { 
    gender, etymology, description, origin, data, similar, famous,
    "2022_count": count2022, // Destructure 2022_count
    "2022_rank": rank2022 // Destructure 2022_rank
  } = selectedNameData;

  console.log(selectedNameData);

  const { year, count, initial } = data;

  const similarNamesList = similar?.split('\n').map((name, index) => (
    <Text key={index}>{name}</Text>
  ));

  const famousPeopleList = famous?.split('\n').map((person, index) => (
    <Text key={index}>{person}</Text>
  ));


  // Accessing the last year and last score
  const lastYear = year[year.length - 1];
  const lastCount = count[count.length - 1];

   // Accessing the most popular year and count of births in that year
   const mostPopularYearIndex = count.indexOf(Math.max(...count));
   const mostPopularYear = year[mostPopularYearIndex];
   const birthsInMostPopularYear = count[mostPopularYearIndex];


  // Adding birthCount2022 based on conditions
  const birthCount2022 = lastYear === 2022 ? lastCount : 0;
  const femaleBirths2022 = 35376558
  const maleBirths2022 = 37074269
  const femaleBirthdayProbability2022Per10k = (birthCount2022/femaleBirths2022) * 10000
  const maleBirthdayProbability2022Per10k = (birthCount2022/maleBirths2022) * 10000

  console.log("Similar Names List:", similarNamesList);
  console.log("Famous People List:", famousPeopleList);

  return (
    // <Grid h='100vh' templateColumns='repeat(3, 1fr)' gap={4}>
    // <GridItem colSpan={1} bg='papayawhip'> </GridItem>
    // <GridItem colSpan={2} bg='tomato'> </GridItem>
    // </Grid>
    <Box>
      <Heading mb={6}>{name}</Heading>
      <LineChart name={name} />
      <Text>{description}</Text>
      <Text>{etymology}</Text>
      <Text>{`In ${lastYear}, ${lastCount} ${gender} babies were born in the US with the name ${name}`}</Text>
      <Text>{`The most popular year was ${mostPopularYear} where ${birthsInMostPopularYear} births were recorded.`}</Text>
      <Text>{`Count in 2022: ${count2022}`}</Text>
      <Text>{`Rank in 2022: ${rank2022}`}</Text>
      <Text>{`in 2022, in a group of 10,000 random newly born girls, we would expect ${femaleBirthdayProbability2022Per10k} to be named ${name}`}</Text>
      <Text>{`in 2022, in a group of 10,000 random newly born girls, we would expect ${maleBirthdayProbability2022Per10k} to be named ${name}`}</Text>
      <Text>{`Origin: ${origin}`}</Text>
      <Text>{`Etymology: ${etymology}`}</Text>
      <Box>
      {/* ... existing components */}
      <Box>
        <Heading size="md" mb={4}>Similar Names</Heading>
        {similarNamesList}
      </Box>
      <Box>
        <Heading size="md" mb={4}>Famous People</Heading>
        {famousPeopleList}
      </Box>
      {/* ... other components */}
    </Box>
    </Box>
  );
};

export default NamePage;
