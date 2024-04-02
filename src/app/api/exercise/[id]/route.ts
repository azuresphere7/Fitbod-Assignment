import { NextRequest } from "next/server";
import axios from "axios";
import { Exercise } from "@/utils/interface";

/**
 * Fetch exercise list by Id
 * @param request 
 * @param param1 
 * @returns APIResponse
 */
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const response = await axios.get(process.env.GOOGLE_API!);
    const result = response.data.find((item: Exercise) => item.id === id);

    if (result) {
      return Response.json({
        success: true,
        result
      });
    } else {
      return Response.json({
        success: false,
        message: "Data Not Found"
      });
    }
  }
  catch (error) {
    return Response.json({
      success: false,
      message: "Internal Server Error!",
      error
    });
  }
}
