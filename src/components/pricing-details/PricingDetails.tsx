"use client";

import {
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Divider,
    Flex,
    Heading,
    List,
    ListItem,
    ListIcon,
    Text,
} from "@chakra-ui/react";
import { MdCheckCircleOutline } from "react-icons/md";

interface PricingDetailsProps {
    tierName: string;
    price: string;
    shortDescription: string;
    feature1: string;
    feature2: string;
    feature3: string;
    feature4: string;
    buttonText: string;
}

export default function PricingDetails(props: PricingDetailsProps) {
    const features = [
        props.feature1,
        props.feature2,
        props.feature3,
        props.feature4,
    ];

    const featuresList = features.map((feature, index) => {
        return (
            <ListItem
                key={index}
                color={props.tierName === "SME Tier" ? "white" : ""}
            >
                <ListIcon
                    as={MdCheckCircleOutline}
                    color={props.tierName === "SME Tier" ? "white" : "blue.300"}
                />
                {feature}
            </ListItem>
        );
    });

    return (
        <Card
            maxW="xs"
            boxShadow="0px 3px 2px rgba(0, 0, 0, 0.1)"
            sx={{
                margin: "20px",
                borderRadius: "8px",
                padding: "24px 24px 24px",
            }}
            backgroundColor={props.tierName === "SME Tier" ? "#287AE0" : ""}
        >
            <CardHeader color={props.tierName === "SME Tier" ? "white" : ""}>
                <Flex gap="4">
                    <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                        <Box>
                            <Heading fontSize={"28px"}>
                                {props.tierName}
                            </Heading>
                            <Heading fontSize={"28px"} paddingTop={"16px"}>
                                {props.price} <sup>/ Year</sup>
                            </Heading>
                            <Text
                                fontSize={"18px"}
                                paddingTop={"16px"}
                                color={
                                    props.tierName === "SME Tier"
                                        ? "white"
                                        : "#667085"
                                }
                            >
                                {props.shortDescription}
                            </Text>
                        </Box>
                    </Flex>
                </Flex>
            </CardHeader>
            <Divider
                margin={"auto"}
                color={props.tierName === "SME Tier" ? "white" : "#D9D9D9"}
            />
            <CardBody>
                <Text>
                    <List spacing={3}>{featuresList}</List>
                </Text>
            </CardBody>

            <CardFooter
                justify="space-between"
                flexWrap="wrap"
                padding={"12px 0 0 0"}
                sx={{
                    "& > button": {
                        minW: "136px",
                    },
                }}
            >
                <Button
                    flex="1"
                    height={54}
                    color="#287AE0"
                    variant="outline"
                    backgroundColor={
                        props.tierName === "SME Tier" ? "white" : ""
                    }
                    border={"1px solid #287AE0"}
                    borderRadius={"4px"}
                >
                    {props.buttonText}
                </Button>
            </CardFooter>
        </Card>
    );
}
