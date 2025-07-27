import { Button } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Company from "../Componemts/CompanyProfile/Company";
import SimilarCompanies from "../Componemts/CompanyProfile/SimilarCompanies";

const CompanyPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-[100vh] theme-bg-primary theme-text-primary font-['Poppins'] p-4">
      {/* <Divider size="xs" /> */}

      <Button
        onClick={() => navigate(-1)}
        leftSection={<IconArrowLeft size={20} />}
        my="md"
        color="primaryColor.5"
        variant="light"
      >
        Back
      </Button>

      <div className="flex  gap-5 justify-between">
        <Company />
        <SimilarCompanies />
      </div>
    </div>
  );
};

export default CompanyPage;
