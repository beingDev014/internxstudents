import { createClient } from "@supabase/supabase-js";
import PizZip from "pizzip";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    console.log("🚀 OFFER API START");

    const { name, email, domain } = await req.json();

    const today = new Date();

    const startDate = new Date();
    startDate.setDate(today.getDate() + 1);

    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + 1);

    const formatDate = (date: Date) =>
      date.toLocaleDateString("en-IN");

    const offerId = "OFF-" + Math.floor(1000 + Math.random() * 9000);

    // 🔥 GET TEMPLATE FROM DB
    const { data: templates, error: dbError } = await supabase
      .from("offer_templates")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1);

    if (dbError || !templates || templates.length === 0) {
      return Response.json({
        success: false,
        error: "No offer template found",
      });
    }

    const templateUrl = templates[0].file_url;
    console.log("📄 TEMPLATE:", templateUrl);

    // 🔥 FETCH TEMPLATE FILE
    const res = await fetch(templateUrl);

    if (!res.ok) {
      return Response.json({
        success: false,
        error: "Failed to fetch template",
      });
    }

    const content = await res.arrayBuffer();

    // 🔥 LOAD DOCX ZIP
    const zip = new PizZip(content);

    let xml = zip.file("word/document.xml")?.asText();

    if (!xml) {
      return Response.json({
        success: false,
        error: "Invalid template",
      });
    }

    // 🔥 REPLACE VARIABLES (IMPORTANT 🔥)
    xml = xml.replace(/{{Name}}/g, name);
    xml = xml.replace(/{{Domain}}/g, domain);
    xml = xml.replace(/{{Date}}/g, formatDate(today));
    xml = xml.replace(/{{StartDate}}/g, formatDate(startDate));
    xml = xml.replace(/{{EndDate}}/g, formatDate(endDate));
    xml = xml.replace(/{{offerId}}/g, offerId);

    // 🔥 PUT BACK XML
    zip.file("word/document.xml", xml);

    const output = zip.generate({ type: "uint8array" });

    const fileName = `offer-${Date.now()}.docx`;

    console.log("📤 Uploading offer letter");

    // 🔥 UPLOAD TO STORAGE
    const { error: uploadError } = await supabase.storage
      .from("offer-letters")
      .upload(fileName, output, {
        upsert: true,
        contentType:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

    if (uploadError) {
      return Response.json({
        success: false,
        error: uploadError.message,
      });
    }

    // 🔥 GET PUBLIC URL
    const { data } = supabase.storage
      .from("offer-letters")
      .getPublicUrl(fileName);

    const fileUrl = data.publicUrl;

    console.log("🔗 FILE URL:", fileUrl);

    // 🔥 SAVE TO DB
    await supabase
      .from("students_applications")
      .update({
        offer_letter_url: fileUrl,
        offer_status: "generated",
      })
      .eq("email", email);

    console.log("🎉 OFFER GENERATED");

    return Response.json({
      success: true,
      url: fileUrl,
      offerId,
    });

  } catch (err: any) {
    console.error("🔥 ERROR:", err);

    return Response.json({
      success: false,
      error: err?.message || "Unknown error",
    });
  }
}