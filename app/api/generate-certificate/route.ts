import { createClient } from "@supabase/supabase-js";
import PizZip from "pizzip";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    console.log("🚀 API START");

    const { name, email, domain } = await req.json();

    if (!name || !email || !domain) {
      return Response.json({
        success: false,
        error: "Missing required fields",
      });
    }

    const today = new Date().toLocaleDateString("en-IN");
    const certId = "CERT-" + Math.floor(1000 + Math.random() * 9000);

    // 🔥 GET TEMPLATE
    const { data: templates, error: dbError } = await supabase
      .from("certificate_templates")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1);

    if (dbError || !templates || templates.length === 0) {
      console.error("DB ERROR:", dbError);
      return Response.json({
        success: false,
        error: "No template found",
      });
    }

    const templateUrl = templates[0].file_url;

    // 🔥 FETCH TEMPLATE
    const res = await fetch(templateUrl);

    if (!res.ok) {
      return Response.json({
        success: false,
        error: "Failed to fetch template",
      });
    }

    const content = await res.arrayBuffer();

    // 🔥 LOAD DOCX
    const zip = new PizZip(content);
    let xml = zip.file("word/document.xml")?.asText();

    if (!xml) {
      return Response.json({
        success: false,
        error: "Invalid docx template",
      });
    }

    // 🔥 REPLACE VARIABLES
    xml = xml.replace(/{{Name}}/g, name);
    xml = xml.replace(/{{Domain}}/g, domain);
    xml = xml.replace(/{{Date}}/g, today);
    xml = xml.replace(/{{CertificateID}}/g, certId);

    zip.file("word/document.xml", xml);

    const output = zip.generate({ type: "uint8array" });

    const fileName = `certificate-${Date.now()}.docx`;

    // 🔥 UPLOAD FILE
    const { error: uploadError } = await supabase.storage
      .from("certificates")
      .upload(fileName, output, {
        upsert: true,
        contentType:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

    if (uploadError) {
      console.error("UPLOAD ERROR:", uploadError);
      return Response.json({
        success: false,
        error: uploadError.message,
      });
    }

    // 🔥 GET PUBLIC URL
    const { data: urlData } = supabase.storage
      .from("certificates")
      .getPublicUrl(fileName);

    const certificateUrl = urlData.publicUrl;

    // 🔥 SAVE TO DB
    const { error: insertError } = await supabase
      .from("certificates")
      .insert([
        {
          certificate_id: certId,
          student_name: name,
          email,
          domain,
          certificate_url: certificateUrl,
          issue_date: new Date().toISOString(),
        },
      ]);

    if (insertError) {
      console.error("INSERT ERROR:", insertError);
    }

    console.log("🎉 SUCCESS");

    return Response.json({
      success: true,
      url: certificateUrl,
      certId: certId,
    });

  } catch (err: any) {
    console.error("🔥 FINAL ERROR:", err);

    return Response.json({
      success: false,
      error: err?.message || "Unknown error",
    });
  }
}