// MUI
import { makeStyles } from "@material-ui/styles";
import { IconButton } from "@material-ui/core";
import { OpenInNew as OpenIcon } from '@material-ui/icons';

// my components
import SubTitle from "../components/SubTitle.js";
import { selectLanguage } from "../languageSlice.js";
import BulletPoint from "../components/BulletPoint.js";
import MyTable from "../components/MyTable.js";
import Padded from "../components/Padded.js";
import { DevSections } from "./Development.js";

// React
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => {
    return ({
        uiDesign: {

        },
        tool: {
            display: "flex",
            gap: theme.spacing(.5),
            alignItems: "center"
        }
    });
});

function Link({ idx }) {
    const URLs = [
        "https://drive.google.com/file/d/1-V9gX1zOXjEC9BXg6cCpPR60kcizBLvC/view?usp=sharing",
        "https://drive.google.com/file/d/1O_a4PhY8oKISuvSx5dGSuSWmnZl-YmrM/view?usp=sharing",
        "https://www.figma.com/file/R1JlrLlFoNHxtAVNqpVZ7H/Wireframe-TravelPlanner",
        "https://www.figma.com/file/W3AaQptvz06kD075GzUS01/Mockup-(TravelPlanner)"
    ];

    const handleClick = () => {
        window.open(URLs[idx], "_blank").focus();
    };

    return (
        <IconButton
            onClick={handleClick}
            size="small"
        >
            <OpenIcon />
        </IconButton>
    );
}

function Tool({ idx }) {
    // styles
    const classes = useStyles();

    const Tools = {
        xmind: {
            label: "XMind",
            src: "/img/tools/xmind.png"
        },
        figma: {
            label: "Figma",
            src: "/img/tools/figma.png"
        }
    }

    const ToolMapping = {
        0: "xmind",
        1: "xmind",
        2: "figma",
        3: "figma"
    };

    const toolName = ToolMapping[idx];
    const { label, src } = Tools[toolName];

    return (
        <div className={classes.tool}>
            <img src={src} />
            <div>{label}</div>
        </div>
    );
}

const Contents = {
    english: {
        point: "Follow UI design flow:",
        tableData: {
            tableHead: ["Order", "Diagram", "Tool", "Link"],
            steps: ["Functional Map", "UI Flow", "Wireframe", "Mockup"]
        }
    },
    chinese: {
        point: "依照介面設計流程:",
        tableData: {
            tableHead: ["順序", "設計圖種類", "繪圖工具", "連結"],
            steps: ["功能地圖", "使用者介面流程", "線框稿", "視覺稿"]
        }
    }
}

export default function UIDesign() {
    // styles
    const classes = useStyles();

    // data
    const language = useSelector(selectLanguage);

    const sectionData = DevSections.uiDesign;
    const title = sectionData.label[language];
    const id = sectionData.ref;

    const { point, tableData } = Contents[language];
    const { tableHead, steps } = tableData;
    const rows = steps.map((step, idx) => {
        const number = idx + 1;
        const tool = <Tool idx={idx} />;
        const link = <Link idx={idx} />;
        return [number, step, tool, link];
    })

    return (
        <div id={id} className={classes.uiDesign}>
            <SubTitle text={title} />
            <BulletPoint text={point} />
            <Padded component={
                <MyTable
                    tableHead={tableHead}
                    rows={rows}
                />
            } />
        </div>
    );
}