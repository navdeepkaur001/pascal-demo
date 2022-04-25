import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Col, Form, Table } from "react-bootstrap";
import { userTransactionHistoryAction } from "../../redux/action/user.action";
import moment from "moment";
import "./CommonModal.scss";
import { CommonService } from "../../utils/commonService";
import CopyClipboard from "../CopyClipboard/CopyClipboard";
import { TOKENS_TYPE } from "../../constant";
import { toGetTokensDecimalsAction } from "../../redux/action/user.action";
import * as Session from "../../utils/session";
import BigNumber from "big-number/big-number";
const header = [
  {
    name: "Id",
    key: "id",
  },
  {
    name: "Txn hash",
    key: "txn_hash",
  },
  {
    name: "Project Id",
    key: "project_id",
  },
  {
    name: "Amount",
    key: "amount",
  },
  {
    name: "Token Sold",
    key: "token_sold",
  },

  {
    name: "Created At",
    key: "created_at",
  },
];
const CommonModal = (props) => {
  const dispatch = useDispatch();
  const walletAddress = useSelector((state) => state.connect.metamaskAddress);
  const walletType = Session.getLoginSession();

  const [txnHistory, setTxnHistory] = useState();
  const [lovelyInuDecimal, setLovelyInuDecimal] = useState();
  const [shibaInuDecimal, setShibaInuDecimal] = useState();
  const [flokiDecimal, setFlokiDecimal] = useState();
  const [safemoonDecimal, setSafemoonDecimal] = useState();

  useEffect(() => {
    onIt();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props?.show]);

  const onIt = async () => {
    let lovelyInuDecimal = await dispatch(
      toGetTokensDecimalsAction(walletType, TOKENS_TYPE.LOVELYINU)
    );
    lovelyInuDecimal = 10 ** lovelyInuDecimal;

    let shibuDecimal = await dispatch(
      toGetTokensDecimalsAction(walletType, TOKENS_TYPE.SHIBAINU)
    );
    shibuDecimal = 10 ** shibuDecimal;

    let flokiDecimal = await dispatch(
      toGetTokensDecimalsAction(walletType, TOKENS_TYPE.FLOKI)
    );
    flokiDecimal = 10 ** flokiDecimal;

    let safeMoonDecimal = await dispatch(
      toGetTokensDecimalsAction(walletType, TOKENS_TYPE.SAFEMOON)
    );
    safeMoonDecimal = 10 ** safeMoonDecimal;

    setLovelyInuDecimal(lovelyInuDecimal);
    setShibaInuDecimal(shibuDecimal);
    setFlokiDecimal(flokiDecimal);
    setSafemoonDecimal(safeMoonDecimal);

    let data = {
      address: walletAddress,
      page: 1,
      limit: 10,
    };
    let result = await dispatch(userTransactionHistoryAction(data));
    if (result && result.status == 200) {
      setTxnHistory(result?.data?.data);
    }
  };
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      id="txn-model"
    >
      <Modal.Header closeButton className="txnModel">
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table>
          <thead>
            {header.map((item, index) => (
              <th>{item.name}</th>
            ))}
          </thead>
          <tbody>
            {txnHistory ? (
              txnHistory.rows.map((item, index) => (
                <tr>
                  <td>{item?.id}</td>
                  <td>
                    {CommonService.custmizeAddress(item?.tx_hash)}
                    <CopyClipboard data={item?.tx_hash} />
                  </td>
                  <td>{item?.project_id}</td>

                  <td>
                    {item?.amount ? (
                      <>
                        {item?.amount /
                          (item?.token_type == 0
                            ? 10 ** 18
                            : item?.token_type == 1
                            ? lovelyInuDecimal
                            : item?.token_type == 2
                            ? shibaInuDecimal
                            : item?.token_type == 3
                            ? flokiDecimal
                            : item?.token_type == 4
                            ? safemoonDecimal
                            : null)}
                      </>
                    ) : (
                      0
                    )}
                    &nbsp;
                    {item.amount ? (
                      <>
                        {item?.token_type == 0
                          ? "BNB"
                          : item?.token_type == 1
                          ? "Lovely Inu "
                          : item?.token_type == 2
                          ? "Shiba Inu"
                          : item?.token_type == 3
                          ? "Floki"
                          : item?.token_type == 4
                          ? "Safemoon"
                          : null}
                      </>
                    ) : null}
                  </td>
                  <td>
                    {item.token_sold
                      ? item?.token_sold / 10 ** item?.token_decimals
                      : 0}
                    {item?.token_symbol}
                  </td>
                  <td>
                    {moment(item.created_at).format("DD MMM ,YYYY hh:ss A")}
                  </td>
                </tr>
              ))
            ) : (
              <td className="text-center" colSpan="6">
                No records found
              </td>
            )}
          </tbody>
        </Table>
        {/* </Col> */}
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
};
export default CommonModal;
