import { useContext } from "react";
import GeneralContext from "../Context";
// import "./SideBar.css";

function DownloadProgressBarItem({ item }) {
  console.log(item, "DownloadProgressBarItem");

  // const { DownloadProgressBar } = useContext(GeneralContext);

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <div
        className="mb-a mt-b"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <p
          className="font-type-very-sml-txt  Color-Grey1   mr-b"
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {" "}
          {item.fileName}
        </p>
        <p className="font-type-very-sml-txt  Color-Grey1 ">{item.progress}%</p>
      </div>

      <div
        // the empty bar
        className="Bg-Grey2"
        style={{
          width: "100%",
        }}
      >
        <div
          style={{
            width: `${typeof item.progress === "string" ? 70 : item.progress}%`,
            backgroundColor: "var(--color-DB-Blue-Glow)",
            // height: "calc(var(--space-a)  +  var(--space-b) ) ",
            height: "var(--space-a)",
            display: "flex",
            alignItems: "center",
            borderRadius: "var(--elemtns-round-corner-medium)  ",
          }}
        >
          {/* <p  className="font-type-very-sml-txt Color-Grey5 ml-a"style={{ height:'auto',  }} >{item.progress}/100</p> */}
        </div>
      </div>
    </div>
  );
}

export default DownloadProgressBarItem;
