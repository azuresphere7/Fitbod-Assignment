import axios from "axios";

/**
 * Fetch all exercise list
 * @returns APIResponse
 */
export async function GET() {
  try {
    const response = await axios.get(process.env.GOOGLE_API!);

    return Response.json({
      success: true,
      result: response.data
    });
  }
  catch (error) {
    return Response.json({
      success: false,
      message: "Internal Server Error!",
      error
    });
  }
}
