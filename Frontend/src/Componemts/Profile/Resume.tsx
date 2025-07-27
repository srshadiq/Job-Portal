import { ActionIcon, Button } from "@mantine/core";
import { IconDownload, IconEye } from "@tabler/icons-react";
import React from "react";
import { useSelector } from "react-redux";

const Resume = () => {
  const profile = useSelector((state: any) => state.profile);

  // Helper to open base64 PDF in new tab
  const openBase64PDF = (base64: string) => {
    if (!base64) return;
    const pdfWindow = window.open("");
    pdfWindow?.document.write(
      `<iframe width='100%' height='100%' src='data:application/pdf;base64,${base64}'></iframe>`
    );
  };

  // Helper to download base64 PDF
  const downloadBase64PDF = (base64: string, filename = "resume.pdf") => {
    if (!base64) return;
    const link = document.createElement("a");
    link.href = `data:application/pdf;base64,${base64}`;
    link.download = filename;
    link.click();
  };

  return (
    <div className="px-3">
      <div className="text-2xl font-semibold mb-3 flex justify-between items-center">
        Resume
        <div className="flex gap-2">
          {profile?.resume && (
            <>
              <ActionIcon
                onClick={() => openBase64PDF(profile.resume)}
                size="lg"
                color="primaryColor.5"
                variant="subtle"
                title="View Resume"
              >
                <IconEye className="h-4/5 w-4/5" />
              </ActionIcon>
              <ActionIcon
                onClick={() => downloadBase64PDF(profile.resume)}
                size="lg"
                color="primaryColor.5"
                variant="subtle"
                title="Download Resume"
              >
                <IconDownload className="h-4/5 w-4/5" />
              </ActionIcon>
            </>
          )}
        </div>
      </div>
      {profile?.resume ? (
        <div className="flex flex-col items-center gap-3">
          <Button
            color="primaryColor.5"
            variant="outline"
            leftSection={<IconEye size={18} />}
            onClick={() => openBase64PDF(profile.resume)}
          >
            View Resume PDF
          </Button>
          <Button
            color="primaryColor.5"
            variant="light"
            leftSection={<IconDownload size={18} />}
            onClick={() => downloadBase64PDF(profile.resume)}
          >
            Download Resume PDF
          </Button>
        </div>
      ) : (
        <div className="text-xm theme-text-secondary text-justify">
          No resume uploaded.
        </div>
      )}
    </div>
  );
};

export default Resume;
