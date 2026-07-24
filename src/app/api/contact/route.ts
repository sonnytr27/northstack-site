import { Resend } from "resend";
import { NextResponse } from "next/server";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await request.json();
    const { name, email, company, projectType, projectDetails, productInterest } = body;

    if (!name || !email || !projectDetails) {
      return NextResponse.json(
        { error: "Name, email, and project details are required." },
        { status: 400 }
      );
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeCompany = escapeHtml(company || "Not provided");
    const safeProjectType = escapeHtml(projectType || "Not specified");
    const safeProjectDetails = escapeHtml(projectDetails);
    const PRODUCT_NAMES: Record<string, string> = {
      "telegram-bot": "Telegram Membership Bot",
    };
    const productName = PRODUCT_NAMES[productInterest] || productInterest || "";
    const safeProductName = escapeHtml(productName);

    const isProductEnquiry = !!productInterest;
    const subject = isProductEnquiry
      ? `${safeProductName} enquiry — ${safeName}`
      : `New enquiry from ${safeName}`;

    const html = isProductEnquiry
      ? `
        <h2>Product Enquiry — ${safeProductName}</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Details:</strong></p>
        <p>${safeProjectDetails.replace(/\n/g, "<br>")}</p>
      `
      : `
        <h2>New Project Enquiry</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Company:</strong> ${safeCompany}</p>
        <p><strong>Project Type:</strong> ${safeProjectType}</p>
        <p><strong>Project Details:</strong></p>
        <p>${safeProjectDetails.replace(/\n/g, "<br>")}</p>
      `;

    await resend.emails.send({
      from: "NORTHSTACK <enquiries@northstack.cc>",
      to: "northstackcc@gmail.com",
      replyTo: email,
      subject,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
