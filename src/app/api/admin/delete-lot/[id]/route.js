import db from "@/utils/db";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  const { id } = params;

  try {

    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized access" },
        { status: 401 }
      );
    }

    // let admin;
    // try {
    //   admin = verifyAdmin(token);
    // } catch (err) {
    //   return NextResponse.json(
    //     { message: "Invalid or expired token" },
    //     { status: 401 }
    //   );
    // }
    // console.log("=====admin==delet lot===>", admin);

    const result = await db.query('DELETE FROM lot_detail WHERE lot_id = ?', [id]);

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: 'Lot not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Lot deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error("error in delete lot",error);
    return NextResponse.json({ message: 'Error deleting Lot' }, { status: 500 });
  }
}
