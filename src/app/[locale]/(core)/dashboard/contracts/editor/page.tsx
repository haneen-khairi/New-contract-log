"use client"
import { getContractByID } from "@/actions/contracts";
import CKeditor from "@/components/CKeditor";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
type ContractDocument = {
  id: string;
  file: string;
  name: string;
  status: string;
  summary: string;
  html_content?: string | null;
};
export default function Page() {
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [data, setData] = useState("");
  const query = useSearchParams()
  const { data: session } = useSession();
  const [document, setDocuments] = useState<ContractDocument>({
    id: "",
    file: "",
    name: "",
    status: "",
    summary: "",
    html_content: ""
});
  const id = query.get("id") as any;
  useEffect(() => {
    setEditorLoaded(true);
    const fetchFile = async () => {
      console.log(query.get("id"),
        session?.tokens?.access || "", "test id and session")
      try {
              const fileData = await getContractByID(
                id,
                session?.tokens?.access || ""
              );
              console.log("doc ion editor", fileData);
              setDocuments(fileData);
          } catch (error) {
              console.error("Error fetching file data:", error);
          }
      };

      fetchFile();
  }, [id]);
  return (
    <div className="ckeditor-container">
      <CKeditor
        name="description"
        onChange={(data) => {
          setData(data);
        }}
        value={document.html_content || ""}
        editorLoaded={editorLoaded}
      />
    </div>
  );
}