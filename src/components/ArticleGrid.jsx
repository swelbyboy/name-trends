// ArticleGrid.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Box, SimpleGrid, Text, Heading, Image } from '@chakra-ui/react';
import { articles } from '../../public/article_data';

const ArticleGrid = () => {
  return (
    <Box p={4}>
      <Heading as="h1" mb={4} fontSize="2xl">Our Baby Articles</Heading>
      <SimpleGrid columns={3} spacing={4}>
        {articles.map((article) => (
          <Box key={article.id} borderWidth="1px" borderRadius="lg" p={4}>
            <Link to={`/articles/${article.id}`}>
              <Heading as="h2" fontSize="xl" mb={2}>
                {article.title}
              </Heading>
              <Image src={article.image} alt={article.title} boxSize="200px" objectFit="cover" mb={2} />
            </Link>
            <Text>{article.content}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ArticleGrid;
