import db from "@/utils/db";
import { NextResponse } from "next/server";

// export default async function DELETE(req, { params }) {
//     const { id: auct_id } = params;

//     try {
        
//         const deleteQuery = `DELETE FROM auction_detail WHERE auct_id = ?`;
//         const deleteVal = [auct_id];

//         const [result] = await connection.execute(deleteQuery, deleteVal);
//         console.log("===result===>", result)
//         return NextResponse.json({message: 'Auction Deleted Succesfully'});
//     } catch (error) {
//         console.error("Error in delete auction", error);
//         return NextResponse.json(
//         { message: "Internal Server Error" },
//         { status: 500 }
//         );
//     }
// }

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
    // console.log("=====admin==delet auction===>", admin);

    const result = await db.query('DELETE FROM auction_detail WHERE auct_id = ?', [id]);

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: 'Auction not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Auction deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error deleting Auction' }, { status: 500 });
  }
}
