import ImageKit from "imagekit";
import { auth } from "@/auth"
import { NextRequest, NextResponse } from "next/server"
import config from "@/config"

const imagekit = new ImageKit({
  publicKey: config.env.imagekit.publicKey,
  privateKey: config.env.imagekit.privateKey,
  urlEndpoint: config.env.imagekit.urlEndpoint, 
})

export async function DELETE(req: NextRequest) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { fileIDValue } = await req.json()
        if (!fileIDValue) {
      return NextResponse.json({ success: false, error: "fileId is required" }, { status: 400 })
    }

    const data = await imagekit.deleteFile(fileIDValue);

    return NextResponse.json({ success: true, data, message: "File deleted successfully" });
  } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
