import { useTranslations } from "next-intl";
import { Flex } from "@chakra-ui/react";
import { Key } from "react";
import { PricingDetails } from "../../components/pricing-details/";

export default function PricingView() {
  const t = useTranslations("Pricing");

  const data = [
    {
      tierName: t("FreeTier.tierName"),
      price: t("FreeTier.price"),
      shortDescription: t("FreeTier.shortDescription"),
      feature1: t("FreeTier.feature1"),
      feature2: t("FreeTier.feature2"),
      feature3: t("FreeTier.feature3"),
      feature4: t("FreeTier.feature4"),
      buttonText: t("FreeTier.buttonText"),
    },
    {
      tierName: t("SMETier.tierName"),
      price: t("SMETier.price"),
      shortDescription: t("SMETier.shortDescription"),
      feature1: t("SMETier.feature1"),
      feature2: t("SMETier.feature2"),
      feature3: t("SMETier.feature3"),
      feature4: t("SMETier.feature4"),
      buttonText: t("SMETier.buttonText"),
    },
    {
      tierName: t("Enterprise.tierName"),
      price: t("Enterprise.price"),
      shortDescription: t("Enterprise.shortDescription"),
      feature1: t("Enterprise.feature1"),
      feature2: t("Enterprise.feature2"),
      feature3: t("Enterprise.feature3"),
      feature4: t("Enterprise.feature4"),
      buttonText: t("Enterprise.buttonText"),
    },
    {
      tierName: t("Custom.tierName"),
      price: t("Custom.price"),
      shortDescription: t("Custom.shortDescription"),
      feature1: t("Custom.feature1"),
      feature2: t("Custom.feature2"),
      feature3: t("Custom.feature3"),
      feature4: t("Custom.feature4"),
      buttonText: t("Custom.buttonText"),
    },
  ];

  return (
    <Flex justifyContent={"center"} flexWrap={"wrap"}>
      {data.map(
        (
          item: {
            tierName: string;
            price: string;
            shortDescription: string;
            feature1: string;
            feature2: string;
            feature3: string;
            feature4: string;
            buttonText: string;
          },
          index: Key | null | undefined
        ) => (
          <PricingDetails key={index} {...item} />
        )
      )}
    </Flex>
  );
}
