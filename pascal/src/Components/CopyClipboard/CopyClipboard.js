import React, { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { BsClipboardCheck, BsFillPatchCheckFill } from "react-icons/bs";
import cogoToast from "cogo-toast";

import "./CopyClipboard.scss";

const CopyClipboard = (props) => {
	const [copySuccess, setCopySuccess] = useState(false);
	const copiedText = props?.data;
	setTimeout(() => setCopySuccess(false), 1000);
	if (copySuccess == true) {
		let options = { position: "top-right", heading: "Copied !" };
		cogoToast.success("", options);
	}
	return (
		<>
			<CopyToClipboard text={copiedText} onCopy={() => setCopySuccess(true)}>
				<span className="clip-copy">
					<BsClipboardCheck />
				</span>
			</CopyToClipboard>
			{/* {copySuccess == true && (
				<span className="clip-success">
					Copied <BsFillPatchCheckFill />
				</span>
			)} */}
		</>
	);
};

export default CopyClipboard;
