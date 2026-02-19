import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

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
    const body = await request.json();
    const { name, email, company, projectType, projectDetails, budget } = body;

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
    const safeBudget = escapeHtml(budget || "Not specified");

    await resend.emails.send({
      from: "NorthStack <onboarding@resend.dev>",
      to: "northstackcc@outlook.com",
      subject: `New enquiry from ${safeName}`,
      html: `
        <h2>New Project Enquiry</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Company:</strong> ${safeCompany}</p>
        <p><strong>Project Type:</strong> ${safeProjectType}</p>
        <p><strong>Project Details:</strong></p>
        <p>${safeProjectDetails.replace(/\n/g, "<br>")}</p>
        <p><strong>Budget:</strong> ${safeBudget}</p>
      `,
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
