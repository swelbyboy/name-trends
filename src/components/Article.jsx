// Article.js
import { articles } from '../../public/article_data';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Heading, Text, Image } from '@chakra-ui/react';

const Article = () => {
  const { articleId } = useParams(); // Use the useParams hook to get the articleId from the URL

  // Assuming you have an array of articles
  const article = articles.find((a) => a.id.toString() === articleId);

  if (!article) {
    return <Text>Article not found</Text>;
  }

  return (
    <Box p={4}>
      <Heading as="h1" mb={4} fontSize="2xl">{article.title}</Heading>
      <Image src={article.image} alt={article.title} boxSize="300px" objectFit="cover" mb={4} />
      <Text>{article.content}</Text>
    </Box>
  );
};

export default Article;
