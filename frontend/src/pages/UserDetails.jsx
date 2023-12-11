import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userDetails } from "../Slice/usersSlice";
import { useParams } from "react-router-dom";
import ModalImage from "react-modal-image";

const UserDetails = () => {

  const dispatch = useDispatch();
  const { userId } = useParams();

  const { data } = useSelector((state) => state.getUserDetailReducer);
  let bankDetails = {};
  if (data && data.bankDetails) {
    bankDetails = {
      holderName: data.bankDetails.holderName,
    };
  }

  useEffect(() => {
    dispatch(userDetails(userId));
  }, [userId, dispatch]);

  return (
    <div className="container md:h-full  p-4 flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold mb-4">View Details</h1>
      <div className="flex flex-col md:flex-row w-full md:w-full md:h-full">
        <div className="md:w-1/2 ">
          <table className="w-full border ">
            <tbody className="flex flex-col ">
              <tr className="flex flex-col">
                <td className="p-2">
                  <div className="font-semibold text-red">Name :</div>
                  {data && data.name}
                </td>
                <td className="p-2">
                  <div className="font-semibold">Email</div>
                  {data && data.email}
                </td>
                <td className="p-2">
                  <div className="font-semibold">Phone</div>
                  {data && data.phone}
                </td>
                <td className="p-2">
                  <div className="font-semibold">Address</div>
                  {data && data.address}
                </td>
                <td className="p-2">
                  <div className="font-semibold">Package Choosen</div>
                </td>
                <td className="p-2">
                  <div className="font-semibold">Amount</div>
                </td>
                <td className="p-2">
                  <div className="font-semibold">Users Count</div>
                </td>
                <td className="p-2">
                  <div className="font-semibold">UnrealisedEarning </div>
                  {data && data.unrealisedEarning}
                </td>
                <td className="p-2">
                  <div className="font-semibold">UserStatus</div>
                  {data && data.userStatus}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="md:w-1/2 ">
          <table className="w-full border  ">
            <tbody className="flex flex-col ">
              <tr className="flex flex-col">
                <td className="p-2">
                  <div className="font-semibold">Add On Users</div>
                </td>
                <td className="p-2 ">
                  <div className="font-semibold">Owner Sponser ID</div>
                  {data && data.ownSponserId}
                </td>
                <td className="p-2">
                  <div className="font-semibold">ScreenShot</div>
                  {data && (
                    <div
                      style={{
                        width: "300px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <ModalImage
                        small={`https://sevensquaregroup.in/uploads/${data.screenshot}`}
                        large={`https://sevensquaregroup.in/uploads/${data.screenshot}`}
                        alt="screenshot"
                      />
                    </div>
                  )}
                </td>
                <td className="p-2">
                  <div className="font-semibold">Refernce no.</div>
                  {data && data.referenceNo}
                </td>
                <td className="p-2">
                  <div className="font-semibold">Earning</div>
                  {data && data.earning}
                </td>
                
                
                <td className="p-2">
                  <div className="font-semibold">BankDetails </div>
                  {bankDetails && bankDetails.holderName}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
