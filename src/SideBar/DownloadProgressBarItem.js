import { useContext } from "react";
import GeneralContext from "../Context";
// import "./SideBar.css";

function DownloadProgressBarItem({ item }) {
  console.log(
    item,
    "ttttttttt88888888888888888888888888888888888888888888888888888"
  );

  // const { DownloadProgressBar } = useContext(GeneralContext);

  return (
    <div
      style={{
        width: `$100%`,
        // backgroundColor: "#ffffff",
        marginBottom: 10,
      }}
    >
      <div
        style={{
          color: "#ffffff",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {item.fileName}
      </div>
      <div
        style={{
          width: "100%",
          backgroundColor: "#cccccc",
        }}
      >
        <div
          style={{
            width: `${item.progress}%`,
            backgroundColor: "#9892EB",
            height: 22,
            marginBottom: -22,
          }}
        ></div>
        <p
          style={{
            color: "#ccccccc",
            zIndex: 55555,
            height: 22,
            backgroundColor: "transparent",
          }}
        >
          {item.progress}/100
        </p>
      </div>
    </div>
  );
}

export default DownloadProgressBarItem;
