import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getUserFromToken } from "../../route";
import { Feedback } from "@/model/feedback.model";

export async function DELETE(req: NextRequest, {params}:{params:{feedbackId:string}}) {
    await getUserFromToken(req)
    const {feedbackId } = params

    const feedbackDeleted = await Feedback.findByIdAndDelete(feedbackId)

    if (!feedbackDeleted){
        return NextResponse.json({message:"The feedback was not found!"}, { status: 404 });
    }

    return NextResponse.json({message:"The feedback was deleted successfully"}, { status: 200 });
}
