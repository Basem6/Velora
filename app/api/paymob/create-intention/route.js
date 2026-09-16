import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    const secretKey = process.env.PAYMOB_SECRET_KEY?.trim();
    const integrationId = Number(process.env.PAYMOB_INTEGRATION_ID);

    if (!secretKey) {
      return NextResponse.json(
        {
          error: "PAYMOB_SECRET_KEY is missing",
        },
        { status: 500 }
      );
    }

    if (!integrationId) {
      return NextResponse.json(
        {
          error: "PAYMOB_INTEGRATION_ID is missing or invalid",
        },
        { status: 500 }
      );
    }

    const amount = Number(body.amount);

    if (!amount || amount <= 0) {
      return NextResponse.json(
        {
          error: "Invalid amount",
        },
        { status: 400 }
      );
    }

    const payload = {
      amount,
      currency: "EGP",

      payment_methods: [integrationId],

      items: [
        {
          name: body.itemName || "Velora Order",
          amount,
          description: body.description || "Velora Store Order",
          quantity: 1,
        },
      ],

      billing_data: {
        apartment: body.apartment || "NA",
        first_name: body.firstName || "Customer",
        last_name: body.lastName || "Customer",
        street: body.street || "NA",
        building: body.building || "NA",
        phone_number: body.phone || "+201000000000",
        city: body.city || "Tanta",
        country: "EG",
        email: body.email || "test@example.com",
        floor: body.floor || "NA",
        state: body.state || "Gharbia",
      },

      special_reference:
        body.orderId || `VELORA-${Date.now()}`,

      // Optional:
      // expiration: 3600,
    };

    const response = await fetch(
      "https://accept.paymob.com/v1/intention/",
      {
        method: "POST",

        headers: {
          Authorization: `Token ${secretKey}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify(payload),

        cache: "no-store",
      }
    );

    const text = await response.text();

    let data;

    try {
      data = JSON.parse(text);
    } catch {
      data = {
        raw: text,
      };
    }

    if (!response.ok) {
      console.error("PAYMOB ERROR:", {
        status: response.status,
        data,
      });

      return NextResponse.json(
        {
          error: "Failed to create Paymob intention",
          paymobStatus: response.status,
          paymobResponse: data,
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
    success: true,

    clientSecret: data.client_secret ?? null,

    intentionId: data.id ?? null,

    orderId:
        data.intention_order_id ?? null,

    redirectionUrl:
        data.redirection_url ?? null,
});
  } catch (error) {
    console.error("PAYMOB SERVER ERROR:", error);

    return NextResponse.json(
      {
        error: "Request failed",
        details: error.message,
      },
      { status: 500 }
    );
  }
}