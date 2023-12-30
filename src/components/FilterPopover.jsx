import React from "react";
import {
  Button,
  Icon,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverBody,
  PopoverTrigger,
  VStack,
  Text,
  Flex,
} from "@chakra-ui/react";
import FilterIcon from "./icons/FilterIcon";

const StatusItem = ({ initial, setColumnFilters, isActive }) => (
  <Flex
    align="center"
    cursor="pointer"
    borderRadius={5}
    fontWeight="bold"
    p={1.5}
    bg={isActive ? "gray.800" : "transparent"}
    _hover={{
      bg: "gray.800",
    }}
    onClick={() =>
      setColumnFilters((prev) => {
        const initials = prev.find((filter) => filter.id === "initial")?.value;
        if (!initials) {
          return prev.concat({
            id: "initial",
            value: [initial.id],
          });
        }

        return prev.map((f) =>
          f.id === "initial"
            ? {
                ...f,
                value: isActive
                  ? initials.filter((s) => s !== initial.id)
                  : initials.concat(initial.id),
              }
            : f
        );
      })
    }
  >
    {/* Add content inside the Flex component if needed */}
  </Flex>
);

const FilterPopover = ({ columnFilters, setColumnFilters }) => {
  const filterInitials =
    columnFilters.find((f) => f.id === "initial")?.value || [];

  return (
    <Popover isLazy>
      <PopoverTrigger>
        <Button
          size="sm"
          color={filterInitials.length > 0 ? "blue.300" : ""}
          leftIcon={<Icon as={FilterIcon} fontSize={18} />}
        >
          Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          <Text fontSize="md" fontWeight="bold" mb={4}>
            Filter By:
          </Text>
          <Text fontWeight="bold" color="gray.400" mb={1}>
            Status
          </Text>
          <VStack align="flex-start" spacing={1}>
            {/* Add StatusItem components here based on your needs */}
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default FilterPopover;
