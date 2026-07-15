import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Extract IP Address from headers
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";
    
    // Extract User Agent
    const userAgent = request.headers.get("user-agent") || "";
    
    // Perform server-side GeoIP lookup
    let geoData = { country: "Local/Unknown", region: "Local/Unknown", city: "Local/Unknown", isp: "Local/Unknown" };
    
    // For localhost testing, use a public IP to get dynamic results
    const lookupIp = (ip === "127.0.0.1" || ip === "::1") ? "8.8.8.8" : ip;
    
    try {
      const geoRes = await fetch(`http://ip-api.com/json/${lookupIp}`);
      if (geoRes.ok) {
        const geoJson = await geoRes.json();
        if (geoJson.status === "success") {
          geoData = {
            country: geoJson.country || "Unknown",
            region: geoJson.regionName || "Unknown",
            city: geoJson.city || "Unknown",
            isp: geoJson.isp || "Unknown"
          };
        }
      }
    } catch (e) {
      console.error("GeoIP lookup error:", e);
    }
    
    // Build tracking payload
    const payload = {
      ip: ip,
      userAgent: userAgent,
      country: geoData.country,
      region: geoData.region,
      city: geoData.city,
      isp: geoData.isp,
      language: body.language || "",
      timezone: body.timezone || "",
      referrer: body.referrer || "",
      screenResolution: body.screenResolution || "",
      consentStatus: body.consentStatus || "accepted",
      email: body.email || "",
      phone: body.phone || ""
    };
    
    const webappUrl = process.env.GOOGLE_SHEET_WEBAPP_URL;
    
    if (webappUrl) {
      // POST the data to Google Apps Script Web App
      const res = await fetch(webappUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      if (!res.ok) {
        throw new Error(`Google Sheet webapp returned status ${res.status}`);
      }
      
      const resJson = await res.json().catch(() => ({}));
      return NextResponse.json({ success: true, forward: true, details: resJson });
    } else {
      console.warn("GOOGLE_SHEET_WEBAPP_URL is not configured. Logged user info:", payload);
      return NextResponse.json({ 
        success: true, 
        forward: false, 
        message: "No GOOGLE_SHEET_WEBAPP_URL set. Data logged on server.",
        data: payload 
      });
    }
  } catch (error: any) {
    console.error("Error in tracking route:", error);
    return NextResponse.json({ success: false, error: error?.message || "Unknown error" }, { status: 500 });
  }
}
